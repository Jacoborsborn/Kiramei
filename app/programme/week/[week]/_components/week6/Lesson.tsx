export default function Lesson() {
  return (
    <div style={{ maxWidth: 680 }}>
      <h3 style={{
        fontSize: 22, fontWeight: 700, color: 'var(--ink)',
        letterSpacing: '-0.01em', marginBottom: 32,
        fontFamily: 'var(--serif)',
      }}>
        WHY FORM IS A PERFORMANCE TOOL,<br />NOT A SAFETY LECTURE
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <p style={paraStyle}>
            Almost none of them tell you why form matters — beyond &lsquo;so you don&rsquo;t get injured.&rsquo; That
            framing makes form feel like a restriction. Correct form is the most direct path to training
            the muscle you intend to train.
          </p>
        </div>

        <div>
          <p style={paraStyle}>
            Weak links. Every compound lift has a chain of muscles that need to work in sequence. The weak
            link is the muscle that fails first — before the target muscle reaches its limit. If your upper
            back rounds during a deadlift, your hamstrings never got close to their limit.
          </p>
        </div>

        <div>
          <p style={{
            ...paraStyle,
            paddingLeft: 16,
            borderLeft: '2px solid rgba(184,84,58,0.20)',
          }}>
            How to identify your weak links. Film your squat from side and front. Check depth, knee
            tracking, lower back. Film your deadlift. Check bar path (does it drift forward?), hip
            position, lower back neutrality. These are your diagnostics.
          </p>
        </div>

        <div>
          <p style={paraStyle}>
            What to do with what you find. One targeted accessory per weak link. Knees caving in the
            squat — add abductor work. Upper back rounding in the deadlift — add face pulls and shrugs.
            Small additions, specific targets.
          </p>
        </div>

        <p style={{
          fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.75,
          fontStyle: 'italic',
        }}>
          This is how every good coach thinks. After this week you can do it yourself. That is not a
          small thing.
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
          Week 6 is when most people realise the physical changes are visible. If you have not noticed
          yet — look again. Six weeks of consistent progressive training changes a body. You are in it.
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
