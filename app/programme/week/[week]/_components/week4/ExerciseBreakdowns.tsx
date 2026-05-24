import { ExerciseCardNew, type ExerciseItem } from '../shared/ExerciseCardNew'

const exercises: ExerciseItem[] = [
  {
    name: 'Conventional Deadlift',
    plain: 'The most complete posterior chain movement — trained as an upper day pull this week',
    primary: 'Hamstrings, Glutes, Lower Back',
    secondary: 'Lats, Traps, Core, Quads',
    anatomySub: 'Full posterior chain',
    pattern: 'Hinge',
    equipment: 'Barbell',
    prescription: '4 × 5 · RPE 8',
    prescriptionNote: 'Take the slack out before every pull',
    muscles: [
      { name: 'Hamstrings', pct: 85 },
      { name: 'Glutes', pct: 80 },
      { name: 'Lower Back', pct: 75 },
      { name: 'Lats', pct: 60 },
    ],
    steps: [
      'Bar over mid-foot. Hip-width stance. Grip just outside your legs',
      'Hinge to the bar — neutral spine, lats engaged, chest up',
      'Take the slack out: feel the bar go tight before you actually pull',
      'Drive the floor away — bar stays close to your legs all the way up. Stand tall at lockout',
    ],
    cue: 'Bar over mid-foot. Hinge to the bar. Take the slack out before you pull. The bar moves with your hips, not after them.',
    mistake: 'Jerking the bar off the floor. Take the slack out first — feel it go tight. Then drive.',
    why: 'The deadlift trains the entire posterior chain in one movement. Learn it properly and you will use it for the rest of your training life.',
    stripeColor: 'var(--sage)',
  },
  {
    name: 'Ab Wheel Rollout',
    plain: 'Anti-extension core exercise — stops your spine from extending under load',
    primary: 'Rectus Abdominis, Deep Core',
    secondary: 'Lats, Shoulders',
    anatomySub: 'Anti-extension core',
    pattern: 'Core',
    equipment: 'Ab Wheel',
    prescription: '3 × 8 · Bodyweight',
    prescriptionNote: 'Half range with control beats full range with collapse',
    muscles: [
      { name: 'Deep Core', pct: 90 },
      { name: 'Rectus Abdominis', pct: 80 },
      { name: 'Lats', pct: 50 },
    ],
    steps: [
      'Kneel on the floor, wheel under your shoulders, core braced hard',
      'Roll forward slowly — lower back stays flat. Do not let it arch',
      'Only go as far as you can maintain a neutral spine — half range is fine',
      'Pull back using your core and lats — do not push with your arms',
    ],
    cue: 'Brace your core hard before you roll out — not after. Only go as far as you can without your lower back arching.',
    mistake: 'Going too far and dumping into the lower back. Start with 60% of what feels possible and build from there.',
    why: 'Trains anti-extension — stopping your spine from extending under load. This transfers directly to every compound lift.',
    stripeColor: 'var(--gold)',
  },
  {
    name: 'Cable Pull-Through',
    plain: 'Hip hinge with a cable — reinforces the RDL pattern and targets the glutes through the hip drive',
    primary: 'Glutes, Hamstrings',
    secondary: 'Lower Back (isometric), Core',
    anatomySub: 'Hip hinge reinforcement',
    pattern: 'Hinge',
    equipment: 'Cable Machine · Rope',
    prescription: '3 × 15 · RPE 6',
    prescriptionNote: 'Drive comes from glutes, not back',
    muscles: [
      { name: 'Glutes', pct: 85 },
      { name: 'Hamstrings', pct: 75 },
      { name: 'Lower Back', pct: 40 },
    ],
    steps: [
      'Cable at the lowest setting, rope between your legs, facing away',
      'Hinge forward at the hips — knees have a soft bend only, they do not drive',
      'Feel the hamstring stretch at the bottom, then squeeze glutes to drive hips through',
      'Stand tall at lockout — do not lean back excessively',
    ],
    cue: 'This is a hip hinge with a cable. The drive comes from squeezing your glutes, not extending your lower back.',
    mistake: 'Squatting rather than hinging. The knees have a soft bend only — they are not driving the movement.',
    why: 'Reinforces the hip hinge pattern under light load — carries directly over to deadlift and RDL. Excellent isolated glute stimulus too.',
    stripeColor: 'var(--sage)',
  },
  {
    name: 'Rear Delt Fly',
    plain: 'Isolation exercise for the rear deltoid — the most neglected muscle in most training plans',
    primary: 'Rear Deltoids',
    secondary: 'Rhomboids, Mid Traps',
    anatomySub: 'Shoulder health',
    pattern: 'Pull',
    equipment: 'Dumbbells',
    prescription: '3 × 15 · RPE 6',
    prescriptionNote: 'Lighter than you think — lead with elbows',
    muscles: [
      { name: 'Rear Delts', pct: 90 },
      { name: 'Rhomboids', pct: 65 },
      { name: 'Mid Traps', pct: 55 },
    ],
    steps: [
      'Hinge forward until torso is nearly parallel — or sit on the end of a bench',
      'Slight soft bend in the elbows, palms facing each other at the start',
      'Lead with the elbow — raise until arms are parallel to the floor',
      '2-second hold at the top. Dead stop at the bottom — no swinging',
    ],
    cue: 'Lighter than you think. Lead with the elbow, not the wrist. Squeeze at the top for 2 seconds.',
    mistake: 'Using momentum and swinging up. Dead stop at the bottom. Control every single rep.',
    why: 'Weak rear delts lead to rounded shoulders and shoulder injuries over time. This balances every press you\'ve done this programme.',
    stripeColor: '#3D5A80',
  },
  {
    name: 'EZ Bar Curl',
    plain: 'Bicep isolation with a bar — EZ grip reduces wrist stress while allowing full load',
    primary: 'Biceps Brachii',
    secondary: 'Brachialis, Brachioradialis',
    anatomySub: 'Elbow flexion',
    pattern: 'Isolation',
    equipment: 'EZ Bar',
    prescription: '3 × 10 · RPE 7',
    prescriptionNote: 'Elbows pinned — do not swing',
    muscles: [
      { name: 'Biceps', pct: 90 },
      { name: 'Brachialis', pct: 65 },
      { name: 'Brachioradialis', pct: 50 },
    ],
    steps: [
      'Stand tall, EZ bar in a supinated grip, elbows pinned to your sides',
      'Curl the bar up in a smooth arc — elbows stay fixed throughout',
      'Full contraction at the top — feel the bicep squeeze',
      'Lower in 2 seconds — arms fully extended at the bottom before the next rep',
    ],
    cue: 'Elbows stay pinned for every rep. Full range — start with arms extended, finish with full contraction.',
    mistake: 'Swinging the torso back. That is your lower back helping your biceps — which helps neither.',
    why: 'Biceps are trained after back — they will be pre-fatigued. Weight lower than you expect. That is correct.',
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
          Two new exercises this week — the conventional deadlift and ab wheel. Study the deadlift card before your first pull session.
        </p>
      </div>
      {exercises.map((ex, i) => (
        <ExerciseCardNew key={ex.name} ex={ex} index={i} />
      ))}
    </div>
  )
}
