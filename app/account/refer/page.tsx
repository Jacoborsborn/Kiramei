'use client'

import { useRouter } from 'next/navigation'
import KmNavbar from '@/app/components/KmNavbar'
import KmFooter from '@/app/components/KmFooter'

export default function ReferPage() {
  const router = useRouter()

  return (
    <div className="km-page">
      <KmNavbar />
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <div style={{ width: '100%', maxWidth: 540, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>Coming soon</p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Referrals &amp; <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>rewards.</em>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.75, maxWidth: 400, margin: '0 auto 32px' }}>
            Refer a friend and you both get £10 off your next purchase. We&rsquo;re putting the finishing touches on this — it&rsquo;ll be live soon.
          </p>
          <button
            onClick={() => router.push('/account')}
            style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', background: 'transparent', border: 'none', color: 'var(--ink-muted)', cursor: 'pointer', padding: 0 }}
          >
            ← Back to account
          </button>
        </div>
      </main>
      <KmFooter />
    </div>
  )
}
