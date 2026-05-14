import { NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

export async function POST() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const service = createSupabaseServiceClient()
  const { data: profile } = await service.from('profiles').select('email, first_name').eq('id', user.id).single()

  if (profile?.email) {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { C, mono, serif, wrapper } = await import('@/app/lib/_emailShared')
    const firstName = profile.first_name || 'there'
    const body = `
      <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Data request</p>
      <p style="margin:0 0 10px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">We&rsquo;ve received your data request, ${firstName}.</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.inkSoft};">We&rsquo;re preparing a copy of your data. You&rsquo;ll receive it within 7 days as required under UK GDPR. We&rsquo;ll email you when it&rsquo;s ready.</p>
      <p style="font-size:13.5px;line-height:1.7;color:${C.inkSoft};margin:0;">Any questions? Reply to this email or contact hello@kiramei.co.uk.</p>
    `
    await resend.emails.send({
      from: 'Kira Mei <kira@kiramei.co.uk>',
      to: profile.email,
      subject: 'Data export request received',
      html: wrapper('Data export request received', body),
    })
  }

  return NextResponse.json({ ok: true })
}
