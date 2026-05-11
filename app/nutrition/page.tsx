'use client'

import KmNavbar from '@/app/components/KmNavbar'
import KmFooter from '@/app/components/KmFooter'

const WEEKS = [
  {
    num: '01',
    topic: 'Calories & TDEE',
    desc: 'What a calorie actually is, why energy balance is the foundation, and how to find your TDEE without obsessing over numbers.',
  },
  {
    num: '02',
    topic: 'Macros',
    desc: 'Protein non-negotiable, carbs and fats flexible. The simple framework for splitting your calories around your goals.',
  },
  {
    num: '03',
    topic: 'Protein sourcing',
    desc: 'Meat, plant, and budget options side by side. What 30g of protein actually looks like across each source.',
  },
  {
    num: '04',
    topic: 'Meal timing & training nutrition',
    desc: 'Pre, intra, and post-workout. What actually moves the needle vs what is marketing dressed as science.',
  },
  {
    num: '05',
    topic: 'Meal prep & budget eating',
    desc: 'Cheap staples, batch cooking, no faff. The Sunday system that turns "what should I eat" into a non-question.',
  },
  {
    num: '06',
    topic: 'Fat loss without wrecking training',
    desc: 'Deficit mechanics. How to lean out without losing the muscle you have spent weeks training to build.',
  },
  {
    num: '07',
    topic: 'Building & maintaining muscle',
    desc: 'Surplus, recomp reality check, and the slow-and-boring truth about building muscle no one wants to sell you.',
  },
  {
    num: '08',
    topic: 'Build your own approach',
    desc: 'Take everything you\'ve learned and design your own nutrition approach. The last nutrition education you\'ll ever need to buy.',
  },
]

export default function NutritionPage() {
  return (
    <div className="km-page">
      <KmNavbar activePage="nutrition" />

      <style>{`
        .n-hero { padding: 60px 0 50px; position: relative; }
        .n-hero-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(to right, rgba(201,214,226,0.28) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(201,214,226,0.28) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, black 60%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent);
        }
        .n-hero-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 60px; align-items: center; position: relative; }
        .n-hero h1 { font-size: clamp(2.4rem, 4.8vw, 4rem); font-weight: 500; letter-spacing: -0.02em; line-height: 1.05; margin: 20px 0 20px; }
        .n-hero h1 em { font-style: italic; color: var(--accent); }
        .n-coming-soon {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 16px 24px; background: var(--paper-deep);
          border: 1.5px solid var(--paper-edge); border-radius: 3px;
        }
        .n-curriculum { padding: 80px 0; border-top: 1px solid var(--paper-edge); }
        .n-week-row {
          display: grid; grid-template-columns: 56px 200px 1fr; gap: 24px;
          padding: 22px 0; border-bottom: 1px solid var(--paper-edge); align-items: start;
        }
        .n-week-num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; color: var(--accent); border: 1.5px solid var(--accent); padding: 4px 8px; border-radius: 2px; background: rgba(184,84,58,0.04); display: inline-block; }
        .n-week-topic { font-family: var(--serif); font-size: 18px; font-weight: 500; }
        .n-week-desc { font-size: 14px; line-height: 1.7; color: var(--ink-soft); }

        .n-quote { padding: 80px 0; border-top: 1px solid var(--paper-edge); text-align: center; background: var(--paper-deep); }
        .n-cta { padding: 80px 0; border-top: 1px solid var(--paper-edge); text-align: center; }

        @media (max-width: 860px) {
          .n-hero-grid { grid-template-columns: 1fr; }
          .n-week-row { grid-template-columns: 56px 1fr; }
          .n-week-desc { grid-column: 1 / -1; padding-top: 0; }
        }
        @media (max-width: 600px) {
          .n-week-row { grid-template-columns: 1fr; gap: 8px; }
        }
      `}</style>

      <main>
        {/* HERO */}
        <section className="n-hero">
          <div className="n-hero-bg" />
          <div className="km-container">
            <div className="n-hero-grid">
              <div style={{ position: 'relative' }}>
                <span className="eyebrow">Nutrition Blueprint</span>
                <h1 className="n-hero" style={{ fontFamily: 'var(--serif)' }}>
                  Understand food.<br />
                  <em>Stop guessing</em> forever.
                </h1>
                <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 480, marginBottom: 28 }}>
                  Not a meal plan. A complete nutrition education — 8 weeks of learning how food actually works, so you never need to google &ldquo;what should I eat&rdquo; again.
                </p>

                {/* Coming Soon lock */}
                <div className="n-coming-soon">
                  <div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 500, lineHeight: 1 }}>£39</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: 4 }}>one-time · instant access</div>
                  </div>
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', background: 'var(--paper-edge)', borderRadius: 2, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', cursor: 'default' }}>
                      <span>⏳</span> Coming Soon
                    </div>
                    <p className="hand" style={{ color: 'var(--margin-red)', fontSize: 18, marginTop: 8 }}>dropping soon ↘</p>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)', padding: 28, position: 'relative', boxShadow: '4px 4px 0 var(--ink)', transform: 'rotate(-1.2deg)' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 16 }}>Kira Mei · Coming Soon</div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 500, marginBottom: 14 }}>Nutrition Blueprint</h3>
                  <div style={{ width: 50, height: 2, background: 'var(--ink)', margin: '12px 0' }} />
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {['Calories & TDEE', 'Macros demystified', 'Meal prep system', 'Build your own approach'].map(item => (
                      <li key={item} style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-soft)', padding: '5px 0', borderBottom: '1px solid var(--paper-edge)' }}>
                        <span style={{ color: 'var(--accent)', marginRight: 8 }}>—</span>{item}
                      </li>
                    ))}
                  </ul>
                  <span className="stamp" style={{ position: 'absolute', bottom: 16, right: -8, transform: 'rotate(4deg)', fontSize: 10 }}>Coming Soon</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CURRICULUM */}
        <section className="n-curriculum">
          <div className="km-container">
            <div style={{ marginBottom: 48 }}>
              <span className="eyebrow">The curriculum</span>
              <h2 style={{ marginTop: 14, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>8 weeks of nutrition education.</h2>
              <p style={{ marginTop: 12, fontSize: 16, color: 'var(--ink-soft)', maxWidth: 560, lineHeight: 1.7 }}>
                No meal plan. No macros spreadsheet. Every week teaches you a principle you can use for life — starting from the basics and building to a system you build yourself.
              </p>
            </div>
            <div>
              {WEEKS.map(w => (
                <div key={w.num} className="n-week-row">
                  <div><span className="n-week-num">Wk {w.num}</span></div>
                  <div className="n-week-topic">{w.topic}</div>
                  <div className="n-week-desc">{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="n-quote">
          <div className="km-container-narrow">
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', lineHeight: 1.55, color: 'var(--ink)', position: 'relative' }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 72, color: 'var(--accent)', lineHeight: 0, verticalAlign: '-24px', marginRight: 4 }}>&ldquo;</span>
              This isn&apos;t a meal plan. It&apos;s the last nutrition education you&apos;ll ever need to buy.
              <span style={{ fontFamily: 'var(--serif)', fontSize: 72, color: 'var(--accent)', lineHeight: 0, verticalAlign: '-24px', marginLeft: 4 }}>&rdquo;</span>
            </p>
            <p className="hand" style={{ color: 'var(--ink-muted)', fontSize: 22, marginTop: 20 }}>— Kira Mei</p>
          </div>
        </section>

        {/* CTA */}
        <section className="n-cta">
          <div className="km-container-narrow">
            <span className="eyebrow">Launching soon</span>
            <h2 style={{ marginTop: 18, fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)', marginBottom: 16 }}>
              Interested? Training Blueprint is live now.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginBottom: 32, lineHeight: 1.7 }}>
              The Nutrition Blueprint is coming soon. In the meantime, the Training Blueprint is available today — and it covers the nutrition principles that matter most for training.
            </p>
            <a href="/training" className="btn btn-accent">See the Training Blueprint →</a>
          </div>
        </section>
      </main>

      <KmFooter />
    </div>
  )
}
