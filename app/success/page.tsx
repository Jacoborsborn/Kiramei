import Navbar from '@/app/components/Navbar'
import ActivateForm from './ActivateForm'
import Stripe from 'stripe'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; type?: string }>
}) {
  const { session_id, type } = await searchParams
  const isProgramme = type !== 'pdf'

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
    <main style={{ background: '#080808', minHeight: '100vh', color: '#EEEAE4', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px' }}>
        <ActivateForm email={email} sessionId={session_id ?? ''} isProgramme={isProgramme} />
      </div>
    </main>
  )
}
