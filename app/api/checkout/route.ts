import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PRODUCTS, type ProductSlug } from '@/app/lib/pricing'

const CANCEL_PATHS: Record<ProductSlug, string> = {
  training:  '/training',
  nutrition: '/nutrition',
  bundle:    '/bundle',
}

export async function POST(req: NextRequest) {
  const { product } = await req.json() as { product: ProductSlug }

  if (!PRODUCTS[product]) {
    return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
  }

  const priceId = process.env[PRODUCTS[product].stripePriceEnv]
  if (!priceId) {
    return NextResponse.json({ error: 'Price not configured' }, { status: 500 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/success?p=${product}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${baseUrl}${CANCEL_PATHS[product]}`,
    billing_address_collection: 'auto',
    // 1h expiry so checkout.session.expired fires promptly for cart-abandoned email
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    metadata: { product },
  })

  return NextResponse.json({ url: session.url })
}
