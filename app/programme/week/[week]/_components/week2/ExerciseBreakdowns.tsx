const ACCENT = 'var(--accent)'
const FIG_STROKE = 'var(--ink-soft)'
const FIG_JOINT = 'var(--ink)'
const FIG_THIN = 'var(--ink-muted)'

// ─── SVG figures ─────────────────────────────────────────────────────────────

function GobletSquatProgressionSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Head */}
      <circle cx={100} cy={32} r={13} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={45} x2={100} y2={58} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — upright */}
      <line x1={100} y1={58} x2={100} y2={126} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Shoulders */}
      <line x1={100} y1={62} x2={76} y2={72} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={62} x2={124} y2={72} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Upper arms → elbows */}
      <line x1={76} y1={72} x2={74} y2={97} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={124} y1={72} x2={126} y2={97} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Forearms → dumbbell */}
      <line x1={74} y1={97} x2={89} y2={112} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={126} y1={97} x2={111} y2={112} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Dumbbell at chest — slightly larger than week 1 to show progression */}
      <rect x={84} y={104} width={32} height={13} rx={3}
        fill="none" stroke={FIG_STROKE} strokeWidth={1.8} />
      <rect x={79} y={106} width={7} height={9} rx={1.5}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      <rect x={114} y={106} width={7} height={9} rx={1.5}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      {/* Hip joint */}
      <line x1={100} y1={126} x2={86} y2={128} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={126} x2={114} y2={128} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Thighs — PRIMARY (quads + glutes) in accent */}
      <line x1={86} y1={128} x2={60} y2={178} stroke={ACCENT} strokeWidth={3} />
      <line x1={114} y1={128} x2={140} y2={178} stroke={ACCENT} strokeWidth={3} />
      {/* Knee dots */}
      <circle cx={60} cy={178} r={4} fill={ACCENT} />
      <circle cx={140} cy={178} r={4} fill={ACCENT} />
      {/* Shins */}
      <line x1={60} y1={178} x2={48} y2={226} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={140} y1={178} x2={152} y2={226} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Feet */}
      <line x1={38} y1={234} x2={58} y2={232} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={142} y1={232} x2={162} y2={234} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Joint dots */}
      <circle cx={76} cy={72} r={3} fill={FIG_JOINT} />
      <circle cx={124} cy={72} r={3} fill={FIG_JOINT} />
      <circle cx={74} cy={97} r={3} fill={FIG_JOINT} />
      <circle cx={126} cy={97} r={3} fill={FIG_JOINT} />
      <circle cx={86} cy={128} r={3.5} fill={FIG_JOINT} />
      <circle cx={114} cy={128} r={3.5} fill={FIG_JOINT} />
      {/* Accent label */}
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        QUADS · GLUTES
      </text>
    </svg>
  )
}

function HipThrustLoadedSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Bench */}
      <rect x={16} y={148} width={80} height={14} rx={4}
        fill="rgba(184,84,58,0.10)" stroke="rgba(184,84,58,0.20)" strokeWidth={1.5} />
      {/* Head resting back */}
      <circle cx={26} cy={138} r={11} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck + upper back on bench */}
      <line x1={37} y1={141} x2={55} y2={148} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Body line: shoulders → hips elevated */}
      <line x1={55} y1={148} x2={148} y2={118} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Arms holding plate on hips */}
      <line x1={80} y1={144} x2={102} y2={122} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={80} cy={144} r={3} fill={FIG_JOINT} />
      <line x1={120} y1={144} x2={110} y2={122} stroke={FIG_THIN} strokeWidth={1.8} />
      {/* Weight plate on hips */}
      <ellipse cx={120} cy={120} rx={20} ry={8}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.8} />
      <ellipse cx={120} cy={120} rx={14} ry={5}
        fill="none" stroke="var(--paper-edge)" strokeWidth={1} />
      {/* Hip elevated — GLUTE HIGHLIGHT */}
      <circle cx={148} cy={118} r={7} fill={ACCENT} fillOpacity={0.25} stroke={ACCENT} strokeWidth={2} />
      {/* Glute area fill */}
      <ellipse cx={143} cy={124} rx={14} ry={10}
        fill={ACCENT} fillOpacity={0.18} />
      {/* Thigh: hip to knee */}
      <line x1={148} y1={118} x2={158} y2={170} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={158} cy={170} r={4} fill={FIG_JOINT} />
      {/* Shin: knee to foot */}
      <line x1={158} y1={170} x2={155} y2={215} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Foot flat */}
      <line x1={145} y1={218} x2={168} y2={218} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Floor line */}
      <line x1={16} y1={220} x2={184} y2={220} stroke="var(--paper-edge)" strokeWidth={1} />
      {/* Far leg */}
      <line x1={148} y1={118} x2={164} y2={168} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={164} y1={168} x2={162} y2={213} stroke={FIG_THIN} strokeWidth={1.5} />
      <text x={100} y={250} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        GLUTES (MAXIMUS)
      </text>
    </svg>
  )
}

function BarbellBackSquatSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Head */}
      <circle cx={100} cy={34} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={46} x2={100} y2={58} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Barbell across upper traps */}
      <line x1={54} y1={62} x2={146} y2={62} stroke="var(--ink-muted)" strokeWidth={3} />
      {/* Barbell collars */}
      <rect x={50} y={58} width={8} height={9} rx={1.5}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      <rect x={142} y={58} width={8} height={9} rx={1.5}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      {/* Arms gripping bar */}
      <line x1={100} y1={58} x2={72} y2={62} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={58} x2={128} y2={62} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={72} cy={62} r={3} fill={FIG_JOINT} />
      <circle cx={128} cy={62} r={3} fill={FIG_JOINT} />
      {/* Forearms to bar */}
      <line x1={72} y1={62} x2={64} y2={62} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={128} y1={62} x2={136} y2={62} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — slight forward lean in squat */}
      <line x1={100} y1={58} x2={96} y2={130} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Hip joints */}
      <circle cx={96} cy={130} r={4.5} fill={FIG_JOINT} />
      <line x1={96} y1={130} x2={80} y2={133} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={96} y1={130} x2={112} y2={133} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Thighs — PRIMARY quads + glutes in accent */}
      <line x1={80} y1={133} x2={58} y2={183} stroke={ACCENT} strokeWidth={3} />
      <line x1={112} y1={133} x2={136} y2={183} stroke={ACCENT} strokeWidth={3} />
      {/* Knee joints */}
      <circle cx={58} cy={183} r={4} fill={ACCENT} />
      <circle cx={136} cy={183} r={4} fill={ACCENT} />
      {/* Shins — vertical */}
      <line x1={58} y1={183} x2={52} y2={226} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={136} y1={183} x2={142} y2={226} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Feet */}
      <line x1={40} y1={230} x2={62} y2={228} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={132} y1={228} x2={154} y2={230} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Floor */}
      <line x1={20} y1={232} x2={180} y2={232} stroke="var(--paper-edge)" strokeWidth={1} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        QUADS · GLUTES
      </text>
    </svg>
  )
}

function BarbellRDLSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Side view — hinging, bar close to legs, flat back */}
      {/* Head — looking slightly forward */}
      <circle cx={78} cy={50} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={78} y1={62} x2={80} y2={72} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — angled forward ~45°, flat back */}
      <line x1={80} y1={72} x2={120} y2={152} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Hip joint */}
      <circle cx={120} cy={152} r={5} fill={FIG_JOINT} />
      {/* Near leg — soft knee, nearly straight */}
      <line x1={120} y1={152} x2={117} y2={200} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={117} cy={200} r={4} fill={FIG_JOINT} />
      <line x1={117} y1={200} x2={114} y2={234} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={104} y1={238} x2={124} y2={237} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Far leg */}
      <line x1={120} y1={152} x2={124} y2={200} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={124} y1={200} x2={128} y2={234} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Near shoulder */}
      <circle cx={80} cy={72} r={3.5} fill={FIG_JOINT} />
      {/* Near arm — hanging, holding bar close to leg */}
      <line x1={80} y1={72} x2={78} y2={118} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={78} cy={118} r={3} fill={FIG_JOINT} />
      <line x1={78} y1={118} x2={82} y2={158} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Far arm */}
      <line x1={80} y1={72} x2={88} y2={116} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={88} y1={116} x2={93} y2={155} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Barbell — straight bar close to shins */}
      <line x1={48} y1={162} x2={136} y2={162} stroke="var(--ink-muted)" strokeWidth={3} />
      <rect x={43} y={158} width={8} height={9} rx={1.5}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      <rect x={130} y={158} width={8} height={9} rx={1.5}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      {/* Hamstring highlight — PRIMARY */}
      <line x1={120} y1={152} x2={117} y2={200} stroke={ACCENT} strokeWidth={3.5} strokeOpacity={0.85} />
      {/* Glute highlight at hip */}
      <ellipse cx={115} cy={156} rx={10} ry={8}
        fill={ACCENT} fillOpacity={0.2} />
      {/* Far hamstring */}
      <line x1={120} y1={152} x2={124} y2={200} stroke={ACCENT} strokeWidth={2.5} strokeOpacity={0.5} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        HAMSTRINGS · GLUTES
      </text>
    </svg>
  )
}

function SingleArmRowSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Bench supporting near hand and knee */}
      <rect x={16} y={140} width={90} height={14} rx={4}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.5} />
      {/* Bench legs */}
      <line x1={24} y1={154} x2={24} y2={176} stroke="var(--paper-edge)" strokeWidth={1.5} />
      <line x1={98} y1={154} x2={98} y2={176} stroke="var(--paper-edge)" strokeWidth={1.5} />
      {/* Head — neutral, looking down */}
      <circle cx={44} cy={108} r={11} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={44} y1={119} x2={46} y2={128} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — horizontal, braced */}
      <line x1={46} y1={128} x2={126} y2={136} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Near arm braced on bench */}
      <line x1={60} y1={130} x2={58} y2={148} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={58} cy={148} r={3} fill={FIG_JOINT} />
      {/* Near knee on bench */}
      <line x1={72} y1={136} x2={70} y2={154} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Far leg — standing, foot on floor */}
      <line x1={126} y1={136} x2={140} y2={182} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={140} cy={182} r={3.5} fill={FIG_JOINT} />
      <line x1={140} y1={182} x2={138} y2={220} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={128} y1={222} x2={150} y2={222} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Rowing arm — elbow pulled back to hip — PRIMARY */}
      <line x1={126} y1={128} x2={140} y2={96} stroke={ACCENT} strokeWidth={2.8} />
      <circle cx={140} cy={96} r={3.5} fill={ACCENT} />
      {/* Forearm — pulling DB to hip */}
      <line x1={140} y1={96} x2={148} y2={128} stroke={ACCENT} strokeWidth={2.8} />
      {/* Dumbbell in hand */}
      <rect x={142} y={126} width={16} height={8} rx={2}
        fill="none" stroke={FIG_STROKE} strokeWidth={1.8} />
      <rect x={138} y={128} width={6} height={5} rx={1}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      {/* Back highlight — lat area */}
      <ellipse cx={118} cy={130} rx={12} ry={20}
        fill={ACCENT} fillOpacity={0.15} />
      <line x1={112} y1={112} x2={118} y2={148} stroke={ACCENT} strokeWidth={2.5} strokeOpacity={0.6} />
      {/* Floor */}
      <line x1={16} y1={224} x2={184} y2={224} stroke="var(--paper-edge)" strokeWidth={1} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        LATS · RHOMBOIDS
      </text>
    </svg>
  )
}

// ─── Exercise card ────────────────────────────────────────────────────────────

interface ExerciseData {
  name: string
  svg: React.ReactNode
  primary: string
  secondary: string
  tempo: string
  cue: string
  why: string
  progression?: string
  mistake?: string
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4,
}

function ExerciseCard({ ex, index }: { ex: ExerciseData; index: number }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0,
      border: '1px solid var(--paper-edge)',
      borderRadius: 12, overflow: 'hidden',
      background: 'var(--paper-deep)',
    }} className="exercise-card">
      {/* Left — SVG */}
      <div style={{
        background: 'rgba(31,27,22,0.06)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px',
        borderRight: '1px solid var(--paper-edge)',
      }}>
        <p style={{
          fontSize: 9, fontWeight: 700, color: 'var(--ink-muted)',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12,
        }}>
          {String(index + 1).padStart(2, '0')}
        </p>
        {ex.svg}
      </div>

      {/* Right — breakdown panel */}
      <div style={{ padding: '24px 24px' }}>
        <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em', marginBottom: 16 }}>
          {ex.name}
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <span style={labelStyle}>Primary</span>
            <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{ex.primary}</span>
          </div>
          <div>
            <span style={labelStyle}>Secondary</span>
            <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{ex.secondary}</span>
          </div>
          <div>
            <span style={labelStyle}>Tempo</span>
            <span style={{ fontSize: 12.5, color: 'var(--ink)', fontFamily: 'monospace' }}>{ex.tempo}</span>
          </div>
          <div style={{
            background: 'rgba(184,84,58,0.06)', border: '1px solid rgba(184,84,58,0.12)',
            borderRadius: 8, padding: '10px 14px',
          }}>
            <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 4 }}>CUE</p>
            <p style={{ fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.55, fontStyle: 'italic' }}>
              &ldquo;{ex.cue}&rdquo;
            </p>
          </div>
          <div>
            <span style={labelStyle}>Why this exercise</span>
            <p style={{ fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.6 }}>{ex.why}</p>
          </div>
          {ex.progression && (
            <div style={{
              background: 'rgba(184,84,58,0.05)', border: '1px solid rgba(184,84,58,0.10)',
              borderRadius: 8, padding: '10px 14px',
            }}>
              <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 4 }}>PROGRESSION</p>
              <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{ex.progression}</p>
            </div>
          )}
          {ex.mistake && (
            <div style={{
              background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)',
              borderRadius: 8, padding: '10px 14px',
            }}>
              <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--ink-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>COMMON MISTAKE</p>
              <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{ex.mistake}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const exercises: ExerciseData[] = [
  {
    name: 'Goblet Squat (Progression)',
    svg: <GobletSquatProgressionSVG />,
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper back',
    tempo: '3 seconds down · pause · 1 second up',
    cue: 'Two more reps than last week. Same weight or slightly more. If your chest drops on the way up the weight is too heavy.',
    why: 'Your nervous system knows it now. This is the first week you are genuinely training the muscle.',
    progression: 'If week 1 felt like 6/10, add 2.5kg. If it felt like 8/10, add reps first.',
  },
  {
    name: 'Hip Thrust with Load',
    svg: <HipThrustLoadedSVG />,
    primary: 'Glutes (maximus)',
    secondary: 'Hamstrings, Core',
    tempo: '1 second up · 2 second hold · controlled down',
    cue: 'Hold a 5kg or 10kg plate on your hips. Drive through your heels. Squeeze at the top.',
    why: 'Last week was pattern learning. This week is the first time you are loading the glute.',
    mistake: 'Plate sitting too high on the stomach. It sits across the hip crease.',
  },
  {
    name: 'Barbell Back Squat (Introduction)',
    svg: <BarbellBackSquatSVG />,
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper back, Hamstrings',
    tempo: '3 seconds down · pause · drive up',
    cue: 'Empty bar. 20kg. Bar sits on your upper traps not your neck. Brace before you descend. Every. Single. Rep.',
    why: 'The most effective lower body compound movement. Learning it now so you can load it from week 3.',
    mistake: 'Looking down. Eyes forward or slightly up. Where your eyes go your chest follows.',
  },
  {
    name: 'Barbell Romanian Deadlift (Introduction)',
    svg: <BarbellRDLSVG />,
    primary: 'Hamstrings, Glutes',
    secondary: 'Lower back, Core, Lats',
    tempo: '3 seconds down · stretch pause · drive hips through',
    cue: 'Empty bar only. The bar stays in contact with your legs the entire movement. If it drifts forward your lower back takes over.',
    why: 'The bar changes load distribution and forces you to engage your lats. Different stimulus, better long-term tool.',
    mistake: 'Bending the knees too much and turning it into a squat. Soft bend only. This is a hip hinge.',
  },
  {
    name: 'Single Arm Dumbbell Row',
    svg: <SingleArmRowSVG />,
    primary: 'Lats, Rhomboids',
    secondary: 'Biceps, Rear delt, Core',
    tempo: '1 second pull · 1 second squeeze · 2 seconds lower',
    cue: 'Brace your core like someone is about to push you sideways. Pull the elbow to your hip — not your shoulder.',
    why: 'Unilateral work identifies imbalances.',
    mistake: 'Rotating the torso to get more range.',
  },
]

export default function ExerciseBreakdowns() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 8 }}>
        Week 2 key exercises · Primary muscle highlighted in each diagram
      </p>
      {exercises.map((ex, i) => (
        <ExerciseCard key={ex.name} ex={ex} index={i} />
      ))}
      <style>{`
        @media (max-width: 640px) {
          .exercise-card { grid-template-columns: 1fr !important; }
          .exercise-card > div:first-child { border-right: none !important; border-bottom: 1px solid var(--paper-edge); }
        }
      `}</style>
    </div>
  )
}
