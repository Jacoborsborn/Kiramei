'use client'

import { useState, useEffect, useMemo } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

interface Props {
  userId: string
  initialComplete: boolean
  initialQuizPassed: boolean
  programmeStartDate?: string | null
  sessionCount?: number
}

// ─── Slide 1: Congratulations ─────────────────────────────────────────────────

function SlideOne({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ textAlign: 'center', animation: 'slideIn 0.45s ease' }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 18 }}>
        Programme Complete · 8 / 8 Weeks
      </p>
      <h2 style={{
        fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 10vw, 80px)',
        fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--ink)',
        marginBottom: 6, lineHeight: 0.95,
      }}>
        YOU DID IT.
      </h2>
      <p style={{ fontSize: 15, color: 'var(--ink-soft)', marginBottom: 36 }}>
        8 weeks. Every session. Total understanding.
      </p>

      <div style={{
        textAlign: 'left', background: 'var(--paper)', border: '1.5px solid var(--ink)',
        borderRadius: 3, padding: '28px 28px 24px', maxWidth: 480, margin: '0 auto 32px',
        boxShadow: '4px 4px 0 var(--ink)', position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 6, border: '1px dashed var(--paper-edge)', pointerEvents: 'none', borderRadius: 1 }} />
        <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
          You should now have
        </p>
        {[
          'A solid habit of showing up — 3–4× a week, consistently',
          'An understanding of progressive overload and how to apply it',
          'A working knowledge of Full Body, Upper/Lower, and PPL splits',
          'The ability to pick weights by feel using RPE',
          'A trained eye for form — yours and others\'',
          'Confidence stepping into any gym without needing to guess',
          'A plan you built yourself for what comes after',
          'The gym is yours now — you never need to buy another programme',
        ].map(item => (
          <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
            <span style={{ color: 'var(--accent)', fontSize: 13, marginTop: 1, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{item}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        style={{
          padding: '14px 36px', background: 'var(--ink)', color: 'var(--paper)',
          border: 'none', borderRadius: 3, fontFamily: 'var(--mono)',
          fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        Continue →
      </button>
    </div>
  )
}

// ─── Slide 2: Review request ──────────────────────────────────────────────────
// (Swapped to appear before the offer)

function SlideTwo({ onNext }: { onNext: () => void }) {
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', animation: 'slideIn 0.4s ease' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 18 }}>Thank you</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 500, marginBottom: 12 }}>
          That means everything.
        </h2>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.75, maxWidth: 440, margin: '0 auto 32px' }}>
          Your feedback helps me improve this for every woman who trusts this programme after you.
        </p>
        <button
          onClick={onNext}
          style={{
            padding: '14px 36px', background: 'var(--accent)', color: 'var(--paper)',
            border: 'none', borderRadius: 3, fontFamily: 'var(--mono)',
            fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer',
          }}
        >
          One last thing →
        </button>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center', animation: 'slideIn 0.45s ease' }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 18 }}>
        One small ask
      </p>
      <h2 style={{
        fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
        fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)',
        marginBottom: 14, lineHeight: 1.15,
      }}>
        Could you help a small brand out?
      </h2>
      <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.75, maxWidth: 500, margin: '0 auto 32px' }}>
        I&apos;m a small creator trying to help as many women as possible feel confident in the gym. A review — however short — makes a huge difference for discovery.
      </p>

      <form onSubmit={handleSubmit} style={{ textAlign: 'left', maxWidth: 480, margin: '0 auto 28px' }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', display: 'block', marginBottom: 8 }}>
            What&apos;s one thing you&apos;d improve to help educate more women like yourself?
          </label>
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            rows={4}
            placeholder="Be honest — this goes directly to me and helps shape what I build next."
            style={{
              width: '100%', padding: '12px 14px',
              background: 'var(--paper)', border: '1.5px solid var(--ink)',
              borderRadius: 3, fontFamily: 'var(--sans)', fontSize: 14,
              color: 'var(--ink)', resize: 'vertical', lineHeight: 1.6,
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '13px 28px', background: 'var(--ink)', color: 'var(--paper)',
            border: 'none', borderRadius: 3, fontFamily: 'var(--mono)',
            fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
            cursor: 'pointer', marginBottom: 16, width: '100%',
          }}
        >
          Send feedback
        </button>
      </form>

      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 12 }}>
          Or leave a review on
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Google', href: 'https://g.page/r/YOUR_GOOGLE_REVIEW_LINK' },
            { label: 'Trustpilot', href: 'https://www.trustpilot.com/review/kiramei.co.uk' },
            { label: 'Instagram', href: 'https://www.instagram.com/kiramei.pt' },
          ].map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{
                padding: '10px 20px', border: '1px solid var(--paper-edge)',
                borderRadius: 3, fontFamily: 'var(--mono)', fontSize: 11,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--ink-soft)', textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
        </div>
        <button
          onClick={onNext}
          style={{
            marginTop: 24, background: 'transparent', border: 'none',
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--ink-muted)',
            cursor: 'pointer', textDecoration: 'underline',
          }}
        >
          Skip →
        </button>
      </div>
    </div>
  )
}

// ─── Slide 3: Waitlist offer ──────────────────────────────────────────────────

function SlideThree({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState('')
  const [wlState, setWlState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    setWlState('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product: 'nutrition' }),
      })
      if (!res.ok) throw new Error()
      setWlState('done')
    } catch {
      setWlState('error')
    }
  }

  return (
    <div style={{ textAlign: 'center', animation: 'slideIn 0.45s ease' }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 18 }}>
        A gift · One time only
      </p>
      <h2 style={{
        fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 5vw, 3.2rem)',
        fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)',
        marginBottom: 14, lineHeight: 1.1,
      }}>
        For trusting me with<br />your training.
      </h2>
      <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 32px' }}>
        You showed up every week, did the reading, passed the quizzes, and finished what you started. That is rare. As a thank-you, join the Nutrition Blueprint waitlist and get 30% off at launch.
      </p>

      {/* Offer card */}
      <div style={{
        background: 'var(--paper)', border: '1.5px solid var(--ink)',
        borderRadius: 3, padding: '32px 28px', maxWidth: 400, margin: '0 auto 32px',
        boxShadow: '4px 4px 0 var(--accent)', position: 'relative',
        textAlign: 'left',
      }}>
        <div style={{ position: 'absolute', inset: 6, border: '1px dashed var(--paper-edge)', pointerEvents: 'none', borderRadius: 1 }} />
        <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>
          Exclusive offer · Completers only
        </p>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, marginBottom: 8 }}>
          Nutrition Blueprint
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: 20 }}>
          8 weeks of nutrition education — calories, macros, meal prep, fat loss, muscle building. The last nutrition course you&apos;ll ever need to buy.
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 38, fontWeight: 700, color: 'var(--accent)' }}>30% off</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-muted)' }}>at launch · for you only</span>
        </div>

        {wlState === 'done' ? (
          <div style={{ padding: '16px 20px', background: 'rgba(184,84,58,0.06)', border: '1.5px solid rgba(184,84,58,0.25)', borderRadius: 3 }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500, marginBottom: 4 }}>You&apos;re on the list.</p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              30% off code sent to your inbox when we launch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>
              Launching soon — join the list now, get 30% off at launch.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: '1 1 180px', padding: '11px 14px',
                  background: 'var(--paper)', border: '1.5px solid var(--ink)',
                  borderRadius: 3, fontFamily: 'var(--sans)', fontSize: 14,
                  color: 'var(--ink)', outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={wlState === 'loading'}
                style={{
                  padding: '11px 18px', background: 'var(--accent)', color: 'var(--paper)',
                  border: 'none', borderRadius: 3, fontFamily: 'var(--mono)',
                  fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: wlState === 'loading' ? 'wait' : 'pointer',
                  opacity: wlState === 'loading' ? 0.6 : 1, whiteSpace: 'nowrap',
                }}
              >
                {wlState === 'loading' ? 'Joining…' : 'Claim 30% off →'}
              </button>
            </div>
            {wlState === 'error' && (
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--margin-red)' }}>
                Something went wrong — try again.
              </p>
            )}
          </form>
        )}
      </div>

      <button
        onClick={onDone}
        style={{
          padding: '12px 28px', background: 'transparent',
          border: '1px solid var(--paper-edge)', borderRadius: 3,
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--ink-soft)', cursor: 'pointer',
        }}
      >
        Skip for now →
      </button>
    </div>
  )
}

// ─── Summary stats (shown before the slides trigger) ─────────────────────────

function CompletionSummary({
  programmeStartDate,
  sessionCount,
  onComplete,
  loading,
}: {
  programmeStartDate?: string | null
  sessionCount?: number
  onComplete: () => void
  loading: boolean
}) {
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const startFormatted = programmeStartDate
    ? new Date(programmeStartDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—'

  return (
    <div style={{
      padding: '40px 28px', borderRadius: 3,
      background: 'rgba(184,84,58,0.04)', border: '1px solid rgba(184,84,58,0.15)',
    }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 16 }}>
        Almost there
      </p>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 500, marginBottom: 8 }}>
        You&apos;ve completed 8 weeks.
      </h3>
      <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
        Most people who buy a training programme never finish it. You did — and you didn&apos;t just follow a plan, you learned how to train.
      </p>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12,
        maxWidth: 420, marginBottom: 32, textAlign: 'left',
      }} className="complete-stats">
        {[
          { label: 'Started', value: startFormatted },
          { label: 'Completing', value: today },
          { label: 'Weeks', value: '8 / 8' },
          { label: 'Sessions logged', value: sessionCount != null ? String(sessionCount) : '—' },
          { label: 'Personal bests', value: 'Week 8' },
          { label: 'Next step', value: 'Your plan' },
        ].map(({ label, value }) => (
          <div key={label} style={{
            background: 'var(--paper)', border: '1px solid var(--paper-edge)',
            borderRadius: 3, padding: '12px 14px',
          }}>
            <p style={{ fontSize: 9.5, color: 'var(--ink-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'var(--mono)' }}>{label}</p>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--serif)' }}>{value}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onComplete}
        disabled={loading}
        style={{
          padding: '16px 32px', background: 'var(--accent)', color: 'var(--paper)',
          border: 'none', borderRadius: 3, fontFamily: 'var(--mono)',
          fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
          cursor: loading ? 'default' : 'pointer',
          opacity: loading ? 0.7 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        {loading ? 'Saving…' : 'Complete the programme →'}
      </button>

      <style>{`@media(max-width:500px){ .complete-stats { grid-template-columns:1fr 1fr !important; } }`}</style>
    </div>
  )
}

// ─── Summary panel ───────────────────────────────────────────────────────────

interface ExerciseLog {
  week_number: number
  session_label: string
  exercise_name: string
  weight_kg: number | null
  reps: number | null
}

function SummaryPanel({ userId, onDone }: { userId: string; onDone: () => void }) {
  const [logs, setLogs] = useState<ExerciseLog[] | null>(null)
  const [deleted, setDeleted] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    supabase
      .from('exercise_logs')
      .select('week_number, session_label, exercise_name, weight_kg, reps')
      .eq('user_id', userId)
      .order('week_number')
      .then(({ data }) => setLogs(data ?? []))
  }, [userId])

  const summary = useMemo(() => {
    if (!logs) return []
    const map = new Map<string, { peakKg: number; peakReps: number }>()
    for (const log of logs) {
      const existing = map.get(log.exercise_name) ?? { peakKg: 0, peakReps: 0 }
      map.set(log.exercise_name, {
        peakKg: Math.max(existing.peakKg, log.weight_kg ?? 0),
        peakReps: Math.max(existing.peakReps, log.reps ?? 0),
      })
    }
    return Array.from(map.entries()).map(([name, data]) => ({ name, ...data }))
  }, [logs])

  function downloadSummary() {
    const pad = (s: string, n: number) => s.slice(0, n).padEnd(n)
    const lines = [
      '════════════════════════════════════════════',
      '  8-Week Training Summary',
      '  Kira Mei · Training Blueprint',
      '════════════════════════════════════════════',
      '',
      `${pad('Exercise', 28)}${pad('Peak KG', 12)}Peak Reps`,
      '─'.repeat(44),
      ...summary.map(s =>
        `${pad(s.name, 28)}${pad(s.peakKg > 0 ? s.peakKg + ' kg' : '—', 12)}${s.peakReps > 0 ? s.peakReps + ' reps' : '—'}`
      ),
      '',
      'Built with Kira Mei — kiramei.co.uk',
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'kira-mei-8-week-summary.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function clearData() {
    setDeleting(true)
    const supabase = createSupabaseBrowserClient()
    await supabase.from('exercise_logs').delete().eq('user_id', userId)
    setDeleted(true)
    setDeleting(false)
  }

  if (deleted) {
    return (
      <div style={{ textAlign: 'center', animation: 'slideIn 0.4s ease' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 18 }}>
          Data cleared
        </p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 500, marginBottom: 12 }}>
          Clean slate.
        </h2>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 440, margin: '0 auto 32px' }}>
          Your 8-week logs have been deleted. Your downloaded summary keeps the record.
        </p>
        <button
          onClick={onDone}
          style={{
            padding: '14px 36px', background: 'var(--accent)', color: 'var(--paper)',
            border: 'none', borderRadius: 3, fontFamily: 'var(--mono)',
            fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer',
          }}
        >
          Go to my programme →
        </button>
      </div>
    )
  }

  if (!logs) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ink-muted)', fontFamily: 'var(--mono)', fontSize: 12 }}>
        Loading your summary…
      </div>
    )
  }

  return (
    <div style={{ animation: 'slideIn 0.45s ease' }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 18 }}>
        8-Week Summary
      </p>
      <h2 style={{
        fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
        fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)',
        marginBottom: 10, lineHeight: 1.15,
      }}>
        Here&apos;s what you built.
      </h2>
      <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 24 }}>
        Your peak lifts across all 8 weeks.
      </p>

      {summary.length > 0 ? (
        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--paper-edge)', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--paper-deep)' }}>
                {['Exercise', 'Peak weight', 'Peak reps'].map(h => (
                  <th key={h} style={{ padding: '8px 14px', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 400, borderBottom: '1px solid var(--paper-edge)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {summary.map((row, i) => (
                <tr key={row.name} style={{ background: i % 2 === 0 ? 'var(--paper)' : 'var(--paper-deep)' }}>
                  <td style={{ padding: '9px 14px', fontFamily: 'var(--serif)', fontSize: 14, color: 'var(--ink)', borderBottom: '1px solid var(--paper-edge)' }}>{row.name}</td>
                  <td style={{ padding: '9px 14px', fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--accent)', borderBottom: '1px solid var(--paper-edge)' }}>{row.peakKg > 0 ? `${row.peakKg} kg` : '—'}</td>
                  <td style={{ padding: '9px 14px', fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-muted)', borderBottom: '1px solid var(--paper-edge)' }}>{row.peakReps > 0 ? `${row.peakReps} reps` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ padding: '24px', background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', borderRadius: 3, marginBottom: 28, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>No sessions were logged — that&apos;s okay. You still finished.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, margin: '0 auto' }}>
        {summary.length > 0 && (
          <button
            onClick={downloadSummary}
            style={{
              padding: '13px 20px', background: 'var(--ink)', color: 'var(--paper)',
              border: 'none', borderRadius: 3, fontFamily: 'var(--mono)',
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer',
            }}
          >
            Save summary (.txt)
          </button>
        )}
        <button
          onClick={clearData}
          disabled={deleting}
          style={{
            padding: '13px 20px', background: 'transparent',
            border: '1px solid var(--paper-edge)', borderRadius: 3,
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--ink-soft)', cursor: deleting ? 'default' : 'pointer',
            opacity: deleting ? 0.6 : 1,
          }}
        >
          {deleting ? 'Clearing…' : 'Clear my data'}
        </button>
        <button
          onClick={onDone}
          style={{
            background: 'transparent', border: 'none',
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--ink-muted)',
            cursor: 'pointer', textDecoration: 'underline', padding: '8px 0',
          }}
        >
          Skip →
        </button>
      </div>
    </div>
  )
}

// ─── Modal wrapper ────────────────────────────────────────────────────────────

function SendOffModal({ programmeStartDate, sessionCount, userId }: { programmeStartDate?: string | null; sessionCount?: number; userId: string }) {
  const [slide, setSlide] = useState<1 | 2 | 3>(1)
  const [stage, setStage] = useState<'slides' | 'summary' | 'done'>('slides')

  if (stage === 'done') {
    return (
      <div style={{
        padding: '32px 24px', borderRadius: 3,
        background: 'rgba(184,84,58,0.06)', border: '1px solid rgba(184,84,58,0.2)',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 500, marginBottom: 8 }}>
          Programme complete. The gym is yours.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
          <a href="/template" style={{
            padding: '12px 24px', background: 'var(--accent)', color: 'var(--paper)',
            borderRadius: 3, fontFamily: 'var(--mono)', fontSize: 11,
            letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none',
          }}>
            Build my plan →
          </a>
          <a href="/programme" style={{
            padding: '12px 24px', border: '1px solid var(--paper-edge)',
            background: 'transparent', color: 'var(--ink-soft)',
            borderRadius: 3, fontFamily: 'var(--mono)', fontSize: 11,
            letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none',
          }}>
            Back to programme
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(31,27,22,0.72)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px',
      }}>
        {/* Modal */}
        <div style={{
          background: 'var(--paper)', border: '1px solid var(--paper-edge)',
          borderRadius: 3, padding: 'clamp(28px,5vw,48px)',
          width: '100%', maxWidth: 600, maxHeight: '90vh',
          overflowY: 'auto', position: 'relative',
          boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
        }}>
          {stage === 'slides' && (
            <>
              {/* Progress dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
                {([1, 2, 3] as const).map(n => (
                  <div key={n} style={{
                    width: n === slide ? 24 : 8, height: 8,
                    borderRadius: 4, transition: 'all 0.3s',
                    background: n === slide ? 'var(--accent)' : 'var(--paper-edge)',
                  }} />
                ))}
              </div>

              {slide === 1 && <SlideOne onNext={() => setSlide(2)} />}
              {slide === 2 && <SlideTwo onNext={() => setSlide(3)} />}
              {slide === 3 && <SlideThree onDone={() => setStage('summary')} />}
            </>
          )}

          {stage === 'summary' && (
            <SummaryPanel userId={userId} onDone={() => setStage('done')} />
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
      `}</style>
    </>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function CompleteWeek({ userId, initialComplete, initialQuizPassed, programmeStartDate, sessionCount }: Props) {
  const [complete, setComplete] = useState(initialComplete)
  const [quizPassed, setQuizPassed] = useState(initialQuizPassed)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    function handleQuizPass() { setQuizPassed(true) }
    window.addEventListener('quiz:passed', handleQuizPass)
    return () => window.removeEventListener('quiz:passed', handleQuizPass)
  }, [])

  useEffect(() => {
    if (!initialQuizPassed) {
      const supabase = createSupabaseBrowserClient()
      supabase.from('week_progress').select('quiz_passed, week_complete').eq('user_id', userId).eq('week_number', 8).maybeSingle()
        .then(({ data }) => {
          if (data?.quiz_passed) setQuizPassed(true)
          if (data?.week_complete) setComplete(true)
        })
    }
  }, [])

  async function handleComplete() {
    if (!quizPassed || complete || loading) return
    setLoading(true)
    const supabase = createSupabaseBrowserClient()
    await supabase.from('week_progress').upsert({
      user_id: userId, week_number: 8, week_complete: true, completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,week_number' })
    await supabase.from('profiles').update({ programme_complete: true }).eq('id', userId)

    fetch('/api/email/week-8-graduation', { method: 'POST' }).catch(() => null)

    setComplete(true)
    setLoading(false)
    setShowModal(true)
  }

  if (!quizPassed) {
    return (
      <div style={{ padding: 24, borderRadius: 3, border: '1px dashed var(--paper-edge)', background: 'var(--paper-deep)' }}>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', textAlign: 'center' }}>Complete the quiz above to unlock this button.</p>
      </div>
    )
  }

  if (complete) {
    return (
      <>
        {showModal && <SendOffModal programmeStartDate={programmeStartDate} sessionCount={sessionCount} userId={userId} />}
        {!showModal && (
          <div style={{
            padding: '32px 24px', borderRadius: 3,
            background: 'rgba(184,84,58,0.06)', border: '1px solid rgba(184,84,58,0.2)',
            textAlign: 'center',
          }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 500, marginBottom: 8 }}>
              Programme complete. The gym is yours.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
              <a href="/template" style={{
                padding: '12px 24px', background: 'var(--accent)', color: 'var(--paper)',
                borderRadius: 3, fontFamily: 'var(--mono)', fontSize: 11,
                letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
                Build my plan →
              </a>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  padding: '12px 24px', border: '1px solid var(--paper-edge)',
                  background: 'transparent', color: 'var(--ink-soft)',
                  borderRadius: 3, fontFamily: 'var(--mono)', fontSize: 11,
                  letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                See completion screens
              </button>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <CompletionSummary
      programmeStartDate={programmeStartDate}
      sessionCount={sessionCount}
      onComplete={handleComplete}
      loading={loading}
    />
  )
}
