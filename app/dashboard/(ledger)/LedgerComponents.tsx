'use client'

import { useState } from 'react'

// ── Sparkline SVG ─────────────────────────────────────────
export function Sparkline({ values, accent = false, width = 80, height = 28 }: {
  values: number[]; accent?: boolean; width?: number; height?: number
}) {
  if (!values.length) return null
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const stepX = width / (values.length - 1)
  const points = values.map((v, i) => {
    const x = i * stepX
    const y = height - ((v - min) / range) * (height - 2) - 1
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' L ')
  return (
    <svg className={`spark ${accent ? 'accent' : ''}`} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={`M ${points}`} />
    </svg>
  )
}

// ── Stat block ───────────────────────────────────────────
export function Stat({ label, value, delta, deltaType = 'pos', spark, scribble }: {
  label: string; value: string | number; delta?: string
  deltaType?: 'pos' | 'neg' | 'flat'; spark?: number[]; scribble?: string
}) {
  return (
    <div className="stat">
      {scribble && <div className="scribble">{scribble}</div>}
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {delta && (
        <div className={`stat-delta${deltaType === 'neg' ? ' neg' : deltaType === 'flat' ? ' flat' : ''}`}>
          {delta}
        </div>
      )}
      {spark && spark.length > 0 && (
        <div className="stat-spark">
          <Sparkline values={spark} accent={deltaType !== 'neg'} />
        </div>
      )}
    </div>
  )
}

// ── LCard ───────────────────────────────────────────────
export function LCard({ title, eyebrow, action, children, style }: {
  title?: string; eyebrow?: string; action?: React.ReactNode
  children?: React.ReactNode; style?: React.CSSProperties
}) {
  return (
    <div className="lcard" style={style}>
      {(title || eyebrow || action) && (
        <div className="lcard-head">
          <div>
            {eyebrow && <div className="lcard-eyebrow">{eyebrow}</div>}
            {title && <div className="lcard-title">{title}</div>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  )
}

// ── Tag ──────────────────────────────────────────────────
export function Tag({ kind = 'tag-ink', children }: { kind?: string; children: React.ReactNode }) {
  return <span className={`tag ${kind}`}>{children}</span>
}

export function StatusTag({ status }: { status: string }) {
  if (status === 'live')     return <Tag kind="tag-sage">● live</Tag>
  if (status === 'waitlist') return <Tag kind="tag-gold">○ waitlist</Tag>
  if (status === 'draft')    return <Tag kind="tag-muted">— draft</Tag>
  if (status === 'paid')     return <Tag kind="tag-sage">paid</Tag>
  if (status === 'refund')   return <Tag kind="tag-accent">refunded</Tag>
  return <Tag>{status}</Tag>
}

// ── Bar ──────────────────────────────────────────────────
export function Bar({ pct, color = 'ink' }: { pct: number; color?: string }) {
  return (
    <div className="bar-track">
      <div className={`bar-fill ${color}`} style={{ width: `${Math.min(100, pct)}%` }} />
    </div>
  )
}

// ── Toggle ───────────────────────────────────────────────
export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return <button className={`toggle${on ? ' on' : ''}`} onClick={() => onChange(!on)} />
}

// ── Funnel ───────────────────────────────────────────────
export function Funnel({ rows }: { rows: Array<{ label: string; value: number; pct: number }> }) {
  return (
    <div className="funnel">
      {rows.map((r, i) => (
        <div key={i} className="funnel-row">
          <div className="funnel-label">{r.label}</div>
          <div className="funnel-track">
            <div className="funnel-fill" style={{ width: `${r.pct}%` }}>{r.pct}%</div>
          </div>
          <div className="funnel-num">{r.value.toLocaleString('en-GB')}</div>
        </div>
      ))}
    </div>
  )
}

// ── MiniChart SVG ────────────────────────────────────────
export function MiniChart({ values, height = 140 }: { values: number[]; height?: number }) {
  if (!values.length) return null
  const width = 100
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const step = width / (values.length - 1)
  const pts = values.map((v, i) => {
    const x = i * step
    const y = height - ((v - min) / range) * (height - 18) - 8
    return [x, y] as [number, number]
  })
  const linePath = `M ${pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' L ')}`
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" width="100%" height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent, #B8543A)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent, #B8543A)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((p, i) => (
        <line key={i} x1="0" y1={height * p} x2={width} y2={height * p}
          stroke="var(--paper-edge, rgba(31,27,22,0.1))" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={areaPath} fill="url(#chartFill)" />
      <path d={linePath} stroke="var(--ink)" strokeWidth="1.4" fill="none" vectorEffect="non-scaling-stroke" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.2" fill="var(--accent, #B8543A)" />
      ))}
    </svg>
  )
}

// ── Donut ────────────────────────────────────────────────
export function Donut({ segments, size = 110 }: { segments: Array<{ value: number }>; size?: number }) {
  const total = segments.reduce((a, s) => a + s.value, 0)
  const r = 44, cx = size / 2, cy = size / 2
  const colors = ['var(--ink)', 'var(--accent,#B8543A)', 'var(--sage,#7A8B6E)', 'var(--gold,#B8923A)', 'var(--ink-soft,#5a5650)', 'var(--paper-edge)']
  let acc = 0
  const arcs = segments.map((s, i) => {
    const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2
    acc += s.value
    const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2
    const large = a1 - a0 > Math.PI ? 1 : 0
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0)
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1)
    return (
      <path key={i}
        d={`M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`}
        fill={colors[i % colors.length]}
        stroke="var(--paper)"
        strokeWidth="1.5"
      />
    )
  })
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {arcs}
      <circle cx={cx} cy={cy} r="20" fill="var(--paper)" />
    </svg>
  )
}

// ── Tabs (client) ─────────────────────────────────────────
export function Tabs({ options, value, onChange }: {
  options: Array<{ label: string; value: string }>
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="tabs">
      {options.map(o => (
        <div key={o.value} className={`tab${value === o.value ? ' active' : ''}`} onClick={() => onChange(o.value)}>
          {o.label}
        </div>
      ))}
    </div>
  )
}
