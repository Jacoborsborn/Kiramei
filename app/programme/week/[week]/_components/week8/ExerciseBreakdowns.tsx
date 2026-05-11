const ACCENT = 'var(--accent)'
const FIG_STROKE = 'var(--ink-soft)'
const FIG_JOINT = 'var(--ink)'
const FIG_THIN = 'var(--ink-muted)'

// ─── SVG figures ─────────────────────────────────────────────────────────────

function PBSquatSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Heavy bar */}
      <line x1={34} y1={72} x2={166} y2={72} stroke={FIG_STROKE} strokeWidth={3.5} />
      {/* Large plates */}
      <rect x={26} y={64} width={10} height={18} rx={2}
        fill="rgba(184,84,58,0.12)" stroke="rgba(184,84,58,0.35)" strokeWidth={1.5} />
      <rect x={164} y={64} width={10} height={18} rx={2}
        fill="rgba(184,84,58,0.12)" stroke="rgba(184,84,58,0.35)" strokeWidth={1.5} />
      {/* Second plates */}
      <rect x={18} y={66} width={8} height={14} rx={1.5}
        fill="rgba(184,84,58,0.10)" stroke="rgba(184,84,58,0.20)" strokeWidth={1} />
      <rect x={174} y={66} width={8} height={14} rx={1.5}
        fill="rgba(184,84,58,0.10)" stroke="rgba(184,84,58,0.20)" strokeWidth={1} />
      {/* Head */}
      <circle cx={100} cy={44} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={56} x2={100} y2={70} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — tension visible, driving up */}
      <line x1={100} y1={70} x2={96} y2={138} stroke={FIG_STROKE} strokeWidth={2.8} />
      {/* Shoulders */}
      <circle cx={72} cy={76} r={3.5} fill={FIG_JOINT} />
      <circle cx={128} cy={76} r={3.5} fill={FIG_JOINT} />
      <line x1={72} y1={76} x2={58} y2={72} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={128} y1={76} x2={142} y2={72} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Hip */}
      <circle cx={96} cy={138} r={5} fill={FIG_JOINT} />
      {/* Thighs — at parallel, driving up */}
      <line x1={96} y1={138} x2={64} y2={186} stroke={ACCENT} strokeWidth={4} />
      <line x1={96} y1={138} x2={132} y2={186} stroke={ACCENT} strokeWidth={4} />
      <circle cx={64} cy={186} r={5.5} fill={ACCENT} />
      <circle cx={132} cy={186} r={5.5} fill={ACCENT} />
      {/* Shins */}
      <line x1={64} y1={186} x2={56} y2={232} stroke={FIG_STROKE} strokeWidth={2.2} />
      <line x1={132} y1={186} x2={148} y2={232} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Feet */}
      <line x1={42} y1={238} x2={62} y2={236} stroke={FIG_STROKE} strokeWidth={2.2} />
      <line x1={142} y1={236} x2={162} y2={238} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Glute + core tension highlight */}
      <ellipse cx={92} cy={140} rx={14} ry={10}
        fill={ACCENT} fillOpacity={0.22} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        QUADS · GLUTES · CORE
      </text>
    </svg>
  )
}

function PBDeadliftSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Figure at peak of deadlift — hips through, bar at hips */}
      {/* Head */}
      <circle cx={96} cy={36} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={96} y1={48} x2={96} y2={60} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso upright, shoulders back */}
      <line x1={96} y1={60} x2={96} y2={150} stroke={FIG_STROKE} strokeWidth={2.8} />
      {/* Shoulders — pulled back, chest up */}
      <circle cx={78} cy={68} r={3.5} fill={FIG_JOINT} />
      <circle cx={114} cy={68} r={3.5} fill={FIG_JOINT} />
      {/* Arms — straight down to bar */}
      <line x1={78} y1={68} x2={70} y2={144} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={70} cy={144} r={3} fill={FIG_JOINT} />
      <line x1={70} y1={144} x2={70} y2={164} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={114} y1={68} x2={122} y2={144} stroke={FIG_THIN} strokeWidth={1.5} />
      <circle cx={122} cy={144} r={3} fill={FIG_JOINT} />
      <line x1={122} y1={144} x2={122} y2={164} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Heavy barbell at hip height */}
      <line x1={32} y1={164} x2={168} y2={164} stroke={FIG_STROKE} strokeWidth={3.5} />
      <rect x={24} y={156} width={10} height={18} rx={2}
        fill="rgba(184,84,58,0.12)" stroke="rgba(184,84,58,0.35)" strokeWidth={1.5} />
      <rect x={166} y={156} width={10} height={18} rx={2}
        fill="rgba(184,84,58,0.12)" stroke="rgba(184,84,58,0.35)" strokeWidth={1.5} />
      <rect x={16} y={158} width={8} height={14} rx={1.5}
        fill="rgba(184,84,58,0.08)" stroke="rgba(184,84,58,0.18)" strokeWidth={1} />
      <rect x={176} y={158} width={8} height={14} rx={1.5}
        fill="rgba(184,84,58,0.08)" stroke="rgba(184,84,58,0.18)" strokeWidth={1} />
      {/* Hip joint */}
      <circle cx={96} cy={150} r={5} fill={FIG_JOINT} />
      {/* Legs — straight, hips driven through */}
      <line x1={92} y1={150} x2={84} y2={208} stroke={ACCENT} strokeWidth={3.5} />
      <circle cx={84} cy={208} r={4.5} fill={FIG_JOINT} />
      <line x1={84} y1={208} x2={80} y2={244} stroke={FIG_STROKE} strokeWidth={2.2} />
      <line x1={70} y1={248} x2={90} y2={247} stroke={FIG_STROKE} strokeWidth={2.2} />
      <line x1={100} y1={150} x2={108} y2={208} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Trap/back highlight */}
      <rect x={80} y={62} width={16} height={80} rx={4}
        fill={ACCENT} fillOpacity={0.15} />
      <text x={100} y={272} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        HAMSTRINGS · GLUTES · LATS · TRAPS
      </text>
    </svg>
  )
}

function PBHipThrustSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Bench */}
      <rect x={16} y={140} width={80} height={14} rx={4}
        fill="rgba(184,84,58,0.10)" stroke="rgba(184,84,58,0.20)" strokeWidth={1.5} />
      {/* Head */}
      <circle cx={26} cy={130} r={11} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Upper body on bench */}
      <line x1={37} y1={133} x2={55} y2={140} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Body at full extension */}
      <line x1={55} y1={140} x2={148} y2={108} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Arms */}
      <line x1={72} y1={142} x2={80} y2={164} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={80} y1={164} x2={88} y2={172} stroke={FIG_STROKE} strokeWidth={1.8} />
      {/* Heavy bar with large plates */}
      <line x1={108} y1={102} x2={190} y2={102} stroke={FIG_STROKE} strokeWidth={3.5} />
      <rect x={108} y={95} width={12} height={16} rx={2}
        fill="rgba(184,84,58,0.12)" stroke="rgba(184,84,58,0.35)" strokeWidth={1.5} />
      <rect x={178} y={95} width={12} height={16} rx={2}
        fill="rgba(184,84,58,0.12)" stroke="rgba(184,84,58,0.35)" strokeWidth={1.5} />
      {/* Hip — maximal glute squeeze */}
      <circle cx={148} cy={108} r={8} fill={ACCENT} fillOpacity={0.35} stroke={ACCENT} strokeWidth={2} />
      {/* Thigh */}
      <line x1={148} y1={108} x2={160} y2={162} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={160} cy={162} r={4} fill={FIG_JOINT} />
      {/* Shin vertical */}
      <line x1={160} y1={162} x2={157} y2={208} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={147} y1={212} x2={170} y2={212} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Floor */}
      <line x1={16} y1={215} x2={184} y2={215} stroke="var(--paper-edge)" strokeWidth={1} />
      {/* Far leg */}
      <line x1={148} y1={108} x2={166} y2={160} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={166} y1={160} x2={164} y2={205} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Glute fill */}
      <ellipse cx={143} cy={114} rx={16} ry={12}
        fill={ACCENT} fillOpacity={0.25} />
      <text x={100} y={244} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        GLUTES (MAXIMUS · MEDIUS)
      </text>
    </svg>
  )
}

function GiantSetCurlSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Standing figure — EZ bar curl */}
      <circle cx={100} cy={34} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={46} x2={100} y2={58} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={58} x2={100} y2={148} stroke={FIG_STROKE} strokeWidth={2.4} />
      <circle cx={100} cy={148} r={4.5} fill={FIG_JOINT} />
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
      {/* Forearm — peak contraction */}
      <line x1={84} y1={112} x2={70} y2={78} stroke={ACCENT} strokeWidth={3.5} />
      {/* EZ bar */}
      <line x1={50} y1={70} x2={90} y2={76} stroke={FIG_STROKE} strokeWidth={3} />
      <rect x={42} y={64} width={10} height={12} rx={2}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      <rect x={88} y={64} width={10} height={12} rx={2}
        fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      {/* Far arm */}
      <circle cx={114} cy={66} r={3.5} fill={FIG_JOINT} />
      <line x1={114} y1={66} x2={116} y2={112} stroke={FIG_THIN} strokeWidth={1.5} />
      <circle cx={116} cy={112} r={3} fill={FIG_JOINT} />
      <line x1={116} y1={112} x2={130} y2={80} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Bicep highlight */}
      <path d="M 86 66 Q 79 89 84 112" stroke={ACCENT} strokeWidth={4} fill="none" strokeOpacity={0.9} />
      {/* Giant set badge */}
      <rect x={140} y={48} width={50} height={28} rx={5}
        fill="rgba(184,84,58,0.10)" stroke="rgba(184,84,58,0.18)" strokeWidth={1} />
      <text x={165} y={60} textAnchor="middle" fontSize={7.5} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={700}>GIANT</text>
      <text x={165} y={70} textAnchor="middle" fontSize={7.5} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={700}>SET ×3</text>
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        BICEPS · BRACHIALIS · BRACHIORADIALIS
      </text>
    </svg>
  )
}

function WeightedPullUpSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Pull-up bar */}
      <line x1={20} y1={30} x2={180} y2={30} stroke={FIG_STROKE} strokeWidth={3.5} />
      <rect x={14} y={22} width={10} height={16} rx={2}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1} />
      <rect x={176} y={22} width={10} height={16} rx={2}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1} />
      {/* Hands gripping bar */}
      <circle cx={74} cy={32} r={4} fill={FIG_JOINT} />
      <circle cx={126} cy={32} r={4} fill={FIG_JOINT} />
      {/* Arms pulling — mid-pull */}
      <line x1={74} y1={32} x2={70} y2={68} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={70} cy={68} r={3.5} fill={FIG_JOINT} />
      <line x1={126} y1={32} x2={130} y2={68} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={130} cy={68} r={3.5} fill={FIG_JOINT} />
      {/* Forearms — elbows driving down */}
      <line x1={70} y1={68} x2={82} y2={90} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={130} y1={68} x2={118} y2={90} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Head */}
      <circle cx={100} cy={80} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={92} x2={100} y2={104} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso */}
      <line x1={100} y1={104} x2={100} y2={184} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Hip */}
      <circle cx={100} cy={184} r={4.5} fill={FIG_JOINT} />
      {/* Legs hanging — weight belt area */}
      <line x1={96} y1={184} x2={90} y2={230} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={90} cy={230} r={3.5} fill={FIG_JOINT} />
      <line x1={90} y1={230} x2={88} y2={254} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={104} y1={184} x2={110} y2={230} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Weight plate hanging from belt */}
      <ellipse cx={100} cy={200} rx={14} ry={10}
        fill="rgba(184,84,58,0.10)" stroke="rgba(184,84,58,0.25)" strokeWidth={1.5} />
      <text x={100} y={204} textAnchor="middle" fontSize={7.5} fill="var(--accent)"
        fontFamily="DM Sans, sans-serif" fontWeight={700}>+wt</text>
      {/* Lat highlight — elbows driving down */}
      <path d="M 70 68 Q 78 100 100 108" stroke={ACCENT} strokeWidth={3.5} fill="none" strokeOpacity={0.85} />
      <path d="M 130 68 Q 122 100 100 108" stroke={ACCENT} strokeWidth={3.5} fill="none" strokeOpacity={0.85} />
      <text x={100} y={275} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        LATS · RHOMBOIDS · BICEPS
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
    name: 'Barbell Back Squat — Personal Best',
    svg: <PBSquatSVG />,
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper back, Hamstrings',
    tempo: 'Controlled descent · pause · explosive drive',
    cue: 'Five sets of five at RPE 9. Heaviest squat of the programme. Set up carefully, full 2 minutes rest between sets.',
    why: 'Whatever your week 6 working weight was — add 5–10kg. The deload has cleared the fatigue that was limiting you.',
    mistake: 'Going too heavy on set 1. Start at what is achievable for 5 reps at RPE 8. Add for subsequent sets.',
  },
  {
    name: 'Deadlift — 5×3 at RPE 9',
    svg: <PBDeadliftSVG />,
    primary: 'Hamstrings, Glutes, Lower back, Lats, Traps',
    secondary: 'Core, Quads',
    tempo: 'Deliberate setup · single controlled pull · controlled lower',
    cue: 'Three reps per set at RPE 9. Full 3 minutes rest between sets. Heaviest deadlift of the programme — treat it accordingly.',
    why: 'At very high RPE, lower reps protect form across sets. Five sets of three gives the same volume as three sets of five but maintains maximum intent on every rep.',
    mistake: 'Pulling five sets in quick succession. The rest is structural. Incomplete rest at RPE 9 is how form breaks down.',
  },
  {
    name: 'Hip Thrust — 5 Sets Personal Best',
    svg: <PBHipThrustSVG />,
    primary: 'Glutes (maximus, medius)',
    secondary: 'Hamstrings, Core',
    tempo: '1 second drive · 2 second hold · 2 seconds lower',
    cue: 'Five sets of ten at RPE 8. Most hip thrust volume in the programme. You started at bodyweight. Today you do five loaded sets.',
    why: 'Glutes respond to higher volume. Five sets at peak strength produces a training stimulus the body has not encountered before. Deliberate peak.',
    mistake: 'Losing the two-second hold by set 4. Drop weight 5% and maintain the hold. The hold is the stimulus.',
  },
  {
    name: 'Full Curl Giant Set — EZ + Hammer + Cable',
    svg: <GiantSetCurlSVG />,
    primary: 'Biceps brachii, Brachialis, Brachioradialis',
    secondary: 'Forearm flexors',
    tempo: '1 second up · 1 second hold · 2 seconds lower on all three',
    cue: 'Three exercises. No rest between. EZ bar → hammers → cable curl. Cable keeps constant tension when bicep is already exhausted.',
    why: 'High metabolic stress, high time under tension, significant muscle damage in a controlled way. You recover fully before starting your next programme.',
    mistake: 'Going too heavy on the EZ bar knowing two exercises follow. Reduce by 20% from normal working weight.',
  },
  {
    name: 'Weighted Pull-Up',
    svg: <WeightedPullUpSVG />,
    primary: 'Lats, Rhomboids',
    secondary: 'Biceps, Rear delt, Core',
    tempo: '1 second up · 1 second hold at top · 3 seconds lower',
    cue: 'Add weight if bodyweight felt like RPE 7 in recent weeks. The controlled 3-second lower is where significant lat stimulus lives. Do not drop from the top.',
    why: 'Weighted pull-ups are a benchmark of upper body pulling strength. Being able to perform them after eight weeks — starting from wherever you started — is a meaningful marker of progress.',
    mistake: 'Partial range — not achieving full arm extension at the bottom. Dead hang at the bottom of every rep.',
  },
]

export default function ExerciseBreakdowns() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 8 }}>
        Week 8 personal best exercises · Primary muscle highlighted in each diagram
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
