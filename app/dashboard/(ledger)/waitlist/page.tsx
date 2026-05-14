import { createSupabaseServiceClient } from '@/lib/supabase-server'
import WaitlistClient from './WaitlistClient'
import { waitlistSeries } from '@/lib/analytics'

export const revalidate = 30

export default async function WaitlistPage() {
  const supabase = createSupabaseServiceClient()
  const { data: leads } = await supabase
    .from('kira_leads')
    .select('id, email, plan_selected, created_at')
    .eq('status', 'waitlist')
    .order('created_at', { ascending: false })

  const series = await waitlistSeries(14)

  const waitlist = (leads ?? []).map(l => ({
    id: l.id as string,
    email: l.email as string,
    product: (l.plan_selected ?? 'unknown') as string,
    joined: new Date(l.created_at as string).toLocaleString('en-GB', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    }),
  }))

  return <WaitlistClient waitlist={waitlist} series={series} />
}
