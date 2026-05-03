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
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0D0D0D;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D0D;padding:48px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#111111;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

        <!-- header bar -->
        <tr><td style="padding:32px 36px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A7C59;">
            Kira Mei — 8-Week Training Programme
          </p>
        </td></tr>

        <!-- hero -->
        <tr><td style="padding:40px 36px 12px;">
          <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:42px;font-weight:600;color:#EEEAE4;line-height:1.0;letter-spacing:-0.025em;">
            You're in.
          </h1>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:rgba(238,234,228,0.55);line-height:1.75;">
            Hi ${firstName} — your 8-week interactive programme is live and waiting. Click below to get straight in. No password needed.
          </p>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:28px 36px 8px;">
          <a href="${loginUrl}"
            style="display:inline-block;padding:16px 32px;background:#4A7C59;color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:700;text-decoration:none;border-radius:99px;letter-spacing:0.03em;">
            Start your programme →
          </a>
          <p style="margin:14px 0 0;font-family:Arial,sans-serif;font-size:12px;color:rgba(238,234,228,0.2);line-height:1.6;">
            This link signs you in automatically and expires after one use. After that, visit kiramei.co.uk/login to request a new one.
          </p>
        </td></tr>

        <!-- what's inside -->
        <tr><td style="padding:28px 36px 0;">
          <div style="background:rgba(74,124,89,0.08);border:1px solid rgba(74,124,89,0.2);border-radius:12px;padding:22px 24px;">
            <p style="margin:0 0 14px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(74,124,89,0.8);">
              What's inside
            </p>
            <table cellpadding="0" cellspacing="0" width="100%">
              ${[
                ['8 progressive weeks', 'each one unlocks the next'],
                ['Video breakdowns', 'every exercise explained'],
                ['Weekly quizzes', 'lock in the knowledge'],
                ['Week 8', 'you build your own programme for life'],
              ].map(([title, sub]) => `
              <tr>
                <td style="padding:0 0 10px 0;">
                  <span style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#EEEAE4;">${title}</span>
                  <span style="font-family:Arial,sans-serif;font-size:13px;color:rgba(238,234,228,0.35);"> — ${sub}</span>
                </td>
              </tr>`).join('')}
            </table>
          </div>
        </td></tr>

        <!-- footer -->
        <tr><td style="padding:28px 36px 28px;border-top:1px solid rgba(255,255,255,0.06);margin-top:24px;">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:rgba(238,234,228,0.2);letter-spacing:0.08em;text-transform:uppercase;">
            Kira Mei · kiramei.co.uk
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
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
    subject   = `Your Training Blueprint is ready, ${name.split(' ')[0] || 'there'}.`
    downloads = [{ name: 'Training Blueprint', url: `${baseUrl}/downloads/training-blueprint.pdf` }]
  } else if (priceId === nutritionPriceId) {
    subject   = `Your Nutrition Blueprint is ready, ${name.split(' ')[0] || 'there'}.`
    downloads = [{ name: 'Nutrition Blueprint', url: `${baseUrl}/downloads/nutrition-blueprint.pdf` }]
  } else if (priceId === bundlePriceId) {
    subject   = `Your Full Stack Bundle is ready, ${name.split(' ')[0] || 'there'}.`
    downloads = [
      { name: 'Training Blueprint',      url: `${baseUrl}/downloads/training-blueprint.pdf` },
      { name: 'Nutrition Blueprint',     url: `${baseUrl}/downloads/nutrition-blueprint.pdf` },
      { name: 'Build Your Own Template', url: `${baseUrl}/downloads/build-your-own-template.pdf` },
    ]
  } else {
    return
  }

  // Create/find account so they get a magic link into the site
  const supabase = createSupabaseServiceClient()
  const { data: { users } } = await supabase.auth.admin.listUsers()
  const existing = users.find(u => u.email === email)

  let loginUrl = `${baseUrl}/login`
  if (existing) {
    const { data: linkData } = await supabase.auth.admin.generateLink({ type: 'magiclink', email })
    loginUrl = linkData?.properties?.action_link ?? loginUrl
  } else {
    const { data: userData } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: { full_name: name },
    })
    if (userData?.user) {
      await supabase.from('profiles').upsert(
        { id: userData.user.id, email, full_name: name },
        { onConflict: 'id' },
      )
      const { data: linkData } = await supabase.auth.admin.generateLink({ type: 'magiclink', email })
      loginUrl = linkData?.properties?.action_link ?? loginUrl
    }
  }

  const firstName = name.split(' ')[0] || 'there'

  const downloadRowsHtml = downloads.map(d => `
    <tr>
      <td style="padding: 0 0 12px 0;">
        <a href="${d.url}"
          style="display:block;padding:15px 22px;background:#1A1916;color:#F8F6F1;font-family:Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.02em;">
          ↓ &nbsp;${d.name}
        </a>
      </td>
    </tr>
  `).join('')

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Kira Mei <kira@kiramei.co.uk>',
    to: email,
    subject,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0D0D0D;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D0D;padding:48px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#111111;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);">

        <!-- header bar -->
        <tr><td style="padding:32px 36px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#4A7C59;">
            Kira Mei — Training Blueprint
          </p>
        </td></tr>

        <!-- hero -->
        <tr><td style="padding:36px 36px 12px;">
          <h1 style="margin:0 0 14px;font-family:Georgia,serif;font-size:38px;font-weight:600;color:#EEEAE4;line-height:1.1;letter-spacing:-0.02em;">
            You're in.
          </h1>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:rgba(238,234,228,0.55);line-height:1.75;">
            Hi ${firstName} — payment confirmed. Your ${downloads.length > 1 ? 'files are' : 'file is'} ready below. Save ${downloads.length > 1 ? 'them' : 'it'} somewhere permanent.
          </p>
        </td></tr>

        <!-- downloads -->
        <tr><td style="padding:24px 36px 8px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${downloadRowsHtml}
          </table>
        </td></tr>

        <!-- divider -->
        <tr><td style="padding:4px 36px 0;">
          <div style="height:1px;background:rgba(255,255,255,0.06);"></div>
        </td></tr>

        <!-- magic link section -->
        <tr><td style="padding:28px 36px;">
          <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(238,234,228,0.3);">
            Your account
          </p>
          <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:14px;color:rgba(238,234,228,0.5);line-height:1.65;">
            We've created an account for you. Sign in to access your downloads any time — no password needed.
          </p>
          <a href="${loginUrl}"
            style="display:inline-block;padding:15px 30px;background:#4A7C59;color:#ffffff;font-family:Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;border-radius:99px;letter-spacing:0.03em;">
            Sign in to kiramei.co.uk →
          </a>
          <p style="margin:16px 0 0;font-family:Arial,sans-serif;font-size:12px;color:rgba(238,234,228,0.2);line-height:1.6;">
            This link signs you in automatically and expires after one use. After that, visit kiramei.co.uk/login to request a new one.
          </p>
        </td></tr>

        <!-- footer -->
        <tr><td style="padding:20px 36px 28px;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:rgba(238,234,228,0.2);letter-spacing:0.08em;text-transform:uppercase;">
            Kira Mei · kiramei.co.uk
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
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
