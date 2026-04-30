import { NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

export async function GET(req: Request) {
  const secret = req.headers.get('x-studio-secret')
  if (!secret || secret !== process.env.NEXT_PUBLIC_STUDIO_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const service = createSupabaseServiceClient()

  // Fetch all data in parallel
  const [leadsRes, checkinsRes, progressRes, programmesRes, bodyCompRes] = await Promise.all([
    service.from('kira_leads').select('*').order('created_at', { ascending: false }),
    service.from('kira_checkins').select('id, user_id, week_number, submitted_at, energy, weight'),
    service.from('kira_progress').select('id, user_id, week_number, logged_at, weight'),
    service.from('kira_programmes').select('user_id, sent_at'),
    service.from('kira_body_comp').select('user_id'),
  ])

  const leads = leadsRes.data ?? []
  const checkins = checkinsRes.data ?? []
  const progress = progressRes.data ?? []
  const programmes = programmesRes.data ?? []
  const bodyComps = bodyCompRes.data ?? []

  // Build lookup sets keyed by user_id
  const programmeSentFor = new Set(programmes.map((p: any) => p.user_id))
  const bodyCompFor = new Set(bodyComps.map((b: any) => b.user_id))

  // Group checkins by user_id
  const checkinsByUser: Record<string, any[]> = {}
  for (const c of checkins) {
    if (!c.user_id) continue
    if (!checkinsByUser[c.user_id]) checkinsByUser[c.user_id] = []
    checkinsByUser[c.user_id].push(c)
  }

  // Group progress by user_id
  const progressByUser: Record<string, any[]> = {}
  for (const p of progress) {
    if (!p.user_id) continue
    if (!progressByUser[p.user_id]) progressByUser[p.user_id] = []
    progressByUser[p.user_id].push(p)
  }

  // Enrich leads
  const enrichedLeads = leads.map((lead: any) => {
    const uid = lead.user_id
    const userCheckins = uid ? (checkinsByUser[uid] ?? []) : []
    const userProgress = uid ? (progressByUser[uid] ?? []) : []

    const sortedCheckins = userCheckins.sort(
      (a: any, b: any) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
    )

    return {
      ...lead,
      programme_sent: uid ? programmeSentFor.has(uid) : false,
      checkin_count: userCheckins.length,
      last_checkin_at: sortedCheckins[0]?.submitted_at ?? null,
      progress_count: userProgress.length,
      has_body_comp: uid ? bodyCompFor.has(uid) : false,
    }
  })

  // Build recent activity feed (last 10 across checkins + progress)
  const checkinActivity = checkins
    .filter((c: any) => c.submitted_at)
    .map((c: any) => {
      const lead = leads.find((l: any) => l.user_id === c.user_id)
      return {
        type: 'checkin' as const,
        client_name: lead?.name ?? 'Unknown',
        week_number: c.week_number,
        submitted_at: c.submitted_at,
        energy: c.energy ?? undefined,
        weight: c.weight ?? undefined,
      }
    })

  const progressActivity = progress
    .filter((p: any) => p.logged_at)
    .map((p: any) => {
      const lead = leads.find((l: any) => l.user_id === p.user_id)
      return {
        type: 'progress' as const,
        client_name: lead?.name ?? 'Unknown',
        week_number: p.week_number,
        submitted_at: p.logged_at,
        weight: p.weight ?? undefined,
      }
    })

  const recentActivity = [...checkinActivity, ...progressActivity]
    .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
    .slice(0, 10)

  return NextResponse.json({ leads: enrichedLeads, recent_activity: recentActivity })
}
