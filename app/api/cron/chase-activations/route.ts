import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { generateOtp, generateToken, hashValue } from '@/app/lib/accounts'
import { buildAccountActivationEmail } from '@/app/lib/emailTemplates'

export async function POST(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createSupabaseServiceClient()
  const now = Date.now()
  const cutoff14d = new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString()

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, email, first_name, created_at')
    .is('email_verified_at', null)
    .gt('created_at', cutoff14d)

  if (!profiles?.length) return NextResponse.json({ chased: 0 })

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!
  let chased = 0

  for (const profile of profiles) {
    const daysSince = (now - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24)
    if (daysSince < 1 || (daysSince >= 2 && daysSince < 3) || (daysSince >= 4 && daysSince < 7)) continue

    const { data: tokenRow } = await supabase
      .from('activation_tokens')
      .select('token, expires_at')
      .eq('user_id', profile.id)
      .maybeSingle()

    let activateToken: string
    let otp: string

    if (!tokenRow || new Date(tokenRow.expires_at) < new Date()) {
      const newToken = generateToken()
      otp = generateOtp()
      const otpHash = await hashValue(otp)
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

      await supabase.from('activation_tokens').upsert(
        { user_id: profile.id, token: newToken, otp_hash: otpHash, expires_at: expiresAt },
        { onConflict: 'user_id' },
      )
      activateToken = newToken
    } else {
      activateToken = tokenRow.token
      otp = '--------'
    }

    if (!profile.email) continue

    const activateUrl = `${appUrl}/activate?token=${activateToken}`
    const firstName = profile.first_name || 'there'

    await resend.emails.send({
      from: 'Kira Mei <kira@kiramei.co.uk>',
      to: profile.email,
      subject: "You're in. Here's your code.",
      html: buildAccountActivationEmail(firstName, activateUrl, otp),
    })

    chased++
  }

  return NextResponse.json({ chased })
}
