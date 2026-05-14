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

  const { error } = await service
    .from('week_progress')
    .upsert(
      {
        user_id: user.id,
        week_number: weekNum,
        programme_type: 'training',
        quiz_passed: true,
        week_complete: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,week_number,programme_type' }
    )

  if (error) {
    console.error('complete-week error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
