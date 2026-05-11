export default function Lesson() {
  return (
    <div style={{ maxWidth: 680 }}>
      <h3 style={{
        fontSize: 22, fontWeight: 700, color: 'var(--ink)',
        letterSpacing: '-0.01em', marginBottom: 32,
        fontFamily: 'var(--serif)',
      }}>
        YOU DO NOT GET FITTER IN THE GYM
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <p style={paraStyle}>
            The gym session is not where adaptation happens. The gym session is the stimulus. The
            adaptation happens in the recovery window that follows. You grow during sleep. You get
            stronger on rest days.
          </p>
        </div>

        <div>
          <p style={paraStyle}>
            Supercompensation: after a period of stress followed by adequate recovery, the body
            rebuilds above its previous baseline. This is measurable. After a deload following
            progressive overload, athletes consistently test stronger than before the deload. The
            fatigue was masking the adaptation.
          </p>
        </div>

        <div>
          <p style={{
            ...paraStyle,
            paddingLeft: 16,
            borderLeft: '2px solid rgba(184,84,58,0.20)',
          }}>
            Accumulated fatigue syndrome: performance plateaus despite continued training, persistent
            soreness that does not resolve, disrupted sleep, loss of motivation, increased irritability.
            If any of these sound familiar after six weeks, that is not weakness. That is biology.
            The deload is the solution.
          </p>
        </div>

        <div>
          <p style={paraStyle}>
            Professional athletes periodise around deload weeks as a fundamental component — not an
            optional extra. Every 4–8 weeks of hard training requires one week of reduced load. From
            now on, every training block you write for yourself will include a deload week. Build it
            in at the start, not when you are already burnt out.
          </p>
        </div>

        <p style={{
          fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.75,
          fontStyle: 'italic',
        }}>
          Week 7 feels like nothing is happening. That is exactly what recovery is supposed to feel
          like. Week 8 will prove it.
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
          The version of you who started this eight weeks ago did not believe a deload week could
          matter. The version of you reading this has earned the right to understand why it does.
          That is the whole difference.
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
