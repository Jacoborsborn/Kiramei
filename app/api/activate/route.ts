import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const { session_id, password } = await req.json() as { session_id: string; password: string }

  if (!session_id || !password) {
    return NextResponse.json({ error: 'Missing session_id or password.' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
  }

  // Verify the Stripe session
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
  const isProgramme = product === 'programme' || product === 'template'
  const accessField = product === 'template' ? 'template_access' : 'programme_access'

  const supabase = createSupabaseServiceClient()

  // Check if user already exists
  const { data: { users } } = await supabase.auth.admin.listUsers()
  const existing = users.find(u => u.email === email)

  let userId: string

  if (existing) {
    userId = existing.id
    // Update their password
    await supabase.auth.admin.updateUserById(userId, { password })
  } else {
    // Create new user with email + password
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

  // Grant access
  const profileUpdate: Record<string, unknown> = {
    id: userId,
    email,
    full_name: name || undefined,
  }
  if (isProgramme) profileUpdate[accessField] = true

  await supabase.from('profiles').upsert(profileUpdate, { onConflict: 'id' })

  return NextResponse.json({ ok: true, email })
}
