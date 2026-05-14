import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const { token } = await req.json()
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })

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
    .select('email, email_verified_at')
    .eq('id', row.user_id)
    .single()

  if (!profile?.email_verified_at) {
    return NextResponse.json({ error: 'Email not verified' }, { status: 403 })
  }

  return NextResponse.json({ email: profile.email })
}
