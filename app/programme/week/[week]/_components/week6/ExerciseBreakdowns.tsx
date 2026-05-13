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
            <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--ink-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>COMMON MISTAKE</p>
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
    searchTerms: ['chest supported row form', 'incline bench dumbbell row', 'supported row technique'],
    formCues: ['Chest stays on the pad every rep — if it lifts, you\'re using your lower back', 'Drive elbows down and back, not upward into a shrug'],
    primary: 'Lats, Rhomboids, Middle traps',
    secondary: 'Rear delt, Biceps',
    tempo: '1 second row · 2 second hold · 2 seconds lower',
    cue: 'Chest stays in contact with the pad for every rep. If it lifts, your lower back is taking over.',
    why: 'Every row you have done has some lower back involvement. This removes it completely.',
    mistake: 'Shrugging at the top instead of retracting the shoulder blades. Drive elbows back and down, not up.',
  },
  {
    name: 'Tricep Superset — Pushdown + Overhead Extension',
    searchTerms: ['tricep pushdown form', 'overhead tricep extension', 'tricep cable superset'],
    formCues: ['Pushdown: elbows pinned to sides, full extension at the bottom', 'Overhead extension: elbows point forward — they don\'t flare wide'],
    primary: 'Triceps (all three heads)',
    secondary: 'None significant',
    tempo: '1 second push · 1 second hold · 2 seconds return on both',
    cue: 'No rest between exercises. Pushdown first, then straight into overhead extension. Rest 90 seconds after both.',
    why: 'Pushdown emphasises lateral and medial heads. Overhead hits the long head. One superset trains all three.',
    mistake: 'Going too heavy. Start 30% lighter than your solo overhead weight.',
  },
  {
    name: 'Curl Superset — EZ Bar + Hammer',
    searchTerms: ['ez bar curl form', 'hammer curl technique', 'bicep superset arms'],
    formCues: ['EZ bar: elbows pinned, full range from extended to fully contracted', 'Hammers: neutral grip throughout, controlled lower on every rep'],
    primary: 'Biceps brachii (EZ), Brachialis (Hammer)',
    secondary: 'Brachioradialis, Forearm flexors',
    tempo: '1 second up · 1 second squeeze · 2 seconds lower on both',
    cue: 'EZ bar first — straight into hammers with no rest. Your arms should be significantly fatigued by the end.',
    why: 'Two different grips train different aspects of the same muscle group. Together more comprehensive than either alone.',
    mistake: 'Rushing between the exercises. Move immediately but do not sacrifice setup.',
  },
  {
    name: 'Bulgarian Split Squat (Weighted)',
    searchTerms: ['weighted bulgarian split squat', 'BSS with dumbbells', 'split squat front foot position'],
    formCues: ['Front shin vertical at the bottom — foot position is everything', 'Torso upright; dumbbells hang straight at your sides'],
    primary: 'Quads, Glutes',
    secondary: 'Hamstrings, Core, Hip flexors',
    tempo: '3 seconds down · pause · drive up',
    cue: 'You started this at bodyweight in week 3. This week you add dumbbells. The movement pattern is exactly the same.',
    why: 'Develops unilateral leg strength. Identifies and corrects imbalances. Also stretches hip flexor of rear leg.',
    mistake: 'Front foot migrating forward as fatigue sets in. Place a marker for your foot position.',
  },
  {
    name: 'Face Pull (4×20)',
    searchTerms: ['face pull form', 'face pull external rotation', 'cable face pull elbows high'],
    formCues: ['Elbows high — above ear height at the finish position', 'External rotation at end range is the whole point — feel the back of your shoulder'],
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
