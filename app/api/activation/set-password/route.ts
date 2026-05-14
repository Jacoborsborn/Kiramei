import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

function validatePassword(pw: string): string | null {
  if (pw.length < 10) return 'Password must be at least 10 characters'
  if (!/[A-Z]/.test(pw)) return 'Password must contain an uppercase letter'
  if (!/[a-z]/.test(pw)) return 'Password must contain a lowercase letter'
  if (!/[0-9]/.test(pw)) return 'Password must contain a number'
  return null
}

export async function POST(req: NextRequest) {
  const { token, password } = await req.json()
  if (!token || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const validationError = validatePassword(password)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const supabase = createSupabaseServiceClient()

  const { data: row } = await supabase
    .from('activation_tokens')
    .select('user_id, expires_at')
    .eq('token', token)
    .single()

  if (!row) return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  if (new Date(row.expires_at) < new Date()) return NextResponse.json({ error: 'Token expired' }, { status: 400 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('email_verified_at')
    .eq('id', row.user_id)
    .single()

  if (!profile?.email_verified_at) {
    return NextResponse.json({ error: 'Email not yet verified' }, { status: 403 })
  }

  const { error } = await supabase.auth.admin.updateUserById(row.user_id, { password })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
