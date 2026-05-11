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
        WHY THE DAYS BETWEEN SESSIONS<br />MATTER AS MUCH AS THE SESSIONS
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <p style={paraStyle}>
            When you train a muscle, you do not make it stronger in the gym. You make it slightly
            damaged. The adaptation happens during the recovery window that follows.
          </p>
        </div>

        <div>
          <p style={paraStyle}>
            Muscle protein synthesis peaks at 24–36 hours after training and takes 48–72 hours to
            complete. Training the same muscle before that window closes is counterproductive. You are
            damaging tissue that is still mid-repair.
          </p>
        </div>

        <div>
          <p style={{
            ...paraStyle,
            paddingLeft: 16,
            borderLeft: '2px solid rgba(184,84,58,0.20)',
          }}>
            This is why Upper/Lower now outperforms full body for you. Monday upper, Tuesday lower —
            each half gets a full day of recovery. By Thursday your upper body muscles have had{' '}
            <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>72 hours of repair.</strong>{' '}
            The quality of the stimulus is higher.
          </p>
        </div>

        <div>
          <p style={paraStyle}>
            Soreness is not the measure of a good session.{' '}
            <em style={{ color: 'var(--ink-soft)', fontStyle: 'normal', fontWeight: 600 }}>DOMS</em>{' '}
            is a signal of novelty, not effectiveness. As your body adapts, soreness decreases. Your
            progress does not. Do not chase soreness. Chase progressive overload.
          </p>
        </div>

        <p style={{
          fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.75,
          fontStyle: 'italic',
        }}>
          You are four days a week now. The fact that you structured your life to accommodate four
          training sessions is already doing something for you beyond the physical.
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
          Something shifts around week 3. The gym starts to feel less like somewhere you go and more
          like somewhere you belong. That shift is subtle and it is real. Let it happen.
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
