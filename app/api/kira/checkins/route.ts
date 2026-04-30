import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const service = createSupabaseServiceClient()
  const { data, error } = await service
    .from('kira_checkins')
    .select('*')
    .eq('user_id', user.id)
    .order('week_number', { ascending: false })

  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const service = createSupabaseServiceClient()

  // Get lead_id for this user
  const { data: lead } = await service
    .from('kira_leads')
    .select('id, plan_selected')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!lead || lead.plan_selected !== 'bundle') {
    return NextResponse.json({ error: 'Pro plan required' }, { status: 403 })
  }

  const { data, error } = await service.from('kira_checkins').insert({
    user_id: user.id,
    lead_id: lead.id,
    week_number: body.week_number,
    energy: body.energy,
    sleep_hrs: body.sleep_hrs,
    sessions_completed: body.sessions_completed,
    weight: body.weight,
    notes: body.notes,
  }).select().single()

  if (error) return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  return NextResponse.json(data)
}
