const doThis = [
  'Three sessions only. Monday, Wednesday, Friday. Full body. Back to where it started.',
  'All weights at 60% of what you used last week. Not 70. Not 80. Sixty.',
  'RPE should feel like 5–6. Easy, deliberate, technical. If it feels like RPE 7, the weight is too high.',
  'Use every set as a technique session. Perfect every rep on every exercise.',
  'End Wednesday\'s session with 20 minutes of easy walking or light cardio. Nothing more.',
]

const doNot = [
  'Do not increase the weight because 60% feels too easy. That feeling IS the deload working. Honour it.',
  'Do not add extra sessions or extra cardio to compensate for the reduced volume. More is not more this week.',
  'Do not skip the week entirely. Zero training is not a deload. Keep moving, keep the habit, dial it back.',
  'Do not feel guilty. The people who feel guilty during a deload are the ones who understand training the least.',
  'Do not start week 8 early. The deload\'s effect compounds over the full week. Let it finish.',
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
          PHASE 04 · OWN IT
        </span>
        <h3 style={{
          fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em',
          color: 'var(--ink)', marginBottom: 8, fontFamily: 'var(--serif)',
        }}>
          WEEK 7 · PULL BACK TO COME FORWARD
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
          Deload · Full Body · 3 Days · Mon / Wed / Fri · All weights at 60%
        </p>
      </div>

      {/* Special callout banner */}
      <div style={{
        background: 'rgba(184,84,58,0.05)',
        border: '1px solid rgba(184,84,58,0.18)',
        borderRadius: 12, padding: '18px 22px',
        marginBottom: 28,
      }}>
        <p style={{
          fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)',
          fontStyle: 'italic',
        }}>
          This is not a rest week. This is a precision week. The deload is one of the most misunderstood
          tools in training — and the people who skip it are the ones who plateau and burn out. You will
          not skip it.
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
