import { NextResponse } from 'next/server'
import Stripe from 'stripe'


function productKey(priceId: string): 'training' | 'nutrition' | 'bundle' | 'programme' | 'template' | 'unknown' {
  if (priceId === process.env.STRIPE_TRAINING_PRICE_ID) return 'training'
  if (priceId === process.env.STRIPE_NUTRITION_PRICE_ID) return 'nutrition'
  if (priceId === process.env.STRIPE_BUNDLE_PRICE_ID) return 'bundle'
  if (priceId === process.env.STRIPE_PROGRAMME_PRICE_ID) return 'programme'
  if (priceId === process.env.STRIPE_TEMPLATE_PRICE_ID) return 'template'
  return 'unknown'
}

export async function GET(req: Request) {
  if (req.headers.get('x-studio-secret') !== process.env.STUDIO_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })

  const PRICE_MAP: Record<string, string> = {
    [process.env.STRIPE_TRAINING_PRICE_ID ?? '']: 'Training Blueprint PDF',
    [process.env.STRIPE_NUTRITION_PRICE_ID ?? '']: 'Nutrition Blueprint PDF',
    [process.env.STRIPE_BUNDLE_PRICE_ID ?? '']: 'Full Stack Bundle',
    [process.env.STRIPE_PROGRAMME_PRICE_ID ?? '']: 'Training Blueprint Programme',
    [process.env.STRIPE_TEMPLATE_PRICE_ID ?? '']: 'Build Your Own Template',
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
  const breakdown = { training: 0, nutrition: 0, bundle: 0, programme: 0, template: 0 }
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
    if (created >= monthAgo && key !== 'unknown') breakdown[key as keyof typeof breakdown]++

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
