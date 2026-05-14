'use client'

import KmNavbar from '@/app/components/KmNavbar'
import KmFooter from '@/app/components/KmFooter'
import BuyButton from '@/app/components/BuyButton'

const PHASES = [
  {
    num: '01',
    weeks: 'Weeks 1–2',
    split: 'Full Body',
    topics: [
      'Why full body training first — building the baseline',
      'How to pick your starting weights and what RPE means',
      'Progressive overload: the only rule that matters',
    ],
  },
  {
    num: '02',
    weeks: 'Weeks 3–4',
    split: 'Upper / Lower',
    topics: [
      'Why the split changes and what your body has adapted to',
      'Muscle recovery — understanding how growth actually works',
      'RPE, effort and knowing when to push vs back off',
    ],
  },
  {
    num: '03',
    weeks: 'Weeks 5–6',
    split: 'Push Pull Legs',
    topics: [
      'Mind-muscle connection — why feeling the muscle matters',
      'Form cues and how to read your own body signals',
      'Volume: how much is enough, how much is too much',
    ],
  },
  {
    num: '04',
    weeks: 'Weeks 7–8',
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
    <div className="km-page">
      <KmNavbar activePage="training" />

      <style>{`
        .t-hero { padding: 60px 0 50px; position: relative; }
        .t-hero-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(to right, rgba(201,214,226,0.28) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(201,214,226,0.28) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, black 60%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent);
        }
        .t-hero-grid {
          display: grid; grid-template-columns: 1.3fr 1fr;
          gap: 60px; align-items: center; position: relative;
        }
        .t-hero h1 {
          font-size: clamp(2.4rem, 4.8vw, 4rem);
          font-weight: 500; letter-spacing: -0.02em; line-height: 1.05;
          margin: 20px 0 20px;
        }
        .t-hero h1 em { font-style: italic; color: var(--accent); }
        .t-hero-lead { font-size: 17px; line-height: 1.7; color: var(--ink-soft); max-width: 480px; margin-bottom: 28px; }
        .t-buy-box {
          display: flex; gap: 24px; align-items: center; flex-wrap: wrap;
          padding: 20px 24px; background: var(--paper);
          border: 1.5px solid var(--ink); border-radius: 3px;
          position: relative; max-width: 520px;
        }
        .t-buy-box::before {
          content: '';
          position: absolute; inset: 4px;
          border: 1px dashed var(--paper-edge); border-radius: 2px;
          pointer-events: none;
        }
        .t-buy-price { font-family: var(--serif); font-size: 40px; font-weight: 500; line-height: 1; }
        .t-buy-sub { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-muted); margin-top: 4px; }
        .t-cover {
          background: var(--paper); border: 1px solid var(--ink);
          padding: 32px; position: relative;
          box-shadow: 4px 4px 0 var(--ink);
          transform: rotate(-1.4deg);
        }
        .t-cover-eyebrow { font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; color: var(--accent); text-transform: uppercase; margin-bottom: 18px; }
        .t-cover h3 { font-family: var(--serif); font-size: 28px; font-weight: 500; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 16px; }
        .t-cover-divider { width: 60px; height: 2px; background: var(--ink); margin: 14px 0; }
        .t-cover-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .t-cover-list li { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; color: var(--ink-soft); padding: 6px 0; border-bottom: 1px solid var(--paper-edge); }
        .t-cover-list li span { color: var(--accent); margin-right: 8px; }

        .t-curriculum { padding: 80px 0; border-top: 1px solid var(--paper-edge); }
        .t-phases { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .t-phase {
          padding: 32px; border-right: 1px solid var(--paper-edge);
          border-bottom: 1px solid var(--paper-edge);
        }
        .t-phase:nth-child(2n) { border-right: none; }
        .t-phase:nth-child(3), .t-phase:nth-child(4) { border-bottom: none; }
        .t-phase-header { display: flex; align-items: baseline; gap: 16px; margin-bottom: 18px; }
        .t-phase-num { font-family: var(--mono); font-size: 11px; letter-spacing: 0.22em; color: var(--accent); flex-shrink: 0; }
        .t-phase-weeks { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; color: var(--ink-muted); }
        .t-phase h3 { font-family: var(--serif); font-size: 22px; font-weight: 500; margin-bottom: 16px; }
        .t-phase-topics { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .t-phase-topics li { font-size: 14px; line-height: 1.6; color: var(--ink-soft); padding-left: 16px; position: relative; }
        .t-phase-topics li::before { content: '—'; position: absolute; left: 0; color: var(--accent); }

        .t-spot { padding: 80px 0; border-top: 1px solid var(--paper-edge); background: var(--paper-deep); }
        .t-spot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .t-spot h2 { font-size: clamp(1.6rem, 2.8vw, 2.2rem); margin-bottom: 16px; }
        .t-spot-lead { font-size: 16px; line-height: 1.75; color: var(--ink-soft); margin-bottom: 28px; }
        .t-spot-detail { font-size: 14px; line-height: 1.7; color: var(--ink-soft); padding-left: 16px; border-left: 3px solid var(--accent); margin-bottom: 14px; }

        .t-mindmap { position: relative; background: var(--paper); border: 1px solid var(--paper-edge); padding: 32px; }
        .t-mindmap-inner { position: relative; height: 260px; }

        .t-features { padding: 80px 0; border-top: 1px solid var(--paper-edge); }
        .t-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 48px; }
        .t-feature { padding: 28px; background: var(--paper); border: 1px solid var(--paper-edge); border-radius: 2px; }
        .t-feature-icon { width: 48px; height: 48px; margin-bottom: 18px; color: var(--ink); }
        .t-feature h3 { font-family: var(--serif); font-size: 20px; font-weight: 500; margin-bottom: 10px; }
        .t-feature p { font-size: 14px; line-height: 1.7; color: var(--ink-soft); }

        .t-quote { padding: 80px 0; border-top: 1px solid var(--paper-edge); text-align: center; }
        .t-quote blockquote { font-family: var(--serif); font-size: clamp(1.4rem, 2.8vw, 2rem); font-weight: 400; font-style: italic; line-height: 1.55; color: var(--ink); max-width: 680px; margin: 0 auto; position: relative; }
        .t-quote blockquote::before { content: '"'; font-family: var(--serif); font-size: 80px; color: var(--accent); line-height: 0; vertical-align: -28px; margin-right: 4px; }
        .t-quote blockquote::after { content: '"'; font-family: var(--serif); font-size: 80px; color: var(--accent); line-height: 0; vertical-align: -28px; margin-left: 4px; }
        .t-quote-byline { font-family: var(--hand); font-size: 22px; color: var(--ink-muted); margin-top: 24px; }

        .t-cta { padding: 80px 0; border-top: 1px solid var(--paper-edge); text-align: center; }

        @media (max-width: 860px) {
          .t-hero-grid { grid-template-columns: 1fr; }
          .t-cover { transform: none; margin: 0 auto; max-width: 400px; }
          .t-phases { grid-template-columns: 1fr; }
          .t-phase:nth-child(2n) { border-right: none; }
          .t-phase { border-right: none !important; }
          .t-phase:last-child { border-bottom: none; }
          .t-spot-grid { grid-template-columns: 1fr; }
          .t-features-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <main>
        {/* HERO */}
        <section className="t-hero">
          <div className="t-hero-bg" />
          <div className="km-container">
            <div className="t-hero-grid">
              <div style={{ position: 'relative' }}>
                <span className="eyebrow">Training Blueprint</span>
                <h1 className="t-hero" style={{ fontFamily: 'var(--serif)' }}>
                  Build your training brain.<br />
                  <em>Never buy a plan</em> again.
                </h1>
                <p className="t-hero-lead">
                  Not just a plan to follow — eight weeks that teach you exactly how training works, so you can build your own for life.
                </p>
                <div className="t-buy-box">
                  <div>
                    <div className="t-buy-price">£49.99</div>
                    <div className="t-buy-sub">one-time · instant access</div>
                  </div>
                  <BuyButton requireTerms product="training" label="Get the Programme →" />
                </div>
                <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4 }}>Format</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>Interactive portal</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4 }}>Length</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>8 weeks</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4 }}>Access</div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>Yours forever</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="t-cover">
                  <div className="t-cover-eyebrow">Kira Mei · 2026</div>
                  <h3>Training Blueprint</h3>
                  <div className="t-cover-divider" />
                  <ul className="t-cover-list">
                    <li><span>01</span>Full Body — weeks 1–2</li>
                    <li><span>02</span>Upper / Lower — weeks 3–4</li>
                    <li><span>03</span>Push Pull Legs — weeks 5–6</li>
                    <li><span>04</span>PPL Advanced — weeks 7–8</li>
                  </ul>
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--paper-edge)' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                      8 weeks · self-paced · progressive
                    </span>
                  </div>
                  <span className="hand" style={{ position: 'absolute', bottom: 16, right: 20, fontSize: 20, color: 'var(--margin-red)', transform: 'rotate(2deg)' }}>
                    buy once ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CURRICULUM */}
        <section className="t-curriculum">
          <div className="km-container">
            <div style={{ marginBottom: 48 }}>
              <span className="eyebrow">The curriculum</span>
              <h2 style={{ marginTop: 14, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>
                Four phases. Every split. Total understanding.
              </h2>
              <p style={{ marginTop: 12, fontSize: 16, color: 'var(--ink-soft)', maxWidth: 560, lineHeight: 1.7 }}>
                Each phase builds on the last. You don&apos;t just train — you learn why the split works, what your body is adapting to, and how to read your own progress.
              </p>
            </div>
            <div className="t-phases">
              {PHASES.map(p => (
                <div key={p.num} className="t-phase">
                  <div className="t-phase-header">
                    <span className="t-phase-num">{p.num}</span>
                    <span className="t-phase-weeks">{p.weeks}</span>
                  </div>
                  <h3>{p.split}</h3>
                  <ul className="t-phase-topics">
                    {p.topics.map(t => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WEEK 1 SPOTLIGHT */}
        <section className="t-spot">
          <div className="km-container">
            <div className="t-spot-grid">
              <div>
                <span className="eyebrow">Week 01 preview</span>
                <h2 style={{ marginTop: 14 }}>What the first week actually looks like.</h2>
                <p className="t-spot-lead">
                  Week one opens with a 15-minute read: what full body training is, why it exists, and what you should feel for. Then three sessions. Then a short reflection. That&apos;s the rhythm every week follows.
                </p>
                <div className="t-spot-detail">
                  <strong style={{ fontFamily: 'var(--serif)', fontWeight: 500 }}>The brief.</strong> A short chapter explains the science — progressive overload, RPE, how to pick your starting weight. Education before action.
                </div>
                <div className="t-spot-detail">
                  <strong style={{ fontFamily: 'var(--serif)', fontWeight: 500 }}>The sessions.</strong> Three full-body workouts with hand-drawn exercise references, sets/reps, and form cues written in plain language.
                </div>
                <div className="t-spot-detail">
                  <strong style={{ fontFamily: 'var(--serif)', fontWeight: 500 }}>The mind map.</strong> Each week closes with a concept map — how everything you just learned connects. You'll actually remember it.
                </div>
              </div>

              <div className="t-mindmap">
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
                  Week 01 · Mind map
                </div>
                <div className="t-mindmap-inner">
                  {/* Centre node */}
                  <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', background: 'var(--ink)', color: 'var(--paper)', padding: '10px 16px', borderRadius: 2, fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 500, textAlign: 'center', zIndex: 2, whiteSpace: 'nowrap' }}>
                    Full Body Training
                  </div>
                  {/* Branch nodes */}
                  <div style={{ position: 'absolute', left: 12, top: 20, background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', padding: '8px 12px', borderRadius: 2, fontSize: 13, fontFamily: 'var(--sans)', color: 'var(--ink-soft)' }}>Progressive Overload</div>
                  <div style={{ position: 'absolute', right: 12, top: 20, background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', padding: '8px 12px', borderRadius: 2, fontSize: 13, fontFamily: 'var(--sans)', color: 'var(--ink-soft)' }}>RPE Scale</div>
                  <div style={{ position: 'absolute', left: 12, bottom: 20, background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', padding: '8px 12px', borderRadius: 2, fontSize: 13, fontFamily: 'var(--sans)', color: 'var(--ink-soft)' }}>Starting Weights</div>
                  <div style={{ position: 'absolute', right: 12, bottom: 20, background: 'rgba(184,84,58,0.08)', border: '1.5px solid var(--accent)', padding: '8px 12px', borderRadius: 2, fontSize: 13, fontFamily: 'var(--sans)', color: 'var(--accent)' }}>Recovery</div>
                  {/* SVG lines */}
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 300 260">
                    <line x1="150" y1="130" x2="75" y2="50" stroke="var(--paper-edge)" strokeWidth="1.5" />
                    <line x1="150" y1="130" x2="225" y2="50" stroke="var(--paper-edge)" strokeWidth="1.5" />
                    <line x1="150" y1="130" x2="75" y2="210" stroke="var(--paper-edge)" strokeWidth="1.5" />
                    <line x1="150" y1="130" x2="225" y2="210" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
                  </svg>
                </div>
                <p className="hand" style={{ color: 'var(--margin-red)', fontSize: 18, marginTop: 14 }}>← the red one unlocks in week 2</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section className="t-features">
          <div className="km-container">
            <span className="eyebrow">What&apos;s included</span>
            <h2 style={{ marginTop: 14, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>Built to teach, not just to follow.</h2>
            <div className="t-features-grid">
              <div className="t-feature">
                <svg className="t-feature-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <rect x="6" y="6" width="36" height="36" rx="1" />
                  <line x1="12" y1="18" x2="36" y2="18" />
                  <line x1="12" y1="24" x2="30" y2="24" />
                  <line x1="12" y1="30" x2="33" y2="30" />
                  <path d="M32 12 L36 16 L28 24" strokeWidth="1.2" />
                </svg>
                <h3>Form notes, every exercise</h3>
                <p>Sketchy hand-drawn diagrams with cues written in plain English — not "engage your posterior chain", but what that actually means in the gym.</p>
              </div>
              <div className="t-feature">
                <svg className="t-feature-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <circle cx="24" cy="24" r="6" />
                  <line x1="24" y1="6" x2="24" y2="14" />
                  <line x1="24" y1="34" x2="24" y2="42" />
                  <line x1="6" y1="24" x2="14" y2="24" />
                  <line x1="34" y1="24" x2="42" y2="24" />
                  <line x1="11" y1="11" x2="17" y2="17" />
                  <line x1="31" y1="31" x2="37" y2="37" />
                  <line x1="37" y1="11" x2="31" y2="17" />
                  <line x1="17" y1="31" x2="11" y2="37" />
                </svg>
                <h3>Mind map, every week</h3>
                <p>A concept map at the end of each week showing how everything connects. Build the mental model, not just the muscle.</p>
              </div>
              <div className="t-feature">
                <svg className="t-feature-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M8 42 L8 10 L40 10" />
                  <path d="M14 34 L20 20 L28 30 L34 16 L40 22" />
                  <circle cx="40" cy="22" r="2" fill="currentColor" />
                </svg>
                <h3>Build-your-own template</h3>
                <p>Week eight ends with a blank programme template. By then you have everything you need to fill it yourself — and mean it.</p>
              </div>
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="t-quote">
          <div className="km-container">
            <blockquote>
              This isn&apos;t a programme you follow. It&apos;s a programme that teaches you to never need one.
            </blockquote>
            <p className="t-quote-byline">— Kira Mei</p>
          </div>
        </section>

        {/* CTA */}
        <section className="t-cta" style={{ background: 'var(--paper-deep)' }}>
          <div className="km-container-narrow">
            <span className="eyebrow">Ready when you are</span>
            <h2 style={{ marginTop: 18, fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 16 }}>
              Stop following. Start <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>understanding</em>.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginBottom: 32 }}>
              One-time purchase. Eight weeks. A lifetime of understanding.
            </p>
            <div style={{ display: 'inline-flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <BuyButton requireTerms product="training" label="Get the Training Blueprint — £49.99" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>No subscription · Instant access</span>
            </div>
          </div>
        </section>
      </main>

      <KmFooter />
    </div>
  )
}
