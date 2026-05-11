'use client'

import { useState, useRef, useCallback } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

interface ExerciseRow {
  name: string
  sets: string
  rest: string
}

interface SessionData {
  label: 'A' | 'B' | 'C'
  day: string
  title: string
  exercises: ExerciseRow[]
}

const SESSIONS: SessionData[] = [
  {
    label: 'A', day: 'MONDAY', title: 'Session A',
    exercises: [
      { name: 'Goblet Squat', sets: '3×10', rest: '90s rest' },
      { name: 'Romanian Deadlift', sets: '3×10', rest: '90s rest' },
      { name: 'Hip Thrust', sets: '3×15', rest: '60s rest' },
      { name: 'Seated Cable Row', sets: '3×10', rest: '90s rest' },
      { name: 'Dead Bug', sets: '3×8/side', rest: '60s rest' },
    ],
  },
  {
    label: 'B', day: 'WEDNESDAY', title: 'Session B',
    exercises: [
      { name: 'Leg Press', sets: '3×12', rest: '90s rest' },
      { name: 'Bulgarian Split Squat', sets: '3×10/side', rest: '90s rest' },
      { name: 'Glute Kickback (Cable)', sets: '3×15/side', rest: '60s rest' },
      { name: 'DB Shoulder Press', sets: '3×10', rest: '90s rest' },
      { name: 'Plank Hold', sets: '3×30s', rest: '60s rest' },
    ],
  },
  {
    label: 'C', day: 'FRIDAY', title: 'Session C',
    exercises: [
      { name: 'Goblet Squat', sets: '3×12', rest: '90s rest' },
      { name: 'Romanian Deadlift', sets: '3×10', rest: '90s rest' },
      { name: 'Hip Thrust', sets: '3×15', rest: '60s rest' },
      { name: 'Lat Pulldown', sets: '3×10', rest: '90s rest' },
      { name: 'Pallof Press', sets: '3×10/side', rest: '60s rest' },
    ],
  },
]

type LogKey = string // `${sessionLabel}__${exerciseName}`
type LogField = 'weight' | 'reps'
type LogState = Record<LogKey, { weight: string; reps: string }>

function makeKey(session: string, exercise: string) {
  return `${session}__${exercise}`
}

interface Props {
  userId: string
  initialLogs: Array<{
    session_label: string
    exercise_name: string
    weight_kg: number | null
    reps: number | null
  }>
}

export default function Schedule({ userId, initialLogs }: Props) {
  const [copied, setCopied] = useState(false)
  const [saveStates, setSaveStates] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>({
    A: 'idle', B: 'idle', C: 'idle',
  })

  const [logs, setLogs] = useState<LogState>(() => {
    const state: LogState = {}
    for (const s of SESSIONS) {
      for (const ex of s.exercises) {
        const key = makeKey(s.label, ex.name)
        const found = initialLogs.find(
          l => l.session_label === s.label && l.exercise_name === ex.name
        )
        state[key] = {
          weight: found?.weight_kg != null ? String(found.weight_kg) : '',
          reps: found?.reps != null ? String(found.reps) : '',
        }
      }
    }
    return state
  })

  function handleChange(session: string, exercise: string, field: LogField, value: string) {
    const key = makeKey(session, exercise)
    setLogs(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }))
    setSaveStates(prev => ({ ...prev, [session]: 'idle' }))
  }

  async function handleSave(session: SessionData) {
    setSaveStates(prev => ({ ...prev, [session.label]: 'saving' }))
    const supabase = createSupabaseBrowserClient()

    const rows = session.exercises
      .map(ex => {
        const key = makeKey(session.label, ex.name)
        const entry = logs[key]
        const weight = parseFloat(entry.weight)
        const reps = parseInt(entry.reps, 10)
        if (!entry.weight && !entry.reps) return null
        return {
          user_id: userId,
          week_number: 1,
          session_label: session.label,
          exercise_name: ex.name,
          weight_kg: isNaN(weight) ? null : weight,
          reps: isNaN(reps) ? null : reps,
        }
      })
      .filter(Boolean)

    if (rows.length === 0) {
      setSaveStates(prev => ({ ...prev, [session.label]: 'idle' }))
      return
    }

    const { error } = await supabase
      .from('exercise_logs')
      .upsert(rows as object[], {
        onConflict: 'user_id,week_number,session_label,exercise_name',
        ignoreDuplicates: false,
      })

    if (error) {
      // Fallback: insert if upsert fails (no unique constraint)
      await supabase.from('exercise_logs').insert(rows as object[])
    }

    setSaveStates(prev => ({ ...prev, [session.label]: 'saved' }))
    setTimeout(() => setSaveStates(prev => ({ ...prev, [session.label]: 'idle' })), 2500)
  }

  const plainText = `WEEK 1 SCHEDULE

MONDAY — Session A
Goblet Squat · 3×10 · 90s rest
Romanian Deadlift · 3×10 · 90s rest
Hip Thrust · 3×15 · 60s rest
Seated Cable Row · 3×10 · 90s rest
Dead Bug · 3×8/side · 60s rest

WEDNESDAY — Session B
Leg Press · 3×12 · 90s rest
Bulgarian Split Squat · 3×10/side · 90s rest
Glute Kickback (Cable) · 3×15/side · 60s rest
DB Shoulder Press · 3×10 · 90s rest
Plank Hold · 3×30s · 60s rest

FRIDAY — Session C
Goblet Squat · 3×12 · 90s rest (add weight from Monday)
Romanian Deadlift · 3×10 · 90s rest
Hip Thrust · 3×15 · 60s rest (add a plate or DB)
Lat Pulldown · 3×10 · 90s rest
Pallof Press · 3×10/side · 60s rest`

  function handleCopyNotes() {
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 36 }}>
        {SESSIONS.map(session => {
          const saveState = saveStates[session.label]
          return (
            <div key={session.label} style={{
              border: '1px solid var(--paper-edge)',
              borderRadius: 12, overflow: 'hidden',
            }}>
              {/* Session header */}
              <div style={{
                background: 'rgba(184,84,58,0.07)',
                borderBottom: '1px solid rgba(184,84,58,0.10)',
                padding: '14px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em' }}>
                    {session.day}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{session.title}</p>
                </div>
                <button
                  onClick={() => handleSave(session)}
                  disabled={saveState === 'saving'}
                  style={{
                    fontSize: 12, fontWeight: 600, padding: '7px 16px',
                    borderRadius: 8, border: '1px solid',
                    cursor: saveState === 'saving' ? 'default' : 'pointer',
                    background: saveState === 'saved' ? 'rgba(184,84,58,0.12)' : 'transparent',
                    borderColor: saveState === 'saved' ? 'rgba(184,84,58,0.25)' : 'var(--paper-edge)',
                    color: saveState === 'saved' ? 'var(--accent)' : 'var(--ink-soft)',
                    transition: 'all 0.2s',
                  }}
                >
                  {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved ✓' : 'Save session'}
                </button>
              </div>

              {/* Exercise rows */}
              <div>
                {/* Column headers */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 80px 70px',
                  gap: 8, padding: '10px 20px',
                  borderBottom: '1px solid var(--paper-edge)',
                }}>
                  <span style={colHeaderStyle}>Exercise</span>
                  <span style={colHeaderStyle}>Sets</span>
                  <span style={{ ...colHeaderStyle, textAlign: 'center' }}>kg</span>
                  <span style={{ ...colHeaderStyle, textAlign: 'center' }}>Reps done</span>
                </div>

                {session.exercises.map((ex, i) => {
                  const key = makeKey(session.label, ex.name)
                  const entry = logs[key] ?? { weight: '', reps: '' }
                  return (
                    <div key={ex.name} style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 80px 80px 70px',
                      gap: 8, padding: '10px 20px',
                      alignItems: 'center',
                      borderBottom: i < session.exercises.length - 1
                        ? '1px solid var(--paper-edge)' : 'none',
                    }}>
                      <div>
                        <p style={{ fontSize: 13, color: 'var(--ink)' }}>{ex.name}</p>
                        <p style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{ex.rest}</p>
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>{ex.sets}</span>
                      <input
                        type="number"
                        placeholder="—"
                        value={entry.weight}
                        onChange={e => handleChange(session.label, ex.name, 'weight', e.target.value)}
                        style={inputStyle}
                        min={0}
                        step={0.5}
                        aria-label={`${ex.name} weight in kg`}
                      />
                      <input
                        type="number"
                        placeholder="—"
                        value={entry.reps}
                        onChange={e => handleChange(session.label, ex.name, 'reps', e.target.value)}
                        style={inputStyle}
                        min={0}
                        aria-label={`${ex.name} reps completed`}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Copy-paste text block */}
      <div style={{
        border: '1px solid var(--paper-edge)', borderRadius: 10,
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', borderBottom: '1px solid var(--paper-edge)',
          background: 'var(--paper-deep)',
        }}>
          <p style={{ fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>
            PLAIN TEXT · COPY TO NOTES
          </p>
          <button
            onClick={handleCopyNotes}
            style={{
              fontSize: 12, fontWeight: 600, padding: '6px 14px',
              borderRadius: 7, border: '1px solid',
              borderColor: copied ? 'rgba(184,84,58,0.25)' : 'var(--paper-edge)',
              background: 'transparent', cursor: 'pointer',
              color: copied ? 'var(--accent)' : 'var(--ink-muted)',
              transition: 'all 0.2s',
            }}
          >
            {copied ? 'Copied ✓' : 'Copy to Notes'}
          </button>
        </div>
        <pre style={{
          margin: 0, padding: '16px',
          fontSize: 11.5, lineHeight: 1.8, color: 'var(--ink-muted)',
          fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
          background: 'rgba(31,27,22,0.04)', maxHeight: 260, overflowY: 'auto',
        }}>
          {plainText}
        </pre>
      </div>

      <style>{`
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
    </div>
  )
}

const colHeaderStyle: React.CSSProperties = {
  fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
  color: 'var(--ink-muted)',
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'var(--paper-deep)',
  border: '1px solid var(--paper-edge)', borderRadius: 6,
  padding: '6px 8px', fontSize: 13, color: 'var(--ink)',
  textAlign: 'center', outline: 'none',
}
