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

const monExercises = ['Goblet Squat', 'Romanian Deadlift', 'Hip Thrust', 'Seated Cable Row', 'Dead Bug']
const wedExercises = ['Leg Press', 'Bulgarian Split Squat', 'Glute Kickback', 'DB Shoulder Press', 'Plank']
const friExercises = ['Goblet Squat ↑', 'Romanian Deadlift', 'Hip Thrust ↑', 'Lat Pulldown', 'Pallof Press']

function SessionNode({
  x, y, w, h, label, day, exercises,
}: { x: number; y: number; w: number; h: number; label: string; day: string; exercises: string[] }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10}
        fill={SESSION_BG} stroke={NODE_BORDER} strokeWidth={1.2} />
      <text x={x + w / 2} y={y + 20} textAnchor="middle"
        fill={TEXT_MUTED} fontSize={9} fontWeight={700} letterSpacing="0.12em"
        fontFamily="DM Sans, sans-serif" textDecoration="none">
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
      {/* Cover the pointer base seam */}
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

  function handleCopy() {
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Layout: SVG 1100×760
  // Central node
  const cx = 390, cy = 340, cw = 320, ch = 58

  // Session nodes
  const monX = 38, monY = 72, monW = 258, monH = 172
  const wedX = 804, wedY = 72, wedW = 258, wedH = 172
  const friX = 804, friY = 536, friW = 258, friH = 172

  // Callout bubbles
  const setsX = 400, setsY = 32, setsW = 300, setsH = 92
  const makeX = 836, makeY = 308, makeW = 256, makeH = 136
  const notX = 390, notY = 644, notW = 320, notH = 82
  const whyX = 8, whyY = 502, whyW = 308, whyH = 160

  return (
    <div>
      {/* Interactive SVG mind map */}
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
          aria-label="Week 1 training mind map"
        >
          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="nodeShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="var(--accent)" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Connector lines — render behind nodes */}
          {/* Center top → SETS & REPS */}
          <line x1={cx + cw / 2} y1={cy} x2={setsX + setsW / 2} y2={setsY + setsH}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow)" />
          {/* Center left → MON */}
          <line x1={cx} y1={cy + ch / 2} x2={monX + monW} y2={monY + monH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow)" />
          {/* Center right → WED */}
          <line x1={cx + cw} y1={cy + ch / 2} x2={wedX} y2={wedY + wedH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow)" />
          {/* Center right → MAKE SURE */}
          <line x1={cx + cw} y1={cy + ch / 2} x2={makeX} y2={makeY + makeH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow)" />
          {/* Center right-bottom → FRI */}
          <line x1={cx + cw} y1={cy + ch} x2={friX} y2={friY + friH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow)" />
          {/* Center bottom → NOT YET */}
          <line x1={cx + cw / 2} y1={cy + ch} x2={notX + notW / 2} y2={notY}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow)" />
          {/* Center left-bottom → WHY */}
          <line x1={cx} y1={cy + ch} x2={whyX + whyW} y2={whyY + whyH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow)" />

          {/* Central node */}
          <g filter="url(#nodeShadow)">
            <rect x={cx} y={cy} width={cw} height={ch} rx={12}
              fill={NODE_BG} stroke={NODE_BORDER} strokeWidth={1.8} />
          </g>
          <text x={cx + cw / 2} y={cy + 24} textAnchor="middle"
            fill={TEXT_MUTED} fontSize={9.5} fontWeight={700} letterSpacing="0.1em"
            fontFamily="DM Sans, sans-serif">
            WEEK 1
          </text>
          <text x={cx + cw / 2} y={cy + 40} textAnchor="middle"
            fill={TEXT_MAIN} fontSize={13} fontWeight={700} letterSpacing="0.04em"
            fontFamily="DM Sans, sans-serif">
            FULL BODY 3×/WEEK
          </text>

          {/* Session nodes */}
          <SessionNode x={monX} y={monY} w={monW} h={monH}
            day="MONDAY" label="SESSION A" exercises={monExercises} />
          <SessionNode x={wedX} y={wedY} w={wedW} h={wedH}
            day="WEDNESDAY" label="SESSION B" exercises={wedExercises} />
          <SessionNode x={friX} y={friY} w={friW} h={friH}
            day="FRIDAY" label="SESSION C" exercises={friExercises} />

          {/* Callout bubbles */}
          <CalloutBubble x={setsX} y={setsY} w={setsW} h={setsH}
            pointerDir="down"
            label="SETS & REPS"
            body={[
              '3 sets × 10 reps on everything.',
              '90 seconds rest.',
              'Do not rush this.',
            ]} />

          <CalloutBubble x={makeX} y={makeY} w={makeW} h={makeH}
            pointerDir="left"
            label="MAKE SURE YOU →"
            body={[
              'Feel the glute squeeze on',
              'every hip thrust rep.',
              "If you can't feel it, the",
              'weight is too heavy. Drop it.',
            ]} />

          <CalloutBubble x={notX} y={notY} w={notW} h={notH}
            pointerDir="up"
            label="NOT YET →"
            body={[
              'No barbell. No Smith machine.',
              'No 6-day splits. That comes later.',
            ]} />

          <CalloutBubble x={whyX} y={whyY} w={whyW} h={whyH}
            pointerDir="right"
            label="WHY FULL BODY?"
            body={[
              "Your nervous system hasn't",
              'learned these patterns yet.',
              'Full body 3× means each muscle',
              'fires 3 times a week — that\'s how',
              'the brain-muscle connection',
              'builds fastest.',
            ]} />
        </svg>
      </div>

      {/* Flat table — gym use version */}
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
          overflowX: 'auto',
        }} className="flat-schedule-grid">
          {[
            {
              day: 'MON', session: 'Session A',
              rows: [
                ['Goblet Squat', '3×10', '90s'],
                ['Romanian Deadlift', '3×10', '90s'],
                ['Hip Thrust', '3×15', '60s'],
                ['Seated Cable Row', '3×10', '90s'],
                ['Dead Bug', '3×8/side', '60s'],
              ],
            },
            {
              day: 'WED', session: 'Session B',
              rows: [
                ['Leg Press', '3×12', '90s'],
                ['Bulgarian Split Squat', '3×10/side', '90s'],
                ['Glute Kickback', '3×15/side', '60s'],
                ['DB Shoulder Press', '3×10', '90s'],
                ['Plank Hold', '3×30s', '60s'],
              ],
            },
            {
              day: 'FRI', session: 'Session C',
              rows: [
                ['Goblet Squat ↑', '3×12', '90s'],
                ['Romanian Deadlift', '3×10', '90s'],
                ['Hip Thrust ↑', '3×15', '60s'],
                ['Lat Pulldown', '3×10', '90s'],
                ['Pallof Press', '3×10/side', '60s'],
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
          .flat-schedule-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
