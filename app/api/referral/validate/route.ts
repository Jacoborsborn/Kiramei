import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ valid: false })

  const supabase = createSupabaseServiceClient()

  const { data } = await supabase
    .from('profiles')
    .select('first_name')
    .ilike('referral_code', code)
    .maybeSingle()

  if (!data) return NextResponse.json({ valid: false })

  return NextResponse.json({ valid: true, referrerName: data.first_name ?? null })
}
