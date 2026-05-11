export default function Lesson() {
  return (
    <div style={{ maxWidth: 680 }}>
      <h3 style={{
        fontSize: 22, fontWeight: 700, color: 'var(--ink)',
        letterSpacing: '-0.01em', marginBottom: 32,
        fontFamily: 'var(--serif)',
      }}>
        THE LAST CONCEPT — AND THEN YOU DO NOT<br />NEED ANOTHER PROGRAMME
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <p style={paraStyle}>
            Hypertrophy and strength are not the same thing. They overlap — every hypertrophy programme
            builds some strength, and every strength programme builds some muscle. But they have different
            primary mechanisms, different optimal rep ranges, and different rest periods.
          </p>
        </div>

        <div>
          <p style={paraStyle}>
            Hypertrophy — muscle growth — is primarily stimulated in the 6–20 rep range at RPE 7–8, with
            moderate rest of 60–90 seconds and higher total weekly volume. The mechanism is mechanical
            tension, metabolic stress, and muscle damage. Higher reps, more sets, shorter rest — you are
            weighting toward hypertrophy.
          </p>
        </div>

        <div>
          <p style={{
            ...paraStyle,
            paddingLeft: 16,
            borderLeft: '2px solid rgba(184,84,58,0.20)',
          }}>
            Strength training — peak force production — is best stimulated in the 1–6 rep range at
            RPE 8–9, with longer rest of 2–5 minutes and lower overall volume per session. The primary
            mechanism is neuromuscular — training your nervous system to recruit more muscle fibres
            simultaneously. Lower reps, fewer sets, full rest — you are weighting toward strength.
          </p>
        </div>

        <div>
          <p style={paraStyle}>
            For most people, a hybrid approach is optimal. Heavy compound lifts at 3–6 reps for strength.
            Moderate isolation work at 8–15 reps for hypertrophy. This is exactly what this programme
            has been.
          </p>
        </div>

        {/* Framework box */}
        <div style={{
          background: 'var(--paper-deep)',
          border: '1px solid var(--paper-edge)',
          borderRadius: 12, padding: '20px 24px',
        }}>
          <p style={{
            fontSize: 10, fontWeight: 700, color: 'var(--ink-muted)',
            letterSpacing: '0.12em', marginBottom: 16,
          }}>
            THE FRAMEWORK
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { step: '01', text: 'Pick your primary goal: Strength, hypertrophy, or hybrid.' },
              { step: '02', text: 'Pick your split: 3 days full body, 4 days upper/lower, 5 days PPL.' },
              { step: '03', text: 'Apply progressive overload: Add 2.5kg when RPE 7 or below.' },
              { step: '04', text: 'Plan your deload: Week 7 of your next block. Build it in now.' },
            ].map(({ step, text }) => (
              <div key={step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace',
                  flexShrink: 0, marginTop: 1,
                }}>
                  {step}
                </span>
                <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upsell card */}
      <div style={{
        marginTop: 32,
        background: 'rgba(184,84,58,0.05)',
        border: '1px solid rgba(184,84,58,0.25)',
        borderRadius: 12, padding: '24px 28px',
      }}>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: 12,
        }}>
          YOU HAVE THE PRINCIPLES. NOW YOU NEED THE TOOL.
        </p>
        <p style={{
          fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 20,
        }}>
          The Build Your Own Plan template gives you a structured exercise library, a split builder,
          and a progressive overload tracker for 8-week blocks.
        </p>
        <a
          href="/checkout?product=template"
          style={{
            display: 'inline-block', padding: '12px 24px',
            borderRadius: 9, background: 'var(--accent)', color: '#fff',
            fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
            textDecoration: 'none',
          }}
        >
          UNLOCK THE TEMPLATE · £9.99
        </a>
      </div>

      <p style={{
        fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.75,
        fontStyle: 'italic', marginTop: 32,
      }}>
        You now know more about training than most people who have been going to the gym for years.
        The gym is yours now.
      </p>

      {/* Mental card — final */}
      <div style={{
        marginTop: 32,
        background: 'rgba(184,84,58,0.06)',
        border: '1px solid rgba(184,84,58,0.12)',
        borderRadius: 12, padding: '24px 28px',
      }}>
        <p style={{
          fontSize: 14, lineHeight: 1.75, color: 'var(--ink-soft)',
          fontStyle: 'italic', marginBottom: 16,
        }}>
          Eight weeks ago you started something. Today you finish it — and keep going. The habit is
          formed. The knowledge is permanent. The results are only beginning. Whatever comes next,
          you built the foundation for it here.
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
