'use client'

import { useState } from 'react'

export default function MindMap() {
  const [copied, setCopied] = useState(false)

  const plainText = `WEEK 7 SCHEDULE · DELOAD

MONDAY — Session A · Full Body @60%
Back Squat · 3×8 @60% · 90s rest
Bench Press · 3×8 @60% · 90s rest
Barbell Row · 3×8 @60% · 90s rest
OHP · 3×10 @60% · 90s rest
Plank Hold · 3×45s · 60s rest

WEDNESDAY — Session B · Full Body @60%
Romanian Deadlift · 3×10 @60% · 90s rest
Incline DB Press · 3×10 @60% · 90s rest
Lat Pulldown · 3×12 @60% · 90s rest
Hip Thrust · 3×15 @60% · 60s rest
Face Pull · 3×20 · 60s rest

FRIDAY — Session C · Reflection @60%
Goblet Squat · 3×12 · 90s rest
Deadlift · 3×5 @60% · 2min rest
DB Bench Press · 3×12 @60% · 90s rest
Seated Row · 3×12 @60% · 90s rest
Easy Walk · 20min`

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
            Deload · Wk 07
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
              <filter id="r-mm-wk7">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="13" />
                <feDisplacementMap in="SourceGraphic" scale="2.5" />
              </filter>
            </defs>
            <g stroke="#1F1B16" strokeWidth="1.4" fill="none" strokeLinecap="round" filter="url(#r-mm-wk7)" opacity="0.55">
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
            Deload · 60%
          </div>

          <div style={{
            position: 'absolute', left: '8%', top: '22%',
            background: 'var(--accent)', color: 'var(--paper)',
            fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 500,
            padding: '7px 12px', borderRadius: 18,
            border: '1.5px solid var(--accent)',
            boxShadow: '1px 2px 0 var(--ink)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            Monday · Session A
          </div>

          <div style={{
            position: 'absolute', right: '8%', top: '18%',
            background: 'var(--accent)', color: 'var(--paper)',
            fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 500,
            padding: '7px 12px', borderRadius: 18,
            border: '1.5px solid var(--accent)',
            boxShadow: '1px 2px 0 var(--ink)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            Wednesday · Session B
          </div>

          <div style={{
            position: 'absolute', right: '8%', top: '72%',
            background: 'var(--accent)', color: 'var(--paper)',
            fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 500,
            padding: '7px 12px', borderRadius: 18,
            border: '1.5px solid var(--accent)',
            boxShadow: '1px 2px 0 var(--ink)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            Friday · Reflection
          </div>

          <div style={{
            position: 'absolute', left: '37%', top: '4%',
            background: '#DDE3D2', color: 'var(--ink)',
            fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
            padding: '5px 9px', borderRadius: 12,
            border: '1.5px solid var(--sage)',
            boxShadow: '1px 1px 0 var(--ink-muted)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            CNS recovery week
          </div>

          <div style={{
            position: 'absolute', left: '31%', top: '84%',
            background: 'var(--paper)', color: 'var(--ink)',
            fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
            padding: '5px 9px', borderRadius: 12,
            border: '1.5px solid var(--ink)',
            boxShadow: '1px 1px 0 var(--ink-muted)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            supercompensation incoming
          </div>

          <span style={{
            position: 'absolute', left: '6%', top: '57%',
            fontFamily: 'var(--hand)', color: 'var(--margin-red)',
            fontSize: 17, lineHeight: 1.1, zIndex: 3,
            transform: 'rotate(-2deg)',
          }}>
            not weakness ✱
          </span>
          <span style={{
            position: 'absolute', right: '9%', top: '44%',
            fontFamily: 'var(--hand)', color: '#3D5A80',
            fontSize: 16, lineHeight: 1.1, zIndex: 3,
            transform: 'rotate(2deg)',
          }}>
            you get fitter after
          </span>
          <span style={{
            position: 'absolute', left: '45%', top: '13%',
            fontFamily: 'var(--hand)', color: 'var(--margin-red)',
            fontSize: 15, lineHeight: 1.1, zIndex: 3,
            transform: 'rotate(-3deg)',
          }}>
            guilt is gym culture ↓
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }} className="flat-schedule-grid-w7">
          {[
            {
              day: 'MON', session: 'Session A · @60%',
              rows: [
                ['Back Squat', '3×8 @60%', '90s'],
                ['Bench Press', '3×8 @60%', '90s'],
                ['Barbell Row', '3×8 @60%', '90s'],
                ['OHP', '3×10 @60%', '90s'],
                ['Plank Hold', '3×45s', '60s'],
              ],
            },
            {
              day: 'WED', session: 'Session B · @60%',
              rows: [
                ['Romanian Deadlift', '3×10 @60%', '90s'],
                ['Incline DB Press', '3×10 @60%', '90s'],
                ['Lat Pulldown', '3×12 @60%', '90s'],
                ['Hip Thrust', '3×15 @60%', '60s'],
                ['Face Pull', '3×20', '60s'],
              ],
            },
            {
              day: 'FRI', session: 'Session C · Reflection @60%',
              rows: [
                ['Goblet Squat', '3×12', '90s'],
                ['Deadlift', '3×5 @60%', '2min'],
                ['DB Bench Press', '3×12 @60%', '90s'],
                ['Seated Row', '3×12 @60%', '90s'],
                ['Easy Walk', '20min', '—'],
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
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 8, padding: '10px 14px', borderBottom: i < rows.length - 1 ? '1px solid var(--paper-edge)' : 'none' }}>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{name}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>{sets}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)' }}>{rest}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .flat-schedule-grid-w7 { grid-template-columns: 1fr !important; }
          .mm-canvas { height: 380px !important; }
        }
      `}</style>
    </div>
  )
}
