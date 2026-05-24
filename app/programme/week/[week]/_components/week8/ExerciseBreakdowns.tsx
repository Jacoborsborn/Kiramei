import { ExerciseCardNew, type ExerciseItem } from '../shared/ExerciseCardNew'

const exercises: ExerciseItem[] = [
  {
    name: 'Barbell Back Squat — Personal Best',
    plain: 'Heaviest squat of the programme — the deload has cleared the fatigue that was limiting you',
    primary: 'Quads, Glutes',
    secondary: 'Core, Upper Back, Hamstrings',
    anatomySub: 'Lower body compound',
    pattern: 'Squat',
    equipment: 'Barbell · Rack',
    prescription: '5 × 5 · RPE 9',
    prescriptionNote: 'Full 2 minutes rest between sets',
    muscles: [
      { name: 'Quads', pct: 90 },
      { name: 'Glutes', pct: 80 },
      { name: 'Core', pct: 55 },
      { name: 'Upper Back', pct: 45 },
    ],
    steps: [
      'Set up identically to every previous week — bar position, stance, brace',
      'Start at what is achievable for 5 reps at RPE 8 — add for subsequent sets',
      'Controlled 3-second descent, explosive drive up — not rushed but intentional',
      'Full 2 minutes rest between sets at this intensity',
    ],
    cue: 'Five sets of five at RPE 9. Heaviest squat of the programme. Set up carefully, full 2 minutes rest between sets.',
    mistake: 'Going too heavy on set 1. Start at RPE 8 and work up. Fatigue compounds fast at this intensity.',
    why: 'Whatever your week 6 working weight was — add 5–10kg. The deload cleared the fatigue that was holding you back. This is earned.',
    stripeColor: 'var(--accent)',
  },
  {
    name: 'Deadlift — 5×3 at RPE 9',
    plain: 'Lower reps at very high effort — protects form across all five sets at this intensity',
    primary: 'Hamstrings, Glutes, Lower Back, Lats, Traps',
    secondary: 'Core, Quads',
    anatomySub: 'Full posterior chain',
    pattern: 'Hinge',
    equipment: 'Barbell',
    prescription: '5 × 3 · RPE 9',
    prescriptionNote: 'Full 3 minutes rest — structural, not optional',
    muscles: [
      { name: 'Hamstrings', pct: 85 },
      { name: 'Glutes', pct: 80 },
      { name: 'Lower Back', pct: 80 },
      { name: 'Lats', pct: 65 },
    ],
    steps: [
      'Same setup as always — bar over mid-foot, take the slack out before you pull',
      'Three reps only per set — full quality on every single pull',
      'Stand tall at lockout: hips through, do not lean back excessively',
      'Full 3 minutes rest between sets. This is structural — do not skip it',
    ],
    cue: 'Three reps per set at RPE 9. Full 3 minutes rest between sets. Heaviest deadlift of the programme — treat it accordingly.',
    mistake: 'Pulling five sets in quick succession. The rest is structural. Incomplete rest at RPE 9 is how form breaks down.',
    why: 'At very high RPE, lower reps protect form across sets. Five sets of three gives the same volume as three sets of five but maintains maximum intent on every rep.',
    stripeColor: 'var(--sage)',
  },
  {
    name: 'Hip Thrust — 5 Sets Personal Best',
    plain: 'Most hip thrust volume of the programme — you started at bodyweight, today is five loaded sets',
    primary: 'Glutes',
    secondary: 'Hamstrings, Core',
    anatomySub: 'Glute isolation peak',
    pattern: 'Hip Extension',
    equipment: 'Barbell · Bench',
    prescription: '5 × 10 · RPE 8',
    prescriptionNote: '2-second hold every rep — do not drop it by set 4',
    muscles: [
      { name: 'Glutes', pct: 95 },
      { name: 'Hamstrings', pct: 50 },
      { name: 'Core', pct: 30 },
    ],
    steps: [
      'Same setup as always — pad in place, upper back on bench, chin tucked',
      'Drive through heels, full extension at the top',
      'Full 2-second squeeze on every rep of every set — drop weight 5% if you lose it by set 4',
      'This is the highest volume your glutes will have seen across the programme',
    ],
    cue: 'Five sets of ten at RPE 8. Most hip thrust volume in the programme. You started at bodyweight. Today you do five loaded sets.',
    mistake: 'Losing the two-second hold by set 4. Drop weight 5% and maintain the hold. The hold is the stimulus.',
    why: 'Glutes respond to higher volume. Five sets at peak strength produces a training stimulus the body has not encountered before. Deliberate peak.',
    stripeColor: 'var(--margin-red)',
  },
  {
    name: 'Full Curl Giant Set — EZ + Hammer + Cable',
    plain: 'Three curl variations back-to-back — maximum metabolic stress and time under tension',
    primary: 'Biceps Brachii, Brachialis, Brachioradialis',
    secondary: 'Forearm Flexors',
    anatomySub: 'Complete elbow flexion',
    pattern: 'Isolation',
    equipment: 'EZ Bar · Dumbbells · Cable',
    prescription: '3 rounds · Giant Set',
    prescriptionNote: 'EZ bar 20% lighter than usual — two exercises follow',
    muscles: [
      { name: 'Biceps', pct: 90 },
      { name: 'Brachialis', pct: 85 },
      { name: 'Brachioradialis', pct: 70 },
    ],
    steps: [
      'EZ bar: 20% lighter than your usual working weight. Elbows pinned, full range',
      'Move immediately to hammer curls — neutral grip, controlled lower',
      'Move immediately to cable curl — constant tension when the bicep is already exhausted',
      'Rest 2 minutes between each round',
    ],
    cue: 'Three exercises. No rest between. EZ bar → hammers → cable curl. Cable keeps constant tension when bicep is already exhausted.',
    mistake: 'Going too heavy on the EZ bar knowing two exercises follow. Reduce by 20% from your normal working weight.',
    why: 'High metabolic stress, high time under tension, significant muscle stimulus in a controlled way. You recover fully before your next programme begins.',
    stripeColor: 'var(--gold)',
  },
  {
    name: 'Weighted Pull-Up',
    plain: 'A benchmark of upper body pulling strength — meaningful progress from wherever you started',
    primary: 'Lats, Rhomboids',
    secondary: 'Biceps, Rear Delt, Core',
    anatomySub: 'Vertical pull',
    pattern: 'Pull',
    equipment: 'Pull-Up Bar · Weight Belt',
    prescription: '4 × 5 · RPE 8–9',
    prescriptionNote: 'Dead hang at the bottom — every rep',
    muscles: [
      { name: 'Lats', pct: 90 },
      { name: 'Rhomboids', pct: 75 },
      { name: 'Biceps', pct: 60 },
      { name: 'Core', pct: 40 },
    ],
    steps: [
      'Dead hang at the bottom — full arm extension every single rep',
      'Pull until chin clears the bar — lead with your chest, not your chin',
      '1-second hold at the top',
      '3-second controlled lower — that\'s where the lat stimulus lives. Do not drop from the top',
    ],
    cue: 'Add weight if bodyweight felt like RPE 7 in recent weeks. The controlled 3-second lower is where significant lat stimulus lives.',
    mistake: 'Partial range — not achieving full arm extension at the bottom. Dead hang at the bottom of every rep.',
    why: 'Being able to perform weighted pull-ups after eight weeks — starting from wherever you started — is a meaningful marker of progress. This closes the programme the right way.',
    stripeColor: '#3D5A80',
  },
]

export default function ExerciseBreakdowns() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <p style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
          Final week exercises
        </p>
        <p style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.6, marginBottom: 6 }}>
          Personal bests week. The deload cleared the fatigue — you are stronger than your last training session. Trust the process.
        </p>
      </div>
      {exercises.map((ex, i) => (
        <ExerciseCardNew key={ex.name} ex={ex} index={i} />
      ))}
    </div>
  )
}
