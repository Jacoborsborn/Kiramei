const ACCENT = 'var(--accent)'
const FIG_STROKE = 'var(--ink-soft)'
const FIG_JOINT = 'var(--ink)'
const FIG_THIN = 'var(--ink-muted)'
const TEXT_MAIN = 'var(--ink)'
const TEXT_DIM = 'var(--ink-soft)'
const TEXT_MUTED = 'var(--ink-muted)'

// ─── SVG Figures ─────────────────────────────────────────────────────────────

function ConventionalDeadliftSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Side view: hinge position, flat back, bar on floor */}
      {/* Head */}
      <circle cx={72} cy={44} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={72} y1={56} x2={76} y2={66} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso angled ~45° */}
      <line x1={76} y1={66} x2={118} y2={148} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Shoulders */}
      <circle cx={76} cy={66} r={4} fill={FIG_JOINT} />
      {/* Arms reaching down to bar */}
      <line x1={76} y1={66} x2={84} y2={108} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={84} y1={108} x2={100} y2={178} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Bar */}
      <rect x={36} y={178} width={128} height={8} rx={3} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Plates */}
      <rect x={32} y={172} width={8} height={20} rx={2} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      <rect x={160} y={172} width={8} height={20} rx={2} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Hip joint */}
      <circle cx={118} cy={148} r={5} fill={FIG_JOINT} />
      {/* Legs — PRIMARY hamstrings/glutes in accent */}
      <line x1={118} y1={148} x2={108} y2={200} stroke={ACCENT} strokeWidth={3} />
      <circle cx={108} cy={200} r={4} fill={ACCENT} />
      <line x1={108} y1={200} x2={100} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Far leg suggestion */}
      <line x1={118} y1={148} x2={130} y2={200} stroke={ACCENT} strokeWidth={2.5} />
      <circle cx={130} cy={200} r={3.5} fill={ACCENT} />
      <line x1={130} y1={200} x2={138} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Feet */}
      <line x1={88} y1={244} x2={112} y2={242} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={126} y1={242} x2={150} y2={244} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Spine line — lower back primary */}
      <line x1={76} y1={66} x2={118} y2={148} stroke={ACCENT} strokeWidth={2.5} opacity={0.5} />
      {/* Label */}
      <text x={100} y={268} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        HAMSTRINGS · GLUTES · BACK
      </text>
    </svg>
  )
}

function AbWheelSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Kneeling position, body extended forward */}
      {/* Head forward */}
      <circle cx={148} cy={88} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={148} y1={100} x2={140} y2={112} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso angled — near horizontal */}
      <line x1={140} y1={112} x2={76} y2={148} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Arms extended to wheel */}
      <line x1={140} y1={112} x2={148} y2={142} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={148} cy={142} r={3.5} fill={FIG_JOINT} />
      <line x1={148} y1={142} x2={152} y2={178} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Ab wheel */}
      <circle cx={152} cy={190} r={14} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={138} y1={190} x2={166} y2={190} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Hip joint */}
      <circle cx={76} cy={148} r={5} fill={FIG_JOINT} />
      {/* Thighs — kneeling */}
      <line x1={76} y1={148} x2={78} y2={200} stroke={FIG_STROKE} strokeWidth={2.2} />
      <line x1={76} y1={148} x2={94} y2={196} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Knees on ground */}
      <circle cx={78} cy={200} r={4} fill={FIG_JOINT} />
      <circle cx={94} cy={196} r={3.5} fill={FIG_JOINT} />
      <line x1={66} y1={208} x2={90} y2={206} stroke={FIG_STROKE} strokeWidth={1.5} />
      <line x1={82} y1={204} x2={106} y2={202} stroke={FIG_STROKE} strokeWidth={1.5} />
      {/* Core highlight */}
      <line x1={140} y1={112} x2={76} y2={148} stroke={ACCENT} strokeWidth={2.5} opacity={0.6} />
      {/* Label */}
      <text x={100} y={268} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        CORE · ABS · ANTI-EXTENSION
      </text>
    </svg>
  )
}

function CablePullThroughSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Side view: hinging at hips, facing away from cable */}
      {/* Head */}
      <circle cx={72} cy={52} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={72} y1={64} x2={76} y2={76} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso hinged ~50° */}
      <line x1={76} y1={76} x2={116} y2={150} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Arms reaching back between legs */}
      <line x1={76} y1={76} x2={88} y2={100} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={88} cy={100} r={3} fill={FIG_JOINT} />
      <line x1={88} y1={100} x2={106} y2={152} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Cable attachment */}
      <circle cx={108} cy={158} r={5} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={108} y1={163} x2={108} y2={188} stroke={FIG_THIN} strokeWidth={1.5} strokeDasharray="3 2" />
      {/* Hip joint */}
      <circle cx={116} cy={150} r={5} fill={FIG_JOINT} />
      {/* Glutes/hamstrings — PRIMARY */}
      <line x1={116} y1={150} x2={108} y2={200} stroke={ACCENT} strokeWidth={3} />
      <circle cx={108} cy={200} r={4} fill={ACCENT} />
      <line x1={116} y1={150} x2={130} y2={198} stroke={ACCENT} strokeWidth={2.5} />
      <circle cx={130} cy={198} r={3.5} fill={ACCENT} />
      {/* Shins */}
      <line x1={108} y1={200} x2={100} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={130} y1={198} x2={140} y2={238} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Feet */}
      <line x1={88} y1={244} x2={112} y2={242} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={128} y1={242} x2={152} y2={244} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Label */}
      <text x={100} y={268} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        GLUTES · HAMSTRINGS
      </text>
    </svg>
  )
}

function RearDeltFlySVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Bent over 45°, arms raised to sides */}
      {/* Head */}
      <circle cx={80} cy={50} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={80} y1={62} x2={82} y2={72} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso ~45° forward */}
      <line x1={82} y1={72} x2={118} y2={138} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Shoulder joints */}
      <circle cx={82} cy={72} r={4} fill={FIG_JOINT} />
      {/* Arms raised out to sides — rear delt activated */}
      <line x1={82} y1={72} x2={44} y2={54} stroke={ACCENT} strokeWidth={2.8} />
      <circle cx={44} cy={54} r={3.5} fill={ACCENT} />
      <line x1={44} y1={54} x2={34} y2={68} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={82} y1={72} x2={120} y2={54} stroke={ACCENT} strokeWidth={2.8} />
      <circle cx={120} cy={54} r={3.5} fill={ACCENT} />
      <line x1={120} y1={54} x2={132} y2={68} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Dumbbells at ends */}
      <rect x={22} y={64} width={16} height={8} rx={2} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      <rect x={130} y={64} width={16} height={8} rx={2} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Hip */}
      <circle cx={118} cy={138} r={5} fill={FIG_JOINT} />
      {/* Legs */}
      <line x1={118} y1={138} x2={108} y2={192} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={108} cy={192} r={4} fill={FIG_JOINT} />
      <line x1={108} y1={192} x2={100} y2={238} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={118} y1={138} x2={130} y2={190} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={130} cy={190} r={3.5} fill={FIG_JOINT} />
      <line x1={130} y1={190} x2={140} y2={236} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Feet */}
      <line x1={88} y1={242} x2={112} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={128} y1={240} x2={152} y2={242} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Label */}
      <text x={100} y={268} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        REAR DELTOID
      </text>
    </svg>
  )
}

function EZBarCurlSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Standing, bar curled to ~70° */}
      {/* Head */}
      <circle cx={100} cy={32} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={44} x2={100} y2={56} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso upright */}
      <line x1={100} y1={56} x2={100} y2={138} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Shoulders */}
      <circle cx={100} cy={60} r={4} fill={FIG_JOINT} />
      {/* Upper arms — pinned at sides */}
      <line x1={100} y1={60} x2={72} y2={100} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={60} x2={128} y2={100} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={72} cy={100} r={3.5} fill={FIG_JOINT} />
      <circle cx={128} cy={100} r={3.5} fill={FIG_JOINT} />
      {/* Forearms raised — bicep activated */}
      <line x1={72} y1={100} x2={66} y2={136} stroke={ACCENT} strokeWidth={2.8} />
      <line x1={128} y1={100} x2={134} y2={136} stroke={ACCENT} strokeWidth={2.8} />
      <circle cx={66} cy={136} r={3.5} fill={ACCENT} />
      <circle cx={134} cy={136} r={3.5} fill={ACCENT} />
      {/* EZ bar */}
      <path d="M 56,148 Q 70,142 80,148 Q 90,154 100,148 Q 110,142 120,148 Q 130,154 144,148"
        fill="none" stroke={FIG_STROKE} strokeWidth={2.5} />
      <rect x={46} y={144} width={10} height={10} rx={2} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      <rect x={144} y={144} width={10} height={10} rx={2} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Hips and legs */}
      <circle cx={100} cy={138} r={4.5} fill={FIG_JOINT} />
      <line x1={100} y1={138} x2={88} y2={190} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={88} cy={190} r={3.5} fill={FIG_JOINT} />
      <line x1={88} y1={190} x2={82} y2={238} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={138} x2={112} y2={190} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={112} cy={190} r={3.5} fill={FIG_JOINT} />
      <line x1={112} y1={190} x2={118} y2={238} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Feet */}
      <line x1={70} y1={242} x2={94} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={106} y1={240} x2={130} y2={242} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Label */}
      <text x={100} y={268} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        BICEPS
      </text>
    </svg>
  )
}

// ─── Info Panel ───────────────────────────────────────────────────────────────

interface ExerciseInfoProps {
  primary: string
  secondary: string
  tempo: string
  cue: string
  why: string
  mistake: string
}

function InfoPanel({ primary, secondary, tempo, cue, why, mistake }: ExerciseInfoProps) {
  const rows: [string, string][] = [
    ['Primary', primary],
    ['Secondary', secondary],
    ['Tempo', tempo],
    ['Cue', cue],
    ['Why', why],
    ['Common mistake', mistake],
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {rows.map(([label, value]) => (
        <div key={label}>
          <p style={{
            fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em',
            color: label === 'Primary' ? ACCENT : TEXT_MUTED,
            textTransform: 'uppercase', marginBottom: 4,
          }}>
            {label}
          </p>
          <p style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6 }}>{value}</p>
        </div>
      ))}
    </div>
  )
}

// ─── Exercise Card ────────────────────────────────────────────────────────────

interface ExerciseCardProps {
  name: string
  figure: React.ReactNode
  info: ExerciseInfoProps
}

function ExerciseCard({ name, figure, info }: ExerciseCardProps) {
  return (
    <div style={{
      border: '1px solid var(--paper-edge)', borderRadius: 14,
      overflow: 'hidden', marginBottom: 28,
    }}>
      <div style={{
        background: 'rgba(184,84,58,0.06)', borderBottom: '1px solid rgba(184,84,58,0.10)',
        padding: '14px 20px',
      }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: TEXT_MAIN, letterSpacing: '0.01em' }}>
          {name}
        </p>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32,
        padding: '28px 24px',
      }} className="exercise-card-grid">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {figure}
        </div>
        <InfoPanel {...info} />
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ExerciseBreakdowns() {
  return (
    <div>
      <ExerciseCard
        name="Conventional Deadlift"
        figure={<ConventionalDeadliftSVG />}
        info={{
          primary: 'Hamstrings, Glutes, Lower back',
          secondary: 'Lats, Traps, Core, Quads',
          tempo: 'Deliberate setup · 1 second pull · controlled lower',
          cue: 'Bar over mid-foot. Hinge to the bar. Take the slack out before you pull. The bar should move with your hips, not after them.',
          why: 'The deadlift trains the entire posterior chain in one movement. Learn it properly and you will use it forever.',
          mistake: 'Jerking the bar off the floor. Take the slack out first — feel it go tight. Then drive.',
        }}
      />

      <ExerciseCard
        name="Ab Wheel Rollout"
        figure={<AbWheelSVG />}
        info={{
          primary: 'Rectus abdominis, Transverse abdominis',
          secondary: 'Lats, Shoulders',
          tempo: '3 seconds out · pause · 2 seconds back',
          cue: 'Brace your core hard before you roll out. Only go as far as you can without your lower back arching. Half range with control is better than full range with collapse.',
          why: 'Trains anti-extension — stopping your spine from extending under load. Translates directly to every compound lift.',
          mistake: 'Going too far and dumping into the lower back. Start with 60% of what feels possible.',
        }}
      />

      <ExerciseCard
        name="Cable Pull-Through"
        figure={<CablePullThroughSVG />}
        info={{
          primary: 'Glutes, Hamstrings',
          secondary: 'Lower back (isometric), Core',
          tempo: '2 seconds hinge back · drive hips through · 1 second squeeze',
          cue: 'This is a hip hinge with a cable. The drive comes from squeezing your glutes, not extending your lower back.',
          why: 'Reinforces the hip hinge pattern under light load — carries over to deadlift and RDL. Excellent isolated glute exercise.',
          mistake: 'Squatting rather than hinging. The knees have a soft bend — they are not driving the movement.',
        }}
      />

      <ExerciseCard
        name="Rear Delt Fly"
        figure={<RearDeltFlySVG />}
        info={{
          primary: 'Rear deltoids',
          secondary: 'Rhomboids, Middle traps',
          tempo: '1 second up · 2 second hold · 2 seconds lower',
          cue: 'Lighter than you think. Lead with the elbow, not the wrist. Squeeze at the top for 2 seconds.',
          why: 'The rear delt is the most neglected muscle. Weak rear delts lead to rounded shoulders and eventual shoulder injuries. You need this to balance your pressing.',
          mistake: 'Using momentum and swinging up. Dead stop at the bottom. Control every rep.',
        }}
      />

      <ExerciseCard
        name="EZ Bar Curl"
        figure={<EZBarCurlSVG />}
        info={{
          primary: 'Biceps brachii',
          secondary: 'Brachialis, Brachioradialis',
          tempo: '1 second up · 1 second squeeze · 2 seconds lower',
          cue: 'Elbows stay pinned for every rep. Full range — start with arms extended, finish with full contraction.',
          why: 'EZ bar reduces wrist stress. Biceps are trained after back — they will be pre-fatigued. Weight lower than you expect — that is correct.',
          mistake: 'Swinging the torso back. That is your lower back helping your biceps — which helps neither.',
        }}
      />

      <style>{`
        @media (max-width: 560px) {
          .exercise-card-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
