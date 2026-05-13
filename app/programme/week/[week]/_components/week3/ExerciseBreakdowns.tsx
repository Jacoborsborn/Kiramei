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
    searchTerms: ['bench press form', 'barbell bench setup', 'bench press elbow angle'],
    formCues: ['Shoulder blades pinched back and down before the lift', 'Elbows at 45–60° from torso — not flared to 90°'],
    primary: 'Chest (pectoralis major)',
    secondary: 'Front delt, Triceps',
    tempo: '2 seconds down · touch chest · 1 second up',
    cue: 'Shoulder blades pinched together and pulled down before you unrack. Bar sits on your upper traps not your neck.',
    why: 'Horizontal pressing is a fundamental movement pattern. The barbell allows even loading and consistent progress.',
    mistake: 'Elbows flaring to 90 degrees. Keep them at 45–60 degrees from your torso.',
  },
  {
    name: 'Barbell Row',
    searchTerms: ['bent over barbell row', 'barbell row form', 'row bar path lower sternum'],
    formCues: ['Bar pulls to lower sternum — not belly, not upper chest', 'Torso stays braced, no jerking to swing the weight'],
    primary: 'Lats, Rhomboids, Middle traps',
    secondary: 'Rear delt, Biceps',
    tempo: '1 second pull · 1 second squeeze · 2 seconds lower',
    cue: 'Chest up. Pull to your lower sternum — not your belly button, not your upper chest.',
    why: 'Every push needs a pull. The barbell row is the direct counterpart to the bench press.',
    mistake: 'Using momentum — jerking the torso upright to swing the weight.',
  },
  {
    name: 'Bulgarian Split Squat (Bodyweight)',
    searchTerms: ['bulgarian split squat form', 'rear foot elevated split squat', 'BSS foot position'],
    formCues: ['Front shin stays vertical at the bottom — foot far enough forward', 'Rear knee drops nearly to the floor — torso stays upright'],
    primary: 'Quads, Glutes',
    secondary: 'Hamstrings, Core, Hip flexors',
    tempo: '3 seconds down · pause · 1 second up',
    cue: 'Front foot far enough forward that your shin stays vertical at the bottom. Bodyweight this week — master the balance before adding load.',
    why: 'Best single-leg exercise in existence. Identifies imbalances, loads glute and quad simultaneously.',
    mistake: 'Rear foot too close. This pitches you forward and turns it into a hip flexor stretch.',
  },
  {
    name: 'Hip Thrust (Heavy)',
    searchTerms: ['barbell hip thrust heavy', 'loaded hip thrust form', 'hip thrust bar position'],
    formCues: ['Drive through heels — not toes', 'Chin tucked throughout; back does not arch at the top'],
    primary: 'Glutes (maximus)',
    secondary: 'Hamstrings, Core',
    tempo: '1 second up · 2 second hold · 2 seconds lower',
    cue: 'Friday is your heavy lower day. Add meaningful weight — RPE 7–8 by set 3. Chin tucked, brace before you drive.',
    why: 'The pattern is established. This week you learn what it feels like to actually load it.',
    mistake: 'Losing the squeeze by rep 10. Shorter set with quality beats longer set with nothing.',
  },
  {
    name: 'Face Pull',
    searchTerms: ['cable face pull form', 'face pull elbow position', 'face pull external rotation'],
    formCues: ['Elbows high — above shoulder height at the finish', 'Pull to your face with external rotation — not to your chin'],
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
