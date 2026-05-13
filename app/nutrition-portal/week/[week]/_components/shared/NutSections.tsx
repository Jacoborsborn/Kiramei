import type { NutritionWeek } from '@/app/lib/nutrition-curriculum'

// ── Brief ──────────────────────────────────────────────────────────────────
export function NutBrief({ brief }: { brief: NutritionWeek['brief'] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="brief-grid">
      <div style={{ padding: '22px 24px', border: '1.5px solid var(--paper-edge)', borderTop: '3px solid var(--sage)', background: 'var(--paper-deep)' }}>
        <h4 style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 16 }}>Do this week</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {brief.doThis.map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
              <span style={{ color: 'var(--sage)', flexShrink: 0, marginTop: 1 }}>→</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ padding: '22px 24px', border: '1.5px solid var(--paper-edge)', borderTop: '3px solid var(--margin-red)', background: 'var(--paper-deep)' }}>
        <h4 style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--margin-red)', marginBottom: 16 }}>Don't do this week</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {brief.doNot.map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
              <span style={{ color: 'var(--margin-red)', flexShrink: 0, marginTop: 1 }}>×</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <style>{`@media(max-width:640px){.brief-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  )
}

// ── Mind Map ───────────────────────────────────────────────────────────────
export function NutMindMap({ mindMap, weekNum }: { mindMap: NutritionWeek['mindMap']; weekNum: number }) {
  const cx = 500, cy = 220
  const paths = mindMap.nodes.map((n, i) => {
    const tx = (parseFloat(n.x) / 100) * 1000 + 60
    const ty = (parseFloat(n.y) / 100) * 440 + 20
    const mx = cx + (tx - cx) * 0.4 + Math.sin(i * 1.7) * 60
    const my = cy + (ty - cy) * 0.5 + Math.cos(i * 1.7) * 40
    return `M ${cx} ${cy} Q ${mx} ${my}, ${tx} ${ty}`
  })
  const toneColor: Record<string, string> = { sage: 'var(--sage)', wheat: 'var(--wheat)', accent: 'var(--accent)' }
  return (
    <div style={{ background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', padding: '20px 20px 16px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>The week on one page</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Wk {String(weekNum).padStart(2, '0')}</span>
      </div>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '48%' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 1000 480" preserveAspectRatio="none">
          <defs>
            <filter id={`mm-r-${weekNum}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed={weekNum} />
              <feDisplacementMap in="SourceGraphic" scale="2.5" />
            </filter>
          </defs>
          <g stroke="var(--ink)" strokeWidth="1.4" fill="none" strokeLinecap="round" filter={`url(#mm-r-${weekNum})`} opacity="0.45">
            {paths.map((d, i) => <path key={i} d={d} />)}
          </g>
        </svg>
        {/* Center node */}
        <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)', background: 'var(--ink)', color: 'var(--paper)', fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 500, padding: '8px 16px', whiteSpace: 'nowrap', zIndex: 2 }}>
          {mindMap.center}
        </div>
        {/* Nodes */}
        {mindMap.nodes.map((n, i) => (
          <div key={i} style={{ position: 'absolute', left: n.x, top: n.y, transform: 'translate(-50%,-50%)', zIndex: 2, background: 'var(--paper)', border: `1.5px solid ${toneColor[n.tone || ''] || 'var(--paper-edge)'}`, padding: '6px 12px', minWidth: 80, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{n.label}</div>
            {n.sub && <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.08em', color: 'var(--ink-muted)', marginTop: 2 }}>{n.sub}</div>}
          </div>
        ))}
        {/* Annotations */}
        {mindMap.annotations.map((a, i) => (
          <span key={i} style={{ position: 'absolute', left: a.x, top: a.y, transform: `rotate(${a.rot}deg)`, fontFamily: 'var(--hand)', fontSize: 13, color: a.color === 'red' ? 'var(--margin-red)' : '#4A7C89', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 2 }}>
            {a.text}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Food Library ───────────────────────────────────────────────────────────
const GLYPHS = [
  <g key="a"><circle cx="40" cy="40" r="22" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" /><circle cx="40" cy="40" r="14" fill="none" stroke="white" strokeWidth="1" opacity="0.4" /></g>,
  <g key="b"><ellipse cx="40" cy="38" rx="13" ry="17" fill="white" opacity="0.85" /><ellipse cx="36" cy="33" rx="3" ry="4" fill="white" opacity="0.7" /></g>,
  <g key="c"><path d="M 40 22 Q 60 32, 50 56 Q 30 60, 28 38 Q 30 24, 40 22 Z" fill="white" opacity="0.8" /><path d="M 36 30 L 44 50" stroke="white" strokeWidth="1" opacity="0.5" /></g>,
  <g key="d"><path d="M 22 36 Q 40 56, 58 36 Z" fill="white" opacity="0.85" /><path d="M 22 36 L 58 36" stroke="white" strokeWidth="1" opacity="0.5" /></g>,
  <g key="e"><path d="M 40 22 L 50 58 L 30 58 Z" fill="white" opacity="0.85" /></g>,
  <g key="f"><path d="M 28 22 L 32 56 L 48 56 L 52 22 Z" fill="white" opacity="0.85" /><path d="M 28 30 L 52 30" stroke="white" strokeWidth="1" opacity="0.5" /></g>,
]
const SWATCH: Record<string, string> = {
  sage: 'linear-gradient(135deg,#7A8B6E,#5a6b52)',
  wheat: 'linear-gradient(135deg,#B89058,#9a7440)',
  red: 'linear-gradient(135deg,#B8543A,#9a3c24)',
  cream: 'linear-gradient(135deg,#D4C9B0,#b8ad96)',
  ink: 'linear-gradient(135deg,#3a3530,#1F1B16)',
}

export function NutLibrary({ library }: { library: NutritionWeek['library'] }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, marginBottom: 6 }}>{library.title}</h3>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{library.caption}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }} className="lib-grid">
        {library.items.map((it, i) => (
          <div key={i} style={{ border: '1px solid var(--paper-edge)', overflow: 'hidden', background: 'var(--paper)' }}>
            <div style={{ height: 80, background: SWATCH[it.tone] || SWATCH.cream, position: 'relative' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', inset: 0, margin: 'auto' }}>
                {GLYPHS[(it.name.charCodeAt(0) || 0) % GLYPHS.length]}
              </svg>
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{it.name}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 6 }}>{it.tag}</div>
              {it.desc && <p style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{it.desc}</p>}
            </div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:640px){.lib-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  )
}

// ── Lesson ─────────────────────────────────────────────────────────────────
export function NutLesson({ lesson }: { lesson: NutritionWeek['lesson'] }) {
  return (
    <div style={{ maxWidth: 680 }}>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, marginBottom: 24, letterSpacing: '-0.01em' }}>{lesson.title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {lesson.paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--ink-soft)' }} dangerouslySetInnerHTML={{ __html: p }} />
        ))}
      </div>
      <div style={{ marginTop: 32, padding: '20px 24px', background: 'rgba(184,84,58,0.05)', borderLeft: '3px solid var(--accent)', border: '1px solid rgba(184,84,58,0.18)', borderLeft: '3px solid var(--accent)' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>Kira's note</p>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, lineHeight: 1.65, color: 'var(--ink)' }}>{lesson.kiraNote}</p>
        <p style={{ fontFamily: 'var(--hand)', fontSize: 18, color: 'var(--ink-muted)', marginTop: 10 }}>— Kira</p>
      </div>
    </div>
  )
}

// ── Meal Plan ──────────────────────────────────────────────────────────────
export function NutMealPlan({ mealPlan }: { mealPlan: NonNullable<NutritionWeek['mealPlan']> }) {
  return (
    <div>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 500, marginBottom: 20 }}>{mealPlan.title}</h3>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        {mealPlan.days.map((day, i) => (
          <div key={i} style={{ flex: '1 1 200px', border: '1px solid var(--paper-edge)', background: 'var(--paper-deep)', overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--paper-edge)', display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent)' }}>{day.d}</span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 13, color: 'var(--ink-soft)' }}>{day.l}</span>
            </div>
            {day.rows.map((row, j) => (
              <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 14px', borderBottom: j < day.rows.length - 1 ? '1px solid var(--paper-edge)' : 'none', gap: 8 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 13, color: 'var(--ink-soft)', flex: 1, lineHeight: 1.4 }}>{row[0]}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', flexShrink: 0 }}>{row[1]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
