const paraStyle: React.CSSProperties = { fontSize: 14, lineHeight: 1.8, color: 'var(--ink-soft)' }

export default function Lesson() {
  return (
    <div style={{ maxWidth: 680 }}>
      <h3 style={{
        fontSize: 22, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em',
        marginBottom: 32, fontFamily: 'var(--serif)',
      }}>
        THE SKILL NOBODY TEACHES — HOW TO ACTUALLY FEEL YOUR MUSCLES WORK
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <p style={paraStyle}>
          Every exercise has a target muscle. That target muscle should be the thing that gets tired. The ability to consciously direct effort into the muscle you intend to train is called mind-muscle connection. It sounds like gym pseudoscience. The research says otherwise.
        </p>

        <p style={paraStyle}>
          Studies show that consciously focusing on the muscle being trained produces measurably greater activation in that specific tissue. The cue changes the outcome. During a lat pulldown you are not pulling a bar to your chest — you are pulling your elbows into your back pockets. That one cue changes which muscle does the work.
        </p>

        <p style={paraStyle}>
          Practical application: on the first set of every isolation exercise this week, reduce weight by 20% and use 3-1-1 tempo. Focus on where the muscle starts to work and where it stops. Feel the stretch at the bottom. Feel the contraction at the top. By the second set you will know whether your target weight is correct.
        </p>

        <p style={paraStyle}>
          On compound lifts, mind-muscle connection is less about feeling one muscle and more about understanding the sequence. On a squat: brace, sit, drive through the heel, feel the glute engage at the top. Breaking compound movements into their muscular sequence makes them more effective and more technically consistent.
        </p>

        <p style={paraStyle}>
          The people who transform their bodies fastest are not always those lifting the most weight. They are the ones who have learned to make every rep do its job.
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
          Five weeks in, the gym has become something you look forward to. Maybe not every day. But the version of you that dreaded it is already gone. That is worth acknowledging.
        </p>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.04em' }}>
          — Kira
        </p>
      </div>
    </div>
  )
}
