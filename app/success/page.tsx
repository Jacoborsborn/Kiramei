import KmNavbar from '@/app/components/KmNavbar'
import KmFooter from '@/app/components/KmFooter'
import ActivateForm from './ActivateForm'
import Stripe from 'stripe'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; p?: string; type?: string }>
}) {
  const { session_id, p, type } = await searchParams

  // Support both ?p=training|nutrition|bundle (new) and ?type=programme|pdf (legacy)
  let product: 'training' | 'nutrition' | 'bundle'
  if (p === 'training' || p === 'nutrition' || p === 'bundle') {
    product = p
  } else {
    // legacy: type=programme → training, anything else → nutrition
    product = type === 'programme' ? 'training' : 'nutrition'
  }

  let email = ''

  if (session_id) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-03-25.dahlia' })
      const session = await stripe.checkout.sessions.retrieve(session_id)
      if (session.payment_status === 'paid') {
        email = session.customer_details?.email ?? ''
      }
    } catch {
      // session not found — email stays empty, user can still proceed
    }
  }

  return (
    <div className="km-page">
      <KmNavbar />
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <ActivateForm email={email} sessionId={session_id ?? ''} product={product} />
      </main>
      <KmFooter />
    </div>
  )
}
