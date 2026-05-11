const ACCENT = 'var(--accent)'
const FIG_STROKE = 'var(--ink-soft)'
const FIG_JOINT = 'var(--ink)'
const FIG_THIN = 'var(--ink-muted)'

// ─── SVG figures ─────────────────────────────────────────────────────────────

function BarbellBenchPressSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Bench */}
      <rect x={18} y={170} width={164} height={14} rx={4}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.5} />
      {/* Bench legs */}
      <line x1={26} y1={184} x2={26} y2={210} stroke="var(--paper-edge)" strokeWidth={1.5} />
      <line x1={174} y1={184} x2={174} y2={210} stroke="var(--paper-edge)" strokeWidth={1.5} />
      {/* Head — lying on bench */}
      <circle cx={100} cy={150} r={13} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={100} y1={137} x2={100} y2={126} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso on bench — horizontal */}
      <line x1={100} y1={126} x2={100} y2={170} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Shoulder blades pinched — subtle */}
      <ellipse cx={100} cy={140} rx={18} ry={8}
        fill={ACCENT} fillOpacity={0.1} />
      {/* Left arm — pressing bar up from chest */}
      <line x1={88} y1={130} x2={68} y2={118} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={68} cy={118} r={3.5} fill={FIG_JOINT} />
      <line x1={68} y1={118} x2={72} y2={88} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Right arm */}
      <line x1={112} y1={130} x2={132} y2={118} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={132} cy={118} r={3.5} fill={FIG_JOINT} />
      <line x1={132} y1={118} x2={128} y2={88} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Barbell */}
      <line x1={40} y1={86} x2={160} y2={86} stroke="var(--ink-muted)" strokeWidth={3} />
      <rect x={34} y={81} width={8} height={11} rx={1.5}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      <rect x={158} y={81} width={8} height={11} rx={1.5}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      {/* Chest highlight — PRIMARY */}
      <ellipse cx={100} cy={132} rx={20} ry={12}
        fill={ACCENT} fillOpacity={0.2} />
      <line x1={82} y1={124} x2={118} y2={124} stroke={ACCENT} strokeWidth={2.5} strokeOpacity={0.7} />
      {/* Legs — knees bent, feet flat */}
      <line x1={92} y1={170} x2={78} y2={210} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={78} cy={210} r={3.5} fill={FIG_JOINT} />
      <line x1={78} y1={210} x2={72} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={108} y1={170} x2={122} y2={210} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={122} cy={210} r={3.5} fill={FIG_JOINT} />
      <line x1={122} y1={210} x2={128} y2={240} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Feet flat */}
      <line x1={60} y1={244} x2={80} y2={244} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={120} y1={244} x2={140} y2={244} stroke={FIG_STROKE} strokeWidth={2} />
      <text x={100} y={268} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        CHEST · FRONT DELT
      </text>
    </svg>
  )
}

function BarbellRowSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Side view — hinged at ~45°, pulling bar to lower sternum */}
      {/* Head — looking forward */}
      <circle cx={72} cy={52} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={72} y1={64} x2={74} y2={74} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — angled forward, chest up */}
      <line x1={74} y1={74} x2={116} y2={148} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Hip */}
      <circle cx={116} cy={148} r={5} fill={FIG_JOINT} />
      {/* Near leg — soft knee */}
      <line x1={116} y1={148} x2={112} y2={196} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={112} cy={196} r={4} fill={FIG_JOINT} />
      <line x1={112} y1={196} x2={108} y2={232} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={98} y1={236} x2={120} y2={235} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Far leg */}
      <line x1={116} y1={148} x2={120} y2={196} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={120} y1={196} x2={124} y2={232} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* Near shoulder */}
      <circle cx={74} cy={74} r={3.5} fill={FIG_JOINT} />
      {/* Near arm — elbow pulled back, at sternum */}
      <line x1={74} y1={74} x2={68} y2={106} stroke={ACCENT} strokeWidth={2.8} />
      <circle cx={68} cy={106} r={3.5} fill={ACCENT} />
      <line x1={68} y1={106} x2={80} y2={140} stroke={ACCENT} strokeWidth={2.8} />
      {/* Far arm */}
      <line x1={74} y1={74} x2={84} y2={105} stroke={FIG_THIN} strokeWidth={1.8} />
      <line x1={84} y1={105} x2={96} y2={138} stroke={FIG_THIN} strokeWidth={1.8} />
      {/* Barbell at lower sternum */}
      <line x1={44} y1={146} x2={130} y2={146} stroke="var(--ink-muted)" strokeWidth={3} />
      <rect x={38} y={141} width={8} height={11} rx={1.5}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      <rect x={124} y={141} width={8} height={11} rx={1.5}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      {/* Back highlight — lats */}
      <ellipse cx={100} cy={108} rx={14} ry={30}
        fill={ACCENT} fillOpacity={0.15} />
      <line x1={92} y1={78} x2={110} y2={138} stroke={ACCENT} strokeWidth={2.5} strokeOpacity={0.6} />
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        LATS · RHOMBOIDS
      </text>
    </svg>
  )
}

function BulgarianSplitSquatSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Bench under rear foot */}
      <rect x={118} y={154} width={66} height={12} rx={3}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.5} />
      {/* Head — upright */}
      <circle cx={76} cy={36} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={76} y1={48} x2={76} y2={58} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — upright */}
      <line x1={76} y1={58} x2={76} y2={130} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Arms at sides */}
      <line x1={76} y1={66} x2={60} y2={100} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={60} y1={100} x2={58} y2={130} stroke={FIG_STROKE} strokeWidth={1.8} />
      <line x1={76} y1={66} x2={92} y2={100} stroke={FIG_THIN} strokeWidth={1.6} />
      <line x1={92} y1={100} x2={94} y2={130} stroke={FIG_THIN} strokeWidth={1.6} />
      {/* Hip */}
      <circle cx={76} cy={130} r={4.5} fill={FIG_JOINT} />
      {/* Front leg (left) — at bottom of split squat, knee above ankle */}
      <line x1={76} y1={130} x2={64} y2={134} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Front thigh — PRIMARY quads + glutes */}
      <line x1={64} y1={134} x2={56} y2={188} stroke={ACCENT} strokeWidth={3} />
      <circle cx={56} cy={188} r={4} fill={ACCENT} />
      {/* Front shin — vertical */}
      <line x1={56} y1={188} x2={52} y2={232} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Front foot */}
      <line x1={40} y1={236} x2={62} y2={236} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Rear leg (right) — elevated on bench */}
      <line x1={76} y1={130} x2={110} y2={138} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Rear thigh going back and up to bench */}
      <line x1={110} y1={138} x2={132} y2={158} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={132} cy={158} r={3.5} fill={FIG_JOINT} />
      {/* Rear shin on bench */}
      <line x1={132} y1={158} x2={150} y2={164} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Floor */}
      <line x1={16} y1={238} x2={120} y2={238} stroke="var(--paper-edge)" strokeWidth={1} />
      {/* Bodyweight text */}
      <text x={100} y={256} textAnchor="middle" fontSize={8.5} fill="var(--ink-muted)"
        fontFamily="DM Sans, sans-serif">
        bodyweight this week
      </text>
      <text x={100} y={272} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        QUADS · GLUTES
      </text>
    </svg>
  )
}

function HipThrustHeavySVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Bench */}
      <rect x={16} y={148} width={80} height={14} rx={4}
        fill="rgba(184,84,58,0.10)" stroke="rgba(184,84,58,0.20)" strokeWidth={1.5} />
      {/* Head resting back */}
      <circle cx={26} cy={138} r={11} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck + upper back */}
      <line x1={37} y1={141} x2={55} y2={148} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Body line */}
      <line x1={55} y1={148} x2={148} y2={118} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Arms — hands on barbell */}
      <line x1={78} y1={143} x2={105} y2={122} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={78} cy={143} r={3} fill={FIG_JOINT} />
      <line x1={118} y1={143} x2={108} y2={124} stroke={FIG_THIN} strokeWidth={1.8} />
      {/* Barbell across hips — heavy loading indicator */}
      <line x1={52} y1={128} x2={172} y2={128} stroke="var(--ink-muted)" strokeWidth={3.5} />
      <rect x={46} y={123} width={9} height={12} rx={1.5}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      {/* Plate on near side */}
      <ellipse cx={52} cy={130} rx={4} ry={9}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      <rect x={165} y={123} width={9} height={12} rx={1.5}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.2} />
      {/* Hip elevated — GLUTE HIGHLIGHT */}
      <circle cx={148} cy={118} r={7} fill={ACCENT} fillOpacity={0.3} stroke={ACCENT} strokeWidth={2} />
      <ellipse cx={143} cy={124} rx={15} ry={11}
        fill={ACCENT} fillOpacity={0.22} />
      {/* Thigh: hip to knee */}
      <line x1={148} y1={118} x2={158} y2={170} stroke={FIG_STROKE} strokeWidth={2.2} />
      <circle cx={158} cy={170} r={4} fill={FIG_JOINT} />
      {/* Shin: knee to foot */}
      <line x1={158} y1={170} x2={155} y2={215} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Foot flat */}
      <line x1={145} y1={218} x2={168} y2={218} stroke={FIG_STROKE} strokeWidth={2.2} />
      {/* Floor */}
      <line x1={16} y1={220} x2={184} y2={220} stroke="var(--paper-edge)" strokeWidth={1} />
      {/* Far leg */}
      <line x1={148} y1={118} x2={164} y2={168} stroke={FIG_THIN} strokeWidth={1.5} />
      <line x1={164} y1={168} x2={162} y2={213} stroke={FIG_THIN} strokeWidth={1.5} />
      {/* RPE indicator text */}
      <text x={100} y={244} textAnchor="middle" fontSize={8.5} fill="var(--ink-muted)"
        fontFamily="DM Sans, sans-serif">
        RPE 7–8 by set 3
      </text>
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        GLUTES (MAXIMUS)
      </text>
    </svg>
  )
}

function FacePullSVG() {
  return (
    <svg viewBox="0 0 200 280" style={{ width: '100%', maxWidth: 200 }} aria-hidden>
      {/* Cable anchor point at right — high position */}
      <circle cx={178} cy={88} r={5}
        fill="var(--paper-edge)" stroke="var(--paper-edge)" strokeWidth={1.5} />
      {/* Head — upright, neutral */}
      <circle cx={82} cy={52} r={12} fill="none" stroke={FIG_STROKE} strokeWidth={2} />
      {/* Neck */}
      <line x1={82} y1={64} x2={82} y2={74} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Torso — upright, slight lean back */}
      <line x1={82} y1={74} x2={84} y2={168} stroke={FIG_STROKE} strokeWidth={2.4} />
      {/* Legs — standing split stance for stability */}
      <line x1={80} y1={168} x2={68} y2={216} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={68} cy={216} r={3.5} fill={FIG_JOINT} />
      <line x1={68} y1={216} x2={62} y2={244} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={88} y1={168} x2={104} y2={214} stroke={FIG_STROKE} strokeWidth={2} />
      <circle cx={104} cy={214} r={3.5} fill={FIG_JOINT} />
      <line x1={104} y1={214} x2={110} y2={244} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={50} y1={248} x2={72} y2={248} stroke={FIG_STROKE} strokeWidth={2} />
      <line x1={100} y1={248} x2={122} y2={248} stroke={FIG_STROKE} strokeWidth={2} />
      {/* Near shoulder — elbows HIGH and WIDE */}
      <circle cx={72} cy={80} r={3.5} fill={FIG_JOINT} />
      <circle cx={92} cy={80} r={3.5} fill={FIG_JOINT} />
      {/* Left arm — elbow up and out, pulling to face with external rotation */}
      <line x1={72} y1={80} x2={48} y2={60} stroke={ACCENT} strokeWidth={2.8} />
      <circle cx={48} cy={60} r={3.5} fill={ACCENT} />
      <line x1={48} y1={60} x2={70} y2={88} stroke={ACCENT} strokeWidth={2.8} />
      {/* Right arm — elbow up and out */}
      <line x1={92} y1={80} x2={116} y2={60} stroke={ACCENT} strokeWidth={2.8} />
      <circle cx={116} cy={60} r={3.5} fill={ACCENT} />
      <line x1={116} y1={60} x2={110} y2={88} stroke={ACCENT} strokeWidth={2.8} />
      {/* Rope attachment at hands */}
      <line x1={70} y1={88} x2={110} y2={88} stroke="var(--paper-edge)" strokeWidth={1.5} />
      {/* Cable from rope to anchor */}
      <line x1={90} y1={88} x2={178} y2={88} stroke="rgba(184,84,58,0.25)" strokeWidth={1.2} strokeDasharray="4 3" />
      {/* Rear delt highlight */}
      <ellipse cx={68} cy={78} rx={10} ry={8}
        fill={ACCENT} fillOpacity={0.2} />
      <ellipse cx={96} cy={78} rx={10} ry={8}
        fill={ACCENT} fillOpacity={0.2} />
      {/* Elbow height indicator */}
      <text x={100} y={200} textAnchor="middle" fontSize={8.5} fill="var(--ink-muted)"
        fontFamily="DM Sans, sans-serif">
        elbows above shoulder height
      </text>
      <text x={100} y={262} textAnchor="middle" fontSize={9} fill={ACCENT}
        fontFamily="DM Sans, sans-serif" fontWeight={600} letterSpacing="0.06em">
        REAR DELTS · EXT. ROTATORS
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
          <div style={{
            background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)',
            borderRadius: 8, padding: '10px 14px',
          }}>
            <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--ink-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>COMMON MISTAKE</p>
            <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{ex.mistake}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const exercises: ExerciseData[] = [
  {
    name: 'Barbell Bench Press',
    svg: <BarbellBenchPressSVG />,
    primary: 'Chest (pectoralis major)',
    secondary: 'Front delt, Triceps',
    tempo: '2 seconds down · touch chest · 1 second up',
    cue: 'Shoulder blades pinched together and pulled down before you unrack. Bar sits on your upper traps not your neck.',
    why: 'Horizontal pressing is a fundamental movement pattern. The barbell allows even loading and consistent progress.',
    mistake: 'Elbows flaring to 90 degrees. Keep them at 45–60 degrees from your torso.',
  },
  {
    name: 'Barbell Row',
    svg: <BarbellRowSVG />,
    primary: 'Lats, Rhomboids, Middle traps',
    secondary: 'Rear delt, Biceps',
    tempo: '1 second pull · 1 second squeeze · 2 seconds lower',
    cue: 'Chest up. Pull to your lower sternum — not your belly button, not your upper chest.',
    why: 'Every push needs a pull. The barbell row is the direct counterpart to the bench press.',
    mistake: 'Using momentum — jerking the torso upright to swing the weight.',
  },
  {
    name: 'Bulgarian Split Squat (Bodyweight)',
    svg: <BulgarianSplitSquatSVG />,
    primary: 'Quads, Glutes',
    secondary: 'Hamstrings, Core, Hip flexors',
    tempo: '3 seconds down · pause · 1 second up',
    cue: 'Front foot far enough forward that your shin stays vertical at the bottom. Bodyweight this week — master the balance before adding load.',
    why: 'Best single-leg exercise in existence. Identifies imbalances, loads glute and quad simultaneously.',
    mistake: 'Rear foot too close. This pitches you forward and turns it into a hip flexor stretch.',
  },
  {
    name: 'Hip Thrust (Heavy)',
    svg: <HipThrustHeavySVG />,
    primary: 'Glutes (maximus)',
    secondary: 'Hamstrings, Core',
    tempo: '1 second up · 2 second hold · 2 seconds lower',
    cue: 'Friday is your heavy lower day. Add meaningful weight — RPE 7–8 by set 3. Chin tucked, brace before you drive.',
    why: 'The pattern is established. This week you learn what it feels like to actually load it.',
    mistake: 'Losing the squeeze by rep 10. Shorter set with quality beats longer set with nothing.',
  },
  {
    name: 'Face Pull',
    svg: <FacePullSVG />,
    primary: 'Rear delts, External rotators',
    secondary: 'Middle traps, Rhomboids',
    tempo: '1 second pull · 2 second hold · 2 seconds forward',
    cue: 'Elbows high — above shoulder height. Pull to your face, not your chin. Feel the back of your shoulder.',
    why: 'Four days of pressing and pulling stresses your shoulder joint. The face pull counteracts this — it keeps you injury-free long term.',
    mistake: 'Pulling to the neck and ignoring the external rotation.',
  },
]

export default function ExerciseBreakdowns() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 8 }}>
        Week 3 key exercises · Primary muscle highlighted in each diagram
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
