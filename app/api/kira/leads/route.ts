import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
export async function POST(req: NextRequest) {
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()
    const supabase = createSupabaseServiceClient()

    const { data: lead, error } = await supabase
      .from('kira_leads')
      .insert([{
        name: body.name,
        age: body.age,
        country: body.country,
        email: body.email,
        instagram: body.instagram,
        plan_selected: body.plan_selected,
        goal: body.goal,
        fitness_level: body.fitness_level,
        days_per_week: body.days_per_week,
        equipment: body.equipment,
        injuries: body.injuries,
        referral_source: body.referral_source,
        notes: body.notes,
      }])
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save application' }, { status: 500 })
    }

    // Email to lead
    await resend.emails.send({
      from: 'Kira Mei <kira@kiramei.co.uk>',
      to: body.email,
      subject: 'Got your application.',
      html: `
        <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 480px; color: #1A1916;">
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            Got your application, <strong>${body.name}</strong>.
          </p>
          <p style="font-size: 16px; line-height: 1.6; color: #7A7870; margin-bottom: 24px;">
            Back to you within 48 hours. Don't message asking if I got it.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">— Kira</p>
          <hr style="border: none; border-top: 1px solid #E5E1D8; margin: 32px 0;" />
          <p style="font-size: 11px; color: #B5B0A6; letter-spacing: 0.08em; text-transform: uppercase;">
            Kira Mei — Online PT · kiramei.co.uk
          </p>
        </div>
      `,
    })

    // Email to owner
    await resend.emails.send({
      from: 'Kira Mei <kira@kiramei.co.uk>',
      to: process.env.KIRA_OWNER_EMAIL!,
      subject: `New lead — ${body.name}, ${body.age}, ${body.plan_selected}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; color: #1A1916;">
          <h2 style="margin-bottom: 24px;">New application received</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${Object.entries({
              Name: body.name,
              Age: body.age,
              Country: body.country,
              Email: body.email,
              Instagram: body.instagram || '—',
              Plan: body.plan_selected,
              Goal: body.goal || '—',
              'Fitness level': body.fitness_level || '—',
              'Days/week': body.days_per_week || '—',
              Equipment: body.equipment || '—',
              Injuries: body.injuries || '—',
              'Found via': body.referral_source || '—',
              Notes: body.notes || '—',
            }).map(([k, v]) => `
              <tr>
                <td style="padding: 8px 12px; border-bottom: 1px solid #E5E1D8; color: #7A7870; font-weight: 600; width: 130px;">${k}</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #E5E1D8;">${v}</td>
              </tr>
            `).join('')}
          </table>
        </div>
      `,
    })

    return NextResponse.json({ lead_id: lead.id })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const supabase = await import('@/lib/supabase-server').then(m => m.createSupabaseServerClient())
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const service = createSupabaseServiceClient()
  let query = service.from('kira_leads').select('*').order('created_at', { ascending: false })
  if (status && status !== 'all') query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json(data)
}
