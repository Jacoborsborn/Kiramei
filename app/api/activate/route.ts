import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

// Maps product slug to the profile boolean fields that should be set true
const PRODUCT_ACCESS: Record<string, string[]> = {
  training:  ['programme_access'],
  nutrition: ['nutrition_access'],
  bundle:    ['programme_access', 'nutrition_access'],
  // legacy slugs
  programme: ['programme_access'],
  template:  ['template_access'],
}

export async function POST(req: NextRequest) {
  const { session_id, password } = await req.json() as { session_id: string; password: string }

  if (!session_id || !password) {
    return NextResponse.json({ error: 'Missing session_id or password.' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
  let session: Stripe.Checkout.Session
  try {
    session = await stripe.checkout.sessions.retrieve(session_id)
  } catch {
    return NextResponse.json({ error: 'Invalid session.' }, { status: 400 })
  }

  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Payment not completed.' }, { status: 402 })
  }

  const email = session.customer_details?.email
  const name  = session.customer_details?.name ?? ''
  if (!email) {
    return NextResponse.json({ error: 'No email on this session.' }, { status: 400 })
  }

  const product = session.metadata?.product ?? ''
  const accessFields = PRODUCT_ACCESS[product] ?? []

  const supabase = createSupabaseServiceClient()

  const { data: { users } } = await supabase.auth.admin.listUsers()
  const existing = users.find(u => u.email === email)

  let userId: string

  if (existing) {
    userId = existing.id
    await supabase.auth.admin.updateUserById(userId, { password })
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name },
    })
    if (error || !data.user) {
      return NextResponse.json({ error: error?.message ?? 'Failed to create account.' }, { status: 500 })
    }
    userId = data.user.id
  }

  const profileUpdate: Record<string, unknown> = {
    id: userId,
    email,
    full_name: name || undefined,
  }
  for (const field of accessFields) {
    profileUpdate[field] = true
  }

  await supabase.from('profiles').upsert(profileUpdate, { onConflict: 'id' })

  return NextResponse.json({ ok: true, email })
}
