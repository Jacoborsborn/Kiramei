const ACCENT = 'var(--accent)'
const FIG_STROKE = 'var(--ink-soft)'
const FIG_JOINT = 'var(--ink)'
const FIG_THIN = 'var(--ink-muted)'

// ─── SVG figures ─────────────────────────────────────────────────────────────

function ChestSupportedRowSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Incline bench */}
      <rect x={20} y={100} width={120} height={14} rx={4}
        fill="rgba(184,84,58,0.10)" stroke="rgba(184,84,58,0.20)" strokeWidth={1.5}
        transform="rotate(-45 80 107)" />
      {/* Bench leg */}
      <line x1={90} y1={148} x2={96} y2={190} stroke="var(--paper-edge)" strokeWidth={2} />
      {/* Figure prone on bench — head at top-left */}
      {/* Head */}
      <circle cx={38} cy={74} r={11} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={49} y1={77} x2={58} y2={84} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso along bench angle */}
      <line x1={58} y1={84} x2={130} y2={160} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Chest on pad indicator */}
      <ellipse cx={82} cy={114} rx={10} ry={6}
        fill={ACCENT} fillOpacity={0.2} />
      {/* Near shoulder */}
      <circle cx={68} cy={95} r={3.5} fill={FIG_JOINT} />
      {/* Near arm — rowing back, elbow high */}
      <line x1={68} y1={95} x2={50} y2={70} stroke={ACCENT} strokeWidth={2.5} />
      <circle cx={50} cy={70} r={3.5} fill={FIG_JOINT} />
      <line x1={50} y1={70} x2={36} y2={58} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Dumbbell at near hand */}
      <rect x={20} y={50} width={18} height={10} rx={2.5}
        fill="none" stroke={FIG_STROKE} strokeWidth={1.8} />
      <rect x={16} y={52} width={6} height={6} rx={1.2}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      {/* Far arm — hanging down starting position */}
      <line x1={78} y1={104} x2={96} y2={118} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={96} y1={118} x2={108} y2={146} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Dumbbell far hand hanging */}
      <rect x={104} y={144} width={14} height={8} rx={2}
        fill="none" stroke={FIG_THIN} strokeWidth={1.3} />
      {/* Lat highlight — primary muscle */}
      <path d="M 68 95 Q 82 108 90 130" stroke={ACCENT} strokeWidth={3} fill="none" strokeOpacity={0.7} />
      {/* Rhomboid area */}
      <rect x={70} y={88} width={18} height={26} rx={4}
        fill={ACCENT} fillOpacity={0.15} />
      {/* Lower legs */}
      <line x1={130} y1={160} x2={140} y2={200} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={140} y1={200} x2={155} y2={232} stroke={FIG_STROKE} strokeWidth={1.8} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        LATS · RHOMBOIDS · MID TRAPS
      </text>
    </svg>
  )
}

function TricepSupersetSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Cable column on right */}
      <rect x={164} y={30} width={12} height={180} rx={3}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      {/* Cable pulley */}
      <circle cx={170} cy={44} r={5} fill="none" stroke="rgba(184,84,58,0.25)" strokeWidth={1.5} />
      {/* Standing figure — side view */}
      {/* Head */}
      <circle cx={90} cy={34} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={90} y1={46} x2={90} y2={58} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso */}
      <line x1={90} y1={58} x2={90} y2={148} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Hip */}
      <circle cx={90} cy={148} r={4.5} fill={FIG_JOINT} />
      {/* Near leg */}
      <line x1={90} y1={148} x2={86} y2={200} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={86} cy={200} r={3.5} fill={FIG_JOINT} />
      <line x1={86} y1={200} x2={84} y2={232} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={74} y1={235} x2={94} y2={234} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Far leg */}
      <line x1={90} y1={148} x2={96} y2={200} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={96} y1={200} x2={98} y2={232} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Near shoulder */}
      <circle cx={80} cy={66} r={3.5} fill={FIG_JOINT} />
      {/* Upper arm — locked at side */}
      <line x1={80} y1={66} x2={82} y2={112} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={82} cy={112} r={3.5} fill={FIG_JOINT} />
      {/* Forearm pushing down — tricep extended */}
      <line x1={82} y1={112} x2={120} y2={148} stroke={ACCENT} strokeWidth={3} />
      <circle cx={120} cy={148} r={3.5} fill={ACCENT} />
      {/* Handle */}
      <rect x={116} y={144} width={10} height={6} rx={2}
        fill="none" stroke={FIG_STROKE} strokeWidth={1.5} />
      {/* Cable rope to pulley */}
      <line x1={120} y1={144} x2={164} y2={44} stroke="rgba(184,84,58,0.20)" strokeWidth={1} strokeDasharray="3 2" />
      {/* Tricep highlight */}
      <path d="M 80 66 Q 84 90 82 112" stroke={ACCENT} strokeWidth={3.5} fill="none" strokeOpacity={0.8} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        TRICEPS (ALL 3 HEADS)
      </text>
    </svg>
  )
}

function CurlSupersetSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Standing figure */}
      {/* Head */}
      <circle cx={100} cy={34} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={46} x2={100} y2={58} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso */}
      <line x1={100} y1={58} x2={100} y2={148} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Hip */}
      <circle cx={100} cy={148} r={4.5} fill={FIG_JOINT} />
      {/* Legs */}
      <line x1={100} y1={148} x2={90} y2={204} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={90} cy={204} r={3.5} fill={FIG_JOINT} />
      <line x1={90} y1={204} x2={88} y2={234} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={78} y1={237} x2={98} y2={236} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={148} x2={112} y2={204} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={112} y1={204} x2={114} y2={234} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Near shoulder */}
      <circle cx={86} cy={66} r={3.5} fill={FIG_JOINT} />
      {/* Upper arm */}
      <line x1={86} y1={66} x2={84} y2={112} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={84} cy={112} r={3.5} fill={FIG_JOINT} />
      {/* Forearm curled — peak contraction */}
      <line x1={84} y1={112} x2={72} y2={80} stroke={ACCENT} strokeWidth={3} />
      <circle cx={72} cy={80} r={3.5} fill={ACCENT} />
      {/* EZ bar */}
      <line x1={56} y1={76} x2={88} y2={80} stroke={FIG_STROKE} strokeWidth={3} />
      <rect x={50} y={72} width={8} height={10} rx={2}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      <rect x={88} y={72} width={8} height={10} rx={2}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      {/* Far arm */}
      <circle cx={114} cy={66} r={3.5} fill={FIG_JOINT} />
      <line x1={114} y1={66} x2={116} y2={112} stroke={FIG_THIN} strokeWidth={1.5} />
      <circle cx={116} cy={112} r={3} fill={FIG_JOINT} />
      <line x1={116} y1={112} x2={128} y2={82} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Bicep highlight */}
      <path d="M 86 66 Q 80 88 84 112" stroke={ACCENT} strokeWidth={3.5} fill="none" strokeOpacity={0.85} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        BICEPS · BRACHIALIS
      </text>
    </svg>
  )
}

function BulgarianSplitSquatSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Bench for rear foot */}
      <rect x={120} y={178} width={64} height={12} rx={3}
        fill="rgba(184,84,58,0.10)" stroke="rgba(184,84,58,0.20)" strokeWidth={1.5} />
      {/* Head */}
      <circle cx={72} cy={46} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={72} y1={58} x2={72} y2={70} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — upright */}
      <line x1={72} y1={70} x2={72} y2={152} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Shoulders */}
      <circle cx={60} cy={78} r={3.5} fill={FIG_JOINT} />
      <circle cx={84} cy={78} r={3.5} fill={FIG_JOINT} />
      {/* Arms — holding dumbbells at sides */}
      <line x1={60} y1={78} x2={52} y2={134} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={52} cy={134} r={3} fill={FIG_JOINT} />
      <line x1={84} y1={78} x2={92} y2={134} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={92} cy={134} r={3} fill={FIG_JOINT} />
      {/* Dumbbells */}
      <rect x={44} y={132} width={14} height={8} rx={2}
        fill="none" stroke={FIG_STROKE} strokeWidth={1.5} />
      <rect x={86} y={132} width={14} height={8} rx={2}
        fill="none" stroke={FIG_STROKE} strokeWidth={1.5} />
      {/* Front thigh — primary, angled down at ~70deg */}
      <line x1={68} y1={152} x2={48} y2={220} stroke={ACCENT} strokeWidth={3.5} />
      <circle cx={48} cy={220} r={5} fill={ACCENT} />
      {/* Front shin */}
      <line x1={48} y1={220} x2={44} y2={252} stroke={FIG_STROKE} strokeWidth={2.2} />
      <line x1={34} y1={255} x2={54} y2={254} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Rear thigh — goes back and up to bench */}
      <line x1={76} y1={152} x2={128} y2={138} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={128} cy={138} r={3.5} fill={FIG_JOINT} />
      {/* Rear shin down to bench */}
      <line x1={128} y1={138} x2={148} y2={182} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Hip joint */}
      <circle cx={72} cy={152} r={4.5} fill={FIG_JOINT} />
      {/* Glute highlight */}
      <ellipse cx={76} cy={148} rx={10} ry={8}
        fill={ACCENT} fillOpacity={0.18} />
      <text x={100} y={272} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        QUADS · GLUTES
      </text>
    </svg>
  )
}

function FacePullSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Cable column on right */}
      <rect x={166} y={30} width={12} height={160} rx={3}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      {/* Pulley */}
      <circle cx={172} cy={100} r={5} fill="none" stroke="rgba(184,84,58,0.25)" strokeWidth={1.5} />
      {/* Standing figure — side view */}
      {/* Head */}
      <circle cx={82} cy={58} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={82} y1={70} x2={82} y2={82} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso */}
      <line x1={82} y1={82} x2={82} y2={160} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Hip */}
      <circle cx={82} cy={160} r={4.5} fill={FIG_JOINT} />
      {/* Legs */}
      <line x1={82} y1={160} x2={74} y2={210} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={74} cy={210} r={3.5} fill={FIG_JOINT} />
      <line x1={74} y1={210} x2={72} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={62} y1={243} x2={82} y2={242} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={82} y1={160} x2={92} y2={210} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={92} y1={210} x2={94} y2={240} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Near shoulder */}
      <circle cx={68} cy={90} r={3.5} fill={FIG_JOINT} />
      {/* Upper arm — raised, elbow high and out */}
      <line x1={68} y1={90} x2={44} y2={74} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={44} cy={74} r={3.5} fill={FIG_JOINT} />
      {/* Forearm — hands at ear level, pulled back */}
      <line x1={44} y1={74} x2={64} y2={62} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={64} cy={62} r={3} fill={FIG_STROKE} />
      {/* Far arm — symmetric */}
      <circle cx={96} cy={90} r={3.5} fill={FIG_JOINT} />
      <line x1={96} y1={90} x2={122} y2={76} stroke={FIG_THIN} strokeWidth={1.5} />
      <circle cx={122} cy={76} r={3} fill={FIG_JOINT} />
      <line x1={122} y1={76} x2={106} y2={64} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Cable lines to pulley */}
      <line x1={64} y1={62} x2={166} y2={100} stroke="rgba(184,84,58,0.20)" strokeWidth={1} strokeDasharray="3 2" />
      {/* Rear delt highlight */}
      <ellipse cx={68} cy={88} rx={10} ry={8}
        fill={ACCENT} fillOpacity={0.22} />
      <line x1={68} y1={90} x2={44} y2={74} stroke={ACCENT} strokeWidth={3} strokeOpacity={0.7} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        REAR DELTS · EXT ROTATORS
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
    name: 'Chest Supported Row',
    svg: <ChestSupportedRowSVG />,
    primary: 'Lats, Rhomboids, Middle traps',
    secondary: 'Rear delt, Biceps',
    tempo: '1 second row · 2 second hold · 2 seconds lower',
    cue: 'Chest stays in contact with the pad for every rep. If it lifts, your lower back is taking over.',
    why: 'Every row you have done has some lower back involvement. This removes it completely.',
    mistake: 'Shrugging at the top instead of retracting the shoulder blades. Drive elbows back and down, not up.',
  },
  {
    name: 'Tricep Superset — Pushdown + Overhead Extension',
    svg: <TricepSupersetSVG />,
    primary: 'Triceps (all three heads)',
    secondary: 'None significant',
    tempo: '1 second push · 1 second hold · 2 seconds return on both',
    cue: 'No rest between exercises. Pushdown first, then straight into overhead extension. Rest 90 seconds after both.',
    why: 'Pushdown emphasises lateral and medial heads. Overhead hits the long head. One superset trains all three.',
    mistake: 'Going too heavy. Start 30% lighter than your solo overhead weight.',
  },
  {
    name: 'Curl Superset — EZ Bar + Hammer',
    svg: <CurlSupersetSVG />,
    primary: 'Biceps brachii (EZ), Brachialis (Hammer)',
    secondary: 'Brachioradialis, Forearm flexors',
    tempo: '1 second up · 1 second squeeze · 2 seconds lower on both',
    cue: 'EZ bar first — straight into hammers with no rest. Your arms should be significantly fatigued by the end.',
    why: 'Two different grips train different aspects of the same muscle group. Together more comprehensive than either alone.',
    mistake: 'Rushing between the exercises. Move immediately but do not sacrifice setup.',
  },
  {
    name: 'Bulgarian Split Squat (Weighted)',
    svg: <BulgarianSplitSquatSVG />,
    primary: 'Quads, Glutes',
    secondary: 'Hamstrings, Core, Hip flexors',
    tempo: '3 seconds down · pause · drive up',
    cue: 'You started this at bodyweight in week 3. This week you add dumbbells. The movement pattern is exactly the same.',
    why: 'Develops unilateral leg strength. Identifies and corrects imbalances. Also stretches hip flexor of rear leg.',
    mistake: 'Front foot migrating forward as fatigue sets in. Place a marker for your foot position.',
  },
  {
    name: 'Face Pull (4×20)',
    svg: <FacePullSVG />,
    primary: 'Rear deltoids, External rotators',
    secondary: 'Middle traps, Rhomboids',
    tempo: '1 second pull · 3 second hold · 2 seconds return',
    cue: 'Twenty reps. Three second hold. This is shoulder health exercise first. The external rotation at the end is everything.',
    why: 'Six weeks of pressing accumulates stress on the anterior shoulder. Face pulls counteract this completely.',
    mistake: 'Pulling to the chin instead of the face with elbows high.',
  },
]

export default function ExerciseBreakdowns() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 8 }}>
        Week 6 key exercises · Primary muscle highlighted in each diagram
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
