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

const upperAExercises = [
  'Bench Press 4×6 @RPE8',
  'Barbell Row 4×6 @RPE8',
  'DB OHP 3×10 @RPE7',
  'Weighted Pulldown 3×8',
  'Close Grip Bench 3×10',
  'EZ Bar Curl 3×12',
]

const lowerAExercises = [
  'Back Squat 4×6 @RPE8',
  'Conventional Deadlift 4×5 @RPE8',
  'Leg Press 3×12',
  'Leg Curl 3×12',
  'Hip Thrust heavy 4×8',
  'Calf Raise 4×15',
]

const upperBExercises = [
  'Incline DB Press 4×12 @RPE7',
  'Cable Row wide 4×12',
  'Lateral Raise 4×15',
  'Rear Delt Fly 3×15',
  'Tricep Overhead Ext 3×12',
  'Cable Curl 3×15',
]

const lowerBExercises = [
  'Bulgarian Split Squat 4×10',
  'Leg Extension 4×15',
  'Lying Leg Curl 4×12',
  'Hip Thrust 4×12',
  'Cable Pull-Through 3×15',
  'Ab Wheel Rollout 3×8',
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
        <text key={i} x={x + 14} y={y + 60 + i * 19}
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

  // Layout dimensions
  const cx = 380, cy = 285, cw = 300, ch = 58

  // Session nodes — 4 corners
  const uaX = 50, uaY = 80, uaW = 268, uaH = 175
  const laX = 50, laY = 480, laW = 268, laH = 175
  const ubX = 760, ubY = 80, ubW = 268, ubH = 175
  const lbX = 760, lbY = 480, lbW = 268, lbH = 175

  // Callout positions — in the gaps
  const c1X = 385, c1Y = 30, c1W = 295, c1H = 80   // top center — RPE scale
  const c2X = 385, c2Y = 640, c2W = 295, c2H = 80  // bottom center — make sure
  const c3X = 385, c3Y = 380, c3W = 295, c3H = 78  // middle — conventional DL

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
          aria-label="Week 4 training mind map"
        >
          <defs>
            <filter id="glow4">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="nodeShadow4">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="var(--accent)" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Connector lines — center to sessions */}
          <line x1={cx} y1={cy + ch / 2} x2={uaX + uaW} y2={uaY + uaH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow4)" />
          <line x1={cx} y1={cy + ch / 2} x2={laX + laW} y2={laY + laH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow4)" />
          <line x1={cx + cw} y1={cy + ch / 2} x2={ubX} y2={ubY + ubH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow4)" />
          <line x1={cx + cw} y1={cy + ch / 2} x2={lbX} y2={lbY + lbH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow4)" />
          {/* Center to callouts */}
          <line x1={cx + cw / 2} y1={cy} x2={c1X + c1W / 2} y2={c1Y + c1H}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={cx + cw / 2} y1={cy + ch} x2={c2X + c2W / 2} y2={c2Y}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={cx + cw / 2} y1={cy + ch / 2} x2={c3X} y2={c3Y + c3H / 2}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />

          {/* Central node */}
          <g filter="url(#nodeShadow4)">
            <rect x={cx} y={cy} width={cw} height={ch} rx={12}
              fill={NODE_BG} stroke={NODE_BORDER} strokeWidth={1.8} />
          </g>
          <text x={cx + cw / 2} y={cy + 24} textAnchor="middle"
            fill={TEXT_MUTED} fontSize={9.5} fontWeight={700} letterSpacing="0.1em"
            fontFamily="DM Sans, sans-serif">
            WEEK 4
          </text>
          <text x={cx + cw / 2} y={cy + 42} textAnchor="middle"
            fill={TEXT_MAIN} fontSize={13} fontWeight={700} letterSpacing="0.04em"
            fontFamily="DM Sans, sans-serif">
            RPE-BASED TRAINING
          </text>

          {/* Session nodes */}
          <SessionNode x={uaX} y={uaY} w={uaW} h={uaH}
            day="MONDAY · RPE 7-8" label="UPPER A" exercises={upperAExercises} />
          <SessionNode x={laX} y={laY} w={laW} h={laH}
            day="TUESDAY · RPE 7-8" label="LOWER A" exercises={lowerAExercises} />
          <SessionNode x={ubX} y={ubY} w={ubW} h={ubH}
            day="THURSDAY · HYPERTROPHY" label="UPPER B" exercises={upperBExercises} />
          <SessionNode x={lbX} y={lbY} w={lbW} h={lbH}
            day="FRIDAY · HYPERTROPHY" label="LOWER B" exercises={lowerBExercises} />

          {/* Callout bubbles */}
          <CalloutBubble x={c1X} y={c1Y} w={c1W} h={c1H}
            pointerDir="down"
            label="THE RPE SCALE →"
            body={[
              'RPE 10 = no reps left. RPE 8 = two reps left.',
              'RPE 7 = three reps left. Target 7–8',
              'on every working set.',
            ]} />

          <CalloutBubble x={c2X} y={c2Y} w={c2W} h={c2H}
            pointerDir="up"
            label="MAKE SURE YOU →"
            body={[
              'Decide your RPE target before the set.',
              'Load accordingly. After the set, honestly',
              'assess. Adjust the next set.',
            ]} />

          <CalloutBubble x={c3X} y={c3Y} w={c3W} h={c3H}
            pointerDir="right"
            label="CONVENTIONAL DEADLIFT →"
            body={[
              'First time this week. Hip width stance.',
              'Bar over mid-foot. Hinge to the bar.',
              'Bar should drag up your shins.',
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
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12,
        }} className="flat-schedule-grid-w4">
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
                <p style={{ fontSize: 10, color: 'var(--ink-muted)' }}>{session}</p>
              </div>
              <div style={{ padding: '8px 0' }}>
                {rows.map(([name, sets, rest], i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto',
                    gap: 6, padding: '6px 14px',
                    borderBottom: i < rows.length - 1 ? '1px solid var(--paper-edge)' : 'none',
                  }}>
                    <span style={{ fontSize: 11, color: TEXT_MAIN }}>{name}</span>
                    <span style={{ fontSize: 10, color: ACCENT, fontWeight: 600, textAlign: 'right' }}>{sets}</span>
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
      `}</style>
    </div>
  )
}
