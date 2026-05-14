import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { buildPostCompletionCheckinEmail } from '@/app/lib/email-upsell-templates'
import { generateUnsubscribeUrl } from '@/app/api/email/unsubscribe/route'

// Called daily by Vercel Cron at 08:00 UTC (see vercel.json).
// Finds users whose week 8 completed_at was 30–31 days ago and sends the check-in.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const service = createSupabaseServiceClient()
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const thirtyOneDaysAgo = new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString()

  // Week 8 completions in the 30–31 day window
  const { data: completions } = await service
    .from('week_progress')
    .select('user_id, completed_at')
    .eq('week_number', 8)
    .eq('week_complete', true)
    .gte('completed_at', thirtyOneDaysAgo)
    .lte('completed_at', thirtyDaysAgo)

  if (!completions?.length) return NextResponse.json({ sent: 0 })

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  let sent = 0

  for (const completion of completions) {
    const { data: profile } = await service
      .from('profiles')
      .select('id, email, full_name, last_email_sent_at, referral_code, email_opted_out')
      .eq('id', completion.user_id)
      .single()

    if (!profile?.email) continue
    if (profile.email_opted_out) continue

    const emailLog = profile.last_email_sent_at as Record<string, string> | null
    if (emailLog?.['post_completion_30d']) continue

    // Ensure referral code exists
    let referralCode = profile.referral_code as string | null
    if (!referralCode) {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      referralCode = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
      await service.from('profiles').update({ referral_code: referralCode }).eq('id', profile.id)
    }

    const firstName = (profile.full_name ?? '').split(' ')[0] || 'there'
    const referUrl = `${baseUrl}/r/${referralCode}`
    const unsubscribeUrl = await generateUnsubscribeUrl(profile.id, baseUrl)

    await resend.emails.send({
      from: 'Kira Mei <hello@kiramei.co.uk>',
      replyTo: 'hello@kiramei.co.uk',
      to: profile.email,
      subject: 'Still running it?',
      html: buildPostCompletionCheckinEmail(firstName, referralCode, referUrl, unsubscribeUrl),
    })

    await service
      .from('profiles')
      .update({
        last_email_sent_at: {
          ...(emailLog ?? {}),
          post_completion_30d: new Date().toISOString(),
        },
      })
      .eq('id', profile.id)

    sent++
  }

  return NextResponse.json({ sent })
}
