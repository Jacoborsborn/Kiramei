import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { generateOtp, generateToken, hashValue } from '@/app/lib/accounts'
import { buildAccountActivationEmail } from '@/app/lib/emailTemplates'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

  const supabase = createSupabaseServiceClient()

  const { data: { users } } = await supabase.auth.admin.listUsers()
  const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase())

  if (!user) return NextResponse.json({ state: 'ok' })

  const { data: profile } = await supabase
    .from('profiles')
    .select('email_verified_at, first_name')
    .eq('id', user.id)
    .single()

  if (profile?.email_verified_at) {
    return NextResponse.json({ state: 'ok' })
  }

  const newToken = generateToken()
  const otp = generateOtp()
  const otpHash = await hashValue(otp)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

  await supabase.from('activation_tokens').upsert(
    { user_id: user.id, token: newToken, otp_hash: otpHash, expires_at: expiresAt },
    { onConflict: 'user_id' },
  )

  const firstName = profile?.first_name || 'there'
  const activateUrl = `${process.env.NEXT_PUBLIC_APP_URL}/activate?token=${newToken}`

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'Kira Mei <kira@kiramei.co.uk>',
    to: email,
    subject: "You're in. Here's your code.",
    html: buildAccountActivationEmail(firstName, activateUrl, otp),
  })

  return NextResponse.json({
    state: 'check_email',
    hint: 'We sent you a fresh activation link.',
  })
}
