import { Suspense } from 'react'

export default function ActivatePendingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: 40, fontSize: 12, color: 'var(--sage)', textDecoration: 'none', letterSpacing: '0.06em' }}>
          ← kiramei.co.uk
        </a>

        <div className="paper-card" style={{ padding: '48px 40px', textAlign: 'center' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F8F6F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>

          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 16 }}>
            Payment Confirmed
          </p>
          <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.15, marginBottom: 16 }}>
            Check your inbox.
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.65, marginBottom: 32 }}>
            Your payment was successful. We&apos;ve sent an activation link to your email address. Click the link to set your password and access your client portal.
          </p>

          <div style={{
            background: '#F4F2EE', borderRadius: 12, padding: '16px 20px',
            fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6, textAlign: 'left',
          }}>
            <strong style={{ color: 'var(--ink)', display: 'block', marginBottom: 6 }}>Didn&apos;t receive the email?</strong>
            Check your spam folder, or contact <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--sage)' }}>kiira.mei@outlook.com</a> and we&apos;ll resend your activation link.
          </div>

          <p style={{ marginTop: 32, fontSize: 13, color: 'var(--ink-faint)' }}>
            Already activated?{' '}
            <a href="/login" style={{ color: 'var(--sage)', textDecoration: 'none' }}>Sign in →</a>
          </p>
        </div>
      </div>
    </div>
  )
}
