import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-studio-secret')
  if (secret !== process.env.KIRA_STUDIO_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createSupabaseServiceClient()
  const { data, error } = await supabase
    .from('kira_leads')
    .select('id, name, email, plan_selected, status')
    .in('status', ['paid', 'accepted'])
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: 'DB error' }, { status: 500 })
  return NextResponse.json(data)
}
