import { ExerciseHomeworkPanel } from '../shared/ExerciseHomeworkPanel'

const ACCENT = 'var(--accent)'
const TEXT_DIM = 'var(--ink-soft)'
const TEXT_MAIN = 'var(--ink)'
const TEXT_MUTED = 'var(--ink-muted)'

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

interface ExerciseCardProps {
  name: string
  index: number
  searchTerms: string[]
  formCues: string[]
  info: ExerciseInfoProps
}

function ExerciseCard({ name, index, searchTerms, formCues, info }: ExerciseCardProps) {
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
        display: 'grid', gridTemplateColumns: '220px 1fr', gap: 0,
      }} className="exercise-card-grid-w5">
        <div style={{
          background: 'rgba(31,27,22,0.06)',
          borderRight: '1px solid var(--paper-edge)',
        }}>
          <ExerciseHomeworkPanel index={index} searchTerms={searchTerms} formCues={formCues} />
        </div>
        <div style={{ padding: '28px 24px' }}>
          <InfoPanel {...info} />
        </div>
      </div>
    </div>
  )
}

export default function ExerciseBreakdowns() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
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
      <ExerciseCard
        name="Cable Fly"
        index={0}
        searchTerms={['cable fly form', 'cable crossover chest', 'cable fly arm arc']}
        formCues={['Arms follow an arc — elbows have a fixed soft bend, they do not straighten', 'Feel the chest stretch at the bottom; squeeze at the top']}
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
        index={1}
        searchTerms={['lateral raise form', 'dumbbell side raise', 'lateral raise elbow lead']}
        formCues={['Lead with elbows — not wrists. Stop at shoulder height, not above', 'Shoulders stay down throughout — shrugging moves the load to your traps']}
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
        index={2}
        searchTerms={['conventional deadlift form', 'deadlift lockout cue', 'pull day deadlift setup']}
        formCues={['Setup same as always — bar over mid-foot, brace then pull', 'Stand tall at lockout: hips through, do not lean back excessively']}
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
        index={3}
        searchTerms={['loaded hip thrust form', 'barbell hip thrust technique', 'hip thrust heel drive']}
        formCues={['Drive through heels — not toes. Feel the difference', 'Full 2-second squeeze at the top before lowering']}
        info={{
          primary: 'Glutes (maximus, medius)',
          secondary: 'Hamstrings, Core',
          tempo: '1 second drive · 2 second hold at top · 2 seconds lower',
          cue: 'Mid-week glute work. Your legs are fresh — use a challenging weight. Squeeze at the top for the full two seconds.',
          why: 'Hitting glutes twice per week accelerates development. This is the second stimulus of the week, not an afterthought.',
          mistake: 'Treating this as easy accessory work. It is a primary movement — load it accordingly.',
        }}
      />

      <ExerciseCard
        name="Hammer Curl"
        index={4}
        searchTerms={['hammer curl form', 'neutral grip curl technique', 'brachialis exercise']}
        formCues={['Palms face each other throughout — neutral grip the whole movement', 'Both arms together, or fully complete one at a time — no swinging momentum']}
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
          .exercise-card-grid-w5 > div:first-child { border-right: none !important; border-bottom: 1px solid var(--paper-edge); }
        }
      `}</style>
    </div>
  )
}
