import QuizBase, { Question } from '../shared/QuizBase'

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What is supercompensation?',
    options: [
      { id: 'A', text: 'Training harder than usual to make faster progress' },
      { id: 'B', text: 'The process where the body rebuilds above its previous baseline after stress and adequate recovery' },
      { id: 'C', text: 'Adding extra sessions when you feel fresh' },
      { id: 'D', text: 'Taking a full week off training to reset' },
    ],
    correct: 'B',
    explanation: 'Supercompensation is the measurable process by which the body, after stress and adequate recovery, rebuilds above its previous performance baseline. This is why athletes test stronger after a deload than before it.',
  },
  {
    id: 2,
    text: 'What are symptoms of accumulated fatigue syndrome?',
    options: [
      { id: 'A', text: 'Increased strength, better sleep, high motivation' },
      { id: 'B', text: 'Performance plateaus, persistent soreness, disrupted sleep, loss of motivation' },
      { id: 'C', text: 'Muscle soreness only in the 24 hours after training' },
      { id: 'D', text: 'Temporary fatigue that resolves within one rest day' },
    ],
    correct: 'B',
    explanation: 'Accumulated fatigue syndrome presents as performance plateaus despite continued training, soreness that does not resolve between sessions, sleep disruption, and motivational decline. These are biological responses to accumulated systemic fatigue — not weakness.',
  },
  {
    id: 3,
    text: 'Why do we return to full body training during the deload week?',
    options: [
      { id: 'A', text: 'Because full body burns more calories at 60% load' },
      { id: 'B', text: 'Full body at low load allows every muscle to move and recover without significant tissue stress' },
      { id: 'C', text: 'Because the PPL split is too demanding to deload properly' },
      { id: 'D', text: 'To remind the body of the original movement patterns' },
    ],
    correct: 'B',
    explanation: 'Full body at deload intensity keeps all muscle groups moving — maintaining neural patterns and blood flow — without the tissue stress that would impair recovery. Rest without movement is not the goal. Active recovery at low load is.',
  },
  {
    id: 4,
    text: 'Why should the goblet squat on Friday feel different to week 1?',
    options: [
      { id: 'A', text: 'Because you are using a heavier dumbbell' },
      { id: 'B', text: 'Because you are now fatigued from five sessions before it' },
      { id: 'C', text: 'Six weeks of adaptation has improved movement quality, depth, and neural efficiency' },
      { id: 'D', text: 'It should not feel different — the exercise is the same' },
    ],
    correct: 'C',
    explanation: 'Six weeks of consistent training has produced real neuromuscular adaptation. The goblet squat in week 7 is easier, more controlled, and deeper than week 1 — not because the exercise changed, but because you did.',
  },
  {
    id: 5,
    text: 'How often should a deload week be programmed?',
    options: [
      { id: 'A', text: 'Only when you feel burnt out or injured' },
      { id: 'B', text: 'Once per year as a full reset' },
      { id: 'C', text: 'Every four to eight weeks of hard training' },
      { id: 'D', text: 'Deloads are only for professional athletes' },
    ],
    correct: 'C',
    explanation: 'Evidence-based periodisation prescribes a deload every four to eight weeks of hard training. Build it in at the start of each new block — not when you are already displaying symptoms of accumulated fatigue.',
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
      weekNum={7}
      questions={QUESTIONS}
      initialPassed={initialPassed}
      onPass={onPass}
    />
  )
}
