const doThis = [
  'Attempt a personal best on every major compound lift — squat, deadlift, bench press, hip thrust.',
  'RPE 9 on compound working sets. You are fresh. Use it.',
  'On the final session of the week (Saturday Pull), treat every set as the last one of this programme. Make it count.',
  'After Saturday\'s session, write your first programme. The framework is in section 4. Do not skip this.',
  'Celebrate finishing. Not with a week off — with a deload into your own programme.',
]

const doNot = [
  'Do not hold back on personal best attempts out of caution. You have eight weeks of preparation. Trust them.',
  'Do not finish this programme and immediately jump into another one without a deload. Take the easy week first.',
  'Do not underestimate what you have learned. You now understand training at a level most gym-goers never reach.',
  'Do not buy another programme. You now know how to build your own. That was always the point.',
  'Do not stop training after week 8. The habit is formed. The knowledge is yours. What comes next is up to you.',
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
          WEEK 8 · YOUR STRONGEST WEEK YET
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
          Push / Pull / Legs · 5 Days · Personal Best Week
        </p>
      </div>

      {/* Celebration banner */}
      <div style={{
        background: 'rgba(184,84,58,0.07)',
        border: '1px solid rgba(184,84,58,0.20)',
        borderRadius: 12, padding: '20px 24px',
        marginBottom: 28,
      }}>
        <p style={{
          fontSize: 14, lineHeight: 1.75, color: 'var(--ink)',
          fontWeight: 500,
        }}>
          Eight weeks. You have learned full body training, progressive overload, Upper/Lower, RPE,
          PPL, form auditing, and how to recover properly. You are fresh from a deload. This week you
          are going to lift the heaviest weights of this programme.{' '}
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Come in with intention.</span>
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
