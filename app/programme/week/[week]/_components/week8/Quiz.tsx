import QuizBase, { Question } from '../shared/QuizBase'

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What is the primary rep range for hypertrophy?',
    options: [
      { id: 'A', text: '1–3 reps' },
      { id: 'B', text: '6–20 reps' },
      { id: 'C', text: '25–40 reps' },
      { id: 'D', text: 'Rep range does not matter — only volume does' },
    ],
    correct: 'B',
    explanation: 'Hypertrophy is primarily stimulated in the 6–20 rep range at RPE 7–8 with moderate rest. This range maximises mechanical tension, metabolic stress, and muscle damage — the three primary drivers of muscle growth.',
  },
  {
    id: 2,
    text: 'What is the primary mechanism of strength training adaptation?',
    options: [
      { id: 'A', text: 'Muscle hypertrophy — larger fibres generate more force' },
      { id: 'B', text: 'Metabolic adaptation — muscles become more efficient at using energy' },
      { id: 'C', text: 'Neuromuscular adaptation — training the nervous system to recruit and fire muscle fibres more effectively' },
      { id: 'D', text: 'Hormonal adaptation — strength training increases testosterone permanently' },
    ],
    correct: 'C',
    explanation: 'The primary mechanism of strength adaptation is neuromuscular. Heavy low-rep training teaches the nervous system to recruit more motor units simultaneously and fire them more rapidly. This is why strength gains come faster than hypertrophy gains in early training.',
  },
  {
    id: 3,
    text: 'Why is a hybrid approach (heavy compounds + moderate isolation) optimal for most people?',
    options: [
      { id: 'A', text: 'Because it is less boring than pure strength or pure hypertrophy training' },
      { id: 'B', text: 'Heavy compounds provide strength stimulus and moderate isolation work provides hypertrophy stimulus simultaneously' },
      { id: 'C', text: 'Because isolation exercises are not effective for strength and compounds are not effective for hypertrophy' },
      { id: 'D', text: 'Because hybrid training requires fewer sessions per week' },
    ],
    correct: 'B',
    explanation: 'A hybrid approach captures the benefits of both training goals in a single programme. Heavy compound work (3–6 reps) drives neuromuscular adaptation and peak strength. Moderate isolation work (8–15 reps) drives hypertrophy in the target muscles. This is what this programme has been.',
  },
  {
    id: 4,
    text: 'When should you plan your next deload week?',
    options: [
      { id: 'A', text: 'When you start feeling burnt out or notice performance declining' },
      { id: 'B', text: 'At the start of your next training block — build it in at week 7 before you begin' },
      { id: 'C', text: 'After every 12 weeks, regardless of how you feel' },
      { id: 'D', text: 'Deloads are only needed after injuries' },
    ],
    correct: 'B',
    explanation: 'A deload should be planned at the start of a training block — not reactively when you are already showing symptoms of fatigue. Build it into week 7 before you start. Reactive deloading is better than no deloading, but planned deloading produces better results.',
  },
  {
    id: 5,
    text: 'What does RPE 9 mean in the context of this week\'s compound lifts?',
    options: [
      { id: 'A', text: 'Maximum effort — no reps remaining after the set' },
      { id: 'B', text: 'One rep remaining — near maximal effort with form intact' },
      { id: 'C', text: 'Two reps remaining — slightly challenging but manageable' },
      { id: 'D', text: 'Three reps remaining — conservative to protect against injury' },
    ],
    correct: 'B',
    explanation: 'RPE 9 means one rep remaining in the tank. Near maximal effort with form intact. This is the target for compound working sets this week — fresh from the deload, the nervous system can sustain this level of effort across multiple sets.',
  },
]

interface Props {
  userId: string
  initialPassed: boolean
  onPass?: () => void
}

export default function Quiz({ userId, initialPassed, onPass }: Props) {
  return (
    <QuizBase
      userId={userId}
      weekNum={8}
      questions={QUESTIONS}
      initialPassed={initialPassed}
      onPass={onPass}
    />
  )
}
