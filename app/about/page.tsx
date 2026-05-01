'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import FadeIn from '@/app/components/FadeIn'

export default function AboutPage() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#EEEAE4' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(120px, 14vw, 160px) clamp(24px, 5vw, 72px) clamp(72px, 8vw, 100px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 64,
            alignItems: 'center',
          }}>
            {/* Text */}
            <div>
              <FadeIn>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 20 }}>
                  About Kira
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="font-display" style={{
                  fontSize: 'clamp(44px, 7vw, 80px)',
                  lineHeight: 0.97, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 32,
                }}>
                  Teaching people to fish,<br />not handing them a fish.
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={{ fontSize: 16, color: 'rgba(238,234,228,0.65)', lineHeight: 1.8 }}>
                    Kira is a 20-year-old personal trainer and university student based in London. Kazakh-Asian. Currently studying, training, and building this.
                  </p>
                  <p style={{ fontSize: 16, color: 'rgba(238,234,228,0.65)', lineHeight: 1.8 }}>
                    She got frustrated watching people buy programme after programme and never actually learn anything. Follow a plan for 8 weeks, finish it, have no idea what to do next, buy another one. The cycle was endless — and profitable for everyone except the person actually trying to get fit.
                  </p>
                  <p style={{ fontSize: 16, color: 'rgba(238,234,228,0.65)', lineHeight: 1.8 }}>
                    So she built the programme she wished existed when she started. One that doesn't just tell you what to do — it explains why. One that ends with you having enough knowledge to never need to buy a plan again.
                  </p>
                  <p style={{ fontSize: 16, color: 'rgba(238,234,228,0.65)', lineHeight: 1.8 }}>
                    The brand philosophy is anti-dependency. You should not need Kira Mei after week 8. That's the whole point.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Photo */}
            <FadeIn delay={0.15}>
              <div style={{
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                aspectRatio: '3 / 4',
                background: '#111',
              }}>
                <Image
                  src="/kira.jpg"
                  alt="Kira Mei"
                  fill
                  quality={95}
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY CALLOUT ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(72px, 8vw, 100px) clamp(24px, 5vw, 72px)',
        background: '#060606',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <FadeIn>
            <p className="font-display" style={{
              fontSize: 'clamp(24px, 4.5vw, 44px)',
              fontWeight: 500, fontStyle: 'italic',
              color: 'rgba(238,234,228,0.75)', lineHeight: 1.5,
              marginBottom: 48,
            }}>
              "I got tired of watching people spend hundreds of pounds on plans they'd never understand. Buy this once. Learn everything. Never need another one."
            </p>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { label: 'Age', value: '20' },
              { label: 'Based in', value: 'London' },
              { label: 'Background', value: 'Kazakh-Asian' },
              { label: 'Status', value: 'PT & university student' },
            ].map(({ label, value }) => (
              <FadeIn key={label}>
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 20 }}>
                  <p style={{ fontSize: 11, color: 'rgba(238,234,228,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#EEEAE4' }}>{value}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(72px, 8vw, 100px) clamp(24px, 5vw, 72px)',
        textAlign: 'center',
      }}>
        <FadeIn>
          <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 600, lineHeight: 1.1, marginBottom: 12, letterSpacing: '-0.02em' }}>
            Ready to learn?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(238,234,228,0.45)', marginBottom: 36 }}>
            Pick a programme. Learn everything. Never need another one.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/bundle" style={{
              padding: '15px 36px', borderRadius: 99, background: '#EEEAE4',
              color: '#080808', fontSize: 14, fontWeight: 600, textDecoration: 'none',
              letterSpacing: '0.03em', transition: 'background 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EEEAE4' }}
            >
              See the Bundle →
            </Link>
            <Link href="/#products" style={{
              padding: '15px 32px', borderRadius: 99,
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(238,234,228,0.7)', fontSize: 14, fontWeight: 500,
              textDecoration: 'none', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EEEAE4'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(238,234,228,0.7)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
            >
              Browse all plans
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
