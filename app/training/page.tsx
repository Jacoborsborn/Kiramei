'use client'

import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import FadeIn from '@/app/components/FadeIn'
import BuyButton from '@/app/components/BuyButton'

const WEEKS = [
  {
    weeks: 'Week 1–2',
    split: 'Full Body',
    topics: [
      'Why full body training first — building the baseline',
      'How to pick your starting weights and what RPE means',
      'Progressive overload: the only rule that matters',
    ],
  },
  {
    weeks: 'Week 3–4',
    split: 'Upper / Lower',
    topics: [
      'Why the split changes and what your body has adapted to',
      'Muscle recovery — understanding how growth actually works',
      'RPE, effort and knowing when to push vs back off',
    ],
  },
  {
    weeks: 'Week 5–6',
    split: 'Push Pull Legs',
    topics: [
      'Mind-muscle connection — why feeling the muscle matters',
      'Form cues and how to read your own body signals',
      'Volume: how much is enough, how much is too much',
    ],
  },
  {
    weeks: 'Week 7–8',
    split: 'PPL Advanced',
    topics: [
      'The deload — what it is, why it works, when you need it',
      'What comes next after the programme ends',
      'How to build your own programme from this point forward',
    ],
  },
]

export default function TrainingPage() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#EEEAE4' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(120px, 14vw, 160px) clamp(24px, 5vw, 72px) clamp(72px, 8vw, 100px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 720 }}>
            <FadeIn>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 20 }}>
                Training Blueprint
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display" style={{
                fontSize: 'clamp(44px, 8vw, 96px)',
                lineHeight: 0.95, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 28,
              }}>
                8 weeks. Every split. Total understanding.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontSize: 17, color: 'rgba(238,234,228,0.6)', lineHeight: 1.75, marginBottom: 40, maxWidth: 520 }}>
                Not just a plan to follow — a programme that teaches you exactly how training works, so you can build your own for life.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <span className="font-display" style={{ fontSize: 52, fontWeight: 600, letterSpacing: '-0.02em' }}>£49</span>
                  <span style={{ fontSize: 20, color: 'rgba(238,234,228,0.4)' }}>.99</span>
                  <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.3)', marginTop: 2, letterSpacing: '0.06em' }}>one-time · instant download</p>
                </div>
                <BuyButton product="training" label="Buy Now →" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WEEK BREAKDOWN ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(72px, 8vw, 100px) clamp(24px, 5vw, 72px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.35)', marginBottom: 16 }}>
              The curriculum
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 600, lineHeight: 1.05, marginBottom: 52, letterSpacing: '-0.02em' }}>
              What you'll learn, week by week.
            </h2>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {WEEKS.map((w, i) => (
              <FadeIn key={w.weeks} delay={i * 0.08}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 180px 1fr',
                  gap: 24,
                  padding: '32px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  alignItems: 'start',
                }}>
                  <div>
                    <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.35)', letterSpacing: '0.06em', marginBottom: 6 }}>{w.weeks}</p>
                    <p style={{ fontSize: 16, fontWeight: 600, color: '#EEEAE4' }}>{w.split}</p>
                  </div>
                  <div />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {w.topics.map(topic => (
                      <div key={topic} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <span style={{ color: '#4A7C59', fontSize: 12, marginTop: 2, flexShrink: 0 }}>—</span>
                        <span style={{ fontSize: 14, color: 'rgba(238,234,228,0.65)', lineHeight: 1.65 }}>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <style>{`
                  @media (max-width: 640px) {
                    .week-grid { grid-template-columns: 1fr !important; }
                  }
                `}</style>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(72px, 8vw, 100px) clamp(24px, 5vw, 72px)',
        background: '#060606',
      }}>
        <FadeIn>
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
            <p className="font-display" style={{
              fontSize: 'clamp(22px, 4vw, 36px)',
              fontWeight: 500, fontStyle: 'italic', lineHeight: 1.5,
              color: 'rgba(238,234,228,0.8)',
            }}>
              "This isn't a programme you follow. It's a programme that teaches you to never need one."
            </p>
            <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.25)', marginTop: 20, letterSpacing: '0.08em' }}>
              — Kira Mei
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── UPSELL ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(56px, 6vw, 80px) clamp(24px, 5vw, 72px)',
      }}>
        <FadeIn>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{
              background: '#101010', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16, padding: '32px 36px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 24, flexWrap: 'wrap',
            }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 8 }}>
                  Save £10
                </p>
                <p className="font-display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 6 }}>
                  Want the nutrition side too?
                </p>
                <p style={{ fontSize: 14, color: 'rgba(238,234,228,0.5)' }}>
                  Get both blueprints together — Training + Nutrition — for £79.99 instead of £89.98.
                </p>
              </div>
              <Link href="/bundle" style={{
                flexShrink: 0, padding: '13px 28px', borderRadius: 99,
                background: '#EEEAE4', color: '#080808',
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
                whiteSpace: 'nowrap', transition: 'background 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EEEAE4' }}
              >
                See the Bundle →
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(72px, 8vw, 100px) clamp(24px, 5vw, 72px)',
        textAlign: 'center',
      }}>
        <FadeIn>
          <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 600, lineHeight: 1.1, marginBottom: 12, letterSpacing: '-0.02em' }}>
            Ready to stop following<br />and start understanding?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(238,234,228,0.45)', marginBottom: 36 }}>One-time purchase. No subscription. Instant delivery.</p>
          <BuyButton product="training" label="Get the Training Blueprint — £49.99" />
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
