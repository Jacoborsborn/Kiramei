import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'
import { buildWeekCompleteEmail } from '@/app/lib/email-upsell-templates'

// Called from CompleteWeek component for weeks 1–3 and 5–7.
// Week 4 → /api/email/week-4-halfway
// Week 8 → /api/email/week-8-graduation
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { weekNum } = await req.json() as { weekNum: number }
  if (!weekNum || weekNum === 4 || weekNum === 8) {
    return NextResponse.json({ error: 'Invalid weekNum for this route' }, { status: 400 })
  }

  const service = createSupabaseServiceClient()
  const { data: profile } = await service
    .from('profiles')
    .select('email, full_name, last_email_sent_at')
    .eq('id', user.id)
    .single()

  if (!profile?.email) return NextResponse.json({ ok: false })

  const triggerKey = `week_complete_${weekNum}`
  const lastSent = (profile.last_email_sent_at as Record<string, string>)?.[triggerKey]
  if (lastSent) return NextResponse.json({ ok: false, reason: 'already sent' })

  const firstName = (profile.full_name ?? '').split(' ')[0] || 'there'
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!
  const nextUrl = `${baseUrl}/programme/week/${weekNum + 1}`

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Kira Mei <hello@kiramei.co.uk>',
    replyTo: 'hello@kiramei.co.uk',
    to: profile.email,
    subject: `Week ${String(weekNum).padStart(2, '0')} done.`,
    html: buildWeekCompleteEmail(firstName, weekNum, nextUrl),
  })

  await service
    .from('profiles')
    .update({
      last_email_sent_at: {
        ...(profile.last_email_sent_at as object ?? {}),
        [triggerKey]: new Date().toISOString(),
      },
    })
    .eq('id', user.id)

  return NextResponse.json({ ok: true })
}
