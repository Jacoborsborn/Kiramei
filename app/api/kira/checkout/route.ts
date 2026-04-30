import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
  try {
    const { plan, lead_id } = await req.json()
    const supabase = createSupabaseServiceClient()

    // NOTE: Ensure KIRA_STRIPE_PRICE_MONTHLY and KIRA_STRIPE_PRICE_BUNDLE
    // are set to RECURRING prices in your Stripe dashboard (4-week interval).

    const priceId = plan === 'bundle'
      ? process.env.KIRA_STRIPE_PRICE_BUNDLE!
      : process.env.KIRA_STRIPE_PRICE_MONTHLY!

    // Get lead email to create/retrieve a Stripe customer
    const { data: lead, error: leadError } = await supabase
      .from('kira_leads')
      .select('email, name, stripe_customer_id')
      .eq('id', lead_id)
      .single()

    if (leadError || !lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Reuse existing Stripe customer or create new one
    let customerId = lead.stripe_customer_id
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: lead.email,
        name: lead.name,
        metadata: { kira_lead_id: lead_id },
      })
      customerId = customer.id

      await supabase
        .from('kira_leads')
        .update({ stripe_customer_id: customerId })
        .eq('id', lead_id)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { kira_lead_id: lead_id, plan },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/activate-pending?lead_id=${lead_id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#apply`,
      subscription_data: {
        metadata: { kira_lead_id: lead_id },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
