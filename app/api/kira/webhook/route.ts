import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { buildTrainingEmail, buildNutritionEmail, buildBundleEmail, buildActivationEmail } from '@/app/lib/emailTemplates'
import { buildCartAbandonedEmail } from '@/app/lib/email-upsell-templates'

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
        await handleProgrammeAccess(stripe, session, 'programme_access', 'training')
      } else if (product === 'template') {
        await handleProgrammeAccess(stripe, session, 'template_access', 'training')
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

  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session
    // Only fire for one-time training product sessions (not subscription coaching sessions)
    if (session.mode === 'payment' && session.customer_details?.email) {
      await handleCartAbandoned(session)
    }
    return NextResponse.json({ received: true })
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
  product: 'training' | 'nutrition' | 'bundle' = 'training',
) {
  const email = session.customer_details?.email
  const name  = session.customer_details?.name || ''
  if (!email) return

  const supabase = createSupabaseServiceClient()

  // Find existing user by email
  const { data: { users } } = await supabase.auth.admin.listUsers()
  const existing = users.find(u => u.email === email)

  let userId: string
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/login`

  if (existing) {
    userId = existing.id
    await supabase.from('profiles').upsert({ id: userId, email, [field]: true }, { onConflict: 'id' })
  } else {
    const { data: userData } = await supabase.auth.admin.createUser({ email, email_confirm: true, user_metadata: { full_name: name } })
    if (!userData?.user) return
    userId = userData.user.id
    await supabase.from('profiles').upsert({ id: userId, email, full_name: name, [field]: true }, { onConflict: 'id' })
  }

  const firstName = name.split(' ')[0] || 'there'
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const subjects: Record<string, string> = {
    training: `Your Training Blueprint is ready, ${firstName}.`,
    nutrition: `Your Nutrition Blueprint is ready, ${firstName}.`,
    bundle: `Your Full Stack Bundle is unlocked, ${firstName}.`,
  }

  const htmlBuilders: Record<string, (f: string, u: string) => string> = {
    training: buildTrainingEmail,
    nutrition: buildNutritionEmail,
    bundle: buildBundleEmail,
  }

  await resend.emails.send({
    from: 'Kira Mei <kira@kiramei.co.uk>',
    to: email,
    subject: subjects[product] ?? subjects.training,
    html: (htmlBuilders[product] ?? buildTrainingEmail)(firstName, loginUrl),
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

  if (priceId !== trainingPriceId && priceId !== nutritionPriceId && priceId !== bundlePriceId) return

  const supabase = createSupabaseServiceClient()
  const { data: { users } } = await supabase.auth.admin.listUsers()
  const existing = users.find(u => u.email === email)

  const loginUrl = `${baseUrl}/login`
  if (!existing) {
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
    }
  }

  const firstName = name.split(' ')[0] || 'there'

  const emailBuilders: Record<string, (f: string, u: string) => string> = {
    training:  buildTrainingEmail,
    nutrition: buildNutritionEmail,
    bundle:    buildBundleEmail,
  }

  const emailSubjects: Record<string, string> = {
    training:  `Your Training Blueprint is unlocked, ${firstName}.`,
    nutrition: `Your Nutrition Blueprint is unlocked, ${firstName}.`,
    bundle:    `Your Full Stack Bundle is unlocked, ${firstName}.`,
  }

  const productKey = priceId === trainingPriceId ? 'training' : priceId === nutritionPriceId ? 'nutrition' : 'bundle'
  const buildEmail = emailBuilders[productKey] ?? buildTrainingEmail

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Kira Mei <kira@kiramei.co.uk>',
    to: email,
    subject: emailSubjects[productKey],
    html: buildEmail(firstName, loginUrl),
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
      html: buildActivationEmail(firstName, activationUrl),
    })
  }
}

// ── Cart abandoned (checkout.session.expired, payment mode only) ────────────
// Fires 1h after checkout opened (sessions expire in 1h — see /api/checkout).
// customer_details.email is only present if the user got far enough to enter it.
//
// UK PECR note: this person is NOT yet a customer so the soft opt-in exemption
// does not apply. Legally this requires prior consent. Until a pre-checkout
// email-capture step with an explicit opt-in is added, suppress by setting
// CART_ABANDONED_EMAIL_ENABLED=true in env (opt-in to sending, off by default).

async function handleCartAbandoned(session: Stripe.Checkout.Session) {
  if (process.env.CART_ABANDONED_EMAIL_ENABLED !== 'true') return

  const email = session.customer_details!.email!
  const name  = session.customer_details?.name ?? ''
  const firstName = name.split(' ')[0] || 'there'

  const product = session.metadata?.product ?? 'training'
  const productNames: Record<string, string> = {
    training:  'Training Blueprint',
    nutrition: 'Nutrition Blueprint',
    bundle:    'Full Stack Bundle',
  }
  const productName = productNames[product] ?? 'blueprint'
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!
  const productPageUrl = `${baseUrl}/${product}`

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Kira Mei <hello@kiramei.co.uk>',
    replyTo: 'hello@kiramei.co.uk',
    to: email,
    subject: 'A thought about your blueprint.',
    html: buildCartAbandonedEmail(firstName, productName, productPageUrl),
  })
}
