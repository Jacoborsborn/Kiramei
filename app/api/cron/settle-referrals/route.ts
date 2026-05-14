import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { buildReferralUnlockedEmail, buildFriendJoinedEmail } from '@/app/lib/emailTemplates'

export async function POST(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createSupabaseServiceClient()
  const cutoff = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()

  const { data: referrals } = await supabase
    .from('referrals')
    .select('id, referrer_id, referee_user_id, reward_pence, order_id')
    .eq('status', 'pending')

  if (!referrals?.length) return NextResponse.json({ settled: 0 })

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!
  let settled = 0

  for (const ref of referrals) {
    const { data: order } = await supabase
      .from('orders')
      .select('created_at, status')
      .eq('id', ref.order_id)
      .single()

    if (!order || order.status !== 'paid' || order.created_at > cutoff) continue

    await supabase
      .from('referrals')
      .update({ status: 'joined', unlocked_at: new Date().toISOString() })
      .eq('id', ref.id)

    await supabase.rpc('increment_credit', {
      p_user_id: ref.referrer_id,
      p_amount: ref.reward_pence,
    })

    const [referrerProfile, refereeProfile] = await Promise.all([
      supabase.from('profiles').select('email, first_name').eq('id', ref.referrer_id).single(),
      ref.referee_user_id
        ? supabase.from('profiles').select('first_name').eq('id', ref.referee_user_id).single()
        : Promise.resolve({ data: null }),
    ])

    if (referrerProfile.data?.email) {
      const creditDisplay = `£${(ref.reward_pence / 100).toFixed(0)}`
      const spendUrl = `${appUrl}/account#billing`
      const referUrl = `${appUrl}/account/refer`
      const friendName = refereeProfile.data?.first_name || 'Your friend'

      await Promise.all([
        resend.emails.send({
          from: 'Kira Mei <kira@kiramei.co.uk>',
          to: referrerProfile.data.email,
          subject: `£${ref.reward_pence / 100} just landed in your account`,
          html: buildReferralUnlockedEmail(referrerProfile.data.first_name || 'there', creditDisplay, spendUrl),
        }),
        resend.emails.send({
          from: 'Kira Mei <kira@kiramei.co.uk>',
          to: referrerProfile.data.email,
          subject: `${friendName} just joined — thanks for sharing`,
          html: buildFriendJoinedEmail(referrerProfile.data.first_name || 'there', friendName, referUrl),
        }),
      ])
    }

    settled++
  }

  return NextResponse.json({ settled })
}
