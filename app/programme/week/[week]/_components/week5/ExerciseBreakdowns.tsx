import { ExerciseCardNew, type ExerciseItem } from '../shared/ExerciseCardNew'

const exercises: ExerciseItem[] = [
  {
    name: 'Cable Fly',
    plain: 'Chest isolation with constant cable tension — the barbell loses tension at the top, the cable does not',
    primary: 'Pectoralis Major',
    secondary: 'Front Delt',
    anatomySub: 'Chest isolation',
    pattern: 'Push',
    equipment: 'Cable Machine',
    prescription: '3 × 15 · RPE 7',
    prescriptionNote: 'Arms arc — elbows do not straighten',
    muscles: [
      { name: 'Chest', pct: 90 },
      { name: 'Front Delt', pct: 50 },
    ],
    steps: [
      'Cables at chest height, step forward into a split stance',
      'Slight soft bend in the elbows — this does not change throughout the movement',
      'Arms follow a wide arc outward, feel the chest stretch at the bottom',
      'Squeeze the hands together at the front — feel the chest contract at the top',
    ],
    cue: 'You are squeezing your chest and letting your arms follow. Feel the stretch at the bottom.',
    mistake: 'Bending the elbows too much and turning it into a press. Slight fixed bend — it does not change.',
    why: 'Cable provides constant tension through the full range of motion. This is the PPL isolation work — the compound movements have already done the heavy lifting.',
    stripeColor: 'var(--gold)',
  },
  {
    name: 'Lateral Raise',
    plain: 'The only exercise that directly trains the lateral deltoid — what creates shoulder width',
    primary: 'Lateral Deltoid',
    secondary: 'Supraspinatus, Upper Traps',
    anatomySub: 'Shoulder isolation',
    pattern: 'Isolation',
    equipment: 'Dumbbells',
    prescription: '3 × 15 · RPE 7',
    prescriptionNote: 'Lead with elbows, stop at shoulder height',
    muscles: [
      { name: 'Lateral Delt', pct: 90 },
      { name: 'Supraspinatus', pct: 55 },
      { name: 'Upper Traps', pct: 40 },
    ],
    steps: [
      'Slight forward lean from the hips — this better targets the lateral delt',
      'Arms slightly forward of the body, not directly to the side',
      'Lead with the elbows — raise until arms are parallel to the floor. Not higher',
      'Shoulders stay down — any shrugging shifts the load to traps',
    ],
    cue: 'Slight forward lean from the hips. Lead with elbows. Stop at shoulder height — going higher shifts load to traps.',
    mistake: 'Shrugging up as the weight rises. That is your upper trap. Drop your shoulders before each rep.',
    why: 'The lateral delt creates shoulder width. It is almost exclusively trained by lateral raises — no other exercise hits it as directly.',
    stripeColor: 'var(--gold)',
  },
  {
    name: 'Deadlift (Pull Day)',
    plain: 'Conventional deadlift opening the pull day — trained when fresh for maximum output',
    primary: 'Hamstrings, Glutes, Lower Back',
    secondary: 'Lats, Traps, Core',
    anatomySub: 'Full posterior chain',
    pattern: 'Hinge',
    equipment: 'Barbell',
    prescription: '4 × 5 · RPE 8',
    prescriptionNote: 'Two reps left in the tank every set',
    muscles: [
      { name: 'Hamstrings', pct: 85 },
      { name: 'Glutes', pct: 80 },
      { name: 'Lower Back', pct: 75 },
      { name: 'Lats', pct: 60 },
    ],
    steps: [
      'Same setup as week 4 — bar over mid-foot, hinge to the bar, take the slack out',
      'Drive the floor away, bar stays close to legs throughout',
      'Stand tall at lockout: hips through, do not lean back excessively',
      'Lower with control — reset your brace before each rep',
    ],
    cue: 'Pull day opens with deadlifts. RPE 8. Two reps left. Every set. Take full rest between sets.',
    mistake: 'Hyperextending at the top — leaning back excessively. Stand tall. Hips through. That is the lockout.',
    why: 'Deadlift as a pull day opener trains the entire back and posterior chain first, when you are fresh. Everything that follows is finishing work.',
    stripeColor: 'var(--sage)',
  },
  {
    name: 'Hip Thrust — Legs Wednesday',
    plain: 'Glute isolation mid-week — second stimulus of the week for maximum development',
    primary: 'Glutes',
    secondary: 'Hamstrings, Core',
    anatomySub: 'Glute isolation',
    pattern: 'Hip Extension',
    equipment: 'Barbell · Bench',
    prescription: '4 × 10 · RPE 8',
    prescriptionNote: 'Challenging weight — this is not accessory',
    muscles: [
      { name: 'Glutes', pct: 95 },
      { name: 'Hamstrings', pct: 50 },
      { name: 'Core', pct: 25 },
    ],
    steps: [
      'Mid-week means fresh legs — use a challenging weight, not a maintenance load',
      'Drive through heels — feel the difference from driving through toes',
      'Full 2-second squeeze at the top before lowering',
      'Control the descent — do not let the bar drop',
    ],
    cue: 'Mid-week glute work. Your legs are fresh — use a challenging weight. Squeeze at the top for the full two seconds.',
    mistake: 'Treating this as easy accessory work. It is a primary movement — load it accordingly.',
    why: 'Hitting glutes twice per week accelerates development. This is the second stimulus of the week, not an afterthought.',
    stripeColor: 'var(--margin-red)',
  },
  {
    name: 'Hammer Curl',
    plain: 'Neutral-grip curl that targets the brachialis — the muscle underneath the bicep that pushes it up',
    primary: 'Brachialis, Brachioradialis',
    secondary: 'Biceps Brachii',
    anatomySub: 'Elbow flexion',
    pattern: 'Isolation',
    equipment: 'Dumbbells',
    prescription: '3 × 12 · RPE 7',
    prescriptionNote: 'Palms face each other throughout',
    muscles: [
      { name: 'Brachialis', pct: 85 },
      { name: 'Brachioradialis', pct: 75 },
      { name: 'Biceps', pct: 55 },
    ],
    steps: [
      'Stand tall, dumbbells at your sides, palms facing each other — neutral grip',
      'Curl both arms simultaneously — the grip does not rotate throughout',
      'Full contraction at the top, controlled 2-second lower',
      'Full extension at the bottom before the next rep',
    ],
    cue: 'Palms face each other throughout. Targets the brachialis — the muscle underneath the bicep that pushes the bicep up when developed.',
    mistake: 'Alternating arms quickly to keep momentum. Do both simultaneously or fully complete one arm. Slow down.',
    why: 'Standard curls train the bicep primarily. Hammer curls train the brachialis and forearm. Together they build complete arm development.',
    stripeColor: 'var(--accent)',
  },
]

export default function ExerciseBreakdowns() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
          This week&rsquo;s exercises
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, marginBottom: 6 }}>
          Push Pull Legs begins this week. The cable fly and lateral raise are new — isolation work you haven&rsquo;t done before.
        </p>
      </div>
      {exercises.map((ex, i) => (
        <ExerciseCardNew key={ex.name} ex={ex} index={i} />
      ))}
    </div>
  )
}
