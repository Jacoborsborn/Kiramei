const paraStyle: React.CSSProperties = { fontSize: 14, lineHeight: 1.8, color: 'var(--ink-soft)' }

export default function Lesson() {
  return (
    <div style={{ maxWidth: 680 }}>
      <h3 style={{
        fontSize: 22, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em',
        marginBottom: 32, fontFamily: 'var(--serif)',
      }}>
        HOW TO TRAIN WITH PRECISION INSTEAD OF GUESSING
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <p style={paraStyle}>
          Most people are either working too hard or not hard enough. The gap between RPE 7 to 8 is where almost all meaningful training adaptation happens. This week you learn to consistently find that gap.
        </p>

        <p style={paraStyle}>
          RPE stands for Rate of Perceived Exertion. RPE 10 = could not have done another rep. RPE 8 = exactly two reps remaining. RPE 7 = three remaining. For most working sets, the target is RPE 7–8.
        </p>

        <p style={paraStyle}>
          RPE replaces percentage-based programming because percentage programmes require you to know your one-rep max. RPE is autoregulation — it adjusts to how you feel on any given day. Slept badly? Your RPE 8 might be at a lower weight. That is fine. The effort level stays constant.
        </p>

        <p style={paraStyle}>
          The skill of RPE improves with practice. After three or four sessions of honest assessment you will be able to predict your RPE before you start a set. That is a level of body awareness most people who train for years never develop.
        </p>

        <p style={paraStyle}>
          The log now needs a new column. Weight. Reps. RPE. Three data points per set. This is the difference between training and practising.
        </p>
      </div>

      <div style={{
        marginTop: 40, background: 'rgba(184,84,58,0.06)', border: '1px solid rgba(184,84,58,0.12)',
        borderRadius: 12, padding: '24px 28px',
      }}>
        <p style={{
          fontSize: 14, lineHeight: 1.75, color: 'var(--ink-soft)',
          fontStyle: 'italic', marginBottom: 16,
        }}>
          Something changes in week 4. The gym stops feeling like somewhere you have to go and starts feeling like somewhere that is yours. You know what you are doing and why. That quiet confidence is not arrogance — it is competence. It took four weeks to earn.
        </p>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.04em' }}>
          — Kira
        </p>
      </div>
    </div>
  )
}
