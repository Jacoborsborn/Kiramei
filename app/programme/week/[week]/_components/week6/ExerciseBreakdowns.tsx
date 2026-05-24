import { ExerciseCardNew, type ExerciseItem } from '../shared/ExerciseCardNew'

const exercises: ExerciseItem[] = [
  {
    name: 'Chest Supported Row',
    plain: 'Incline bench dumbbell row with chest supported — removes all lower back involvement',
    primary: 'Lats, Rhomboids, Mid Traps',
    secondary: 'Rear Delt, Biceps',
    anatomySub: 'Pure upper back pull',
    pattern: 'Pull',
    equipment: 'Incline Bench · Dumbbells',
    prescription: '4 × 10 · RPE 7–8',
    prescriptionNote: 'Chest stays on the pad every rep',
    muscles: [
      { name: 'Rhomboids', pct: 90 },
      { name: 'Lats', pct: 80 },
      { name: 'Rear Delt', pct: 65 },
      { name: 'Biceps', pct: 50 },
    ],
    steps: [
      'Lie face-down on a 45-degree incline bench, dumbbells hanging below',
      'Chest stays on the pad every single rep — if it lifts, your lower back is taking over',
      'Drive elbows down and back — not upward into a shrug',
      'Full stretch at the bottom, full squeeze at the top',
    ],
    cue: 'Chest stays in contact with the pad for every rep. If it lifts, your lower back is taking over.',
    mistake: 'Shrugging at the top instead of retracting the shoulder blades. Drive elbows back and down, not up.',
    why: 'Every row you have done has some lower back involvement. This removes it completely — pure upper back stimulus.',
    stripeColor: '#3D5A80',
  },
  {
    name: 'Tricep Superset — Pushdown + Overhead Extension',
    plain: 'Back-to-back tricep exercises training all three heads in one superset',
    primary: 'Triceps (All Three Heads)',
    secondary: 'None significant',
    anatomySub: 'Elbow extension',
    pattern: 'Isolation',
    equipment: 'Cable Machine',
    prescription: '3 × 12 + 10 · Superset',
    prescriptionNote: 'No rest between exercises',
    muscles: [
      { name: 'Triceps (lateral)', pct: 85 },
      { name: 'Triceps (long head)', pct: 90 },
      { name: 'Triceps (medial)', pct: 75 },
    ],
    steps: [
      'Pushdown: elbows pinned to sides, full extension at the bottom on every rep',
      'Overhead extension: elbows point forward — they do not flare wide',
      'Move straight from pushdown to overhead extension — no rest between',
      'Rest 90 seconds after both exercises are complete',
    ],
    cue: 'No rest between exercises. Pushdown first, then straight into overhead extension. Rest 90 seconds after both.',
    mistake: 'Going too heavy. Start 30% lighter than your solo overhead weight — two exercises are back to back.',
    why: 'Pushdown emphasises the lateral and medial heads. Overhead hits the long head exclusively. One superset trains all three.',
    stripeColor: 'var(--accent)',
  },
  {
    name: 'Curl Superset — EZ Bar + Hammer',
    plain: 'Two curl variations back-to-back — trains different aspects of the same muscle group',
    primary: 'Biceps Brachii, Brachialis',
    secondary: 'Brachioradialis, Forearms',
    anatomySub: 'Complete elbow flexion',
    pattern: 'Isolation',
    equipment: 'EZ Bar · Dumbbells',
    prescription: '3 × 10 + 10 · Superset',
    prescriptionNote: 'EZ bar first — straight into hammers',
    muscles: [
      { name: 'Biceps', pct: 90 },
      { name: 'Brachialis', pct: 85 },
      { name: 'Brachioradialis', pct: 65 },
    ],
    steps: [
      'EZ bar curl: elbows pinned, full range from extended to fully contracted',
      'Move immediately to hammer curls — pick up dumbbells, palms face each other',
      'Hammers: neutral grip throughout, controlled lower on every rep',
      'Your arms should be significantly fatigued by the end of both exercises',
    ],
    cue: 'EZ bar first — straight into hammers with no rest. Your arms should be significantly fatigued by the end.',
    mistake: 'Rushing between the exercises. Move immediately but do not sacrifice your setup or form.',
    why: 'Two different grips train different aspects of the same muscle group. Together more comprehensive than either alone.',
    stripeColor: 'var(--accent)',
  },
  {
    name: 'Bulgarian Split Squat (Weighted)',
    plain: 'Same split squat from week 3 — now with dumbbells added after mastering balance',
    primary: 'Quads, Glutes',
    secondary: 'Hamstrings, Core, Hip Flexors',
    anatomySub: 'Unilateral lower body',
    pattern: 'Unilateral Squat',
    equipment: 'Dumbbells · Bench',
    prescription: '3 × 10 each leg · RPE 7',
    prescriptionNote: 'Same pattern as week 3, now loaded',
    muscles: [
      { name: 'Quads', pct: 85 },
      { name: 'Glutes', pct: 75 },
      { name: 'Hamstrings', pct: 45 },
      { name: 'Core', pct: 40 },
    ],
    steps: [
      'Same foot position as week 3 — front shin vertical at the bottom',
      'Dumbbells hang at your sides, torso upright',
      'Lower straight down — knee tracks over toes',
      'Drive through the front heel. Place a marker for foot position as fatigue sets in',
    ],
    cue: 'You started this at bodyweight in week 3. This week you add dumbbells. The movement pattern is exactly the same.',
    mistake: 'Front foot migrating forward as fatigue sets in. Place something on the floor to mark your foot position.',
    why: 'Develops unilateral leg strength with real load now. Also identifies any imbalances that the bodyweight version masked.',
    stripeColor: 'var(--accent)',
  },
  {
    name: 'Face Pull (4×20)',
    plain: 'High-rep shoulder health work — external rotation emphasis after six weeks of pressing',
    primary: 'Rear Delts, External Rotators',
    secondary: 'Mid Traps, Rhomboids',
    anatomySub: 'Shoulder health',
    pattern: 'Pull',
    equipment: 'Cable Machine · Rope',
    prescription: '4 × 20 · RPE 6',
    prescriptionNote: '3-second hold — external rotation is everything',
    muscles: [
      { name: 'Rear Delts', pct: 85 },
      { name: 'Rotator Cuff', pct: 80 },
      { name: 'Mid Traps', pct: 60 },
      { name: 'Rhomboids', pct: 55 },
    ],
    steps: [
      'Light weight — this is therapeutic, not a strength exercise',
      'Elbows high — above ear height at the finish position',
      'Pull to face, then externally rotate at end range — thumbs point behind you',
      '3-second hold at end range. This is the whole point',
    ],
    cue: 'Twenty reps. Three second hold. This is a shoulder health exercise first. The external rotation at the end is everything.',
    mistake: 'Pulling to the chin instead of the face with elbows high. The elbows need to be above the ears.',
    why: 'Six weeks of pressing accumulates anterior shoulder stress. Face pulls with high hold time counteract this completely.',
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
          Second PPL week. Two supersets introduced — study the execution carefully so you know the transition between exercises.
        </p>
      </div>
      {exercises.map((ex, i) => (
        <ExerciseCardNew key={ex.name} ex={ex} index={i} />
      ))}
    </div>
  )
}
