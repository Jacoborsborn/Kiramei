import { NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const service = createSupabaseServiceClient()
  const { data: sessions } = await service
    .from('user_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('last_seen_at', { ascending: false })

  return NextResponse.json({ sessions: sessions ?? [] })
}
