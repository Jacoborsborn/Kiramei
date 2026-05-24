import { ExerciseCardNew, type ExerciseItem } from '../shared/ExerciseCardNew'

const exercises: ExerciseItem[] = [
  {
    name: 'Goblet Squat (Progression)',
    plain: 'Same pattern as week 1 — your nervous system is ready for more load now',
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper Back',
    anatomySub: 'Lower body compound',
    pattern: 'Squat',
    equipment: 'Dumbbell · Kettlebell',
    prescription: '4 × 12 · RPE 7–8',
    prescriptionNote: 'Add 2.5–5kg from week 1',
    muscles: [
      { name: 'Quads', pct: 85 },
      { name: 'Glutes', pct: 70 },
      { name: 'Core', pct: 40 },
      { name: 'Upper Back', pct: 30 },
    ],
    steps: [
      'Same setup as week 1 — weight at chest, feet shoulder-width, toes out slightly',
      'Two more reps than last week, or slightly heavier — not both',
      'If your chest drops on the way up, the weight is too heavy',
      'Drive through your heels, full lockout at the top each rep',
    ],
    cue: 'Two more reps than last week. Same weight or slightly more. If your chest drops on the way up the weight is too heavy.',
    mistake: 'Adding load and reps at the same time. Pick one. Pattern first, load second.',
    why: 'Your nervous system knows it now. This is the first week you are genuinely training the muscle — not just learning the movement.',
    stripeColor: 'var(--accent)',
  },
  {
    name: 'Hip Thrust with Load',
    plain: 'First time adding external load to the glutes — a plate across the hips',
    primary: 'Glutes',
    secondary: 'Hamstrings, Core',
    anatomySub: 'Glute isolation',
    pattern: 'Hip Extension',
    equipment: 'Plate · Bench',
    prescription: '3 × 12 · RPE 7',
    prescriptionNote: '5–10kg plate at the hip crease',
    muscles: [
      { name: 'Glutes', pct: 95 },
      { name: 'Hamstrings', pct: 50 },
      { name: 'Core', pct: 30 },
    ],
    steps: [
      'Set up as week 1 but hold a plate across the hip crease — not on the stomach',
      'Brace the plate with both hands, drive through heels',
      'Full 2-second squeeze at the top before lowering',
      'Control the descent — do not let the plate pull you down',
    ],
    cue: 'Hold a 5kg or 10kg plate on your hips. Drive through your heels. Squeeze at the top.',
    mistake: 'Plate sitting too high on the stomach. It sits across the hip crease — that is where the loading is most effective.',
    why: 'Week 1 was pattern learning. This is the first time you are loading the glute — the adaptation starts here.',
    stripeColor: 'var(--margin-red)',
  },
  {
    name: 'Barbell Back Squat (Introduction)',
    plain: 'The most effective lower body movement — learning it this week with an empty bar',
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper Back, Hamstrings',
    anatomySub: 'Lower body compound',
    pattern: 'Squat',
    equipment: 'Barbell · Rack',
    prescription: '4 × 8 · Empty Bar',
    prescriptionNote: '20kg only — own every rep',
    muscles: [
      { name: 'Quads', pct: 90 },
      { name: 'Glutes', pct: 75 },
      { name: 'Core', pct: 55 },
      { name: 'Upper Back', pct: 40 },
    ],
    steps: [
      'Bar rests on your upper traps — not your neck. Grip just outside shoulder width',
      'Take it out of the rack, step back, feet shoulder-width, toes angled out',
      'Brace your core hard before every single descent',
      'Sit down and back — drive through the whole foot to stand, eyes forward or slightly up',
    ],
    cue: 'Empty bar. 20kg. Bar sits on your upper traps not your neck. Brace before you descend. Every. Single. Rep.',
    mistake: 'Looking down. Eyes forward or slightly up. Where your eyes go your chest follows.',
    why: 'The most effective lower body compound movement. Learning it properly now so you can load it from week 3 — and for the rest of your training life.',
    stripeColor: 'var(--accent)',
  },
  {
    name: 'Barbell Romanian Deadlift (Introduction)',
    plain: 'The barbell version of the hip hinge — bar stays in contact with your legs throughout',
    primary: 'Hamstrings, Glutes',
    secondary: 'Lower Back, Core, Lats',
    anatomySub: 'Posterior chain',
    pattern: 'Hinge',
    equipment: 'Barbell',
    prescription: '3 × 8 · Empty Bar',
    prescriptionNote: 'Bar stays against your legs the whole way',
    muscles: [
      { name: 'Hamstrings', pct: 90 },
      { name: 'Glutes', pct: 75 },
      { name: 'Lower Back', pct: 60 },
      { name: 'Lats', pct: 45 },
    ],
    steps: [
      'Hold the bar at hip height, shoulder-width grip, soft bend in knees',
      'Hinge at the hips — push them back. The bar slides down your legs',
      'Flat back throughout — lats engaged to keep the bar close',
      'Drive hips through to stand — squeeze glutes at lockout',
    ],
    cue: 'Empty bar only. The bar stays in contact with your legs the entire movement. If it drifts forward your lower back takes over.',
    mistake: 'Bending the knees too much and turning it into a squat. Soft bend only. This is a hip hinge.',
    why: 'The barbell changes load distribution and forces you to engage your lats. Different stimulus from the dumbbell version — and a better long-term tool.',
    stripeColor: 'var(--sage)',
  },
  {
    name: 'Single Arm Dumbbell Row',
    plain: 'Unilateral back exercise — exposes and corrects strength imbalances between sides',
    primary: 'Lats, Rhomboids',
    secondary: 'Biceps, Rear Delt, Core',
    anatomySub: 'Upper back pull',
    pattern: 'Pull',
    equipment: 'Dumbbell · Bench',
    prescription: '3 × 12 each side · RPE 7',
    prescriptionNote: 'Torso stays square, core braced',
    muscles: [
      { name: 'Lats', pct: 85 },
      { name: 'Rhomboids', pct: 75 },
      { name: 'Biceps', pct: 55 },
      { name: 'Core', pct: 40 },
    ],
    steps: [
      'One knee and same-side hand on the bench — torso parallel to the floor',
      'Core braced like someone is about to push you sideways',
      'Pull the elbow to your hip — not your shoulder. Elbow drives down and back',
      'Full extension at the bottom, full squeeze at the top',
    ],
    cue: 'Brace your core like someone is about to push you sideways. Pull the elbow to your hip — not your shoulder.',
    mistake: 'Rotating the torso to get more range. Torso stays square. Rotation means you\'ve used too much weight.',
    why: 'Unilateral work identifies imbalances between sides. Most people are significantly stronger on one side without knowing it.',
    stripeColor: '#3D5A80',
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
          Two new exercises introduced this week — the barbell squat and barbell RDL. Study those cards before your first session.
        </p>
      </div>
      {exercises.map((ex, i) => (
        <ExerciseCardNew key={ex.name} ex={ex} index={i} />
      ))}
    </div>
  )
}
