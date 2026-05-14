import { createSupabaseServiceClient } from '@/lib/supabase-server'
import {
  topClicks, funnelData, recentPulse, visitorSeries,
  revenueSeries, waitlistSeries, liveVisitors
} from '@/lib/analytics'
import CommandCentre from './CommandCentre'

export const revalidate = 5

async function getStripeStats() {
  try {
    const stripe = (await import('stripe')).default
    const client = new stripe(process.env.STRIPE_SECRET_KEY!)
    const charges = await client.charges.list({ limit: 100 })
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 86400
    const recent = charges.data.filter(c => c.created > thirtyDaysAgo && c.status === 'succeeded')
    const revenue30 = recent.reduce((s, c) => s + c.amount, 0) / 100
    return { revenue30, units30: recent.length }
  } catch {
    return { revenue30: 0, units30: 0 }
  }
}

export default async function DashboardPage() {
  const supabase = createSupabaseServiceClient()

  const [
    { revenue30, units30 },
    { count: waitlistCount },
    liveCount,
    revSeries,
    visSeries,
    wlSeries,
    funnel,
    clicks,
    pulse,
  ] = await Promise.all([
    getStripeStats(),
    supabase.from('kira_leads').select('*', { count: 'exact', head: true }).eq('status', 'waitlist'),
    liveVisitors(),
    revenueSeries(14),
    visitorSeries(14),
    waitlistSeries(14),
    funnelData(30),
    topClicks(30),
    recentPulse(10),
  ])

  return (
    <CommandCentre
      revenue30={revenue30}
      units30={units30}
      waitlistCount={waitlistCount ?? 0}
      liveCount={liveCount}
      revSeries={revSeries}
      visSeries={visSeries}
      wlSeries={wlSeries}
      funnel={funnel}
      clicks={clicks}
      pulse={pulse}
    />
  )
}
