const ACCENT = 'var(--accent)'
const FIG_STROKE = 'var(--ink-soft)'
const FIG_JOINT = 'var(--ink)'
const FIG_THIN = 'var(--ink-muted)'

// ─── SVG figures ─────────────────────────────────────────────────────────────

function BackSquatPerfectSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Bar across traps */}
      <line x1={42} y1={74} x2={158} y2={74} stroke={FIG_STROKE} strokeWidth={3} />
      <rect x={36} y={70} width={10} height={10} rx={2}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      <rect x={154} y={70} width={10} height={10} rx={2}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      {/* Head */}
      <circle cx={100} cy={46} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={58} x2={100} y2={72} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — upright, slight forward lean */}
      <line x1={100} y1={72} x2={96} y2={138} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Shoulders */}
      <circle cx={72} cy={78} r={3.5} fill={FIG_JOINT} />
      <circle cx={128} cy={78} r={3.5} fill={FIG_JOINT} />
      {/* Arms holding bar */}
      <line x1={72} y1={78} x2={60} y2={74} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={128} y1={78} x2={140} y2={74} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Hip at bottom of squat */}
      <circle cx={96} cy={138} r={5} fill={FIG_JOINT} />
      {/* Thighs — quads highlighted, slightly below parallel */}
      <line x1={96} y1={138} x2={62} y2={188} stroke={ACCENT} strokeWidth={3.5} />
      <line x1={96} y1={138} x2={130} y2={188} stroke={ACCENT} strokeWidth={3.5} />
      {/* Knee joints */}
      <circle cx={62} cy={188} r={5} fill={ACCENT} />
      <circle cx={130} cy={188} r={5} fill={ACCENT} />
      {/* Shins — vertical-ish, knees tracking over toes */}
      <line x1={62} y1={188} x2={54} y2={232} stroke={FIG_STROKE} strokeWidth={2.2} />
      <line x1={130} y1={188} x2={146} y2={232} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Feet */}
      <line x1={40} y1={238} x2={60} y2={236} stroke={FIG_STROKE} strokeWidth={2.2} />
      <line x1={140} y1={236} x2={160} y2={238} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Glute highlight */}
      <ellipse cx={92} cy={140} rx={14} ry={10}
        fill={ACCENT} fillOpacity={0.2} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        QUADS · GLUTES
      </text>
    </svg>
  )
}

function RDLRangeSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Full stretch position — maximum hamstring range */}
      {/* Head */}
      <circle cx={76} cy={44} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={76} y1={56} x2={78} y2={68} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — nearly horizontal */}
      <line x1={78} y1={68} x2={128} y2={152} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Hip pushed back — key cue */}
      <circle cx={128} cy={152} r={5.5} fill={FIG_JOINT} />
      {/* Near leg — nearly straight, maximum stretch */}
      <line x1={128} y1={152} x2={122} y2={214} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={122} cy={214} r={4} fill={FIG_JOINT} />
      <line x1={122} y1={214} x2={118} y2={244} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={108} y1={248} x2={128} y2={247} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Far leg */}
      <line x1={128} y1={152} x2={134} y2={214} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={134} y1={214} x2={138} y2={244} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Near arm hanging with bar — low position */}
      <circle cx={78} cy={68} r={3.5} fill={FIG_JOINT} />
      <line x1={78} y1={68} x2={74} y2={118} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={74} cy={118} r={3} fill={FIG_JOINT} />
      <line x1={74} y1={118} x2={70} y2={166} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Barbell at mid-shin */}
      <line x1={46} y1={162} x2={100} y2={166} stroke={FIG_STROKE} strokeWidth={3} />
      <rect x={40} y={158} width={8} height={10} rx={2}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      {/* Hamstring highlighted at full stretch */}
      <line x1={128} y1={152} x2={122} y2={214} stroke={ACCENT} strokeWidth={4} strokeOpacity={0.85} />
      {/* Far hamstring */}
      <line x1={128} y1={152} x2={134} y2={214} stroke={ACCENT} strokeWidth={2.5} strokeOpacity={0.5} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        HAMSTRINGS · GLUTES
      </text>
    </svg>
  )
}

function FacePullResetSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Cable column on right */}
      <rect x={166} y={30} width={12} height={160} rx={3}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      <circle cx={172} cy={100} r={5} fill="none" stroke="rgba(184,84,58,0.25)" strokeWidth={1.5} />
      {/* Standing figure */}
      <circle cx={82} cy={58} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={82} y1={70} x2={82} y2={82} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={82} y1={82} x2={82} y2={160} stroke={FIG_STROKE} strokeWidth={2.4} />
      <circle cx={82} cy={160} r={4.5} fill={FIG_JOINT} />
      <line x1={82} y1={160} x2={74} y2={210} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={74} cy={210} r={3.5} fill={FIG_JOINT} />
      <line x1={74} y1={210} x2={72} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={62} y1={243} x2={82} y2={242} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={82} y1={160} x2={92} y2={210} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={92} y1={210} x2={94} y2={240} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Near shoulder */}
      <circle cx={68} cy={90} r={3.5} fill={FIG_JOINT} />
      {/* Arms — elbows high, full external rotation */}
      <line x1={68} y1={90} x2={40} y2={72} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={40} cy={72} r={3.5} fill={FIG_JOINT} />
      <line x1={40} y1={72} x2={58} y2={58} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Far arm */}
      <circle cx={96} cy={90} r={3.5} fill={FIG_JOINT} />
      <line x1={96} y1={90} x2={126} y2={74} stroke={FIG_THIN} strokeWidth={1.5} />
      <circle cx={126} cy={74} r={3} fill={FIG_JOINT} />
      <line x1={126} y1={74} x2={110} y2={60} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Cable */}
      <line x1={58} y1={58} x2={166} y2={100} stroke="rgba(184,84,58,0.20)" strokeWidth={1} strokeDasharray="3 2" />
      {/* Rear delt / rotator cuff highlight */}
      <ellipse cx={66} cy={87} rx={12} ry={9}
        fill={ACCENT} fillOpacity={0.25} stroke={ACCENT} strokeWidth={1} strokeOpacity={0.4} />
      <line x1={68} y1={90} x2={40} y2={72} stroke={ACCENT} strokeWidth={3} strokeOpacity={0.75} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        REAR DELTS · EXT ROTATORS
      </text>
    </svg>
  )
}

function HipThrustLightSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Bench */}
      <rect x={16} y={148} width={80} height={14} rx={4}
        fill="rgba(184,84,58,0.10)" stroke="rgba(184,84,58,0.20)" strokeWidth={1.5} />
      {/* Head */}
      <circle cx={26} cy={138} r={11} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Upper body */}
      <line x1={37} y1={141} x2={55} y2={148} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Body line at top */}
      <line x1={55} y1={148} x2={148} y2={118} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Arms */}
      <line x1={72} y1={150} x2={80} y2={170} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={80} y1={170} x2={88} y2={178} stroke={FIG_STROKE} strokeWidth={1.8} />
      {/* Small plate — lighter load */}
      <rect x={132} y={112} width={28} height={12} rx={3}
        fill="rgba(184,84,58,0.10)" stroke="rgba(184,84,58,0.25)" strokeWidth={1.5} />
      <text x={146} y={121} textAnchor="middle" fontSize={7} fill="var(--accent)"
        fontFamily="DM Sans, sans-serif">60%</text>
      {/* Hip elevated — glute squeeze */}
      <circle cx={148} cy={118} r={7} fill={ACCENT} fillOpacity={0.3} stroke={ACCENT} strokeWidth={2} />
      {/* Thigh */}
      <line x1={148} y1={118} x2={158} y2={170} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={158} cy={170} r={4} fill={FIG_JOINT} />
      {/* Shin */}
      <line x1={158} y1={170} x2={155} y2={215} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={145} y1={218} x2={168} y2={218} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Floor */}
      <line x1={16} y1={220} x2={184} y2={220} stroke="var(--paper-edge)" strokeWidth={1} />
      {/* Far leg */}
      <line x1={148} y1={118} x2={164} y2={168} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={164} y1={168} x2={162} y2={213} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Glute area fill */}
      <ellipse cx={143} cy={124} rx={14} ry={10}
        fill={ACCENT} fillOpacity={0.2} />
      <text x={100} y={250} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        GLUTES
      </text>
    </svg>
  )
}

function GobletSquatFinalSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Head */}
      <circle cx={100} cy={32} r={13} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={45} x2={100} y2={58} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — upright, confident */}
      <line x1={100} y1={58} x2={100} y2={126} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Shoulders */}
      <line x1={100} y1={62} x2={76} y2={72} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={62} x2={124} y2={72} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Forearms → dumbbell */}
      <line x1={76} y1={72} x2={74} y2={97} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={124} y1={72} x2={126} y2={97} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={74} y1={97} x2={89} y2={112} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={126} y1={97} x2={111} y2={112} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Dumbbell */}
      <rect x={86} y={104} width={28} height={12} rx={3}
        fill="none" stroke={FIG_STROKE} strokeWidth={1.8} />
      <rect x={82} y={106} width={6} height={8} rx={1.5}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      <rect x={112} y={106} width={6} height={8} rx={1.5}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      {/* Hip */}
      <line x1={100} y1={126} x2={86} y2={128} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={126} x2={114} y2={128} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Thighs — deep, confident depth */}
      <line x1={86} y1={128} x2={58} y2={182} stroke={ACCENT} strokeWidth={3.5} />
      <line x1={114} y1={128} x2={142} y2={182} stroke={ACCENT} strokeWidth={3.5} />
      {/* Knee dots */}
      <circle cx={58} cy={182} r={5} fill={ACCENT} />
      <circle cx={142} cy={182} r={5} fill={ACCENT} />
      {/* Shins */}
      <line x1={58} y1={182} x2={46} y2={228} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={142} y1={182} x2={154} y2={228} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Feet */}
      <line x1={36} y1={236} x2={56} y2={234} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={148} y1={234} x2={168} y2={236} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Joint dots */}
      <circle cx={76} cy={72} r={3} fill={FIG_JOINT} />
      <circle cx={124} cy={72} r={3} fill={FIG_JOINT} />
      <circle cx={74} cy={97} r={3} fill={FIG_JOINT} />
      <circle cx={126} cy={97} r={3} fill={FIG_JOINT} />
      <circle cx={86} cy={128} r={3.5} fill={FIG_JOINT} />
      <circle cx={114} cy={128} r={3.5} fill={FIG_JOINT} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        QUADS · GLUTES
      </text>
    </svg>
  )
}

// ─── Exercise card ───────────────────────────────────────────────────────────

interface ExerciseData {
  name: string
  svg: React.ReactNode
  primary: string
  secondary: string
  tempo: string
  cue: string
  why: string
  note: string
}

function ExerciseCard({ ex, index }: { ex: ExerciseData; index: number }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0,
      border: '1px solid var(--paper-edge)',
      borderRadius: 12, overflow: 'hidden',
      background: 'var(--paper-deep)',
    }} className="exercise-card">
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

      <div style={{ padding: '24px 24px' }}>
        <h4 style={{
          fontSize: 16, fontWeight: 700, color: 'var(--ink)',
          letterSpacing: '-0.01em', marginBottom: 16,
        }}>
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
            <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 4 }}>
              CUE
            </p>
            <p style={{ fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.55, fontStyle: 'italic' }}>
              &ldquo;{ex.cue}&rdquo;
            </p>
          </div>
          <div>
            <span style={labelStyle}>Why this exercise</span>
            <p style={{ fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.6 }}>{ex.why}</p>
          </div>
          <div style={{
            background: 'rgba(184,84,58,0.05)', border: '1px solid rgba(184,84,58,0.10)',
            borderRadius: 8, padding: '10px 14px',
          }}>
            <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: 4 }}>
              REFLECTION
            </p>
            <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{ex.note}</p>
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
    name: 'Barbell Back Squat — Technique Focus',
    svg: <BackSquatPerfectSVG />,
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper back',
    tempo: '3 seconds down · pause at bottom · drive up',
    cue: '60% of last week\'s weight. The objective is perfection, not effort. Slow down. Feel your heels drive into the floor.',
    why: 'Deload squats serve two purposes: active recovery AND reinforcement of correct movement pattern under low fatigue.',
    note: 'Notice how much more comfortable this feels than week 2\'s barbell introduction. That growth in competence is real.',
  },
  {
    name: 'Romanian Deadlift — Range Focus',
    svg: <RDLRangeSVG />,
    primary: 'Hamstrings, Glutes',
    secondary: 'Lower back, Core',
    tempo: '4 seconds down · pause at full stretch · drive hips through',
    cue: 'Goal is maximum range of motion at minimum load. Push hips back further than usual. Feel the hamstring stretch fully.',
    why: 'Heavy RDLs build strength in mid-range. Light RDLs with full range restore mobility and reinforce the pattern at its endpoints.',
    note: 'Cutting the range because the weight feels light is the mistake. The lower load is what allows full range. Take advantage of it.',
  },
  {
    name: 'Face Pull — Shoulder Reset',
    svg: <FacePullResetSVG />,
    primary: 'Rear delts, External rotators',
    secondary: 'Middle traps',
    tempo: '1 second pull · 4 second hold · 2 seconds return',
    cue: '20 reps. Four second hold. Light weight. The rotator cuff needs this after six weeks of pressing.',
    why: 'Deload is also a joint reset. Heavy pressing compresses the anterior shoulder capsule. Face pulls with long hold actively counteract this.',
    note: 'This exercise should appear in every programme you write for yourself from here forward.',
  },
  {
    name: 'Hip Thrust — 60% Load, Full Squeeze Focus',
    svg: <HipThrustLightSVG />,
    primary: 'Glutes',
    secondary: 'Hamstrings',
    tempo: '1 second up · 3 second hold · 2 seconds lower',
    cue: 'Lighter than it has ever been. The hold is three seconds. The point is neural activation of the glute at low fatigue.',
    why: 'Low-load, high-quality hip thrusts during deload maintain glute activation without tissue stress.',
    note: 'Compare this to week 1\'s bodyweight hip thrust. The feel has changed. The muscle memory has changed.',
  },
  {
    name: 'Goblet Squat — Full Circle',
    svg: <GobletSquatFinalSVG />,
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper back',
    tempo: '3 seconds down · pause · 1 second up',
    cue: 'The exercise this programme started with. Same movement. Deliberately chosen for Friday so you can feel the difference.',
    why: 'The goblet squat in week 7 is a bookend and a benchmark. How does it compare to session A, week 1? Easier. More controlled. Better depth.',
    note: 'After your Friday session, take a moment. You are one week from completing eight weeks of consistent training.',
  },
]

export default function ExerciseBreakdowns() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 8 }}>
        Deload week exercises · Technique and recovery focus · All at 60%
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
