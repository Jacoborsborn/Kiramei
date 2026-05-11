export default function Lesson() {
  return (
    <div style={{ maxWidth: 680 }}>
      <h3 style={{
        fontSize: 22, fontWeight: 700, color: 'var(--ink)',
        letterSpacing: '-0.01em', marginBottom: 32,
        fontFamily: 'var(--serif)',
      }}>
        WHY YOUR GLUTES DON&rsquo;T FIRE<br />
        (AND HOW THIS FIXES IT)
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <p style={paraStyle}>
            Most women who come to the gym already have strong glutes. The problem is not the muscle.
            The problem is that the brain has partially stopped using it. Hours of sitting, minimal hip
            extension in daily life — over time the nervous system de-prioritises the glute because it
            does not need it. This is called <em style={{ color: 'var(--accent)', fontStyle: 'normal', fontWeight: 600 }}>gluteal amnesia</em>.
            It is real, it is common, and it is completely reversible.
          </p>
        </div>

        <div>
          <p style={paraStyle}>
            The hip thrust and Romanian deadlift are not just exercises — they are neurological
            re-education. Every rep is the brain re-learning to fire the glute under load. The reason
            your bum has not changed despite cardio is simple: running and cycling do not load the glute
            in the range of motion where it grows. The hinge and the thrust do.
          </p>
        </div>

        <div>
          <p style={{
            ...paraStyle,
            paddingLeft: 16,
            borderLeft: '2px solid rgba(184,84,58,0.20)',
          }}>
            Brief note on muscle fibres.{' '}
            <strong style={{ color: 'var(--ink-soft)', fontWeight: 600 }}>Slow twitch fibres (type 1)</strong>{' '}
            work during long low-intensity effort — walking, cardio. They are efficient but small.{' '}
            <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>Fast twitch fibres (type 2)</strong>{' '}
            work during resistance training — they are larger, they respond to progressive overload, they
            are what changes the shape of the muscle. You are here to train type 2 fibres. That is what
            this programme does.
          </p>
        </div>

        <div>
          <p style={paraStyle}>
            Why full body 3× is optimal right now. Each muscle group fires 3× per week. At beginner
            level this frequency accelerates the nervous system adaptation faster than any split. A
            glute-only day once per week trains the glute once. Full body trains it three times.
            More practice equals faster skill acquisition. This is week 1. Be patient.
          </p>
        </div>

        <p style={{
          fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.75,
          fontStyle: 'italic',
        }}>
          You will not feel sore in your glutes after session A. That is normal. The connection is not
          built yet. It will be by week 3. Do the work anyway.
        </p>
      </div>

      {/* Mental card */}
      <div style={{
        marginTop: 40,
        background: 'rgba(184,84,58,0.06)',
        border: '1px solid rgba(184,84,58,0.12)',
        borderRadius: 12, padding: '24px 28px',
      }}>
        <p style={{
          fontSize: 14, lineHeight: 1.75, color: 'var(--ink-soft)',
          fontStyle: 'italic', marginBottom: 16,
        }}>
          The gym will feel unfamiliar this week. You might feel self-conscious. That feeling is not
          a warning sign — it is proof you are doing something new. It fades by week 2. Show up anyway.
        </p>
        <p style={{
          fontSize: 12, fontWeight: 600, color: 'var(--accent)',
          letterSpacing: '0.04em',
        }}>
          — Kira
        </p>
      </div>
    </div>
  )
}

const paraStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.8,
  color: 'var(--ink-soft)',
}
