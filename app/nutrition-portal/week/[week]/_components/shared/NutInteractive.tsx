'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import type { QuizQuestion } from '@/app/lib/nutrition-curriculum'

// ── Quiz ───────────────────────────────────────────────────────────────────
export function NutQuiz({ questions, weekNum, userId, initialPassed }: {
  questions: QuizQuestion[]
  weekNum: number
  userId: string
  initialPassed: boolean
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [locked, setLocked] = useState<Record<number, boolean>>({})
  const [passed, setPassed] = useState(initialPassed)

  const allAnswered = Object.keys(locked).length === questions.length
  const correctCount = Object.entries(locked).filter(([qi]) => answers[+qi] === questions[+qi].correct).length

  async function choose(qi: number, oi: number) {
    if (locked[qi]) return
    const newAnswers = { ...answers, [qi]: oi }
    const newLocked = { ...locked, [qi]: true }
    setAnswers(newAnswers)
    setLocked(newLocked)

    if (Object.keys(newLocked).length === questions.length) {
      const correct = questions.every((q, i) => newAnswers[i] === q.correct)
      if (correct && !passed) {
        setPassed(true)
        const supabase = createSupabaseBrowserClient()
        await supabase.from('week_progress').upsert(
          { user_id: userId, week_number: weekNum, quiz_passed: true },
          { onConflict: 'user_id,week_number' }
        )
      }
    }
  }

  if (passed && Object.keys(locked).length === 0) {
    return (
      <div style={{ padding: '20px 24px', background: 'rgba(184,84,58,0.05)', border: '1px solid rgba(184,84,58,0.18)', display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ color: 'var(--accent)', fontSize: 20 }}>✓</span>
        <div>
          <p style={{ fontWeight: 600, color: 'var(--accent)', fontSize: 14 }}>Quiz passed</p>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>Scroll down to complete the week.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
        Week {String(weekNum).padStart(2, '0')} check · {Object.keys(locked).length} of {questions.length} answered
      </p>
      {questions.map((q, qi) => (
        <div key={qi} style={{ borderBottom: qi < questions.length - 1 ? '1px solid var(--paper-edge)' : 'none', paddingBottom: qi < questions.length - 1 ? 24 : 0 }}>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', marginBottom: 14, lineHeight: 1.5 }}>{qi + 1}. {q.q}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {q.opts.map((opt, oi) => {
              const isSelected = answers[qi] === oi
              const isLocked = !!locked[qi]
              const isCorrect = oi === q.correct
              const showRight = isLocked && isCorrect
              const showWrong = isLocked && isSelected && !isCorrect
              return (
                <button key={oi} onClick={() => choose(qi, oi)} disabled={isLocked}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', textAlign: 'left', cursor: isLocked ? 'default' : 'pointer', border: '1px solid', borderRadius: 2,
                    borderColor: showRight ? 'rgba(122,139,110,0.5)' : showWrong ? 'rgba(180,60,60,0.4)' : isSelected ? 'rgba(184,84,58,0.3)' : 'var(--paper-edge)',
                    background: showRight ? 'rgba(122,139,110,0.08)' : showWrong ? 'rgba(180,60,60,0.06)' : isSelected ? 'rgba(184,84,58,0.05)' : 'var(--paper-deep)',
                  }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'var(--mono)', flexShrink: 0,
                    borderColor: showRight ? 'var(--sage)' : showWrong ? 'rgba(180,60,60,0.5)' : isSelected ? 'var(--accent)' : 'var(--paper-edge)',
                    color: showRight ? 'var(--sage)' : showWrong ? 'rgba(180,60,60,0.8)' : isSelected ? 'var(--accent)' : 'var(--ink-muted)',
                  }}>
                    {showRight ? '✓' : showWrong ? '✗' : String.fromCharCode(65 + oi)}
                  </span>
                  <span style={{ fontSize: 14, color: showRight ? 'var(--sage)' : showWrong ? 'rgba(180,60,60,0.85)' : 'var(--ink)', lineHeight: 1.5 }}>{opt}</span>
                </button>
              )
            })}
          </div>
          {locked[qi] && (
            <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--paper-deep)', borderLeft: '2px solid var(--accent)' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>Why</p>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{q.why}</p>
            </div>
          )}
        </div>
      ))}
      {allAnswered && (
        <div style={{ padding: '16px 20px', background: correctCount === questions.length ? 'rgba(122,139,110,0.08)' : 'var(--paper-deep)', border: `1px solid ${correctCount === questions.length ? 'rgba(122,139,110,0.3)' : 'var(--paper-edge)'}` }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--ink)' }}>
            {correctCount}/{questions.length} — {correctCount === questions.length ? 'Perfect. Move on.' : 'Re-read the lesson above.'}
          </p>
        </div>
      )}
    </div>
  )
}

// ── Reflection ─────────────────────────────────────────────────────────────
export function NutReflection({ prompt, weekNum, userId }: { prompt: string; weekNum: number; userId: string }) {
  const storageKey = `nut-reflection-${weekNum}`
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(localStorage.getItem(storageKey) || '')
  }, [storageKey])

  async function handleChange(v: string) {
    setValue(v)
    localStorage.setItem(storageKey, v)
  }

  async function handleBlur() {
    if (!value.trim()) return
    const supabase = createSupabaseBrowserClient()
    await supabase.from('week_progress').upsert(
      { user_id: userId, week_number: weekNum, reflection_text: value },
      { onConflict: 'user_id,week_number' }
    )
  }

  return (
    <div>
      <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontStyle: 'italic', lineHeight: 1.65, color: 'var(--ink)', marginBottom: 16 }}>{prompt}</p>
      <textarea
        value={value}
        onChange={e => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder="Type your answer here…"
        rows={4}
        style={{ width: '100%', padding: '14px 16px', border: '1.5px solid var(--paper-edge)', background: 'var(--paper)', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)', lineHeight: 1.7, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
      />
    </div>
  )
}

// ── Complete ───────────────────────────────────────────────────────────────
export function NutComplete({ weekNum, userId, initialComplete, initialQuizPassed }: {
  weekNum: number
  userId: string
  initialComplete: boolean
  initialQuizPassed: boolean
}) {
  const router = useRouter()
  const [complete, setComplete] = useState(initialComplete)
  const [quizPassed, setQuizPassed] = useState(initialQuizPassed)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialQuizPassed) return
    const supabase = createSupabaseBrowserClient()
    supabase.from('week_progress').select('quiz_passed,week_complete').eq('user_id', userId).eq('week_number', weekNum).maybeSingle()
      .then(({ data }) => {
        if (data?.quiz_passed) setQuizPassed(true)
        if (data?.week_complete) setComplete(true)
      })
  }, [])

  async function handleComplete() {
    if (!quizPassed || complete || loading) return
    setLoading(true)
    const supabase = createSupabaseBrowserClient()
    await supabase.from('week_progress').upsert(
      { user_id: userId, week_number: weekNum, week_complete: true, completed_at: new Date().toISOString() },
      { onConflict: 'user_id,week_number' }
    )
    setComplete(true)
    setLoading(false)
    if (weekNum < 8) {
      setTimeout(() => { router.push(`/nutrition-portal/week/${weekNum + 1}`); router.refresh() }, 1800)
    }
  }

  if (!quizPassed) {
    return (
      <div style={{ padding: '20px 24px', border: '1px dashed var(--paper-edge)', background: 'var(--paper-deep)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Complete the quiz to unlock this</p>
      </div>
    )
  }

  if (complete) {
    return (
      <div style={{ padding: '20px 24px', background: 'rgba(184,84,58,0.05)', border: '1px solid rgba(184,84,58,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 20, color: 'var(--accent)' }}>✓</span>
          <div>
            <p style={{ fontWeight: 600, color: 'var(--accent)', fontSize: 15 }}>Week {weekNum} complete.</p>
            <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>{weekNum < 8 ? `Week ${weekNum + 1} unlocked.` : 'Course complete. Run your plan.'}</p>
          </div>
        </div>
        {weekNum < 8 && (
          <a href={`/nutrition-portal/week/${weekNum + 1}`} style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', textDecoration: 'none' }}>
            Week {weekNum + 1} →
          </a>
        )}
      </div>
    )
  }

  return (
    <button onClick={handleComplete} disabled={loading}
      style={{ width: '100%', padding: '18px 24px', background: 'var(--ink)', color: 'var(--paper)', border: 'none', cursor: loading ? 'wait' : 'pointer', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: loading ? 0.7 : 1 }}>
      {loading ? 'Saving…' : `Complete week ${weekNum}${weekNum < 8 ? ` · unlock week ${weekNum + 1} →` : ''}`}
    </button>
  )
}

// ── Plate Builder (week 2) ─────────────────────────────────────────────────
export function NutPlate({ title, caption }: { title: string; caption: string }) {
  const [comp, setComp] = useState({ protein: 30, carbs: 30, veg: 40 })
  const target = { protein: 30, carbs: 30, veg: 40 }
  const total = comp.protein + comp.carbs + comp.veg

  function arc(start: number, end: number, r1: number, r2: number) {
    const a1 = (start / 100) * 2 * Math.PI - Math.PI / 2
    const a2 = (end / 100) * 2 * Math.PI - Math.PI / 2
    const large = end - start > 50 ? 1 : 0
    const x1 = 80 + r1 * Math.cos(a1), y1 = 80 + r1 * Math.sin(a1)
    const x2 = 80 + r1 * Math.cos(a2), y2 = 80 + r1 * Math.sin(a2)
    const x3 = 80 + r2 * Math.cos(a2), y3 = 80 + r2 * Math.sin(a2)
    const x4 = 80 + r2 * Math.cos(a1), y4 = 80 + r2 * Math.sin(a1)
    return `M ${x1} ${y1} A ${r1} ${r1} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${r2} ${r2} 0 ${large} 0 ${x4} ${y4} Z`
  }

  const pP = (comp.protein / total) * 100
  const pC = (comp.carbs / total) * 100

  function adj(k: 'protein' | 'carbs' | 'veg', d: number) {
    setComp(prev => ({ ...prev, [k]: Math.max(10, Math.min(70, prev[k] + d)) }))
  }

  const btnStyle: React.CSSProperties = { width: 24, height: 24, background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)', borderRadius: 2 }

  return (
    <div>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 500, marginBottom: 6 }}>{title}</h3>
      <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 20, lineHeight: 1.6 }}>{caption}</p>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
        <svg width="160" height="160" viewBox="0 0 160 160" style={{ flexShrink: 0 }}>
          <circle cx="80" cy="80" r="74" fill="var(--paper)" stroke="var(--paper-edge)" strokeWidth="1.5" />
          <path d={arc(0, pP, 70, 12)} fill="var(--accent)" opacity="0.85" />
          <path d={arc(pP, pP + pC, 70, 12)} fill="var(--wheat)" opacity="0.85" />
          <path d={arc(pP + pC, 100, 70, 12)} fill="var(--sage)" opacity="0.85" />
          <circle cx="80" cy="80" r="12" fill="var(--paper)" stroke="var(--paper-edge)" strokeWidth="1.5" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1, minWidth: 200 }}>
          {(['protein', 'carbs', 'veg'] as const).map(k => {
            const colors = { protein: 'var(--accent)', carbs: 'var(--wheat)', veg: 'var(--sage)' }
            const labels = { protein: 'Protein', carbs: 'Carbs', veg: 'Veg/fibre' }
            const ok = Math.abs(comp[k] - target[k]) <= 10
            return (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 12, height: 12, background: colors[k], flexShrink: 0, borderRadius: 2 }} />
                <span style={{ fontFamily: 'var(--serif)', fontSize: 14, flex: 1 }}>{labels[k]}</span>
                <button onClick={() => adj(k, -5)} style={btnStyle}>−</button>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, minWidth: 36, textAlign: 'center', color: ok ? 'var(--sage)' : 'var(--accent)' }}>{comp[k]}%</span>
                <button onClick={() => adj(k, 5)} style={btnStyle}>+</button>
              </div>
            )
          })}
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', fontStyle: 'italic', marginTop: 4 }}>Within 10% of the target is plenty.</p>
        </div>
      </div>
    </div>
  )
}
