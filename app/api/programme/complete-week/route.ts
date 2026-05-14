import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { weekNum } = await req.json() as { weekNum: number }
  if (!weekNum || weekNum < 1 || weekNum > 8) {
    return NextResponse.json({ error: 'Invalid weekNum' }, { status: 400 })
  }

  const service = createSupabaseServiceClient()

  // Verify the quiz is actually passed before allowing completion
  const { data: existing } = await service
    .from('week_progress')
    .select('quiz_passed, week_complete')
    .eq('user_id', user.id)
    .eq('week_number', weekNum)
    .maybeSingle()

  if (!existing?.quiz_passed) {
    return NextResponse.json({ error: 'Quiz not passed' }, { status: 403 })
  }

  if (existing.week_complete) {
    return NextResponse.json({ ok: true, alreadyComplete: true })
  }

  const { error } = await service
    .from('week_progress')
    .update({ week_complete: true, completed_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .eq('week_number', weekNum)

  if (error) {
    console.error('complete-week upsert error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
