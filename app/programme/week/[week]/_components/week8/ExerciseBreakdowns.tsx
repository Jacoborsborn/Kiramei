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
    searchTerms: ['back squat heavy set form', 'squat PR attempt setup', 'squat controlled descent'],
    formCues: ['Controlled 3-second descent — explosive drive up. Not rushed', 'Full 2 minutes rest between sets at this RPE'],
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper back, Hamstrings',
    tempo: 'Controlled descent · pause · explosive drive',
    cue: 'Five sets of five at RPE 9. Heaviest squat of the programme. Set up carefully, full 2 minutes rest between sets.',
    why: 'Whatever your week 6 working weight was — add 5–10kg. The deload has cleared the fatigue that was limiting you.',
    mistake: 'Going too heavy on set 1. Start at what is achievable for 5 reps at RPE 8. Add for subsequent sets.',
  },
  {
    name: 'Deadlift — 5×3 at RPE 9',
    searchTerms: ['deadlift heavy set form', 'deadlift slack out tutorial', 'conventional deadlift lockout'],
    formCues: ['Take the slack out before pulling — feel it go tight, then drive', 'Stand tall at lockout: hips through, do not lean back'],
    primary: 'Hamstrings, Glutes, Lower back, Lats, Traps',
    secondary: 'Core, Quads',
    tempo: 'Deliberate setup · single controlled pull · controlled lower',
    cue: 'Three reps per set at RPE 9. Full 3 minutes rest between sets. Heaviest deadlift of the programme — treat it accordingly.',
    why: 'At very high RPE, lower reps protect form across sets. Five sets of three gives the same volume as three sets of five but maintains maximum intent on every rep.',
    mistake: 'Pulling five sets in quick succession. The rest is structural. Incomplete rest at RPE 9 is how form breaks down.',
  },
  {
    name: 'Hip Thrust — 5 Sets Personal Best',
    searchTerms: ['loaded hip thrust 5 sets', 'hip thrust max weight form', 'hip thrust two second hold'],
    formCues: ['Full 2-second squeeze at top every rep — drop weight 5% if you lose it', 'Drive through heels, chin tucked, lower back does not arch'],
    primary: 'Glutes (maximus, medius)',
    secondary: 'Hamstrings, Core',
    tempo: '1 second drive · 2 second hold · 2 seconds lower',
    cue: 'Five sets of ten at RPE 8. Most hip thrust volume in the programme. You started at bodyweight. Today you do five loaded sets.',
    why: 'Glutes respond to higher volume. Five sets at peak strength produces a training stimulus the body has not encountered before. Deliberate peak.',
    mistake: 'Losing the two-second hold by set 4. Drop weight 5% and maintain the hold. The hold is the stimulus.',
  },
  {
    name: 'Full Curl Giant Set — EZ + Hammer + Cable',
    searchTerms: ['ez bar curl form', 'hammer curl neutral grip', 'cable curl constant tension'],
    formCues: ['EZ bar: 20% lighter than your usual working weight — two exercises follow', 'Cable last: constant tension when the bicep is already exhausted'],
    primary: 'Biceps brachii, Brachialis, Brachioradialis',
    secondary: 'Forearm flexors',
    tempo: '1 second up · 1 second hold · 2 seconds lower on all three',
    cue: 'Three exercises. No rest between. EZ bar → hammers → cable curl. Cable keeps constant tension when bicep is already exhausted.',
    why: 'High metabolic stress, high time under tension, significant muscle damage in a controlled way. You recover fully before starting your next programme.',
    mistake: 'Going too heavy on the EZ bar knowing two exercises follow. Reduce by 20% from normal working weight.',
  },
  {
    name: 'Weighted Pull-Up',
    searchTerms: ['weighted pull up form', 'dead hang pull up', 'pull up controlled lower 3 seconds'],
    formCues: ['Dead hang at the bottom — full arm extension every single rep', '3-second controlled lower: that\'s where the lat stimulus lives'],
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
