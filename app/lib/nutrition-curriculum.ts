export type NutritionWeek = {
  num: number
  slug: string
  title: string
  phase: string
  eyebrow: string
  hero: { lead: string; emphasis: string }
  intro: string
  stats: { l: string; v: string }[]
  sections: {
    heading: string
    body: string[]
  }[]
  tool?: 'tdee' | 'macros' | 'protein-compare' | 'meal-prep' | 'deficit' | 'surplus' | 'plan-builder'
  reflection: string
  next: { num: number | null; title: string }
}

export const NUTRITION_WEEKS: NutritionWeek[] = [
  {
    num: 1,
    slug: '1',
    title: 'Calories & TDEE',
    phase: 'Foundations',
    eyebrow: 'Week 01 · Calories & TDEE',
    hero: { lead: 'Why the number', emphasis: 'actually matters.' },
    intro: "This week is about one number — your TDEE. Find it, write it down, and you'll know more about your body than 90% of the people on Instagram telling you what to eat.",
    stats: [
      { l: 'Reading', v: '~ 20 min' },
      { l: 'To track', v: '1 number' },
      { l: 'Tools', v: 'Calculator' },
      { l: 'Cost', v: 'Free' },
    ],
    sections: [
      {
        heading: 'A calorie is just energy.',
        body: [
          "A calorie is a unit of energy. That's it. It's not a moral judgement, it's not 'good' or 'bad', and it doesn't get more or less calorific depending on whether you ate it standing up. <strong>Energy in versus energy out</strong> is the foundation everything else sits on.",
          "Your <strong>TDEE</strong> — total daily energy expenditure — is the number of calories your body burns in a day, all in. It's made of four bits: BMR (lying still), training, NEAT (everything else you do — walking, fidgeting, standing up to make tea), and TEF (digesting food).",
          "This week we'll find your TDEE, then we'll spend two weeks <em>not</em> changing it. <strong>If you can't hold maintenance, you can't run a deficit.</strong> So we walk first.",
        ],
      },
    ],
    tool: 'tdee',
    reflection: "What was your TDEE estimate? How does that compare to what you've been eating (rough guess is fine — you don't need to track yet)?",
    next: { num: 2, title: 'Macros' },
  },
  {
    num: 2,
    slug: '2',
    title: 'Macros',
    phase: 'Foundations',
    eyebrow: 'Week 02 · Macros',
    hero: { lead: 'Protein non-negotiable.', emphasis: 'The rest is flexible.' },
    intro: "Now that you know your number, this week we split it. Protein is the only macro with a hard target — carbs and fats flex around it depending on how you like to eat.",
    stats: [
      { l: 'Reading', v: '~ 18 min' },
      { l: 'To set',   v: '3 targets' },
      { l: 'Tools',    v: 'Macro calc' },
      { l: 'Cost',     v: 'Free' },
    ],
    sections: [
      {
        heading: 'The hierarchy.',
        body: [
          "Calories sit at the top. Inside those calories, your body needs three macronutrients: <strong>protein, carbs, fats</strong>. Each does a different job — protein builds tissue, carbs fuel hard training, fats run your hormones.",
          "Protein is the only one with a non-negotiable target: <strong>1.6–2.2g per kg of bodyweight per day</strong>. Below that and you're leaving muscle on the table, especially in a deficit. Above that and you're not getting bonus points — protein is a floor, not a ceiling.",
          "Carbs and fats divide the remaining calories. The split is mostly preference and culture: high-carb, lower-fat works great for hard training; lower-carb works for some people's energy and appetite. <strong>Both can work. Neither is magic.</strong>",
        ],
      },
    ],
    tool: 'macros',
    reflection: 'What macro split feels most realistic for the way you actually eat? (No wrong answer — adherence beats perfection every time.)',
    next: { num: 3, title: 'Protein sourcing' },
  },
  {
    num: 3,
    slug: '3',
    title: 'Protein sourcing',
    phase: 'Sourcing',
    eyebrow: 'Week 03 · Protein sourcing',
    hero: { lead: 'What 30g actually', emphasis: 'looks like.' },
    intro: "Last week you set a protein target. This week you learn what hitting it looks like across animal, plant, and budget options. No tribalism — just food.",
    stats: [
      { l: 'Reading', v: '~ 22 min' },
      { l: 'To plan',  v: '5 sources' },
      { l: 'Tools',    v: 'Compare grid' },
      { l: 'Cost',     v: 'Free' },
    ],
    sections: [
      {
        heading: 'Three ways to hit it.',
        body: [
          "Animal protein is calorie-dense and complete (all essential amino acids). Plant protein is leaner per gram of protein and needs slightly more variety to cover the amino-acid spread, but it's absolutely viable. Budget protein — eggs, legumes, dairy, tinned fish — is where most of the UK actually shops.",
          "Below the chapter is a comparison grid. Pick three sources you'd realistically eat every week and put them in your shopping list before you close this tab.",
        ],
      },
    ],
    tool: 'protein-compare',
    reflection: 'Which three protein sources are you committing to as your weekly staples?',
    next: { num: 4, title: 'Meal timing' },
  },
  {
    num: 4,
    slug: '4',
    title: 'Meal timing & training nutrition',
    phase: 'Sourcing',
    eyebrow: 'Week 04 · Timing',
    hero: { lead: 'Pre, intra, post.', emphasis: "What's actually worth it." },
    intro: "There's a whole industry built on telling you the exact right thing to eat 17 minutes before a workout. Most of it doesn't matter. Some of it does. Here's what's worth caring about.",
    stats: [
      { l: 'Reading', v: '~ 16 min' },
      { l: 'Rules',   v: '3' },
      { l: 'Tools',   v: 'Window planner' },
      { l: 'Cost',    v: 'Free' },
    ],
    sections: [
      {
        heading: 'The boring truth about timing.',
        body: [
          "Total daily protein and total daily calories are 95% of the result. Timing is the last 5%. That said: spreading protein across 3–4 meals beats hammering it all at dinner. A pre-workout meal 1–2 hours before training (carbs + protein) helps your sessions. Post-workout you have a wide window — eat within a few hours and you're fine.",
          "Intra-workout? Unless your sessions are over 90 minutes, water is enough. Save your money on intra-workout shakes.",
        ],
      },
    ],
    reflection: 'How spread out are your meals at the moment? Could you split your protein more evenly?',
    next: { num: 5, title: 'Meal prep & budget' },
  },
  {
    num: 5,
    slug: '5',
    title: 'Meal prep & budget eating',
    phase: 'Systems',
    eyebrow: 'Week 05 · Prep',
    hero: { lead: 'The Sunday system.', emphasis: 'No faff.' },
    intro: "If you have to think about what to eat every day, you'll fail. Meal prep isn't aesthetic Tupperware — it's removing decisions. Here's the system.",
    stats: [
      { l: 'Reading', v: '~ 15 min' },
      { l: 'To prep',  v: '4 components' },
      { l: 'Tools',    v: 'Prep grid' },
      { l: 'Cost',     v: '~£25/wk' },
    ],
    sections: [
      {
        heading: 'Four things, two hours.',
        body: [
          "Prep <strong>protein, carbs, vegetables, and a sauce</strong> — separately. Not full meals. Components. Then assemble each day in 90 seconds.",
          "Cheap staples: eggs, oats, rice, frozen veg, tinned tuna, chicken thighs (cheaper than breast), Greek yog, lentils. £25 a week feeds you well if you cook from these.",
        ],
      },
    ],
    tool: 'meal-prep',
    reflection: "What's the one prep day you can commit to this week?",
    next: { num: 6, title: 'Fat loss' },
  },
  {
    num: 6,
    slug: '6',
    title: 'Fat loss without wrecking training',
    phase: 'Systems',
    eyebrow: 'Week 06 · Cut',
    hero: { lead: 'Run a deficit.', emphasis: 'Keep your muscle.' },
    intro: "Fat loss is calories in vs calories out. The trick isn't finding the magic protocol — it's running a deficit small enough that you don't lose the muscle you've spent eight weeks training to build.",
    stats: [
      { l: 'Reading', v: '~ 20 min' },
      { l: 'Deficit',  v: '−15 to −20%' },
      { l: 'Tools',    v: 'Deficit calc' },
      { l: 'Cost',     v: 'Free' },
    ],
    sections: [
      {
        heading: 'Slow is the answer.',
        body: [
          "Take your maintenance calories and subtract 15–20%. That's it. A 70kg woman might cut from 2200 to 1850. <strong>Not 1200.</strong> Crash deficits cost you muscle, sleep, hair, and adherence.",
          "Push protein <em>up</em> in a cut, not down. 2.2g/kg or higher. Keep training heavy. Walk more — NEAT is where most of the energy expenditure lives.",
        ],
      },
    ],
    tool: 'deficit',
    reflection: "If you decide to cut after this course, what's your maintenance, what's your deficit number, and what does week 1 of the cut look like?",
    next: { num: 7, title: 'Building muscle' },
  },
  {
    num: 7,
    slug: '7',
    title: 'Building & maintaining muscle',
    phase: 'Independence',
    eyebrow: 'Week 07 · Build',
    hero: { lead: 'A surplus.', emphasis: 'A small one.' },
    intro: "Building muscle requires the opposite of fat loss — more calories than you burn. It's slow, it's boring, and the slow-and-boring version works far better than the bulk-then-cut version most influencers sell.",
    stats: [
      { l: 'Reading', v: '~ 18 min' },
      { l: 'Surplus',  v: '+10 to +15%' },
      { l: 'Tools',    v: 'Surplus calc' },
      { l: 'Cost',     v: 'Free' },
    ],
    sections: [
      {
        heading: 'Lean gain > dirty bulk.',
        body: [
          "Add 10–15% to maintenance. For our 70kg friend, that's 2200 → 2400. Aim for 0.25–0.5kg of weight gain per month. Faster than that and most of what you're adding is fat.",
          "<strong>Recomp</strong> — building muscle while losing fat — is real but slow, and only works well if you're new to training or returning after a break. Most experienced lifters need to commit to one direction at a time.",
        ],
      },
    ],
    tool: 'surplus',
    reflection: 'Are you in a build phase, a fat-loss phase, or maintenance? Pick one before week 8.',
    next: { num: 8, title: 'Build your own' },
  },
  {
    num: 8,
    slug: '8',
    title: 'Putting it together',
    phase: 'Independence',
    eyebrow: 'Week 08 · Build your own',
    hero: { lead: 'Your own approach.', emphasis: 'Written down.' },
    intro: "This is the week we promised you in week 1. Take everything you've learned and turn it into your own nutrition approach — one you can run for a year without buying another plan.",
    stats: [
      { l: 'Reading', v: '~ 12 min' },
      { l: 'Output',   v: '1 plan' },
      { l: 'Tools',    v: 'Plan builder' },
      { l: 'Cost',     v: 'Free' },
    ],
    sections: [
      {
        heading: 'Build your blueprint.',
        body: [
          "Open the plan builder below. It walks you through your phase (cut, build, maintain), your TDEE, your macro split, your three protein staples, and your prep day. By the time you finish, you have a one-page document — your own nutrition blueprint.",
          "Print it. Pin it. Run it for 12 weeks. Then re-evaluate. <strong>That's the whole programme.</strong>",
        ],
      },
    ],
    tool: 'plan-builder',
    reflection: "You've got a plan. What's the next thing you'll learn after this — and where will you learn it from?",
    next: { num: null, title: 'Course complete' },
  },
]
