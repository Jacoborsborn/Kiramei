import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const { token, goal, experience, trainingDaysPerWk } = await req.json()
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })

  const supabase = createSupabaseServiceClient()

  const { data: row } = await supabase
    .from('activation_tokens')
    .select('user_id, expires_at')
    .eq('token', token)
    .single()

  if (!row) return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  if (new Date(row.expires_at) < new Date()) return NextResponse.json({ error: 'Token expired' }, { status: 400 })

  const update: Record<string, unknown> = {}
  if (goal !== undefined) update.goal = goal
  if (experience !== undefined) update.experience = experience
  if (trainingDaysPerWk !== undefined) update.training_days_pw = trainingDaysPerWk

  if (Object.keys(update).length > 0) {
    await supabase.from('profiles').update(update).eq('id', row.user_id)
  }

  return NextResponse.json({ ok: true })
}
