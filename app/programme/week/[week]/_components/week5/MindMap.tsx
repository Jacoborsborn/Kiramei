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

const pushExercises = [
  'Bench Press 4×6 @RPE8',
  'Incline DB Press 3×10',
  'OHP 3×10',
  'Cable Fly 3×15',
  'Lateral Raise 4×15',
  'Tricep Pushdown 3×15',
  'Overhead Tricep Ext 3×12',
]

const pullExercises = [
  'Deadlift 4×5 @RPE8',
  'Weighted Pull-Up/Pulldown 4×8',
  'Cable Row 4×10',
  'Face Pull 3×15',
  'Rear Delt Fly 3×15',
  'EZ Bar Curl 3×12',
  'Hammer Curl 3×12',
]

const legsExercises = [
  'Back Squat 4×6 @RPE8',
  'Romanian Deadlift 4×10',
  'Leg Press 3×15',
  'Hip Thrust 4×10 @RPE8',
  'Leg Curl 3×15',
  'Calf Raise 4×20',
]

function SessionNode({
  x, y, w, h, label, day, exercises,
}: { x: number; y: number; w: number; h: number; label: string; day: string; exercises: string[] }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10}
        fill={SESSION_BG} stroke={NODE_BORDER} strokeWidth={1.4} />
      <text x={x + w / 2} y={y + 22} textAnchor="middle"
        fill={TEXT_MUTED} fontSize={9} fontWeight={700} letterSpacing="0.12em"
        fontFamily="DM Sans, sans-serif">
        {day}
      </text>
      <text x={x + w / 2} y={y + 40} textAnchor="middle"
        fill={ACCENT} fontSize={12} fontWeight={700} letterSpacing="0.06em"
        fontFamily="DM Sans, sans-serif">
        {label}
      </text>
      <line x1={x + 16} y1={y + 50} x2={x + w - 16} y2={y + 50}
        stroke="rgba(184,84,58,0.12)" strokeWidth={1} />
      {exercises.map((ex, i) => (
        <text key={i} x={x + 14} y={y + 66 + i * 19}
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

  // Layout: central node, PUSH left, PULL top-right, LEGS bottom-right
  const cx = 375, cy = 318, cw = 300, ch = 58

  // Session nodes
  const pushX = 30, pushY = 220, pushW = 280, pushH = 196
  const pullX = 780, pullY = 80, pullW = 280, pullH = 196
  const legsX = 780, legsY = 490, legsW = 280, legsH = 162

  // Callouts
  const c1X = 382, c1Y = 28, c1W = 290, c1H = 88    // top — what is PPL
  const c2X = 382, c2Y = 620, c2W = 290, c2H = 82   // bottom — mind-muscle
  const c3X = 382, c3Y = 425, c3W = 290, c3H = 78   // mid-low — make sure
  const c4X = 30, c4Y = 488, c4W = 280, c4H = 88    // bottom-left — why you're ready

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
          aria-label="Week 5 Push Pull Legs mind map"
        >
          <defs>
            <filter id="glow5">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="nodeShadow5">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="var(--accent)" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Connector lines */}
          {/* Center to PUSH */}
          <line x1={cx} y1={cy + ch / 2} x2={pushX + pushW} y2={pushY + pushH / 2}
            stroke={LINE_COLOR} strokeWidth={1.6} filter="url(#glow5)" />
          {/* Center to PULL */}
          <line x1={cx + cw} y1={cy + ch / 2} x2={pullX} y2={pullY + pullH / 2}
            stroke={LINE_COLOR} strokeWidth={1.6} filter="url(#glow5)" />
          {/* Center to LEGS */}
          <line x1={cx + cw} y1={cy + ch} x2={legsX} y2={legsY + legsH / 2}
            stroke={LINE_COLOR} strokeWidth={1.6} filter="url(#glow5)" />
          {/* Center to callouts (dashed) */}
          <line x1={cx + cw / 2} y1={cy} x2={c1X + c1W / 2} y2={c1Y + c1H}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={cx + cw / 2} y1={cy + ch} x2={c2X + c2W / 2} y2={c2Y}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={cx + cw / 2} y1={cy + ch / 2} x2={c3X + c3W} y2={c3Y + c3H / 2}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={cx} y1={cy + ch} x2={c4X + c4W} y2={c4Y + c4H / 2}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />

          {/* Central node */}
          <g filter="url(#nodeShadow5)">
            <rect x={cx} y={cy} width={cw} height={ch} rx={12}
              fill={NODE_BG} stroke={NODE_BORDER} strokeWidth={1.8} />
          </g>
          <text x={cx + cw / 2} y={cy + 24} textAnchor="middle"
            fill={TEXT_MUTED} fontSize={9.5} fontWeight={700} letterSpacing="0.1em"
            fontFamily="DM Sans, sans-serif">
            WEEK 5
          </text>
          <text x={cx + cw / 2} y={cy + 42} textAnchor="middle"
            fill={TEXT_MAIN} fontSize={13} fontWeight={700} letterSpacing="0.04em"
            fontFamily="DM Sans, sans-serif">
            PUSH / PULL / LEGS
          </text>

          {/* Session nodes */}
          <SessionNode x={pushX} y={pushY} w={pushW} h={pushH}
            day="PUSH · MON & FRI" label="PUSH" exercises={pushExercises} />
          <SessionNode x={pullX} y={pullY} w={pullW} h={pullH}
            day="PULL · TUE & SAT" label="PULL" exercises={pullExercises} />
          <SessionNode x={legsX} y={legsY} w={legsW} h={legsH}
            day="LEGS · WED" label="LEGS" exercises={legsExercises} />

          {/* Callout bubbles */}
          <CalloutBubble x={c1X} y={c1Y} w={c1W} h={c1H}
            pointerDir="down"
            label="WHAT IS PPL?"
            body={[
              'Push trains chest, shoulders, triceps.',
              'Pull trains back, rear delts, biceps.',
              'Leg day is what it sounds like.',
              'Each session focused enough to finish in under an hour.',
            ]} />

          <CalloutBubble x={c2X} y={c2Y} w={c2W} h={c2H}
            pointerDir="up"
            label="MIND-MUSCLE →"
            body={[
              'You are not moving the weight from A to B.',
              'Squeeze the muscle and let it move',
              'the weight as a consequence.',
            ]} />

          <CalloutBubble x={c3X} y={c3Y} w={c3W} h={c3H}
            pointerDir="right"
            label="MAKE SURE YOU →"
            body={[
              'On your first isolation set each session,',
              'use lighter weight and 3-1-1 tempo.',
              'Feel where the muscle starts and ends.',
            ]} />

          <CalloutBubble x={c4X} y={c4Y} w={c4W} h={c4H}
            pointerDir="right"
            label="WHY YOU ARE READY NOW →"
            body={[
              'PPL in week 1 would have broken you.',
              'Four weeks of full body and upper/lower',
              'built the foundation. Now use it.',
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
        }} className="flat-schedule-grid-w5">
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
                    display: 'grid', gridTemplateColumns: '1fr auto',
                    gap: 6, padding: '6px 14px',
                    borderBottom: i < rows.length - 1 ? '1px solid var(--paper-edge)' : 'none',
                  }}>
                    <span style={{ fontSize: 11.5, color: TEXT_MAIN }}>{name}</span>
                    <span style={{ fontSize: 10, color: ACCENT, fontWeight: 600, textAlign: 'right' }}>{sets}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 16, padding: '12px 16px',
          background: 'rgba(184,84,58,0.05)', border: '1px solid rgba(184,84,58,0.10)',
          borderRadius: 8,
        }}>
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
        }
      `}</style>
    </div>
  )
}
