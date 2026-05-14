import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'
import { buildWeek4MilestoneEmail } from '@/app/lib/email-upsell-templates'

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const service = createSupabaseServiceClient()
  const { data: profile } = await service
    .from('profiles')
    .select('email, full_name, last_email_sent_at')
    .eq('id', user.id)
    .single()

  if (!profile?.email) return NextResponse.json({ ok: false })

  const lastSent = (profile.last_email_sent_at as Record<string, string>)?.['week_4_halfway']
  if (lastSent) return NextResponse.json({ ok: false, reason: 'already sent' })

  const firstName = (profile.full_name ?? '').split(' ')[0] || 'there'
  const nextUrl = `${process.env.NEXT_PUBLIC_APP_URL}/programme/week/5`

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Kira Mei <hello@kiramei.co.uk>',
    replyTo: 'hello@kiramei.co.uk',
    to: profile.email,
    subject: "You're halfway.",
    html: buildWeek4MilestoneEmail(firstName, nextUrl),
  })

  await service
    .from('profiles')
    .update({
      last_email_sent_at: {
        ...(profile.last_email_sent_at as object ?? {}),
        week_4_halfway: new Date().toISOString(),
      },
    })
    .eq('id', user.id)

  return NextResponse.json({ ok: true })
}
