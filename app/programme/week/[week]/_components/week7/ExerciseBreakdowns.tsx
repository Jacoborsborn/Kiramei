import { ExerciseCardNew, type ExerciseItem } from '../shared/ExerciseCardNew'

const exercises: ExerciseItem[] = [
  {
    name: 'Barbell Back Squat — Technique Focus',
    plain: 'Deload squat at 60% — active recovery and pattern reinforcement under low fatigue',
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper Back',
    anatomySub: 'Lower body compound',
    pattern: 'Squat',
    equipment: 'Barbell · Rack',
    prescription: '3 × 8 · 60% of last week',
    prescriptionNote: 'Perfection, not effort',
    muscles: [
      { name: 'Quads', pct: 90 },
      { name: 'Glutes', pct: 75 },
      { name: 'Core', pct: 55 },
      { name: 'Upper Back', pct: 40 },
    ],
    steps: [
      '60% of your previous working weight. Set up identically — bar position, stance, brace',
      '3-second controlled descent — feel your heels driving into the floor throughout',
      'Pause at the bottom — you should be able to hold it comfortably at this load',
      'Drive up with intention — treat it like a heavier set in terms of focus',
    ],
    cue: '60% of last week\'s weight. The objective is perfection, not effort. Slow down. Feel your heels drive into the floor.',
    mistake: 'Cutting the range because the weight is light. The lower load is exactly what allows you to explore full range. Use it.',
    why: 'Deload squats serve two purposes: active recovery AND reinforcement of correct movement pattern under low fatigue. Notice how much more comfortable this feels than week 2.',
    stripeColor: 'var(--accent)',
  },
  {
    name: 'Romanian Deadlift — Range Focus',
    plain: 'Deload RDL with emphasis on full range of motion — restores mobility and reinforces the endpoints',
    primary: 'Hamstrings, Glutes',
    secondary: 'Lower Back, Core',
    anatomySub: 'Posterior chain',
    pattern: 'Hinge',
    equipment: 'Barbell',
    prescription: '3 × 10 · Light',
    prescriptionNote: 'Push hips further back than usual',
    muscles: [
      { name: 'Hamstrings', pct: 90 },
      { name: 'Glutes', pct: 70 },
      { name: 'Lower Back', pct: 45 },
    ],
    steps: [
      'Light load — the goal is maximum range of motion, not maximum weight',
      'Push hips further back than usual — feel the full hamstring stretch at the bottom',
      '4-second descent: control every inch of the range',
      'Drive hips through to stand — feel the full contraction at the top',
    ],
    cue: 'Goal is maximum range of motion at minimum load. Push hips back further than usual. Feel the hamstring stretch fully.',
    mistake: 'Cutting the range because the weight feels light. The lower load is what allows full range — take advantage of it.',
    why: 'Heavy RDLs build strength in mid-range. Light RDLs with full range restore mobility and reinforce the pattern at its endpoints.',
    stripeColor: 'var(--sage)',
  },
  {
    name: 'Face Pull — Shoulder Reset',
    plain: 'Therapeutic shoulder work during deload — the external rotation hold is what matters here',
    primary: 'Rear Delts, External Rotators',
    secondary: 'Mid Traps',
    anatomySub: 'Joint reset',
    pattern: 'Pull',
    equipment: 'Cable Machine · Rope',
    prescription: '3 × 20 · Very Light',
    prescriptionNote: '4-second hold — feel the external rotation',
    muscles: [
      { name: 'Rear Delts', pct: 80 },
      { name: 'Rotator Cuff', pct: 85 },
      { name: 'Mid Traps', pct: 55 },
    ],
    steps: [
      'Lightest weight you would ever use — this is therapeutic, not training',
      'Pull to your face, elbows high',
      'At end range: hold for 4 seconds with maximum external rotation',
      'Return slowly — feel every degree of the return',
    ],
    cue: '20 reps. Four second hold. Light weight. The rotator cuff needs this after six weeks of pressing.',
    mistake: 'Using the same weight as your regular face pulls. This needs to be significantly lighter to allow the full 4-second hold.',
    why: 'Deload is also a joint reset. Heavy pressing compresses the anterior shoulder capsule. Face pulls with long hold actively counteract this.',
    stripeColor: '#3D5A80',
  },
  {
    name: 'Hip Thrust — 60% Load, Full Squeeze Focus',
    plain: 'Deload hip thrust focused on quality of glute contraction over load',
    primary: 'Glutes',
    secondary: 'Hamstrings',
    anatomySub: 'Glute activation',
    pattern: 'Hip Extension',
    equipment: 'Barbell · Bench',
    prescription: '3 × 12 · 60% of last week',
    prescriptionNote: '3-second hold — feel the glute fully',
    muscles: [
      { name: 'Glutes', pct: 95 },
      { name: 'Hamstrings', pct: 45 },
    ],
    steps: [
      '60% load — setup identical, drive through heels',
      '3-second hold at the top on every rep — feel the glute activate fully',
      'This is about neural activation of the glute at low fatigue',
      'Compare the feel to week 1\'s bodyweight version — it has changed',
    ],
    cue: 'Lighter than it has ever been. The hold is three seconds. The point is neural activation of the glute at low fatigue.',
    mistake: 'Rushing through the reps because the weight is light. The 3-second hold is the stimulus — without it this is just movement.',
    why: 'Low-load, high-quality hip thrusts during deload maintain glute activation without tissue stress. The muscle memory remains sharp.',
    stripeColor: 'var(--margin-red)',
  },
  {
    name: 'Goblet Squat — Full Circle',
    plain: 'The exercise that started the programme — deliberate bookend and personal benchmark',
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper Back',
    anatomySub: 'Lower body compound',
    pattern: 'Squat',
    equipment: 'Dumbbell · Kettlebell',
    prescription: '2 × 15 · RPE 5',
    prescriptionNote: 'Compare to week 1 — feel the difference',
    muscles: [
      { name: 'Quads', pct: 85 },
      { name: 'Glutes', pct: 70 },
      { name: 'Core', pct: 40 },
    ],
    steps: [
      'Same setup as week 1 — weight at chest, feet shoulder-width',
      'Same 3-second controlled descent',
      'Notice your depth, control and comfort compared to session A, week 1',
      'Easier. More controlled. Better depth. That growth in competence is real',
    ],
    cue: 'The exercise this programme started with. Same movement. Deliberately chosen so you can feel the difference.',
    mistake: 'Treating this as throwaway volume. It is a benchmark. Feel it.',
    why: 'The goblet squat in week 7 is a bookend. How does it compare to session A, week 1? Easier. More controlled. Better depth. After this session, take a moment — you are one week from completing eight weeks of consistent training.',
    stripeColor: 'var(--accent)',
  },
]

export default function ExerciseBreakdowns() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
          Deload week exercises
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, marginBottom: 6 }}>
          All familiar exercises — focus is on quality and range, not load. The goblet squat on Friday is a deliberate benchmark against week 1.
        </p>
      </div>
      {exercises.map((ex, i) => (
        <ExerciseCardNew key={ex.name} ex={ex} index={i} />
      ))}
    </div>
  )
}
