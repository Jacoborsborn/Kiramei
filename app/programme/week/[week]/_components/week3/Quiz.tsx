import QuizBase, { type Question } from '../shared/QuizBase'

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'How long does muscle protein synthesis typically take to complete after a training session?',
    options: [
      { id: 'A', text: '6–12 hours' },
      { id: 'B', text: '48–72 hours' },
      { id: 'C', text: 'Exactly 24 hours' },
      { id: 'D', text: 'Up to one week' },
    ],
    correct: 'B',
    explanation: 'Muscle protein synthesis peaks at 24–36 hours post-training and takes 48–72 hours to complete. Training the same muscle before this window closes means you are damaging tissue still mid-repair.',
  },
  {
    id: 2,
    text: 'Why does Upper/Lower split outperform full body training at this stage?',
    options: [
      { id: 'A', text: 'Because Upper/Lower sessions are shorter' },
      { id: 'B', text: 'Because you burn more calories per session' },
      { id: 'C', text: 'Because each muscle group recovers fully before it is trained again' },
      { id: 'D', text: 'Because full body training is too easy now' },
    ],
    correct: 'C',
    explanation: 'Upper/Lower gives each muscle group a full recovery window between sessions. Monday upper, Thursday upper — 72 hours of repair. The quality of the stimulus improves because you are not training damaged tissue.',
  },
  {
    id: 3,
    text: 'What does DOMS (delayed onset muscle soreness) actually indicate?',
    options: [
      { id: 'A', text: 'A sign of a highly effective session' },
      { id: 'B', text: 'A sign of novelty — the movement was unfamiliar to your body' },
      { id: 'C', text: 'Proof that progressive overload occurred' },
      { id: 'D', text: 'That you need more rest days' },
    ],
    correct: 'B',
    explanation: 'DOMS is a signal of novelty, not effectiveness. As your body adapts to movements, soreness decreases — but progress continues. Chasing soreness leads to constantly changing exercises rather than loading them progressively.',
  },
  {
    id: 4,
    text: 'Why do we start the Bulgarian Split Squat at bodyweight this week?',
    options: [
      { id: 'A', text: 'Because it is too easy to add weight to' },
      { id: 'B', text: 'Because balance and the movement pattern must be established before load is added' },
      { id: 'C', text: 'Because it is not a useful exercise for strength' },
      { id: 'D', text: 'To save energy for the heavier exercises' },
    ],
    correct: 'B',
    explanation: 'The Bulgarian Split Squat requires balance, hip position, and shin angle to be established before load is added. Adding weight before the pattern is stable produces compensation, not strength.',
  },
  {
    id: 5,
    text: 'What happens physiologically during rest days?',
    options: [
      { id: 'A', text: 'Nothing — the body only changes during training' },
      { id: 'B', text: 'Muscle tissue breaks down further' },
      { id: 'C', text: 'Muscle fibres repair and rebuild stronger than before' },
      { id: 'D', text: 'Calories from food convert directly to fat' },
    ],
    correct: 'C',
    explanation: 'Training creates micro-damage. Rest days are when muscle protein synthesis runs its full course, laying down new contractile protein and rebuilding fibres slightly stronger. The adaptation is a rest-day event, not a training-day event.',
  },
]

export default function Quiz({ userId, initialPassed }: { userId: string; initialPassed: boolean }) {
  return <QuizBase weekNum={3} questions={QUESTIONS} userId={userId} initialPassed={initialPassed} />
}
