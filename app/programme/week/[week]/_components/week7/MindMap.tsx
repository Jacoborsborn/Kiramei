'use client'

import { useState } from 'react'

const ACCENT = 'var(--accent)'
const ACCENT_DIM = 'rgba(184,84,58,0.20)'
const NODE_BG = 'var(--paper)'
const NODE_BORDER = 'rgba(184,84,58,0.30)'
const SESSION_BG = 'var(--paper-deep)'
const CALLOUT_BG = 'var(--paper-deep)'
const TEXT_MAIN = 'var(--ink)'
const TEXT_DIM = 'var(--ink-soft)'
const TEXT_MUTED = 'var(--ink-muted)'
const LINE_COLOR = 'rgba(184,84,58,0.25)'

const monExercises = [
  'Back Squat 3×8 @60%',
  'Bench Press 3×8 @60%',
  'Barbell Row 3×8 @60%',
  'OHP 3×10 @60%',
  'Plank 3×45s',
]

const wedExercises = [
  'Romanian Deadlift 3×10 @60%',
  'Incline DB Press 3×10 @60%',
  'Lat Pulldown 3×12 @60%',
  'Hip Thrust 3×15 @60%',
  'Face Pull 3×20',
]

const friExercises = [
  'Goblet Squat 3×12',
  'Deadlift 3×5 @60%',
  'DB Bench Press 3×12',
  'Seated Row 3×12',
  '20min easy walk',
]

function SessionNode({
  x, y, w, h, label, day, exercises,
}: { x: number; y: number; w: number; h: number; label: string; day: string; exercises: string[] }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10}
        fill={SESSION_BG} stroke={NODE_BORDER} strokeWidth={1.2} />
      <text x={x + w / 2} y={y + 20} textAnchor="middle"
        fill={TEXT_MUTED} fontSize={9} fontWeight={700} letterSpacing="0.12em"
        fontFamily="DM Sans, sans-serif">
        {day}
      </text>
      <text x={x + w / 2} y={y + 36} textAnchor="middle"
        fill={ACCENT} fontSize={11} fontWeight={700} letterSpacing="0.05em"
        fontFamily="DM Sans, sans-serif">
        {label}
      </text>
      <line x1={x + 16} y1={y + 44} x2={x + w - 16} y2={y + 44}
        stroke="rgba(184,84,58,0.12)" strokeWidth={1} />
      {exercises.map((ex, i) => (
        <text key={i} x={x + 14} y={y + 60 + i * 20}
          fill={TEXT_DIM} fontSize={10.5} fontFamily="DM Sans, sans-serif">
          {ex}
        </text>
      ))}
    </g>
  )
}

function CalloutBubble({
  x, y, w, h, label, body, pointerDir,
}: { x: number; y: number; w: number; h: number; label: string; body: string[]; pointerDir: 'up' | 'down' | 'left' | 'right' }) {
  const px = x + w / 2
  const py = y + h / 2
  let pointer: string
  const ps = 12
  if (pointerDir === 'down') {
    pointer = `${px - ps},${y + h} ${px},${y + h + ps * 1.4} ${px + ps},${y + h}`
  } else if (pointerDir === 'up') {
    pointer = `${px - ps},${y} ${px},${y - ps * 1.4} ${px + ps},${y}`
  } else if (pointerDir === 'left') {
    pointer = `${x},${py - ps} ${x - ps * 1.4},${py} ${x},${py + ps}`
  } else {
    pointer = `${x + w},${py - ps} ${x + w + ps * 1.4},${py} ${x + w},${py + ps}`
  }

  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10}
        fill={CALLOUT_BG} stroke={ACCENT_DIM} strokeWidth={1.2} />
      <polygon points={pointer} fill={CALLOUT_BG} stroke={ACCENT_DIM} strokeWidth={1.2} />
      {pointerDir === 'down' && <line x1={x + w * 0.3} y1={y + h} x2={x + w * 0.7} y2={y + h} stroke={CALLOUT_BG} strokeWidth={2} />}
      {pointerDir === 'up' && <line x1={x + w * 0.3} y1={y} x2={x + w * 0.7} y2={y} stroke={CALLOUT_BG} strokeWidth={2} />}
      {pointerDir === 'left' && <line x1={x} y1={y + h * 0.35} x2={x} y2={y + h * 0.65} stroke={CALLOUT_BG} strokeWidth={2} />}
      {pointerDir === 'right' && <line x1={x + w} y1={y + h * 0.35} x2={x + w} y2={y + h * 0.65} stroke={CALLOUT_BG} strokeWidth={2} />}
      <text x={x + w / 2} y={y + 22} textAnchor="middle"
        fill={ACCENT} fontSize={10} fontWeight={700} letterSpacing="0.1em"
        fontFamily="DM Sans, sans-serif">
        {label}
      </text>
      {body.map((line, i) => (
        <text key={i} x={x + w / 2} y={y + 38 + i * 16} textAnchor="middle"
          fill={TEXT_DIM} fontSize={10} fontFamily="DM Sans, sans-serif">
          {line}
        </text>
      ))}
    </g>
  )
}

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

  // Layout: same as week 1 — Mon left, Wed top-right, Fri bottom-right
  const cx = 390, cy = 340, cw = 320, ch = 58

  const monX = 38, monY = 72, monW = 258, monH = 172
  const wedX = 804, wedY = 72, wedW = 258, wedH = 172
  const friX = 804, friY = 536, friW = 258, friH = 172

  // Callouts
  const c1X = 400, c1Y = 32, c1W = 300, c1H = 92
  const c2X = 838, c2Y = 310, c2W = 248, c2H = 152
  const c3X = 396, c3Y = 644, c3W = 308, c3H = 80
  const c4X = 10, c4Y = 500, c4W = 308, c4H = 156

  return (
    <div>
      <div style={{
        overflowX: 'auto', overflowY: 'auto', WebkitOverflowScrolling: 'touch' as 'touch',
        borderRadius: 12, border: '1px solid var(--paper-edge)',
        background: 'var(--paper-deep)', marginBottom: 40,
        cursor: 'grab',
      }}>
        <svg
          width={1100} height={760}
          viewBox="0 0 1100 760"
          style={{ display: 'block', minWidth: 1100 }}
          aria-label="Week 7 deload training mind map"
        >
          <defs>
            <filter id="glow7">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="nodeShadow7">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="var(--accent)" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Connectors */}
          <line x1={cx} y1={cy + ch / 2} x2={monX + monW} y2={monY + monH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow7)" />
          <line x1={cx + cw} y1={cy + ch / 2} x2={wedX} y2={wedY + wedH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow7)" />
          <line x1={cx + cw} y1={cy + ch / 2} x2={c2X} y2={c2Y + c2H / 2}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={cx + cw} y1={cy + ch} x2={friX} y2={friY + friH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow7)" />
          <line x1={cx + cw / 2} y1={cy} x2={c1X + c1W / 2} y2={c1Y + c1H}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={cx + cw / 2} y1={cy + ch} x2={c3X + c3W / 2} y2={c3Y}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={cx} y1={cy + ch} x2={c4X + c4W} y2={c4Y + c4H / 2}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />

          {/* Central node */}
          <g filter="url(#nodeShadow7)">
            <rect x={cx} y={cy} width={cw} height={ch} rx={12}
              fill={NODE_BG} stroke={NODE_BORDER} strokeWidth={1.8} />
          </g>
          <text x={cx + cw / 2} y={cy + 24} textAnchor="middle"
            fill={TEXT_MUTED} fontSize={9.5} fontWeight={700} letterSpacing="0.1em"
            fontFamily="DM Sans, sans-serif">
            WEEK 7
          </text>
          <text x={cx + cw / 2} y={cy + 40} textAnchor="middle"
            fill={TEXT_MAIN} fontSize={13} fontWeight={700} letterSpacing="0.04em"
            fontFamily="DM Sans, sans-serif">
            DELOAD
          </text>

          {/* Session nodes */}
          <SessionNode x={monX} y={monY} w={monW} h={monH}
            day="MONDAY" label="SESSION A · @60%" exercises={monExercises} />
          <SessionNode x={wedX} y={wedY} w={wedW} h={wedH}
            day="WEDNESDAY" label="SESSION B · @60%" exercises={wedExercises} />
          <SessionNode x={friX} y={friY} w={friW} h={friH}
            day="FRIDAY · REFLECTION" label="SESSION C · @60%" exercises={friExercises} />

          {/* Callouts */}
          <CalloutBubble x={c1X} y={c1Y} w={c1W} h={c1H}
            pointerDir="down"
            label="WHY DELOAD?"
            body={[
              'Six weeks accumulates fatigue in muscles,',
              'joints, and CNS. That fatigue masks your',
              'actual fitness. The deload removes it.',
              'You will feel this on Monday of week 8.',
            ]} />

          <CalloutBubble x={c2X} y={c2Y} w={c2W} h={c2H}
            pointerDir="left"
            label="SUPERCOMPENSATION →"
            body={[
              'After stress and adequate recovery,',
              'your body adapts above its previous',
              'baseline. You do not get fitter during',
              'training. You get fitter after it.',
            ]} />

          <CalloutBubble x={c3X} y={c3Y} w={c3W} h={c3H}
            pointerDir="up"
            label="MAKE SURE YOU →"
            body={[
              'On Friday\'s goblet squat, compare how it',
              'feels to week 1 session A. Same exercise.',
              'Different person performing it. Notice that.',
            ]} />

          <CalloutBubble x={c4X} y={c4Y} w={c4W} h={c4H}
            pointerDir="right"
            label="THE MENTAL SIDE →"
            body={[
              'The guilt of a lighter week is gym',
              'culture talking. Sustainable progress',
              'is built by people who train hard',
              'AND recover properly.',
            ]} />
        </svg>
      </div>

      {/* Flat table */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--ink-muted)',
          }}>
            FLAT VIEW · GYM USE
          </p>
          <button
            onClick={handleCopy}
            style={{
              fontSize: 12, fontWeight: 600, color: copied ? 'var(--accent)' : 'var(--ink-muted)',
              background: 'transparent', border: '1px solid',
              borderColor: copied ? 'rgba(184,84,58,0.25)' : 'var(--paper-edge)',
              borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {copied ? 'Copied ✓' : 'Copy Schedule'}
          </button>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16,
        }} className="flat-schedule-grid-w7">
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
            <div key={day} style={{
              background: 'var(--paper-deep)',
              border: '1px solid var(--paper-edge)',
              borderRadius: 10, overflow: 'hidden',
            }}>
              <div style={{
                background: 'rgba(184,84,58,0.07)', borderBottom: '1px solid rgba(184,84,58,0.10)',
                padding: '10px 14px',
              }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: '0.08em' }}>{day}</p>
                <p style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{session}</p>
              </div>
              <div style={{ padding: '8px 0' }}>
                {rows.map(([name, sets, rest], i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto auto',
                    gap: 8, padding: '7px 14px',
                    borderBottom: i < rows.length - 1 ? '1px solid var(--paper-edge)' : 'none',
                  }}>
                    <span style={{ fontSize: 11.5, color: TEXT_MAIN }}>{name}</span>
                    <span style={{ fontSize: 11, color: ACCENT, fontWeight: 600 }}>{sets}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{rest}</span>
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
        }
      `}</style>
    </div>
  )
}
