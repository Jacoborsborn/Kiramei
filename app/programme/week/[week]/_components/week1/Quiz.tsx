'use client'

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

interface Question {
  id: number
  text: string
  options: { id: string; text: string }[]
  correct: string
  explanation: string
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What is gluteal amnesia?',
    options: [
      { id: 'A', text: 'A rare medical condition affecting athletes' },
      { id: 'B', text: 'When the brain de-prioritises glute activation due to inactivity' },
      { id: 'C', text: 'Muscle soreness in the glutes after training' },
      { id: 'D', text: 'A type of nerve damage' },
    ],
    correct: 'B',
    explanation: 'Gluteal amnesia is when the nervous system de-prioritises glute activation due to prolonged inactivity and sitting. It is common, reversible, and exactly what this programme addresses.',
  },
  {
    id: 2,
    text: 'Why do we use full body training in week 1 instead of a glute-specific split?',
    options: [
      { id: 'A', text: 'Because it is easier' },
      { id: 'B', text: 'Because full body burns more calories' },
      { id: 'C', text: 'Because training each muscle 3× per week accelerates nervous system adaptation faster' },
      { id: 'D', text: 'Because splits are too advanced for beginners' },
    ],
    correct: 'C',
    explanation: 'At beginner level, frequency is the primary driver of adaptation. Training a muscle 3× per week gives it 3× more practice learning the movement — that is why full body beats a split right now.',
  },
  {
    id: 3,
    text: 'Which muscle fibre type responds to resistance training and changes muscle shape?',
    options: [
      { id: 'A', text: 'Type 1 — slow twitch' },
      { id: 'B', text: 'Type 2 — fast twitch' },
      { id: 'C', text: 'Both equally' },
      { id: 'D', text: 'Neither — it is all diet' },
    ],
    correct: 'B',
    explanation: 'Type 2 fast twitch fibres are larger and respond to progressive overload. This is why resistance training changes muscle shape in a way that cardio alone cannot.',
  },
  {
    id: 4,
    text: 'True or false — adding extra cardio sessions this week will speed up your results.',
    options: [
      { id: 'A', text: 'True' },
      { id: 'B', text: 'False — recovery is where adaptation happens' },
    ],
    correct: 'B',
    explanation: 'Adaptation happens during recovery, not training. Adding extra cardio on top of three resistance sessions this week would impair recovery and slow the nervous system adaptations this programme is building.',
  },
  {
    id: 5,
    text: 'Which exercise this week most directly re-establishes the glute-brain connection?',
    options: [
      { id: 'A', text: 'Leg Press' },
      { id: 'B', text: 'Plank Hold' },
      { id: 'C', text: 'Hip Thrust' },
      { id: 'D', text: 'Seated Cable Row' },
    ],
    correct: 'C',
    explanation: 'The hip thrust is the most direct glute-loading exercise. The full hip extension range targets the glute maximally — no other exercise in this programme does that as directly.',
  },
]

interface Props {
  userId: string
  initialPassed: boolean
  onPass?: () => void
}

export default function Quiz({ userId, initialPassed, onPass }: Props) {
  const [selected, setSelected] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [passed, setPassed] = useState(initialPassed)
  const [saving, setSaving] = useState(false)

  const allAnswered = QUESTIONS.every(q => selected[q.id] !== undefined)

  const score = submitted
    ? QUESTIONS.filter(q => selected[q.id] === q.correct).length
    : 0

  const passThreshold = 3

  function handleSelect(qId: number, optId: string) {
    if (submitted) return
    setSelected(prev => ({ ...prev, [qId]: optId }))
  }

  async function handleSubmit() {
    if (!allAnswered || submitted) return
    setSubmitted(true)

    const correctCount = QUESTIONS.filter(q => selected[q.id] === q.correct).length
    if (correctCount >= passThreshold) {
      setSaving(true)
      const supabase = createSupabaseBrowserClient()
      await supabase.from('week_progress').upsert({
        user_id: userId,
        week_number: 1,
        quiz_passed: true,
      }, { onConflict: 'user_id,week_number' })
      setSaving(false)
      setPassed(true)
      window.dispatchEvent(new Event('week1:quiz-passed'))
      onPass?.()
    }
  }

  function handleReset() {
    setSelected({})
    setSubmitted(false)
  }

  if (passed && !submitted) {
    return (
      <div style={{
        background: 'rgba(184,84,58,0.06)', border: '1px solid rgba(184,84,58,0.15)',
        borderRadius: 12, padding: '28px 24px', display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <span style={{ fontSize: 24 }}>✓</span>
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--accent)' }}>Quiz complete</p>
          <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>You passed this one. Scroll down to complete the week.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 6 }}>
          5 questions · 3 to pass · Wrong answers shown with explanation
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {QUESTIONS.map((q, qi) => {
          const userAnswer = selected[q.id]
          const isCorrect = submitted && userAnswer === q.correct
          const isWrong = submitted && userAnswer !== q.correct

          return (
            <div key={q.id} style={{
              border: submitted
                ? isCorrect ? '1px solid rgba(184,84,58,0.18)' : isWrong ? '1px solid rgba(180,60,60,0.3)' : '1px solid var(--paper-edge)'
                : '1px solid var(--paper-edge)',
              borderRadius: 12, overflow: 'hidden',
              transition: 'border-color 0.3s',
            }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--paper-deep)' }}>
                <p style={{
                  fontSize: 9.5, fontWeight: 700, color: 'var(--ink-muted)',
                  letterSpacing: '0.1em', marginBottom: 8,
                }}>
                  Q{q.id}
                </p>
                <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.55, fontWeight: 500 }}>
                  {q.text}
                </p>
              </div>

              <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {q.options.map(opt => {
                  const isSelected = userAnswer === opt.id
                  const isCorrectOpt = opt.id === q.correct
                  const showCorrect = submitted && isCorrectOpt
                  const showWrong = submitted && isSelected && !isCorrectOpt

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      disabled={submitted}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 14px', borderRadius: 8, textAlign: 'left',
                        cursor: submitted ? 'default' : 'pointer',
                        border: '1px solid',
                        borderColor: showCorrect
                          ? 'rgba(184,84,58,0.35)'
                          : showWrong
                            ? 'rgba(180,60,60,0.4)'
                            : isSelected
                              ? 'rgba(184,84,58,0.25)'
                              : 'var(--paper-edge)',
                        background: showCorrect
                          ? 'rgba(184,84,58,0.08)'
                          : showWrong
                            ? 'rgba(180,60,60,0.08)'
                            : isSelected
                              ? 'rgba(184,84,58,0.07)'
                              : 'var(--paper-deep)',
                        transition: 'all 0.2s',
                      }}
                    >
                      <span style={{
                        width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 700,
                        border: '1px solid',
                        borderColor: showCorrect ? 'var(--accent)' : showWrong ? 'rgba(180,60,60,0.6)' : isSelected ? 'var(--accent)' : 'var(--paper-edge)',
                        background: showCorrect ? 'rgba(184,84,58,0.12)' : showWrong ? 'rgba(180,60,60,0.12)' : isSelected ? 'rgba(184,84,58,0.10)' : 'transparent',
                        color: showCorrect ? 'var(--accent)' : showWrong ? 'rgba(220,80,80,0.9)' : isSelected ? 'var(--accent)' : 'var(--ink-muted)',
                      }}>
                        {showCorrect ? '✓' : showWrong ? '✗' : opt.id}
                      </span>
                      <span style={{
                        fontSize: 13, lineHeight: 1.5,
                        color: showCorrect ? 'var(--accent)' : showWrong ? 'rgba(220,80,80,0.85)' : 'var(--ink)',
                      }}>
                        {opt.text}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Wrong answer explanation */}
              {submitted && isWrong && (
                <div style={{
                  padding: '12px 20px 16px',
                  borderTop: '1px solid var(--paper-deep)',
                  background: 'rgba(31,27,22,0.04)',
                }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: 6 }}>
                    WHY
                  </p>
                  <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.65 }}>
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Submit / result */}
      <div style={{ marginTop: 28 }}>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            style={{
              width: '100%', padding: '14px', borderRadius: 10,
              fontSize: 14, fontWeight: 700, letterSpacing: '0.04em',
              cursor: allAnswered ? 'pointer' : 'not-allowed',
              border: 'none',
              background: allAnswered ? 'var(--accent)' : 'var(--paper-edge)',
              color: allAnswered ? '#fff' : 'var(--ink-muted)',
              transition: 'all 0.2s',
            }}
          >
            {allAnswered ? 'Submit answers' : `Answer all ${QUESTIONS.length} questions to submit`}
          </button>
        ) : (
          <div style={{
            padding: '20px 24px', borderRadius: 10,
            background: score >= passThreshold
              ? 'rgba(184,84,58,0.08)' : 'var(--paper-edge)',
            border: `1px solid ${score >= passThreshold ? 'rgba(184,84,58,0.18)' : 'var(--paper-edge)'}`,
          }}>
            <p style={{
              fontSize: 22, fontWeight: 700,
              color: score >= passThreshold ? 'var(--accent)' : 'var(--ink)',
              marginBottom: 6,
            }}>
              {score}/{QUESTIONS.length}
            </p>
            {score >= passThreshold ? (
              <p style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                Passed. Scroll down to complete the week.
              </p>
            ) : (
              <>
                <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 16 }}>
                  {passThreshold - score} more correct to pass. Review the answers above and try again.
                </p>
                <button
                  onClick={handleReset}
                  style={{
                    padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                    background: 'transparent', border: '1px solid var(--paper-edge)',
                    color: 'var(--ink)', cursor: 'pointer',
                  }}
                >
                  Try again
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
