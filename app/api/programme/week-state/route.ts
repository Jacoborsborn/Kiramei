import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const weekNum = parseInt(req.nextUrl.searchParams.get('weekNum') ?? '')
  if (!weekNum) return NextResponse.json({ error: 'Missing weekNum' }, { status: 400 })

  const service = createSupabaseServiceClient()
  const { data } = await service
    .from('week_progress')
    .select('quiz_passed, week_complete')
    .eq('user_id', user.id)
    .eq('week_number', weekNum)
    .eq('programme_type', 'training')
    .maybeSingle()

  return NextResponse.json(data ?? { quiz_passed: false, week_complete: false })
}
