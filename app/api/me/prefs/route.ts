import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

export async function PATCH(req: NextRequest) {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { weeklyRecap, productDrops, partnerOffers, longReads, pausedUntil } = await req.json()

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const logEntry = {
    timestamp: new Date().toISOString(),
    ip,
    weeklyRecap,
    productDrops,
    partnerOffers,
    longReads,
  }

  const service = createSupabaseServiceClient()

  const { data: existing } = await service
    .from('email_prefs')
    .select('consent_log')
    .eq('user_id', user.id)
    .maybeSingle()

  const existingLog = Array.isArray(existing?.consent_log) ? existing.consent_log : []

  const update: Record<string, unknown> = {
    user_id: user.id,
    consent_log: [...existingLog, logEntry],
    updated_at: new Date().toISOString(),
  }

  if (weeklyRecap !== undefined) update.weekly_recap = weeklyRecap
  if (productDrops !== undefined) update.product_drops = productDrops
  if (partnerOffers !== undefined) update.partner_offers = partnerOffers
  if (longReads !== undefined) update.long_reads = longReads
  if (pausedUntil !== undefined) update.paused_until = pausedUntil

  await service.from('email_prefs').upsert(update, { onConflict: 'user_id' })

  return NextResponse.json({ ok: true })
}
