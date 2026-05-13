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
    searchTerms: ['goblet squat form', 'dumbbell goblet squat', 'squat heel position'],
    formCues: ['Chest stays upright — especially on the drive up', 'Knees track toes, no collapse under load'],
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper back',
    tempo: '3 seconds down · pause · 1 second up',
    cue: 'Two more reps than last week. Same weight or slightly more. If your chest drops on the way up the weight is too heavy.',
    why: 'Your nervous system knows it now. This is the first week you are genuinely training the muscle.',
    progression: 'If week 1 felt like 6/10, add 2.5kg. If it felt like 8/10, add reps first.',
  },
  {
    name: 'Hip Thrust with Load',
    searchTerms: ['loaded hip thrust form', 'plate hip thrust setup', 'hip thrust tutorial'],
    formCues: ['Plate sits at the hip crease — not on the stomach', 'Full 2-second squeeze at the top before lowering'],
    primary: 'Glutes (maximus)',
    secondary: 'Hamstrings, Core',
    tempo: '1 second up · 2 second hold · controlled down',
    cue: 'Hold a 5kg or 10kg plate on your hips. Drive through your heels. Squeeze at the top.',
    why: 'Last week was pattern learning. This week is the first time you are loading the glute.',
    mistake: 'Plate sitting too high on the stomach. It sits across the hip crease.',
  },
  {
    name: 'Barbell Back Squat (Introduction)',
    searchTerms: ['back squat form beginner', 'barbell squat bar position', 'squat depth tutorial'],
    formCues: ['Bar sits on upper traps — not the neck', 'Eyes forward or slightly up — chest follows your gaze'],
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper back, Hamstrings',
    tempo: '3 seconds down · pause · drive up',
    cue: 'Empty bar. 20kg. Bar sits on your upper traps not your neck. Brace before you descend. Every. Single. Rep.',
    why: 'The most effective lower body compound movement. Learning it now so you can load it from week 3.',
    mistake: 'Looking down. Eyes forward or slightly up. Where your eyes go your chest follows.',
  },
  {
    name: 'Barbell Romanian Deadlift (Introduction)',
    searchTerms: ['barbell RDL form', 'rdl bar path legs', 'hip hinge barbell tutorial'],
    formCues: ['Bar stays in contact with your legs the entire movement', 'Soft knee bend only — this is a hinge, not a squat'],
    primary: 'Hamstrings, Glutes',
    secondary: 'Lower back, Core, Lats',
    tempo: '3 seconds down · stretch pause · drive hips through',
    cue: 'Empty bar only. The bar stays in contact with your legs the entire movement. If it drifts forward your lower back takes over.',
    why: 'The bar changes load distribution and forces you to engage your lats. Different stimulus, better long-term tool.',
    mistake: 'Bending the knees too much and turning it into a squat. Soft bend only. This is a hip hinge.',
  },
  {
    name: 'Single Arm Dumbbell Row',
    searchTerms: ['single arm dumbbell row', 'one arm row form', 'db row elbow path'],
    formCues: ['Torso stays square — no rotation to gain range', 'Elbow drives to the hip, not up toward the shoulder'],
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
