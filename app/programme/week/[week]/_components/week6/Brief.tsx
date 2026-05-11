const doThis = [
  'Film yourself performing your compound lifts. Squat, deadlift, bench, row. From the side. Once per session is enough.',
  'Watch the footage before your next session, not immediately after. You see it more clearly when you are not still in it.',
  'Add 2.5–5kg to exercises where week 5 felt like RPE 7 or below. Earn the weight.',
  'Identify one weak link per compound lift. Write it down. Add one accessory this week to address it.',
  'On lateral raises: drop 2.5kg from week 5 and make every rep perfect before adding weight back.',
]

const doNot = [
  'Do not skip filming because it feels awkward. It feels awkward for everyone the first time. Do it anyway.',
  'Do not add weight on exercises where your form broke down last week. Fix first. Load second. Always.',
  'Do not make the supersets too heavy — this is the first week they appear. Time under tension is the point, not load.',
  'Do not judge what you see in the footage. Watch it like a coach, not a critic. What needs correcting, and why?',
  'Do not skip the chest-supported row. It removes lower back compensation entirely. That is why it is here.',
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
          PHASE 03 · MASTER
        </span>
        <h3 style={{
          fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em',
          color: 'var(--ink)', marginBottom: 8, fontFamily: 'var(--serif)',
        }}>
          WEEK 6 · LEARN TO COACH YOURSELF
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
          Push / Pull / Legs · 5 Days · Same Split · Form Audit Week
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
