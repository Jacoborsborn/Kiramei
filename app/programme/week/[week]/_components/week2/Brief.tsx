const doThis = [
  'Add 2.5kg to every exercise where last week felt manageable at the final rep',
  'Log your weights before you get to the gym — know your targets walking in',
  'Do the barbell introduction on Friday. Empty bar. Non-negotiable.',
  'Notice how the movements feel different to week 1. That difference is adaptation.',
  'Read Kira\'s note tonight. Not tomorrow morning.',
]

const doNot = [
  'Do not add 5–10kg because you feel strong. Tendons adapt slower than muscle. Respect that.',
  'Do not skip Friday because the barbell feels intimidating. That is precisely why you are doing it.',
  'Do not judge progress by how you look. Two weeks produces nervous system change, not visible muscle.',
  'Do not miss a session because motivation is low. Motivation follows action — it does not precede it.',
  'Do not compare your weights to anyone else in that gym.',
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
          WEEK 2 · DO NOT QUIT HERE
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
