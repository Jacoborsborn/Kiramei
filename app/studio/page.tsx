'use client'

import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import FadeIn from '@/app/components/FadeIn'

const TIERS = [
  { label: 'Week 0',  title: 'Onboard',       body: 'Welcome library: re-watch any module from training or nutrition course on demand.' },
  { label: 'Week 2',  title: 'Deep dives',     body: 'New 30-min education video every fortnight. Topics members vote on.' },
  { label: 'Week 4',  title: 'Form review',    body: 'Submit one video clip a month. Get a written form audit back inside 7 days.' },
  { label: 'Week 6',  title: 'Live Q&A',       body: "Monthly group call. Pre-submit questions, watch back if you can't make it." },
  { label: 'Ongoing', title: 'Members feed',   body: 'Discord-style community. Real chat, no algorithms.' },
]

const FAQS = [
  {
    q: 'Is this needed if I bought the bundle?',
    a: 'No. The bundle is a complete education — Studio is for members who finished and want a steady stream of new material, accountability, and direct access to me.',
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes. £9.99/mo, no contract, cancel from your dashboard. Your access continues until the end of the billing period.",
  },
  {
    q: 'Why £9.99?',
    a: "It's the price of two coffees. Cheap enough that you don't need to think about it; not so cheap that it gets the cheap-product treatment from me.",
  },
]

export default function StudioPage() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#EEEAE4' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(120px, 14vw, 160px) clamp(24px, 5vw, 72px) clamp(72px, 8vw, 100px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 720 }}>
            <FadeIn>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 20 }}>
                Kira Mei Studio · Optional
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display" style={{ fontSize: 'clamp(44px, 8vw, 96px)', lineHeight: 0.95, fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 28 }}>
                Finished the course?<br />Keep going.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontSize: 17, color: 'rgba(238,234,228,0.6)', lineHeight: 1.75, marginBottom: 40, maxWidth: 520 }}>
                Studio is the optional ongoing membership for graduates of the blueprint courses. New deep-dives every fortnight, monthly form reviews, a live Q&amp;A, and a community of people who've actually done the work.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                <span className="font-display" style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.02em' }}>£9.99</span>
                <span style={{ fontSize: 18, color: 'rgba(238,234,228,0.4)' }}>/mo</span>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button
                  onClick={() => { window.location.href = '/api/checkout/studio' }}
                  style={{ padding: '14px 32px', borderRadius: 99, background: '#EEEAE4', color: '#080808', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
                >
                  Join Studio →
                </button>
                <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.3)', letterSpacing: '0.06em', alignSelf: 'center' }}>
                  cancel anytime · no contract
                </p>
              </div>
              <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.25)', marginTop: 14, letterSpacing: '0.04em' }}>
                You&apos;ll need to have finished a blueprint course first.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: 'clamp(72px, 8vw, 100px) clamp(24px, 5vw, 72px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.35)', marginBottom: 16 }}>
              What&apos;s included
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 600, lineHeight: 1.05, marginBottom: 52, letterSpacing: '-0.02em' }}>
              Five things, every month.
            </h2>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {TIERS.map((t, i) => (
              <FadeIn key={t.title} delay={i * 0.07}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 220px 1fr', gap: 32, padding: '28px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: i === TIERS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', alignItems: 'start' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.18em', color: '#4A7C59', textTransform: 'uppercase', paddingTop: 2 }}>{t.label}</span>
                  <h3 className="font-display" style={{ fontSize: 22, fontWeight: 600 }}>{t.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(238,234,228,0.55)', maxWidth: 560 }}>{t.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: 'clamp(72px, 8vw, 100px) clamp(24px, 5vw, 72px)', background: '#060606' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.35)', marginBottom: 16 }}>
              Common questions
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 600, lineHeight: 1.05, marginBottom: 52, letterSpacing: '-0.02em' }}>
              Honest answers.
            </h2>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FAQS.map((f, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <details style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: i === FAQS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', padding: '20px 0' }}>
                  <summary className="font-display" style={{ fontSize: 20, fontWeight: 600, cursor: 'pointer', listStyle: 'none', color: '#EEEAE4' }}>{f.q}</summary>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(238,234,228,0.55)', marginTop: 14 }}>{f.a}</p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: 'clamp(72px, 8vw, 100px) clamp(24px, 5vw, 72px)', textAlign: 'center' }}>
        <FadeIn>
          <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 600, lineHeight: 1.1, marginBottom: 12, letterSpacing: '-0.02em' }}>
            The room after the course.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(238,234,228,0.45)', marginBottom: 36 }}>£9.99/mo · cancel any time · members-only access.</p>
          <button
            onClick={() => { window.location.href = '/api/checkout/studio' }}
            style={{ padding: '15px 36px', borderRadius: 99, background: '#EEEAE4', color: '#080808', fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
          >
            Join Studio →
          </button>
        </FadeIn>
      </section>

      <Footer />
    </main>
  )
}
