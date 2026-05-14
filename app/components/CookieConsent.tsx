'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function CookieConsent() {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'declined' | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('km_consent')
    if (stored === 'true') setStatus('accepted')
    else if (stored === 'false') setStatus('declined')
    else setStatus('pending')
  }, [])

  function accept() {
    localStorage.setItem('km_consent', 'true')
    setStatus('accepted')
  }

  function decline() {
    localStorage.setItem('km_consent', 'false')
    setStatus('declined')
  }

  return (
    <>
      {status === 'accepted' && <Script src="/km-track.js" strategy="afterInteractive" />}

      {status === 'pending' && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
          background: 'var(--ink)', color: 'var(--paper)',
          padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, flexWrap: 'wrap',
          borderTop: '2px solid var(--accent)',
        }}>
          <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, maxWidth: 640 }}>
            We use a single first-party analytics cookie to understand how people use this site.
            No advertising, no third parties.{' '}
            <a href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Privacy policy</a>
          </p>
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <button
              onClick={decline}
              style={{
                background: 'transparent', color: 'var(--paper)',
                border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 99,
                padding: '8px 20px', fontSize: 13, cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Decline
            </button>
            <button
              onClick={accept}
              style={{
                background: 'var(--accent)', color: 'var(--paper)',
                border: '1.5px solid var(--accent)', borderRadius: 99,
                padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  )
}
