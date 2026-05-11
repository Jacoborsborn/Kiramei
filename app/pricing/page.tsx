'use client'

import { useState } from 'react'
import KmNavbar from '@/app/components/KmNavbar'
import KmFooter from '@/app/components/KmFooter'

function CheckoutButton({ product, label, ghost }: { product: string; label: string; ghost?: boolean }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      if (url) window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={ghost ? 'km-btn km-btn-ghost' : 'km-btn km-btn-accent'}
      style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.6 : 1, cursor: loading ? 'wait' : 'pointer' }}
    >
      {loading ? 'Redirecting…' : label}
    </button>
  )
}

const INCLUDES = [
  '8 weeks of structured, progressive training',
  'Full Body → Upper/Lower → PPL → PPL Advanced',
  'Weekly educational lessons — understand the why',
  'Session A, B, C per week with exercise logs',
  'Weekly quiz to lock in your knowledge',
  'Track your sessions and mark weeks complete',
  'Week-unlock system — one week at a time',
  'Yours forever — revisit any time',
]

export default function PricingPage() {
  return (
    <div className="km-page">
      <KmNavbar />
      <main>
        <section style={{ padding: '60px 0 80px' }}>
          <div className="km-container">
            <div style={{ maxWidth: 720 }}>
              <span className="km-eyebrow">Training Blueprint — Interactive Programme</span>
              <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05, margin: '18px 0 24px' }}>
                8 weeks.<br /><em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Learn to train.</em>
              </h1>
              <p style={{ fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.75, marginBottom: 48, maxWidth: 520 }}>
                Not a PDF. A live, interactive programme that unlocks week by week — with lessons, sessions, quizzes, and logs built in.
              </p>

              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 52 }}>
                {/* Main card */}
                <div style={{ background: 'var(--paper)', border: '1.5px solid var(--ink)', padding: '36px 32px', flex: '1 1 300px', maxWidth: 420, boxShadow: '4px 4px 0 var(--ink)', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 6, border: '1px dashed var(--paper-edge)', pointerEvents: 'none', borderRadius: 1 }} />
                  <span className="km-eyebrow" style={{ display: 'block', marginBottom: 16 }}>Training Blueprint</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: 52, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>£49.99</span>
                  </div>
                  <p className="km-label" style={{ marginBottom: 32 }}>one-time · instant access</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                    {INCLUDES.map(item => (
                      <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--accent)', fontSize: 14, marginTop: 1, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <CheckoutButton product="programme" label="Get instant access — £49.99" />
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', marginTop: 14, textAlign: 'center' }}>
                    Email with login link sent instantly after purchase.
                  </p>
                </div>

                {/* Template add-on */}
                <div style={{ background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', padding: '36px 32px', flex: '1 1 260px', maxWidth: 340, borderRadius: 2 }}>
                  <span className="km-label" style={{ marginBottom: 16, display: 'block' }}>Add-on</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: 40, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink-soft)', lineHeight: 1 }}>£9.99</span>
                  </div>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 600, color: 'var(--ink-soft)', marginBottom: 8 }}>Build Your Own Template</p>
                  <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.65, marginBottom: 32 }}>
                    A blank programme template so you can build your own split using exactly what you've learned.
                  </p>
                  <CheckoutButton product="template" label="Add for £9.99" ghost />
                </div>
              </div>

              <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                Already purchased?{' '}
                <a href="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sign in →</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <KmFooter />
    </div>
  )
}
