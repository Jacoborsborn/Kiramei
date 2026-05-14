import KmNavbar from '@/app/components/KmNavbar'
import KmFooter from '@/app/components/KmFooter'
import WrongEmailForm from './WrongEmailForm'
import Stripe from 'stripe'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; p?: string; type?: string }>
}) {
  const { session_id, p, type } = await searchParams

  let product: 'training' | 'nutrition' | 'bundle'
  if (p === 'training' || p === 'nutrition' || p === 'bundle') {
    product = p
  } else {
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
      // session not found — proceed without email
    }
  }

  const productNames: Record<string, string> = {
    training: 'Training Blueprint',
    nutrition: 'Nutrition Blueprint',
    bundle: 'Full Stack Bundle',
  }

  return (
    <div className="km-page">
      <KmNavbar />
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <div style={{ width: '100%', maxWidth: 540, position: 'relative' }}>
          <style>{`
            .s-card{background:var(--paper);border:1.5px solid var(--ink);padding:48px 48px 44px;text-align:center;box-shadow:4px 4px 0 var(--ink);position:relative;}
            .s-card::before{content:'';position:absolute;inset:6px;border:1px dashed var(--paper-edge);pointer-events:none;}
            .s-stamp{position:absolute;top:-18px;left:50%;transform:translateX(-50%) rotate(-2deg);background:var(--accent);color:var(--paper);padding:7px 18px;font-family:var(--mono);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;white-space:nowrap;}
            .s-tick{width:60px;height:60px;border:2px solid var(--accent);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;color:var(--accent);}
            @media(max-width:580px){.s-card{padding:36px 22px;}}
          `}</style>

          <div className="s-card">
            <div className="s-stamp">Payment confirmed · {productNames[product]}</div>

            <div className="s-tick">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 16 l 6 6 l 14 -14" />
              </svg>
            </div>

            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,6vw,3rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 14, color: 'var(--ink)' }}>
              You&rsquo;re <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>in.</em>
            </h1>

            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 32 }}>
              Check your email — we&rsquo;ve sent your activation link and an 8-digit code to get started.
              {email && (
                <> Sent to <strong style={{ color: 'var(--ink)' }}>{email}</strong>.</>
              )}
            </p>

            <div style={{ background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', padding: '16px 20px', marginBottom: 24, textAlign: 'left' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 8 }}>Next steps</p>
              <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>Open the email from kira@kiramei.co.uk</li>
                <li style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>Tap &ldquo;Activate account&rdquo; or enter your 8-digit code</li>
                <li style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>Set a password and you&rsquo;re in</li>
              </ol>
            </div>

            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.1em', marginBottom: 6 }}>
              No email? Check your spam folder, or{' '}
              <a href="mailto:hello@kiramei.co.uk" style={{ color: 'var(--accent)' }}>contact us</a>.
            </p>
          </div>

          {session_id && <WrongEmailForm sessionId={session_id} currentEmail={email} />}
        </div>
      </main>
      <KmFooter />
    </div>
  )
}
