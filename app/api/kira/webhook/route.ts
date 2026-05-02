import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.KIRA_STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.mode === 'payment') {
      const product = session.metadata?.product
      if (product === 'programme') {
        await handleProgrammeAccess(stripe, session, 'programme_access')
      } else if (product === 'template') {
        await handleProgrammeAccess(stripe, session, 'template_access')
      } else {
        // PDF delivery for training / nutrition / bundle
        await handlePdfDelivery(stripe, session)
      }
      return NextResponse.json({ received: true })
    }

    // ── Subscription: portal access ──────────────────────
    if (session.mode === 'subscription') {
      await handleSubscriptionCreated(session)
      return NextResponse.json({ received: true })
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const lead_id = subscription.metadata?.kira_lead_id
    if (lead_id) {
      const supabase = createSupabaseServiceClient()
      await supabase.from('kira_leads').update({ status: 'rejected' }).eq('id', lead_id)
    }
  }

  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription
    const lead_id = subscription.metadata?.kira_lead_id
    if (lead_id && subscription.items.data.length > 0) {
      const supabase = createSupabaseServiceClient()
      const priceId = subscription.items.data[0].price.id
      const newPlan = priceId === process.env.KIRA_STRIPE_PRICE_BUNDLE ? 'bundle' : 'monthly'
      await supabase.from('kira_leads').update({ plan_selected: newPlan }).eq('id', lead_id)
    }
  }

  return NextResponse.json({ received: true })
}

// ── Programme / template access grant ──────────────────────────

async function handleProgrammeAccess(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
  field: 'programme_access' | 'template_access',
) {
  const email = session.customer_details?.email
  const name  = session.customer_details?.name || ''
  if (!email) return

  const supabase = createSupabaseServiceClient()

  // Find existing user by email
  const { data: { users } } = await supabase.auth.admin.listUsers()
  const existing = users.find(u => u.email === email)

  let userId: string
  let loginUrl: string

  if (existing) {
    userId = existing.id
    // grant access
    await supabase.from('profiles').upsert({ id: userId, email, [field]: true }, { onConflict: 'id' })
    // magic link so they can log straight in
    const { data: linkData } = await supabase.auth.admin.generateLink({ type: 'magiclink', email })
    loginUrl = linkData?.properties?.action_link ?? `${process.env.NEXT_PUBLIC_APP_URL}/login`
  } else {
    // create new user
    const { data: userData } = await supabase.auth.admin.createUser({ email, email_confirm: true, user_metadata: { full_name: name } })
    if (!userData?.user) return
    userId = userData.user.id
    await supabase.from('profiles').upsert({ id: userId, email, full_name: name, [field]: true }, { onConflict: 'id' })
    const { data: linkData } = await supabase.auth.admin.generateLink({ type: 'magiclink', email })
    loginUrl = linkData?.properties?.action_link ?? `${process.env.NEXT_PUBLIC_APP_URL}/login`
  }

  const firstName = name.split(' ')[0] || 'there'
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Kira Mei <kira@kiramei.co.uk>',
    to: email,
    subject: `Your Training Blueprint programme is ready, ${firstName}.`,
    html: `
      <div style="font-family:'DM Sans',Arial,sans-serif;max-width:520px;color:#1A1916;background:#F8F6F1;padding:40px 32px;border-radius:12px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#4A7C59;margin-bottom:24px;">Kira Mei — Training Programme</p>
        <h1 style="font-family:Georgia,serif;font-size:34px;font-weight:600;color:#1A1916;line-height:1.1;margin-bottom:16px;">You're in.</h1>
        <p style="font-size:15px;line-height:1.7;color:#7A7870;margin-bottom:32px;">
          Hi ${firstName} — your 8-week interactive programme is ready. Click below to access it. This link signs you straight in.
        </p>
        <a href="${loginUrl}" style="display:inline-block;padding:16px 32px;background:#1A1916;color:#F8F6F1;font-size:14px;font-weight:600;text-decoration:none;border-radius:99px;letter-spacing:0.04em;">
          Access your programme →
        </a>
        <p style="font-size:12px;color:#B5B0A6;margin-top:24px;line-height:1.6;">
          If this link expires, visit kiramei.co.uk/login to sign in with this email address.
        </p>
        <hr style="border:none;border-top:1px solid #E5E1D8;margin:32px 0;" />
        <p style="font-size:11px;color:#B5B0A6;letter-spacing:0.08em;text-transform:uppercase;">Kira Mei · kiramei.co.uk</p>
      </div>
    `,
  })
}

// ── PDF delivery for digital products ──────────────────────────

async function handlePdfDelivery(stripe: Stripe, session: Stripe.Checkout.Session) {
  const email = session.customer_details?.email
  const name  = session.customer_details?.name || ''
  if (!email) return

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 })
  const priceId   = lineItems.data[0]?.price?.id
  if (!priceId) return

  const baseUrl          = process.env.NEXT_PUBLIC_APP_URL!
  const trainingPriceId  = process.env.STRIPE_TRAINING_PRICE_ID
  const nutritionPriceId = process.env.STRIPE_NUTRITION_PRICE_ID
  const bundlePriceId    = process.env.STRIPE_BUNDLE_PRICE_ID

  type Download = { name: string; url: string }
  let subject: string
  let downloads: Download[]

  if (priceId === trainingPriceId) {
    subject   = 'Your Training Blueprint is ready, ' + (name.split(' ')[0] || 'there') + '.'
    downloads = [{ name: 'Training Blueprint', url: `${baseUrl}/downloads/training-blueprint.pdf` }]
  } else if (priceId === nutritionPriceId) {
    subject   = 'Your Nutrition Blueprint is ready, ' + (name.split(' ')[0] || 'there') + '.'
    downloads = [{ name: 'Nutrition Blueprint', url: `${baseUrl}/downloads/nutrition-blueprint.pdf` }]
  } else if (priceId === bundlePriceId) {
    subject   = 'Your Full Stack Bundle is ready, ' + (name.split(' ')[0] || 'there') + '.'
    downloads = [
      { name: 'Training Blueprint',       url: `${baseUrl}/downloads/training-blueprint.pdf` },
      { name: 'Nutrition Blueprint',      url: `${baseUrl}/downloads/nutrition-blueprint.pdf` },
      { name: 'Build Your Own Template',  url: `${baseUrl}/downloads/build-your-own-template.pdf` },
    ]
  } else {
    return
  }

  const firstName = name.split(' ')[0] || 'there'
  const downloadLinksHtml = downloads.map(d => `
    <a href="${d.url}" style="display: block; margin-bottom: 12px; padding: 14px 20px; background: #1A1916; color: #F8F6F1; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 10px; letter-spacing: 0.03em;">
      ↓ Download ${d.name}
    </a>
  `).join('')

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Kira Mei <kira@kiramei.co.uk>',
    to: email,
    subject,
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 520px; color: #1A1916; background: #F8F6F1; padding: 40px 32px; border-radius: 12px;">
        <p style="font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #4A7C59; margin-bottom: 24px;">
          Kira Mei — Digital Fitness Education
        </p>
        <h1 style="font-family: 'Georgia', serif; font-size: 34px; font-weight: 600; color: #1A1916; line-height: 1.1; margin-bottom: 16px;">
          Payment confirmed.
        </h1>
        <p style="font-size: 15px; line-height: 1.7; color: #7A7870; margin-bottom: 6px;">
          Hi ${firstName} — your download${downloads.length > 1 ? 's are' : ' is'} ready.
        </p>
        <p style="font-size: 15px; line-height: 1.7; color: #7A7870; margin-bottom: 32px;">
          Save the file${downloads.length > 1 ? 's' : ''} somewhere permanent. These links will always work, but it's good to have your own copy.
        </p>
        <div style="margin-bottom: 32px;">
          ${downloadLinksHtml}
        </div>
        <div style="background: #E8F2EC; border-radius: 10px; padding: 20px 24px; margin-bottom: 32px;">
          <p style="font-size: 13px; color: #355840; line-height: 1.7; margin: 0;">
            Work through it week by week — don't rush. By week 8 you'll have the knowledge to build your own programme and never need to buy another one. That's the whole point.
          </p>
        </div>
        <hr style="border: none; border-top: 1px solid #E5E1D8; margin: 32px 0;" />
        <p style="font-size: 11px; color: #B5B0A6; letter-spacing: 0.08em; text-transform: uppercase;">
          Kira Mei · kiramei.co.uk · Questions? kiira.mei@outlook.com
        </p>
      </div>
    `,
  })
}

// ── Subscription portal flow (existing coaching clients) ────────

async function handleSubscriptionCreated(session: Stripe.Checkout.Session) {
  const supabase = createSupabaseServiceClient()
  const lead_id = session.metadata?.kira_lead_id
  const stripe_customer_id = session.customer as string
  const stripe_subscription_id = session.subscription as string | null

  if (!lead_id) return

  const { data: lead } = await supabase
    .from('kira_leads')
    .select('email, name, user_id')
    .eq('id', lead_id)
    .single()

  if (!lead) return

  let userId = lead.user_id as string | null
  let isNewUser = false

  if (!userId) {
    const { data: existingLead } = await supabase
      .from('kira_leads')
      .select('user_id')
      .eq('email', lead.email)
      .not('user_id', 'is', null)
      .limit(1)
      .maybeSingle()

    if (existingLead?.user_id) {
      userId = existingLead.user_id as string
    } else {
      const { data: userData, error: createError } = await supabase.auth.admin.createUser({
        email: lead.email,
        email_confirm: true,
      })
      if (!createError && userData?.user) {
        userId = userData.user.id
        isNewUser = true
      }
    }
  }

  const activationToken = crypto.randomUUID()

  await supabase.from('kira_leads').update({
    status: 'paid',
    user_id: userId,
    stripe_customer_id,
    stripe_subscription_id: stripe_subscription_id ?? undefined,
    activation_token: activationToken,
  }).eq('id', lead_id)

  if (userId) {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const firstName = lead.name.split(' ')[0]
    const activationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/activate?token=${activationToken}&lead_id=${lead_id}`

    const subject = isNewUser
      ? `Your Kira Mei account is ready, ${firstName}.`
      : `You're back, ${firstName} — set up your portal access.`

    await resend.emails.send({
      from: 'Kira Mei <kira@kiramei.co.uk>',
      to: lead.email,
      subject,
      html: `
        <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 520px; color: #1A1916; background: #F8F6F1; padding: 40px 32px; border-radius: 12px;">
          <p style="font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #4A7C59; margin-bottom: 24px;">
            Kira Mei — Client Portal
          </p>
          <h1 style="font-family: 'Georgia', serif; font-size: 32px; font-weight: 600; color: #1A1916; line-height: 1.1; margin-bottom: 16px;">
            Payment confirmed.
          </h1>
          <p style="font-size: 15px; line-height: 1.7; color: #7A7870; margin-bottom: 8px;">
            Hi ${firstName}, your programme is being built. You'll receive it within 4 days.
          </p>
          <p style="font-size: 15px; line-height: 1.7; color: #7A7870; margin-bottom: 32px;">
            First, set up your client portal — this is where you'll view your programme, manage your subscription, and track your progress.
          </p>
          <a href="${activationUrl}" style="display: inline-block; padding: 16px 32px; background: #1A1916; color: #F8F6F1; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 99px; letter-spacing: 0.04em;">
            Activate your account →
          </a>
          <p style="font-size: 12px; color: #B5B0A6; margin-top: 24px; line-height: 1.6;">
            This link expires in 72 hours. If you didn't make this purchase, contact us at kiira.mei@outlook.com
          </p>
          <hr style="border: none; border-top: 1px solid #E5E1D8; margin: 32px 0;" />
          <p style="font-size: 11px; color: #B5B0A6; letter-spacing: 0.08em; text-transform: uppercase;">
            Kira Mei — Online PT · kiramei.co.uk
          </p>
        </div>
      `,
    })
  }
}
