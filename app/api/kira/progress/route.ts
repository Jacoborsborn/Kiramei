import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const service = createSupabaseServiceClient()
  const { data, error } = await service
    .from('kira_progress')
    .select('*')
    .eq('user_id', user.id)
    .order('week_number', { ascending: true })

  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const service = createSupabaseServiceClient()

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

  const { data, error } = await service.from('kira_progress').insert({
    user_id: user.id,
    lead_id: lead.id,
    week_number: body.week_number,
    waist: body.waist,
    hips: body.hips,
    weight: body.weight,
    energy_score: body.energy_score,
    strength_notes: body.strength_notes,
  }).select().single()

  if (error) return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  return NextResponse.json(data)
}
