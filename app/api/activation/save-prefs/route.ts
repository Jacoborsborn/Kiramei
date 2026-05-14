import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  const { token, weeklyRecap, productDrops, partnerOffers, longReads } = await req.json()
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })

  const supabase = createSupabaseServiceClient()

  const { data: row } = await supabase
    .from('activation_tokens')
    .select('user_id, expires_at')
    .eq('token', token)
    .single()

  if (!row) return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
  if (new Date(row.expires_at) < new Date()) return NextResponse.json({ error: 'Token expired' }, { status: 400 })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const logEntry = {
    timestamp: new Date().toISOString(),
    ip,
    weeklyRecap: weeklyRecap ?? true,
    productDrops: productDrops ?? true,
    partnerOffers: partnerOffers ?? false,
    longReads: longReads ?? false,
  }

  const { data: existing } = await supabase
    .from('email_prefs')
    .select('consent_log')
    .eq('user_id', row.user_id)
    .maybeSingle()

  const existingLog = Array.isArray(existing?.consent_log) ? existing.consent_log : []

  await supabase.from('email_prefs').upsert({
    user_id: row.user_id,
    weekly_recap: weeklyRecap ?? true,
    product_drops: productDrops ?? true,
    partner_offers: partnerOffers ?? false,
    long_reads: longReads ?? false,
    consent_log: [...existingLog, logEntry],
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' })

  return NextResponse.json({ ok: true })
}
