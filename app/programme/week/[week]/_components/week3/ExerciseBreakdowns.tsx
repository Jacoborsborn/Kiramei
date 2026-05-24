import { ExerciseCardNew, type ExerciseItem } from '../shared/ExerciseCardNew'

const exercises: ExerciseItem[] = [
  {
    name: 'Barbell Bench Press',
    plain: 'Horizontal pressing — the most effective chest builder with even barbell loading',
    primary: 'Chest (Pectoralis Major)',
    secondary: 'Front Delt, Triceps',
    anatomySub: 'Horizontal push',
    pattern: 'Push',
    equipment: 'Barbell · Bench',
    prescription: '4 × 8 · RPE 7–8',
    prescriptionNote: 'Blades pinched before you unrack',
    muscles: [
      { name: 'Chest', pct: 85 },
      { name: 'Front Delt', pct: 65 },
      { name: 'Triceps', pct: 60 },
    ],
    steps: [
      'Pinch your shoulder blades together and pull them down — hold that throughout',
      'Grip just wider than shoulder-width. Bar over mid-chest when lowered',
      'Lower with control — 2 seconds down, touch the chest, pause',
      'Press in a slight arc back toward the rack — full lockout at the top',
    ],
    cue: 'Shoulder blades pinched together and pulled down before you unrack. Bar sits on your upper traps not your neck.',
    mistake: 'Elbows flaring to 90 degrees. Keep them at 45–60 degrees from your torso — this protects the shoulder.',
    why: 'Horizontal pressing is a fundamental movement pattern. The barbell allows even loading on both sides and consistent progress across sets.',
    stripeColor: 'var(--gold)',
  },
  {
    name: 'Barbell Row',
    plain: 'Horizontal back pull — the direct counterpart to the bench press',
    primary: 'Lats, Rhomboids, Mid Traps',
    secondary: 'Rear Delt, Biceps',
    anatomySub: 'Upper back pull',
    pattern: 'Pull',
    equipment: 'Barbell',
    prescription: '4 × 8 · RPE 7–8',
    prescriptionNote: 'Pull to lower sternum, not belly',
    muscles: [
      { name: 'Rhomboids', pct: 85 },
      { name: 'Lats', pct: 80 },
      { name: 'Rear Delt', pct: 55 },
      { name: 'Biceps', pct: 50 },
    ],
    steps: [
      'Hinge until torso is roughly 45 degrees — chest up, flat back',
      'Grip just outside shoulder-width, bar hanging under lower chest',
      'Pull bar to your lower sternum — elbows drive back and slightly out',
      'Squeeze shoulder blades at the top, lower with full control',
    ],
    cue: 'Chest up. Pull to your lower sternum — not your belly button, not your upper chest.',
    mistake: 'Using momentum — jerking the torso upright to swing the weight up. Slow it down.',
    why: 'Every push needs a pull. The barbell row is the direct counterpart to the bench press. Skip this and your shoulder health suffers.',
    stripeColor: '#3D5A80',
  },
  {
    name: 'Bulgarian Split Squat (Bodyweight)',
    plain: 'Single-leg squat variant that exposes and fixes imbalances between legs',
    primary: 'Quads, Glutes',
    secondary: 'Hamstrings, Core, Hip Flexors',
    anatomySub: 'Unilateral lower body',
    pattern: 'Unilateral Squat',
    equipment: 'Bench',
    prescription: '3 × 10 each leg · Bodyweight',
    prescriptionNote: 'Master balance before adding load',
    muscles: [
      { name: 'Quads', pct: 85 },
      { name: 'Glutes', pct: 70 },
      { name: 'Hamstrings', pct: 45 },
      { name: 'Core', pct: 40 },
    ],
    steps: [
      'Rear foot elevated on a bench — laces down or toes on the edge',
      'Front foot far enough forward that your shin stays roughly vertical at the bottom',
      'Lower straight down — knee tracks over toes. Do not let it cave inward',
      'Drive through the heel of the front foot to stand — do not push off the rear leg',
    ],
    cue: 'Front foot far enough forward that your shin stays vertical at the bottom. Bodyweight this week — master the balance before adding load.',
    mistake: 'Front foot too close to the bench, causing the shin to angle forward excessively under load.',
    why: 'Bilateral squats can hide imbalances. The split squat forces each leg to work independently — and stretches the hip flexor of the rear leg as a bonus.',
    stripeColor: 'var(--accent)',
  },
  {
    name: 'Hip Thrust (Heavy)',
    plain: 'Loaded glute isolation at its heaviest so far — maximum glute stimulus',
    primary: 'Glutes',
    secondary: 'Hamstrings, Core',
    anatomySub: 'Glute isolation',
    pattern: 'Hip Extension',
    equipment: 'Barbell · Bench',
    prescription: '4 × 8 · RPE 8',
    prescriptionNote: 'Heaviest you\'ve used yet',
    muscles: [
      { name: 'Glutes', pct: 95 },
      { name: 'Hamstrings', pct: 50 },
      { name: 'Core', pct: 25 },
    ],
    steps: [
      'Barbell padded, sitting over your hips at the hip crease',
      'Upper back on bench, chin tucked, feet flat — drive through heels',
      'Full extension at the top — glutes squeezing hard, hips level',
      '2-second hold at the top. Lower with control before the next rep',
    ],
    cue: 'Drive through your heels. Squeeze at the top for the full two seconds. Do not rush the hold.',
    mistake: 'Letting the lower back arch at lockout. That is your back, not your glutes. Chin tucked, core braced.',
    why: 'You started bodyweight, then added a plate, now a barbell. The glute stimulus at this load is significantly greater than anything before it.',
    stripeColor: 'var(--margin-red)',
  },
  {
    name: 'Face Pull',
    plain: 'Cable shoulder health movement — pulls the rear delt back and externally rotates the shoulder',
    primary: 'Rear Delts, External Rotators',
    secondary: 'Rhomboids, Mid Traps',
    anatomySub: 'Shoulder health',
    pattern: 'Pull',
    equipment: 'Cable Machine · Rope',
    prescription: '3 × 15 · RPE 6',
    prescriptionNote: 'Light — this is maintenance, not strength',
    muscles: [
      { name: 'Rear Delts', pct: 85 },
      { name: 'Rhomboids', pct: 70 },
      { name: 'Rotator Cuff', pct: 65 },
      { name: 'Mid Traps', pct: 55 },
    ],
    steps: [
      'Rope attachment at face height, step back enough to feel tension throughout',
      'Pull the rope to your face — elbows high, flaring outward',
      'At end range: externally rotate, thumbs pointing behind you',
      '1-second hold, then return with control',
    ],
    cue: 'Pull to your face. Elbows high. At end range, thumbs go back — that external rotation is the whole point.',
    mistake: 'Pulling to the chin with elbows low. That trains the wrong muscles entirely. Elbows high, pull to the face.',
    why: 'Every pressing session stresses the anterior shoulder. Face pulls counteract this. They are not accessory — they are insurance.',
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
          Upper/Lower split begins this week. New exercises include the bench press and Bulgarian split squat — study those first.
        </p>
      </div>
      {exercises.map((ex, i) => (
        <ExerciseCardNew key={ex.name} ex={ex} index={i} />
      ))}
    </div>
  )
}
