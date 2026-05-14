import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { verifySessionToken, COOKIE_NAME } from '@/lib/founder-auth'

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? ''
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { ids: string[]; subject: string; body: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!body.subject || !body.body || !body.ids?.length) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createSupabaseServiceClient()
  const { data: leads } = await supabase
    .from('kira_leads')
    .select('id, email')
    .in('id', body.ids)
    .eq('status', 'waitlist')

  if (!leads?.length) {
    return NextResponse.json({ error: 'No matching leads' }, { status: 404 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const results = await Promise.allSettled(
    leads.map(lead =>
      resend.emails.send({
        from: 'Kira Mei <hello@kiramei.co>',
        to: lead.email as string,
        subject: body.subject,
        text: body.body,
      })
    )
  )

  const sent = results.filter(r => r.status === 'fulfilled').length

  // Log sends
  await supabase.from('kira_lead_emails').insert(
    leads.map(l => ({
      lead_id: l.id,
      subject: body.subject,
      body: body.body,
    }))
  )

  return NextResponse.json({ ok: true, sent, total: leads.length })
}
