'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FadeIn from './components/FadeIn'

const PasswordModal = dynamic(() => import('./components/PasswordModal'), { ssr: false })
const FounderDashboard = dynamic(() => import('./components/FounderDashboard'), { ssr: false })

const PRODUCTS = [
  {
    id: 'training',
    href: '/training',
    label: 'Training Blueprint',
    price: '£49.99',
    badge: null,
    desc: '8 weeks of structured training — full body, upper/lower, PPL. Every week explains the logic so you never need another programme.',
    features: ['Full body to PPL progression', 'Week-by-week education', 'Progressive overload explained', 'Deload & beyond guidance'],
  },
  {
    id: 'nutrition',
    href: '/nutrition',
    label: 'Nutrition Blueprint',
    price: '£39.99',
    badge: null,
    desc: 'Calories, protein, carbs, fats — 8 weeks of nutrition education that teaches you to build your own approach forever.',
    features: ['Macronutrient fundamentals', 'Eating around training', 'Meal prep & social eating', 'Build your own approach'],
  },
  {
    id: 'bundle',
    href: '/bundle',
    label: 'Full Stack Bundle',
    price: '£79.99',
    badge: 'Best Value — Save £10',
    desc: 'Training and nutrition together. The complete system for understanding your body inside and out.',
    features: ['Everything in Training Blueprint', 'Everything in Nutrition Blueprint', 'Build Your Own Template PDF', 'Save £10 vs buying separately'],
  },
]

const PHILOSOPHY = [
  {
    num: '01',
    title: 'Try every method',
    body: 'Full body, upper/lower, push pull legs — all in 8 weeks. You experience every major training style, not just one.',
  },
  {
    num: '02',
    title: 'Understand the why',
    body: 'Every week explains the logic behind the training. Not just what to do — but why it works and what happens in your body.',
  },
  {
    num: '03',
    title: 'Build your own',
    body: 'By week 8 you have the knowledge to design your own programme. You\'ll never need to pay for a plan again.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Sophie R.',
    age: 24,
    city: 'Manchester',
    quote: 'I\'ve bought three programmes before this and never finished any of them. Eight weeks later I actually understand what I\'m doing in the gym. I built my own plan last week. Never thought I\'d say that.',
  },
  {
    name: 'Chloe M.',
    age: 27,
    city: 'Leeds',
    quote: 'The nutrition blueprint genuinely changed how I think about food. No more googling meal plans. I just know what to eat and why now.',
  },
  {
    name: 'Jade T.',
    age: 22,
    city: 'London',
    quote: 'Week 3 was when it clicked. I stopped just following the exercises and started actually understanding them. Worth every penny.',
  },
  {
    name: 'Ryan K.',
    age: 26,
    city: 'Birmingham',
    quote: 'Bought the bundle. Finished it. Built my own programme. That\'s literally what she promised and she delivered.',
  },
]

export default function Home() {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showFounderDashboard, setShowFounderDashboard] = useState(false)

  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#EEEAE4' }}>
      <Navbar transparent onLogoTap={() => setShowPasswordModal(true)} />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden' }}>
        <Image
          src="/kira.jpg"
          alt="Kira Mei"
          fill
          priority
          quality={100}
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.05) 30%, rgba(8,8,8,0.2) 55%, rgba(8,8,8,0.92) 100%)',
        }} />

        {/* Hero content */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
          padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 72px)',
          maxWidth: 780,
        }}>
          <p className="anim-fade-up" style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(238,234,228,0.7)',
            marginBottom: 20,
          }}>
            Digital Fitness Education
          </p>
          <h1 className="font-display anim-fade-up delay-1" style={{
            fontSize: 'clamp(52px, 11vw, 108px)',
            lineHeight: 0.92, fontWeight: 600, color: '#FFFFFF',
            letterSpacing: '-0.025em', marginBottom: 28,
          }}>
            Buy this once.<br />
            Never buy a<br />
            plan again.
          </h1>
          <p className="anim-fade-up delay-2" style={{
            fontSize: 'clamp(15px, 2.5vw, 18px)',
            color: 'rgba(255,255,255,0.72)', lineHeight: 1.65,
            maxWidth: 420, marginBottom: 40, fontWeight: 300,
          }}>
            8 weeks of education, structure and real training. By the end you'll understand your body well enough to never need another programme.
          </p>
          <a
            href="#products"
            className="anim-fade-up delay-3"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#EEEAE4', color: '#080808',
              padding: '15px 32px', borderRadius: 99,
              fontWeight: 600, fontSize: 14, letterSpacing: '0.03em',
              textDecoration: 'none', transition: 'background 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EEEAE4' }}
          >
            See the plans →
          </a>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" style={{ padding: 'clamp(72px, 10vw, 120px) clamp(24px, 5vw, 72px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.35)', marginBottom: 16 }}>
              The programmes
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 600, lineHeight: 1.05, marginBottom: 56, letterSpacing: '-0.02em' }}>
              Choose your level.
            </h2>
          </FadeIn>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {PRODUCTS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
                <div
                  style={{
                    background: p.badge ? '#111' : '#101010',
                    border: p.badge ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 16, padding: '32px 28px',
                    position: 'relative', overflow: 'hidden',
                    height: '100%', display: 'flex', flexDirection: 'column',
                    boxShadow: p.badge ? '0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.6)' : 'none',
                    transition: 'border-color 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-4px)'
                    el.style.borderColor = p.badge ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.14)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(0)'
                    el.style.borderColor = p.badge ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)'
                  }}
                >
                  {p.badge && (
                    <div style={{
                      position: 'absolute', top: 20, right: 20,
                      background: '#4A7C59', color: '#fff',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
                      textTransform: 'uppercase', padding: '4px 12px', borderRadius: 99,
                    }}>
                      {p.badge}
                    </div>
                  )}

                  <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.3)', marginBottom: 20 }}>
                    {p.label}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 4 }}>
                    <span className="font-display" style={{ fontSize: 56, fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em' }}>
                      {p.price.split('.')[0]}
                    </span>
                    <span style={{ fontSize: 20, color: 'rgba(238,234,228,0.4)' }}>
                      .{p.price.split('.')[1]}
                    </span>
                  </div>
                  <p style={{ fontSize: 11, color: 'rgba(238,234,228,0.25)', marginBottom: 24, letterSpacing: '0.06em' }}>
                    one-time · instant delivery
                  </p>

                  <p style={{ fontSize: 14, color: 'rgba(238,234,228,0.6)', lineHeight: 1.7, marginBottom: 24, flexGrow: 1 }}>
                    {p.desc}
                  </p>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 20, marginBottom: 28 }}>
                    {p.features.map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <span style={{ color: '#4A7C59', fontSize: 12, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 13, color: 'rgba(238,234,228,0.55)' }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={p.href} style={{
                    display: 'block', textAlign: 'center',
                    padding: '13px', borderRadius: 99,
                    background: p.badge ? '#EEEAE4' : 'transparent',
                    color: p.badge ? '#080808' : '#EEEAE4',
                    border: p.badge ? 'none' : '1px solid rgba(255,255,255,0.18)',
                    fontSize: 14, fontWeight: 600, textDecoration: 'none',
                    letterSpacing: '0.02em', transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      if (p.badge) { el.style.background = '#fff' } else { el.style.background = 'rgba(255,255,255,0.08)' }
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      if (p.badge) { el.style.background = '#EEEAE4' } else { el.style.background = 'transparent' }
                    }}
                  >
                    Get Started →
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(72px, 10vw, 120px) clamp(24px, 5vw, 72px)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.35)', marginBottom: 16 }}>
              The philosophy
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 600, lineHeight: 1.05, marginBottom: 56, letterSpacing: '-0.02em', maxWidth: 600 }}>
              This isn't a programme you follow. It's a programme that teaches.
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1 }}>
            {PHILOSOPHY.map((col, i) => (
              <FadeIn key={col.num} delay={i * 0.12}>
                <div style={{
                  borderLeft: '1px solid rgba(255,255,255,0.07)',
                  padding: '0 32px 0 32px',
                }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(238,234,228,0.2)', letterSpacing: '0.1em', marginBottom: 20 }}>
                    {col.num}
                  </p>
                  <h3 className="font-display" style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2, marginBottom: 16 }}>
                    {col.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'rgba(238,234,228,0.55)', lineHeight: 1.8 }}>
                    {col.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(72px, 10vw, 120px) clamp(24px, 5vw, 72px)',
        background: '#060606',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.35)', marginBottom: 16 }}>
              Results
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 600, lineHeight: 1.05, marginBottom: 56, letterSpacing: '-0.02em' }}>
              What happens after 8 weeks.
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div style={{
                  background: '#101010',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14, padding: '28px 24px',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
                >
                  {/* Stars */}
                  <div style={{ marginBottom: 16, color: '#EEEAE4', fontSize: 12, letterSpacing: 2 }}>
                    ★★★★★
                  </div>
                  <p style={{ fontSize: 17, color: 'rgba(238,234,228,0.75)', lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
                    "{t.quote}"
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#EEEAE4', marginBottom: 2 }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.35)' }}>{t.age} · {t.city}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 72px)',
        textAlign: 'center',
      }}>
        <FadeIn>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.3)', marginBottom: 24 }}>
            Ready?
          </p>
          <h2 className="font-display" style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 600, lineHeight: 1.05, marginBottom: 20, letterSpacing: '-0.025em' }}>
            One purchase.<br />A lifetime of knowledge.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(238,234,228,0.5)', maxWidth: 440, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Buy once. Download your blueprints. Never pay for a programme again.
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
              Get the Bundle — £79.99 →
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
              Browse plans
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />

      {showPasswordModal && !showFounderDashboard && (
        <PasswordModal
          onSuccess={() => { setShowPasswordModal(false); setShowFounderDashboard(true) }}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
      {showFounderDashboard && (
        <FounderDashboard onClose={() => setShowFounderDashboard(false)} />
      )}
    </main>
  )
}
