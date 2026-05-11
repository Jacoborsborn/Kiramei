const ACCENT = 'var(--accent)'
const FIG_STROKE = 'var(--ink-soft)'
const FIG_JOINT = 'var(--ink)'
const FIG_THIN = 'var(--ink-muted)'

// ─── SVG figures ────────────────────────────────────────────────────────────

function GobletSquatSVG() {
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
      {/* Dumbbell at chest */}
      <rect x={86} y={104} width={28} height={12} rx={3}
        fill="none" stroke={FIG_STROKE} strokeWidth={1.8} />
      <rect x={82} y={106} width={6} height={8} rx={1.5}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      <rect x={112} y={106} width={6} height={8} rx={1.5}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      {/* Hip joint */}
      <line x1={100} y1={126} x2={86} y2={128} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={126} x2={114} y2={128} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Thighs — PRIMARY MUSCLE (quads) in accent */}
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

function RDLSvg() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Side view: hinging forward ~45° */}
      {/* Head */}
      <circle cx={82} cy={52} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={82} y1={64} x2={84} y2={74} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — angled forward */}
      <line x1={84} y1={74} x2={122} y2={155} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Hip */}
      <circle cx={122} cy={155} r={5} fill={FIG_JOINT} />
      {/* Near leg — nearly straight */}
      <line x1={122} y1={155} x2={118} y2={200} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={118} cy={200} r={4} fill={FIG_JOINT} />
      <line x1={118} y1={200} x2={114} y2={234} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={104} y1={238} x2={124} y2={237} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Far leg — offset */}
      <line x1={122} y1={155} x2={126} y2={200} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={126} y1={200} x2={130} y2={234} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Near shoulder */}
      <circle cx={84} cy={74} r={3.5} fill={FIG_JOINT} />
      {/* Near arm hanging */}
      <line x1={84} y1={74} x2={82} y2={120} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={82} cy={120} r={3} fill={FIG_JOINT} />
      <line x1={82} y1={120} x2={80} y2={158} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Far arm */}
      <line x1={84} y1={74} x2={92} y2={118} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={92} y1={118} x2={95} y2={155} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Dumbbell near hand */}
      <rect x={70} y={153} width={18} height={10} rx={2.5}
        fill="none" stroke={FIG_STROKE} strokeWidth={1.8} />
      <rect x={66} y={155} width={6} height={6} rx={1.2}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      {/* Hamstring highlight */}
      <line x1={122} y1={155} x2={118} y2={200} stroke={ACCENT} strokeWidth={3.5} strokeOpacity={0.85} />
      {/* Far hamstring */}
      <line x1={122} y1={155} x2={126} y2={200} stroke={ACCENT} strokeWidth={2.5} strokeOpacity={0.5} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        HAMSTRINGS · GLUTES
      </text>
    </svg>
  )
}

function HipThrustSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Bench */}
      <rect x={16} y={148} width={80} height={14} rx={4}
        fill="rgba(184,84,58,0.10)" stroke="rgba(184,84,58,0.20)" strokeWidth={1.5} />
      {/* Head resting back */}
      <circle cx={26} cy={138} r={11} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck + upper body on bench */}
      <line x1={37} y1={141} x2={55} y2={148} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Body line: shoulders → hips (elevated) */}
      <line x1={55} y1={148} x2={148} y2={118} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Near arm */}
      <line x1={72} y1={150} x2={80} y2={170} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={80} y1={170} x2={88} y2={178} stroke={FIG_STROKE} strokeWidth={1.8} />
      {/* Hip elevated — GLUTE HIGHLIGHT */}
      <circle cx={148} cy={118} r={7} fill={ACCENT} fillOpacity={0.25} stroke={ACCENT} strokeWidth={2} />
      {/* Thigh: hip to knee */}
      <line x1={148} y1={118} x2={158} y2={170} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={158} cy={170} r={4} fill={FIG_JOINT} />
      {/* Shin: knee to foot flat */}
      <line x1={158} y1={170} x2={155} y2={215} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Foot flat on floor */}
      <line x1={145} y1={218} x2={168} y2={218} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Floor line */}
      <line x1={16} y1={220} x2={184} y2={220} stroke="var(--paper-edge)" strokeWidth={1} />
      {/* Far leg offset */}
      <line x1={148} y1={118} x2={164} y2={168} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={164} y1={168} x2={162} y2={213} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Glute area fill */}
      <ellipse cx={143} cy={124} rx={14} ry={10}
        fill={ACCENT} fillOpacity={0.18} />
      <text x={100} y={250} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        GLUTES (ALL THREE)
      </text>
    </svg>
  )
}

function SeatedRowSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Seat */}
      <rect x={72} y={178} width={66} height={12} rx={3}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.5} />
      {/* Foot plate (right side) */}
      <rect x={170} y={174} width={12} height={28} rx={2}
        fill="none" stroke="var(--paper-edge)" strokeWidth={1.5} />
      {/* Head */}
      <circle cx={100} cy={40} r={13} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={53} x2={100} y2={64} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso upright */}
      <line x1={100} y1={64} x2={100} y2={178} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Thighs horizontal (seated) */}
      <line x1={96} y1={178} x2={155} y2={178} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={104} y1={182} x2={158} y2={182} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Lower legs down to feet on plate */}
      <line x1={155} y1={178} x2={170} y2={195} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={155} cy={178} r={3.5} fill={FIG_JOINT} />
      {/* Shoulders */}
      <circle cx={88} cy={72} r={3.5} fill={FIG_JOINT} />
      <circle cx={112} cy={72} r={3.5} fill={FIG_JOINT} />
      {/* Arms in pull position — elbows back */}
      <line x1={88} y1={72} x2={72} y2={112} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={72} cy={112} r={3.5} fill={FIG_JOINT} />
      <line x1={72} y1={112} x2={84} y2={148} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Far arm */}
      <line x1={112} y1={72} x2={128} y2={108} stroke={FIG_THIN} strokeWidth={1.5} />
      <circle cx={128} cy={108} r={3} fill={FIG_JOINT} />
      <line x1={128} y1={108} x2={116} y2={144} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Cable from hands to foot plate */}
      <line x1={84} y1={148} x2={170} y2={148} stroke="rgba(184,84,58,0.25)" strokeWidth={1.2} strokeDasharray="4 3" />
      {/* Back highlight (rhomboids/lats area) */}
      <rect x={80} y={70} width={20} height={80} rx={4}
        fill={ACCENT} fillOpacity={0.15} />
      <line x1={80} y1={70} x2={80} y2={150} stroke={ACCENT} strokeWidth={2.5} strokeOpacity={0.6} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        LATS · RHOMBOIDS
      </text>
    </svg>
  )
}

function DeadBugSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Floor */}
      <line x1={10} y1={225} x2={190} y2={225} stroke="var(--paper-edge)" strokeWidth={1} />
      {/* Figure lying on back — head at left */}
      {/* Head */}
      <circle cx={30} cy={210} r={11} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={41} y1={210} x2={52} y2={210} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso horizontal — lower back FLAT (shown by core highlight) */}
      <line x1={52} y1={210} x2={150} y2={210} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Core highlight — transverse abdominis */}
      <rect x={66} y={204} width={68} height={12} rx={4}
        fill={ACCENT} fillOpacity={0.15} stroke={ACCENT} strokeWidth={1} strokeOpacity={0.4} />
      {/* LEFT ARM — extended overhead (near arm, reaching up-left) */}
      <line x1={70} y1={206} x2={56} y2={168} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={56} cy={168} r={3.5} fill={FIG_JOINT} />
      <line x1={56} y1={168} x2={44} y2={135} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={44} cy={132} r={3} fill={FIG_STROKE} />
      {/* RIGHT ARM — resting at side */}
      <line x1={70} y1={214} x2={88} y2={218} stroke={FIG_THIN} strokeWidth={1.6} />
      {/* LEFT LEG — bent, knee up */}
      <line x1={148} y1={206} x2={138} y2={170} stroke={FIG_THIN} strokeWidth={1.6} />
      <circle cx={138} cy={170} r={3} fill={FIG_JOINT} />
      <line x1={138} y1={170} x2={148} y2={142} stroke={FIG_THIN} strokeWidth={1.6} />
      {/* RIGHT LEG — extending out low (opposite to left arm) */}
      <line x1={152} y1={214} x2={174} y2={222} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={174} cy={222} r={3.5} fill={FIG_JOINT} />
      <line x1={174} y1={222} x2={192} y2={224} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={193} cy={224} r={3} fill={FIG_STROKE} />
      {/* Lower back flat indicator */}
      <text x={100} y={245} textAnchor="middle" fontSize={8.5} fill="var(--ink-muted)"
        fontFamily="DM Sans, sans-serif">
        lower back flat to floor
      </text>
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        DEEP CORE
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
  mistake: string
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
        <h4 style={{
          fontSize: 16, fontWeight: 700, color: 'var(--ink)',
          letterSpacing: '-0.01em', marginBottom: 16,
        }}>
          {ex.name}
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Muscles */}
          <div>
            <span style={labelStyle}>Primary</span>
            <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{ex.primary}</span>
          </div>
          <div>
            <span style={labelStyle}>Secondary</span>
            <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{ex.secondary}</span>
          </div>

          {/* Tempo */}
          <div>
            <span style={labelStyle}>Tempo</span>
            <span style={{ fontSize: 12.5, color: 'var(--ink)', fontFamily: 'monospace' }}>{ex.tempo}</span>
          </div>

          {/* Cue */}
          <div style={{
            background: 'rgba(184,84,58,0.06)', border: '1px solid rgba(184,84,58,0.12)',
            borderRadius: 8, padding: '10px 14px',
          }}>
            <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 4 }}>
              CUE
            </p>
            <p style={{ fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.55, fontStyle: 'italic' }}>
              &ldquo;{ex.cue}&rdquo;
            </p>
          </div>

          {/* Why */}
          <div>
            <span style={labelStyle}>Why this exercise</span>
            <p style={{ fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.6 }}>{ex.why}</p>
          </div>

          {/* Mistake */}
          <div style={{
            background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)',
            borderRadius: 8, padding: '10px 14px',
          }}>
            <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--ink-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>
              COMMON MISTAKE
            </p>
            <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{ex.mistake}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 4,
}

const exercises: ExerciseData[] = [
  {
    name: 'Goblet Squat',
    svg: <GobletSquatSVG />,
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper back',
    tempo: '3 sec down · pause · 1 sec up',
    cue: 'Chest tall. Knees follow your toes. Sit into it — don\'t just bend your knees.',
    why: 'Teaches the squat pattern with the weight in front, which forces your torso upright. You cannot cheat this one.',
    mistake: 'Heels rising. If this happens, your ankles are tight — elevate your heels slightly on a plate.',
  },
  {
    name: 'Romanian Deadlift (Dumbbells)',
    svg: <RDLSvg />,
    primary: 'Hamstrings, Glutes',
    secondary: 'Lower back, Core',
    tempo: '3 sec down · pause at stretch · 1 sec up',
    cue: 'Push your hips back like you\'re trying to touch the wall behind you. The dumbbells follow — they don\'t lead.',
    why: 'The RDL is the most important glute and hamstring exercise in this programme. Learn it properly in week 1 and it will serve you for years.',
    mistake: 'Rounding the lower back. If this happens the weight is too heavy. Drop it and own the pattern first.',
  },
  {
    name: 'Hip Thrust (Bodyweight)',
    svg: <HipThrustSVG />,
    primary: 'Glutes (all three)',
    secondary: 'Hamstrings, Core',
    tempo: '1 sec up · 2 sec hold at top · 1 sec down',
    cue: 'Chin tucked. Drive through your heels. Squeeze hard at the top — hold it. Your lower back should not arch.',
    why: 'This is the single most direct glute-loading exercise that exists. Bodyweight this week because you need to feel the pattern before adding load. Most people feel nothing in their glutes the first time. That is exactly what we are fixing.',
    mistake: 'Arching the lower back at the top. That is your back working, not your glutes. Tuck your chin and brace your core.',
  },
  {
    name: 'Seated Cable Row',
    svg: <SeatedRowSVG />,
    primary: 'Lats, Rhomboids, Middle traps',
    secondary: 'Biceps, Rear delts',
    tempo: '1 sec pull · 2 sec hold · 2 sec back',
    cue: 'Pull your elbows to your hips, not your shoulders. Squeeze your shoulder blades together at the end of every rep.',
    why: 'Upper back strength counteracts sitting posture and protects your shoulders for every pressing movement you will ever do.',
    mistake: 'Leaning back excessively to row more weight. That is your lower back. Keep your torso at 90 degrees.',
  },
  {
    name: 'Dead Bug',
    svg: <DeadBugSVG />,
    primary: 'Deep core (transverse abdominis)',
    secondary: 'Hip flexors, Shoulder stability',
    tempo: '5 sec to extend · pause · 5 sec back',
    cue: 'Lower back stays flat to the floor the entire time. The moment it lifts, you have gone too far. Come back.',
    why: 'Every heavy compound lift you do in this programme depends on a stable core. This teaches your core to brace under load without moving your spine. It is not optional.',
    mistake: 'Rushing. If you can do this fast you are doing it wrong. Slow down until it is hard.',
  },
]

export default function ExerciseBreakdowns() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 8 }}>
        Session A exercises · Primary muscle highlighted in each diagram
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
