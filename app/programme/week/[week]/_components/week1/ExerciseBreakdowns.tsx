import { ExerciseCardNew, type ExerciseItem } from '../shared/ExerciseCardNew'

const exercises: ExerciseItem[] = [
  {
    name: 'Goblet Squat',
    plain: 'Dumbbell squat with weight held at chest — ideal for learning the squat pattern',
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper Back',
    anatomySub: 'Lower body compound',
    pattern: 'Squat',
    equipment: 'Dumbbell · Kettlebell',
    prescription: '3 × 12 · RPE 7',
    prescriptionNote: 'Learn the pattern, not the load',
    muscles: [
      { name: 'Quads', pct: 85 },
      { name: 'Glutes', pct: 70 },
      { name: 'Core', pct: 40 },
      { name: 'Upper Back', pct: 30 },
    ],
    steps: [
      'Hold a dumbbell vertically at chest height, elbows tucked underneath',
      'Feet shoulder-width apart, toes slightly out',
      'Sit your hips back and down — chest stays upright the whole way',
      'Drive through your heels to stand, squeezing glutes at the top',
    ],
    cue: 'Chest tall. Knees follow your toes. Sit into it — don\'t just bend your knees.',
    mistake: 'Heels rising off the floor. If this happens, your ankles are tight — elevate your heels slightly on a plate.',
    why: 'Teaches the squat pattern with the weight in front, which forces your torso upright. You cannot cheat this one.',
    stripeColor: 'var(--accent)',
  },
  {
    name: 'Romanian Deadlift (Dumbbells)',
    plain: 'Hip hinge that loads the hamstrings through a long, controlled stretch',
    primary: 'Hamstrings, Glutes',
    secondary: 'Lower Back, Core',
    anatomySub: 'Posterior chain',
    pattern: 'Hinge',
    equipment: 'Dumbbells',
    prescription: '3 × 10 · RPE 7',
    prescriptionNote: 'Push hips back, not down',
    muscles: [
      { name: 'Hamstrings', pct: 90 },
      { name: 'Glutes', pct: 75 },
      { name: 'Lower Back', pct: 50 },
      { name: 'Core', pct: 35 },
    ],
    steps: [
      'Stand holding dumbbells in front of your thighs, soft bend in the knees',
      'Push your hips back like you\'re trying to touch the wall behind you',
      'Lower the dumbbells along your legs — they should follow your shins closely',
      'Feel the stretch in your hamstrings, then drive hips through to stand',
    ],
    cue: 'Push your hips back like you\'re trying to touch the wall behind you. The dumbbells follow — they don\'t lead.',
    mistake: 'Rounding the lower back. If this happens the weight is too heavy. Drop it and own the pattern first.',
    why: 'The RDL is the most important glute and hamstring exercise in this programme. Learn it properly in week 1 and it will serve you for years.',
    stripeColor: 'var(--sage)',
  },
  {
    name: 'Hip Thrust (Bodyweight)',
    plain: 'Direct glute-loading movement — the most targeted glute exercise there is',
    primary: 'Glutes',
    secondary: 'Hamstrings, Core',
    anatomySub: 'Glute isolation',
    pattern: 'Hip Extension',
    equipment: 'Bench · Floor',
    prescription: '3 × 15 · Bodyweight',
    prescriptionNote: 'Feel the glute, not the lower back',
    muscles: [
      { name: 'Glutes', pct: 95 },
      { name: 'Hamstrings', pct: 50 },
      { name: 'Core', pct: 30 },
    ],
    steps: [
      'Upper back rests on the bench edge, feet flat on the floor, chin tucked',
      'Drive through your heels — not your toes — to lift your hips',
      'At the top: hips fully extended, squeeze the glute hard for 2 seconds',
      'Lower with control — do not let your lower back arch at the top',
    ],
    cue: 'Chin tucked. Drive through your heels. Squeeze hard at the top — hold it. Your lower back should not arch.',
    mistake: 'Arching the lower back at the top. That is your back working, not your glutes. Tuck your chin and brace your core.',
    why: 'This is the single most direct glute-loading exercise that exists. Bodyweight this week because you need to feel the pattern before adding load. Most people feel nothing in their glutes the first time. That is exactly what we are fixing.',
    stripeColor: 'var(--margin-red)',
  },
  {
    name: 'Seated Cable Row',
    plain: 'Upper back pulling movement using constant cable tension — excellent for posture',
    primary: 'Lats, Rhomboids, Mid Traps',
    secondary: 'Biceps, Rear Delts',
    anatomySub: 'Upper back pull',
    pattern: 'Pull',
    equipment: 'Cable Machine',
    prescription: '3 × 12 · RPE 7',
    prescriptionNote: 'Squeeze shoulder blades every rep',
    muscles: [
      { name: 'Rhomboids', pct: 85 },
      { name: 'Lats', pct: 80 },
      { name: 'Biceps', pct: 50 },
      { name: 'Rear Delts', pct: 45 },
    ],
    steps: [
      'Sit tall, slight lean forward to start — feet braced on the pads',
      'Pull the handle to your lower chest, driving elbows to your hips',
      'Squeeze shoulder blades together at the end of every rep',
      'Return with control — feel the lats stretch at full extension',
    ],
    cue: 'Pull your elbows to your hips, not your shoulders. Squeeze your shoulder blades together at the end of every rep.',
    mistake: 'Leaning back excessively to row more weight. That is your lower back. Keep your torso at 90 degrees.',
    why: 'Upper back strength counteracts sitting posture and protects your shoulders for every pressing movement you will ever do.',
    stripeColor: '#3D5A80',
  },
  {
    name: 'Dead Bug',
    plain: 'Core stability drill — teaches your spine to stay neutral under load',
    primary: 'Deep Core',
    secondary: 'Hip Flexors, Shoulder Stability',
    anatomySub: 'Anti-extension core',
    pattern: 'Core',
    equipment: 'Floor',
    prescription: '3 × 8 each side',
    prescriptionNote: 'Slow down until it\'s actually hard',
    muscles: [
      { name: 'Deep Core', pct: 90 },
      { name: 'Hip Flexors', pct: 40 },
      { name: 'Shoulders', pct: 30 },
    ],
    steps: [
      'Lie on your back, arms pointing to the ceiling, knees at 90 degrees',
      'Press your lower back flat into the floor — it stays there the entire set',
      'Slowly lower opposite arm and leg toward the floor over 4–5 seconds',
      'Return and repeat — the moment the lower back lifts, you\'ve gone too far',
    ],
    cue: 'Lower back stays flat to the floor the entire time. The moment it lifts, you have gone too far. Come back.',
    mistake: 'Rushing. If you can do this fast you are doing it wrong. Slow down until it is hard.',
    why: 'Every heavy compound lift you do in this programme depends on a stable core. This teaches your core to brace under load without moving your spine. It is not optional.',
    stripeColor: 'var(--gold)',
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
          Before you train this week, study each card. See how the exercise is done, feel the target muscle in your mind, and know the common mistake before you make it.
        </p>
      </div>
      {exercises.map((ex, i) => (
        <ExerciseCardNew key={ex.name} ex={ex} index={i} />
      ))}
    </div>
  )
}
