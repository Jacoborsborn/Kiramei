import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const service = createSupabaseServiceClient()
    const { data: lead } = await service
      .from('kira_leads')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!lead?.stripe_customer_id) {
      return NextResponse.json({ error: 'No billing account found' }, { status: 404 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
    const { return_url } = await req.json().catch(() => ({ return_url: null }))

    const session = await stripe.billingPortal.sessions.create({
      customer: lead.stripe_customer_id,
      return_url: return_url || `${process.env.NEXT_PUBLIC_APP_URL}/portal/billing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Portal session error:', err)
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 })
  }
}
