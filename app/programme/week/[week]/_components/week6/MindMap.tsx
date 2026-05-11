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
  'Bench Press 4×6 @RPE8 FILM',
  'Incline DB 4×10',
  'OHP 4×8 @RPE8',
  'Cable Fly 3×15',
  'Lateral Raise 4×15 (drop weight)',
  'Tricep Superset 3×12+12',
]

const pullExercises = [
  'Deadlift 4×5 @RPE8 FILM',
  'Pull-Up/Pulldown 4×8',
  'Chest Supported Row 4×10',
  'Face Pull 4×20',
  'Curl Superset EZ+Hammer 3×10+10',
]

const legsExercises = [
  'Back Squat 4×6 @RPE8 FILM BOTH',
  'RDL 4×10',
  'Bulgarian Split Squat 4×10/side',
  'Hip Thrust 4×12 @RPE8',
  'Leg Curl+Leg Ext Superset 3×12+12',
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

  const plainText = `WEEK 6 SCHEDULE · FORM AUDIT WEEK

PUSH — MON & FRI
Bench Press · 4×6 @RPE8 · 2min · FILM
Incline DB · 4×10 @RPE7 · 90s
OHP · 4×8 @RPE8 · 90s
Cable Fly · 3×15 @RPE7 · 60s
Lateral Raise · 4×15 @RPE7 · 60s (drop 2.5kg)
Tricep Superset (Pushdown+Overhead) · 3×12+12 · 90s

PULL — TUE & SAT
Deadlift · 4×5 @RPE8 · 2min · FILM
Pull-Up or Pulldown · 4×8 @RPE8 · 90s
Chest Supported Row · 4×10 @RPE7 · 90s
Face Pull · 4×20 · 60s
Curl Superset (EZ+Hammer) · 3×10+10 · 90s

LEGS — WED
Back Squat · 4×6 @RPE8 · 2min · FILM BOTH ANGLES
RDL · 4×10 @RPE7 · 90s
Bulgarian Split Squat · 4×10/side @RPE7 · 90s
Hip Thrust · 4×12 @RPE8 · 90s
Leg Curl+Leg Extension Superset · 3×12+12 · 90s`

  function handleCopy() {
    navigator.clipboard.writeText(plainText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // PPL layout: Push left, Pull top-right, Legs bottom-right
  // Central node
  const cx = 370, cy = 330, cw = 340, ch = 58

  // Session nodes
  const pushX = 20, pushY = 80, pushW = 270, pushH = 175
  const pullX = 790, pullY = 60, pullW = 290, pullH = 165
  const legsX = 790, legsY = 510, legsW = 290, legsH = 175

  // Callout positions
  const c1X = 380, c1Y = 22, c1W = 320, c1H = 96    // top — weak links
  const c2X = 380, c2Y = 430, c2W = 320, c2H = 80   // below center — supersets
  const c3X = 20, c3Y = 500, c3W = 290, c3H = 80    // bottom-left — make sure
  const c4X = 20, c4Y = 620, c4W = 290, c4H = 96    // far bottom-left — chest supported

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
          aria-label="Week 6 training mind map — Push Pull Legs"
        >
          <defs>
            <filter id="glow6">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="nodeShadow6">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="var(--accent)" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Connector lines */}
          {/* Center left → PUSH */}
          <line x1={cx} y1={cy + ch / 2} x2={pushX + pushW} y2={pushY + pushH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow6)" />
          {/* Center right-top → PULL */}
          <line x1={cx + cw} y1={cy + ch / 3} x2={pullX} y2={pullY + pullH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow6)" />
          {/* Center right-bottom → LEGS */}
          <line x1={cx + cw} y1={cy + ch * 2 / 3} x2={legsX} y2={legsY + legsH / 2}
            stroke={LINE_COLOR} strokeWidth={1.4} filter="url(#glow6)" />
          {/* Center top → callout 1 */}
          <line x1={cx + cw / 2} y1={cy} x2={c1X + c1W / 2} y2={c1Y + c1H}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          {/* Center bottom → callout 2 */}
          <line x1={cx + cw / 2} y1={cy + ch} x2={c2X + c2W / 2} y2={c2Y}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          {/* Push bottom → callout 3 */}
          <line x1={pushX + pushW / 2} y1={pushY + pushH} x2={c3X + c3W / 2} y2={c3Y}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />
          {/* Callout3 → callout4 */}
          <line x1={c3X + c3W / 2} y1={c3Y + c3H} x2={c4X + c4W / 2} y2={c4Y}
            stroke={LINE_COLOR} strokeWidth={1.2} strokeDasharray="4 3" />

          {/* Central node */}
          <g filter="url(#nodeShadow6)">
            <rect x={cx} y={cy} width={cw} height={ch} rx={12}
              fill={NODE_BG} stroke={NODE_BORDER} strokeWidth={1.8} />
          </g>
          <text x={cx + cw / 2} y={cy + 22} textAnchor="middle"
            fill={TEXT_MUTED} fontSize={9.5} fontWeight={700} letterSpacing="0.1em"
            fontFamily="DM Sans, sans-serif">
            WEEK 6
          </text>
          <text x={cx + cw / 2} y={cy + 42} textAnchor="middle"
            fill={TEXT_MAIN} fontSize={13} fontWeight={700} letterSpacing="0.04em"
            fontFamily="DM Sans, sans-serif">
            FORM AUDIT · SAME SPLIT
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
            label="WEAK LINKS →"
            body={[
              'Squat: depth, knee tracking, lower back.',
              'Deadlift: bar path, hip position, back neutrality.',
              'Bench: bar path, elbow angle.',
              'Row: are lats working or lower back?',
            ]} />

          <CalloutBubble x={c2X} y={c2Y} w={c2W} h={c2H}
            pointerDir="up"
            label="SUPERSETS THIS WEEK →"
            body={[
              'Two exercises back-to-back with no rest between.',
              'Then rest. Point is fatigue accumulation — not',
              'maximum load. Go lighter than you think.',
            ]} />

          <CalloutBubble x={c3X} y={c3Y} w={c3W} h={c3H}
            pointerDir="up"
            label="MAKE SURE YOU →"
            body={[
              'Film from the side for squat and deadlift.',
              'Film from the front too for the squat.',
              'You will see knee tracking in a way you cannot feel.',
            ]} />

          <CalloutBubble x={c4X} y={c4Y} w={c4W} h={c4H}
            pointerDir="up"
            label="CHEST SUPPORTED ROW →"
            body={[
              'Face down on incline bench.',
              'Row from there. Your lower back cannot',
              'compensate. Pure back work.',
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
        }} className="flat-schedule-grid-w6">
          {[
            {
              day: 'PUSH', session: 'Mon & Fri',
              rows: [
                ['Bench Press', '4×6 @RPE8', '2min · FILM'],
                ['Incline DB', '4×10 @RPE7', '90s'],
                ['OHP', '4×8 @RPE8', '90s'],
                ['Cable Fly', '3×15 @RPE7', '60s'],
                ['Lateral Raise', '4×15 @RPE7', '60s'],
                ['Tricep Superset', '3×12+12', '90s'],
              ],
            },
            {
              day: 'PULL', session: 'Tue & Sat',
              rows: [
                ['Deadlift', '4×5 @RPE8', '2min · FILM'],
                ['Pull-Up/Pulldown', '4×8 @RPE8', '90s'],
                ['Chest Supported Row', '4×10 @RPE7', '90s'],
                ['Face Pull', '4×20', '60s'],
                ['Curl Superset EZ+Hammer', '3×10+10', '90s'],
              ],
            },
            {
              day: 'LEGS', session: 'Wed',
              rows: [
                ['Back Squat', '4×6 @RPE8', '2min · FILM'],
                ['RDL', '4×10 @RPE7', '90s'],
                ['Bulgarian Split Squat', '4×10/side @RPE7', '90s'],
                ['Hip Thrust', '4×12 @RPE8', '90s'],
                ['Leg Curl+Ext Superset', '3×12+12', '90s'],
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
          .flat-schedule-grid-w6 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
