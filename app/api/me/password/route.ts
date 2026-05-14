import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'
import { buildPasswordChangedEmail } from '@/app/lib/emailTemplates'

function validatePassword(pw: string): string | null {
  if (pw.length < 10) return 'Password must be at least 10 characters'
  if (!/[A-Z]/.test(pw)) return 'Password must contain an uppercase letter'
  if (!/[a-z]/.test(pw)) return 'Password must contain a lowercase letter'
  if (!/[0-9]/.test(pw)) return 'Password must contain a number'
  return null
}

export async function PATCH(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { current, next } = await req.json()
  if (!current || !next) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const validationError = validatePassword(next)
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: current,
  })

  if (signInError) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })

  const service = createSupabaseServiceClient()
  const { error } = await service.auth.admin.updateUserById(user.id, { password: next })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: profile } = await service.from('profiles').select('first_name, email').eq('id', user.id).single()

  if (profile?.email) {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const secureUrl = `${process.env.NEXT_PUBLIC_APP_URL}/signin/secure-account`
    await resend.emails.send({
      from: 'Kira Mei <kira@kiramei.co.uk>',
      to: profile.email,
      subject: 'Your password was changed',
      html: buildPasswordChangedEmail(profile.first_name || 'there', secureUrl),
    })
  }

  return NextResponse.json({ ok: true })
}
