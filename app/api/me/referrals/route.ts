import { NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return '***@***'
  const masked = local.length > 2 ? local[0] + '***' + local[local.length - 1] : '***'
  return `${masked}@${domain}`
}

export async function GET() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const service = createSupabaseServiceClient()

  const [profileRes, referralsRes] = await Promise.all([
    service.from('profiles').select('referral_code, credit_pence').eq('id', user.id).single(),
    service.from('referrals').select('*').eq('referrer_id', user.id).order('created_at', { ascending: false }),
  ])

  const referrals = (referralsRes.data ?? []).map(r => ({
    id: r.id,
    referee_email: maskEmail(r.referee_email),
    status: r.status,
    reward_pence: r.reward_pence,
    unlocked_at: r.unlocked_at,
    created_at: r.created_at,
  }))

  const totalJoined = referrals.filter(r => r.status === 'joined').length
  const totalPending = referrals.filter(r => r.status === 'pending').length
  const totalEarned = referrals
    .filter(r => r.status === 'joined')
    .reduce((sum, r) => sum + (r.reward_pence ?? 0), 0)

  return NextResponse.json({
    referral_code: profileRes.data?.referral_code ?? null,
    credit_pence: profileRes.data?.credit_pence ?? 0,
    referrals,
    stats: { totalJoined, totalPending, totalEarned },
  })
}
