import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

type Product = 'training' | 'nutrition' | 'bundle'

const PRICE_IDS: Record<Product, string> = {
  training: process.env.STRIPE_TRAINING_PRICE_ID!,
  nutrition: process.env.STRIPE_NUTRITION_PRICE_ID!,
  bundle:    process.env.STRIPE_BUNDLE_PRICE_ID!,
}

const CANCEL_PATHS: Record<Product, string> = {
  training: '/training',
  nutrition: '/nutrition',
  bundle:    '/bundle',
}

export async function POST(req: NextRequest) {
  const { product } = await req.json() as { product: Product }

  if (!['training', 'nutrition', 'bundle'].includes(product)) {
    return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
  }

  const priceId = PRICE_IDS[product]
  if (!priceId) {
    return NextResponse.json({ error: 'Price not configured' }, { status: 500 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${baseUrl}${CANCEL_PATHS[product]}`,
    billing_address_collection: 'auto',
    metadata: { product },
  })

  return NextResponse.json({ url: session.url })
}
