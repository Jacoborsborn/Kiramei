export default function Brief() {
  return (
    <div>
      {/* Halfway callout banner */}
      <div style={{
        background: 'rgba(184,84,58,0.07)', border: '1px solid rgba(184,84,58,0.18)',
        borderRadius: 12, padding: '20px 24px', marginBottom: 32,
      }}>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
          color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 8,
        }}>
          HALFWAY
        </p>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
          4 weeks done. You have learned full body training, introduced the barbell, moved to a proper split, and started training with RPE precision. Most people who buy a programme never get here. You are here.
        </p>
      </div>

      <div style={{ marginBottom: 32 }}>
        <span style={{
          display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--accent)', background: 'rgba(184,84,58,0.08)',
          border: '1px solid rgba(184,84,58,0.15)', borderRadius: 99, padding: '4px 12px', marginBottom: 16,
        }}>
          PHASE 03 · MASTER
        </span>
        <h3 style={{
          fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--ink)',
          marginBottom: 8, fontFamily: 'var(--serif)',
        }}>
          WEEK 5 · YOU ARE READY FOR THIS NOW
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
          Push / Pull / Legs · 5 Days · Mon / Tue / Wed / Fri / Sat
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="brief-grid">
        {/* DO THIS */}
        <div style={{
          background: 'rgba(184,84,58,0.06)', border: '1px solid rgba(184,84,58,0.12)',
          borderRadius: 12, padding: '24px 20px',
        }}>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--accent)',
            marginBottom: 16, textTransform: 'uppercase',
          }}>
            DO THIS
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Train five days. Push Monday, Pull Tuesday, Legs Wednesday, rest Thursday, Push Friday, Pull Saturday.',
              'On every isolation exercise this week — slow down. 3 seconds down, 1 second pause. Feel the muscle.',
              'Back is trained before biceps on pull day. Your back should be exhausted before curls begin.',
              'Use lighter weight than you think on isolation work. The tempo is the stimulus, not the load.',
              'Apply RPE 7–8 to all working sets. You know how to do this now.',
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent)', fontSize: 14, flexShrink: 0, marginTop: 1 }}>—</span>
                <span style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DO NOT */}
        <div style={{
          background: 'rgba(31,27,22,0.04)', border: '1px solid var(--paper-edge)',
          borderRadius: 12, padding: '24px 20px',
        }}>
          <p style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--ink-muted)',
            marginBottom: 16, textTransform: 'uppercase',
          }}>
            DO NOT
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Do not turn pull day into a bicep session. Biceps are secondary. Back is primary.',
              'Do not neglect the tempo cues on isolation exercises. The weight is irrelevant if momentum is doing the work.',
              'Do not skip leg day. Half your body is below your waist. The people who skip it are easy to spot.',
              'Do not add a sixth day because five feels achievable. Rest Thursday. Non-negotiable.',
              'Do not reduce weight to compensate for slower tempo. Find the right weight for the tempo, not the other way around.',
            ].map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--ink-muted)', fontSize: 14, flexShrink: 0, marginTop: 1 }}>✕</span>
                <span style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`@media(max-width:600px){.brief-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  )
}
