'use client'

import { useState } from 'react'
import { ExerciseFigure } from './ExerciseFigures'

export interface ExerciseItem {
  name: string
  plain: string
  primary: string
  secondary: string
  anatomySub: string
  pattern: string
  equipment: string
  prescription: string
  prescriptionNote?: string
  muscles: { name: string; pct: number }[]
  steps: string[]
  cue: string
  mistake: string
  why: string
  stripeColor: string
}

function PatternIcon({ pattern }: { pattern: string }) {
  const p = pattern.toLowerCase()
  if (p.includes('squat') || p.includes('unilateral')) return (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="7" r="3"/>
      <line x1="24" y1="10" x2="24" y2="22"/>
      <path d="M24 22 L15 36"/>
      <path d="M24 22 L33 36"/>
      <line x1="12" y1="44" x2="15" y2="36"/>
      <line x1="36" y1="44" x2="33" y2="36"/>
    </svg>
  )
  if (p.includes('hinge')) return (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3.5"/>
      <path d="M12 15.5 L12 26 L38 34"/>
      <line x1="8" y1="38" x2="12" y2="26"/>
      <line x1="16" y1="38" x2="12" y2="26"/>
    </svg>
  )
  if (p.includes('push')) return (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="24" x2="34" y2="24"/>
      <path d="M26 16 L38 24 L26 32"/>
    </svg>
  )
  if (p.includes('pull')) return (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="14" y1="24" x2="42" y2="24"/>
      <path d="M22 16 L10 24 L22 32"/>
    </svg>
  )
  if (p.includes('hip extension')) return (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 38 L24 22 L42 38"/>
      <circle cx="24" cy="16" r="4"/>
    </svg>
  )
  if (p.includes('core')) return (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="12"/>
      <line x1="24" y1="12" x2="24" y2="8"/>
      <line x1="24" y1="36" x2="24" y2="40"/>
      <line x1="12" y1="24" x2="8" y2="24"/>
      <line x1="36" y1="24" x2="40" y2="24"/>
    </svg>
  )
  return (
    <svg viewBox="0 0 48 48" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="24" cy="14" r="5"/>
      <path d="M18 26 Q18 20 24 20 Q30 20 30 26"/>
      <path d="M16 40 L18 26 L24 30 L30 26 L32 40"/>
    </svg>
  )
}

export function ExerciseCardNew({ ex, index }: { ex: ExerciseItem; index: number }) {
  const [stamped, setStamped] = useState(false)
  const primaryMuscles = ex.primary.split(',').map(m => m.trim())
  const secondaryMuscles = ex.secondary.split(',').map(m => m.trim())

  return (
    <div style={{
      background: 'var(--paper)',
      border: '1px solid var(--paper-edge)',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 1px 0 rgba(31,27,22,0.04), 0 8px 20px -12px rgba(31,27,22,0.18)',
      marginBottom: 28,
    }}>
      {/* Color stripe */}
      <div style={{ height: 5, width: '100%', background: ex.stripeColor }} />

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 24, padding: '22px 26px 18px', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 22, fontWeight: 700,
            letterSpacing: '-0.02em', lineHeight: 1, paddingTop: 5,
            flexShrink: 0, color: 'var(--ink-muted)',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div style={{ minWidth: 0 }}>
            <p style={{
              fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500,
              letterSpacing: '-0.015em', lineHeight: 1.1, margin: '0 0 6px',
              color: 'var(--ink)',
            }}>
              {ex.name}
            </p>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.5, margin: 0 }}>
              {ex.plain}
            </p>
          </div>
        </div>
        <button
          onClick={() => setStamped(s => !s)}
          style={{
            fontFamily: 'var(--mono)', fontSize: 9.5, fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            padding: '8px 12px', borderRadius: 4,
            border: stamped ? '1.5px solid var(--sage)' : '1.5px dashed var(--paper-edge)',
            background: stamped ? 'rgba(122,139,110,0.15)' : 'transparent',
            color: stamped ? 'var(--sage)' : 'var(--ink-muted)',
            cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap',
            transform: stamped ? 'rotate(-1.5deg)' : 'none',
            transition: 'all .15s ease',
          }}
        >
          {stamped ? '✓ NOTED' : 'MARK DONE'}
        </button>
      </div>

      {/* Two-column grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'minmax(260px, 340px) 1fr',
        gap: 28, padding: '4px 26px 26px',
      }} className="ec-main-grid">

        {/* LEFT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Anatomy box */}
          <div style={{
            background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)',
            borderRadius: 10, padding: 14,
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
              <p style={{
                fontFamily: 'var(--mono)', fontSize: 9.5, fontWeight: 700,
                letterSpacing: '0.22em', color: 'var(--ink-muted)', margin: 0,
              }}>MUSCLES</p>
              <p style={{ fontFamily: 'var(--hand)', fontSize: 16, margin: 0, lineHeight: 1, color: 'var(--ink-soft)' }}>
                {ex.anatomySub}
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {primaryMuscles.map(m => (
                <span key={m} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600,
                  padding: '3px 8px', borderRadius: 3,
                  background: `color-mix(in srgb, ${ex.stripeColor} 12%, transparent)`,
                  color: ex.stripeColor,
                  border: `1px solid color-mix(in srgb, ${ex.stripeColor} 35%, transparent)`,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', display: 'inline-block', background: ex.stripeColor, flexShrink: 0 }} />
                  {m}
                </span>
              ))}
              {secondaryMuscles.map(m => (
                <span key={m} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 600,
                  padding: '3px 8px', borderRadius: 3,
                  background: 'rgba(31,27,22,0.04)',
                  color: 'var(--ink-soft)',
                  border: '1px solid var(--paper-edge)',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', display: 'inline-block', background: 'var(--ink-muted)', flexShrink: 0 }} />
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Figure + Pattern */}
          <div style={{
            border: '1px solid var(--paper-edge)', borderRadius: 10, overflow: 'hidden',
          }}>
            <div style={{
              background: 'var(--paper-deep)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              padding: '12px 20px 8px',
            }}>
              <ExerciseFigure name={ex.name} />
            </div>
            <div style={{
              display: 'flex', gap: 12, alignItems: 'center',
              padding: '10px 12px',
              background: 'var(--paper)',
              borderTop: '1px solid var(--paper-edge)',
            }}>
              <div style={{
                width: 44, height: 44, flexShrink: 0,
                border: '1px solid var(--paper-edge)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: ex.stripeColor,
              }}>
                <PatternIcon pattern={ex.pattern} />
              </div>
              <div>
                <p style={{
                  fontFamily: 'var(--mono)', fontSize: 9.5, fontWeight: 700,
                  letterSpacing: '0.22em', color: 'var(--ink-muted)', margin: '0 0 2px',
                }}>PATTERN</p>
                <p style={{
                  fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 600,
                  letterSpacing: '-0.01em', lineHeight: 1.1, margin: '0 0 3px',
                  color: 'var(--ink)',
                }}>{ex.pattern}</p>
                <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: 0 }}>
                  {ex.equipment}
                </p>
              </div>
            </div>
          </div>

          {/* Prescription */}
          <div style={{
            border: '1px solid var(--paper-edge)', borderRadius: 8,
            padding: '12px 14px 14px',
          }}>
            <p style={{
              fontFamily: 'var(--mono)', fontSize: 9.5, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px',
              color: 'var(--ink-muted)',
            }}>THIS WEEK</p>
            <p style={{
              fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500,
              lineHeight: 1.25, margin: '0 0 6px', color: 'var(--ink)', letterSpacing: '-0.005em',
            }}>{ex.prescription}</p>
            {ex.prescriptionNote && (
              <p style={{
                fontFamily: 'var(--hand)', fontSize: 16,
                color: 'var(--ink-soft)', margin: 0, lineHeight: 1.3,
              }}>{ex.prescriptionNote}</p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>

          {/* Muscle bars */}
          <div>
            <p style={{
              fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '0 0 8px',
            }}>MUSCLE ACTIVATION</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {ex.muscles.map((m, i) => (
                <div key={m.name} style={{
                  display: 'grid', gridTemplateColumns: '120px 1fr 26px',
                  gap: 10, alignItems: 'center',
                }}>
                  <span style={{ fontSize: 13, color: 'var(--ink)' }}>{m.name}</span>
                  <div style={{
                    height: 8, background: 'var(--paper-deep)',
                    borderRadius: 2, overflow: 'hidden',
                    border: '1px solid var(--paper-edge)',
                  }}>
                    <span style={{
                      display: 'block', height: '100%', borderRadius: 1,
                      width: `${m.pct}%`,
                      background: i === 0 ? ex.stripeColor : 'var(--ink-muted)',
                      opacity: i === 0 ? 1 : 0.45,
                    }} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)', textAlign: 'right',
                  }}>{m.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div>
            <p style={{
              fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '0 0 8px',
            }}>HOW TO DO IT</p>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {ex.steps.map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{
                    flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
                    background: ex.stripeColor, color: '#fff',
                    fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: 1,
                  }}>{i + 1}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink)' }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Callouts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="ec-callouts-grid">
            <div style={{
              padding: '12px 14px', borderRadius: 8,
              border: '1px solid rgba(122,139,110,0.35)',
              background: 'rgba(122,139,110,0.06)',
            }}>
              <p style={{
                fontFamily: 'var(--mono)', fontSize: 9.5, fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                margin: '0 0 6px', color: 'var(--sage)',
              }}>DO THIS</p>
              <p style={{ fontSize: 13, lineHeight: 1.5, margin: 0, color: 'var(--ink)' }}>{ex.cue}</p>
            </div>
            <div style={{
              padding: '12px 14px', borderRadius: 8,
              background: 'rgba(31,27,22,0.04)', border: '1px solid rgba(31,27,22,0.10)',
            }}>
              <p style={{
                fontFamily: 'var(--mono)', fontSize: 9.5, fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                margin: '0 0 6px', color: '#8a3a2a',
              }}>AVOID</p>
              <p style={{ fontSize: 13, lineHeight: 1.5, margin: 0, color: 'var(--ink-soft)' }}>{ex.mistake}</p>
            </div>
          </div>

          {/* Why */}
          <div style={{ borderTop: '1px dashed var(--paper-edge)', paddingTop: 16 }}>
            <p style={{
              fontFamily: 'var(--mono)', fontSize: 9.5, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '0 0 4px',
            }}>WHY THIS WEEK</p>
            <p style={{
              fontFamily: 'var(--serif)', fontSize: 15.5, lineHeight: 1.5,
              color: 'var(--ink)', margin: 0, letterSpacing: '-0.005em',
            }}>{ex.why}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .ec-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 500px) {
          .ec-callouts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
