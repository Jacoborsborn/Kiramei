'use client'

import { useState } from 'react'
import KmNavbar from '@/app/components/KmNavbar'
import KmFooter from '@/app/components/KmFooter'

const TRAINING_CURRICULUM = [
  { weeks: 'WK 1–2', title: 'Full Body', desc: 'Why full body works · How to pick weights · Progressive overload' },
  { weeks: 'WK 3–4', title: 'Upper / Lower', desc: 'Why the split changes · Recovery & frequency · RPE' },
  { weeks: 'WK 5–6', title: 'Push Pull Legs', desc: 'Mind-muscle connection · Form cues · Reading your body' },
  { weeks: 'WK 7–8', title: 'PPL Advanced', desc: 'Deload concept · What comes next · Build your own' },
]

const NUTRITION_CURRICULUM = [
  { weeks: 'WK 01', title: 'Calories', desc: 'Energy balance and finding your number.' },
  { weeks: 'WK 02', title: 'Protein', desc: 'The macro that matters most.' },
  { weeks: 'WK 03–04', title: 'Carbs & Fats', desc: 'Fuel for training and hormonal health.' },
  { weeks: 'WK 05–06', title: 'Eating & Prep', desc: 'Around training and weekly systems.' },
  { weeks: 'WK 07–08', title: 'Real life', desc: 'Holidays, restaurants, and your own approach.' },
]

function WaitlistForm({ product }: { product: 'nutrition' | 'bundle' }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product }),
      })
      if (!res.ok) throw new Error()
      setState('done')
    } catch {
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div style={{ padding: '16px 20px', background: 'rgba(184,84,58,0.06)', border: '1.5px solid rgba(184,84,58,0.25)', borderRadius: 3 }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500, marginBottom: 4 }}>You&apos;re on the list.</p>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
          Early access code sent to your inbox when we launch.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 4 }}>
        Join the waitlist — get early access
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={{
            flex: '1 1 220px', padding: '11px 14px',
            background: 'var(--paper)', border: '1.5px solid var(--ink)',
            borderRadius: 3, fontFamily: 'var(--sans)', fontSize: 14,
            color: 'var(--ink)', outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          style={{
            padding: '11px 20px', background: 'var(--ink)', color: 'var(--paper)',
            border: 'none', borderRadius: 3, fontFamily: 'var(--mono)',
            fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            cursor: state === 'loading' ? 'wait' : 'pointer',
            opacity: state === 'loading' ? 0.6 : 1,
            whiteSpace: 'nowrap',
          }}
        >
          {state === 'loading' ? 'Joining…' : 'Notify me'}
        </button>
      </div>
      {state === 'error' && (
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--margin-red)' }}>
          Something went wrong — try again.
        </p>
      )}
    </form>
  )
}

export default function BundlePage() {
  return (
    <div className="km-page">
      <KmNavbar activePage="bundle" />

      <style>{`
        .b-hero { padding: 60px 0 50px; position: relative; }
        .b-hero-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px; align-items: center; }
        .b-hero h1 { font-size: clamp(2.4rem, 5vw, 4rem); font-weight: 500; letter-spacing: -0.02em; line-height: 1.05; margin: 24px 0; }
        .b-hero h1 em { font-style: italic; color: var(--accent); }
        .b-hero-lead { font-size: 17px; line-height: 1.7; color: var(--ink-soft); max-width: 480px; margin-bottom: 32px; }
        .b-price-row { display: flex; align-items: baseline; gap: 18px; margin-bottom: 18px; flex-wrap: wrap; }
        .b-price { font-family: var(--serif); font-size: 56px; font-weight: 500; letter-spacing: -0.02em; line-height: 1; }
        .b-price-was { font-family: var(--serif); font-size: 22px; color: var(--ink-muted); text-decoration: line-through; }
        .b-save { background: var(--accent); color: var(--paper); font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; padding: 5px 10px; transform: rotate(-2deg); display: inline-block; text-transform: uppercase; }
        .b-fineprint { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-muted); margin-top: 14px; }

        .b-hero-stack { position: relative; min-height: 460px; }
        .b-cover { background: var(--paper); border: 1px solid var(--ink); padding: 28px; box-shadow: 4px 4px 0 var(--ink); position: absolute; width: 230px; }
        .b-cover h3 { font-family: var(--serif); font-size: 24px; font-weight: 500; line-height: 1.1; margin: 10px 0; }
        .b-cover-1 { left: 0; top: 20px; transform: rotate(-3deg); z-index: 1; }
        .b-cover-2 { right: 10px; top: 80px; transform: rotate(3.5deg); z-index: 2; }
        .b-stamp-floating {
          position: absolute; bottom: 0; left: 50%; transform: translateX(-40%) rotate(-4deg);
          background: var(--accent); color: var(--paper);
          padding: 14px 22px; font-family: var(--mono); font-size: 12px;
          letter-spacing: 0.18em; text-transform: uppercase; z-index: 3;
          box-shadow: 2px 3px 0 var(--ink);
        }
        @media (max-width: 900px) {
          .b-hero-grid { grid-template-columns: 1fr; }
          .b-hero-stack { min-height: 380px; max-width: 360px; }
        }

        .b-curr { padding: 80px 0; border-top: 1px solid var(--paper-edge); background: var(--paper-deep); }
        .b-curr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
        .b-col h3 { font-family: var(--serif); font-size: 26px; font-weight: 500; margin-bottom: 4px; letter-spacing: -0.01em; }
        .b-col-sub { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 24px; }
        .b-col-list { display: flex; flex-direction: column; margin-top: 24px; }
        .b-col-item { padding: 14px 0; border-top: 1px solid var(--paper-edge); display: grid; grid-template-columns: 76px 1fr; gap: 18px; align-items: start; }
        .b-col-item:last-child { border-bottom: 1px solid var(--paper-edge); }
        .b-col-item .wk { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; color: var(--ink-muted); padding-top: 3px; }
        .b-col-item h4 { font-family: var(--serif); font-size: 17px; font-weight: 500; margin-bottom: 4px; }
        .b-col-item p { font-size: 13px; color: var(--ink-soft); line-height: 1.55; }
        @media (max-width: 800px) { .b-curr-grid { grid-template-columns: 1fr; } }

        .b-quote { padding: 80px 0; border-top: 1px solid var(--paper-edge); text-align: center; }
        .b-quote blockquote { font-family: var(--serif); font-style: italic; font-size: clamp(1.6rem, 3vw, 2.4rem); line-height: 1.3; max-width: 760px; margin: 0 auto; }
        .b-quote blockquote::before { content: '"'; font-size: 56px; line-height: 0; color: var(--accent); vertical-align: -22px; }
        .b-quote blockquote::after { content: '"'; font-size: 56px; line-height: 0; color: var(--accent); vertical-align: -22px; }

        .b-cta { padding: 80px 0; border-top: 1px solid var(--paper-edge); text-align: center; }
        .b-cta h2 { font-size: clamp(2rem, 3.6vw, 2.8rem); margin-bottom: 16px; }
        .b-cta p { color: var(--ink-soft); margin-bottom: 28px; }
      `}</style>

      <main>
        {/* HERO */}
        <section className="b-hero">
          <div className="km-container">
            <div className="b-hero-grid">
              <div>
                <span className="eyebrow">Full Stack Bundle</span>
                <h1>The full stack.<br />Training and nutrition.<br /><em>One price.</em></h1>
                <p className="b-hero-lead">
                  Both blueprints together. Everything you need to understand your body — inside and outside the gym. The only programme you&apos;ll ever need to buy.
                </p>
                <div className="b-price-row">
                  <span className="b-price">£78.99</span>
                  <span className="b-price-was">£98.99</span>
                  <span className="b-save">Save £20</span>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <WaitlistForm product="bundle" />
                </div>
                <p className="b-fineprint">Launching soon · Nutrition Blueprint coming · Training available now</p>
              </div>

              <div className="b-hero-stack">
                <div className="b-cover b-cover-1">
                  <p className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase' }}>Vol. 01</p>
                  <h3>Training<br />Blueprint</h3>
                  <div style={{ width: 50, height: 2, background: 'var(--ink)', marginTop: 10 }} />
                  <p className="muted" style={{ fontSize: 12, marginTop: 12 }}>8 weeks · 4 splits</p>
                </div>
                <div className="b-cover b-cover-2">
                  <p className="mono" style={{ fontSize: 10, letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase' }}>Vol. 02</p>
                  <h3>Nutrition<br />Blueprint</h3>
                  <div style={{ width: 50, height: 2, background: 'var(--ink)', marginTop: 10 }} />
                  <p className="muted" style={{ fontSize: 12, marginTop: 12 }}>8 weeks · 8 modules</p>
                </div>
                <div className="b-stamp-floating">Coming soon · save £20</div>
              </div>
            </div>
          </div>
        </section>

        {/* CURRICULUM */}
        <section className="b-curr">
          <div className="km-container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="eyebrow">What&apos;s inside</span>
              <h2 style={{ marginTop: 12 }}>Sixteen weeks of education.</h2>
            </div>
            <div className="b-curr-grid">
              <div className="b-col">
                <p className="b-col-sub">Volume 01 · Training</p>
                <h3>Training Blueprint</h3>
                <div className="b-col-list">
                  {TRAINING_CURRICULUM.map(item => (
                    <div key={item.weeks} className="b-col-item">
                      <span className="wk">{item.weeks}</span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="b-col">
                <p className="b-col-sub">Volume 02 · Nutrition</p>
                <h3>Nutrition Blueprint</h3>
                <div className="b-col-list">
                  {NUTRITION_CURRICULUM.map(item => (
                    <div key={item.weeks} className="b-col-item">
                      <span className="wk">{item.weeks}</span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PULL QUOTE */}
        <section className="b-quote">
          <div className="km-container">
            <blockquote>Everything you need to understand your body. Nothing you&apos;ll ever need to rebuy.</blockquote>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="b-cta">
          <div className="km-container-narrow">
            <h2>Both blueprints. One price.</h2>
            <p>Save £20 and get the complete education — training and nutrition together.</p>
            <div style={{ maxWidth: 480, margin: '0 auto' }}>
              <WaitlistForm product="bundle" />
            </div>
          </div>
        </section>
      </main>

      <KmFooter />
    </div>
  )
}
