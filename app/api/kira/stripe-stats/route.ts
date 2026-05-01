import { NextResponse } from 'next/server'
import Stripe from 'stripe'


function productKey(priceId: string): 'training' | 'nutrition' | 'bundle' | 'unknown' {
  if (priceId === process.env.STRIPE_TRAINING_PRICE_ID) return 'training'
  if (priceId === process.env.STRIPE_NUTRITION_PRICE_ID) return 'nutrition'
  if (priceId === process.env.STRIPE_BUNDLE_PRICE_ID) return 'bundle'
  return 'unknown'
}

function productPrice(key: string): number {
  if (key === 'training') return 49.99
  if (key === 'nutrition') return 39.99
  if (key === 'bundle') return 79.99
  return 0
}

export async function GET(req: Request) {
  if (req.headers.get('x-studio-secret') !== process.env.STUDIO_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })

  const PRICE_MAP: Record<string, string> = {
    [process.env.STRIPE_TRAINING_PRICE_ID ?? '']: 'Training Blueprint',
    [process.env.STRIPE_NUTRITION_PRICE_ID ?? '']: 'Nutrition Blueprint',
    [process.env.STRIPE_BUNDLE_PRICE_ID ?? '']: 'Full Stack Bundle',
  }

  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
    expand: ['data.line_items'],
  })

  const now = Date.now() / 1000
  const dayAgo = now - 86400
  const weekAgo = now - 86400 * 7
  const monthAgo = now - 86400 * 30

  let revenueToday = 0
  let revenueWeek = 0
  let revenueAllTime = 0
  const breakdown = { training: 0, nutrition: 0, bundle: 0 }
  const recentSales: {
    id: string
    name: string
    email: string
    product: string
    amount: number
    created: number
  }[] = []

  for (const session of sessions.data) {
    if (session.mode !== 'payment' || session.payment_status !== 'paid') continue

    const lineItems = session.line_items?.data ?? []
    const priceId = lineItems[0]?.price?.id ?? ''
    const key = productKey(priceId)
    const amount = (session.amount_total ?? 0) / 100
    const created = session.created

    revenueAllTime += amount
    if (created >= weekAgo) revenueWeek += amount
    if (created >= dayAgo) revenueToday += amount
    if (created >= monthAgo && key !== 'unknown') breakdown[key]++

    if (recentSales.length < 30) {
      recentSales.push({
        id: session.id,
        name: session.customer_details?.name ?? 'Unknown',
        email: session.customer_details?.email ?? '',
        product: PRICE_MAP[priceId] ?? 'Unknown product',
        amount,
        created,
      })
    }
  }

  const totalOrders = recentSales.length

  return NextResponse.json({
    revenue: {
      today: revenueToday,
      week: revenueWeek,
      allTime: revenueAllTime,
      totalOrders,
    },
    recentSales,
    breakdown,
  })
}
