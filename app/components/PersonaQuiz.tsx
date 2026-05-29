'use client'

import { useEffect, useRef, useState } from 'react'
import BuyButton from './BuyButton'

/* ────────────────────────────────────────────────────────────────
   Persona-diagnostic quiz — "Not sure if this is for you?"

   Compliance design (UK GDPR / PECR):
   • The result is computed and shown CLIENT-SIDE regardless of consent,
     so storing answers stays a free, separable choice.
   • Answers are persisted only when the visitor ticks the explicit
     storage consent. weight_band is special-category (health) data and
     is sent only under that explicit consent (recorded server-side).
   • Marketing email is a second, independent opt-in (PECR).
   • Identity stays pseudonymous: we send the km_v cookie, never a name.
   ──────────────────────────────────────────────────────────────── */

declare global {
  interface Window { kmTrack?: (payload: Record<string, unknown>) => void }
}

const STORAGE_CONSENT_TEXT =
  'Use my anonymous answers — including my age range and weight range — to help improve Kira Mei. ' +
  'These are stored against my visitor cookie, not my name, and I can ask for them to be deleted at any time.'

const EMAIL_CONSENT_TEXT =
  'Email me my full breakdown plus occasional Kira Mei updates. I can unsubscribe at any time.'

type Persona = 'collector' | 'guesser' | 'translator' | 'plateaued'

interface Option { value: string; label: string }
interface Question { key: 'experience' | 'goal' | 'blocker' | 'age_band' | 'weight_band'; prompt: string; options: Option[] }

const QUESTIONS: Question[] = [
  {
    key: 'experience',
    prompt: 'Where are you with training right now?',
    options: [
      { value: 'beginner', label: 'Total beginner — just getting started' },
      { value: 'months', label: 'A few months in' },
      { value: 'onoff', label: 'On and off for years' },
      { value: 'returning', label: 'Coming back after a break' },
    ],
  },
  {
    key: 'goal',
    prompt: 'What do you actually want out of this?',
    options: [
      { value: 'strength', label: 'Get stronger' },
      { value: 'leanout', label: 'Lose fat / lean down' },
      { value: 'shape', label: 'Build muscle & shape' },
      { value: 'confidence', label: 'Feel confident and know what I’m doing' },
    ],
  },
  {
    key: 'blocker',
    prompt: 'What honestly holds you back the most?',
    options: [
      { value: 'plans', label: 'I’ve bought plans before and never finished them' },
      { value: 'weights', label: 'I’m guessing at weights — never sure it’s enough' },
      { value: 'language', label: 'I don’t understand the terms everyone uses' },
      { value: 'plateau', label: 'I’ve been consistent but stopped seeing changes' },
    ],
  },
  {
    key: 'age_band',
    prompt: 'Which age range are you in?',
    options: [
      { value: '18–24', label: '18–24' },
      { value: '25–34', label: '25–34' },
      { value: '35–44', label: '35–44' },
      { value: '45–54', label: '45–54' },
      { value: '55+', label: '55+' },
    ],
  },
  {
    key: 'weight_band',
    prompt: 'Roughly where are you weight-wise? (optional)',
    options: [
      { value: 'under60', label: 'Under 60kg' },
      { value: '60–70', label: '60–70kg' },
      { value: '70–80', label: '70–80kg' },
      { value: '80–90', label: '80–90kg' },
      { value: '90plus', label: '90kg+' },
      { value: '', label: 'Prefer not to say' },
    ],
  },
]

const PERSONAS: Record<Persona, { title: string; notAlone: string; diagnosis: string; fix: string }> = {
  collector: {
    title: 'The Plan Collector',
    notAlone: 'This is the single most common type we see.',
    diagnosis: 'You don’t lack discipline — you lack a reason to stay. Every plan you’ve bought was built to be followed and then re-bought, so the moment life got busy there was nothing holding it together. The PDF became another closed tab.',
    fix: 'The Blueprint isn’t another plan to finish. It teaches you why each week is built the way it is — so by the end you’re writing your own, and there’s nothing left to abandon.',
  },
  guesser: {
    title: 'The Guesser',
    notAlone: 'Almost every beginner we teach starts right here.',
    diagnosis: 'You show up — that’s the part most people never manage. But nobody taught you the rules: how heavy is heavy enough, when to add weight, how hard a set should actually feel. So you’ve been stuck on the same dumbbells, hoping.',
    fix: 'Week 1 hands you the actual rules — effort, progression, when to push and when to hold — so you stop guessing and start training on purpose.',
  },
  translator: {
    title: 'The Translator',
    notAlone: 'You’re far from the only one quietly googling in the corner.',
    diagnosis: 'RPE, hypertrophy, eccentric, deload — people throw these around and you nod, then look them up alone later. It’s not that you’re behind. It’s that no one ever sat you down and explained the language.',
    fix: 'The Blueprint teaches the vocabulary in context, week by week, with a plain-English glossary — so the gym stops feeling like a room where everyone got a manual you didn’t.',
  },
  plateaued: {
    title: 'The Plateaued',
    notAlone: 'This is where a lot of people quietly stall once the beginner gains fade.',
    diagnosis: 'You’ve done the consistency — further than most ever get. But consistency without progression stalls. The same sessions at the same weights tell your body there’s nothing new to adapt to.',
    fix: 'The Blueprint teaches progressive overload and when to deload — the exact levers that turn “showing up” back into “changing” — and how to keep using them long after week 8.',
  },
}

function personaFor(blocker: string): Persona {
  switch (blocker) {
    case 'plans': return 'collector'
    case 'weights': return 'guesser'
    case 'language': return 'translator'
    case 'plateau': return 'plateaued'
    default: return 'collector'
  }
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match('(?:^|;) *' + name + '=([^;]*)')
  return m ? decodeURIComponent(m[1]) : null
}

export default function PersonaQuiz() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0) // 0..QUESTIONS.length-1, then === length for result
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [storeConsent, setStoreConsent] = useState(false)
  const [email, setEmail] = useState('')
  const [emailConsent, setEmailConsent] = useState(false)
  const [saved, setSaved] = useState(false)
  const trackedResult = useRef(false)

  const isResult = step >= QUESTIONS.length
  const persona = isResult ? personaFor(answers.blocker) : null

  function track(kind: string, meta?: Record<string, unknown>) {
    try { window.kmTrack?.({ kind, meta }) } catch { /* analytics must never throw */ }
  }

  useEffect(() => {
    if (isResult && persona && !trackedResult.current) {
      trackedResult.current = true
      track('quiz_complete', { persona })
    }
  }, [isResult, persona])

  function start() {
    setStep(0); setAnswers({}); setStoreConsent(false)
    setEmail(''); setEmailConsent(false); setSaved(false)
    trackedResult.current = false
    setOpen(true)
    track('quiz_open')
  }

  function choose(value: string) {
    const q = QUESTIONS[step]
    setAnswers(prev => ({ ...prev, [q.key]: value }))
    setStep(s => s + 1)
  }

  async function save() {
    if (saved) return
    setSaved(true)
    try {
      await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitor_id: getCookie('km_v') ?? 'unknown',
          session_id: getCookie('km_s'),
          persona,
          age_band: answers.age_band || null,
          weight_band: answers.weight_band || null,
          experience: answers.experience || null,
          goal: answers.goal || null,
          blocker: answers.blocker || null,
          email: emailConsent && email ? email : null,
          email_consent: emailConsent && !!email,
          storage_consent: true,
          consent_text: emailConsent && email
            ? `${STORAGE_CONSENT_TEXT} | ${EMAIL_CONSENT_TEXT}`
            : STORAGE_CONSENT_TEXT,
        }),
      })
    } catch { /* never block the UX on a storage failure */ }
  }

  const progress = isResult ? 1 : step / QUESTIONS.length

  return (
    <>
      <button
        onClick={start}
        data-track="quiz_trigger"
        style={{
          background: 'none', border: 'none', padding: '6px 0', marginTop: 4,
          fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '0.02em',
          color: 'var(--ink-muted)', cursor: 'pointer',
          textDecoration: 'underline', textUnderlineOffset: 4,
        }}
      >
        Not sure if this is for you? Take the 60-second check →
      </button>

      {open && (
        <div
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(28, 22, 16, 0.55)', backdropFilter: 'blur(3px)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            padding: '5vh 16px', overflowY: 'auto',
          }}
        >
          <div
            style={{
              width: '100%', maxWidth: 540, background: 'var(--paper)',
              border: '1px solid var(--paper-edge)', borderRadius: 16,
              padding: 'clamp(24px, 5vw, 40px)', position: 'relative',
              boxShadow: '0 24px 80px rgba(28,22,16,0.28)',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              style={{
                position: 'absolute', top: 16, right: 16, width: 30, height: 30,
                borderRadius: 99, border: '1px solid var(--paper-edge)',
                background: 'transparent', color: 'var(--ink-muted)',
                cursor: 'pointer', fontSize: 16, lineHeight: 1,
              }}
            >
              ×
            </button>

            {/* progress bar */}
            <div style={{ height: 3, borderRadius: 99, background: 'var(--paper-edge)', marginBottom: 28, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.round(progress * 100)}%`, background: 'var(--accent)', transition: 'width 0.25s' }} />
            </div>

            {!isResult ? (
              <div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 14px' }}>
                  Question {step + 1} of {QUESTIONS.length}
                </p>
                <h3 className="font-display" style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, margin: '0 0 22px' }}>
                  {QUESTIONS[step].prompt}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {QUESTIONS[step].options.map(opt => (
                    <button
                      key={opt.value || 'skip'}
                      onClick={() => choose(opt.value)}
                      style={{
                        textAlign: 'left', padding: '15px 18px', borderRadius: 10,
                        border: '1px solid var(--paper-edge)', background: 'transparent',
                        color: 'var(--ink-soft)', fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                        cursor: 'pointer', transition: 'all 0.12s', lineHeight: 1.4,
                      }}
                      onMouseEnter={e => {
                        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
                        ;(e.currentTarget as HTMLElement).style.background = 'var(--paper-warm, rgba(192,88,58,0.04))'
                      }}
                      onMouseLeave={e => {
                        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--paper-edge)'
                        ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button
                    onClick={() => setStep(s => s - 1)}
                    style={{ marginTop: 20, background: 'none', border: 'none', color: 'var(--ink-muted)', fontFamily: 'var(--mono)', fontSize: 12, cursor: 'pointer' }}
                  >
                    ← Back
                  </button>
                )}
              </div>
            ) : persona && (
              <div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 10px' }}>
                  Your result
                </p>
                <h3 className="font-display" style={{ fontSize: 'clamp(26px, 5vw, 34px)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.15, margin: '0 0 6px' }}>
                  You’re {PERSONAS[persona].title}.
                </h3>
                <p style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 600, margin: '0 0 18px' }}>
                  {PERSONAS[persona].notAlone}
                </p>

                <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.7, margin: '0 0 14px' }}>
                  {PERSONAS[persona].diagnosis}
                </p>
                <p style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.7, margin: '0 0 24px', paddingLeft: 16, borderLeft: '2px solid var(--accent)' }}>
                  {PERSONAS[persona].fix}
                </p>

                <div style={{ marginBottom: 24 }}>
                  <BuyButton requireTerms product="training" label="Start Week One →" />
                </div>

                {/* Optional, separable consent panel */}
                <div style={{ borderTop: '1px solid var(--paper-edge)', paddingTop: 20 }}>
                  {saved ? (
                    <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-soft)', margin: 0 }}>
                      ✓ Thanks — {emailConsent && email ? 'your breakdown is on its way.' : 'noted.'}
                    </p>
                  ) : (
                    <>
                      <p style={{ fontSize: 13, color: 'var(--ink-muted)', margin: '0 0 14px', lineHeight: 1.5 }}>
                        Optional — want it sent to you, and to help shape Kira Mei?
                      </p>
                      <ConsentRow checked={storeConsent} onChange={setStoreConsent}>
                        Use my anonymous answers — including my age and weight range — to help improve Kira Mei.{' '}
                        <a href="/privacy" target="_blank" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>How we handle this.</a>
                      </ConsentRow>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com (optional)"
                        style={{
                          width: '100%', marginTop: 14, padding: '12px 14px', borderRadius: 8,
                          border: '1px solid var(--paper-edge)', background: 'transparent',
                          color: 'var(--ink)', fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                        }}
                      />
                      {email && (
                        <div style={{ marginTop: 12 }}>
                          <ConsentRow checked={emailConsent} onChange={setEmailConsent}>
                            Email me my full breakdown plus occasional Kira Mei updates. I can unsubscribe anytime.
                          </ConsentRow>
                        </div>
                      )}
                      <button
                        onClick={save}
                        disabled={!storeConsent && !(email && emailConsent)}
                        style={{
                          marginTop: 16, padding: '11px 24px', borderRadius: 99, border: 'none',
                          background: (storeConsent || (email && emailConsent)) ? 'var(--ink)' : 'var(--paper-edge)',
                          color: (storeConsent || (email && emailConsent)) ? 'var(--paper)' : 'var(--ink-muted)',
                          fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                          cursor: (storeConsent || (email && emailConsent)) ? 'pointer' : 'not-allowed',
                        }}
                      >
                        {email && emailConsent ? 'Send my breakdown' : 'Save'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function ConsentRow({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
      <span
        onClick={() => onChange(!checked)}
        style={{
          flexShrink: 0, marginTop: 2, width: 17, height: 17,
          border: `1.5px solid ${checked ? 'var(--accent)' : 'var(--ink-muted)'}`,
          borderRadius: 3, background: checked ? 'var(--accent)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.12s',
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="#FBF7EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{children}</span>
    </label>
  )
}
