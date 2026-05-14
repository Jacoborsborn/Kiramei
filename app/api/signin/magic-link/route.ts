import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { generateToken } from '@/app/lib/accounts'
import { buildMagicLinkEmail } from '@/app/lib/emailTemplates'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ ok: true })

  const supabase = createSupabaseServiceClient()

  const { data: { users } } = await supabase.auth.admin.listUsers()
  const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase())

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name')
      .eq('id', user.id)
      .single()

    const token = generateToken()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()

    await supabase.from('magic_link_tokens').insert({
      user_id: user.id,
      token,
      expires_at: expiresAt,
    })

    const firstName = profile?.first_name || 'there'
    const magicLinkUrl = `${process.env.NEXT_PUBLIC_APP_URL}/signin/verify?token=${token}`

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Kira Mei <kira@kiramei.co.uk>',
      to: email,
      subject: 'Sign in to Kira Mei',
      html: buildMagicLinkEmail(firstName, magicLinkUrl),
    })
  }

  return NextResponse.json({ ok: true })
}
