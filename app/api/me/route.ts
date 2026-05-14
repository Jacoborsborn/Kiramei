import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'
import { generateToken } from '@/app/lib/accounts'
import { buildAccountDeletionEmail } from '@/app/lib/emailTemplates'

async function getAuthedUser() {
  const supabase = await createSupabaseServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return null
  return user
}

export async function GET() {
  const user = await getAuthedUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseServiceClient()

  const [profileRes, prefsRes, ordersRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('email_prefs').select('*').eq('user_id', user.id).maybeSingle(),
    supabase.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
  ])

  return NextResponse.json({
    profile: profileRes.data,
    prefs: prefsRes.data,
    orders: ordersRes.data ?? [],
    credit_pence: profileRes.data?.credit_pence ?? 0,
    referral_code: profileRes.data?.referral_code ?? null,
  })
}

export async function PATCH(req: NextRequest) {
  const user = await getAuthedUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const allowed = ['first_name', 'last_name', 'country', 'date_of_birth', 'goal', 'experience', 'training_days_pw']
  const update: Record<string, unknown> = {}

  for (const key of allowed) {
    if (key in body) update[key] = body[key]
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No valid fields' }, { status: 400 })
  }

  const supabase = createSupabaseServiceClient()
  await supabase.from('profiles').update(update).eq('id', user.id)

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const user = await getAuthedUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createSupabaseServiceClient()

  const cancelToken = generateToken()
  const cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/account/cancel-deletion?token=${cancelToken}`

  await supabase
    .from('profiles')
    .update({ delete_requested_at: new Date().toISOString() })
    .eq('id', user.id)

  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, email')
    .eq('id', user.id)
    .single()

  if (profile?.email) {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Kira Mei <kira@kiramei.co.uk>',
      to: profile.email,
      subject: 'Account closing — 14 days to cancel',
      html: buildAccountDeletionEmail(profile.first_name || 'there', cancelUrl),
    })
  }

  return NextResponse.json({ ok: true })
}
