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

const monExercises = ['Goblet Squat 3×12', 'Romanian Deadlift 3×12', 'Hip Thrust (add load)', 'Seated Cable Row 3×12', 'Plank Hold 3×40s']
const wedExercises = ['Leg Press (add weight)', 'Hip Thrust with plate', 'Lat Pulldown 3×12', 'DB Shoulder Press 3×12', 'Dead Bug 3×10/side']
const friExercises = ['BB Back Squat 3×8 (bar)', 'BB RDL 3×8 (bar)', 'Incline DB Press 3×12', 'Single Arm DB Row 3×10', 'Pallof Press 3×12/side']

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
          fill={TEXT_DIM} fontSize={10} fontFamily="DM Sans, sans-serif">
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

  const plainText = `WEEK 2 SCHEDULE

MONDAY — Session A
Goblet Squat · 3×12 · 90s rest
Romanian Deadlift · 3×12 · 90s rest
Hip Thrust (with plate) · 3×15 · 60s rest
Seated Cable Row · 3×12 · 90s rest
Plank Hold · 3×40s · 60s rest

WEDNESDAY — Session B
Leg Press · 3×12 · 90s rest (add weight from week 1)
Hip Thrust (with plate) · 3×15 · 60s rest
Lat Pulldown · 3×12 · 90s rest
DB Shoulder Press · 3×12 · 90s rest
Dead Bug · 3×10/side · 60s rest

FRIDAY — Session C · Barbell Introduction
Barbell Back Squat · 3×8 · 2min rest (empty bar)
Barbell Romanian Deadlift · 3×8 · 2min rest (empty bar)
Incline DB Press · 3×12 · 90s rest
Single Arm DB Row · 3×10/side · 90s rest
Pallof Press · 3×12/side · 60s rest`

  function handleCopy() {
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Layout: SVG 1100×760
  const cx = 390, cy = 340, cw = 320, ch = 58

  // Session nodes
  const monX = 38, monY = 72, monW = 260, monH = 175
  const wedX = 804, wedY = 72, wedW = 260, wedH = 175
  const friX = 804, friY = 536, friW = 260, friH = 175

  // Callout bubbles
  const overloadX = 390, overloadY = 28, overloadW = 310, overloadH = 92
  const ruleX = 38, ruleY = 500, ruleW = 290, ruleH = 92
  const makeX = 838, makeY = 310, makeW = 244, makeH = 108
  const barbellX = 390, barbellY = 634, barbellW = 310, barbellH = 82

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
          aria-label="Week 2 training mind map"
        >
          <defs>
            <filter id="glow2">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="nodeShadow2">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="var(--accent)" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Connector lines */}
          {/* Center top → OVERLOAD */}
          <line x1={cx + cw / 2} y1={cy} x2={overloadX + overloadW / 2} y2={overloadY + overloadH}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow2)" />
          {/* Center left → MON */}
          <line x1={cx} y1={cy + ch / 2} x2={monX + monW} y2={monY + monH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow2)" />
          {/* Center right → WED */}
          <line x1={cx + cw} y1={cy + ch / 2} x2={wedX} y2={wedY + wedH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow2)" />
          {/* Center right → MAKE SURE */}
          <line x1={cx + cw} y1={cy + ch / 2} x2={makeX} y2={makeY + makeH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow2)" />
          {/* Center right-bottom → FRI */}
          <line x1={cx + cw} y1={cy + ch} x2={friX} y2={friY + friH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow2)" />
          {/* Center bottom → BARBELL */}
          <line x1={cx + cw / 2} y1={cy + ch} x2={barbellX + barbellW / 2} y2={barbellY}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow2)" />
          {/* Center left-bottom → 2.5KG RULE */}
          <line x1={cx} y1={cy + ch} x2={ruleX + ruleW} y2={ruleY + ruleH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow2)" />

          {/* Central node */}
          <g filter="url(#nodeShadow2)">
            <rect x={cx} y={cy} width={cw} height={ch} rx={12}
              fill={NODE_BG} stroke={NODE_BORDER} strokeWidth={1.8} />
          </g>
          <text x={cx + cw / 2} y={cy + 24} textAnchor="middle"
            fill={TEXT_MUTED} fontSize={9.5} fontWeight={700} letterSpacing="0.1em"
            fontFamily="DM Sans, sans-serif">
            WEEK 2
          </text>
          <text x={cx + cw / 2} y={cy + 40} textAnchor="middle"
            fill={TEXT_MAIN} fontSize={13} fontWeight={700} letterSpacing="0.04em"
            fontFamily="DM Sans, sans-serif">
            PROGRESSIVE OVERLOAD
          </text>

          {/* Session nodes */}
          <SessionNode x={monX} y={monY} w={monW} h={monH}
            day="MONDAY" label="SESSION A" exercises={monExercises} />
          <SessionNode x={wedX} y={wedY} w={wedW} h={wedH}
            day="WEDNESDAY" label="SESSION B" exercises={wedExercises} />
          <SessionNode x={friX} y={friY} w={friW} h={friH}
            day="FRIDAY" label="SESSION C · BARBELL INTRO" exercises={friExercises} />

          {/* Callout bubbles */}
          <CalloutBubble x={overloadX} y={overloadY} w={overloadW} h={overloadH}
            pointerDir="down"
            label="WHAT IS OVERLOAD?"
            body={[
              'Give your body a slightly greater demand',
              'than last time. Add reps, add weight,',
              'improve range.',
            ]} />

          <CalloutBubble x={ruleX} y={ruleY} w={ruleW} h={ruleH}
            pointerDir="right"
            label="2.5KG RULE →"
            body={[
              'Not 5kg. Not 10kg. 2.5kg.',
              'Small and relentless beats',
              'big and broken.',
            ]} />

          <CalloutBubble x={makeX} y={makeY} w={makeW} h={makeH}
            pointerDir="left"
            label="MAKE SURE YOU →"
            body={[
              'Log what you lifted last',
              'week before you pick up',
              'a weight this week.',
            ]} />

          <CalloutBubble x={barbellX} y={barbellY} w={barbellW} h={barbellH}
            pointerDir="up"
            label="THE BARBELL →"
            body={[
              'Friday: empty bar only. 20kg.',
              'This is technique work.',
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
          overflowX: 'auto',
        }} className="flat-schedule-grid-w2">
          {[
            {
              day: 'MON', session: 'Session A',
              rows: [
                ['Goblet Squat', '3×12', '90s'],
                ['Romanian Deadlift', '3×12', '90s'],
                ['Hip Thrust (plate)', '3×15', '60s'],
                ['Seated Cable Row', '3×12', '90s'],
                ['Plank Hold', '3×40s', '60s'],
              ],
            },
            {
              day: 'WED', session: 'Session B',
              rows: [
                ['Leg Press', '3×12', '90s'],
                ['Hip Thrust (plate)', '3×15', '60s'],
                ['Lat Pulldown', '3×12', '90s'],
                ['DB Shoulder Press', '3×12', '90s'],
                ['Dead Bug', '3×10/side', '60s'],
              ],
            },
            {
              day: 'FRI', session: 'Session C · BB Intro',
              rows: [
                ['BB Back Squat', '3×8', '2min'],
                ['BB Romanian DL', '3×8', '2min'],
                ['Incline DB Press', '3×12', '90s'],
                ['Single Arm DB Row', '3×10/side', '90s'],
                ['Pallof Press', '3×12/side', '60s'],
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
          .flat-schedule-grid-w2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
