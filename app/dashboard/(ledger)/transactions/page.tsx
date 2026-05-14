import TransactionsClient from './TransactionsClient'

export const revalidate = 60

async function getStripeData() {
  try {
    const stripe = (await import('stripe')).default
    const client = new stripe(process.env.STRIPE_SECRET_KEY!)
    const supabase = (await import('@/lib/supabase-server')).createSupabaseServiceClient()

    const [chargesRes, payoutsRes] = await Promise.all([
      client.charges.list({ limit: 50 }),
      client.payouts.list({ limit: 1, status: 'pending' }),
    ])

    const { data: leads } = await supabase
      .from('kira_leads')
      .select('email, stripe_customer_id')

    const emailByCustomer: Record<string, string> = {}
    for (const l of leads ?? []) {
      if (l.stripe_customer_id) emailByCustomer[l.stripe_customer_id as string] = l.email as string
    }

    const transactions = chargesRes.data.map(c => ({
      id:      c.id,
      when:    new Date(c.created * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      date:    new Date(c.created * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      email:   typeof c.customer === 'string' ? (emailByCustomer[c.customer] ?? (c.billing_details?.email ?? '—')) : (c.billing_details?.email ?? '—'),
      product: (c.description ?? c.metadata?.product ?? 'Training Blueprint') as string,
      amount:  c.amount / 100,
      country: (c.billing_details?.address?.country ?? '—') as string,
      status:  c.refunded ? 'refund' : (c.status === 'succeeded' ? 'paid' : c.status),
    }))

    const payout = payoutsRes.data[0]
    const nextPayout = payout
      ? {
          amount: payout.amount / 100,
          date: new Date(payout.arrival_date * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
        }
      : null

    const paid = transactions.filter(t => t.status === 'paid')
    const refunds = transactions.filter(t => t.status === 'refund')
    const gross = paid.reduce((s, t) => s + t.amount, 0)
    const refundTotal = refunds.reduce((s, t) => s + t.amount, 0)

    return { transactions, nextPayout, gross, units: paid.length, refundTotal }
  } catch {
    return { transactions: [], nextPayout: null, gross: 0, units: 0, refundTotal: 0 }
  }
}

export default async function TransactionsPage() {
  const data = await getStripeData()
  return <TransactionsClient {...data} />
}
