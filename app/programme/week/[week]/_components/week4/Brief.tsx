export default function Brief() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <span style={{
          display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--accent)', background: 'rgba(184,84,58,0.08)',
          border: '1px solid rgba(184,84,58,0.15)', borderRadius: 99, padding: '4px 12px', marginBottom: 16,
        }}>
          PHASE 02 · BUILD
        </span>
        <h3 style={{
          fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--ink)',
          marginBottom: 8, fontFamily: 'var(--serif)',
        }}>
          WEEK 4 · STOP GUESSING
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
          Upper / Lower · 4 Days · Same Split · All Sets at RPE 7–8
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
              'Apply RPE to every working set. Before you pick up the weight, decide your target. After the set, assess honestly.',
              'Aim for RPE 7–8 on all working sets — two reps left in the tank, form intact.',
              'Keep the same Upper/Lower structure as week 3. Add weight where last week felt like RPE 6 or below.',
              'Ask yourself after every set: how many reps could I have done? Write it down.',
              'Use the conventional deadlift for the first time on Lower A Tuesday.',
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
              'Do not ignore RPE because it feels abstract. It will feel intuitive within three sets. Do it anyway.',
              'Do not ego-lift on the deadlift. RPE 8 means two reps left with perfect form — not one rep with a rounded back.',
              'Do not cut rest periods short. Rest is part of the prescription. Shorter rest equals cardio, not strength work.',
              'Do not rate every set as RPE 8 if it was actually a 6. Ego kills this tool. Be honest.',
              'Do not add weight just because you feel strong today. Target RPE first. Weight is how you hit it.',
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
