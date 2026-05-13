import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function GET(req: NextRequest) {
  const priceId = process.env.STRIPE_STUDIO_PRICE_ID
  if (!priceId) {
    return NextResponse.json({ error: 'Studio price not configured' }, { status: 500 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/studio/welcome?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${baseUrl}/studio`,
    billing_address_collection: 'auto',
    metadata: { product: 'studio' },
  })

  return NextResponse.redirect(session.url!)
}
