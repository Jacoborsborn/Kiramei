import { createSupabaseServiceClient } from './supabase-server'

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 86400_000).toISOString()
}

export async function topClicks(days = 30) {
  const supabase = createSupabaseServiceClient()
  const { data } = await supabase
    .from('kira_events')
    .select('target')
    .eq('kind', 'click')
    .gte('ts', daysAgo(days))
    .not('target', 'is', null)

  const counts: Record<string, number> = {}
  for (const row of data ?? []) {
    counts[row.target] = (counts[row.target] ?? 0) + 1
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([label, clicks]) => ({ label, clicks }))
}

export async function funnelData(days = 30) {
  const supabase = createSupabaseServiceClient()
  const since = daysAgo(days)

  async function distinctSessions(kind: string, path?: string) {
    let q = supabase
      .from('kira_events')
      .select('session_id')
      .eq('kind', kind)
      .gte('ts', since)
    if (path) q = q.eq('path', path)
    const { data } = await q
    return new Set((data ?? []).map(r => r.session_id)).size
  }

  const landed   = await distinctSessions('pageview', '/')
  const products = await distinctSessions('pageview', '/training') // proxy for "viewed products"
  const checkout = await distinctSessions('checkout_start')
  const paid     = await distinctSessions('purchase')

  const steps = [
    { label: 'Landed on home',       value: landed,   pct: 100 },
    { label: 'Opened product page',  value: products, pct: landed ? Math.round((products / landed) * 100) : 0 },
    { label: 'Started checkout',     value: checkout, pct: landed ? Math.round((checkout / landed) * 100) : 0 },
    { label: 'Completed purchase',   value: paid,     pct: landed ? Math.round((paid / landed) * 100) : 0 },
  ]
  return steps
}

export async function topPages(days = 30) {
  const supabase = createSupabaseServiceClient()
  const { data } = await supabase
    .from('kira_events')
    .select('path')
    .eq('kind', 'pageview')
    .gte('ts', daysAgo(days))
    .not('path', 'is', null)

  const counts: Record<string, number> = {}
  for (const row of data ?? []) {
    counts[row.path] = (counts[row.path] ?? 0) + 1
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, views]) => ({ path, views }))
}

export async function topReferrers(days = 30) {
  const supabase = createSupabaseServiceClient()
  const { data } = await supabase
    .from('kira_events')
    .select('referrer')
    .eq('kind', 'pageview')
    .gte('ts', daysAgo(days))
    .not('referrer', 'is', null)
    .neq('referrer', '')

  const counts: Record<string, number> = {}
  for (const row of data ?? []) {
    counts[row.referrer] = (counts[row.referrer] ?? 0) + 1
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, visits]) => ({ name, visits }))
}

export async function liveVisitors() {
  const supabase = createSupabaseServiceClient()
  const since5m = new Date(Date.now() - 5 * 60 * 1000).toISOString()
  const { data } = await supabase
    .from('kira_events')
    .select('session_id')
    .gte('ts', since5m)

  return new Set((data ?? []).map(r => r.session_id)).size
}

export async function visitorSeries(days = 14) {
  const supabase = createSupabaseServiceClient()
  const { data } = await supabase
    .from('kira_events')
    .select('ts, visitor_id')
    .eq('kind', 'pageview')
    .gte('ts', daysAgo(days))

  // Group by day
  const byDay: Record<string, Set<string>> = {}
  for (const row of data ?? []) {
    const day = row.ts.slice(0, 10)
    if (!byDay[day]) byDay[day] = new Set()
    byDay[day].add(row.visitor_id)
  }
  const result: number[] = []
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(Date.now() - i * 86400_000).toISOString().slice(0, 10)
    result.push(byDay[day]?.size ?? 0)
  }
  return result
}

export async function revenueSeries(days = 14) {
  const supabase = createSupabaseServiceClient()
  const { data } = await supabase
    .from('kira_events')
    .select('ts, meta')
    .eq('kind', 'purchase')
    .gte('ts', daysAgo(days))

  const byDay: Record<string, number> = {}
  for (const row of data ?? []) {
    const day = row.ts.slice(0, 10)
    const amount = (row.meta as Record<string, number>)?.amount ?? 0
    byDay[day] = (byDay[day] ?? 0) + amount
  }
  const result: number[] = []
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(Date.now() - i * 86400_000).toISOString().slice(0, 10)
    result.push(byDay[day] ?? 0)
  }
  return result
}

export async function waitlistSeries(days = 14) {
  const supabase = createSupabaseServiceClient()
  const { data } = await supabase
    .from('kira_events')
    .select('ts')
    .eq('kind', 'waitlist_join')
    .gte('ts', daysAgo(days))

  const byDay: Record<string, number> = {}
  for (const row of data ?? []) {
    const day = row.ts.slice(0, 10)
    byDay[day] = (byDay[day] ?? 0) + 1
  }
  const result: number[] = []
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(Date.now() - i * 86400_000).toISOString().slice(0, 10)
    result.push(byDay[day] ?? 0)
  }
  return result
}

export async function recentPulse(limit = 10) {
  const supabase = createSupabaseServiceClient()
  const { data } = await supabase
    .from('kira_events')
    .select('*')
    .order('ts', { ascending: false })
    .limit(limit)
  return data ?? []
}
