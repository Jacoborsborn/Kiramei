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

const upperAExercises = ['BB Bench Press 4×8', 'Barbell Row 4×8', 'DB Overhead Press 3×10', 'Lat Pulldown 3×10', 'Tricep Pushdown 3×12', 'Hammer Curl 3×12']
const lowerAExercises = ['BB Back Squat 4×8', 'Barbell RDL 4×8', 'Leg Press 3×12', 'Leg Curl 3×12', 'Hip Thrust 3×15', 'Calf Raise 4×15']
const upperBExercises = ['Incline DB Press 4×10', 'Seated Cable Row 4×10', 'Lateral Raise 3×15', 'Face Pull 3×15', 'Skull Crusher 3×12', 'Incline Curl 3×12']
const lowerBExercises = ['Romanian DL heavy 4×6', 'Bulgarian Split Squat 3×10', 'Leg Extension 3×15', 'Hip Thrust heavy 4×10', 'Nordic/Leg Curl 3×8', 'Plank 3×45s']

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
        fill={ACCENT} fontSize={10.5} fontWeight={700} letterSpacing="0.05em"
        fontFamily="DM Sans, sans-serif">
        {label}
      </text>
      <line x1={x + 16} y1={y + 44} x2={x + w - 16} y2={y + 44}
        stroke="rgba(184,84,58,0.12)" strokeWidth={1} />
      {exercises.map((ex, i) => (
        <text key={i} x={x + 12} y={y + 60 + i * 18}
          fill={TEXT_DIM} fontSize={9.5} fontFamily="DM Sans, sans-serif">
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

  const plainText = `WEEK 3 SCHEDULE

MONDAY — Upper A
Barbell Bench Press · 4×8 · 2min rest
Barbell Row · 4×8 · 2min rest
DB Overhead Press · 3×10 · 90s rest
Lat Pulldown · 3×10 · 90s rest
Tricep Pushdown · 3×12 · 60s rest
Hammer Curl · 3×12 · 60s rest

TUESDAY — Lower A
Barbell Back Squat · 4×8 · 2min rest
Barbell RDL · 4×8 · 2min rest
Leg Press · 3×12 · 90s rest
Leg Curl · 3×12 · 90s rest
Hip Thrust · 3×15 · 60s rest
Calf Raise · 4×15 · 45s rest

THURSDAY — Upper B
Incline DB Press · 4×10 · 90s rest
Seated Cable Row · 4×10 · 90s rest
Lateral Raise · 3×15 · 60s rest
Face Pull · 3×15 · 60s rest
Skull Crusher · 3×12 · 60s rest
Incline Curl · 3×12 · 60s rest

FRIDAY — Lower B
Romanian Deadlift (heavy) · 4×6 · 2min rest
Bulgarian Split Squat · 3×10/side · 90s rest
Leg Extension · 3×15 · 60s rest
Hip Thrust (heavy) · 4×10 · 90s rest
Nordic / Leg Curl · 3×8 · 90s rest
Plank · 3×45s · 45s rest`

  function handleCopy() {
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // SVG 1100×820 — 4-session 2×2 layout
  // Central node
  const cx = 390, cy = 355, cw = 320, ch = 58

  // Session nodes — top-left, top-right, bottom-left, bottom-right
  const upperAX = 30, upperAY = 50, upperAW = 260, upperAH = 190
  const upperBX = 810, upperBY = 50, upperBW = 260, upperBH = 190
  const lowerAX = 30, lowerAY = 560, lowerAW = 260, lowerAH = 190
  const lowerBX = 810, lowerBY = 560, lowerBW = 260, lowerBH = 190

  // Callouts — 3 callouts in remaining space
  const splitX = 388, splitY = 470, splitW = 324, splitH = 110
  const warmupX = 810, warmupY = 306, warmupW = 262, warmupH = 120
  const bssX = 388, bssY = 26, bssW = 320, bssH = 88

  return (
    <div>
      <div style={{
        overflowX: 'auto', overflowY: 'auto', WebkitOverflowScrolling: 'touch' as 'touch',
        borderRadius: 12, border: '1px solid var(--paper-edge)',
        background: 'var(--paper-deep)', marginBottom: 40,
        cursor: 'grab',
      }}>
        <svg
          width={1100} height={820}
          viewBox="0 0 1100 820"
          style={{ display: 'block', minWidth: 1100 }}
          aria-label="Week 3 training mind map"
        >
          <defs>
            <filter id="glow3">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="nodeShadow3">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="var(--accent)" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Connector lines — center to each session */}
          {/* Center → Upper A (top-left) */}
          <line x1={cx} y1={cy + ch / 2} x2={upperAX + upperAW} y2={upperAY + upperAH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow3)" />
          {/* Center → Upper B (top-right) */}
          <line x1={cx + cw} y1={cy + ch / 2} x2={upperBX} y2={upperBY + upperBH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow3)" />
          {/* Center → Lower A (bottom-left) */}
          <line x1={cx} y1={cy + ch} x2={lowerAX + lowerAW} y2={lowerAY + lowerAH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow3)" />
          {/* Center → Lower B (bottom-right) */}
          <line x1={cx + cw} y1={cy + ch} x2={lowerBX} y2={lowerBY + lowerBH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow3)" />
          {/* Center top → BSS callout */}
          <line x1={cx + cw / 2} y1={cy} x2={bssX + bssW / 2} y2={bssY + bssH}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow3)" />
          {/* Center bottom → SPLIT callout */}
          <line x1={cx + cw / 2} y1={cy + ch} x2={splitX + splitW / 2} y2={splitY}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow3)" />
          {/* Center right → WARM UP callout */}
          <line x1={cx + cw} y1={cy + ch / 2} x2={warmupX} y2={warmupY + warmupH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow3)" />

          {/* Central node */}
          <g filter="url(#nodeShadow3)">
            <rect x={cx} y={cy} width={cw} height={ch} rx={12}
              fill={NODE_BG} stroke={NODE_BORDER} strokeWidth={1.8} />
          </g>
          <text x={cx + cw / 2} y={cy + 24} textAnchor="middle"
            fill={TEXT_MUTED} fontSize={9.5} fontWeight={700} letterSpacing="0.1em"
            fontFamily="DM Sans, sans-serif">
            WEEK 3
          </text>
          <text x={cx + cw / 2} y={cy + 40} textAnchor="middle"
            fill={TEXT_MAIN} fontSize={13} fontWeight={700} letterSpacing="0.04em"
            fontFamily="DM Sans, sans-serif">
            UPPER / LOWER SPLIT
          </text>

          {/* Session nodes */}
          <SessionNode x={upperAX} y={upperAY} w={upperAW} h={upperAH}
            day="MONDAY" label="UPPER A" exercises={upperAExercises} />
          <SessionNode x={upperBX} y={upperBY} w={upperBW} h={upperBH}
            day="THURSDAY" label="UPPER B" exercises={upperBExercises} />
          <SessionNode x={lowerAX} y={lowerAY} w={lowerAW} h={lowerAH}
            day="TUESDAY" label="LOWER A" exercises={lowerAExercises} />
          <SessionNode x={lowerBX} y={lowerBY} w={lowerBW} h={lowerBH}
            day="FRIDAY" label="LOWER B" exercises={lowerBExercises} />

          {/* Callout bubbles */}
          <CalloutBubble x={bssX} y={bssY} w={bssW} h={bssH}
            pointerDir="down"
            label="BULGARIAN SPLIT SQUAT →"
            body={[
              'Bodyweight only this week. Rear foot elevated.',
              'Front foot far enough forward that your shin stays vertical.',
            ]} />

          <CalloutBubble x={splitX} y={splitY} w={splitW} h={splitH}
            pointerDir="up"
            label="WHY THE SPLIT?"
            body={[
              'Each muscle now gets dedicated volume and 72 hours',
              'to recover. Upper/Lower outperforms full body at this',
              'stage — not because harder, but recovery is better.',
            ]} />

          <CalloutBubble x={warmupX} y={warmupY} w={warmupW} h={warmupH}
            pointerDir="left"
            label="MAKE SURE YOU →"
            body={[
              'Warm up before every barbell lift.',
              'Two sets — 50% and 75%',
              'of your working weight.',
              'Not optional.',
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
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
          overflowX: 'auto',
        }} className="flat-schedule-grid-w3">
          {[
            {
              day: 'MON', session: 'Upper A',
              rows: [
                ['BB Bench Press', '4×8', '2min'],
                ['Barbell Row', '4×8', '2min'],
                ['DB Overhead Press', '3×10', '90s'],
                ['Lat Pulldown', '3×10', '90s'],
                ['Tricep Pushdown', '3×12', '60s'],
                ['Hammer Curl', '3×12', '60s'],
              ],
            },
            {
              day: 'TUE', session: 'Lower A',
              rows: [
                ['BB Back Squat', '4×8', '2min'],
                ['Barbell RDL', '4×8', '2min'],
                ['Leg Press', '3×12', '90s'],
                ['Leg Curl', '3×12', '90s'],
                ['Hip Thrust', '3×15', '60s'],
                ['Calf Raise', '4×15', '45s'],
              ],
            },
            {
              day: 'THU', session: 'Upper B',
              rows: [
                ['Incline DB Press', '4×10', '90s'],
                ['Seated Cable Row', '4×10', '90s'],
                ['Lateral Raise', '3×15', '60s'],
                ['Face Pull', '3×15', '60s'],
                ['Skull Crusher', '3×12', '60s'],
                ['Incline Curl', '3×12', '60s'],
              ],
            },
            {
              day: 'FRI', session: 'Lower B',
              rows: [
                ['Romanian DL (heavy)', '4×6', '2min'],
                ['Bulgarian Split Squat', '3×10/side', '90s'],
                ['Leg Extension', '3×15', '60s'],
                ['Hip Thrust (heavy)', '4×10', '90s'],
                ['Nordic / Leg Curl', '3×8', '90s'],
                ['Plank', '3×45s', '45s'],
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
          .flat-schedule-grid-w3 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
