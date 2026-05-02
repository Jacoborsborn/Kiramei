'use client'

import { useState } from 'react'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import FadeIn from '@/app/components/FadeIn'

function CheckoutButton({ product, label, style }: { product: string; label: string; style?: React.CSSProperties }) {
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
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: '15px 36px', borderRadius: 99, border: 'none',
        background: loading ? 'rgba(238,234,228,0.4)' : '#EEEAE4',
        color: '#080808', fontSize: 15, fontWeight: 600, letterSpacing: '0.03em',
        cursor: loading ? 'wait' : 'pointer', fontFamily: "'DM Sans', sans-serif",
        transition: 'background 0.15s', opacity: loading ? 0.7 : 1,
        ...style,
      }}
      onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#fff' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = loading ? 'rgba(238,234,228,0.4)' : '#EEEAE4' }}
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
    <main style={{ background: '#080808', minHeight: '100vh', color: '#EEEAE4' }}>
      <Navbar />

      <section style={{ padding: 'clamp(120px, 14vw, 160px) clamp(24px, 5vw, 72px) clamp(72px, 8vw, 100px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 720 }}>
            <FadeIn>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 20 }}>
                Training Blueprint — Interactive Programme
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display" style={{ fontSize: 'clamp(44px, 8vw, 88px)', lineHeight: 0.95, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 28 }}>
                8 weeks.<br />Learn to train.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontSize: 17, color: 'rgba(238,234,228,0.6)', lineHeight: 1.75, marginBottom: 48, maxWidth: 520 }}>
                Not a PDF. A live, interactive programme that unlocks week by week — with lessons, sessions, quizzes, and logs built in.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 52 }}>
                {/* Programme */}
                <div style={{
                  background: '#101010', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 20, padding: '40px 36px', flex: '1 1 300px', maxWidth: 420,
                }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 16 }}>
                    Training Blueprint
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                    <span className="font-display" style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.02em' }}>£49</span>
                    <span style={{ fontSize: 22, color: 'rgba(238,234,228,0.4)' }}>.99</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.3)', marginBottom: 32, letterSpacing: '0.06em' }}>one-time · instant access</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
                    {INCLUDES.map(item => (
                      <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <span style={{ color: '#4A7C59', fontSize: 14, marginTop: 1, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 14, color: 'rgba(238,234,228,0.7)', lineHeight: 1.55 }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <CheckoutButton product="programme" label="Get instant access — £49.99" style={{ width: '100%' }} />
                  <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.25)', marginTop: 14, textAlign: 'center' }}>
                    You'll receive an email with a direct login link after purchase.
                  </p>
                </div>

                {/* Template upsell */}
                <div style={{
                  background: '#0C0C0C', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20, padding: '40px 36px', flex: '1 1 260px', maxWidth: 360,
                }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.3)', marginBottom: 16 }}>
                    Add-on
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                    <span className="font-display" style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.02em', color: 'rgba(238,234,228,0.6)' }}>£9</span>
                    <span style={{ fontSize: 17, color: 'rgba(238,234,228,0.25)' }}>.99</span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'rgba(238,234,228,0.6)', marginBottom: 8 }}>Build Your Own Template</p>
                  <p style={{ fontSize: 13, color: 'rgba(238,234,228,0.4)', lineHeight: 1.65, marginBottom: 32 }}>
                    A blank programme template so you can build your own split using exactly what you've learned.
                  </p>
                  <CheckoutButton
                    product="template"
                    label="Add for £9.99"
                    style={{
                      width: '100%', background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: 'rgba(238,234,228,0.6)',
                    }}
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p style={{ fontSize: 13, color: 'rgba(238,234,228,0.25)' }}>
                Already purchased?{' '}
                <a href="/login" style={{ color: '#4A7C59', textDecoration: 'none' }}>Sign in →</a>
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
