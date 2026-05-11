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
  'Bench Press 5×5 @RPE9',
  'Incline DB 4×10 @RPE8',
  'OHP 4×8 @RPE8',
  'Cable Fly 4×15',
  'Lateral+Front Raise Superset 3×15+10',
  'Tricep Superset Pushdown+Dips 3×12+10',
]

const pullExercises = [
  'Deadlift 5×3 @RPE9',
  'Weighted Pull-Up 4×6 @RPE8',
  'Chest Supported Row 4×10 @RPE8',
  'Face Pull 4×20',
  'Full Curl Giant Set EZ+Hammer+Cable 3×10+10+10',
]

const legsExercises = [
  'Back Squat 5×5 @RPE9',
  'RDL 4×8 @RPE8',
  'Bulgarian Split Squat 4×10/side',
  'Hip Thrust 5×10 @RPE8',
  'Leg Curl+Extension Superset 4×12+12',
  'Calf Raise 5×20',
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

  const plainText = `WEEK 8 SCHEDULE · PERSONAL BEST WEEK

PUSH — MON & FRI · RPE 9
Bench Press · 5×5 @RPE9 · 2min
Incline DB · 4×10 @RPE8 · 90s
OHP · 4×8 @RPE8 · 90s
Cable Fly · 4×15 · 60s
Lateral+Front Raise Superset · 3×15+10 · 90s
Tricep Superset Pushdown+Dips · 3×12+10 · 90s

PULL — TUE & SAT · RPE 9
Deadlift · 5×3 @RPE9 · 3min
Weighted Pull-Up · 4×6 @RPE8 · 2min
Chest Supported Row · 4×10 @RPE8 · 90s
Face Pull · 4×20 · 60s
Full Curl Giant Set EZ+Hammer+Cable · 3×10+10+10 · 2min

LEGS — WED · RPE 9
Back Squat · 5×5 @RPE9 · 2min
RDL · 4×8 @RPE8 · 90s
Bulgarian Split Squat · 4×10/side @RPE8 · 90s
Hip Thrust · 5×10 @RPE8 · 90s
Leg Curl+Ext Superset · 4×12+12 · 90s
Calf Raise · 5×20 · 45s`

  function handleCopy() {
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // PPL layout: Push left, Pull top-right, Legs bottom-right
  const cx = 370, cy = 330, cw = 340, ch = 58

  const pushX = 18, pushY = 72, pushW = 270, pushH = 183
  const pullX = 790, pullY = 55, pullW = 292, pullH = 183
  const legsX = 790, legsY = 500, legsW = 292, legsH = 200

  // Callouts
  const c1X = 380, c1Y = 18, c1W = 320, c1H = 80    // top — personal bests
  const c2X = 380, c2Y = 430, c2W = 320, c2H = 80   // below center — hypertrophy vs strength
  const c3X = 18, c3Y = 510, c3W = 290, c3H = 96    // bottom-left — what comes next
  const c4X = 18, c4Y = 640, c4W = 290, c4H = 96    // far bottom-left — the template

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
          aria-label="Week 8 training mind map — Personal Best Week"
        >
          <defs>
            <filter id="glow8">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="nodeShadow8">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="var(--accent)" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Connectors */}
          <line x1={cx} y1={cy + ch / 2} x2={pushX + pushW} y2={pushY + pushH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow8)" />
          <line x1={cx + cw} y1={cy + ch / 3} x2={pullX} y2={pullY + pullH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow8)" />
          <line x1={cx + cw} y1={cy + ch * 2 / 3} x2={legsX} y2={legsY + legsH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow8)" />
          <line x1={cx + cw / 2} y1={cy} x2={c1X + c1W / 2} y2={c1Y + c1H}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={cx + cw / 2} y1={cy + ch} x2={c2X + c2W / 2} y2={c2Y}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={pushX + pushW / 2} y1={pushY + pushH} x2={c3X + c3W / 2} y2={c3Y}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          <line x1={c3X + c3W / 2} y1={c3Y + c3H} x2={c4X + c4W / 2} y2={c4Y}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />

          {/* Central node */}
          <g filter="url(#nodeShadow8)">
            <rect x={cx} y={cy} width={cw} height={ch} rx={12}
              fill={NODE_BG} stroke={NODE_BORDER} strokeWidth={2} />
          </g>
          <text x={cx + cw / 2} y={cy + 22} textAnchor="middle"
            fill={TEXT_MUTED} fontSize={9.5} fontWeight={700} letterSpacing="0.1em"
            fontFamily="DM Sans, sans-serif">
            WEEK 8
          </text>
          <text x={cx + cw / 2} y={cy + 42} textAnchor="middle"
            fill={TEXT_MAIN} fontSize={13} fontWeight={700} letterSpacing="0.04em"
            fontFamily="DM Sans, sans-serif">
            OWN IT · PERSONAL BESTS
          </text>

          {/* Session nodes */}
          <SessionNode x={pushX} y={pushY} w={pushW} h={pushH}
            day="PUSH · MON & FRI · RPE9" label="PUSH" exercises={pushExercises} />
          <SessionNode x={pullX} y={pullY} w={pullW} h={pullH}
            day="PULL · TUE & SAT · RPE9" label="PULL" exercises={pullExercises} />
          <SessionNode x={legsX} y={legsY} w={legsW} h={legsH}
            day="LEGS · WED · RPE9" label="LEGS" exercises={legsExercises} />

          {/* Callouts */}
          <CalloutBubble x={c1X} y={c1Y} w={c1W} h={c1H}
            pointerDir="down"
            label="PERSONAL BESTS →"
            body={[
              'You are fresh from a deload. Muscles recovered.',
              'Nervous system primed. These numbers will be',
              'higher than anything you have hit before.',
            ]} />

          <CalloutBubble x={c2X} y={c2Y} w={c2W} h={c2H}
            pointerDir="up"
            label="HYPERTROPHY vs STRENGTH →"
            body={[
              'Two goals. Two rep ranges. Two rest periods.',
              'You have been doing both for eight weeks.',
              'Now you know the labels.',
            ]} />

          <CalloutBubble x={c3X} y={c3Y} w={c3W} h={c3H}
            pointerDir="up"
            label="WHAT COMES NEXT →"
            body={[
              'You know three splits, progressive overload,',
              'RPE, deloading, weak links, mind-muscle',
              'connection, and hypertrophy vs strength.',
              'You do not need another programme.',
            ]} />

          <CalloutBubble x={c4X} y={c4Y} w={c4W} h={c4H}
            pointerDir="up"
            label="THE TEMPLATE →"
            body={[
              'The Build Your Own Plan template gives you',
              'an exercise library, split builder, and',
              'progressive overload tracker.',
              'One purchase. Used forever.',
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
        }} className="flat-schedule-grid-w8">
          {[
            {
              day: 'PUSH', session: 'Mon & Fri · RPE 9',
              rows: [
                ['Bench Press', '5×5 @RPE9', '2min'],
                ['Incline DB', '4×10 @RPE8', '90s'],
                ['OHP', '4×8 @RPE8', '90s'],
                ['Cable Fly', '4×15', '60s'],
                ['Lateral+Front Raise SS', '3×15+10', '90s'],
                ['Tricep Superset PD+Dips', '3×12+10', '90s'],
              ],
            },
            {
              day: 'PULL', session: 'Tue & Sat · RPE 9',
              rows: [
                ['Deadlift', '5×3 @RPE9', '3min'],
                ['Weighted Pull-Up', '4×6 @RPE8', '2min'],
                ['Chest Supported Row', '4×10 @RPE8', '90s'],
                ['Face Pull', '4×20', '60s'],
                ['Curl Giant Set EZ+H+C', '3×10+10+10', '2min'],
              ],
            },
            {
              day: 'LEGS', session: 'Wed · RPE 9',
              rows: [
                ['Back Squat', '5×5 @RPE9', '2min'],
                ['RDL', '4×8 @RPE8', '90s'],
                ['Bulgarian Split Squat', '4×10/side @RPE8', '90s'],
                ['Hip Thrust', '5×10 @RPE8', '90s'],
                ['Leg Curl+Ext Superset', '4×12+12', '90s'],
                ['Calf Raise', '5×20', '45s'],
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
        @media (max-width: 640px) {
          .flat-schedule-grid-w8 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
