'use client'

import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import FadeIn from '@/app/components/FadeIn'
import BuyButton from '@/app/components/BuyButton'

const TRAINING_WEEKS = [
  { weeks: 'Week 1–2', split: 'Full Body',          topics: ['Why full body training first', 'Picking weights & understanding RPE', 'Progressive overload fundamentals'] },
  { weeks: 'Week 3–4', split: 'Upper / Lower',       topics: ['Why the split changes', 'Muscle recovery & adaptation', 'Effort management & auto-regulation'] },
  { weeks: 'Week 5–6', split: 'Push Pull Legs',      topics: ['Mind-muscle connection', 'Form cues & body awareness', 'Volume management'] },
  { weeks: 'Week 7–8', split: 'PPL Advanced',        topics: ['Deload explained', 'What comes next', 'How to build your own programme'] },
]

const NUTRITION_WEEKS = [
  { week: 'Week 1', topic: 'Calories' },
  { week: 'Week 2', topic: 'Protein' },
  { week: 'Week 3', topic: 'Carbohydrates' },
  { week: 'Week 4', topic: 'Fats' },
  { week: 'Week 5', topic: 'Eating around training' },
  { week: 'Week 6', topic: 'Meal prep & shopping' },
  { week: 'Week 7', topic: 'Social life & consistency' },
  { week: 'Week 8', topic: 'Build your own approach' },
]

export default function BundlePage() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#EEEAE4' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(120px, 14vw, 160px) clamp(24px, 5vw, 72px) clamp(72px, 8vw, 100px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 800 }}>
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A7C59' }}>
                  Full Stack Bundle
                </span>
                <span style={{ background: '#4A7C59', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 99 }}>
                  Best Value
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display" style={{
                fontSize: 'clamp(44px, 8vw, 96px)',
                lineHeight: 0.95, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 28,
              }}>
                The full stack. Training and nutrition. One price.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontSize: 17, color: 'rgba(238,234,228,0.6)', lineHeight: 1.75, marginBottom: 40, maxWidth: 560 }}>
                Everything you need to understand your body. Nothing you'll ever need to rebuy.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap', marginBottom: 40 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                    <span className="font-display" style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.02em' }}>£79</span>
                    <span style={{ fontSize: 22, color: 'rgba(238,234,228,0.4)' }}>.99</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.3)', letterSpacing: '0.06em' }}>one-time · instant download</p>
                </div>
                <div style={{ paddingTop: 8 }}>
                  <p style={{ fontSize: 13, color: 'rgba(238,234,228,0.35)', textDecoration: 'line-through', marginBottom: 4 }}>
                    £89.98 if bought separately
                  </p>
                  <p style={{ fontSize: 13, color: '#4A7C59', fontWeight: 600 }}>
                    You save £10
                  </p>
                </div>
              </div>
              <BuyButton product="bundle" label="Get the Bundle →" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(72px, 8vw, 100px) clamp(24px, 5vw, 72px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.35)', marginBottom: 16 }}>
              What's included
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 600, lineHeight: 1.05, marginBottom: 52, letterSpacing: '-0.02em' }}>
              Both curricula, side by side.
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>

            {/* Training */}
            <FadeIn delay={0.05}>
              <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', height: '100%' }}>
                <div style={{ background: '#141414', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '24px 28px' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 8 }}>Training Blueprint</p>
                  <p className="font-display" style={{ fontSize: 28, fontWeight: 600 }}>8 weeks · 4 splits</p>
                </div>
                <div style={{ padding: '24px 28px' }}>
                  {TRAINING_WEEKS.map(w => (
                    <div key={w.weeks} style={{ paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                        <span style={{ fontSize: 12, color: 'rgba(238,234,228,0.3)', whiteSpace: 'nowrap', paddingTop: 1 }}>{w.weeks}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#EEEAE4' }}>{w.split}</span>
                      </div>
                      {w.topics.map(t => (
                        <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 6, paddingLeft: 4 }}>
                          <span style={{ color: '#4A7C59', fontSize: 11, marginTop: 2, flexShrink: 0 }}>✓</span>
                          <span style={{ fontSize: 12, color: 'rgba(238,234,228,0.5)', lineHeight: 1.6 }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Nutrition */}
            <FadeIn delay={0.1}>
              <div style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', height: '100%' }}>
                <div style={{ background: '#141414', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '24px 28px' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 8 }}>Nutrition Blueprint</p>
                  <p className="font-display" style={{ fontSize: 28, fontWeight: 600 }}>8 weeks · 8 modules</p>
                </div>
                <div style={{ padding: '24px 28px' }}>
                  {NUTRITION_WEEKS.map(w => (
                    <div key={w.week} style={{ display: 'flex', gap: 16, paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: 'rgba(238,234,228,0.3)', whiteSpace: 'nowrap', width: 60, flexShrink: 0 }}>{w.week}</span>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <span style={{ color: '#4A7C59', fontSize: 11, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#EEEAE4' }}>{w.topic}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>

          {/* Build Your Own bonus */}
          <FadeIn delay={0.15}>
            <div style={{
              marginTop: 20,
              background: '#101010', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16, padding: '28px 32px',
              display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 8 }}>Bonus</p>
                <p className="font-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Build Your Own Template PDF</p>
                <p style={{ fontSize: 14, color: 'rgba(238,234,228,0.5)' }}>A blank programme template with everything you need to design your own training from week 9 onwards.</p>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(238,234,228,0.3)', whiteSpace: 'nowrap' }}>Included free</div>
            </div>
          </FadeIn>
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
              "Everything you need to understand your body. Nothing you'll ever need to rebuy."
            </p>
            <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.25)', marginTop: 20, letterSpacing: '0.08em' }}>
              — Kira Mei
            </p>
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
            The complete system.<br />One purchase. Forever.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(238,234,228,0.45)', marginBottom: 36 }}>Training Blueprint + Nutrition Blueprint + Build Your Own Template</p>
          <BuyButton product="bundle" label="Get the Full Stack Bundle — £79.99" />
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
