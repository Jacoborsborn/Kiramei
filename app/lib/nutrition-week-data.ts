// Kira Mei — Nutrition Blueprint · Weeks 1–8
// Tone: direct, warm, anti-jargon, anti-shame. "You're not alone in this."
// Hook psychology heavy in weeks 1-3 (curiosity → identity shift → early win).

export const WEEK_DATA = [
  // ─────────────────────────────────────────────────────────────
  // WEEK 01 — find the number. The hook: "you've never actually been told this."
  // ─────────────────────────────────────────────────────────────
  {
    num: 1,
    phase: 'Foundations',
    title: 'Calories & TDEE',
    hero: { lead: 'Find your number.', emphasis: 'Then we don\u2019t touch it.' },
    lede: "Every confusing food rule you\u2019ve been told is downstream of one number. This week we find yours \u2014 and you keep it. No deficit. No diet. Just observation.",
    hook: {
      icon: '\u201C',
      text: '<strong>You\u2019re not behind.</strong> You weren\u2019t taught this. Nobody was. We start with the one thing every diet you\u2019ve ever tried skipped right past.',
    },
    stats: [
      { l: 'Reading', v: '~20 min' },
      { l: 'To find', v: '1 number' },
      { l: 'Tools', v: 'TDEE calc' },
      { l: 'This week\u2019s win', v: 'You know yours' },
    ],
    brief: {
      doThis: [
        'Run the calculator below. Write the number in your phone notes \u2014 not in an app.',
        'Eat exactly how you\u2019ve been eating this week. Don\u2019t change a thing.',
        'For three days, just notice. What\u2019s your breakfast? When does hunger actually hit?',
        'Read this page slowly. Twice if you need to. There\u2019s no race.',
        'Tell yourself out loud: I\u2019m learning, not restricting.',
      ],
      doNot: [
        'Don\u2019t download a tracking app yet. You\u2019re not ready and you don\u2019t need it.',
        'Don\u2019t start a deficit. Don\u2019t skip dinner. Don\u2019t earn the food.',
        'Don\u2019t compare your number to anyone on TikTok. Theirs is wrong and yours is yours.',
        'Don\u2019t weigh yourself daily. Once at the start of the week is enough.',
        'Don\u2019t skip ahead to Week 2. You\u2019ll only have to come back.',
      ],
    },
    mindMap: {
      center: 'Your TDEE',
      nodes: [
        { label: 'BMR', sub: '60\u201370% \u2022 staying alive', x: '8%', y: '14%', tone: 'sage' },
        { label: 'NEAT', sub: '15\u201330% \u2022 walking', x: '78%', y: '12%', tone: 'wheat' },
        { label: 'Training', sub: '5\u201310% \u2022 3 sessions', x: '78%', y: '70%', tone: 'accent' },
        { label: 'TEF', sub: '~10% \u2022 digesting', x: '8%', y: '70%' },
      ],
      annotations: [
        { text: '\u2190 most of it lives here', x: '20%', y: '32%', rot: -3, color: 'red' },
        { text: 'free wins \u2193', x: '76%', y: '32%', rot: 2, color: 'blue' },
        { text: 'smaller than you think', x: '54%', y: '60%', rot: -2, color: 'red' },
      ],
    },
    library: {
      title: 'What 2,000 kcal actually looks like',
      caption: 'Same energy. Wildly different days. The shape of food matters more than the number.',
      items: [
        { name: 'Restaurant brunch', tag: '1 meal · 2,000 kcal', tone: 'red', desc: 'Avo toast, eggs, hash, latte, half a pastry. Hungry by 11.' },
        { name: 'Home-cooked day', tag: '3 meals · 2,000 kcal', tone: 'sage', desc: 'Oats + eggs, chicken rice bowl, salmon + sweet potato. Full all day.' },
        { name: 'Snacky office day', tag: '8 nibbles · 2,000 kcal', tone: 'wheat', desc: 'Coffee, biscuits, crisps, sandwich, more biscuits, takeaway. Tired.' },
        { name: 'High-protein day', tag: '4 meals · 2,000 kcal', tone: 'sage', desc: 'Greek yog, eggs, chicken salad, steak + veg. 180g protein.' },
        { name: 'Liquid calories', tag: '3 drinks · 2,000 kcal', tone: 'red', desc: 'Frappe, smoothie, two glasses of wine. You\u2019d still want dinner.' },
        { name: 'Volume day', tag: '5 meals · 2,000 kcal', tone: 'cream', desc: 'Huge salads, soups, fruit, lean protein. Couldn\u2019t finish it all.' },
      ],
    },
    lesson: {
      title: 'The number that ends the guessing.',
      paragraphs: [
        "Before we start, I need you to hear something. The reason food has felt confusing your whole life isn\u2019t because you\u2019re bad with food. It\u2019s because <strong>nobody actually told you what your body needs in a day.</strong> Not your mum. Not the magazine you read at 14. Not the personal trainer who said \u201ceat clean.\u201d Nobody.",
        "Today we change that. <em>Permanently.</em>",
        "Your <strong>TDEE</strong> \u2014 total daily energy expenditure \u2014 is the number of calories your body burns in a normal day. All in. Four pieces: <strong>BMR</strong> (the cost of being alive), <strong>NEAT</strong> (everything that isn\u2019t exercise \u2014 walking, fidgeting, standing), <strong>training</strong> (your sessions), and <strong>TEF</strong> (the energy cost of digesting food).",
        "Here\u2019s what surprises people. <strong>Training is the smallest piece.</strong> A hard hour in the gym burns ~250 kcal. A 30-min walk burns 120. The reason fit people stay lean is rarely the gym \u2014 it\u2019s that they move all day. They take the stairs. They stand. That\u2019s NEAT, and it\u2019s most of the difference.",
        "This week, you find your number. <strong>And you do nothing with it.</strong> You eat the way you\u2019ve always eaten and you observe. You can\u2019t run a deficit if you can\u2019t hold maintenance \u2014 you\u2019d just be bouncing off a cliff.",
        "If this feels slow, good. <strong>This is the part you\u2019ve been skipping your whole life.</strong>",
      ],
      kiraNote: "You don\u2019t need to be smaller to be allowed to learn this. The number isn\u2019t a verdict on you. It\u2019s information. That\u2019s all it\u2019s ever been.",
    },
    tool: 'tdee',
    plate: null,
    mealPlan: null,
    quiz: [
      { q: 'Your TDEE is mostly made up of\u2026',
        opts: ['Your training sessions', 'Staying alive (BMR) and daily movement (NEAT)', 'How clean you eat', 'Your metabolism speed'],
        correct: 1,
        why: 'Training is the smallest slice. BMR + NEAT is about 80% of your daily burn.' },
      { q: 'This week, you should\u2026',
        opts: ['Start a 500 kcal deficit', 'Hit your TDEE exactly every day', 'Just find your number and keep eating normally', 'Cut out carbs'],
        correct: 2,
        why: 'You can\u2019t run a deficit if you can\u2019t hold maintenance. Find the number first.' },
      { q: 'If your TDEE feels higher than expected, that probably means\u2026',
        opts: ['The calculator is wrong', 'You\u2019ve been under-eating for years', 'You\u2019re unusually large', 'Nothing useful'],
        correct: 1,
        why: 'Most beginners eat below their TDEE for years and call it normal. This is why nothing has worked.' },
    ],
    reflection: 'What\u2019s your TDEE estimate \u2014 and how does that compare to what you think you\u2019ve been eating?',
  },

  // ─────────────────────────────────────────────────────────────
  // WEEK 02 — protein. The hook: "you're already eating wrong amount and didn't know."
  // ─────────────────────────────────────────────────────────────
  {
    num: 2,
    phase: 'Foundations',
    title: 'Macros',
    hero: { lead: 'Calories are the bag.', emphasis: 'Macros are what\u2019s inside.' },
    lede: "Two people can eat the same calories and look completely different a year later. The difference is what those calories are made of. This week we split your number into three.",
    hook: {
      icon: '\u2728',
      text: '<strong>Most women arrive eating about 60g of protein a day.</strong> They\u2019re shocked when I show them. They aren\u2019t lazy \u2014 nobody told them. We fix it this week.',
    },
    stats: [
      { l: 'Reading', v: '~18 min' },
      { l: 'To set', v: '3 targets' },
      { l: 'Tools', v: 'Macro calc' },
      { l: 'This week\u2019s win', v: 'Protein floor' },
    ],
    brief: {
      doThis: [
        'Run the macro calculator. Lock in protein. Let carbs and fats flex.',
        'Add one protein source to every meal this week \u2014 breakfast too.',
        'Eat the same way as Week 1. Just notice your protein number.',
        'Hit your protein target three days this week. Three is plenty.',
      ],
      doNot: [
        'Don\u2019t cut carbs. We need them for training.',
        'Don\u2019t fear fat. It runs your hormones.',
        'Don\u2019t panic if you only hit protein twice. That\u2019s progress, not failure.',
        'Don\u2019t weigh, measure, or photograph food. Eye it.',
      ],
    },
    mindMap: {
      center: 'Calories',
      nodes: [
        { label: 'Protein', sub: '1.6\u20132.2 g/kg \u2022 floor', x: '8%', y: '14%', tone: 'sage' },
        { label: 'Carbs', sub: 'fuel \u2022 flexible', x: '78%', y: '14%', tone: 'wheat' },
        { label: 'Fats', sub: 'hormones \u2022 flexible', x: '78%', y: '70%', tone: 'wheat' },
        { label: 'Fibre', sub: '25\u201335g \u2022 hidden hero', x: '8%', y: '70%', tone: 'sage' },
      ],
      annotations: [
        { text: 'non-negotiable \u2193', x: '14%', y: '32%', rot: -2, color: 'red' },
        { text: 'these flex around protein', x: '50%', y: '46%', rot: 1, color: 'blue' },
        { text: 'satiety lives here', x: '20%', y: '58%', rot: -3, color: 'red' },
      ],
    },
    library: {
      title: 'What 30g of protein looks like.',
      caption: 'Six ways to hit the same target. Pick the ones that fit your life.',
      items: [
        { name: '1 chicken breast', tag: '120g · 195 kcal', tone: 'sage', desc: 'The classic. Cook six on Sunday and forget about lunch all week.' },
        { name: '170g Greek yog + scoop whey', tag: '~30g · 250 kcal', tone: 'cream', desc: 'Add berries. Done in five minutes.' },
        { name: '4 large eggs', tag: '24g · 280 kcal', tone: 'wheat', desc: 'Two whole + two whites = 30g almost exactly.' },
        { name: '150g tinned tuna', tag: '38g · 165 kcal', tone: 'sage', desc: 'Cheapest serious protein in your supermarket.' },
        { name: '200g cottage cheese', tag: '22g · 180 kcal', tone: 'cream', desc: 'Trust me. Honey + cinnamon. Just try it once.' },
        { name: '180g firm tofu', tag: '28g · 220 kcal', tone: 'sage', desc: 'Press it. Marinate. Pan-fry. The plant secret.' },
      ],
    },
    lesson: {
      title: 'Why protein is the only macro we argue about.',
      paragraphs: [
        "Of the three macros, only one has a hard target. <strong>Protein.</strong> Everything else is preference. That\u2019s the entire lesson \u2014 the rest is how you get there.",
        "Your body uses protein to <strong>repair the muscle</strong> you\u2019re training to build. Below 1.6g per kg of bodyweight, you\u2019re leaving muscle on the floor. Above 2.2g you\u2019re not getting bonus points. The band is narrow and the target is firm.",
        "For a 65kg woman, that\u2019s <strong>104\u2013143g of protein a day</strong>. If you\u2019ve been eating cereal for breakfast, a sandwich for lunch and pasta for dinner \u2014 you\u2019re probably at 50g. We need to roughly triple it. Don\u2019t panic.",
        "<strong>Carbs and fats divide the rest.</strong> The split is mostly preference. High-carb-lower-fat works brilliantly for hard training. Lower-carb-higher-fat works for some people\u2019s appetite. Both are correct. Anyone telling you otherwise is selling something.",
        "There\u2019s a fourth thing I want you to care about. <strong>Fibre.</strong> 25\u201335g a day. It keeps you full, regular, and lowers your cholesterol. Veg, fruit, oats, beans, lentils, wholegrains. <em>Most of you aren\u2019t getting enough.</em>",
      ],
      kiraNote: "If hitting protein feels impossible this week \u2014 it just means the habit isn\u2019t built yet. Week 3 we make it easy. Week 4 it\u2019s automatic. You\u2019re not behind.",
    },
    tool: 'macros',
    plate: {
      title: 'Your plate, split by macro.',
      caption: 'Drag the building blocks to feel the proportions. Aim for the green target.',
    },
    mealPlan: null,
    quiz: [
      { q: 'Which macro has a hard target?',
        opts: ['Carbs', 'Fats', 'Protein', 'Fibre'],
        correct: 2,
        why: 'Protein is the only floor. Carbs and fats flex around it based on preference.' },
      { q: 'A 65kg woman should aim for roughly\u2026',
        opts: ['40\u201360g protein/day', '100\u2013140g protein/day', '200\u2013250g protein/day', 'As much as possible'],
        correct: 1,
        why: '1.6\u20132.2g per kg. For 65kg that\u2019s about 104\u2013143g. More than most beginners realise.' },
      { q: 'If you currently eat 60g protein a day, you should\u2026',
        opts: ['Be ashamed', 'Triple it overnight', 'Add one protein source per meal and ramp up', 'Cut carbs to make room'],
        correct: 2,
        why: 'No shame, no overhaul. One protein source per meal. Ramp up over the week.' },
    ],
    reflection: 'What\u2019s your protein target and which three meals will you build around it this week?',
  },

  // ─────────────────────────────────────────────────────────────
  // WEEK 03 — sourcing. Hook: identity shift "you have a system now"
  // ─────────────────────────────────────────────────────────────
  {
    num: 3,
    phase: 'Sourcing',
    title: 'Protein sourcing',
    hero: { lead: 'Build your five.', emphasis: 'Then never panic in Tesco again.' },
    lede: "You have a number. You know the target. Now you build the toolkit \u2014 five protein sources you actually like, that you actually buy. This is when the programme stops feeling like homework.",
    hook: {
      icon: '\u2731',
      text: 'Consistency doesn\u2019t fail on willpower. It fails on <strong>decisions.</strong> The fewer you make in a supermarket, the more you win. We\u2019re making your next shop take eleven minutes.',
    },
    stats: [
      { l: 'Reading', v: '~22 min' },
      { l: 'To pick', v: '5 sources' },
      { l: 'Tools', v: 'Compare grid' },
      { l: 'This week\u2019s win', v: 'A real list' },
    ],
    brief: {
      doThis: [
        'Pick five protein sources you actually enjoy. Five.',
        'Write a real shopping list this week using only those five.',
        'Try one thing you\u2019ve never bought \u2014 cottage cheese, tofu, tinned mackerel. Anything.',
        'Cook the cheapest source twice this week. Pride is overrated.',
      ],
      doNot: [
        'Don\u2019t pick chicken five times. Variety matters.',
        'Don\u2019t buy a fridge full of food you don\u2019t enjoy.',
        'Don\u2019t spend £30 on protein powder. Real food first.',
        'Don\u2019t dismiss plant proteins. They count.',
      ],
    },
    mindMap: {
      center: 'Your five',
      nodes: [
        { label: 'Animal', sub: 'chicken, beef, fish', x: '8%', y: '12%', tone: 'sage' },
        { label: 'Dairy', sub: 'yog, cottage, milk', x: '78%', y: '12%', tone: 'wheat' },
        { label: 'Egg', sub: 'cheapest complete', x: '78%', y: '70%', tone: 'wheat' },
        { label: 'Plant', sub: 'tofu, tempeh, beans', x: '8%', y: '70%', tone: 'sage' },
        { label: 'Tinned', sub: 'tuna, mackerel, sardines', x: '44%', y: '4%', tone: 'accent' },
      ],
      annotations: [
        { text: '\u2193 pick one from each', x: '40%', y: '22%', rot: -2, color: 'red' },
        { text: 'cheapest £', x: '60%', y: '60%', rot: 3, color: 'blue' },
        { text: 'rotate weekly', x: '20%', y: '48%', rot: -3, color: 'red' },
      ],
    },
    library: {
      title: 'Protein, ranked by cost per 30g.',
      caption: 'Eight options across animal, plant and tinned. Build your shopping list from here.',
      items: [
        { name: 'Eggs (large)', tag: '£0.20 / 30g', tone: 'wheat', desc: 'Cheapest complete protein in the UK. Period.' },
        { name: 'Tinned tuna', tag: '£0.55 / 30g', tone: 'sage', desc: 'Two-minute meal. Stack the cupboard.' },
        { name: 'Greek yogurt 0%', tag: '£0.65 / 30g', tone: 'cream', desc: 'Sweet or savoury. The breakfast cheat.' },
        { name: 'Chicken thigh', tag: '£0.70 / 30g', tone: 'sage', desc: 'Cheaper than breast. Tastes better.' },
        { name: 'Cottage cheese', tag: '£0.75 / 30g', tone: 'cream', desc: 'Stop being scared of it. Honey + pepper.' },
        { name: 'Firm tofu', tag: '£0.80 / 30g', tone: 'sage', desc: 'Press it. Marinate. Pan-fry hard.' },
        { name: 'Tinned mackerel', tag: '£0.90 / 30g', tone: 'sage', desc: 'Smoky, oily, brilliant on toast.' },
        { name: 'Lean beef mince', tag: '£0.95 / 30g', tone: 'red', desc: 'Sunday bolognese feeds three meals.' },
      ],
    },
    lesson: {
      title: 'Variety is the only nutrition rule I\u2019ll ever push.',
      paragraphs: [
        "I don\u2019t care if you eat meat. I don\u2019t care if you don\u2019t. <strong>I care that you have a system.</strong> Here\u2019s the system.",
        "Pick <strong>five protein sources you actually enjoy</strong>. One from each group: animal, dairy, egg, plant, tinned. Five total. Those become your weekly rotation. You will buy these. You will eat these. Nothing else needs decisions.",
        "<strong>Complete vs incomplete proteins.</strong> Animal sources have all nine essential amino acids in one go. Most plant sources are short one or two. The fix isn\u2019t to avoid plants \u2014 it\u2019s to <em>mix them.</em> Beans + rice. Lentils + bread. You\u2019re fine.",
        "<strong>Cost.</strong> Eggs are the cheapest complete protein in the UK by a mile. Tinned tuna is second. Chicken thigh is cheaper than breast and juicier. Most influencer protein is in the most expensive tier \u2014 they\u2019re selling something.",
        "<strong>The mistake everyone makes:</strong> buying foods you don\u2019t enjoy because they\u2019re \u201chealthy.\u201d You won\u2019t eat them. They\u2019ll rot. You\u2019ll order Deliveroo. Pick foods you <em>want</em> to eat. That\u2019s the system.",
      ],
      kiraNote: "Your shopping list this week is the first piece of real, transferable knowledge you\u2019ve built. It\u2019ll work next month. Next year. You\u2019ll still be using it after this course is finished. That\u2019s the goal.",
    },
    tool: 'protein-compare',
    plate: null,
    mealPlan: {
      title: 'Three-day rotation, built from your five.',
      days: [
        { d: 'Mon', l: 'Lean day', rows: [
          ['B: Greek yog + berries + honey', '32g'],
          ['L: Chicken thigh + rice + veg', '42g'],
          ['D: Tofu stir-fry + noodles', '30g'],
        ]},
        { d: 'Tue', l: 'Cheap day', rows: [
          ['B: 3 eggs + toast', '24g'],
          ['L: Tuna jacket potato + salad', '38g'],
          ['D: Egg fried rice + edamame', '28g'],
        ]},
        { d: 'Wed', l: 'Quick day', rows: [
          ['B: Cottage cheese on rye + tomato', '22g'],
          ['L: Mackerel + crackers + apple', '24g'],
          ['D: Chicken thigh + sweet potato', '40g'],
        ]},
      ],
    },
    quiz: [
      { q: 'How many protein sources should you build a weekly rotation from?',
        opts: ['One \u2014 the cheapest', 'Three or four max', 'Five \u2014 one from each food group', 'As many as possible'],
        correct: 2,
        why: 'Five is the magic number. Enough variety for the amino-acid spread; few enough decisions to actually shop.' },
      { q: 'The cheapest complete protein in a UK supermarket is\u2026',
        opts: ['Whey protein powder', 'Chicken breast', 'Eggs', 'Greek yogurt'],
        correct: 2,
        why: 'Eggs win by a long way. Stack them.' },
      { q: 'Plant proteins are \u201cincomplete\u201d \u2014 what does that mean for you?',
        opts: ['They don\u2019t count', 'You need to mix them (beans + rice, etc.) to cover all amino acids', 'You need supplements', 'Avoid them'],
        correct: 1,
        why: 'Mixing two plant sources in a day covers the spread. Beans + grains is the classic combo for a reason.' },
    ],
    reflection: 'List your five. Write them now. Then write what you\u2019ll buy this weekend.',
  },

  // ─────────────────────────────────────────────────────────────
  // WEEK 04 — timing
  // ─────────────────────────────────────────────────────────────
  {
    num: 4,
    phase: 'Sourcing',
    title: 'Meal timing & training nutrition',
    hero: { lead: 'Pre. Intra. Post.', emphasis: 'What actually matters.' },
    lede: "There\u2019s an entire industry built on telling you the exact right thing to eat 17 minutes before a workout. Most of it doesn\u2019t matter. Some of it does. Here\u2019s what\u2019s worth caring about.",
    hook: {
      icon: '\u00b7',
      text: 'You\u2019re a month in. The hook of \u201cnovel\u201d is wearing off and we\u2019re building <strong>boring competence.</strong> Boring competence is what people who actually keep their results have. Stay with me.',
    },
    stats: [
      { l: 'Reading', v: '~16 min' },
      { l: 'Rules', v: '3' },
      { l: 'Tools', v: 'Timing planner' },
      { l: 'This week\u2019s win', v: 'Better sessions' },
    ],
    brief: {
      doThis: [
        'Spread protein across 3\u20134 meals. Not all at dinner.',
        'Eat a real meal 1\u20132 hours before training. Carbs + protein.',
        'Drink water during sessions. That\u2019s it.',
        'Eat within a few hours of training. The window is wider than they told you.',
      ],
      doNot: [
        'Don\u2019t buy intra-workout drinks unless you train over 90 minutes.',
        'Don\u2019t fast before strength sessions \u2014 your lifts will tank.',
        'Don\u2019t panic about \u201canabolic windows.\u201d It\u2019s a 4\u20136 hour window, not 30 minutes.',
        'Don\u2019t skip pre-workout protein. It matters more than post.',
      ],
    },
    mindMap: {
      center: 'Around training',
      nodes: [
        { label: '1\u20132h before', sub: 'carbs + protein', x: '8%', y: '14%', tone: 'sage' },
        { label: 'During', sub: 'water', x: '78%', y: '14%' },
        { label: '0\u20133h after', sub: 'protein + carbs', x: '78%', y: '70%', tone: 'sage' },
        { label: 'Daily total', sub: 'still 95%', x: '8%', y: '70%', tone: 'accent' },
      ],
      annotations: [
        { text: 'this is the big one', x: '14%', y: '54%', rot: -2, color: 'red' },
        { text: 'wider than you\u2019ve been told \u2193', x: '50%', y: '46%', rot: 1, color: 'blue' },
      ],
    },
    library: {
      title: 'Pre-training meal ideas.',
      caption: 'Carbs + protein, 1\u20132 hours before lifting. Simple is the rule.',
      items: [
        { name: 'Oats + whey + banana', tag: '~450 kcal · 30g protein', tone: 'cream', desc: 'The classic for a reason. 90 seconds.' },
        { name: 'Toast + eggs + honey', tag: '~480 kcal · 25g protein', tone: 'wheat', desc: 'Two slices, two whole eggs, drizzle.' },
        { name: 'Rice cakes + Greek yog', tag: '~380 kcal · 22g protein', tone: 'cream', desc: 'For when you only have 45 mins.' },
        { name: 'Bagel + turkey + cream cheese', tag: '~520 kcal · 30g protein', tone: 'sage', desc: 'Pre-leg-day fuel. Eat the whole thing.' },
        { name: 'Banana + 30g whey', tag: '~250 kcal · 25g protein', tone: 'cream', desc: 'Train in 30 mins? This works fine.' },
        { name: 'Salt bagel + 2 boiled eggs', tag: '~430 kcal · 24g protein', tone: 'wheat', desc: 'Tradesman\u2019s breakfast. Underrated.' },
      ],
    },
    lesson: {
      title: 'The boring truth about timing.',
      paragraphs: [
        "Total daily protein and total daily calories are <strong>95% of the result.</strong> Timing is the last 5%. That said, the 5% is worth getting right because it\u2019s essentially free.",
        "<strong>Spreading protein across 3\u20134 meals beats hammering it all at dinner.</strong> Your body can only use about 0.4g per kg in one sitting for muscle building. Eat 100g at 8pm and most of it becomes expensive fuel rather than building blocks.",
        "<strong>Pre-workout (1\u20132 hours before).</strong> Carbs + a hit of protein. Your sessions will be measurably better. Empty stomach training is fine for cardio, awful for lifting.",
        "<strong>Intra-workout?</strong> Water. Unless you\u2019re training over 90 minutes (you\u2019re not), nothing else is required. The industry sells intra-workout drinks because they\u2019re profitable, not because they work.",
        "<strong>Post-workout.</strong> The \u201c30-minute anabolic window\u201d is a marketing invention. The real window is 4\u20136 hours. Eat your next normal meal. You\u2019re fine.",
      ],
      kiraNote: "If you take nothing else: <em>pre-workout food matters more than post.</em> Most beginners get this backwards. Show up fed and the rest sorts itself.",
    },
    tool: 'macros',
    plate: null,
    mealPlan: {
      title: 'A training day, hour by hour.',
      days: [
        { d: '7am', l: 'Wake', rows: [
          ['Greek yog + berries + 30g granola', '25g'],
          ['Black coffee', '0g'],
        ]},
        { d: '12pm', l: 'Lunch', rows: [
          ['Chicken rice bowl + veg + tahini', '40g'],
          ['Apple', '0g'],
        ]},
        { d: '4pm', l: '90 min pre-lift', rows: [
          ['Banana + small whey shake', '25g'],
          ['Water', '—'],
        ]},
        { d: '5:30pm', l: 'Lift', rows: [
          ['Water only', '0g'],
        ]},
        { d: '7pm', l: 'Dinner', rows: [
          ['Salmon + sweet potato + greens', '38g'],
          ['Greek yog + honey', '15g'],
        ]},
      ],
    },
    quiz: [
      { q: 'How much of your result is total daily protein vs. timing?',
        opts: ['50/50', '70% total / 30% timing', '95% total / 5% timing', 'Timing is everything'],
        correct: 2,
        why: 'Total daily protein and calories drive 95% of the outcome. Timing helps but it\u2019s never going to save a bad diet.' },
      { q: 'You should eat\u2026',
        opts: ['Nothing before lifting (fasted is best)', 'Carbs + protein 1\u20132 hours before', 'Just a coffee', 'A big meal 20 minutes before'],
        correct: 1,
        why: 'Pre-workout fuel makes your sessions measurably better. 1\u20132 hours before is the sweet spot.' },
      { q: 'The \u201canabolic window\u201d after training is\u2026',
        opts: ['15 minutes', '30 minutes', '4\u20136 hours \u2014 eat your next normal meal', 'There is no window'],
        correct: 2,
        why: '4\u20136 hours. The 30-minute panic is a marketing invention from supplement brands.' },
    ],
    reflection: 'When does your hardest training session land in your week \u2014 and what will you eat 90 minutes before it?',
  },

  // ─────────────────────────────────────────────────────────────
  // WEEK 05 — meal prep
  // ─────────────────────────────────────────────────────────────
  {
    num: 5,
    phase: 'Systems',
    title: 'Meal prep & budget eating',
    hero: { lead: 'The Sunday system.', emphasis: 'No faff. No bento boxes.' },
    lede: "If you have to think about what to eat every day, you\u2019ll fail. Meal prep isn\u2019t aesthetic Tupperware \u2014 it\u2019s about removing decisions. Here\u2019s the system.",
    hook: {
      icon: '\u25c6',
      text: 'This week is the one where you stop being a person who \u201ctries to eat well\u201d and become a person who <strong>has a system.</strong> The difference is enormous. Eight weeks from now you won\u2019t go back.',
    },
    stats: [
      { l: 'Reading', v: '~15 min' },
      { l: 'To prep', v: '4 components' },
      { l: 'Time cost', v: '~90 min/wk' },
      { l: 'Food cost', v: '~£25/wk' },
    ],
    brief: {
      doThis: [
        'Pick one prep day. Sunday for most people. Stick to it.',
        'Prep four things: a protein, a carb, a veg, a sauce.',
        'Cook in components, not finished meals. Assemble daily in 90 seconds.',
        'Stock a frozen and tinned backup shelf. Future you will say thank you.',
      ],
      doNot: [
        'Don\u2019t prep seven identical meals. You\u2019ll hate it by Wednesday.',
        'Don\u2019t spend more than 90 minutes on prep day. Set a timer.',
        'Don\u2019t buy fancy containers. Old takeaway tubs are fine.',
        'Don\u2019t prep salad leaves on Sunday for Friday. They\u2019ll die.',
      ],
    },
    mindMap: {
      center: 'Sunday prep',
      nodes: [
        { label: 'Protein', sub: 'one big batch', x: '8%', y: '14%', tone: 'sage' },
        { label: 'Carb', sub: 'rice or potatoes', x: '78%', y: '14%', tone: 'wheat' },
        { label: 'Veg', sub: 'roasted tray', x: '78%', y: '70%', tone: 'sage' },
        { label: 'Sauce', sub: 'changes everything', x: '8%', y: '70%', tone: 'accent' },
      ],
      annotations: [
        { text: 'four things \u2191', x: '40%', y: '30%', rot: -2, color: 'red' },
        { text: 'the secret weapon', x: '20%', y: '54%', rot: 3, color: 'blue' },
      ],
    },
    library: {
      title: 'Four components. Five sauces. Twenty meals.',
      caption: 'Cook the components on Sunday. Combine them all week. Add a different sauce each day.',
      items: [
        { name: '12 chicken thighs, roasted', tag: 'Protein', tone: 'sage', desc: 'Salt, paprika, oven 200°. 25 min. Feeds you 4 days.' },
        { name: 'Big tray of roasted veg', tag: 'Veg', tone: 'sage', desc: 'Sweet potato, broccoli, peppers. One tray, one oven.' },
        { name: 'Rice cooker / oven rice', tag: 'Carb', tone: 'wheat', desc: 'Make 1kg dry. Lasts five days in the fridge.' },
        { name: 'Tahini lemon sauce', tag: 'Sauce', tone: 'cream', desc: 'Tahini, lemon, garlic, water. Three minutes.' },
        { name: 'Hot honey yog sauce', tag: 'Sauce', tone: 'cream', desc: 'Yog + chilli + honey. Makes anything Korean.' },
        { name: 'Green chimichurri', tag: 'Sauce', tone: 'sage', desc: 'Parsley, garlic, oil, vinegar. Argentinian magic.' },
      ],
    },
    lesson: {
      title: 'Stop prepping meals. Start prepping components.',
      paragraphs: [
        "Here\u2019s where everyone fails. They prep seven identical chicken-and-rice tubs on Sunday and by Wednesday they\u2019ve ordered Deliveroo because they can\u2019t face another beige tub.",
        "<strong>The fix is to prep components, not meals.</strong> Cook a protein. Cook a carb. Roast a tray of veg. Make a sauce. Then each day you assemble \u2014 same components, different sauce, sometimes added to a wrap, sometimes a salad, sometimes a bowl. <em>Same food, twenty meals.</em>",
        "<strong>The four-component framework:</strong> protein, carb, veg, sauce. The sauce is the unsung hero. A tahini-lemon dressing turns chicken rice into Middle Eastern. A hot honey yog turns it Korean. Chimichurri turns it Argentinian. Same food, new meal.",
        "<strong>Budget.</strong> Cheap staples: eggs, oats, rice, frozen veg, tinned tuna, chicken thighs (cheaper than breast), Greek yog, lentils. £25 a week feeds you well if you cook from these. £50 a week is luxury.",
        "<strong>The freezer is your friend.</strong> Cook double. Freeze half. On the week when life happens, you have three meals waiting.",
      ],
      kiraNote: "Meal prep isn\u2019t a personality trait. It\u2019s a system. The people you see on Instagram with the colour-coded tubs aren\u2019t the people who keep their results \u2014 the people who keep results have boring beige tubs and a sauce drawer. Be one of them.",
    },
    tool: 'meal-prep',
    plate: null,
    mealPlan: {
      title: 'Sunday prep → four days of meals.',
      days: [
        { d: 'Mon', l: 'From the prep', rows: [
          ['Lunch: chicken + rice + tahini', '40g'],
          ['Dinner: chicken + roasted veg + chimichurri', '42g'],
        ]},
        { d: 'Tue', l: 'Same components, new sauce', rows: [
          ['Lunch: chicken wrap + hot honey yog', '38g'],
          ['Dinner: rice bowl + leftover veg + soy egg', '35g'],
        ]},
        { d: 'Wed', l: 'Mix it up', rows: [
          ['Lunch: chicken salad + tahini', '36g'],
          ['Dinner: noodles + roasted veg + chilli oil', '28g'],
        ]},
      ],
    },
    quiz: [
      { q: 'The right way to meal prep is\u2026',
        opts: ['Prep 7 identical meals on Sunday', 'Prep components: protein, carb, veg, sauce', 'Cook fresh every day', 'Order meal-prep delivery'],
        correct: 1,
        why: 'Components beat finished meals every time. Same food, new sauce, twenty different meals.' },
      { q: 'A good UK food budget for one person is roughly\u2026',
        opts: ['£12 a week', '£25 a week', '£60 a week', '£100 a week'],
        correct: 1,
        why: '£25 feeds you well on cheap staples. £50 is luxury. £12 is too tight unless you\u2019re very disciplined.' },
      { q: 'On prep day you should spend\u2026',
        opts: ['At least 3 hours', '~90 minutes \u2014 set a timer', 'All afternoon', 'As long as it takes to look perfect'],
        correct: 1,
        why: '90 minutes is the sweet spot. Longer and you start to resent it.' },
    ],
    reflection: 'Which day this week is your prep day, and what are the four components you\u2019ll cook?',
  },

  // ─────────────────────────────────────────────────────────────
  // WEEK 06 — fat loss
  // ─────────────────────────────────────────────────────────────
  {
    num: 6,
    phase: 'Systems',
    title: 'Fat loss without wrecking training',
    hero: { lead: 'Run a deficit.', emphasis: 'Keep your muscle.' },
    lede: "Fat loss is calories in vs calories out. The trick isn\u2019t finding a magic protocol \u2014 it\u2019s running a deficit small enough that you don\u2019t lose the muscle you\u2019ve spent the last five weeks earning.",
    hook: {
      icon: '\u2013',
      text: 'You\u2019re past the halfway mark. This is the week you learn the thing every diet you\u2019ve ever done got wrong: <strong>cut too hard, lose muscle, regain everything plus more.</strong> We won\u2019t do that.',
    },
    stats: [
      { l: 'Reading', v: '~20 min' },
      { l: 'Deficit', v: '−15 to −20%' },
      { l: 'Tools', v: 'Deficit calc' },
      { l: 'Target loss', v: '0.5\u20131%/wk' },
    ],
    brief: {
      doThis: [
        'Take your maintenance and subtract 15\u201320%. That\u2019s your number.',
        'Push protein UP. 2.2g/kg minimum during a cut.',
        'Add 1,500 daily steps. NEAT is most of the energy expenditure.',
        'Weigh-in once a week, same day, same time, fasted. Average over a month.',
      ],
      doNot: [
        'Don\u2019t cut by more than 20%. You\u2019ll lose muscle and hair.',
        'Don\u2019t cut protein. It\u2019s the last thing to lower.',
        'Don\u2019t add extra cardio sessions on top. Walk more instead.',
        'Don\u2019t weigh daily. The fluctuations will wreck your mood.',
      ],
    },
    mindMap: {
      center: 'Sustainable cut',
      nodes: [
        { label: '−15 to −20%', sub: 'modest deficit', x: '8%', y: '14%', tone: 'accent' },
        { label: 'Protein UP', sub: '2.2 g/kg+', x: '78%', y: '14%', tone: 'sage' },
        { label: 'NEAT walking', sub: '+1,500 steps', x: '78%', y: '70%', tone: 'sage' },
        { label: 'Train heavy', sub: 'same weights', x: '8%', y: '70%', tone: 'wheat' },
      ],
      annotations: [
        { text: 'slow is the answer', x: '36%', y: '36%', rot: -2, color: 'red' },
        { text: 'cardio not required', x: '54%', y: '54%', rot: 1, color: 'blue' },
      ],
    },
    library: {
      title: 'High-volume foods to feel full in a deficit.',
      caption: 'Same protein, more chewing, less hunger. Stack these.',
      items: [
        { name: 'Cucumber & cabbage', tag: '~15 kcal / 100g', tone: 'sage', desc: 'Fill the plate. Lots of chew, almost no calories.' },
        { name: 'Berries (frozen)', tag: '~50 kcal / 100g', tone: 'red', desc: 'Cheap when frozen. Mix into yog or oats.' },
        { name: 'Greek yog 0%', tag: '~60 kcal / 100g', tone: 'cream', desc: 'High protein, low cal. The cut staple.' },
        { name: 'Egg whites + 1 yolk', tag: '~100 kcal / serve', tone: 'wheat', desc: 'Mostly protein, very little fat.' },
        { name: 'White fish', tag: '~85 kcal / 100g', tone: 'sage', desc: 'Cod, haddock, pollock. Lots of protein.' },
        { name: 'Popcorn (air-popped)', tag: '~30 kcal / 8g serve', tone: 'wheat', desc: 'When you need to chew for an hour.' },
      ],
    },
    lesson: {
      title: 'Slow is the answer. Always slow.',
      paragraphs: [
        "Take your maintenance calories and subtract 15\u201320%. That\u2019s your cut number. A 70kg woman might go from 2,200 to 1,850. <strong>Not 1,200.</strong> Crash deficits cost you muscle, sleep, hair, period, mood, and adherence.",
        "<strong>Push protein up, not down.</strong> 2.2g per kg minimum during a cut. The lower your calories, the more important the protein. It\u2019s what keeps the muscle on while the fat comes off.",
        "<strong>Walk more.</strong> Not cardio sessions \u2014 walks. NEAT is where 80% of the energy expenditure variation lives. 1,500 extra steps a day is roughly 100 kcal, and over a month that\u2019s 3,000 kcal of fat without ever feeling hungry.",
        "<strong>Train heavy.</strong> A cut isn\u2019t a time to swap to high-rep \u201ctoning\u201d work. Your job is to keep lifting the same weights you lifted at maintenance. That\u2019s the signal your body needs to keep the muscle.",
        "<strong>Track the right way.</strong> Weigh in once a week, same morning, fasted. Take the four-week average. Daily weighing will wreck your week \u2014 hormonal fluctuations alone can swing the scale 2kg.",
      ],
      kiraNote: "Most diets fail not because of willpower, but because they were too aggressive to live with. A small deficit you stay on for 16 weeks beats a huge one you abandon at week 3. Always.",
    },
    tool: 'deficit',
    plate: null,
    mealPlan: null,
    quiz: [
      { q: 'A sustainable deficit is\u2026',
        opts: ['−500 kcal from any number', '−15 to −20% of maintenance', 'As aggressive as possible', '1,200 kcal a day'],
        correct: 1,
        why: '15\u201320% off maintenance. Aggressive deficits cost muscle, sleep and adherence.' },
      { q: 'During a cut, your protein should\u2026',
        opts: ['Go down with calories', 'Stay the same', 'Go up to 2.2g/kg+', 'Doesn\u2019t matter'],
        correct: 2,
        why: 'Push protein UP in a cut. It\u2019s what keeps the muscle while you lose fat.' },
      { q: 'The most effective form of cardio for fat loss is\u2026',
        opts: ['Daily HIIT', 'Long steady runs', 'Walking more (NEAT)', 'Spin classes'],
        correct: 2,
        why: 'NEAT \u2014 unstructured daily movement \u2014 dwarfs deliberate cardio for most people. Walk more.' },
    ],
    reflection: 'If you cut next month: what\u2019s your maintenance, what\u2019s your deficit number, and what\u2019s your weekly step target?',
  },

  // ─────────────────────────────────────────────────────────────
  // WEEK 07 — build muscle
  // ─────────────────────────────────────────────────────────────
  {
    num: 7,
    phase: 'Independence',
    title: 'Building & maintaining muscle',
    hero: { lead: 'A surplus.', emphasis: 'A small one.' },
    lede: "Building muscle requires the opposite of fat loss \u2014 more calories than you burn. It\u2019s slow, it\u2019s boring, and the slow-and-boring version works far better than the bulk-then-cut nonsense most influencers sell.",
    hook: {
      icon: '\u002b',
      text: 'Seven weeks in. You\u2019re not the person who started this. <strong>What you know now most people will never learn.</strong> This week we cover the other direction \u2014 building, not cutting.',
    },
    stats: [
      { l: 'Reading', v: '~18 min' },
      { l: 'Surplus', v: '+10 to +15%' },
      { l: 'Tools', v: 'Surplus calc' },
      { l: 'Target gain', v: '0.25\u20130.5kg/mo' },
    ],
    brief: {
      doThis: [
        'Add 10\u201315% to maintenance. That\u2019s your build number.',
        'Aim for 0.25\u20130.5kg gain per month. Slower is better.',
        'Keep training hard. The surplus exists to fuel the work.',
        'Add carbs preferentially \u2014 they fuel performance.',
      ],
      doNot: [
        'Don\u2019t \u201cdirty bulk.\u201d You\u2019ll add fat that takes 4 months to cut.',
        'Don\u2019t chase scale jumps. 0.5kg/month is the real number.',
        'Don\u2019t skip cardio entirely. Two short sessions a week is plenty.',
        'Don\u2019t try to bulk and cut in the same month. Pick one direction.',
      ],
    },
    mindMap: {
      center: 'Lean build',
      nodes: [
        { label: '+10 to 15%', sub: 'modest surplus', x: '8%', y: '14%', tone: 'accent' },
        { label: 'Train heavy', sub: 'progressive overload', x: '78%', y: '14%', tone: 'sage' },
        { label: 'Carbs ↑', sub: 'fuel sessions', x: '78%', y: '70%', tone: 'wheat' },
        { label: 'Sleep 7\u20139h', sub: 'where it happens', x: '8%', y: '70%', tone: 'sage' },
      ],
      annotations: [
        { text: 'lean gain > dirty bulk', x: '34%', y: '36%', rot: -2, color: 'red' },
        { text: '\u2191 the secret', x: '12%', y: '54%', rot: 3, color: 'blue' },
      ],
    },
    library: {
      title: 'Calorie-dense foods for a clean build.',
      caption: 'Adding calories cleanly. Each of these adds 200\u2013400 kcal without a feast.',
      items: [
        { name: 'Olive oil drizzle', tag: '+200 kcal / tbsp', tone: 'wheat', desc: 'On everything. Pasta, rice, salad. Easiest 200.' },
        { name: 'Peanut butter', tag: '+190 kcal / 2 tbsp', tone: 'wheat', desc: 'In oats, on toast, off a spoon. Calorie-dense gold.' },
        { name: 'Whole milk', tag: '+150 kcal / 250ml', tone: 'cream', desc: 'In coffee, oats, smoothies. Old-school bulk fuel.' },
        { name: 'Mixed nuts', tag: '~180 kcal / 30g', tone: 'wheat', desc: 'A small handful. Easy snack add.' },
        { name: 'Dried fruit', tag: '~150 kcal / 40g', tone: 'red', desc: 'Pre-workout carb shot. Dates, raisins, figs.' },
        { name: 'Cheese', tag: '+120 kcal / 30g', tone: 'cream', desc: 'On salads, eggs, sandwiches. Not the enemy.' },
      ],
    },
    lesson: {
      title: 'Lean gain beats dirty bulk every time.',
      paragraphs: [
        "Add <strong>10\u201315%</strong> to your maintenance calories. For our 70kg friend, that\u2019s 2,200 → 2,400. Aim for <strong>0.25\u20130.5kg of weight gain per month.</strong> Faster than that and most of what you\u2019re adding is fat.",
        "I know that feels insultingly slow. <strong>It is the right speed.</strong> Muscle takes 9\u201312 months to build a meaningful amount. The faster you try to do it, the more fat you add, the longer your cut takes after, and the more you spend the year between phases.",
        "<strong>Recomp</strong> \u2014 building muscle while losing fat \u2014 is real, but slow, and only works well if you\u2019re new to training or returning after a break. Most experienced lifters have to pick a direction and commit for 4\u20136 months.",
        "<strong>Add carbs preferentially.</strong> Your surplus calories should be mostly carbs because carbs fuel training. Add an extra scoop of rice. A second piece of toast. A banana in the post-workout shake. The carbs fuel harder lifts, the harder lifts build muscle, the muscle builds the shape you want.",
        "<strong>Don\u2019t forget sleep.</strong> Muscle is built during recovery, not during training. 7\u20139 hours is non-negotiable in a build. If you\u2019re sleeping six hours and stressing about gains, fix the sleep first.",
      ],
      kiraNote: "Building is harder psychologically than cutting because the scale goes up and your brain panics. <em>You will look softer for a few weeks.</em> Then the muscle catches up and everything changes. Trust it.",
    },
    tool: 'surplus',
    plate: null,
    mealPlan: null,
    quiz: [
      { q: 'A clean build surplus is roughly\u2026',
        opts: ['+5% above maintenance', '+10 to +15% above maintenance', '+25% above maintenance', 'As much as you can eat'],
        correct: 1,
        why: '10\u201315% gives you 0.25\u20130.5kg/month \u2014 fast enough to be muscle, slow enough to stay lean.' },
      { q: 'Most of your surplus calories should come from\u2026',
        opts: ['Extra protein', 'Extra carbs', 'Extra fats', 'Doesn\u2019t matter'],
        correct: 1,
        why: 'Protein is already high. Add carbs \u2014 they fuel the training that builds the muscle.' },
      { q: 'A realistic monthly muscle-gain target is\u2026',
        opts: ['0.25\u20130.5kg', '1kg', '2\u20133kg', '5kg'],
        correct: 0,
        why: 'Slow is real muscle. Fast is mostly fat. You can\u2019t cheat biology.' },
    ],
    reflection: 'Are you in a build, cut, or maintain phase? Pick one. Write it down. Commit for 12 weeks.',
  },

  // ─────────────────────────────────────────────────────────────
  // WEEK 08 — build your own
  // ─────────────────────────────────────────────────────────────
  {
    num: 8,
    phase: 'Independence',
    title: 'Build your own blueprint',
    hero: { lead: 'Your plan.', emphasis: 'Written down. Yours.' },
    lede: "This is the week we promised you in Week 1. Take everything you\u2019ve learned and turn it into your own nutrition approach \u2014 a one-page plan you can run for a year without buying another course.",
    hook: {
      icon: '\u2733',
      text: 'You\u2019ve done it. <strong>You\u2019re not a beginner any more.</strong> The plan you write this week is yours. It\u2019ll work next year. It\u2019ll work after children. It\u2019ll work after holidays. That\u2019s the whole point.',
    },
    stats: [
      { l: 'Reading', v: '~12 min' },
      { l: 'Output', v: '1-page plan' },
      { l: 'Tools', v: 'Plan builder' },
      { l: 'Lifespan', v: 'Forever' },
    ],
    brief: {
      doThis: [
        'Open the plan builder. Fill it in. Print it. Pin it.',
        'Pick your phase: cut, build, or maintain. Commit for 12 weeks.',
        'Write your TDEE, target macros, three protein staples, and prep day.',
        'Re-read your Week 1 reflection. Notice how far you\u2019ve come.',
      ],
      doNot: [
        'Don\u2019t skip the plan because you \u201cknow it.\u201d Write it down. The writing matters.',
        'Don\u2019t share it on Instagram. Just live it.',
        'Don\u2019t go back to the diet you did before. You know more now.',
        'Don\u2019t stop. Re-read this every 12 weeks.',
      ],
    },
    mindMap: {
      center: 'Your plan',
      nodes: [
        { label: 'Phase', sub: 'cut / build / maintain', x: '8%', y: '14%', tone: 'accent' },
        { label: 'Number', sub: 'your TDEE ± 15%', x: '78%', y: '14%', tone: 'sage' },
        { label: 'Macros', sub: 'protein floor + split', x: '78%', y: '70%', tone: 'wheat' },
        { label: 'System', sub: 'five staples + prep day', x: '8%', y: '70%', tone: 'sage' },
      ],
      annotations: [
        { text: 'this is enough', x: '40%', y: '36%', rot: -2, color: 'red' },
        { text: 'forever \u2193', x: '76%', y: '38%', rot: 2, color: 'blue' },
      ],
    },
    library: {
      title: 'Your one-page blueprint, filled in.',
      caption: 'A sample of what the plan builder produces. Yours will be different.',
      items: [
        { name: 'Phase', tag: '12 weeks · CUT', tone: 'accent', desc: '−15% deficit. Re-evaluate at week 12.' },
        { name: 'Calories', tag: '1,850 kcal', tone: 'sage', desc: 'Down from 2,200 maintenance.' },
        { name: 'Protein', tag: '155g (2.2 g/kg)', tone: 'sage', desc: 'Pushed up for the cut.' },
        { name: 'Five staples', tag: 'Eggs · Tuna · Chicken thigh · Yog · Tofu', tone: 'wheat', desc: 'Rotate weekly. Shopping list lives here.' },
        { name: 'Prep day', tag: 'Sunday · 90 min', tone: 'cream', desc: 'Protein, carb, veg, sauce. Four components.' },
        { name: 'Re-check', tag: 'Week 12', tone: 'red', desc: 'Pick the next phase based on the data.' },
      ],
    },
    lesson: {
      title: 'The plan, on one page.',
      paragraphs: [
        "Open the builder below. It walks you through six fields: phase, calories, macros, your five staples, your prep day, and your re-check date. By the time you finish, you have a one-page document. <em>Your one-page document.</em>",
        "<strong>Phase first.</strong> Pick one of cut, build, or maintain. Commit to it for 12 weeks. The single biggest mistake people make is changing phase every three weeks because the scale didn\u2019t move fast enough. <em>Pick a direction and walk it.</em>",
        "<strong>Then calories.</strong> Maintenance from Week 1. Minus 15% if cutting. Plus 10\u201315% if building. Done.",
        "<strong>Then macros.</strong> Protein non-negotiable from Week 2. Carbs and fats divide the rest however you prefer.",
        "<strong>Then your system.</strong> Five staples from Week 3. Prep day from Week 5. That\u2019s the operational stuff.",
        "<strong>Then a re-check date.</strong> Twelve weeks from today. Calendar it. When you arrive, you re-read this page, you look at the data, you pick the next phase. <strong>That\u2019s the whole programme. Forever.</strong>",
      ],
      kiraNote: "I want you to do one more thing. Go back to the Week 1 reflection box and read what you wrote. Read it slowly. That person was scared. You\u2019re not that person any more. You finished this. You know things you didn\u2019t. You can do this without me now. That was always the point.",
    },
    tool: 'plan-builder',
    plate: null,
    mealPlan: null,
    quiz: [
      { q: 'After this course, you should\u2026',
        opts: ['Buy another nutrition course', 'Run your one-page plan for 12 weeks and re-check', 'Hire a coach to do it for you', 'Start over from Week 1'],
        correct: 1,
        why: 'You have the system. Run it for 12 weeks, gather data, re-check. That\u2019s the cycle forever.' },
      { q: 'The biggest mistake people make after a course like this is\u2026',
        opts: ['Eating too little', 'Changing phase every 3 weeks because they\u2019re impatient', 'Eating too much protein', 'Skipping the cheat meal'],
        correct: 1,
        why: 'Commit to a phase for 12 weeks. Constant switching is the fastest way to no progress.' },
      { q: 'Your plan should fit on\u2026',
        opts: ['A spreadsheet', 'A 30-page PDF', 'One page, on the fridge', 'An app'],
        correct: 2,
        why: 'One page. Pinned. Visible. Anything more complicated and you won\u2019t actually follow it.' },
    ],
    reflection: 'Read your Week 1 reflection. Then write your one-page plan. What does the next 12 weeks look like?',
  },
];

