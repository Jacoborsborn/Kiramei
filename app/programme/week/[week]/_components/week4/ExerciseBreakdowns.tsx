import { ExerciseHomeworkPanel } from '../shared/ExerciseHomeworkPanel'

const ACCENT = 'var(--accent)'
const TEXT_MAIN = 'var(--ink)'
const TEXT_DIM = 'var(--ink-soft)'
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
      }} className="exercise-card-grid">
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
        name="Conventional Deadlift"
        index={0}
        searchTerms={['conventional deadlift form', 'deadlift setup tutorial', 'deadlift bar path']}
        formCues={['Bar over mid-foot — take the slack out before you pull', 'Hips drive the bar; it should not swing away from your legs']}
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
        index={1}
        searchTerms={['ab wheel rollout form', 'rollout anti extension', 'ab wheel tutorial beginner']}
        formCues={['Core braced hard before you roll out — not after', 'Only go as far as you can without lower back arching; half range is fine']}
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
        index={2}
        searchTerms={['cable pull through form', 'hip hinge cable exercise', 'pull through glutes tutorial']}
        formCues={['Hips hinge back — knees have a soft bend only, they do not drive the movement', 'Drive is from the glutes squeezing forward, not from arching the lower back']}
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
        index={3}
        searchTerms={['rear delt fly form', 'bent over rear delt raise', 'rear delt technique']}
        formCues={['Lead with elbows — not wrists. Elbow is the highest point', '2-second hold at the top; dead stop at the bottom, no swinging']}
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
        index={4}
        searchTerms={['ez bar curl form', 'barbell curl full range', 'bicep curl elbow position']}
        formCues={['Elbows stay pinned to sides throughout — they do not move forward', 'Full range: arms extended at the bottom, full contraction at the top']}
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
          .exercise-card-grid > div:first-child { border-right: none !important; border-bottom: 1px solid var(--paper-edge); }
        }
      `}</style>
    </div>
  )
}
