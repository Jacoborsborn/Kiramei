const doThis = [
  'Learn the 5 movement patterns: squat, hinge, push, pull, brace',
  'Focus on feeling the muscle, not moving the weight',
  'Log your weights every session — even just in the notes box',
  'Rest on Tuesday, Thursday, Saturday, Sunday. Honour it.',
  'Read this page the night before your first session. Not on the way there.',
]

const doNot = [
  'Do not add extra cardio sessions on top of these three days',
  'Do not go near the Smith machine for squats',
  'Do not skip the hip thrust because it feels awkward — it always does, do it anyway',
  'Do not judge yourself by the weight on the bar',
  'Do not skip ahead to week 2 early',
]

export default function Brief() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <span style={{
          display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--accent)',
          background: 'rgba(184,84,58,0.08)', border: '1px solid rgba(184,84,58,0.15)',
          borderRadius: 99, padding: '4px 12px', marginBottom: 16,
        }}>
          PHASE 01 · FOUNDATION
        </span>
        <h3 style={{
          fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em',
          color: 'var(--ink)', marginBottom: 8, fontFamily: 'var(--serif)',
        }}>
          WEEK 1 · START HERE
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
          Full Body · 3 Days · Mon / Wed / Fri
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
      }} className="brief-grid">
        <div style={{
          background: 'rgba(184,84,58,0.06)', border: '1px solid rgba(184,84,58,0.12)',
          borderRadius: 12, padding: '24px 20px',
        }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: 16,
          }}>
            DO THIS WEEK
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {doThis.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', fontSize: 13, marginTop: 1, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)',
          borderRadius: 12, padding: '24px 20px',
        }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--ink-muted)', marginBottom: 16,
          }}>
            DO NOT DO THIS WEEK
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {doNot.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--ink-muted)', fontSize: 13, marginTop: 1, flexShrink: 0 }}>×</span>
                <span style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .brief-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
