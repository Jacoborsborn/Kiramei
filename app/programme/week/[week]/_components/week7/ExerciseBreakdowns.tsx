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
  note: string
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
    searchTerms: ['back squat form technique', 'squat depth pause', 'squat heel drive cue'],
    formCues: ['3-second descent — feel your heels driving into the floor throughout', 'Pause at the bottom; you should be able to hold it comfortably at 60%'],
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper back',
    tempo: '3 seconds down · pause at bottom · drive up',
    cue: '60% of last week\'s weight. The objective is perfection, not effort. Slow down. Feel your heels drive into the floor.',
    why: 'Deload squats serve two purposes: active recovery AND reinforcement of correct movement pattern under low fatigue.',
    note: 'Notice how much more comfortable this feels than week 2\'s barbell introduction. That growth in competence is real.',
  },
  {
    name: 'Romanian Deadlift — Range Focus',
    searchTerms: ['RDL full range of motion', 'romanian deadlift depth', 'rdl hamstring stretch'],
    formCues: ['Push hips further back than usual — feel the full hamstring stretch at the bottom', '4-second descent: control every inch of the range'],
    primary: 'Hamstrings, Glutes',
    secondary: 'Lower back, Core',
    tempo: '4 seconds down · pause at full stretch · drive hips through',
    cue: 'Goal is maximum range of motion at minimum load. Push hips back further than usual. Feel the hamstring stretch fully.',
    why: 'Heavy RDLs build strength in mid-range. Light RDLs with full range restore mobility and reinforce the pattern at its endpoints.',
    note: 'Cutting the range because the weight feels light is the mistake. The lower load is what allows full range. Take advantage of it.',
  },
  {
    name: 'Face Pull — Shoulder Reset',
    searchTerms: ['face pull external rotation', 'shoulder reset face pull', 'face pull 4 second hold'],
    formCues: ['4-second hold at end range — focus on the external rotation, not just the pull', 'Light weight is correct here — this is therapeutic, not a strength exercise'],
    primary: 'Rear delts, External rotators',
    secondary: 'Middle traps',
    tempo: '1 second pull · 4 second hold · 2 seconds return',
    cue: '20 reps. Four second hold. Light weight. The rotator cuff needs this after six weeks of pressing.',
    why: 'Deload is also a joint reset. Heavy pressing compresses the anterior shoulder capsule. Face pulls with long hold actively counteract this.',
    note: 'This exercise should appear in every programme you write for yourself from here forward.',
  },
  {
    name: 'Hip Thrust — 60% Load, Full Squeeze Focus',
    searchTerms: ['hip thrust glute squeeze cue', 'hip thrust activation form', 'hip thrust light load'],
    formCues: ['3-second hold at the top — feel the glute activate fully', 'Lighter than usual: this is about quality of contraction, not load'],
    primary: 'Glutes',
    secondary: 'Hamstrings',
    tempo: '1 second up · 3 second hold · 2 seconds lower',
    cue: 'Lighter than it has ever been. The hold is three seconds. The point is neural activation of the glute at low fatigue.',
    why: 'Low-load, high-quality hip thrusts during deload maintain glute activation without tissue stress.',
    note: 'Compare this to week 1\'s bodyweight hip thrust. The feel has changed. The muscle memory has changed.',
  },
  {
    name: 'Goblet Squat — Full Circle',
    searchTerms: ['goblet squat form', 'dumbbell goblet squat depth', 'squat technique comparison'],
    formCues: ['3-second descent — the same movement you started the programme with', 'Notice your depth and control compared to week 1'],
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
