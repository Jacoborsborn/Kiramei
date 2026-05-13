'use client'

import { useState, useEffect, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type SplitKey = 'fullbody' | 'upperlower' | 'ppl' | 'custom'

interface ExerciseEntry {
  id: string
  name: string
  sets: string
  reps: string
  rest: string
}

interface SessionEntry {
  id: string
  label: string
  day: string
  exercises: ExerciseEntry[]
}

interface Plan {
  name: string
  split: SplitKey
  goal: string
  sessions: SessionEntry[]
}

// ─── Split presets ────────────────────────────────────────────────────────────

const SPLIT_OPTIONS: { key: SplitKey; label: string; desc: string; sessions: { label: string; day: string }[] }[] = [
  {
    key: 'fullbody',
    label: 'Full Body',
    desc: '3×/week. Each session hits every major muscle group. Best when building the habit or returning from a break.',
    sessions: [
      { label: 'Full Body A', day: 'Monday' },
      { label: 'Full Body B', day: 'Wednesday' },
      { label: 'Full Body C', day: 'Friday' },
    ],
  },
  {
    key: 'upperlower',
    label: 'Upper / Lower',
    desc: '4×/week. Alternate upper body and lower body days. More volume per muscle than full body.',
    sessions: [
      { label: 'Upper A', day: 'Monday' },
      { label: 'Lower A', day: 'Tuesday' },
      { label: 'Upper B', day: 'Thursday' },
      { label: 'Lower B', day: 'Friday' },
    ],
  },
  {
    key: 'ppl',
    label: 'Push / Pull / Legs',
    desc: '3–6×/week. Push (chest/shoulders/triceps), Pull (back/biceps), Legs. The structure serious lifters use.',
    sessions: [
      { label: 'Push', day: 'Monday' },
      { label: 'Pull', day: 'Wednesday' },
      { label: 'Legs', day: 'Friday' },
    ],
  },
  {
    key: 'custom',
    label: 'Custom',
    desc: 'Design your own from scratch. Name sessions whatever you like.',
    sessions: [
      { label: 'Session A', day: 'Day 1' },
    ],
  },
]

const GOAL_OPTIONS = [
  { key: 'strength', label: 'Build strength', desc: '3–5 sets · 4–8 reps · heavier weight · longer rest' },
  { key: 'hypertrophy', label: 'Build muscle', desc: '3–4 sets · 8–12 reps · moderate weight · 60–90s rest' },
  { key: 'endurance', label: 'Build endurance', desc: '2–3 sets · 12–20 reps · lighter weight · 30–60s rest' },
  { key: 'recomp', label: 'Recomp', desc: '3–4 sets · 8–15 reps · maintain weight · eat at maintenance' },
]

// ─── Helper ───────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

function blankExercise(): ExerciseEntry {
  return { id: uid(), name: '', sets: '3', reps: '10', rest: '90s' }
}

function blankSession(label = 'Session', day = 'Day'): SessionEntry {
  return {
    id: uid(),
    label,
    day,
    exercises: [blankExercise(), blankExercise(), blankExercise()],
  }
}

function formatPlanText(plan: Plan): string {
  const lines: string[] = []
  lines.push(`═══════════════════════════════`)
  lines.push(`  ${plan.name || 'My Training Plan'}`)
  lines.push(`  Split: ${SPLIT_OPTIONS.find(s => s.key === plan.split)?.label ?? plan.split}`)
  lines.push(`  Goal: ${GOAL_OPTIONS.find(g => g.key === plan.goal)?.label ?? plan.goal}`)
  lines.push(`═══════════════════════════════`)
  lines.push('')
  for (const session of plan.sessions) {
    if (!session.label) continue
    lines.push(`${session.day.toUpperCase()} — ${session.label}`)
    lines.push('───────────────────────────────')
    for (const ex of session.exercises) {
      if (!ex.name) continue
      lines.push(`${ex.name} · ${ex.sets}×${ex.reps} · ${ex.rest} rest`)
    }
    lines.push('')
  }
  lines.push('Built with Kira Mei — Training Blueprint')
  return lines.join('\n')
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ExerciseRow({
  ex,
  onChange,
  onRemove,
}: {
  ex: ExerciseEntry
  onChange: (updated: ExerciseEntry) => void
  onRemove: () => void
}) {
  function field(key: keyof ExerciseEntry, value: string) {
    onChange({ ...ex, [key]: value })
  }

  const inputBase: React.CSSProperties = {
    background: 'var(--paper)',
    border: '1px solid var(--paper-edge)',
    borderRadius: 3,
    fontFamily: 'var(--sans)',
    fontSize: 13,
    color: 'var(--ink)',
    padding: '8px 10px',
    outline: 'none',
    width: '100%',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 64px 72px 32px', gap: 6, alignItems: 'center' }} className="ex-row">
      <input
        style={inputBase}
        placeholder="Exercise name"
        value={ex.name}
        onChange={e => field('name', e.target.value)}
      />
      <input
        style={{ ...inputBase, textAlign: 'center' }}
        placeholder="Sets"
        value={ex.sets}
        onChange={e => field('sets', e.target.value)}
      />
      <input
        style={{ ...inputBase, textAlign: 'center' }}
        placeholder="Reps"
        value={ex.reps}
        onChange={e => field('reps', e.target.value)}
      />
      <input
        style={{ ...inputBase, textAlign: 'center' }}
        placeholder="Rest"
        value={ex.rest}
        onChange={e => field('rest', e.target.value)}
      />
      <button
        onClick={onRemove}
        title="Remove exercise"
        style={{
          background: 'transparent', border: 'none',
          color: 'var(--ink-muted)', fontSize: 16, cursor: 'pointer',
          padding: 4, borderRadius: 3,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  )
}

function SessionCard({
  session,
  onChange,
  onRemove,
  canRemove,
}: {
  session: SessionEntry
  onChange: (s: SessionEntry) => void
  onRemove: () => void
  canRemove: boolean
}) {
  function updateExercise(idx: number, ex: ExerciseEntry) {
    const exercises = [...session.exercises]
    exercises[idx] = ex
    onChange({ ...session, exercises })
  }

  function removeExercise(idx: number) {
    onChange({ ...session, exercises: session.exercises.filter((_, i) => i !== idx) })
  }

  function addExercise() {
    onChange({ ...session, exercises: [...session.exercises, blankExercise()] })
  }

  return (
    <div style={{
      border: '1px solid var(--paper-edge)',
      borderRadius: 3,
      overflow: 'hidden',
      marginBottom: 20,
    }}>
      {/* Session header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 18px',
        background: 'var(--paper-deep)',
        borderBottom: '1px solid var(--paper-edge)',
      }}>
        <input
          value={session.day}
          onChange={e => onChange({ ...session, day: e.target.value })}
          placeholder="Day"
          style={{
            background: 'transparent', border: '1px solid var(--paper-edge)',
            borderRadius: 3, padding: '5px 8px',
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--accent)', width: 80,
          }}
        />
        <input
          value={session.label}
          onChange={e => onChange({ ...session, label: e.target.value })}
          placeholder="Session name"
          style={{
            flex: 1, background: 'transparent', border: '1px solid var(--paper-edge)',
            borderRadius: 3, padding: '5px 10px',
            fontFamily: 'var(--serif)', fontSize: 14,
            color: 'var(--ink)',
          }}
        />
        {canRemove && (
          <button
            onClick={onRemove}
            style={{
              background: 'transparent', border: '1px solid var(--paper-edge)',
              borderRadius: 3, padding: '4px 10px',
              fontFamily: 'var(--mono)', fontSize: 10,
              color: 'var(--ink-muted)', cursor: 'pointer',
            }}
          >
            Remove
          </button>
        )}
      </div>

      {/* Exercise rows */}
      <div style={{ padding: '16px 18px' }}>
        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 64px 72px 32px', gap: 6, marginBottom: 8 }} className="ex-row">
          {['Exercise', 'Sets', 'Reps', 'Rest', ''].map(h => (
            <p key={h} style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>{h}</p>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {session.exercises.map((ex, i) => (
            <ExerciseRow
              key={ex.id}
              ex={ex}
              onChange={updated => updateExercise(i, updated)}
              onRemove={() => removeExercise(i)}
            />
          ))}
        </div>

        <button
          onClick={addExercise}
          style={{
            marginTop: 12,
            background: 'transparent', border: '1px dashed var(--paper-edge)',
            borderRadius: 3, padding: '8px 14px', width: '100%',
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
            color: 'var(--ink-muted)', cursor: 'pointer',
          }}
        >
          + Add exercise
        </button>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const LS_KEY = 'km_template_plan'
const LS_STEP_KEY = 'km_template_step'

export default function TemplateBuilder({ firstName, userEmail }: { firstName: string; userEmail?: string }) {
  const [step, setStep] = useState<'split' | 'goal' | 'build' | 'done'>('split')
  const [plan, setPlan] = useState<Plan>({
    name: '',
    split: 'fullbody',
    goal: 'hypertrophy',
    sessions: SPLIT_OPTIONS[0].sessions.map(s => blankSession(s.label, s.day)),
  })
  const [copied, setCopied] = useState(false)
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [shareStatus, setShareStatus] = useState<'idle' | 'done'>('idle')
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load from localStorage on first mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY)
      const savedStep = localStorage.getItem(LS_STEP_KEY)
      if (saved) setPlan(JSON.parse(saved))
      if (savedStep && ['split', 'goal', 'build', 'done'].includes(savedStep))
        setStep(savedStep as 'split' | 'goal' | 'build' | 'done')
    } catch {}
  }, [])

  // Debounced auto-save
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(plan))
        localStorage.setItem(LS_STEP_KEY, step)
      } catch {}
    }, 800)
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current) }
  }, [plan, step])

  function chooseSplit(key: SplitKey) {
    const preset = SPLIT_OPTIONS.find(s => s.key === key)!
    setPlan(p => ({
      ...p,
      split: key,
      sessions: preset.sessions.map(s => blankSession(s.label, s.day)),
    }))
  }

  function updateSession(idx: number, s: SessionEntry) {
    const sessions = [...plan.sessions]
    sessions[idx] = s
    setPlan(p => ({ ...p, sessions }))
  }

  function addSession() {
    setPlan(p => ({ ...p, sessions: [...p.sessions, blankSession()] }))
  }

  function removeSession(idx: number) {
    setPlan(p => ({ ...p, sessions: p.sessions.filter((_, i) => i !== idx) }))
  }

  function copyPlan() {
    navigator.clipboard.writeText(formatPlanText(plan)).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  function downloadPlan() {
    const text = formatPlanText(plan)
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${plan.name || 'my-training-plan'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function emailPlan() {
    if (emailStatus === 'sending') return
    setEmailStatus('sending')
    try {
      const res = await fetch('/api/template/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      setEmailStatus(res.ok ? 'sent' : 'error')
      setTimeout(() => setEmailStatus('idle'), 4000)
    } catch {
      setEmailStatus('error')
      setTimeout(() => setEmailStatus('idle'), 4000)
    }
  }

  async function sharePlan() {
    const text = formatPlanText(plan)
    const filename = `${plan.name || 'my-training-plan'}.txt`

    // Try Web Share API with file (mobile)
    if (typeof navigator.share === 'function' && navigator.canShare) {
      try {
        const file = new File([text], filename, { type: 'text/plain' })
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: plan.name || 'My Training Plan' })
          setShareStatus('done')
          setTimeout(() => setShareStatus('idle'), 2500)
          return
        }
      } catch {}
    }

    // Fallback: canvas PNG download
    const lines = text.split('\n')
    const canvas = document.createElement('canvas')
    const padding = 40
    const lineH = 26
    canvas.width = 700
    canvas.height = padding * 2 + lines.length * lineH
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#F5EFE3'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#1F1B16'
    ctx.font = '14px monospace'
    lines.forEach((line, i) => {
      ctx.fillText(line, padding, padding + i * lineH + 14)
    })
    canvas.toBlob(blob => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${plan.name || 'my-training-plan'}.png`
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
    setShareStatus('done')
    setTimeout(() => setShareStatus('idle'), 2500)
  }

  const accentBtn: React.CSSProperties = {
    padding: '12px 24px', background: 'var(--accent)', color: 'var(--paper)',
    border: 'none', borderRadius: 3, fontFamily: 'var(--mono)',
    fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
    cursor: 'pointer',
  }

  const ghostBtn: React.CSSProperties = {
    ...accentBtn, background: 'transparent',
    border: '1px solid var(--paper-edge)', color: 'var(--ink-soft)',
  }

  // ── Step: Split ──────────────────────────────────────────────────────────────

  if (step === 'split') {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>
          § 1 · Choose your split
        </p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 10 }}>
          Build Your Own Plan, {firstName}.
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 36 }}>
          Eight weeks of training gave you the knowledge. This is where you use it. Pick the split that matches where you are right now.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          {SPLIT_OPTIONS.map(opt => (
            <button
              key={opt.key}
              onClick={() => chooseSplit(opt.key)}
              style={{
                textAlign: 'left', padding: '20px 24px',
                background: plan.split === opt.key ? 'rgba(184,84,58,0.06)' : 'var(--paper)',
                border: `1.5px solid ${plan.split === opt.key ? 'var(--accent)' : 'var(--paper-edge)'}`,
                borderRadius: 3, cursor: 'pointer',
                transition: 'border-color 0.15s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 500, color: 'var(--ink)' }}>{opt.label}</span>
                {plan.split === opt.key && (
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>Selected</span>
                )}
              </div>
              <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{opt.desc}</p>
            </button>
          ))}
        </div>

        <button style={accentBtn} onClick={() => setStep('goal')}>
          Next: Set your goal →
        </button>
      </div>
    )
  }

  // ── Step: Goal ───────────────────────────────────────────────────────────────

  if (step === 'goal') {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>
          § 2 · Set your goal
        </p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 10 }}>
          What are you training for?
        </h2>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 36 }}>
          This shapes the sets, reps, and rest guidance shown alongside your plan.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          {GOAL_OPTIONS.map(opt => (
            <button
              key={opt.key}
              onClick={() => setPlan(p => ({ ...p, goal: opt.key }))}
              style={{
                textAlign: 'left', padding: '18px 24px',
                background: plan.goal === opt.key ? 'rgba(184,84,58,0.06)' : 'var(--paper)',
                border: `1.5px solid ${plan.goal === opt.key ? 'var(--accent)' : 'var(--paper-edge)'}`,
                borderRadius: 3, cursor: 'pointer',
                transition: 'border-color 0.15s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500, color: 'var(--ink)' }}>{opt.label}</span>
                {plan.goal === opt.key && (
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>Selected</span>
                )}
              </div>
              <p style={{ fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'var(--mono)', letterSpacing: '0.06em' }}>{opt.desc}</p>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button style={ghostBtn} onClick={() => setStep('split')}>← Back</button>
          <button style={accentBtn} onClick={() => setStep('build')}>Next: Build your sessions →</button>
        </div>
      </div>
    )
  }

  // ── Step: Build ──────────────────────────────────────────────────────────────

  if (step === 'build') {
    const goalGuide = GOAL_OPTIONS.find(g => g.key === plan.goal)

    return (
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>
          § 3 · Fill in your sessions
        </p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Build your programme.
        </h2>

        {/* Goal reminder */}
        {goalGuide && (
          <div style={{
            display: 'inline-flex', gap: 10, alignItems: 'center',
            padding: '8px 14px', marginBottom: 24,
            background: 'rgba(184,84,58,0.05)', border: '1px solid rgba(184,84,58,0.15)',
            borderRadius: 3,
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase' }}>Goal guide</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)' }}>{goalGuide.desc}</span>
          </div>
        )}

        {/* Plan name */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 6 }}>Plan name</p>
          <input
            value={plan.name}
            onChange={e => setPlan(p => ({ ...p, name: e.target.value }))}
            placeholder="e.g. My PPL Phase 1"
            style={{
              width: '100%', maxWidth: 340,
              background: 'var(--paper)', border: '1.5px solid var(--ink)',
              borderRadius: 3, padding: '10px 14px',
              fontFamily: 'var(--serif)', fontSize: 16,
              color: 'var(--ink)',
            }}
          />
        </div>

        {/* Session cards */}
        {plan.sessions.map((s, i) => (
          <SessionCard
            key={s.id}
            session={s}
            onChange={updated => updateSession(i, updated)}
            onRemove={() => removeSession(i)}
            canRemove={plan.sessions.length > 1}
          />
        ))}

        <button
          onClick={addSession}
          style={{
            ...ghostBtn, width: '100%', justifyContent: 'center',
            display: 'flex', marginBottom: 32,
          }}
        >
          + Add another session
        </button>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button style={ghostBtn} onClick={() => setStep('goal')}>← Back</button>
          <button style={accentBtn} onClick={() => setStep('done')}>Finish & export →</button>
        </div>

        <style>{`
          @media (max-width: 540px) {
            .ex-row { grid-template-columns: 1fr 52px 52px 60px 28px !important; gap: 4px !important; }
          }
        `}</style>
      </div>
    )
  }

  // ── Step: Done ───────────────────────────────────────────────────────────────

  const planText = formatPlanText(plan)

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 20 }}>
        § 4 · Your plan
      </p>
      <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 8 }}>
        {plan.name || 'My Training Plan'}
      </h2>
      <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 32 }}>
        This is yours. Copy it, screenshot it, save it — then go build something with it.
      </p>

      {/* Plan preview */}
      <div style={{
        background: 'var(--paper)', border: '1.5px solid var(--ink)',
        borderRadius: 3, padding: 24,
        boxShadow: '4px 4px 0 var(--ink)',
        marginBottom: 24,
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 6, border: '1px dashed var(--paper-edge)', pointerEvents: 'none', borderRadius: 1 }} />

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>
            {SPLIT_OPTIONS.find(s => s.key === plan.split)?.label} · {GOAL_OPTIONS.find(g => g.key === plan.goal)?.label}
          </p>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500 }}>{plan.name || 'My Training Plan'}</h3>
        </div>

        {/* Sessions */}
        {plan.sessions.map(s => {
          const filledExercises = s.exercises.filter(e => e.name)
          if (!s.label && filledExercises.length === 0) return null
          return (
            <div key={s.id} style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '3px 7px', borderRadius: 2 }}>
                  {s.day}
                </span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500 }}>{s.label}</span>
              </div>
              {filledExercises.length > 0 ? (
                filledExercises.map(ex => (
                  <div key={ex.id} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto auto auto',
                    gap: 12, padding: '9px 0',
                    borderBottom: '1px solid var(--paper-edge)',
                    alignItems: 'center',
                  }}>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: 14, color: 'var(--ink)' }}>{ex.name}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>{ex.sets}×{ex.reps}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)' }}>{ex.rest} rest</span>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: 12, color: 'var(--ink-muted)', fontStyle: 'italic' }}>No exercises added</p>
              )}
            </div>
          )
        })}

        <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)', marginTop: 8 }}>
          Built with Kira Mei — Training Blueprint
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <button
          onClick={copyPlan}
          style={{
            ...accentBtn,
            background: copied ? 'rgba(184,84,58,0.08)' : 'var(--accent)',
            color: copied ? 'var(--accent)' : 'var(--paper)',
            border: copied ? '1.5px solid var(--accent)' : 'none',
          }}
        >
          {copied ? 'Copied ✓' : 'Copy as text'}
        </button>
        <button style={ghostBtn} onClick={downloadPlan}>
          Save to files
        </button>
        {userEmail && (
          <button
            onClick={emailPlan}
            disabled={emailStatus === 'sending'}
            style={{
              ...ghostBtn,
              opacity: emailStatus === 'sending' ? 0.6 : 1,
              color: emailStatus === 'sent' ? 'var(--accent)' : emailStatus === 'error' ? '#c0392b' : 'var(--ink-soft)',
            }}
          >
            {emailStatus === 'sending' ? 'Sending…' : emailStatus === 'sent' ? 'Sent ✓' : emailStatus === 'error' ? 'Failed — retry' : 'Email to myself'}
          </button>
        )}
        <button
          onClick={sharePlan}
          style={{
            ...ghostBtn,
            color: shareStatus === 'done' ? 'var(--accent)' : 'var(--ink-soft)',
          }}
        >
          {shareStatus === 'done' ? 'Saved ✓' : 'Save to camera roll'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <button style={ghostBtn} onClick={() => setStep('build')}>
          ← Edit plan
        </button>
        <button style={ghostBtn} onClick={() => {
          try { localStorage.removeItem(LS_KEY); localStorage.removeItem(LS_STEP_KEY) } catch {}
          setPlan({ name: '', split: 'fullbody', goal: 'hypertrophy', sessions: SPLIT_OPTIONS[0].sessions.map(s => blankSession(s.label, s.day)) })
          setStep('split')
        }}>
          Start over
        </button>
      </div>

      {/* Hidden plain text for copying */}
      <details style={{ marginTop: 16 }}>
        <summary style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', cursor: 'pointer' }}>
          View plain text version
        </summary>
        <pre style={{
          marginTop: 12, padding: 16,
          background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)',
          borderRadius: 3, fontFamily: 'var(--mono)', fontSize: 12,
          lineHeight: 1.7, color: 'var(--ink)', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        }}>
          {planText}
        </pre>
      </details>
    </div>
  )
}
