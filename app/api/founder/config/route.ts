import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { verifySessionToken, COOKIE_NAME } from '@/lib/founder-auth'

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? ''
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { click_count?: number }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const supabase = createSupabaseServiceClient()
  await supabase
    .from('kira_founder_config')
    .update({ click_count: body.click_count, updated_at: new Date().toISOString() })
    .eq('id', 1)

  return NextResponse.json({ ok: true })
}
