import { ExerciseHomeworkPanel } from '../shared/ExerciseHomeworkPanel'

interface ExerciseData {
  name: string
  searchTerms: string[]
  formCues: string[]
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
      display: 'grid', gridTemplateColumns: '220px 1fr', gap: 0,
      border: '1px solid var(--paper-edge)',
      borderRadius: 12, overflow: 'hidden',
      background: 'var(--paper-deep)',
    }} className="exercise-card">
      {/* Left — homework panel */}
      <div style={{
        background: 'rgba(31,27,22,0.06)',
        borderRight: '1px solid var(--paper-edge)',
      }}>
        <ExerciseHomeworkPanel index={index} searchTerms={ex.searchTerms} formCues={ex.formCues} />
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
    name: 'Goblet Squat',
    searchTerms: ['goblet squat form', 'dumbbell goblet squat', 'squat heel position'],
    formCues: ['Chest stays upright — especially on the drive up', 'Knees track in line with toes, no caving inward'],
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper back',
    tempo: '3 sec down · pause · 1 sec up',
    cue: 'Chest tall. Knees follow your toes. Sit into it — don\'t just bend your knees.',
    why: 'Teaches the squat pattern with the weight in front, which forces your torso upright. You cannot cheat this one.',
    mistake: 'Heels rising. If this happens, your ankles are tight — elevate your heels slightly on a plate.',
  },
  {
    name: 'Romanian Deadlift (Dumbbells)',
    searchTerms: ['dumbbell RDL form', 'rdl hip hinge tutorial', 'romanian deadlift form'],
    formCues: ['Hips push back — not down. Dumbbells follow your legs closely', 'Flat back throughout — any rounding means the weight is too heavy'],
    primary: 'Hamstrings, Glutes',
    secondary: 'Lower back, Core',
    tempo: '3 sec down · pause at stretch · 1 sec up',
    cue: 'Push your hips back like you\'re trying to touch the wall behind you. The dumbbells follow — they don\'t lead.',
    why: 'The RDL is the most important glute and hamstring exercise in this programme. Learn it properly in week 1 and it will serve you for years.',
    mistake: 'Rounding the lower back. If this happens the weight is too heavy. Drop it and own the pattern first.',
  },
  {
    name: 'Hip Thrust (Bodyweight)',
    searchTerms: ['bodyweight hip thrust', 'glute bridge form', 'hip thrust tutorial'],
    formCues: ['Chin tucked, lower back does not arch at the top', 'Full squeeze at lockout — hold it, feel the glute working'],
    primary: 'Glutes (all three)',
    secondary: 'Hamstrings, Core',
    tempo: '1 sec up · 2 sec hold at top · 1 sec down',
    cue: 'Chin tucked. Drive through your heels. Squeeze hard at the top — hold it. Your lower back should not arch.',
    why: 'This is the single most direct glute-loading exercise that exists. Bodyweight this week because you need to feel the pattern before adding load. Most people feel nothing in their glutes the first time. That is exactly what we are fixing.',
    mistake: 'Arching the lower back at the top. That is your back working, not your glutes. Tuck your chin and brace your core.',
  },
  {
    name: 'Seated Cable Row',
    searchTerms: ['seated cable row form', 'cable row technique', 'cable row elbow path'],
    formCues: ['Elbows drive to hips — not up toward the shoulders', 'Shoulder blades squeeze together at the end of every rep'],
    primary: 'Lats, Rhomboids, Middle traps',
    secondary: 'Biceps, Rear delts',
    tempo: '1 sec pull · 2 sec hold · 2 sec back',
    cue: 'Pull your elbows to your hips, not your shoulders. Squeeze your shoulder blades together at the end of every rep.',
    why: 'Upper back strength counteracts sitting posture and protects your shoulders for every pressing movement you will ever do.',
    mistake: 'Leaning back excessively to row more weight. That is your lower back. Keep your torso at 90 degrees.',
  },
  {
    name: 'Dead Bug',
    searchTerms: ['dead bug exercise form', 'dead bug core tutorial', 'anti-extension core'],
    formCues: ['Lower back flat to the floor — the moment it lifts, you\'ve gone too far', 'If you can do it fast, you\'re doing it wrong — slow all the way down'],
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
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
          This week&rsquo;s task
        </p>
        <p style={{ fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.6, marginBottom: 6 }}>
          Before you train this week, look into each of these exercises. See how they&rsquo;re done, what muscles they work, and what good form looks like.
        </p>
        <p style={{ fontSize: 12, color: 'var(--ink-muted)', fontStyle: 'italic', lineHeight: 1.5 }}>
          I&rsquo;d show you a demo — but looking it up yourself makes it stick better.
        </p>
      </div>
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
