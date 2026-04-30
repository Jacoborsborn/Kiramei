import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { buildPlanEmail, type PlanJSON } from '@/lib/planEmail'

export async function POST(req: NextRequest) {
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  const secret = req.headers.get('x-studio-secret')
  if (secret !== process.env.KIRA_STUDIO_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { lead_id, plan } = await req.json() as { lead_id: string; plan: PlanJSON }

  const supabase = createSupabaseServiceClient()
  const { data: lead, error } = await supabase
    .from('kira_leads')
    .select('name, email, user_id')
    .eq('id', lead_id)
    .single()

  if (error || !lead) {
    return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
  }

  const firstName = lead.name.split(' ')[0]
  const html = buildPlanEmail(plan, lead.name)

  const { error: emailError } = await resend.emails.send({
    from: 'Kira Mei <kira@kiramei.co.uk>',
    to: lead.email,
    subject: `Your programme is ready, ${firstName}.`,
    html,
  })

  if (emailError) {
    console.error('Resend error:', emailError)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  // Store programme in DB so client can view it in the portal
  if (lead.user_id) {
    await supabase.from('kira_programmes').insert({
      lead_id,
      user_id: lead.user_id,
      programme: plan,
    })
  }

  await supabase
    .from('kira_leads')
    .update({ status: 'accepted' })
    .eq('id', lead_id)

  return NextResponse.json({ success: true })
}
