import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { buildWeekInactiveEmail } from '@/app/lib/email-upsell-templates'

// Called daily by Vercel Cron at 08:00 UTC (see vercel.json).
// Finds users on the training programme who haven't logged an exercise in 4+ days
// and are on an incomplete week. Sends once per inactive period (deduped via
// last_email_sent_at — resets when they complete a week).
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const service = createSupabaseServiceClient()
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!
  const cutoff = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()

  // Users who have programme access, haven't completed the programme,
  // and haven't logged any exercise in the last 4 days.
  const { data: candidates } = await service
    .from('profiles')
    .select(`
      id, email, full_name, last_email_sent_at, email_opted_out,
      exercise_logs ( logged_at )
    `)
    .eq('programme_access', true)
    .eq('programme_complete', false)

  if (!candidates?.length) return NextResponse.json({ sent: 0 })

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  let sent = 0

  for (const profile of candidates) {
    if (!profile.email) continue

    // Check last exercise log
    const logs = (profile.exercise_logs as { logged_at: string }[] | null) ?? []
    const lastLogged = logs.length
      ? logs.reduce((max, l) => l.logged_at > max ? l.logged_at : max, logs[0].logged_at)
      : null

    const isInactive = !lastLogged || lastLogged < cutoff
    if (!isInactive) continue
    if ((profile as { email_opted_out?: boolean }).email_opted_out) continue

    // Dedupe: skip if inactive email was sent after the last exercise log
    const emailLog = profile.last_email_sent_at as Record<string, string> | null
    const lastInactiveSent = emailLog?.['week_inactive']
    if (lastInactiveSent && (!lastLogged || lastInactiveSent > lastLogged)) continue

    // Find their current week (lowest incomplete week)
    const { data: progress } = await service
      .from('week_progress')
      .select('week_number, week_complete')
      .eq('user_id', profile.id)
      .eq('programme_type', 'training')
      .order('week_number', { ascending: true })

    const currentWeek = progress?.find(w => !w.week_complete)?.week_number ?? 1
    const firstName = (profile.full_name ?? '').split(' ')[0] || 'there'
    const resumeUrl = `${baseUrl}/programme/week/${currentWeek}`

    await resend.emails.send({
      from: 'Kira Mei <hello@kiramei.co.uk>',
      replyTo: 'hello@kiramei.co.uk',
      to: profile.email,
      subject: 'Still there?',
      html: buildWeekInactiveEmail(firstName, currentWeek, resumeUrl),
    })

    await service
      .from('profiles')
      .update({
        last_email_sent_at: {
          ...(emailLog ?? {}),
          week_inactive: new Date().toISOString(),
        },
      })
      .eq('id', profile.id)

    sent++
  }

  return NextResponse.json({ sent })
}
