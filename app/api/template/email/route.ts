import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

type ExerciseEntry = { name: string; sets: string; reps: string; rest: string }
type SessionEntry = { label: string; day: string; exercises: ExerciseEntry[] }
type Plan = { name: string; split: string; goal: string; sessions: SessionEntry[] }

function buildPlanEmail(plan: Plan, firstName: string): string {
  const sessionRows = plan.sessions
    .filter(s => s.exercises.some(e => e.name))
    .map(s => {
      const exercises = s.exercises
        .filter(e => e.name)
        .map(e => `
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e8dece;font-family:Georgia,serif;font-size:14px;color:#1F1B16;">${e.name}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e8dece;font-family:monospace;font-size:12px;color:#B8543A;text-align:center;">${e.sets}×${e.reps}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e8dece;font-family:monospace;font-size:11px;color:#8a7d6b;text-align:center;">${e.rest}</td>
          </tr>`)
        .join('')
      return `
        <div style="margin-bottom:28px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <span style="font-family:monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#B8543A;border:1px solid #B8543A;padding:3px 8px;">${s.day}</span>
            <span style="font-family:Georgia,serif;font-size:16px;font-weight:500;color:#1F1B16;">${s.label}</span>
          </div>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e8dece;">
            <thead>
              <tr style="background:#f0e9dd;">
                <th style="padding:6px 12px;font-family:monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#8a7d6b;text-align:left;">Exercise</th>
                <th style="padding:6px 12px;font-family:monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#8a7d6b;text-align:center;">Sets×Reps</th>
                <th style="padding:6px 12px;font-family:monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:#8a7d6b;text-align:center;">Rest</th>
              </tr>
            </thead>
            <tbody>${exercises}</tbody>
          </table>
        </div>`
    })
    .join('')

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your training plan — Kira Mei</title></head>
<body style="margin:0;padding:0;background:#f0e9dd;font-family:Georgia,serif;">
  <div style="padding:48px 0 80px;">
    <div style="max-width:620px;margin:0 auto;background:#F5EFE3;border:1px solid #e8dece;border-radius:4px;overflow:hidden;box-shadow:0 24px 48px -20px rgba(31,27,22,0.2);">

      <!-- Header -->
      <div style="padding:16px 28px;border-bottom:1px solid #e8dece;background:#f0e9dd;display:flex;align-items:center;gap:12px;">
        <div style="width:32px;height:32px;border:1.5px solid #1F1B16;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-weight:600;transform:rotate(-3deg);">K</div>
        <div>
          <p style="margin:0;font-weight:500;font-size:13px;color:#1F1B16;">Kira Mei</p>
          <p style="margin:0;font-family:monospace;font-size:11px;color:#8a7d6b;letter-spacing:0.06em;">hello@kiramei.co.uk</p>
        </div>
      </div>

      <!-- Subject -->
      <div style="padding:18px 28px 14px;border-bottom:1px solid #e8dece;">
        <p style="margin:0 0 4px;font-family:monospace;font-size:10px;letter-spacing:0.16em;color:#8a7d6b;text-transform:uppercase;">Subject</p>
        <h1 style="margin:0;font-family:Georgia,serif;font-size:22px;font-weight:500;color:#1F1B16;">${plan.name || 'Your training plan'}</h1>
      </div>

      <!-- Body -->
      <div style="padding:36px 32px;">
        <p style="font-family:Georgia,serif;font-size:28px;font-weight:500;letter-spacing:-0.02em;color:#1F1B16;margin:0 0 12px;">
          Here&rsquo;s your plan, ${firstName}.
        </p>
        <p style="font-size:15px;color:#5c5044;line-height:1.7;margin:0 0 32px;">
          Split: <strong>${plan.split}</strong> &nbsp;&middot;&nbsp; Goal: <strong>${plan.goal}</strong>
        </p>

        ${sessionRows}

        <p style="font-size:14px;color:#5c5044;line-height:1.7;margin-top:32px;">
          This plan was built with the knowledge from your Kira Mei Training Blueprint. Own it.
        </p>
        <p style="font-family:'Comic Sans MS',cursive;font-size:26px;color:#B8543A;margin-top:20px;">— Kira</p>
      </div>

      <!-- Footer -->
      <div style="padding:20px 32px;border-top:1px solid #e8dece;background:#f0e9dd;display:flex;justify-content:space-between;font-family:monospace;font-size:10px;letter-spacing:0.16em;color:#8a7d6b;text-transform:uppercase;">
        <span>© KIRA MEI · MMXXVI</span>
        <span>KIRAMEI.CO.UK</span>
      </div>
    </div>
  </div>
</body></html>`
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { plan } = await req.json() as { plan: Plan }
  if (!plan) return NextResponse.json({ error: 'No plan provided' }, { status: 400 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', user.id)
    .single()

  const toEmail = profile?.email ?? user.email
  if (!toEmail) return NextResponse.json({ error: 'No email on account' }, { status: 400 })

  const firstName = profile?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'there'
  const html = buildPlanEmail(plan, firstName)
  const subject = plan.name ? `Your plan: ${plan.name}` : 'Your training plan — Kira Mei'

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: 'Kira Mei <hello@kiramei.co.uk>',
    to: toEmail,
    subject,
    html,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
