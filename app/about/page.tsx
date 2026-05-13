'use client'

import Image from 'next/image'
import Link from 'next/link'
import KmNavbar from '@/app/components/KmNavbar'
import KmFooter from '@/app/components/KmFooter'

export default function AboutPage() {
  return (
    <div className="km-page">
      <KmNavbar activePage="about" />
      <style>{`
        .about-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px; align-items: start; }
        .about-photo-wrap { position: relative; display: inline-block; max-width: 100%; }
        .about-photo-inner { background: #FBF7EE; padding: 14px 14px 50px; box-shadow: 0 1px 0 rgba(31,27,22,0.06), 0 18px 32px -16px rgba(31,27,22,0.28); transform: rotate(-2deg); display: inline-block; max-width: 100%; }
        .about-photo-inner img { display: block; width: 360px; max-width: 100%; height: auto; object-fit: cover; }
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .about-photo-col { display: flex; justify-content: center; }
          .about-photo-inner img { width: 100%; max-width: 420px; height: auto; }
          .about-photo-inner { transform: rotate(-1deg); }
        }
      `}</style>
      <main>
        {/* ── HERO ── */}
        <section style={{ padding: '60px 0' }}>
          <div className="km-container">
            <div className="about-grid">
              {/* Photo column */}
              <div className="about-photo-col">
                <div className="about-photo-wrap">
                  {/* tape */}
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%) rotate(2deg)', width: 110, height: 22, background: 'rgba(184,146,58,0.25)', border: '1px solid rgba(184,146,58,0.3)', zIndex: 2 }} />
                  <div className="about-photo-inner">
                    <Image src="/about.png" alt="Kira Mei" width={360} height={480} style={{ display: 'block', width: 360, maxWidth: '100%', height: 'auto', objectFit: 'cover' }} />
                    <p style={{ textAlign: 'center', marginTop: 14, fontFamily: 'var(--hand)', fontSize: 22, color: 'var(--ink-soft)' }}>— "still figuring it out"</p>
                  </div>
                  <span className="km-stamp" style={{ position: 'absolute', bottom: 30, right: -30, transform: 'rotate(8deg)' }}>PT · LDN · 2026</span>
                </div>
              </div>

              {/* Text column */}
              <div>
                <span className="km-eyebrow">About Kira</span>
                <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.08, margin: '18px 0 28px' }}>
                  Teaching people to <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>never</em> need another programme.
                </h1>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: 20 }}>
                  Kira Mei is a 21-year-old personal trainer based in London. She started training at 17 and spent her first two years buying programmes, following plans and getting exactly nowhere — not because the plans were bad, but because she never understood what she was doing or why.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: 20 }}>
                  When she finally started studying the principles behind training and nutrition, everything changed. Not because she found the perfect programme — because she stopped needing one.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '36px 0' }}>
                  <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--paper-edge)' }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>The point</span>
                  <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--paper-edge)' }} />
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: 20 }}>
                  She got frustrated watching people around her do the same thing she used to: buy plan after plan, follow it for a few weeks, get overwhelmed or bored, and start over. The problem wasn't consistency. It was dependency. Nobody was teaching the why.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--ink-soft)', marginBottom: 20 }}>
                  So she built the programme she wished existed when she started. One that teaches you to fish. Eight weeks, every training split, every nutrition concept that actually matters. By the end, you should never need to buy a plan again.
                </p>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--ink)', marginTop: 32, marginBottom: 24 }}>That's the whole point.</p>
                <Link href="/#products" className="km-btn km-btn-accent">See the plans →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FACTS ── */}
        <section style={{ padding: '60px 0', borderTop: '1px solid var(--paper-edge)' }}>
          <div className="km-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {[
                { num: '200+', label: 'Readers so far' },
                { num: '8', label: 'Weeks · per book' },
                { num: '£0', label: 'Subscriptions' },
              ].map(({ num, label }) => (
                <div key={label} style={{ padding: '24px 0' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--ink)' }}>{num}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginTop: 8 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: '60px 0', borderTop: '1px solid var(--paper-edge)', textAlign: 'center' }}>
          <div className="km-container-narrow">
            <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 2.6rem)', marginBottom: 24 }}>Ready to stop buying plans?</h2>
            <Link href="/#products" className="km-btn km-btn-accent">See the plans →</Link>
          </div>
        </section>
      </main>
      <KmFooter />
    </div>
  )
}
