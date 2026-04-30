import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-studio-secret')
  if (!secret || secret !== process.env.NEXT_PUBLIC_STUDIO_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { lead_id, frame_type, body_fat_est, hormonal_notes, priority_areas, measurements } = body

  if (!lead_id) return NextResponse.json({ error: 'lead_id required' }, { status: 400 })

  const service = createSupabaseServiceClient()

  // Get user_id from lead
  const { data: lead } = await service
    .from('kira_leads')
    .select('user_id')
    .eq('id', lead_id)
    .single()

  if (!lead?.user_id) {
    return NextResponse.json({ error: 'Client has no portal account yet' }, { status: 400 })
  }

  // Upsert — replace existing report if present
  const { data, error } = await service
    .from('kira_body_comp')
    .upsert(
      {
        user_id: lead.user_id,
        lead_id,
        frame_type: frame_type || null,
        body_fat_est: body_fat_est || null,
        hormonal_notes: hormonal_notes || null,
        priority_areas: priority_areas || null,
        measurements: measurements || null,
        analysed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
    .select()
    .single()

  if (error) {
    console.error('Body comp upsert error:', error)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-studio-secret')
  if (!secret || secret !== process.env.NEXT_PUBLIC_STUDIO_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const leadId = searchParams.get('lead_id')
  if (!leadId) return NextResponse.json({ error: 'lead_id required' }, { status: 400 })

  const service = createSupabaseServiceClient()

  const { data: lead } = await service
    .from('kira_leads')
    .select('user_id')
    .eq('id', leadId)
    .single()

  if (!lead?.user_id) return NextResponse.json(null)

  const { data } = await service
    .from('kira_body_comp')
    .select('*')
    .eq('user_id', lead.user_id)
    .single()

  return NextResponse.json(data ?? null)
}
