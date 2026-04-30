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

  const supabase = createSupabaseServiceClient()

  // ── Payment success ──────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const lead_id = session.metadata?.kira_lead_id
    const stripe_customer_id = session.customer as string
    const stripe_subscription_id = session.subscription as string | null

    if (!lead_id) return NextResponse.json({ received: true })

    const { data: lead } = await supabase
      .from('kira_leads')
      .select('email, name, user_id')
      .eq('id', lead_id)
      .single()

    if (!lead) return NextResponse.json({ received: true })

    // Create Supabase auth user if not already linked
    let userId = lead.user_id as string | null
    let isNewUser = false

    if (!userId) {
      // Check if a user already exists with this email via other leads
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

    // Generate activation token
    const activationToken = crypto.randomUUID()

    // Update lead
    await supabase.from('kira_leads').update({
      status: 'paid',
      user_id: userId,
      stripe_customer_id,
      stripe_subscription_id: stripe_subscription_id ?? undefined,
      activation_token: activationToken,
    }).eq('id', lead_id)

    // Send activation email
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

  // ── Subscription cancelled ───────────────────────────────
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const lead_id = subscription.metadata?.kira_lead_id
    if (lead_id) {
      await supabase.from('kira_leads').update({ status: 'rejected' }).eq('id', lead_id)
    }
  }

  // ── Subscription plan changed ────────────────────────────
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription
    const lead_id = subscription.metadata?.kira_lead_id
    if (lead_id && subscription.items.data.length > 0) {
      const priceId = subscription.items.data[0].price.id
      const newPlan = priceId === process.env.KIRA_STRIPE_PRICE_BUNDLE ? 'bundle' : 'monthly'
      await supabase.from('kira_leads').update({ plan_selected: newPlan }).eq('id', lead_id)
    }
  }

  return NextResponse.json({ received: true })
}
