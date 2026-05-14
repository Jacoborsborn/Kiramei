import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { generateOtp, generateToken, hashValue } from '@/app/lib/accounts'
import { buildAccountActivationEmail } from '@/app/lib/emailTemplates'

export async function POST(req: NextRequest) {
  const { token } = await req.json()
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })

  const supabase = createSupabaseServiceClient()

  const { data: row } = await supabase
    .from('activation_tokens')
    .select('user_id, expires_at, used_at, updated_at')
    .eq('token', token)
    .single()

  if (!row) return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  if (row.used_at) return NextResponse.json({ error: 'Token already used' }, { status: 400 })

  const updatedAt = row.updated_at ? new Date(row.updated_at) : new Date(0)
  if (Date.now() - updatedAt.getTime() < 30_000) {
    return NextResponse.json({ error: 'Please wait 30 seconds before resending' }, { status: 429 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('email, first_name')
    .eq('id', row.user_id)
    .single()

  if (!profile?.email) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const newToken = generateToken()
  const otp = generateOtp()
  const otpHash = await hashValue(otp)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

  await supabase
    .from('activation_tokens')
    .update({ token: newToken, otp_hash: otpHash, expires_at: expiresAt, updated_at: new Date().toISOString() })
    .eq('user_id', row.user_id)

  const firstName = profile.first_name || 'there'
  const activateUrl = `${process.env.NEXT_PUBLIC_APP_URL}/activate?token=${newToken}`

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'Kira Mei <kira@kiramei.co.uk>',
    to: profile.email,
    subject: "You're in. Here's your code.",
    html: buildAccountActivationEmail(firstName, activateUrl, otp),
  })

  return NextResponse.json({ ok: true })
}
