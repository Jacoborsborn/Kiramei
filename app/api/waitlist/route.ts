import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, product } = await request.json()

  if (!email || !product) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  if (!['nutrition', 'bundle'].includes(product)) {
    return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
  }

  const supabase = createSupabaseServiceClient()

  const { error } = await supabase.from('waitlist').upsert(
    { email: email.toLowerCase().trim(), product },
    { onConflict: 'email,product' }
  )

  if (error) {
    console.error('Waitlist insert error:', error)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
