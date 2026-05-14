import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'
import { buildGraduationEmail } from '@/app/lib/email-upsell-templates'
import { generateUnsubscribeUrl } from '@/app/api/email/unsubscribe/route'

function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const service = createSupabaseServiceClient()
  const { data: profile } = await service
    .from('profiles')
    .select('email, full_name, last_email_sent_at, referral_code, email_opted_out')
    .eq('id', user.id)
    .single()

  if (!profile?.email) return NextResponse.json({ ok: false })
  if (profile.email_opted_out) return NextResponse.json({ ok: false, reason: 'opted out' })

  const lastSent = (profile.last_email_sent_at as Record<string, string>)?.['week_8_graduation']
  if (lastSent) return NextResponse.json({ ok: false, reason: 'already sent' })

  // Generate referral code if not already set
  let referralCode = profile.referral_code as string | null
  if (!referralCode) {
    referralCode = generateReferralCode()
    await service.from('profiles').update({ referral_code: referralCode }).eq('id', user.id)
  }

  const firstName = (profile.full_name ?? '').split(' ')[0] || 'there'
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!
  const unsubscribeUrl = await generateUnsubscribeUrl(user.id, baseUrl)

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  await resend.emails.send({
    from: 'Kira Mei <hello@kiramei.co.uk>',
    replyTo: 'hello@kiramei.co.uk',
    to: profile.email,
    subject: 'You finished it.',
    html: buildGraduationEmail(firstName, {
      rerunUrl:        `${baseUrl}/programme/week/1`,
      advancedPlanUrl: `${baseUrl}/advanced-plan`,
      referUrl:        `${baseUrl}/r/${referralCode}`,
      referralCode,
      unsubscribeUrl,
    }),
  })

  await service
    .from('profiles')
    .update({
      last_email_sent_at: {
        ...(profile.last_email_sent_at as object ?? {}),
        week_8_graduation: new Date().toISOString(),
      },
    })
    .eq('id', user.id)

  return NextResponse.json({ ok: true })
}
