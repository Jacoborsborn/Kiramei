import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })

export async function POST(req: NextRequest) {
  try {
    const { plan, lead_id } = await req.json()

    const priceId = plan === 'bundle'
      ? process.env.KIRA_STRIPE_PRICE_BUNDLE!
      : process.env.KIRA_STRIPE_PRICE_MONTHLY!

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { kira_lead_id: lead_id, plan },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/?applied=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#apply`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
