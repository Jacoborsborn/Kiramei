'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

const ACCENT = 'var(--accent)'
const TEXT_MAIN = 'var(--ink)'

export interface ExerciseRow {
  name: string
  sets: string
  rest: string
}

export interface SessionData {
  label: string
  day: string
  title: string
  exercises: ExerciseRow[]
}

type LogKey = string
type LogField = 'weight' | 'reps'
type LogState = Record<LogKey, { weight: string; reps: string }>

function makeKey(session: string, exercise: string) {
  return `${session}__${exercise}`
}

interface Props {
  userId: string
  weekNum: number
  sessions: SessionData[]
  plainText: string
  initialLogs: Array<{
    session_label: string
    exercise_name: string
    weight_kg: number | null
    reps: number | null
  }>
}

export default function ScheduleBase({ userId, weekNum, sessions, plainText, initialLogs }: Props) {
  const [copied, setCopied] = useState(false)
  const [saveStates, setSaveStates] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>(() =>
    Object.fromEntries(sessions.map(s => [s.label, 'idle' as const]))
  )

  const [logs, setLogs] = useState<LogState>(() => {
    const state: LogState = {}
    for (const s of sessions) {
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
        if (!entry.weight && !entry.reps) return null
        const weight = parseFloat(entry.weight)
        const reps = parseInt(entry.reps, 10)
        return {
          user_id: userId,
          week_number: weekNum,
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
      await supabase.from('exercise_logs').insert(rows as object[])
    }

    setSaveStates(prev => ({ ...prev, [session.label]: 'saved' }))
    setTimeout(() => setSaveStates(prev => ({ ...prev, [session.label]: 'idle' })), 2500)
  }

  function handleCopyNotes() {
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 36 }}>
        {sessions.map(session => {
          const saveState = saveStates[session.label]
          return (
            <div key={session.label} style={{
              border: '1px solid var(--paper-edge)',
              borderRadius: 12, overflow: 'hidden',
            }}>
              <div style={{
                background: 'rgba(184,84,58,0.07)',
                borderBottom: '1px solid rgba(184,84,58,0.10)',
                padding: '14px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: '0.1em' }}>
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
                    borderColor: saveState === 'saved' ? 'rgba(184,84,58,0.25)' : 'var(--paper-edge)',
                    background: 'transparent',
                    color: saveState === 'saved' ? ACCENT : 'var(--ink-muted)',
                    cursor: saveState === 'saving' ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved ✓' : 'Save session'}
                </button>
              </div>

              <div style={{ padding: '4px 0' }}>
                {/* Column headers */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 80px 60px 80px 80px',
                  gap: 8, padding: '6px 20px',
                  borderBottom: '1px solid var(--paper-edge)',
                }}>
                  <span style={{ fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>EXERCISE</span>
                  <span style={{ fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>SETS</span>
                  <span style={{ fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>REST</span>
                  <span style={{ fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>WEIGHT</span>
                  <span style={{ fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>REPS DONE</span>
                </div>

                {session.exercises.map((ex, i) => {
                  const key = makeKey(session.label, ex.name)
                  const entry = logs[key] ?? { weight: '', reps: '' }
                  return (
                    <div key={i} style={{
                      display: 'grid', gridTemplateColumns: '1fr 80px 60px 80px 80px',
                      gap: 8, padding: '10px 20px', alignItems: 'center',
                      borderBottom: i < session.exercises.length - 1 ? '1px solid var(--paper-edge)' : 'none',
                    }}>
                      <span style={{ fontSize: 13, color: TEXT_MAIN }}>{ex.name}</span>
                      <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600 }}>{ex.sets}</span>
                      <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{ex.rest}</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="kg"
                        value={entry.weight}
                        onChange={e => handleChange(session.label, ex.name, 'weight', e.target.value)}
                        style={{
                          width: '100%', padding: '5px 8px', borderRadius: 6, fontSize: 12,
                          background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)',
                          color: TEXT_MAIN, outline: 'none',
                        }}
                      />
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="reps"
                        value={entry.reps}
                        onChange={e => handleChange(session.label, ex.name, 'reps', e.target.value)}
                        style={{
                          width: '100%', padding: '5px 8px', borderRadius: 6, fontSize: 12,
                          background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)',
                          color: TEXT_MAIN, outline: 'none',
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Copy to Notes */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleCopyNotes}
          style={{
            fontSize: 12, fontWeight: 600, padding: '8px 18px', borderRadius: 8,
            border: '1px solid',
            borderColor: copied ? 'rgba(184,84,58,0.25)' : 'var(--paper-edge)',
            background: 'transparent',
            color: copied ? ACCENT : 'var(--ink-muted)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          {copied ? 'Copied to Notes ✓' : 'Copy to Notes'}
        </button>
      </div>

      <style>{`
        input::placeholder { color: var(--ink-muted); }
        @media (max-width: 600px) {
          .schedule-grid { grid-template-columns: 1fr 70px 50px 70px 70px !important; gap: 4px !important; }
        }
      `}</style>
    </div>
  )
}
