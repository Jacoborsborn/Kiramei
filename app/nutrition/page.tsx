'use client'

import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import FadeIn from '@/app/components/FadeIn'
import BuyButton from '@/app/components/BuyButton'

const WEEKS = [
  {
    week: 'Week 1',
    topic: 'Calories',
    desc: 'What a calorie actually is, why the in/out model works, and how to find your maintenance without obsessing over numbers.',
  },
  {
    week: 'Week 2',
    topic: 'Protein',
    desc: 'Why protein is the most important macro, how much you actually need, and how to hit it consistently without spending a fortune.',
  },
  {
    week: 'Week 3',
    topic: 'Carbohydrates',
    desc: 'The truth about carbs — when they help, when they don\'t, and why you shouldn\'t fear them.',
  },
  {
    week: 'Week 4',
    topic: 'Fats',
    desc: 'Dietary fat, hormones, and performance. How to choose the right fats and stop treating all fat the same.',
  },
  {
    week: 'Week 5',
    topic: 'Eating around training',
    desc: 'Pre-workout, post-workout, nutrient timing — what actually matters vs what\'s marketing noise.',
  },
  {
    week: 'Week 6',
    topic: 'Meal prep & shopping',
    desc: 'How to build a grocery shop around your goals, batch cook efficiently, and eat well without spending all weekend in the kitchen.',
  },
  {
    week: 'Week 7',
    topic: 'Social life & consistency',
    desc: 'Eating out, alcohol, weekends, holidays — how to stay consistent without becoming someone nobody wants to eat with.',
  },
  {
    week: 'Week 8',
    topic: 'Building your own approach',
    desc: 'Take everything you\'ve learned and design your own eating framework. The last nutrition education you\'ll ever need to buy.',
  },
]

export default function NutritionPage() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#EEEAE4' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(120px, 14vw, 160px) clamp(24px, 5vw, 72px) clamp(72px, 8vw, 100px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 720 }}>
            <FadeIn>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 20 }}>
                Nutrition Blueprint
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display" style={{
                fontSize: 'clamp(44px, 8vw, 96px)',
                lineHeight: 0.95, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 28,
              }}>
                Understand food. Stop guessing forever.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontSize: 17, color: 'rgba(238,234,228,0.6)', lineHeight: 1.75, marginBottom: 40, maxWidth: 520 }}>
                Not a meal plan. A complete nutrition education — 8 weeks of learning how food actually works, so you never need to google "what should I eat" again.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <div>
                  <span className="font-display" style={{ fontSize: 52, fontWeight: 600, letterSpacing: '-0.02em' }}>£39</span>
                  <span style={{ fontSize: 20, color: 'rgba(238,234,228,0.4)' }}>.99</span>
                  <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.3)', marginTop: 2, letterSpacing: '0.06em' }}>one-time · instant download</p>
                </div>
                <BuyButton product="nutrition" label="Buy Now →" />
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
              8 weeks of nutrition education.
            </h2>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {WEEKS.map((w, i) => (
              <FadeIn key={w.week} delay={i * 0.06}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 160px 1fr',
                  gap: 24,
                  padding: '28px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  alignItems: 'start',
                }}>
                  <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.3)', letterSpacing: '0.06em', paddingTop: 2 }}>{w.week}</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#EEEAE4' }}>{w.topic}</p>
                  <p style={{ fontSize: 14, color: 'rgba(238,234,228,0.55)', lineHeight: 1.7 }}>{w.desc}</p>
                </div>
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
              "This isn't a meal plan. It's the last nutrition education you'll ever need to buy."
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
                  Pair it with the training blueprint.
                </p>
                <p style={{ fontSize: 14, color: 'rgba(238,234,228,0.5)' }}>
                  Get Training + Nutrition together for £79.99. That's £10 off and the complete system.
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
            Stop guessing.<br />Start knowing.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(238,234,228,0.45)', marginBottom: 36 }}>One-time purchase. No subscription. Instant delivery.</p>
          <BuyButton product="nutrition" label="Get the Nutrition Blueprint — £39.99" />
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
