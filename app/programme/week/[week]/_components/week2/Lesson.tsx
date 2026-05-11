const paraStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.8,
  color: 'var(--ink-soft)',
}

export default function Lesson() {
  return (
    <div style={{ maxWidth: 680 }}>
      <h3 style={{
        fontSize: 22, fontWeight: 700, color: 'var(--ink)',
        letterSpacing: '-0.01em', marginBottom: 32,
        fontFamily: 'var(--serif)',
      }}>
        THE ONLY RULE THAT ACTUALLY<br />MATTERS IN TRAINING
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <p style={paraStyle}>
            There are hundreds of training principles. You do not need any of them yet. You need one
            thing. <em style={{ color: 'var(--accent)', fontStyle: 'normal', fontWeight: 600 }}>Progressive overload.</em>
          </p>
        </div>

        <div>
          <p style={paraStyle}>
            Progressive overload means giving your body a slightly greater demand than it faced last
            time. Your body adapts to stress — if the stress stays the same, adaptation stops. This is
            why people go to the gym for years and look identical.
          </p>
        </div>

        <div>
          <p style={{
            ...paraStyle,
            paddingLeft: 16,
            borderLeft: '2px solid rgba(184,84,58,0.20)',
          }}>
            There are multiple forms of overload. Adding weight is the most obvious. But adding reps
            at the same weight is overload. Adding a set is overload. Reducing rest time is overload.
            Improving range of motion is overload.{' '}
            <strong style={{ color: 'var(--ink-soft)', fontWeight: 600 }}>
              Doing the same weight with better technique is overload.
            </strong>{' '}
            Some weeks you will not be able to add weight. That does not mean you cannot progress.
          </p>
        </div>

        <div>
          <p style={paraStyle}>
            The log is not optional. Without a record of what you lifted last week, you are guessing.
            The people who transform their bodies consistently are not more talented or more motivated —
            they are more systematic.
          </p>
        </div>

        <p style={{
          fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.75,
          fontStyle: 'italic',
        }}>
          Two weeks of training produces something you cannot see in the mirror yet — your nervous
          system has built new pathways to your muscles. The visible changes are approximately four to
          six weeks away. The invisible changes have already begun.
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
          Week two is the week most people stop. Not because it is hard. Because the novelty has worn
          off and the results have not appeared yet. That gap — between starting and seeing — is where
          every meaningful change in life happens. You are in it. Stay.
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
