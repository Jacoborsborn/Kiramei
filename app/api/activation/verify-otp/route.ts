import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { hashValue } from '@/app/lib/accounts'

export async function POST(req: NextRequest) {
  const { token, otp } = await req.json()
  if (!token || !otp) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const supabase = createSupabaseServiceClient()

  const { data: row } = await supabase
    .from('activation_tokens')
    .select('user_id, otp_hash, expires_at, used_at')
    .eq('token', token)
    .single()

  if (!row) return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  if (row.used_at) return NextResponse.json({ error: 'Token already used' }, { status: 400 })
  if (new Date(row.expires_at) < new Date()) return NextResponse.json({ error: 'Token expired' }, { status: 400 })

  const hash = await hashValue(String(otp))
  if (hash !== row.otp_hash) return NextResponse.json({ error: 'Invalid code' }, { status: 400 })

  await supabase
    .from('profiles')
    .update({ email_verified_at: new Date().toISOString() })
    .eq('id', row.user_id)

  await supabase
    .from('activation_tokens')
    .update({ used_at: new Date().toISOString() })
    .eq('user_id', row.user_id)

  return NextResponse.json({ ok: true })
}
