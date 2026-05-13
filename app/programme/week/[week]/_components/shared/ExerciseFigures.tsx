// app/programme/week/[week]/_components/shared/ExerciseFigures.tsx
//
// Drop-in library of cleaner anatomical mannequin SVGs for ALL Programme exercises.
// Each existing weekN/ExerciseBreakdowns.tsx file should import the figure it needs
// from here rather than redefining it inline.
//
// Style rules:
//   – Filled body silhouettes (no stick figures, no exposed joint dots)
//   – Target muscle highlighted in accent over the silhouette
//   – Equipment is recognisable (kettlebells with handles, barbells with plates etc.)
//   – Soft motion arrow on the side showing rep direction
//   – Always returns a 200×280 SVG with a centered tag line
//
// Colors are CSS vars so the file reuses the existing notebook theme.

import * as React from 'react'

const INK = 'var(--ink)'                    // #1F1B16
const INK_SOFT = 'var(--ink-soft)'          // #4A413A
const INK_MUTED = 'var(--ink-muted)'        // #8A7E6F
const ACCENT = 'var(--accent)'              // #B8543A
const PAPER_DEEP = 'var(--paper-deep)'      // #F2EDE2
const PAPER_EDGE = 'var(--paper-edge)'      // #E6DFCE
const BODY = 'rgba(31,27,22,0.12)'
const BODY_DARK = 'rgba(31,27,22,0.22)'
const MUSCLE = 'rgba(184,84,58,0.34)'
const EQUIP = 'rgba(31,27,22,0.55)'
const EQUIP_SOFT = 'rgba(31,27,22,0.18)'

// ─── Shared parts ────────────────────────────────────────────────────────────

function Floor({ y = 248 }: { y?: number }) {
  return (
    <g>
      <line x1={6} y1={y} x2={194} y2={y} stroke={PAPER_EDGE} strokeWidth={1.2} />
      <line x1={6} y1={y + 3} x2={194} y2={y + 3} stroke={PAPER_EDGE} strokeWidth={0.5} strokeDasharray="3 3" />
    </g>
  )
}

function Tag({ children, y = 268 }: { children: React.ReactNode; y?: number }) {
  return (
    <text x={100} y={y} textAnchor="middle" fontSize={9} fill={ACCENT}
      fontFamily="JetBrains Mono, monospace" fontWeight={600} letterSpacing="0.16em">
      {children}
    </text>
  )
}

function MotionArrow({ d, label }: { d: string; label?: string }) {
  return (
    <g opacity={0.65}>
      <path d={d} stroke={ACCENT} strokeWidth={1.4} fill="none"
        markerEnd="url(#arrowhead)" strokeLinecap="round" />
      {label && (
        <text x={d.includes('170') ? 178 : 22} y={d.split(',')[1]?.split(' ')[0] || 130}
          fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.08em">{label}</text>
      )}
    </g>
  )
}

function Defs() {
  return (
    <defs>
      <marker id="arrowhead" viewBox="0 0 10 10" refX={8} refY={5}
        markerWidth={5} markerHeight={5} orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 Z" fill={ACCENT} />
      </marker>
      <linearGradient id="kbGrad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#3a3531" />
        <stop offset="1" stopColor="#1F1B16" />
      </linearGradient>
    </defs>
  )
}

// Mannequin head + hair — used everywhere
function Head({ cx, cy, r = 11, side }: { cx: number; cy: number; r?: number; side?: 'L' | 'R' }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={BODY} />
      {/* Hair bun for front view, swept for side view */}
      {side === 'L'
        ? <path d={`M ${cx - r * 0.8} ${cy - r * 0.6} Q ${cx} ${cy - r * 1.4} ${cx + r * 0.4} ${cy - r * 0.4}`}
            fill={BODY_DARK} stroke="none" />
        : side === 'R'
        ? <path d={`M ${cx + r * 0.8} ${cy - r * 0.6} Q ${cx} ${cy - r * 1.4} ${cx - r * 0.4} ${cy - r * 0.4}`}
            fill={BODY_DARK} stroke="none" />
        : <path d={`M ${cx - r * 0.85} ${cy - r * 0.55} Q ${cx} ${cy - r * 1.35} ${cx + r * 0.85} ${cy - r * 0.55} L ${cx + r * 0.6} ${cy - r * 0.25} Q ${cx} ${cy - r * 0.85} ${cx - r * 0.6} ${cy - r * 0.25} Z`}
            fill={BODY_DARK} stroke="none" />}
    </g>
  )
}

// ─── 01. GOBLET SQUAT — photo ────────────────────────────────────────────────
export function GobletSquatFig() {
  return (
    <div style={{ width: '100%', maxWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <img
        src="/goblet-squat.png"
        alt="Goblet Squat"
        style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 4 }}
      />
      <span style={{
        fontSize: 9, fontWeight: 600, color: 'var(--accent)',
        fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.16em', textTransform: 'uppercase',
      }}>
        QUADS · GLUTES
      </span>
    </div>
  )
}

// ─── 02. ROMANIAN DEADLIFT (DB) — side view, hip hinge ──────────────────────
export function RDLDumbbellFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Back leg outline (further) */}
      <path d="M 116 156 Q 122 200 118 240 L 130 240 Q 134 200 128 154 Z" fill={BODY} opacity={0.55} />
      {/* Hamstring/glute target */}
      <path d="M 96 152 Q 92 180 92 230 L 116 230 Q 116 180 114 150 Z" fill={MUSCLE} />
      {/* Front leg silhouette */}
      <path d="M 100 152 Q 96 200 100 240 L 116 240 Q 118 200 116 150 Z" fill={BODY} />
      {/* Glute round */}
      <ellipse cx={112} cy={148} rx={16} ry={10} fill={MUSCLE} />
      {/* Torso hinged forward */}
      <path d="M 76 70 Q 64 100 100 152 Q 116 154 124 142 Q 100 100 92 70 Q 84 64 76 70 Z" fill={BODY} />
      {/* Lat highlight */}
      <path d="M 78 76 Q 72 100 96 132 Q 100 134 100 128 Q 86 100 84 76 Z" fill={MUSCLE} opacity={0.6} />
      {/* Head — neutral spine */}
      <Head cx={68} cy={56} side="L" />
      <rect x={70} y={66} width={6} height={9} rx={2} fill={BODY} transform="rotate(20 73 70)" />
      {/* Arms straight down from shoulders */}
      <path d="M 76 78 Q 70 110 66 148 L 80 152 Q 82 110 84 80 Z" fill={BODY} />
      <path d="M 88 80 Q 88 110 90 150 L 100 152 Q 98 110 96 80 Z" fill={BODY} opacity={0.65} />
      {/* Dumbbells in hands */}
      <g>
        <rect x={62} y={148} width={22} height={8} rx={2} fill={EQUIP} />
        <rect x={58} y={142} width={6} height={20} rx={2} fill={EQUIP} />
        <rect x={82} y={142} width={6} height={20} rx={2} fill={EQUIP} />
      </g>
      <g opacity={0.7}>
        <rect x={86} y={150} width={18} height={6} rx={2} fill={EQUIP} />
        <rect x={82} y={146} width={5} height={14} rx={2} fill={EQUIP} />
        <rect x={103} y={146} width={5} height={14} rx={2} fill={EQUIP} />
      </g>
      {/* Motion arrow — hinge */}
      <path d="M 168 80 Q 184 120 168 160" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={172} y={124} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">HINGE</text>
      <Floor y={244} />
      <Tag>HAMSTRINGS · GLUTES</Tag>
    </svg>
  )
}

// ─── 03. HIP THRUST (BW) — side view, top position ──────────────────────────
export function HipThrustBWFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Bench */}
      <rect x={12} y={154} width={82} height={20} rx={4} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      <rect x={16} y={156} width={74} height={6} rx={2} fill="rgba(255,255,255,0.18)" />
      <line x1={22} y1={174} x2={20} y2={220} stroke={INK_MUTED} strokeWidth={1.4} />
      <line x1={88} y1={174} x2={90} y2={220} stroke={INK_MUTED} strokeWidth={1.4} />
      {/* Far thigh (depth) */}
      <path d="M 142 122 Q 156 160 162 186 L 174 184 Q 168 156 156 116 Z" fill={BODY} opacity={0.55} />
      {/* Glute (target) — apex */}
      <ellipse cx={140} cy={116} rx={22} ry={14} fill={MUSCLE} />
      {/* Body bridge */}
      <path d="M 36 142 Q 60 130 110 122 Q 140 116 150 122 Q 152 138 134 142 Q 96 152 50 158 Q 32 156 36 142 Z" fill={BODY} />
      {/* Near thigh */}
      <path d="M 138 124 Q 152 162 158 188 L 144 192 Q 138 162 130 126 Z" fill={BODY} />
      {/* Shin */}
      <path d="M 144 192 Q 146 220 148 240 L 162 238 Q 162 218 160 188 Z" fill={BODY} />
      {/* Foot */}
      <ellipse cx={154} cy={242} rx={14} ry={4} fill={INK_SOFT} />
      <ellipse cx={170} cy={242} rx={11} ry={3} fill={INK_SOFT} opacity={0.5} />
      {/* Head on bench */}
      <Head cx={32} cy={132} side="L" />
      {/* Arms on thigh */}
      <path d="M 82 138 Q 100 144 124 150 L 122 158 Q 96 154 82 148 Z" fill={BODY} />
      {/* Motion arrow */}
      <path d="M 178 168 L 178 130" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={170} y={170} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">SQUEEZE</text>
      <Floor y={244} />
      <Tag>GLUTES (ALL THREE)</Tag>
    </svg>
  )
}

// ─── 04. HIP THRUST LOADED — barbell across hips ────────────────────────────
export function HipThrustLoadedFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      <rect x={12} y={154} width={82} height={20} rx={4} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      <line x1={22} y1={174} x2={20} y2={220} stroke={INK_MUTED} strokeWidth={1.4} />
      <line x1={88} y1={174} x2={90} y2={220} stroke={INK_MUTED} strokeWidth={1.4} />
      <ellipse cx={140} cy={114} rx={22} ry={14} fill={MUSCLE} />
      <path d="M 36 142 Q 60 130 110 122 Q 140 116 150 122 Q 152 138 134 142 Q 96 152 50 158 Q 32 156 36 142 Z" fill={BODY} />
      <path d="M 138 124 Q 152 162 158 188 L 144 192 Q 138 162 130 126 Z" fill={BODY} />
      <path d="M 144 192 Q 146 220 148 240 L 162 238 Q 162 218 160 188 Z" fill={BODY} />
      <ellipse cx={154} cy={242} rx={14} ry={4} fill={INK_SOFT} />
      <Head cx={32} cy={132} side="L" />
      {/* Barbell across hips */}
      <line x1={36} y1={108} x2={184} y2={108} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      {/* Plates */}
      <ellipse cx={34} cy={108} rx={4} ry={14} fill="url(#kbGrad)" stroke={INK} strokeWidth={1} />
      <ellipse cx={42} cy={108} rx={3} ry={10} fill="url(#kbGrad)" />
      <ellipse cx={184} cy={108} rx={4} ry={14} fill="url(#kbGrad)" stroke={INK} strokeWidth={1} />
      <ellipse cx={176} cy={108} rx={3} ry={10} fill="url(#kbGrad)" />
      {/* Hands gripping bar */}
      <rect x={78} y={104} width={8} height={10} rx={2} fill={BODY_DARK} />
      <rect x={134} y={104} width={8} height={10} rx={2} fill={BODY_DARK} />
      {/* Motion arrow */}
      <path d="M 178 170 L 178 132" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <Floor y={244} />
      <Tag>GLUTES · LOADED</Tag>
    </svg>
  )
}

// ─── 05. SEATED CABLE ROW — side view, end position ──────────────────────────
export function SeatedRowFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Cable machine column (right) */}
      <rect x={170} y={50} width={10} height={130} rx={2} fill={EQUIP_SOFT} stroke={INK_MUTED} strokeWidth={1} />
      <circle cx={175} cy={58} r={5} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      {/* Foot plate */}
      <rect x={160} y={166} width={20} height={36} rx={3} fill={EQUIP_SOFT} stroke={INK_MUTED} strokeWidth={1} />
      {/* Seat */}
      <rect x={64} y={180} width={84} height={14} rx={3} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      {/* Lat target highlight (back) */}
      <path d="M 76 72 Q 70 110 76 160 Q 86 162 92 158 Q 92 110 86 72 Z" fill={MUSCLE} />
      {/* Torso upright */}
      <path d="M 80 64 Q 72 100 80 178 Q 100 184 120 178 Q 128 100 120 64 Q 100 58 80 64 Z" fill={BODY} />
      {/* Thighs horizontal */}
      <path d="M 96 180 Q 126 180 158 184 L 158 192 Q 126 196 96 192 Z" fill={BODY} />
      {/* Shins down */}
      <path d="M 154 184 Q 160 200 162 218 L 174 216 Q 170 200 166 184 Z" fill={BODY} />
      {/* Head facing right */}
      <Head cx={100} cy={42} side="R" />
      <rect x={96} y={54} width={8} height={10} rx={3} fill={BODY} />
      {/* Pulling arm — elbow back behind torso */}
      <path d="M 82 76 Q 60 110 58 138 L 70 142 Q 76 110 92 78 Z" fill={BODY} />
      <path d="M 58 138 Q 70 152 92 158 L 92 168 Q 66 162 52 144 Z" fill={BODY} />
      {/* Handle */}
      <rect x={86} y={158} width={14} height={10} rx={2} fill={EQUIP} />
      {/* Cable */}
      <line x1={100} y1={163} x2={175} y2={62} stroke={ACCENT} strokeWidth={1.2} strokeDasharray="4 3" opacity={0.7} />
      {/* Motion arrow */}
      <path d="M 22 150 L 60 150" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={22} y={140} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">PULL</text>
      <Floor y={232} />
      <Tag>LATS · RHOMBOIDS</Tag>
    </svg>
  )
}

// ─── 06. DEAD BUG — top-down on floor ───────────────────────────────────────
export function DeadBugFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Floor (mat) */}
      <rect x={20} y={84} width={160} height={120} rx={6} fill={PAPER_DEEP} stroke={PAPER_EDGE} strokeWidth={1.2} />
      {/* Core target highlight box */}
      <path d="M 80 122 Q 100 118 124 122 L 124 168 Q 100 172 80 168 Z" fill={MUSCLE} />
      {/* Torso top-down */}
      <path d="M 64 124 Q 56 144 64 166 Q 90 174 124 172 Q 154 168 152 144 Q 154 122 124 118 Q 90 116 64 124 Z" fill={BODY} />
      {/* Head at left */}
      <Head cx={42} cy={146} />
      {/* Active arm extending overhead */}
      <path d="M 78 124 Q 70 96 60 64 L 74 60 Q 84 96 92 122 Z" fill={BODY} />
      <ellipse cx={60} cy={56} rx={9} ry={6} fill={BODY_DARK} />
      {/* Resting arm at side */}
      <path d="M 90 168 Q 96 184 102 196 L 116 192 Q 110 178 102 168 Z" fill={BODY} opacity={0.6} />
      {/* Resting bent leg */}
      <path d="M 142 124 Q 152 110 156 88 L 168 92 Q 162 116 154 130 Z" fill={BODY} opacity={0.6} />
      {/* Active leg extending */}
      <path d="M 138 170 Q 156 188 184 196 L 184 208 Q 154 204 134 184 Z" fill={BODY} />
      <ellipse cx={186} cy={202} rx={9} ry={6} fill={BODY_DARK} />
      {/* Lower-back-flat indicator */}
      <line x1={88} y1={148} x2={124} y2={148} stroke={ACCENT} strokeWidth={1.2} strokeDasharray="3 2" opacity={0.6} />
      <text x={106} y={224} textAnchor="middle" fontSize={9} fill={INK_MUTED} fontFamily="Inter, sans-serif">
        lower back stays flat
      </text>
      <Tag>DEEP CORE</Tag>
    </svg>
  )
}

// ─── 07. BARBELL BACK SQUAT — front view ────────────────────────────────────
export function BackSquatFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Barbell */}
      <line x1={20} y1={66} x2={180} y2={66} stroke={INK} strokeWidth={3.5} strokeLinecap="round" />
      <ellipse cx={18} cy={66} rx={6} ry={20} fill="url(#kbGrad)" stroke={INK} strokeWidth={1} />
      <ellipse cx={28} cy={66} rx={4} ry={14} fill="url(#kbGrad)" />
      <ellipse cx={182} cy={66} rx={6} ry={20} fill="url(#kbGrad)" stroke={INK} strokeWidth={1} />
      <ellipse cx={172} cy={66} rx={4} ry={14} fill="url(#kbGrad)" />
      {/* Torso */}
      <path d="M 80 64 Q 72 96 84 138 Q 100 142 116 138 Q 128 96 120 64 Q 100 58 80 64 Z" fill={BODY} />
      {/* Quads target */}
      <path d="M 80 134 Q 64 158 54 196 L 78 200 Q 90 168 100 142 Q 110 168 122 200 L 146 196 Q 136 158 120 134 Q 100 138 80 134 Z" fill={MUSCLE} />
      {/* Thighs */}
      <path d="M 82 134 Q 70 158 60 196 L 76 200 Q 88 168 100 142 Q 112 168 124 200 L 140 196 Q 130 158 118 134 Q 100 138 82 134 Z" fill={BODY} opacity={0.5} />
      {/* Shins */}
      <path d="M 60 196 Q 56 220 56 238 L 76 238 Q 78 220 76 200 Z" fill={BODY} />
      <path d="M 140 196 Q 144 220 144 238 L 124 238 Q 122 220 124 200 Z" fill={BODY} />
      <ellipse cx={66} cy={244} rx={14} ry={4} fill={INK_SOFT} />
      <ellipse cx={134} cy={244} rx={14} ry={4} fill={INK_SOFT} />
      {/* Head */}
      <Head cx={100} cy={42} />
      {/* Arms holding bar overhead-back */}
      <path d="M 80 66 Q 56 70 38 72 L 36 60 Q 60 56 80 58 Z" fill={BODY} />
      <path d="M 120 66 Q 144 70 162 72 L 164 60 Q 140 56 120 58 Z" fill={BODY} />
      {/* Motion arrow */}
      <path d="M 174 158 L 174 110" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={180} y={138} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">UP</text>
      <Floor y={248} />
      <Tag>QUADS · GLUTES</Tag>
    </svg>
  )
}

// ─── 08. BARBELL RDL — side view ────────────────────────────────────────────
export function BarbellRDLFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Legs */}
      <path d="M 96 152 Q 92 200 92 240 L 116 240 Q 116 200 116 150 Z" fill={MUSCLE} />
      <path d="M 100 152 Q 96 200 100 240 L 116 240 Q 118 200 114 150 Z" fill={BODY} />
      <ellipse cx={114} cy={148} rx={16} ry={10} fill={MUSCLE} />
      {/* Torso hinged */}
      <path d="M 76 70 Q 64 100 100 152 Q 116 154 124 142 Q 100 100 92 70 Q 84 64 76 70 Z" fill={BODY} />
      <path d="M 78 76 Q 72 100 96 132 Q 100 134 100 128 Q 86 100 84 76 Z" fill={MUSCLE} opacity={0.6} />
      <Head cx={68} cy={56} side="L" />
      {/* Arms hanging */}
      <path d="M 76 78 Q 70 110 66 148 L 80 152 Q 82 110 84 80 Z" fill={BODY} />
      {/* Barbell at shins */}
      <line x1={28} y1={150} x2={120} y2={150} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <ellipse cx={26} cy={150} rx={6} ry={18} fill="url(#kbGrad)" stroke={INK} strokeWidth={1} />
      <ellipse cx={36} cy={150} rx={4} ry={12} fill="url(#kbGrad)" />
      <ellipse cx={122} cy={150} rx={5} ry={14} fill="url(#kbGrad)" stroke={INK} strokeWidth={1} opacity={0.7} />
      {/* Motion */}
      <path d="M 170 88 Q 184 130 168 168" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <Floor y={244} />
      <Tag>HAMSTRINGS · GLUTES</Tag>
    </svg>
  )
}

// ─── 09. BENCH PRESS — side view, locked out ────────────────────────────────
export function BenchPressFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Bench */}
      <rect x={20} y={170} width={140} height={14} rx={3} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      <line x1={28} y1={184} x2={26} y2={222} stroke={INK_MUTED} strokeWidth={1.4} />
      <line x1={152} y1={184} x2={154} y2={222} stroke={INK_MUTED} strokeWidth={1.4} />
      {/* Lying body — torso flat */}
      <path d="M 32 152 Q 32 142 50 138 Q 80 134 110 142 Q 120 152 116 168 Q 80 170 40 168 Q 28 166 32 152 Z" fill={BODY} />
      {/* Chest target */}
      <path d="M 60 142 Q 86 138 102 146 Q 102 158 86 158 Q 64 158 60 148 Z" fill={MUSCLE} />
      {/* Head off bench end */}
      <Head cx={26} cy={150} side="L" />
      {/* Legs bent, feet on floor */}
      <path d="M 110 162 Q 130 174 144 194 L 132 200 Q 116 184 100 168 Z" fill={BODY} />
      <path d="M 138 198 Q 144 222 144 240 L 158 238 Q 158 220 152 196 Z" fill={BODY} />
      <ellipse cx={152} cy={244} rx={14} ry={4} fill={INK_SOFT} />
      {/* Arms pressing up */}
      <path d="M 76 140 Q 76 106 76 80 L 88 80 Q 90 106 90 140 Z" fill={BODY} />
      <path d="M 92 140 Q 92 106 92 80 L 104 80 Q 102 106 102 140 Z" fill={BODY} opacity={0.6} />
      {/* Barbell */}
      <line x1={16} y1={76} x2={184} y2={76} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <ellipse cx={14} cy={76} rx={5} ry={18} fill="url(#kbGrad)" stroke={INK} strokeWidth={1} />
      <ellipse cx={24} cy={76} rx={3.5} ry={12} fill="url(#kbGrad)" />
      <ellipse cx={186} cy={76} rx={5} ry={18} fill="url(#kbGrad)" stroke={INK} strokeWidth={1} />
      <ellipse cx={176} cy={76} rx={3.5} ry={12} fill="url(#kbGrad)" />
      {/* Hands on bar */}
      <rect x={72} y={72} width={8} height={10} rx={2} fill={BODY_DARK} />
      <rect x={120} y={72} width={8} height={10} rx={2} fill={BODY_DARK} />
      {/* Motion */}
      <path d="M 182 132 L 182 92" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={172} y={134} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">PRESS</text>
      <Floor y={248} />
      <Tag>CHEST · FRONT DELT</Tag>
    </svg>
  )
}

// ─── 10. BARBELL ROW — side view ────────────────────────────────────────────
export function BarbellRowFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Legs (mostly straight, soft bend) */}
      <path d="M 110 160 Q 108 200 106 240 L 122 240 Q 124 200 124 160 Z" fill={BODY} />
      <path d="M 100 158 Q 96 200 98 240 L 110 240 Q 112 200 114 158 Z" fill={BODY} opacity={0.6} />
      {/* Torso hinged ~50° */}
      <path d="M 60 84 Q 50 116 96 168 Q 116 168 124 156 Q 96 116 84 84 Q 72 78 60 84 Z" fill={BODY} />
      {/* Lat target */}
      <path d="M 62 92 Q 54 124 88 150 Q 96 152 96 144 Q 76 124 72 92 Z" fill={MUSCLE} />
      <Head cx={56} cy={66} side="L" />
      {/* Pulling arms — elbow high, hands by ribcage */}
      <path d="M 60 90 Q 40 116 32 148 L 46 154 Q 58 124 72 96 Z" fill={BODY} />
      <path d="M 32 148 Q 50 156 80 152 L 80 162 Q 48 168 26 158 Z" fill={BODY} />
      <path d="M 76 92 Q 84 120 96 144 L 86 150 Q 72 124 64 96 Z" fill={BODY} opacity={0.65} />
      {/* Barbell — held under chest */}
      <line x1={14} y1={156} x2={120} y2={156} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <ellipse cx={12} cy={156} rx={5} ry={16} fill="url(#kbGrad)" stroke={INK} strokeWidth={1} />
      <ellipse cx={22} cy={156} rx={3.5} ry={11} fill="url(#kbGrad)" />
      <ellipse cx={122} cy={156} rx={4} ry={13} fill="url(#kbGrad)" stroke={INK} strokeWidth={1} opacity={0.7} />
      {/* Motion */}
      <path d="M 24 184 L 60 158" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={20} y={196} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">ROW</text>
      <Floor y={244} />
      <Tag>LATS · RHOMBOIDS</Tag>
    </svg>
  )
}

// ─── 11. BULGARIAN SPLIT SQUAT — side view ──────────────────────────────────
export function BulgarianSplitSquatFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Bench behind */}
      <rect x={120} y={148} width={70} height={14} rx={3} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      <line x1={128} y1={162} x2={126} y2={194} stroke={INK_MUTED} strokeWidth={1.4} />
      {/* Front thigh target */}
      <path d="M 56 132 Q 44 168 38 210 L 58 214 Q 64 178 72 138 Z" fill={MUSCLE} />
      {/* Front leg */}
      <path d="M 58 132 Q 50 168 44 210 L 62 214 Q 68 178 74 136 Z" fill={BODY} opacity={0.6} />
      <path d="M 44 210 Q 44 230 44 244 L 62 244 Q 64 230 62 214 Z" fill={BODY} />
      <ellipse cx={50} cy={250} rx={14} ry={4} fill={INK_SOFT} />
      {/* Rear leg */}
      <path d="M 78 134 Q 96 142 130 152 L 130 160 Q 96 156 76 144 Z" fill={BODY} opacity={0.65} />
      {/* Foot on bench */}
      <ellipse cx={144} cy={148} rx={12} ry={4} fill={INK_SOFT} opacity={0.7} />
      {/* Torso upright */}
      <path d="M 64 64 Q 56 98 64 136 Q 80 140 96 136 Q 100 98 92 64 Q 78 58 64 64 Z" fill={BODY} />
      {/* Glute */}
      <ellipse cx={84} cy={132} rx={14} ry={8} fill={MUSCLE} />
      <Head cx={76} cy={40} side="R" />
      {/* Arms at sides */}
      <path d="M 60 70 Q 50 100 48 140 L 60 140 Q 62 100 68 76 Z" fill={BODY} />
      {/* Motion */}
      <path d="M 178 120 L 178 80" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <Floor y={248} />
      <text x={100} y={258} textAnchor="middle" fontSize={8} fill={INK_MUTED} fontFamily="Inter, sans-serif">bodyweight</text>
      <Tag y={270}>QUADS · GLUTES</Tag>
    </svg>
  )
}

// ─── 12. FACE PULL — front view at cable ────────────────────────────────────
export function FacePullFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Pulley high right */}
      <rect x={170} y={50} width={10} height={18} rx={2} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      <circle cx={175} cy={70} r={4} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.2} />
      {/* Torso */}
      <path d="M 76 70 Q 68 104 76 168 Q 96 174 116 168 Q 124 104 116 70 Q 96 64 76 70 Z" fill={BODY} />
      {/* Rear delts highlight */}
      <ellipse cx={76} cy={84} rx={10} ry={7} fill={MUSCLE} />
      <ellipse cx={116} cy={84} rx={10} ry={7} fill={MUSCLE} />
      <Head cx={96} cy={48} />
      {/* Arms — elbows high, pulled to ears */}
      <path d="M 76 84 Q 56 70 38 60 L 42 50 Q 64 56 80 76 Z" fill={BODY} />
      <path d="M 38 60 Q 60 76 78 96 L 70 102 Q 50 84 32 70 Z" fill={BODY} />
      <path d="M 116 84 Q 136 70 154 60 L 150 50 Q 128 56 112 76 Z" fill={BODY} />
      <path d="M 154 60 Q 132 76 114 96 L 122 102 Q 142 84 160 70 Z" fill={BODY} />
      {/* Rope handles */}
      <path d="M 70 102 Q 96 96 122 102" stroke={INK_MUTED} strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* Cable to pulley */}
      <line x1={120} y1={102} x2={175} y2={72} stroke={ACCENT} strokeDasharray="4 3" strokeWidth={1.2} opacity={0.7} />
      {/* Legs */}
      <path d="M 78 168 Q 70 200 68 240 L 84 240 Q 86 200 88 168 Z" fill={BODY} />
      <path d="M 114 168 Q 116 200 116 240 L 132 240 Q 130 200 124 168 Z" fill={BODY} />
      <ellipse cx={76} cy={246} rx={12} ry={4} fill={INK_SOFT} />
      <ellipse cx={124} cy={246} rx={12} ry={4} fill={INK_SOFT} />
      {/* Motion */}
      <path d="M 24 110 L 60 100" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <Floor y={250} />
      <Tag>REAR DELT · ROTATORS</Tag>
    </svg>
  )
}

// ─── 13. LAT PULLDOWN — front view ──────────────────────────────────────────
export function LatPulldownFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Cable to ceiling */}
      <line x1={100} y1={20} x2={100} y2={64} stroke={INK_MUTED} strokeWidth={1.5} />
      <rect x={92} y={14} width={16} height={8} rx={2} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1} />
      {/* Bar */}
      <line x1={40} y1={68} x2={160} y2={68} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      <line x1={50} y1={68} x2={42} y2={84} stroke={INK} strokeWidth={2.5} />
      <line x1={150} y1={68} x2={158} y2={84} stroke={INK} strokeWidth={2.5} />
      {/* Torso */}
      <path d="M 80 100 Q 72 140 80 196 Q 100 200 120 196 Q 128 140 120 100 Q 100 94 80 100 Z" fill={BODY} />
      {/* Lat target */}
      <path d="M 78 108 Q 70 144 80 184 Q 86 186 88 178 Q 84 144 84 108 Z" fill={MUSCLE} />
      <path d="M 122 108 Q 130 144 120 184 Q 114 186 112 178 Q 116 144 116 108 Z" fill={MUSCLE} />
      <Head cx={100} cy={78} />
      {/* Arms reaching up */}
      <path d="M 80 102 Q 60 92 44 80 L 48 70 Q 68 82 86 96 Z" fill={BODY} />
      <path d="M 120 102 Q 140 92 156 80 L 152 70 Q 132 82 114 96 Z" fill={BODY} />
      {/* Seat / thigh pad */}
      <rect x={64} y={196} width={72} height={12} rx={3} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      {/* Thighs */}
      <path d="M 80 208 Q 78 230 78 240 L 96 240 Q 98 220 96 208 Z" fill={BODY} />
      <path d="M 120 208 Q 122 230 122 240 L 104 240 Q 102 220 104 208 Z" fill={BODY} />
      {/* Knee pad */}
      <rect x={84} y={216} width={32} height={10} rx={2} fill={EQUIP_SOFT} stroke={INK_MUTED} strokeWidth={1} />
      {/* Motion */}
      <path d="M 178 90 L 178 130" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={180} y={158} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">PULL</text>
      <Floor y={244} />
      <Tag>LATS · MID BACK</Tag>
    </svg>
  )
}

// ─── 14. DB SHOULDER PRESS — front view ─────────────────────────────────────
export function DbShoulderPressFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Torso seated */}
      <path d="M 80 70 Q 72 110 80 174 Q 100 178 120 174 Q 128 110 120 70 Q 100 64 80 70 Z" fill={BODY} />
      {/* Delts highlight */}
      <ellipse cx={78} cy={78} rx={11} ry={8} fill={MUSCLE} />
      <ellipse cx={122} cy={78} rx={11} ry={8} fill={MUSCLE} />
      <Head cx={100} cy={48} />
      {/* Arms pressed up — bent overhead */}
      <path d="M 78 80 Q 62 64 56 38 L 70 32 Q 80 56 90 76 Z" fill={BODY} />
      <path d="M 122 80 Q 138 64 144 38 L 130 32 Q 120 56 110 76 Z" fill={BODY} />
      {/* DBs */}
      <rect x={42} y={20} width={14} height={6} rx={2} fill={EQUIP} />
      <rect x={38} y={14} width={5} height={18} rx={2} fill={EQUIP} />
      <rect x={55} y={14} width={5} height={18} rx={2} fill={EQUIP} />
      <rect x={144} y={20} width={14} height={6} rx={2} fill={EQUIP} />
      <rect x={140} y={14} width={5} height={18} rx={2} fill={EQUIP} />
      <rect x={157} y={14} width={5} height={18} rx={2} fill={EQUIP} />
      {/* Seat */}
      <rect x={68} y={174} width={64} height={18} rx={3} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      <path d="M 64 174 L 64 110 L 72 110 L 72 174 Z" fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.2} />
      {/* Thighs forward */}
      <path d="M 84 192 Q 82 220 80 236 L 96 236 Q 98 220 96 192 Z" fill={BODY} />
      <path d="M 116 192 Q 118 220 120 236 L 104 236 Q 102 220 104 192 Z" fill={BODY} />
      {/* Motion */}
      <path d="M 178 110 L 178 70" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <Floor y={242} />
      <Tag>SHOULDERS</Tag>
    </svg>
  )
}

// ─── 15. PLANK HOLD — side view ─────────────────────────────────────────────
export function PlankFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Mat */}
      <rect x={6} y={194} width={188} height={6} rx={2} fill={PAPER_DEEP} stroke={PAPER_EDGE} strokeWidth={1} />
      {/* Plank line — head left, feet right */}
      <path d="M 36 132 Q 44 134 96 140 Q 140 144 168 158 Q 176 162 170 174 Q 140 168 96 162 Q 50 158 36 156 Q 28 148 36 132 Z" fill={BODY} />
      {/* Core target */}
      <path d="M 80 144 Q 110 148 138 156 L 138 170 Q 110 164 80 160 Z" fill={MUSCLE} />
      <Head cx={28} cy={140} side="L" />
      {/* Forearm support */}
      <rect x={22} y={170} width={50} height={8} rx={3} fill={BODY_DARK} />
      {/* Arm to elbow */}
      <path d="M 38 154 Q 36 168 36 178 L 46 178 Q 46 168 50 156 Z" fill={BODY} />
      {/* Legs */}
      <path d="M 138 160 Q 148 170 168 180 L 174 174 Q 156 162 144 154 Z" fill={BODY} />
      {/* Feet on toes */}
      <path d="M 168 178 Q 178 184 184 192 L 180 200 Q 170 192 162 184 Z" fill={BODY} />
      {/* Motion — straight line indicator */}
      <line x1={28} y1={110} x2={184} y2={110} stroke={ACCENT} strokeDasharray="3 3" strokeWidth={1} opacity={0.55} />
      <text x={100} y={104} textAnchor="middle" fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">
        STRAIGHT LINE
      </text>
      <Tag>DEEP CORE</Tag>
    </svg>
  )
}

// ─── 16. PALLOF PRESS — front view ──────────────────────────────────────────
export function PallofPressFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Cable column right */}
      <rect x={170} y={50} width={10} height={150} rx={2} fill={EQUIP_SOFT} stroke={INK_MUTED} strokeWidth={1} />
      <circle cx={175} cy={120} r={5} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      {/* Torso */}
      <path d="M 60 80 Q 52 116 60 170 Q 80 174 100 170 Q 108 116 100 80 Q 80 74 60 80 Z" fill={BODY} />
      {/* Obliques target */}
      <path d="M 58 110 Q 54 134 62 162 Q 70 162 70 154 Q 68 130 66 108 Z" fill={MUSCLE} />
      <path d="M 102 110 Q 106 134 98 162 Q 90 162 90 154 Q 92 130 94 108 Z" fill={MUSCLE} />
      <Head cx={80} cy={56} />
      {/* Hands pressed straight out */}
      <path d="M 70 102 Q 110 108 144 116 L 144 128 Q 110 122 70 118 Z" fill={BODY} />
      {/* Handle */}
      <rect x={142} y={114} width={10} height={14} rx={2} fill={EQUIP} />
      {/* Cable */}
      <line x1={152} y1={121} x2={175} y2={120} stroke={ACCENT} strokeDasharray="4 3" strokeWidth={1.2} opacity={0.7} />
      {/* Legs */}
      <path d="M 60 170 Q 56 208 56 240 L 76 240 Q 78 208 76 170 Z" fill={BODY} />
      <path d="M 84 170 Q 86 208 86 240 L 104 240 Q 104 208 100 170 Z" fill={BODY} />
      <ellipse cx={66} cy={246} rx={12} ry={4} fill={INK_SOFT} />
      <ellipse cx={94} cy={246} rx={12} ry={4} fill={INK_SOFT} />
      {/* Motion — anti-rotation */}
      <path d="M 26 110 Q 40 120 26 130" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={20} y={106} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">RESIST</text>
      <Floor y={250} />
      <Tag>OBLIQUES · ANTI-ROT</Tag>
    </svg>
  )
}

// ─── 17. LEG PRESS — side view ──────────────────────────────────────────────
export function LegPressFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Machine frame */}
      <rect x={130} y={40} width={50} height={140} rx={4} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      <rect x={134} y={44} width={42} height={6} rx={2} fill={EQUIP} />
      <rect x={134} y={56} width={42} height={6} rx={2} fill={EQUIP} />
      <rect x={134} y={68} width={42} height={6} rx={2} fill={EQUIP} />
      {/* Foot plate (angled) */}
      <path d="M 130 90 L 130 180 L 92 180 L 100 90 Z" fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      {/* Seat */}
      <rect x={20} y={148} width={80} height={20} rx={3} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      <rect x={12} y={100} width={20} height={60} rx={3} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      {/* Torso reclined */}
      <path d="M 30 116 Q 26 140 32 168 Q 56 170 78 166 Q 80 140 70 116 Q 50 110 30 116 Z" fill={BODY} />
      <Head cx={28} cy={104} side="L" />
      {/* Thighs bent up to plate */}
      <path d="M 64 148 Q 80 132 100 122 L 108 132 Q 86 144 72 162 Z" fill={MUSCLE} />
      <path d="M 70 152 Q 88 138 102 128 L 110 138 Q 92 150 76 166 Z" fill={BODY} opacity={0.6} />
      {/* Shins to foot plate */}
      <path d="M 100 124 Q 106 110 108 92 L 124 92 Q 122 112 118 132 Z" fill={BODY} />
      {/* Motion */}
      <path d="M 80 218 Q 120 218 158 218" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={80} y={232} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">PRESS AWAY</text>
      <Floor y={252} />
      <Tag>QUADS · GLUTES</Tag>
    </svg>
  )
}

// ─── 18. GLUTE KICKBACK (cable) — side view ─────────────────────────────────
export function GluteKickbackFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Pulley low left */}
      <rect x={14} y={196} width={10} height={28} rx={2} fill={EQUIP_SOFT} stroke={INK_MUTED} strokeWidth={1} />
      <circle cx={19} cy={210} r={4} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      {/* Torso slight forward lean */}
      <path d="M 76 88 Q 68 124 84 168 Q 100 168 116 162 Q 116 124 96 88 Q 84 82 76 88 Z" fill={BODY} />
      <Head cx={70} cy={66} side="L" />
      {/* Standing leg */}
      <path d="M 92 168 Q 92 200 96 240 L 110 240 Q 108 200 104 168 Z" fill={BODY} />
      <ellipse cx={104} cy={246} rx={12} ry={4} fill={INK_SOFT} />
      {/* Glute target */}
      <ellipse cx={110} cy={160} rx={16} ry={11} fill={MUSCLE} />
      {/* Kicking leg back-up */}
      <path d="M 110 156 Q 144 154 174 170 L 174 184 Q 142 174 112 168 Z" fill={MUSCLE} opacity={0.85} />
      {/* Cable cuff at ankle */}
      <ellipse cx={170} cy={178} rx={6} ry={4} fill={EQUIP} />
      <line x1={166} y1={180} x2={24} y2={210} stroke={ACCENT} strokeDasharray="4 3" strokeWidth={1.2} opacity={0.7} />
      {/* Hands on bar/wall */}
      <rect x={48} y={148} width={20} height={6} rx={2} fill={EQUIP_SOFT} />
      <path d="M 78 124 Q 68 132 60 146 L 68 152 Q 76 138 86 130 Z" fill={BODY} />
      {/* Motion */}
      <path d="M 178 130 Q 188 150 178 168" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <Floor y={250} />
      <Tag>GLUTES (MAX)</Tag>
    </svg>
  )
}

// ─── 19. SINGLE-ARM DUMBBELL ROW — side view, on bench ──────────────────────
export function SingleArmRowFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Bench */}
      <rect x={20} y={150} width={92} height={14} rx={3} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      <line x1={28} y1={164} x2={26} y2={196} stroke={INK_MUTED} strokeWidth={1.4} />
      <line x1={104} y1={164} x2={106} y2={196} stroke={INK_MUTED} strokeWidth={1.4} />
      {/* Torso horizontal */}
      <path d="M 38 122 Q 50 116 110 130 Q 118 136 114 148 Q 78 142 40 138 Q 30 134 38 122 Z" fill={BODY} />
      {/* Lat target — pulling side */}
      <path d="M 108 122 Q 124 126 138 138 Q 134 148 124 148 Q 110 138 100 124 Z" fill={MUSCLE} />
      <Head cx={36} cy={108} side="L" />
      {/* Support arm on bench */}
      <path d="M 56 130 Q 52 142 52 152 L 64 154 Q 64 142 68 132 Z" fill={BODY} />
      {/* Support knee on bench */}
      <path d="M 70 134 Q 68 144 68 158 L 80 158 Q 80 146 84 136 Z" fill={BODY} />
      {/* Standing leg */}
      <path d="M 120 140 Q 134 178 138 218 L 158 216 Q 152 178 134 138 Z" fill={BODY} />
      <ellipse cx={150} cy={224} rx={14} ry={4} fill={INK_SOFT} />
      {/* Rowing arm — elbow back */}
      <path d="M 128 128 Q 152 110 168 94 L 174 102 Q 158 120 138 138 Z" fill={MUSCLE} opacity={0.85} />
      <path d="M 168 94 Q 152 110 134 130 L 142 138 Q 162 124 174 102 Z" fill={BODY} />
      {/* DB */}
      <rect x={158} y={94} width={20} height={8} rx={2} fill={EQUIP} />
      <rect x={154} y={88} width={6} height={20} rx={2} fill={EQUIP} />
      <rect x={178} y={88} width={6} height={20} rx={2} fill={EQUIP} />
      {/* Motion */}
      <path d="M 178 144 L 178 110" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <Floor y={228} />
      <Tag>LATS · RHOMBOIDS</Tag>
    </svg>
  )
}

// ─── 20. WALKING LUNGE — front view ─────────────────────────────────────────
export function WalkingLungeFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Torso */}
      <path d="M 80 72 Q 72 108 80 152 Q 100 156 120 152 Q 128 108 120 72 Q 100 66 80 72 Z" fill={BODY} />
      <Head cx={100} cy={48} />
      {/* Front leg — bent 90, shin vertical */}
      <path d="M 80 152 Q 60 178 56 204 L 78 208 Q 86 180 94 152 Z" fill={MUSCLE} />
      <path d="M 56 204 Q 56 226 58 244 L 78 244 Q 80 224 78 208 Z" fill={BODY} />
      <ellipse cx={68} cy={250} rx={14} ry={4} fill={INK_SOFT} />
      {/* Back leg — knee near floor */}
      <path d="M 120 152 Q 140 178 144 204 L 124 208 Q 116 180 108 152 Z" fill={BODY} />
      <path d="M 144 204 Q 154 220 158 232 L 138 236 Q 136 222 124 208 Z" fill={BODY} />
      <ellipse cx={148} cy={238} rx={12} ry={4} fill={INK_SOFT} opacity={0.55} />
      {/* Dumbbells in hands */}
      <path d="M 76 80 Q 60 110 56 148 L 70 152 Q 76 116 84 86 Z" fill={BODY} />
      <path d="M 124 80 Q 140 110 144 148 L 130 152 Q 124 116 116 86 Z" fill={BODY} />
      <rect x={48} y={150} width={20} height={6} rx={2} fill={EQUIP} />
      <rect x={44} y={144} width={5} height={18} rx={2} fill={EQUIP} />
      <rect x={65} y={144} width={5} height={18} rx={2} fill={EQUIP} />
      <rect x={132} y={150} width={20} height={6} rx={2} fill={EQUIP} />
      <rect x={128} y={144} width={5} height={18} rx={2} fill={EQUIP} />
      <rect x={149} y={144} width={5} height={18} rx={2} fill={EQUIP} />
      {/* Motion */}
      <path d="M 26 140 L 60 140" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={20} y={132} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">STEP</text>
      <Floor y={254} />
      <Tag>QUADS · GLUTES</Tag>
    </svg>
  )
}

// ─── 21. CHEST FLY (DB) — front view, lying ─────────────────────────────────
export function ChestFlyFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Bench */}
      <rect x={56} y={170} width={88} height={14} rx={3} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      <line x1={62} y1={184} x2={60} y2={222} stroke={INK_MUTED} strokeWidth={1.4} />
      <line x1={136} y1={184} x2={138} y2={222} stroke={INK_MUTED} strokeWidth={1.4} />
      {/* Torso */}
      <path d="M 70 132 Q 64 148 70 170 Q 100 174 130 170 Q 136 148 130 132 Q 100 124 70 132 Z" fill={BODY} />
      {/* Chest target */}
      <path d="M 78 138 Q 100 134 122 138 Q 124 156 100 158 Q 76 156 78 138 Z" fill={MUSCLE} />
      <Head cx={100} cy={110} />
      {/* Arms wide open at sides */}
      <path d="M 70 144 Q 48 140 28 138 L 28 150 Q 50 154 70 156 Z" fill={BODY} />
      <path d="M 130 144 Q 152 140 172 138 L 172 150 Q 150 154 130 156 Z" fill={BODY} />
      {/* DBs */}
      <rect x={14} y={138} width={16} height={12} rx={2} fill={EQUIP} />
      <rect x={170} y={138} width={16} height={12} rx={2} fill={EQUIP} />
      {/* Legs */}
      <path d="M 80 184 Q 78 210 78 232 L 96 232 Q 98 210 96 184 Z" fill={BODY} />
      <path d="M 120 184 Q 122 210 122 232 L 104 232 Q 102 210 104 184 Z" fill={BODY} />
      {/* Motion arc */}
      <path d="M 30 100 Q 100 60 170 100" stroke={ACCENT} strokeWidth={1.4} strokeDasharray="4 3" fill="none" opacity={0.55} />
      <text x={100} y={94} textAnchor="middle" fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">HUG A TREE</text>
      <Floor y={238} />
      <Tag>CHEST · INNER FIBRES</Tag>
    </svg>
  )
}

// ─── 22. BICEP CURL — front view ────────────────────────────────────────────
export function BicepCurlFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Torso */}
      <path d="M 80 80 Q 72 116 80 180 Q 100 184 120 180 Q 128 116 120 80 Q 100 74 80 80 Z" fill={BODY} />
      <Head cx={100} cy={56} />
      {/* Curled arms (mid rep) — biceps highlight */}
      <ellipse cx={76} cy={112} rx={10} ry={14} fill={MUSCLE} />
      <ellipse cx={124} cy={112} rx={10} ry={14} fill={MUSCLE} />
      <path d="M 76 90 Q 60 110 76 138 L 90 132 Q 80 114 86 92 Z" fill={BODY} />
      <path d="M 124 90 Q 140 110 124 138 L 110 132 Q 120 114 114 92 Z" fill={BODY} />
      {/* Forearms up to shoulders */}
      <path d="M 76 138 Q 76 116 76 96 L 86 96 Q 88 116 86 138 Z" fill={BODY} />
      <path d="M 124 138 Q 124 116 124 96 L 114 96 Q 112 116 114 138 Z" fill={BODY} />
      {/* DBs */}
      <rect x={66} y={88} width={20} height={8} rx={2} fill={EQUIP} />
      <rect x={62} y={82} width={6} height={20} rx={2} fill={EQUIP} />
      <rect x={86} y={82} width={6} height={20} rx={2} fill={EQUIP} />
      <rect x={114} y={88} width={20} height={8} rx={2} fill={EQUIP} />
      <rect x={110} y={82} width={6} height={20} rx={2} fill={EQUIP} />
      <rect x={134} y={82} width={6} height={20} rx={2} fill={EQUIP} />
      {/* Legs */}
      <path d="M 80 180 Q 78 214 78 240 L 96 240 Q 98 214 96 180 Z" fill={BODY} />
      <path d="M 120 180 Q 122 214 122 240 L 104 240 Q 102 214 104 180 Z" fill={BODY} />
      <ellipse cx={86} cy={246} rx={12} ry={4} fill={INK_SOFT} />
      <ellipse cx={114} cy={246} rx={12} ry={4} fill={INK_SOFT} />
      {/* Motion */}
      <path d="M 174 156 L 174 110" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <Floor y={250} />
      <Tag>BICEPS</Tag>
    </svg>
  )
}

// ─── 23. TRICEP PUSHDOWN — front view ───────────────────────────────────────
export function TricepPushdownFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Cable + pulley */}
      <line x1={100} y1={20} x2={100} y2={56} stroke={INK_MUTED} strokeWidth={1.4} />
      <rect x={92} y={14} width={16} height={8} rx={2} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1} />
      {/* Bar/rope */}
      <line x1={84} y1={140} x2={116} y2={140} stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
      <line x1={100} y1={56} x2={100} y2={132} stroke={ACCENT} strokeDasharray="4 3" strokeWidth={1.2} opacity={0.7} />
      {/* Torso */}
      <path d="M 80 86 Q 72 118 80 180 Q 100 184 120 180 Q 128 118 120 86 Q 100 80 80 86 Z" fill={BODY} />
      <Head cx={100} cy={62} />
      {/* Arms pressing down — triceps highlight */}
      <ellipse cx={76} cy={110} rx={10} ry={14} fill={MUSCLE} />
      <ellipse cx={124} cy={110} rx={10} ry={14} fill={MUSCLE} />
      <path d="M 78 92 Q 72 116 80 138 L 92 134 Q 84 116 88 96 Z" fill={BODY} />
      <path d="M 122 92 Q 128 116 120 138 L 108 134 Q 116 116 112 96 Z" fill={BODY} />
      {/* Legs */}
      <path d="M 80 180 Q 78 214 78 240 L 96 240 Q 98 214 96 180 Z" fill={BODY} />
      <path d="M 120 180 Q 122 214 122 240 L 104 240 Q 102 214 104 180 Z" fill={BODY} />
      <ellipse cx={86} cy={246} rx={12} ry={4} fill={INK_SOFT} />
      <ellipse cx={114} cy={246} rx={12} ry={4} fill={INK_SOFT} />
      {/* Motion */}
      <path d="M 174 110 L 174 150" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={172} y={170} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">PUSH</text>
      <Floor y={250} />
      <Tag>TRICEPS</Tag>
    </svg>
  )
}

// ─── 24. CALF RAISE — side view ─────────────────────────────────────────────
export function CalfRaiseFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Step edge */}
      <rect x={80} y={232} width={114} height={14} rx={1} fill={EQUIP_SOFT} stroke={INK_SOFT} strokeWidth={1.4} />
      {/* Torso */}
      <path d="M 80 80 Q 72 116 80 174 Q 100 178 120 174 Q 128 116 120 80 Q 100 74 80 80 Z" fill={BODY} />
      <Head cx={100} cy={56} />
      {/* Arms holding rail */}
      <path d="M 76 86 Q 70 120 70 156 L 82 158 Q 86 122 86 90 Z" fill={BODY} />
      <path d="M 124 86 Q 130 120 130 156 L 118 158 Q 114 122 114 90 Z" fill={BODY} />
      {/* Legs straight */}
      <path d="M 82 174 Q 80 210 84 232 L 100 232 Q 102 208 100 174 Z" fill={BODY} />
      <path d="M 118 174 Q 120 210 116 232 L 100 232 Q 98 208 100 174 Z" fill={BODY} />
      {/* Calves target */}
      <ellipse cx={92} cy={210} rx={9} ry={14} fill={MUSCLE} />
      <ellipse cx={108} cy={210} rx={9} ry={14} fill={MUSCLE} />
      {/* Toes on step, heels off */}
      <path d="M 84 232 L 98 232 L 96 240 L 84 244 Z" fill={INK_SOFT} />
      <path d="M 102 232 L 116 232 L 116 244 L 104 240 Z" fill={INK_SOFT} />
      {/* Motion */}
      <path d="M 174 200 L 174 160" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={178} y={184} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">RISE</text>
      <Tag>CALVES</Tag>
    </svg>
  )
}

// ─── 25. PULL-UP / ASSISTED PULL-UP — front view ────────────────────────────
export function PullupFig() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      <Defs />
      {/* Bar */}
      <line x1={20} y1={30} x2={180} y2={30} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      {/* Hands on bar */}
      <rect x={62} y={26} width={10} height={12} rx={2} fill={BODY_DARK} />
      <rect x={128} y={26} width={10} height={12} rx={2} fill={BODY_DARK} />
      {/* Arms reaching up */}
      <path d="M 66 38 Q 70 64 78 92 L 92 86 Q 80 60 76 36 Z" fill={BODY} />
      <path d="M 134 38 Q 130 64 122 92 L 108 86 Q 120 60 124 36 Z" fill={BODY} />
      {/* Torso */}
      <path d="M 78 86 Q 70 124 80 184 Q 100 188 120 184 Q 130 124 122 86 Q 100 80 78 86 Z" fill={BODY} />
      {/* Lat target */}
      <path d="M 78 92 Q 70 128 80 162 Q 86 162 88 156 Q 84 124 84 92 Z" fill={MUSCLE} />
      <path d="M 122 92 Q 130 128 120 162 Q 114 162 112 156 Q 116 124 116 92 Z" fill={MUSCLE} />
      <Head cx={100} cy={68} />
      {/* Legs hanging, bent */}
      <path d="M 84 184 Q 78 210 80 232 L 96 234 Q 100 212 96 184 Z" fill={BODY} />
      <path d="M 116 184 Q 122 210 120 232 L 104 234 Q 100 212 104 184 Z" fill={BODY} />
      {/* Motion */}
      <path d="M 178 110 L 178 70" stroke={ACCENT} strokeWidth={1.4} fill="none" markerEnd="url(#arrowhead)" strokeLinecap="round" opacity={0.6} />
      <text x={178} y={134} fontSize={8} fill={ACCENT} fontFamily="JetBrains Mono, monospace" letterSpacing="0.08em">UP</text>
      <Tag>BACK · BICEPS</Tag>
    </svg>
  )
}

// ─── Registry ────────────────────────────────────────────────────────────────
// Look up a figure by exercise name. Keys match `name` in each weekN curriculum.

export const FIGURES: Record<string, React.ComponentType> = {
  'Goblet Squat': GobletSquatFig,
  'Goblet Squat (Progression)': GobletSquatFig,
  'Romanian Deadlift (Dumbbells)': RDLDumbbellFig,
  'Romanian Deadlift': RDLDumbbellFig,
  'Hip Thrust (Bodyweight)': HipThrustBWFig,
  'Hip Thrust with Load': HipThrustLoadedFig,
  'Hip Thrust (Heavy)': HipThrustLoadedFig,
  'Hip Thrust': HipThrustLoadedFig,
  'Seated Cable Row': SeatedRowFig,
  'Dead Bug': DeadBugFig,
  'Barbell Back Squat': BackSquatFig,
  'Barbell Back Squat (Introduction)': BackSquatFig,
  'Barbell Romanian Deadlift': BarbellRDLFig,
  'Barbell Romanian Deadlift (Introduction)': BarbellRDLFig,
  'Barbell Bench Press': BenchPressFig,
  'Bench Press': BenchPressFig,
  'Barbell Row': BarbellRowFig,
  'Bulgarian Split Squat': BulgarianSplitSquatFig,
  'Bulgarian Split Squat (Bodyweight)': BulgarianSplitSquatFig,
  'Face Pull': FacePullFig,
  'Lat Pulldown': LatPulldownFig,
  'DB Shoulder Press': DbShoulderPressFig,
  'Dumbbell Shoulder Press': DbShoulderPressFig,
  'Plank Hold': PlankFig,
  'Plank': PlankFig,
  'Pallof Press': PallofPressFig,
  'Leg Press': LegPressFig,
  'Glute Kickback (Cable)': GluteKickbackFig,
  'Glute Kickback': GluteKickbackFig,
  'Single Arm Dumbbell Row': SingleArmRowFig,
  'Single-Arm DB Row': SingleArmRowFig,
  'Walking Lunge': WalkingLungeFig,
  'Chest Fly': ChestFlyFig,
  'Dumbbell Chest Fly': ChestFlyFig,
  'Bicep Curl': BicepCurlFig,
  'Dumbbell Bicep Curl': BicepCurlFig,
  'Tricep Pushdown': TricepPushdownFig,
  'Cable Tricep Pushdown': TricepPushdownFig,
  'Calf Raise': CalfRaiseFig,
  'Pull-Up': PullupFig,
  'Assisted Pull-Up': PullupFig,
  'Pull Up': PullupFig,
}

export function ExerciseFigure({ name }: { name: string }) {
  const Fig = FIGURES[name]
  if (!Fig) {
    // Fallback placeholder
    return (
      <div style={{
        width: 200, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--paper-deep)', border: '1px dashed var(--paper-edge)',
        fontFamily: 'monospace', fontSize: 11, color: 'var(--ink-muted)', textAlign: 'center', padding: 12,
      }}>
        {name}
      </div>
    )
  }
  return <Fig />
}
