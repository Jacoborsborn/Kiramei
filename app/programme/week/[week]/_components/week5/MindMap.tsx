'use client'

import { useState } from 'react'

export default function MindMap() {
  const [copied, setCopied] = useState(false)

  const plainText = `WEEK 5 SCHEDULE — PUSH / PULL / LEGS

MONDAY & FRIDAY — Push Day
Bench Press · 4×6 @RPE8 · 2min rest
Incline DB Press · 3×10 @RPE7 · 90s rest
OHP · 3×10 @RPE7 · 90s rest
Cable Fly · 3×15 @RPE7 · 60s rest
Lateral Raise · 4×15 @RPE7 · 60s rest
Tricep Pushdown · 3×15 @RPE7 · 60s rest
Overhead Tricep Extension · 3×12 @RPE7 · 60s rest

TUESDAY & SATURDAY — Pull Day
Deadlift · 4×5 @RPE8 · 2min rest
Weighted Pull-Up/Pulldown · 4×8 @RPE8 · 90s rest
Cable Row · 4×10 @RPE7 · 90s rest
Face Pull · 3×15 · 60s rest
Rear Delt Fly · 3×15 @RPE7 · 60s rest
EZ Bar Curl · 3×12 @RPE7 · 60s rest
Hammer Curl · 3×12 @RPE7 · 60s rest

WEDNESDAY — Legs Day
Back Squat · 4×6 @RPE8 · 2min rest
Romanian Deadlift · 4×10 @RPE7 · 90s rest
Leg Press · 3×15 @RPE7 · 90s rest
Hip Thrust · 4×10 @RPE8 · 90s rest
Leg Curl · 3×15 @RPE7 · 60s rest
Calf Raise · 4×20 · 45s rest

REST: Thursday`

  function handleCopy() {
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div>
      <div style={{
        background: 'var(--paper)',
        border: '1px solid var(--paper-edge)',
        borderRadius: 3,
        padding: 22,
        marginBottom: 32,
        boxShadow: '0 1px 0 rgba(31,27,22,0.04), 0 14px 28px -18px rgba(31,27,22,0.18)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
            The week, on one page
          </span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
            Push Pull Legs · Wk 05
          </span>
        </div>

        <div style={{
          width: '100%', height: 460,
          background: 'var(--paper)',
          backgroundImage: 'linear-gradient(to right, rgba(201,214,226,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,214,226,0.45) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          border: '1px solid var(--paper-edge)',
          position: 'relative',
          overflow: 'hidden',
        }} className="mm-canvas">
          <svg viewBox="0 0 1000 460" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <filter id="r-mm-wk5">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="9" />
                <feDisplacementMap in="SourceGraphic" scale="2.5" />
              </filter>
            </defs>
            <g stroke="#1F1B16" strokeWidth="1.4" fill="none" strokeLinecap="round" filter="url(#r-mm-wk5)" opacity="0.55">
              <path d="M 500 230 Q 320 160, 170 130" />
              <path d="M 500 230 Q 700 145, 830 110" />
              <path d="M 500 230 Q 700 340, 830 370" />
              <path d="M 500 230 Q 500 120, 500 60" />
              <path d="M 500 230 Q 500 340, 500 400" />
            </g>
          </svg>

          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'var(--ink)', color: 'var(--paper)',
            fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 500,
            padding: '12px 20px', borderRadius: 24,
            boxShadow: '2px 3px 0 var(--accent)',
            whiteSpace: 'nowrap', zIndex: 2,
          }}>
            Push / Pull / Legs
          </div>

          <div style={{
            position: 'absolute', left: '8%', top: '22%',
            background: 'var(--accent)', color: 'var(--paper)',
            fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 500,
            padding: '7px 12px', borderRadius: 18,
            border: '1.5px solid var(--accent)',
            boxShadow: '1px 2px 0 var(--ink)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            Push · Mon &amp; Fri
          </div>

          <div style={{
            position: 'absolute', right: '8%', top: '18%',
            background: 'var(--accent)', color: 'var(--paper)',
            fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 500,
            padding: '7px 12px', borderRadius: 18,
            border: '1.5px solid var(--accent)',
            boxShadow: '1px 2px 0 var(--ink)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            Pull · Tue &amp; Sat
          </div>

          <div style={{
            position: 'absolute', right: '8%', top: '72%',
            background: 'var(--accent)', color: 'var(--paper)',
            fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 500,
            padding: '7px 12px', borderRadius: 18,
            border: '1.5px solid var(--accent)',
            boxShadow: '1px 2px 0 var(--ink)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            Legs · Wednesday
          </div>

          <div style={{
            position: 'absolute', left: '37%', top: '4%',
            background: '#DDE3D2', color: 'var(--ink)',
            fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
            padding: '5px 9px', borderRadius: 12,
            border: '1.5px solid var(--sage)',
            boxShadow: '1px 1px 0 var(--ink-muted)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            5 sessions/week
          </div>

          <div style={{
            position: 'absolute', left: '32%', top: '84%',
            background: 'var(--paper)', color: 'var(--ink)',
            fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
            padding: '5px 9px', borderRadius: 12,
            border: '1.5px solid var(--ink)',
            boxShadow: '1px 1px 0 var(--ink-muted)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            Thursday · Rest Day
          </div>

          <span style={{
            position: 'absolute', left: '6%', top: '57%',
            fontFamily: 'var(--hand)', color: 'var(--margin-red)',
            fontSize: 17, lineHeight: 1.1, zIndex: 3,
            transform: 'rotate(-2deg)',
          }}>
            earned this split ✱
          </span>
          <span style={{
            position: 'absolute', right: '9%', top: '44%',
            fontFamily: 'var(--hand)', color: '#3D5A80',
            fontSize: 16, lineHeight: 1.1, zIndex: 3,
            transform: 'rotate(2deg)',
          }}>
            squeeze, don't swing
          </span>
          <span style={{
            position: 'absolute', left: '46%', top: '13%',
            fontFamily: 'var(--hand)', color: 'var(--margin-red)',
            fontSize: 15, lineHeight: 1.1, zIndex: 3,
            transform: 'rotate(-3deg)',
          }}>
            mind-muscle first ↓
          </span>
        </div>
      </div>

      {/* Flat table */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
            Flat view · Gym use
          </p>
          <button
            onClick={handleCopy}
            style={{
              fontSize: 11, fontWeight: 500, color: copied ? 'var(--accent)' : 'var(--ink-muted)',
              background: 'transparent',
              border: `1px solid ${copied ? 'rgba(184,84,58,0.25)' : 'var(--paper-edge)'}`,
              borderRadius: 3, padding: '6px 14px', cursor: 'pointer',
              fontFamily: 'var(--mono)', letterSpacing: '0.08em',
              transition: 'all 0.2s',
            }}
          >
            {copied ? 'Copied ✓' : 'Copy schedule'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }} className="flat-schedule-grid-w5">
          {[
            {
              day: 'MON & FRI', session: 'Push Day',
              rows: [
                ['Bench Press', '4×6 @RPE8', '2min'],
                ['Incline DB Press', '3×10 @RPE7', '90s'],
                ['OHP', '3×10 @RPE7', '90s'],
                ['Cable Fly', '3×15 @RPE7', '60s'],
                ['Lateral Raise', '4×15 @RPE7', '60s'],
                ['Tricep Pushdown', '3×15 @RPE7', '60s'],
                ['OH Tricep Ext', '3×12 @RPE7', '60s'],
              ],
            },
            {
              day: 'TUE & SAT', session: 'Pull Day',
              rows: [
                ['Deadlift', '4×5 @RPE8', '2min'],
                ['Pull-Up/Pulldown', '4×8 @RPE8', '90s'],
                ['Cable Row', '4×10 @RPE7', '90s'],
                ['Face Pull', '3×15', '60s'],
                ['Rear Delt Fly', '3×15 @RPE7', '60s'],
                ['EZ Bar Curl', '3×12 @RPE7', '60s'],
                ['Hammer Curl', '3×12 @RPE7', '60s'],
              ],
            },
            {
              day: 'WED', session: 'Legs Day',
              rows: [
                ['Back Squat', '4×6 @RPE8', '2min'],
                ['Romanian Deadlift', '4×10 @RPE7', '90s'],
                ['Leg Press', '3×15 @RPE7', '90s'],
                ['Hip Thrust', '4×10 @RPE8', '90s'],
                ['Leg Curl', '3×15 @RPE7', '60s'],
                ['Calf Raise', '4×20', '45s'],
              ],
            },
          ].map(({ day, session, rows }) => (
            <div key={day} style={{ background: 'var(--paper)', border: '1px solid var(--paper-edge)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ borderBottom: '1px solid var(--paper-edge)', padding: '10px 14px' }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{day}</p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 14, color: 'var(--ink-soft)', marginTop: 2 }}>{session}</p>
              </div>
              <div>
                {rows.map(([name, sets, rest], i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 6, padding: '6px 14px', borderBottom: i < rows.length - 1 ? '1px solid var(--paper-edge)' : 'none' }}>
                    <span style={{ fontSize: 11.5, color: 'var(--ink)' }}>{name}</span>
                    <span style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 600, textAlign: 'right' }}>{sets}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(184,84,58,0.05)', border: '1px solid rgba(184,84,58,0.10)', borderRadius: 8 }}>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>THURSDAY</span> — Rest Day (non-negotiable) ·{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>FRIDAY</span> — Push Day (same as Monday) ·{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>SATURDAY</span> — Pull Day (same as Tuesday)
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .flat-schedule-grid-w5 { grid-template-columns: 1fr !important; }
          .mm-canvas { height: 380px !important; }
        }
      `}</style>
    </div>
  )
}
