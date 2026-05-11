const ACCENT = 'var(--accent)'
const FIG_STROKE = 'var(--ink-soft)'
const FIG_JOINT = 'var(--ink)'
const FIG_THIN = 'var(--ink-muted)'
const TEXT_MAIN = 'var(--ink)'
const TEXT_DIM = 'var(--ink-soft)'
const TEXT_MUTED = 'var(--ink-muted)'

// ─── SVG Figures ─────────────────────────────────────────────────────────────

function CableFlySVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Standing between cables, arms extended forward slightly */}
      {/* Head */}
      <circle cx={100} cy={32} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={44} x2={100} y2={56} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso upright */}
      <line x1={100} y1={56} x2={100} y2={138} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Shoulder joints */}
      <circle cx={100} cy={62} r={4} fill={FIG_JOINT} />
      {/* Arms out wide — cables coming in from sides */}
      <line x1={100} y1={62} x2={48} y2={90} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={48} cy={90} r={3.5} fill={FIG_JOINT} />
      {/* Forearms angling forward to center */}
      <line x1={48} y1={90} x2={76} y2={118} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={76} cy={118} r={3} fill={FIG_JOINT} />
      <line x1={100} y1={62} x2={152} y2={90} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={152} cy={90} r={3.5} fill={FIG_JOINT} />
      <line x1={152} y1={90} x2={124} y2={118} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={124} cy={118} r={3} fill={FIG_JOINT} />
      {/* Hands meeting at center — cable attachment */}
      <circle cx={100} cy={128} r={5} fill="none" stroke={ACCENT} strokeWidth={1.8} />
      {/* Cable lines from edges */}
      <line x1={34} y1={84} x2={48} y2={90} stroke={FIG_THIN} strokeWidth={1.5} strokeDasharray="3 2" />
      <line x1={166} y1={84} x2={152} y2={90} stroke={FIG_THIN} strokeWidth={1.5} strokeDasharray="3 2" />
      {/* Pec highlight — PRIMARY */}
      <line x1={100} y1={56} x2={48} y2={90} stroke={ACCENT} strokeWidth={2.5} opacity={0.55} />
      <line x1={100} y1={56} x2={152} y2={90} stroke={ACCENT} strokeWidth={2.5} opacity={0.55} />
      {/* Hips and legs */}
      <circle cx={100} cy={138} r={4.5} fill={FIG_JOINT} />
      <line x1={100} y1={138} x2={88} y2={192} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={88} cy={192} r={3.5} fill={FIG_JOINT} />
      <line x1={88} y1={192} x2={82} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={138} x2={112} y2={192} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={112} cy={192} r={3.5} fill={FIG_JOINT} />
      <line x1={112} y1={192} x2={118} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={70} y1={244} x2={94} y2={242} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={106} y1={242} x2={130} y2={244} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Label */}
      <text x={100} y={268} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        PECTORALIS MAJOR
      </text>
    </svg>
  )
}

function LateralRaiseSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Standing, arms raised to shoulder height, slight forward lean */}
      {/* Head — slight forward lean */}
      <circle cx={98} cy={34} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={98} y1={46} x2={100} y2={56} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — slight forward lean */}
      <line x1={100} y1={56} x2={102} y2={138} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Shoulder joints */}
      <circle cx={100} cy={62} r={4} fill={FIG_JOINT} />
      {/* Arms raised to shoulder height — PRIMARY lateral delt */}
      <line x1={100} y1={62} x2={40} y2={72} stroke={ACCENT} strokeWidth={3} />
      <circle cx={40} cy={72} r={4} fill={ACCENT} />
      <line x1={40} y1={72} x2={32} y2={88} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={62} x2={162} y2={72} stroke={ACCENT} strokeWidth={3} />
      <circle cx={162} cy={72} r={4} fill={ACCENT} />
      <line x1={162} y1={72} x2={170} y2={88} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Dumbbells at ends */}
      <rect x={20} y={84} width={18} height={9} rx={2} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      <rect x={162} y={84} width={18} height={9} rx={2} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Hip */}
      <circle cx={102} cy={138} r={4.5} fill={FIG_JOINT} />
      {/* Legs */}
      <line x1={102} y1={138} x2={90} y2={192} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={90} cy={192} r={3.5} fill={FIG_JOINT} />
      <line x1={90} y1={192} x2={84} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={102} y1={138} x2={114} y2={192} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={114} cy={192} r={3.5} fill={FIG_JOINT} />
      <line x1={114} y1={192} x2={120} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={72} y1={244} x2={96} y2={242} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={108} y1={242} x2={132} y2={244} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Label */}
      <text x={100} y={268} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        LATERAL DELTOID
      </text>
    </svg>
  )
}

function DeadliftLockoutSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Top of deadlift — standing tall, bar at hips */}
      {/* Head */}
      <circle cx={100} cy={28} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={40} x2={100} y2={52} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso fully upright */}
      <line x1={100} y1={52} x2={100} y2={140} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Shoulders */}
      <circle cx={100} cy={56} r={4} fill={FIG_JOINT} />
      {/* Arms straight down to bar */}
      <line x1={100} y1={56} x2={70} y2={60} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={70} cy={60} r={3.5} fill={FIG_JOINT} />
      <line x1={70} y1={60} x2={58} y2={140} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={56} x2={130} y2={60} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={130} cy={60} r={3.5} fill={FIG_JOINT} />
      <line x1={130} y1={60} x2={142} y2={140} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Bar at hip crease */}
      <rect x={46} y={138} width={108} height={8} rx={3} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      <rect x={38} y={133} width={10} height={18} rx={2} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      <rect x={152} y={133} width={10} height={18} rx={2} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Hip joint */}
      <circle cx={100} cy={140} r={5} fill={FIG_JOINT} />
      {/* Legs — hamstrings/glutes PRIMARY */}
      <line x1={100} y1={140} x2={88} y2={196} stroke={ACCENT} strokeWidth={3} />
      <circle cx={88} cy={196} r={4} fill={ACCENT} />
      <line x1={88} y1={196} x2={82} y2={242} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={140} x2={112} y2={196} stroke={ACCENT} strokeWidth={2.5} />
      <circle cx={112} cy={196} r={3.5} fill={ACCENT} />
      <line x1={112} y1={196} x2={118} y2={242} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Feet */}
      <line x1={70} y1={246} x2={94} y2={244} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={106} y1={244} x2={130} y2={246} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Label */}
      <text x={100} y={268} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        HAMSTRINGS · GLUTES · BACK
      </text>
    </svg>
  )
}

function HipThrustSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Hip thrust mid-position — shoulders on bench, hips driven up */}
      {/* Bench */}
      <rect x={20} y={140} width={80} height={18} rx={4} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Head/upper back on bench */}
      <circle cx={44} cy={132} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={44} y1={144} x2={50} y2={152} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — horizontal to slightly inclined */}
      <line x1={50} y1={152} x2={120} y2={130} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Barbell at hip crease */}
      <circle cx={120} cy={130} r={5} fill={FIG_JOINT} />
      <rect x={106} y={122} width={60} height={10} rx={3} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      <rect x={162} y={118} width={10} height={18} rx={2} fill="none" stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Thighs — going down from hips */}
      <line x1={120} y1={130} x2={130} y2={186} stroke={ACCENT} strokeWidth={3} />
      <circle cx={130} cy={186} r={4} fill={ACCENT} />
      {/* Shins — vertical */}
      <line x1={130} y1={186} x2={126} y2={238} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Foot on ground */}
      <line x1={114} y1={242} x2={138} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Far leg */}
      <line x1={120} y1={130} x2={148} y2={182} stroke={ACCENT} strokeWidth={2.5} />
      <circle cx={148} cy={182} r={3.5} fill={ACCENT} />
      <line x1={148} y1={182} x2={148} y2={238} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={136} y1={242} x2={160} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Glute highlight */}
      <text x={100} y={268} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        GLUTES · MAXIMUS & MEDIUS
      </text>
    </svg>
  )
}

function HammerCurlSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Standing, neutral grip curl both arms */}
      {/* Head */}
      <circle cx={100} cy={32} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={44} x2={100} y2={56} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso */}
      <line x1={100} y1={56} x2={100} y2={138} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Shoulder joints */}
      <circle cx={100} cy={62} r={4} fill={FIG_JOINT} />
      {/* Upper arms — pinned at sides */}
      <line x1={100} y1={62} x2={72} y2={104} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={62} x2={128} y2={104} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={72} cy={104} r={3.5} fill={FIG_JOINT} />
      <circle cx={128} cy={104} r={3.5} fill={FIG_JOINT} />
      {/* Forearms — neutral grip curl, brachialis PRIMARY */}
      <line x1={72} y1={104} x2={62} y2={144} stroke={ACCENT} strokeWidth={2.8} />
      <line x1={128} y1={104} x2={138} y2={144} stroke={ACCENT} strokeWidth={2.8} />
      <circle cx={62} cy={144} r={3.5} fill={ACCENT} />
      <circle cx={138} cy={144} r={3.5} fill={ACCENT} />
      {/* Dumbbells — neutral orientation (vertical) */}
      <rect x={54} y={144} width={10} height={22} rx={3} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      <rect x={50} y={140} width={8} height={6} rx={1.5} fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      <rect x={50} y={162} width={8} height={6} rx={1.5} fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      <rect x={136} y={144} width={10} height={22} rx={3} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      <rect x={142} y={140} width={8} height={6} rx={1.5} fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      <rect x={142} y={162} width={8} height={6} rx={1.5} fill="none" stroke={FIG_THIN} strokeWidth={1.2} />
      {/* Hips and legs */}
      <circle cx={100} cy={138} r={4.5} fill={FIG_JOINT} />
      <line x1={100} y1={138} x2={88} y2={192} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={88} cy={192} r={3.5} fill={FIG_JOINT} />
      <line x1={88} y1={192} x2={82} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={138} x2={112} y2={192} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={112} cy={192} r={3.5} fill={FIG_JOINT} />
      <line x1={112} y1={192} x2={118} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={70} y1={244} x2={94} y2={242} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={106} y1={242} x2={130} y2={244} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Label */}
      <text x={100} y={268} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        BRACHIALIS · BRACHIORADIALIS
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
      }} className="exercise-card-grid-w5">
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
        name="Cable Fly"
        figure={<CableFlySVG />}
        info={{
          primary: 'Pectoralis major',
          secondary: 'Front delt',
          tempo: '3 seconds open · 1 second pause at stretch · 1 second squeeze',
          cue: 'You are squeezing your chest and letting your arms follow. Feel the stretch at the bottom.',
          why: 'Cable provides constant tension through full ROM. The barbell loses tension at top — the cable does not.',
          mistake: 'Bending the elbows too much, turning it into a press. Slight fixed bend — it does not change.',
        }}
      />

      <ExerciseCard
        name="Lateral Raise"
        figure={<LateralRaiseSVG />}
        info={{
          primary: 'Lateral deltoid',
          secondary: 'Supraspinatus, Upper traps',
          tempo: '1 second up · 2 second hold at shoulder height · 2 seconds lower',
          cue: 'Slight forward lean from the hips. Lead with elbows. Stop at shoulder height — going higher shifts load to traps.',
          why: 'The lateral delt creates shoulder width. It is almost exclusively trained by lateral raises — no other exercise hits it as directly.',
          mistake: 'Shrugging up as the weight rises. That is your upper trap. Drop your shoulders before each rep.',
        }}
      />

      <ExerciseCard
        name="Deadlift (Pull Day)"
        figure={<DeadliftLockoutSVG />}
        info={{
          primary: 'Hamstrings, Glutes, Lower back',
          secondary: 'Lats, Traps, Core',
          tempo: 'Deliberate setup · drive · controlled lower',
          cue: 'Pull day opens with deadlifts. RPE 8. Two reps left. Every set. Take full rest between sets.',
          why: 'Deadlift as a pull day opener trains the entire back and posterior chain first, when fresh. Everything that follows is finishing work.',
          mistake: 'Hyperextending at the top — leaning back excessively. Stand tall. Hips through. That is the lockout.',
        }}
      />

      <ExerciseCard
        name="Hip Thrust — Legs Wednesday"
        figure={<HipThrustSVG />}
        info={{
          primary: 'Glutes (maximus, medius)',
          secondary: 'Hamstrings, Core',
          tempo: '1 second drive · 2 second hold at top · 2 seconds lower',
          cue: 'Week 5 hip thrust is at RPE 8. This should be the heaviest hip thrust you have done. Four sets. The squeeze is non-negotiable.',
          why: 'Five weeks in, you have the pattern and the strength base. This week the hip thrust becomes a genuine strength exercise.',
          mistake: 'Rushing the reps. Two second hold at the top. Every rep. If you skip it you are leaving most of the stimulus on the table.',
        }}
      />

      <ExerciseCard
        name="Hammer Curl"
        figure={<HammerCurlSVG />}
        info={{
          primary: 'Brachialis, Brachioradialis',
          secondary: 'Biceps brachii',
          tempo: '1 second up · 1 second hold · 2 seconds lower',
          cue: 'Palms face each other throughout. Targets the brachialis — the muscle underneath the bicep that pushes the bicep up when developed.',
          why: 'Standard curls train the bicep primarily. Hammer curls train the brachialis and forearm. Together they build complete arm development.',
          mistake: 'Alternating arms quickly to keep momentum. Do both simultaneously or fully complete one arm. Slow down.',
        }}
      />

      <style>{`
        @media (max-width: 560px) {
          .exercise-card-grid-w5 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
