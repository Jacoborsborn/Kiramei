import Image from 'next/image'
import Link from 'next/link'
import KmNavbar from './components/KmNavbar'
import KmFooter from './components/KmFooter'

const PRODUCTS = [
  {
    id: 'training',
    href: '/training',
    label: 'Training Blueprint',
    headline: 'Build your training brain.',
    price: '£49.99',
    priceSub: 'one-time',
    featured: false,
    tag: null,
    features: [
      '8 weeks of progressive training',
      'Full body → Upper/Lower → PPL',
      'Form notes & mind maps',
      'Build-your-own template',
    ],
  },
  {
    id: 'nutrition',
    href: '/nutrition',
    label: 'Nutrition Blueprint',
    headline: 'Stop guessing food.',
    price: '£49.99',
    priceSub: 'one-time',
    featured: false,
    tag: null,
    features: [
      'Calories, protein, carbs, fats',
      'Eating around training',
      'Meal prep system',
      'Holidays & social eating',
    ],
  },
  {
    id: 'bundle',
    href: '/bundle',
    label: 'Full Stack Bundle',
    headline: 'The whole education.',
    price: '£78.99',
    priceSub: 'one-time · save £20',
    featured: true,
    tag: 'Best value · save £20',
    features: [
      'Training Blueprint (full)',
      'Nutrition Blueprint (full)',
      'Build-your-own template',
      'Lifetime updates',
    ],
  },
]

const TESTIMONIALS = [
  {
    initial: 'S',
    name: 'Sophie R.',
    loc: '24 · MANCHESTER',
    quote: "I've bought three programmes before this and never finished any of them. Eight weeks later I actually understand what I'm doing in the gym. I built my own plan last week. Never thought I'd say that.",
  },
  {
    initial: 'C',
    name: 'Chloe M.',
    loc: '27 · LEEDS',
    quote: "The nutrition blueprint genuinely changed how I think about food. No more googling meal plans. I just know what to eat and why now.",
  },
  {
    initial: 'J',
    name: 'Jade T.',
    loc: '22 · LONDON',
    quote: "Week 3 was when it clicked. I stopped just following the exercises and started actually understanding them. Worth every penny.",
  },
  {
    initial: 'R',
    name: 'Ryan K.',
    loc: '26 · BIRMINGHAM',
    quote: "Bought the bundle. Finished it. Built my own programme. That's literally what she promised and she delivered.",
  },
]

export default function Home() {
  return (
    <div className="km-page">
      <KmNavbar activePage="home" />

      <style>{`
        .hero { position: relative; padding: 80px 0 100px; overflow: hidden; }
        .hero-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(to right, rgba(201,214,226,0.28) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(201,214,226,0.28) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, black 60%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent);
        }
        .hero-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 60px; align-items: center; position: relative; }
        .hero h1 { font-size: clamp(2.6rem, 5.6vw, 4.6rem); font-weight: 500; line-height: 1.05; letter-spacing: -0.025em; margin-bottom: 28px; }
        .hero h1 em { font-style: italic; font-weight: 400; color: var(--accent); }
        .hero-tagline { font-size: 18px; line-height: 1.7; color: var(--ink-soft); max-width: 480px; margin-bottom: 36px; }
        .hero-meta { display: flex; gap: 28px; margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--paper-edge); }
        .hero-meta div { font-size: 13px; }
        .hero-meta .label { display: block; margin-bottom: 4px; }
        .hero-meta strong { font-family: var(--serif); font-weight: 500; font-size: 18px; }
        .hero-image-stack { position: relative; height: 780px; }
        .hero-poly { position: absolute; }
        .hero-poly-1 { top: 0; left: 30px; transform: rotate(-3.5deg); width: 420px; }
        .hero-poly-2 { bottom: 20px; right: 0; transform: rotate(2.8deg); width: 360px; }
        .hero-poly-note {
          position: absolute; top: 200px; left: -10px;
          background: #FBE9A8; padding: 14px 16px;
          font-family: var(--hand); font-size: 21px; color: var(--ink);
          line-height: 1.2; width: 180px; transform: rotate(-2deg);
          box-shadow: 1px 2px 0 rgba(31,27,22,0.06), 0 14px 22px -14px rgba(31,27,22,0.3);
          z-index: 5;
        }
        .hero-poly .ph { width: 100%; aspect-ratio: 4/5; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .hero-image-stack { height: 460px; max-width: 380px; margin: 0 auto; }
        }

        .principles { padding: 100px 0 60px; }
        .principles-head { display: grid; grid-template-columns: auto 1fr auto; align-items: end; gap: 32px; margin-bottom: 56px; }
        .principles-head h2 { font-size: clamp(2rem, 3.4vw, 2.8rem); max-width: 540px; }
        .principles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid var(--paper-edge); }
        .principle { padding: 36px 28px 32px 0; border-right: 1px solid var(--paper-edge); }
        .principle:last-child { border-right: none; padding-right: 0; }
        .principle:not(:first-child) { padding-left: 28px; }
        .principle-num { font-family: var(--mono); font-size: 12px; letter-spacing: 0.2em; color: var(--accent); margin-bottom: 18px; }
        .principle h3 { font-family: var(--serif); font-size: 24px; font-weight: 500; margin-bottom: 14px; }
        .principle p { font-size: 14.5px; line-height: 1.7; color: var(--ink-soft); }
        .principle-icon { width: 56px; height: 56px; margin-bottom: 18px; color: var(--ink); }
        @media (max-width: 800px) {
          .principles-grid { grid-template-columns: 1fr; }
          .principle { border-right: none; border-bottom: 1px solid var(--paper-edge); padding: 28px 0; }
          .principles-head { grid-template-columns: 1fr; }
        }

        .products { padding: 80px 0; position: relative; }
        .products-bg { position: absolute; inset: 40px 0; background: var(--paper-deep); z-index: 0; }
        .products-inner { position: relative; z-index: 1; }
        .products-head { text-align: center; margin-bottom: 56px; }
        .products-grid { display: grid; grid-template-columns: 1fr 1fr 1.1fr; gap: 22px; align-items: stretch; }
        .product-card { background: var(--paper); border: 1px solid var(--paper-edge); padding: 28px; display: flex; flex-direction: column; position: relative; border-radius: 2px; }
        .product-card.featured { background: var(--ink); color: var(--paper); border-color: var(--ink); transform: translateY(-6px); }
        .product-card.featured .label, .product-card.featured .muted { color: rgba(245,239,227,0.7); }
        .product-tag { position: absolute; top: -12px; right: 24px; background: var(--accent); color: var(--paper); font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em; padding: 6px 10px; text-transform: uppercase; transform: rotate(2deg); }
        .product-price { font-family: var(--serif); font-size: 44px; line-height: 1; font-weight: 500; letter-spacing: -0.02em; margin: 12px 0 6px; }
        .product-price-sub { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; }
        .product-feats { list-style: none; padding: 0; margin: 24px 0 28px; border-top: 1px solid var(--paper-edge); }
        .product-card.featured .product-feats { border-color: rgba(245,239,227,0.18); }
        .product-feats li { padding: 10px 0; font-size: 13.5px; line-height: 1.5; border-bottom: 1px solid var(--paper-edge); display: flex; gap: 12px; align-items: flex-start; }
        .product-card.featured .product-feats li { border-color: rgba(245,239,227,0.12); color: rgba(245,239,227,0.92); }
        .product-feats li::before { content: '✓'; color: var(--accent); font-family: var(--serif); font-weight: 600; flex-shrink: 0; line-height: 1.4; }
        .product-card.featured .product-feats li::before { color: var(--accent-soft); }
        .product-card .btn { margin-top: auto; justify-content: center; }
        .product-card.featured .btn { background: var(--paper); color: var(--ink); border-color: var(--paper); }
        @media (max-width: 900px) {
          .products-grid { grid-template-columns: 1fr; }
          .product-card.featured { transform: none; }
        }

        .method { padding: 100px 0; border-top: 1px solid var(--paper-edge); }
        .method-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; }
        .method h2 { font-size: clamp(2rem, 3.4vw, 2.8rem); margin-bottom: 16px; }
        .method .lead { font-size: 17px; line-height: 1.7; color: var(--ink-soft); max-width: 320px; }
        @media (max-width: 800px) { .method-grid { grid-template-columns: 1fr; gap: 32px; } }

        .testimonials { padding: 80px 0; border-top: 1px solid var(--paper-edge); }
        .testimonials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; margin-top: 48px; }
        .testimonial { position: relative; padding: 32px 32px 28px; background: var(--paper); border: 1px solid var(--paper-edge); border-radius: 3px; box-shadow: 0 1px 0 rgba(31,27,22,0.04), 0 12px 24px -16px rgba(31,27,22,0.18); }
        .testimonial:nth-child(2n) { transform: rotate(-0.4deg); }
        .testimonial:nth-child(2n+1) { transform: rotate(0.5deg); }
        .testimonial-quote { font-family: var(--serif); font-size: 19px; line-height: 1.55; font-weight: 400; color: var(--ink); margin-bottom: 22px; }
        .testimonial-quote::before { content: '"'; font-family: var(--serif); font-size: 56px; color: var(--accent); line-height: 0; vertical-align: -22px; margin-right: 4px; }
        .testimonial-meta { display: flex; align-items: center; gap: 14px; padding-top: 18px; border-top: 1px solid var(--paper-edge); }
        .testimonial-avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--paper-deep); border: 1.5px solid var(--paper-edge); display: flex; align-items: center; justify-content: center; font-family: var(--serif); font-weight: 500; font-size: 15px; color: var(--ink); }
        .testimonial-name { font-size: 14px; font-weight: 500; }
        .testimonial-loc { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; color: var(--ink-muted); }
        @media (max-width: 720px) { .testimonials-grid { grid-template-columns: 1fr; } }

        .bottom-cta { padding: 100px 0 80px; text-align: center; }
        .bottom-cta h2 { font-size: clamp(2.2rem, 4.4vw, 3.6rem); font-weight: 500; letter-spacing: -0.02em; max-width: 720px; margin: 0 auto 20px; }
        .bottom-cta .lead { font-size: 17px; color: var(--ink-soft); max-width: 480px; margin: 0 auto 36px; }
      `}</style>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="km-container">
            <div className="hero-grid">
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                  <span className="stamp">8 weeks · self-paced</span>
                  <span className="hand" style={{ color: 'var(--margin-red)', fontSize: 22 }}>↘ no subscriptions</span>
                </div>
                <h1>
                  Buy this once.<br />
                  <em>Never buy a plan</em><br />
                  again.
                </h1>
                <p className="hero-tagline">
                  Eight weeks of education, structure and real training. By the end you&apos;ll understand your body well enough to never need another programme.
                </p>
                <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
                  <Link href="#products" className="btn btn-accent" data-track="See the plans">See the plans →</Link>
                  <Link href="/about" className="btn btn-ghost" data-track="About Kira">About Kira</Link>
                </div>
                <div className="hero-meta">
                  <div><span className="label">Format</span><strong>In-site · weeks 1–8</strong></div>
                  <div><span className="label">Length</span><strong>8 weeks</strong></div>
                  <div><span className="label">Access</span><strong>Yours forever</strong></div>
                </div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginTop: 14 }}>
                  💻 Best experienced on a laptop or desktop
                </p>
              </div>

              <div className="hero-image-stack">
                <div className="polaroid hero-poly hero-poly-1">
                  <Image src="/screenshot-01.png" alt="Inside the programme — week overview" width={280} height={350} style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover' }} />
                  <p className="hand" style={{ textAlign: 'center', marginTop: 8, color: 'var(--ink-soft)', fontSize: 18 }}>inside the programme</p>
                </div>
                <div className="polaroid hero-poly hero-poly-2">
                  <Image src="/screenshot-02.png" alt="Inside the programme — food library" width={240} height={240} style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'cover' }} />
                  <p className="hand" style={{ textAlign: 'center', marginTop: 8, color: 'var(--ink-soft)', fontSize: 18 }}>the food library</p>
                </div>
                <div className="hero-poly-note">
                  &ldquo;the only programme<br />you&apos;ll ever need to buy.&rdquo;
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="principles">
          <div className="km-container">
            <div className="principles-head">
              <span className="eyebrow">The method</span>
              <h2>Three ideas the whole programme is built on.</h2>
              <span className="hand" style={{ color: 'var(--margin-red)', fontSize: 22, transform: 'rotate(-2deg)', display: 'inline-block' }}>★ keep this</span>
            </div>
            <div className="principles-grid">
              <div className="principle">
                <div className="principle-num">01 · Try every method</div>
                <svg className="principle-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M8 14 Q 14 8, 22 14 T 38 14 T 50 14"/>
                  <path d="M8 28 Q 14 22, 22 28 T 38 28 T 50 28"/>
                  <path d="M8 42 Q 14 36, 22 42 T 38 42 T 50 42"/>
                </svg>
                <h3>Try every split</h3>
                <p>Full body, upper/lower, push pull legs — all in eight weeks. Most people spend years guessing which approach works. You&apos;ll try them all and feel the difference.</p>
              </div>
              <div className="principle">
                <div className="principle-num">02 · Understand the why</div>
                <svg className="principle-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <circle cx="28" cy="28" r="18"/>
                  <path d="M22 24 Q 28 16, 34 24 Q 28 28, 28 34"/>
                  <circle cx="28" cy="40" r="1.4" fill="currentColor"/>
                </svg>
                <h3>Understand the why</h3>
                <p>Every week explains the logic behind the training. Progressive overload, recovery, RPE, mind-muscle connection. Education, not instruction.</p>
              </div>
              <div className="principle">
                <div className="principle-num">03 · Build your own</div>
                <svg className="principle-icon" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M10 46 L 10 14 L 46 14 L 46 46"/>
                  <path d="M10 46 L 28 32 L 46 46"/>
                  <path d="M28 14 L 28 32"/>
                </svg>
                <h3>Then build your own</h3>
                <p>By week eight you have the knowledge to never pay for a plan again. We teach you to fish. Most programmes don&apos;t — because they want you to keep buying.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="products" id="products">
          <div className="products-bg" />
          <div className="km-container products-inner">
            <div className="products-head">
              <span className="eyebrow" style={{ display: 'block', marginBottom: 18 }}>Choose your path</span>
              <h2>One-time payment. Yours forever.</h2>
              <p className="muted" style={{ fontSize: 15, marginTop: 6 }}>No subscription. No upsells after.</p>
            </div>
            <div className="products-grid">
              {PRODUCTS.map(p => (
                <div key={p.id} className={`product-card lift${p.featured ? ' featured' : ''}`}>
                  {p.tag && <span className="product-tag">{p.tag}</span>}
                  <span className="label">{p.label}</span>
                  <h3>{p.headline}</h3>
                  <p className="product-price">{p.price}</p>
                  <p className={`product-price-sub${p.featured ? '' : ' muted'}`} style={p.featured ? { color: 'var(--accent-soft)' } : {}}>{p.priceSub}</p>
                  <ul className="product-feats">
                    {p.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                  <Link href={p.href} className="btn" data-track={`Open the ${p.label}`}>
                    Open the programme →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METHOD */}
        <section className="method">
          <div className="km-container">
            <div className="method-grid">
              <div>
                <span className="eyebrow">Why it works</span>
                <h2 style={{ marginTop: 14 }}>It&apos;s not a plan. It&apos;s a textbook.</h2>
                <p className="lead">Most programmes hand you a calendar of workouts. This hands you the reasoning behind them — so the calendar becomes optional.</p>
              </div>
              <ol className="num-list">
                <li>
                  <h3 style={{ marginBottom: 6, fontSize: 18 }}>Read the week&apos;s chapter.</h3>
                  <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.7 }}>Each week opens with a short explainer. What the split is, why it exists, what to feel for. About 15 minutes.</p>
                </li>
                <li>
                  <h3 style={{ marginBottom: 6, fontSize: 18 }}>Train the sessions.</h3>
                  <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.7 }}>Three to five workouts a week with hand-drawn exercise references and form cues. Adjust weights to your level.</p>
                </li>
                <li>
                  <h3 style={{ marginBottom: 6, fontSize: 18 }}>Reflect, then continue.</h3>
                  <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.7 }}>A short reflection at the end of each week. By week eight you&apos;ll be writing your own programme on the blank template.</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials">
          <div className="km-container">
            <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
              <div>
                <span className="eyebrow">From real readers</span>
                <h2 style={{ marginTop: 12 }}>What people are saying.</h2>
              </div>
              <p className="hand" style={{ color: 'var(--margin-red)', fontSize: 24 }}>↓ ↓ ↓</p>
            </div>
            <div className="testimonials-grid">
              {TESTIMONIALS.map(t => (
                <div key={t.name} className="testimonial">
                  <p className="testimonial-quote">{t.quote}</p>
                  <div className="testimonial-meta">
                    <div className="testimonial-avatar">{t.initial}</div>
                    <div>
                      <div className="testimonial-name">{t.name}</div>
                      <div className="testimonial-loc">{t.loc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="bottom-cta">
          <div className="km-container-narrow">
            <span className="eyebrow">Ready when you are</span>
            <h2 style={{ marginTop: 18 }}>
              Stop buying plans.<br />
              Start <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>understanding</em>.
            </h2>
            <p className="lead">One purchase. Eight weeks. A lifetime of understanding.</p>
            <Link href="#products" className="btn btn-accent" data-track="See the plans (footer)">See the plans →</Link>
          </div>
        </section>
      </main>

      <KmFooter />
    </div>
  )
}
