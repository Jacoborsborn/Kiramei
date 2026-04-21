'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const PasswordModal = dynamic(() => import('./components/PasswordModal'), { ssr: false })
const Studio = dynamic(() => import('./components/Studio'), { ssr: false })

const GOALS = ['Lose weight', 'Build muscle', 'More energy', 'General fitness', 'Confidence', 'All of the above']
const FITNESS_LEVELS = ['Complete beginner', 'Some experience', 'Train occasionally', 'Train regularly']
const DAYS_OPTIONS = ['2 days', '3 days', '4 days', '5+ days']
const EQUIPMENT_OPTIONS = ['Gym membership', 'Home gym', 'Dumbbells only', 'No equipment']
const REFERRAL_OPTIONS = ['Instagram', 'Google', 'Word of mouth', 'TikTok', 'YouTube', 'Other']

type FormData = {
  name: string
  age: string
  country: string
  email: string
  instagram: string
  plan: 'monthly' | 'bundle'
  goal: string
  fitnessLevel: string
  daysPerWeek: string
  equipment: string
  injuries: string
  referralSource: string
  notes: string
}

const initialForm: FormData = {
  name: '',
  age: '',
  country: '',
  email: '',
  instagram: '',
  plan: 'bundle',
  goal: '',
  fitnessLevel: '',
  daysPerWeek: '',
  equipment: '',
  injuries: '',
  referralSource: '',
  notes: '',
}

export default function Home() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [applied, setApplied] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showStudio, setShowStudio] = useState(false)
  const tapCount = useRef(0)
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('applied') === 'true') setApplied(true)
    }
  }, [])

  function set(key: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleNavTap() {
    tapCount.current += 1
    if (tapTimer.current) clearTimeout(tapTimer.current)
    if (tapCount.current >= 3) {
      tapCount.current = 0
      setShowPasswordModal(true)
    } else {
      tapTimer.current = setTimeout(() => { tapCount.current = 0 }, 400)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.age || !form.country || !form.email) {
      setError('Please fill in the required fields.')
      return
    }
    setError('')
    setSubmitting(true)

    try {
      const leadRes = await fetch('/api/kira/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          age: parseInt(form.age),
          country: form.country,
          email: form.email,
          instagram: form.instagram || null,
          plan_selected: form.plan,
          goal: form.goal || null,
          fitness_level: form.fitnessLevel || null,
          days_per_week: form.daysPerWeek || null,
          equipment: form.equipment || null,
          injuries: form.injuries || null,
          referral_source: form.referralSource || null,
          notes: form.notes || null,
        }),
      })

      if (!leadRes.ok) throw new Error('Failed to submit application')
      const { lead_id } = await leadRes.json()

      const checkoutRes = await fetch('/api/kira/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: form.plan, lead_id }),
      })

      if (!checkoutRes.ok) throw new Error('Failed to create checkout')
      const { url } = await checkoutRes.json()
      window.location.href = url
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  if (applied) {
    return (
      <div style={{ background: 'var(--paper)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="paper-card" style={{ maxWidth: 480, width: '100%', padding: '56px 40px', textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--sage-light)', border: '2px solid var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: 20 }}>
            ✓
          </div>
          <h1 className="font-display" style={{ fontSize: 48, lineHeight: 1, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
            Got it.
          </h1>
          <p style={{ color: 'var(--ink-muted)', lineHeight: 1.7, fontSize: 16 }}>
            I'll review your application and email you within 48 hours. Don't message asking if I got it.
          </p>
          <p style={{ color: 'var(--ink-muted)', marginTop: 8, fontSize: 16 }}>
            I did.
          </p>
          <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            <span style={{ fontSize: 12, color: 'var(--ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Kira Mei — Online PT</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main style={{ background: 'var(--paper)', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <HeroSection onNavTap={handleNavTap} />

      {/* ── PROGRAMME PREVIEW ── */}
      <ProgrammeSection />

      {/* ── PRO FEATURES ── */}
      <ProFeaturesSection />

      {/* ── STATS BAR ── */}
      <section style={{ background: 'var(--ink)', padding: '20px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0' }}>
          {[
            ['100%', 'Online'],
            ['Custom', 'Every Programme'],
            ['Weekly', 'Check-ins'],
            ['Worldwide', 'Clients Welcome'],
          ].map(([bold, label]) => (
            <div key={label} style={{ padding: '16px 20px', borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#F8F6F1', letterSpacing: '-0.01em' }}>{bold}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 40 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', borderBottom: '1.5px solid var(--sage)', paddingBottom: 2 }}>
            What's included
          </span>
        </div>

        <h2 className="font-display" style={{ fontSize: 'clamp(36px, 8vw, 56px)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 48 }}>
          Everything you need.<br />
          <span style={{ color: 'var(--sage)' }}>Nothing you don't.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {[
            ['01', 'Custom workout plan', 'Built around your schedule, equipment, and goals.'],
            ['02', 'Full meal plan', 'Real food, realistic portions, no misery.'],
            ['03', 'Shopping list', 'Weekly grocery list included. No faff.'],
            ['04', 'Macros + recipes', 'Know exactly what you\'re eating and why.'],
            ['05', 'Weekly email check-ins', 'Accountability without the judgement.'],
            ['06', 'Programme adjustments', 'Tweaked as you progress, not left to gather dust.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="paper-card" style={{ padding: '24px 24px 28px' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-faint)', letterSpacing: '0.1em', marginBottom: 12 }}>{num}</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT / WHO IT'S FOR ── */}
      <section style={{ background: 'var(--paper-warm)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="notebook-bg" style={{ borderRadius: 16, padding: '48px', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 24 }}>
              Who this is for
            </p>
            <p className="font-display" style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 500, lineHeight: 1.4, color: 'var(--ink)', marginBottom: 24 }}>
              "You're 40+ and done with programmes built for 25-year-olds."
            </p>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.8 }}>
              This is for men and women over 40 who want results that fit their real life — not a 6-day split designed for someone with nothing else going on. Kira builds around your schedule, your history, and your body.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Fit Over 40', 'Men & Women', 'Real Results', 'No BS'].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 40 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', borderBottom: '1.5px solid var(--sage)', paddingBottom: 2 }}>
            Pricing
          </span>
        </div>

        <h2 className="font-display" style={{ fontSize: 'clamp(36px, 8vw, 56px)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 12 }}>
          Simple. Transparent.
        </h2>
        <p style={{ fontSize: 15, color: 'var(--ink-muted)', marginBottom: 48, maxWidth: 420 }}>
          Both plans are billed per 4-week cycle — not a calendar month. That's one extra cycle on your side every year.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 680, margin: '0 auto' }}>

          {/* Standard */}
          <div className="paper-card" style={{ padding: '32px 28px' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 16 }}>Standard</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span className="font-display" style={{ fontSize: 52, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>£99</span>
              <span style={{ fontSize: 18, color: 'var(--ink-muted)' }}>.99</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--ink-faint)', marginBottom: 24, letterSpacing: '0.04em' }}>per 4 weeks</p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Custom workout plan', 'Full meal plan + macros', 'Recipes + shopping list', 'Programme built in 4 weeks'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: 'var(--sage)', fontSize: 13, lineHeight: 1 }}>✓</span>
                  <span style={{ fontSize: 14, color: 'var(--ink-muted)' }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="#apply" style={{ display: 'block', textAlign: 'center', padding: '13px', borderRadius: 99, border: '1.5px solid var(--border)', color: 'var(--ink)', fontSize: 14, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.03em' }}>
              Apply — Standard
            </a>
          </div>

          {/* Pro */}
          <div style={{ background: 'var(--ink)', borderRadius: 12, padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 16, right: 16 }}>
              <span style={{ background: 'var(--sage)', color: 'white', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 99 }}>
                Full Service
              </span>
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Pro</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span className="font-display" style={{ fontSize: 52, fontWeight: 600, color: '#F8F6F1', lineHeight: 1 }}>£149</span>
              <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.35)' }}>.99</span>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginBottom: 24, letterSpacing: '0.04em' }}>per 4 weeks</p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Everything in Standard',
                'AI body composition analysis',
                'AI weekly progress check-ins',
                'Auto plan adjustments',
                'Priority plan rebuilds mid-cycle',
              ].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: 'var(--sage)', fontSize: 13, lineHeight: 1 }}>✓</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="#apply" style={{ display: 'block', textAlign: 'center', padding: '13px', borderRadius: 99, background: 'var(--sage)', color: 'white', fontSize: 14, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.03em' }}>
              Apply — Pro
            </a>
          </div>

        </div>
      </section>

      {/* ── INTAKE FORM ── */}
      <section id="apply" style={{ background: 'var(--paper-warm)', borderTop: '1px solid var(--border)', padding: 'clamp(56px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1020, margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ marginBottom: 52 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', borderBottom: '1.5px solid var(--sage)', paddingBottom: 2 }}>
              Apply
            </span>
            <h2 className="font-display" style={{ fontSize: 'clamp(36px, 7vw, 52px)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginTop: 20, marginBottom: 8 }}>
              Let's get started.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', maxWidth: 400, lineHeight: 1.7 }}>
              Fill this in honestly. The more detail, the better Kira can build your programme.
            </p>
          </div>

          {/* Two-col layout: form left, sticky summary right */}
          <div className="apply-grid">

            {/* ── Left: Form ── */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

              <FormSection label="About you">
                <FieldRow>
                  <Field label="Full name *">
                    <input className="kira-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Jane Smith" required />
                  </Field>
                  <Field label="Age *">
                    <input className="kira-input" type="number" min="18" max="99" value={form.age} onChange={e => set('age', e.target.value)} placeholder="47" required />
                  </Field>
                </FieldRow>
                <FieldRow>
                  <Field label="Country *">
                    <input className="kira-input" value={form.country} onChange={e => set('country', e.target.value)} placeholder="United Kingdom" required />
                  </Field>
                  <Field label="Email *">
                    <input className="kira-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@email.com" required />
                  </Field>
                </FieldRow>
                <Field label="Instagram handle (optional)">
                  <input className="kira-input" value={form.instagram} onChange={e => set('instagram', e.target.value)} placeholder="@handle" />
                </Field>
              </FormSection>

              <FormSection label="Choose your plan">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { value: 'monthly', label: 'Standard', price: '£99.99', desc: 'Custom workout + meal plan + macros + recipes' },
                    { value: 'bundle', label: 'Pro', price: '£149.99', desc: 'Everything + AI body analysis + AI weekly coaching', badge: 'AI-Powered' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => set('plan', opt.value as 'monthly' | 'bundle')}
                      style={{
                        padding: '16px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                        border: `2px solid ${form.plan === opt.value ? 'var(--sage)' : 'var(--border)'}`,
                        background: form.plan === opt.value ? 'var(--sage-light)' : 'var(--surface)',
                        transition: 'all 0.15s', position: 'relative',
                      }}
                    >
                      {opt.badge && (
                        <span style={{ position: 'absolute', top: -10, right: 12, background: 'var(--sage)', color: 'white', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 99 }}>
                          {opt.badge}
                        </span>
                      )}
                      <div style={{ fontSize: 14, fontWeight: 600, color: form.plan === opt.value ? 'var(--sage-dark)' : 'var(--ink)', marginBottom: 4 }}>{opt.label}</div>
                      <div className="font-display" style={{ fontSize: 26, fontWeight: 600, color: form.plan === opt.value ? 'var(--sage)' : 'var(--ink)', marginBottom: 6 }}>{opt.price}</div>
                      <div style={{ fontSize: 12, color: form.plan === opt.value ? 'var(--sage-dark)' : 'var(--ink-faint)', lineHeight: 1.5 }}>{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </FormSection>

              <FormSection label="Primary goal">
                <PillGrid options={GOALS} selected={form.goal} onSelect={v => set('goal', v)} />
              </FormSection>

              <FormSection label="Fitness level">
                <PillGrid options={FITNESS_LEVELS} selected={form.fitnessLevel} onSelect={v => set('fitnessLevel', v)} />
              </FormSection>

              <FormSection label="How many days per week?">
                <PillGrid options={DAYS_OPTIONS} selected={form.daysPerWeek} onSelect={v => set('daysPerWeek', v)} />
              </FormSection>

              <FormSection label="Equipment available">
                <PillGrid options={EQUIPMENT_OPTIONS} selected={form.equipment} onSelect={v => set('equipment', v)} />
              </FormSection>

              <FormSection label="Any injuries or limitations?">
                <textarea className="kira-input" rows={3} value={form.injuries} onChange={e => set('injuries', e.target.value)} placeholder="E.g. bad knee, lower back issues, nothing..." style={{ resize: 'vertical' }} />
              </FormSection>

              <FormSection label="How did you find me?">
                <select className="kira-input" value={form.referralSource} onChange={e => set('referralSource', e.target.value)}>
                  <option value="">Select one</option>
                  {REFERRAL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </FormSection>

              <FormSection label="Anything else you'd like to share?">
                <textarea className="kira-input" rows={3} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Goals, worries, questions — anything relevant." style={{ resize: 'vertical' }} />
              </FormSection>

              {error && (
                <p style={{ color: '#C0392B', fontSize: 14, padding: '12px 16px', background: '#FEF0F0', borderRadius: 8, border: '1px solid #F0AAAA' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  marginTop: 8, padding: '16px 32px',
                  background: submitting ? 'var(--border)' : 'var(--ink)',
                  color: submitting ? 'var(--ink-muted)' : '#F8F6F1',
                  border: 'none', borderRadius: 99,
                  fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600,
                  letterSpacing: '0.04em', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
                }}
              >
                {submitting ? 'Submitting...' : 'Send my application →'}
              </button>

              <p style={{ fontSize: 12, color: 'var(--ink-faint)', textAlign: 'center', marginTop: 16 }}>
                You'll be redirected to Stripe to complete payment. Secure checkout.
              </p>
            </form>

            {/* ── Right: Sticky order summary ── */}
            <div className="apply-sidebar">
              <div style={{
                position: 'sticky', top: 32,
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(26,25,22,0.06), 0 8px 32px rgba(26,25,22,0.06)',
              }}>
                {/* Summary header */}
                <div style={{ background: 'var(--ink)', padding: '24px 28px' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 10 }}>
                    Your order
                  </p>
                  <p className="font-display" style={{ fontSize: 28, fontWeight: 600, color: '#F8F6F1', lineHeight: 1.1, marginBottom: 4 }}>
                    {form.plan === 'bundle' ? 'Pro Plan' : 'Standard Plan'}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 10 }}>
                    <span className="font-display" style={{ fontSize: 40, fontWeight: 600, color: '#F8F6F1', lineHeight: 1 }}>
                      {form.plan === 'bundle' ? '£149' : '£99'}
                    </span>
                    <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.3)' }}>.99</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginLeft: 4 }}>/ 4 weeks</span>
                  </div>
                  {form.plan === 'bundle' && (
                    <span style={{ display: 'inline-block', marginTop: 12, background: 'var(--sage)', color: 'white', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 99 }}>
                      AI-Powered
                    </span>
                  )}
                </div>

                {/* Included features */}
                <div style={{ padding: '20px 28px' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>
                    What's included
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      'Custom workout programme',
                      'Full meal plan + macros',
                      'Weekly shopping list',
                      'Recipes tailored to your plan',
                      ...(form.plan === 'bundle' ? [
                        'AI body composition analysis',
                        'AI weekly progress check-ins',
                        'Auto plan adjustments',
                        'Priority rebuilds mid-cycle',
                      ] : []),
                    ].map(f => (
                      <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <span style={{ color: 'var(--sage)', fontSize: 13, lineHeight: 1, marginTop: 1, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What happens next */}
                <div style={{ margin: '0 28px 24px', padding: '16px 18px', background: 'var(--sage-light)', border: '1px solid #B8D8C2', borderRadius: 10 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage-dark)', marginBottom: 10 }}>
                    What happens next
                  </p>
                  {[
                    ['01', 'Payment via Stripe'],
                    ['02', 'Kira analyses your answers'],
                    ['03', 'Programme delivered within 4 days'],
                  ].map(([n, t]) => (
                    <div key={n} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sage)', lineHeight: 1.6, flexShrink: 0, width: 16 }}>{n}</span>
                      <span style={{ fontSize: 12, color: 'var(--sage-dark)', lineHeight: 1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '0 28px 24px' }}>
                  <p style={{ fontSize: 11, color: 'var(--ink-faint)', lineHeight: 1.6 }}>
                    Billed per 4-week cycle, not a calendar month. Cancel any time.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--ink)', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Kira Mei — Online PT · Worldwide · 2025
        </p>
      </footer>

      {showPasswordModal && !showStudio && (
        <PasswordModal
          onSuccess={() => { setShowPasswordModal(false); setShowStudio(true) }}
          onClose={() => setShowPasswordModal(false)}
        />
      )}

      {showStudio && (
        <Studio onClose={() => setShowStudio(false)} />
      )}

    </main>
  )
}

// ── Hero ───────────────────────────────────────────────

function HeroSection({ onNavTap }: { onNavTap: () => void }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '100svh' }}>

      {/* Full-bleed photo */}
      <Image
        src="/kira.jpg"
        alt="Kira Mei — Online Personal Trainer"
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'top center' }}
        sizes="100vw"
      />

      {/* Gradient overlay — dark at top for nav, heavier at bottom for text */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,20,12,0.55) 0%, rgba(10,20,12,0.1) 35%, rgba(10,20,12,0.15) 55%, rgba(10,20,12,0.82) 100%)',
      }} />

      {/* Badge */}
      <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 10 }}>
        <span className="tag-amber" style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 12px' }}>
          ⚡ Launch Pricing
        </span>
      </div>

      {/* Nav */}
      <div style={{ position: 'absolute', top: 20, right: 24, zIndex: 10 }}>
        <span
          onClick={onNavTap}
          style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', cursor: 'default', userSelect: 'none' }}
        >
          Kira Mei
        </span>
      </div>

      {/* Content — anchored bottom-left */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
        padding: 'clamp(32px, 6vw, 72px)',
        maxWidth: 700,
      }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>
          Online Personal Training · Fit Over 40
        </p>
        <h1 className="font-display" style={{
          fontSize: 'clamp(72px, 16vw, 140px)',
          lineHeight: 0.92,
          fontWeight: 600,
          color: '#F8F6F1',
          letterSpacing: '-0.02em',
          marginBottom: 28,
        }}>
          Kira<br />Mei.
        </h1>
        <p style={{ fontSize: 'clamp(16px, 3vw, 20px)', color: 'rgba(248,246,241,0.7)', lineHeight: 1.55, maxWidth: 380, marginBottom: 40, fontWeight: 300 }}>
          AI-built programme. Adapts as you progress.<br />No fluff, no fads.
        </p>
        <a href="#apply" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--surface)', color: 'var(--ink)',
          padding: '15px 32px', borderRadius: '99px',
          fontWeight: 600, fontSize: 14, letterSpacing: '0.04em',
          textDecoration: 'none', transition: 'all 0.2s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E8F2EC'; (e.currentTarget as HTMLElement).style.color = 'var(--sage-dark)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface)'; (e.currentTarget as HTMLElement).style.color = 'var(--ink)' }}
        >
          Apply Now →
        </a>
      </div>
    </section>
  )
}

// ── Programme Preview ───────────────────────────────────

const WORKOUT_DAYS = [
  { day: 'Monday',    label: 'Upper Body',    exercises: [
    { key: 'A', name: 'Bench Press',     sets: '4 × 8',   note: 'RPE 8' },
    { key: 'B', name: 'Barbell Row',     sets: '4 × 8',   note: 'RPE 8' },
    { key: 'C', name: 'Overhead Press', sets: '3 × 10',  note: 'RPE 7' },
    { key: 'D', name: 'Pull-ups',        sets: '3 × max', note: '' },
    { key: 'E', name: 'Tricep Pushdown', sets: '3 × 12',  note: '' },
    { key: 'F', name: 'Bicep Curl',      sets: '3 × 12',  note: '' },
  ]},
  { day: 'Wednesday', label: 'Lower Body',    exercises: [
    { key: 'A', name: 'Back Squat',      sets: '4 × 6',   note: 'RPE 8' },
    { key: 'B', name: 'Romanian DL',     sets: '3 × 10',  note: 'RPE 7' },
    { key: 'C', name: 'Leg Press',       sets: '3 × 12',  note: '' },
    { key: 'D', name: 'Walking Lunges',  sets: '3 × 10',  note: 'each' },
    { key: 'E', name: 'Hip Thrust',      sets: '3 × 15',  note: '' },
    { key: 'F', name: 'Calf Raise',      sets: '4 × 15',  note: '' },
  ]},
  { day: 'Friday',    label: 'Full Body',     exercises: [
    { key: 'A', name: 'Deadlift',        sets: '4 × 5',   note: 'RPE 8' },
    { key: 'B', name: 'Incline Press',   sets: '3 × 10',  note: 'RPE 7' },
    { key: 'C', name: 'Cable Row',       sets: '3 × 12',  note: '' },
    { key: 'D', name: 'Goblet Squat',    sets: '3 × 12',  note: '' },
    { key: 'E', name: 'Face Pull',       sets: '3 × 15',  note: '' },
    { key: 'F', name: 'Plank',           sets: '3 × 45s', note: '' },
  ]},
]

const MEAL_DAY = [
  { time: 'Breakfast',  kcal: 420,  p: 38, c: 52, f: 10, desc: 'Oat porridge, berries, Greek yoghurt, honey' },
  { time: 'Lunch',      kcal: 560,  p: 48, c: 58, f: 18, desc: 'Grilled chicken thigh, jasmine rice, roasted veg, olive oil' },
  { time: 'Snack',      kcal: 280,  p: 26, c: 22, f: 10, desc: 'Cottage cheese, apple, small handful of almonds' },
  { time: 'Dinner',     kcal: 520,  p: 44, c: 46, f: 20, desc: 'Baked salmon, sweet potato, steamed broccoli, lemon butter' },
  { time: 'Post-gym',   kcal: 180,  p: 28, c: 18, f:  2, desc: 'Whey protein shake, banana' },
]

function ProgrammeSection() {
  const [activeDay, setActiveDay] = useState(0)

  return (
    <section style={{ padding: 'clamp(64px, 10vw, 100px) 24px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>

        <div style={{ marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', borderBottom: '1.5px solid var(--sage)', paddingBottom: 2 }}>
            The programme
          </span>
          <h2 className="font-display" style={{ fontSize: 'clamp(36px, 7vw, 56px)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginTop: 20, marginBottom: 8 }}>
            Here's exactly<br />what you get.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-muted)', maxWidth: 440, lineHeight: 1.7 }}>
            Every plan is built from scratch for you. This is a real example from a 3-day programme.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, alignItems: 'start' }}>

          {/* Workout card */}
          <div className="paper-card" style={{ overflow: 'hidden' }}>
            <div style={{ background: 'var(--ink)', padding: '20px 24px' }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
                Week 1 · Workout Plan
              </p>
              <p className="font-display" style={{ fontSize: 26, fontWeight: 600, color: '#F8F6F1', lineHeight: 1.1, marginBottom: 16 }}>
                {WORKOUT_DAYS[activeDay].label} — {WORKOUT_DAYS[activeDay].day}
              </p>
              {/* Day tabs */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {WORKOUT_DAYS.map((d, i) => (
                  <button key={d.day} onClick={() => setActiveDay(i)} style={{
                    padding: '5px 12px', borderRadius: 99, cursor: 'pointer',
                    border: `1px solid ${activeDay === i ? 'var(--sage)' : 'rgba(255,255,255,0.12)'}`,
                    background: activeDay === i ? 'var(--sage)' : 'transparent',
                    color: activeDay === i ? '#fff' : 'rgba(255,255,255,0.45)',
                    fontSize: 11, fontWeight: 600, transition: 'all 0.15s',
                  }}>{d.day}</button>
                ))}
              </div>
            </div>
            <div>
              {WORKOUT_DAYS[activeDay].exercises.map((ex, i, arr) => (
                <div key={ex.key} style={{
                  display: 'grid', gridTemplateColumns: '22px 1fr auto',
                  alignItems: 'center', gap: '0 10px',
                  padding: '11px 24px',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sage)', letterSpacing: '0.06em' }}>{ex.key}</span>
                  <span style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>{ex.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-muted)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                    {ex.sets}{ex.note ? ` · ${ex.note}` : ''}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', background: 'var(--paper)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.04em' }}>~55 min</span>
              <span style={{ fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.04em' }}>Gym · 3 days / week</span>
            </div>
          </div>

          {/* Meal plan card */}
          <div className="paper-card" style={{ overflow: 'hidden' }}>
            <div style={{ background: '#2A3D2E', padding: '20px 24px' }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
                Week 1 · Nutrition
              </p>
              <p className="font-display" style={{ fontSize: 26, fontWeight: 600, color: '#F8F6F1', lineHeight: 1.1, marginBottom: 4 }}>
                Monday Meal Plan
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>
                1,960 kcal · 184g protein · 196g carbs · 60g fat
              </p>
            </div>
            <div>
              {MEAL_DAY.map((m, i) => (
                <div key={m.time} style={{
                  padding: '13px 24px',
                  borderBottom: i < MEAL_DAY.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sage)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.time}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-faint)', fontVariantNumeric: 'tabular-nums' }}>
                      {m.kcal} kcal · {m.p}p · {m.c}c · {m.f}f
                    </span>
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.5 }}>{m.desc}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 24px', borderTop: '1px solid var(--border)', background: 'var(--paper)' }}>
              <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>Includes weekly shopping list + recipes</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── Pro Features ────────────────────────────────────────

function ProFeaturesSection() {
  const [checkinStep, setCheckinStep] = useState(0)

  const checkinFlow = [
    { from: 'kira', text: 'How did this week feel? Hit all three sessions?' },
    { from: 'sarah', text: 'Missed Wednesday — energy was really low. Squats felt awful.' },
    { from: 'kira', text: 'Got it. Low energy mid-week is common around cycle days 19–23. I\'ve reduced Wednesday\'s lower body load and shifted the heavier compound work to Monday. Your plan updates automatically tonight.' },
    { from: 'kira', text: 'One more thing — sleep. You\'re averaging 5.8hrs based on your logs. That\'s limiting your results more than the missed session. I\'ve added a recovery note to this week\'s plan.' },
  ]

  return (
    <section style={{ background: 'var(--ink)', padding: 'clamp(64px, 10vw, 100px) 24px' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>

        <div style={{ marginBottom: 52 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', borderBottom: '1.5px solid var(--sage)', paddingBottom: 2 }}>
            Pro plan
          </span>
          <h2 className="font-display" style={{ fontSize: 'clamp(36px, 7vw, 56px)', fontWeight: 600, color: '#F8F6F1', lineHeight: 1.1, marginTop: 20, marginBottom: 8 }}>
            Not just a plan.<br />
            <span style={{ color: 'var(--sage)' }}>An AI that coaches.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', maxWidth: 480, lineHeight: 1.7 }}>
            Pro clients get Kira as a live AI coach — she analyses your body, tracks your progress week to week, and adjusts your plan in real time. No human bottleneck. Always on.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>

          {/* Body comp card */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)' }}>
                AI Body Analysis
              </span>
              <p className="font-display" style={{ fontSize: 22, fontWeight: 600, color: '#F8F6F1', marginTop: 8, lineHeight: 1.2 }}>
                Built around<br />your actual body.
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 6, lineHeight: 1.6 }}>
                Send measurements + photos. Kira generates a full body composition report — frame type, body fat estimate, hormonal patterns, priority areas.
              </p>
            </div>
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>
                Example — Sarah M., 43
              </p>
              {[
                ['Frame type', 'Mesomorph-endomorph blend'],
                ['Body fat (est.)', '34% → target 26–28%'],
                ['Hormonal flag', 'Perimenopause — carb timing adjusted, PM sessions de-loaded'],
                ['Priority areas', 'Midsection, hip mobility, posture'],
              ].map(([label, val]) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 8, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>{label}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.72)', fontWeight: 500, lineHeight: 1.5 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI check-in card */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)' }}>
                AI Weekly Check-in
              </span>
              <p className="font-display" style={{ fontSize: 22, fontWeight: 600, color: '#F8F6F1', marginTop: 8, lineHeight: 1.2 }}>
                She adapts your plan.<br />Every week. Automatically.
              </p>
            </div>
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {checkinFlow.slice(0, checkinStep + 1).map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.from === 'sarah' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  background: msg.from === 'kira' ? 'rgba(74,124,89,0.18)' : 'rgba(255,255,255,0.07)',
                  border: `1px solid ${msg.from === 'kira' ? 'rgba(74,124,89,0.3)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: msg.from === 'kira' ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
                  padding: '10px 14px',
                }}>
                  {msg.from === 'kira' && (
                    <p style={{ fontSize: 9, fontWeight: 700, color: 'var(--sage)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>Kira AI</p>
                  )}
                  <p style={{ fontSize: 12, color: msg.from === 'kira' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{msg.text}</p>
                </div>
              ))}
              {checkinStep < checkinFlow.length - 1 && (
                <button
                  onClick={() => setCheckinStep(s => s + 1)}
                  style={{ alignSelf: 'flex-start', marginTop: 4, padding: '6px 14px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.35)', fontSize: 11, cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--sage)'; (e.currentTarget as HTMLElement).style.color = 'var(--sage)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}
                >
                  Continue →
                </button>
              )}
              {checkinStep === checkinFlow.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, padding: '8px 14px', background: 'rgba(74,124,89,0.1)', borderRadius: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--sage)' }}>✓</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Plan updated automatically</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress tracking */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)' }}>
                AI Progress Tracking
              </span>
              <p className="font-display" style={{ fontSize: 22, fontWeight: 600, color: '#F8F6F1', marginTop: 8, lineHeight: 1.2 }}>
                Numbers that<br />actually move.
              </p>
            </div>
            <div style={{ padding: '16px 24px' }}>
              {[
                { label: 'Waist',    w1: '86 cm',   w4: '83 cm',   w8: '80 cm'  },
                { label: 'Hips',     w1: '104 cm',  w4: '102 cm',  w8: '100 cm' },
                { label: 'Weight',   w1: '71.0 kg', w4: '69.8 kg', w8: '68.3 kg'},
                { label: 'Energy',   w1: '4 / 10',  w4: '6 / 10',  w8: '8 / 10' },
                { label: 'Strength', w1: 'Base',    w4: '+8%',     w8: '+19%'   },
              ].map((row, i, arr) => (
                <div key={row.label} style={{
                  display: 'grid', gridTemplateColumns: '72px 1fr 1fr 1fr',
                  alignItems: 'center', gap: 6,
                  padding: '10px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>{row.label}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontVariantNumeric: 'tabular-nums' }}>{row.w1}</span>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontVariantNumeric: 'tabular-nums' }}>{row.w4}</span>
                  <span style={{ fontSize: 12, color: 'var(--sage)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{row.w8}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {['Week 1', 'Week 4', 'Week 8'].map((w, i) => (
                  <span key={w} style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: i === 2 ? 'var(--sage)' : 'rgba(255,255,255,0.2)', fontWeight: i === 2 ? 600 : 400 }}>{w}</span>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(74,124,89,0.1)', border: '1px solid rgba(74,124,89,0.2)', borderRadius: 8 }}>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                  Kira flags when progress stalls and rebuilds your plan automatically. No manual request needed.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── Sub-components ─────────────────────────────────────

function FormSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32, paddingBottom: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 4 }}>
        {label}
      </p>
      {children}
    </div>
  )
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>{label}</label>
      {children}
    </div>
  )
}

function PillGrid({ options, selected, onSelect }: { options: string[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          className={`pill-select${selected === opt ? ' selected' : ''}`}
          onClick={() => onSelect(selected === opt ? '' : opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
