'use client'

import { useState } from 'react'

export default function MindMap() {
  const [copied, setCopied] = useState(false)

  const plainText = `WEEK 4 SCHEDULE

MONDAY — Upper A · RPE 7-8
Bench Press · 4×6 @RPE8 · 2min rest
Barbell Row · 4×6 @RPE8 · 2min rest
DB OHP · 3×10 @RPE7 · 90s rest
Weighted Pulldown · 3×8 @RPE8 · 90s rest
Close Grip Bench · 3×10 @RPE7 · 60s rest
EZ Bar Curl · 3×12 @RPE7 · 60s rest

TUESDAY — Lower A · RPE 7-8
Back Squat · 4×6 @RPE8 · 2min rest
Conventional Deadlift · 4×5 @RPE8 · 2min rest
Leg Press · 3×12 @RPE7 · 90s rest
Leg Curl · 3×12 @RPE7 · 90s rest
Hip Thrust (heavy) · 4×8 @RPE8 · 90s rest
Calf Raise · 4×15 · 60s rest

THURSDAY — Upper B · Hypertrophy
Incline DB Press · 4×12 @RPE7 · 90s rest
Cable Row (wide) · 4×12 @RPE7 · 90s rest
Lateral Raise · 4×15 @RPE7 · 60s rest
Rear Delt Fly · 3×15 @RPE7 · 60s rest
Tricep Overhead Extension · 3×12 @RPE7 · 60s rest
Cable Curl · 3×15 @RPE7 · 60s rest

FRIDAY — Lower B · Hypertrophy
Bulgarian Split Squat · 4×10/side @RPE7 · 90s rest
Leg Extension · 4×15 @RPE7 · 60s rest
Lying Leg Curl · 4×12 @RPE7 · 60s rest
Hip Thrust · 4×12 @RPE7 · 90s rest
Cable Pull-Through · 3×15 · 60s rest
Ab Wheel Rollout · 3×8 · 60s rest`

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
            Upper / Lower · Wk 04
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
              <filter id="r-mm-wk4">
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" />
                <feDisplacementMap in="SourceGraphic" scale="2.5" />
              </filter>
            </defs>
            <g stroke="#1F1B16" strokeWidth="1.4" fill="none" strokeLinecap="round" filter="url(#r-mm-wk4)" opacity="0.55">
              <path d="M 500 230 Q 290 130, 100 75" />
              <path d="M 500 230 Q 290 330, 100 385" />
              <path d="M 500 230 Q 710 130, 900 75" />
              <path d="M 500 230 Q 710 330, 900 385" />
              <path d="M 500 230 Q 500 130, 500 65" />
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
            RPE-Based Training
          </div>

          <div style={{
            position: 'absolute', left: '5%', top: '10%',
            background: 'var(--accent)', color: 'var(--paper)',
            fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 500,
            padding: '7px 12px', borderRadius: 18,
            border: '1.5px solid var(--accent)',
            boxShadow: '1px 2px 0 var(--ink)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            Monday · Upper A
          </div>

          <div style={{
            position: 'absolute', left: '5%', top: '74%',
            background: 'var(--accent)', color: 'var(--paper)',
            fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 500,
            padding: '7px 12px', borderRadius: 18,
            border: '1.5px solid var(--accent)',
            boxShadow: '1px 2px 0 var(--ink)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            Tuesday · Lower A
          </div>

          <div style={{
            position: 'absolute', right: '5%', top: '10%',
            background: 'var(--accent)', color: 'var(--paper)',
            fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 500,
            padding: '7px 12px', borderRadius: 18,
            border: '1.5px solid var(--accent)',
            boxShadow: '1px 2px 0 var(--ink)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            Thursday · Upper B
          </div>

          <div style={{
            position: 'absolute', right: '5%', top: '74%',
            background: 'var(--accent)', color: 'var(--paper)',
            fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 500,
            padding: '7px 12px', borderRadius: 18,
            border: '1.5px solid var(--accent)',
            boxShadow: '1px 2px 0 var(--ink)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            Friday · Lower B
          </div>

          <div style={{
            position: 'absolute', left: '37%', top: '4%',
            background: '#DDE3D2', color: 'var(--ink)',
            fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
            padding: '5px 9px', borderRadius: 12,
            border: '1.5px solid var(--sage)',
            boxShadow: '1px 1px 0 var(--ink-muted)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            RPE 8 = 2 reps in reserve
          </div>

          <div style={{
            position: 'absolute', left: '5%', top: '46%',
            background: 'var(--paper)', color: 'var(--ink)',
            fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500,
            padding: '5px 9px', borderRadius: 12,
            border: '1.5px solid var(--ink)',
            boxShadow: '1px 1px 0 var(--ink-muted)', zIndex: 2, whiteSpace: 'nowrap',
          }}>
            Conv. DL debuts
          </div>

          <span style={{
            position: 'absolute', left: '44%', top: '13%',
            fontFamily: 'var(--hand)', color: 'var(--margin-red)',
            fontSize: 16, lineHeight: 1.1, zIndex: 3,
            transform: 'rotate(-3deg)',
          }}>
            decide before the set →
          </span>
          <span style={{
            position: 'absolute', right: '7%', top: '44%',
            fontFamily: 'var(--hand)', color: '#3D5A80',
            fontSize: 15, lineHeight: 1.1, zIndex: 3,
            transform: 'rotate(2deg)',
          }}>
            honest effort only
          </span>
          <span style={{
            position: 'absolute', left: '38%', top: '84%',
            fontFamily: 'var(--hand)', color: 'var(--margin-red)',
            fontSize: 15, lineHeight: 1.1, zIndex: 3,
            transform: 'rotate(-1deg)',
          }}>
            bar drags up the shins ↑
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }} className="flat-schedule-grid-w4">
          {[
            {
              day: 'MON', session: 'Upper A · RPE 7-8',
              rows: [
                ['Bench Press', '4×6 @RPE8', '2min'],
                ['Barbell Row', '4×6 @RPE8', '2min'],
                ['DB OHP', '3×10 @RPE7', '90s'],
                ['Weighted Pulldown', '3×8 @RPE8', '90s'],
                ['Close Grip Bench', '3×10 @RPE7', '60s'],
                ['EZ Bar Curl', '3×12 @RPE7', '60s'],
              ],
            },
            {
              day: 'TUE', session: 'Lower A · RPE 7-8',
              rows: [
                ['Back Squat', '4×6 @RPE8', '2min'],
                ['Conv. Deadlift', '4×5 @RPE8', '2min'],
                ['Leg Press', '3×12 @RPE7', '90s'],
                ['Leg Curl', '3×12 @RPE7', '90s'],
                ['Hip Thrust (heavy)', '4×8 @RPE8', '90s'],
                ['Calf Raise', '4×15', '60s'],
              ],
            },
            {
              day: 'THU', session: 'Upper B · Hypertrophy',
              rows: [
                ['Incline DB Press', '4×12 @RPE7', '90s'],
                ['Cable Row (wide)', '4×12 @RPE7', '90s'],
                ['Lateral Raise', '4×15 @RPE7', '60s'],
                ['Rear Delt Fly', '3×15 @RPE7', '60s'],
                ['Tricep OH Ext', '3×12 @RPE7', '60s'],
                ['Cable Curl', '3×15 @RPE7', '60s'],
              ],
            },
            {
              day: 'FRI', session: 'Lower B · Hypertrophy',
              rows: [
                ['Bulgarian Split Sq', '4×10/side @RPE7', '90s'],
                ['Leg Extension', '4×15 @RPE7', '60s'],
                ['Lying Leg Curl', '4×12 @RPE7', '60s'],
                ['Hip Thrust', '4×12 @RPE7', '90s'],
                ['Cable Pull-Through', '3×15', '60s'],
                ['Ab Wheel Rollout', '3×8', '60s'],
              ],
            },
          ].map(({ day, session, rows }) => (
            <div key={day} style={{ background: 'var(--paper)', border: '1px solid var(--paper-edge)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ borderBottom: '1px solid var(--paper-edge)', padding: '10px 14px' }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{day}</p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 13, color: 'var(--ink-soft)', marginTop: 2 }}>{session}</p>
              </div>
              <div>
                {rows.map(([name, sets, rest], i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 6, padding: '6px 14px', borderBottom: i < rows.length - 1 ? '1px solid var(--paper-edge)' : 'none' }}>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: 12, color: 'var(--ink)', fontWeight: 500 }}>{name}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', fontWeight: 600, textAlign: 'right' }}>{sets}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .flat-schedule-grid-w4 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 440px) {
          .flat-schedule-grid-w4 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .mm-canvas { height: 380px !important; }
        }
      `}</style>
    </div>
  )
}
