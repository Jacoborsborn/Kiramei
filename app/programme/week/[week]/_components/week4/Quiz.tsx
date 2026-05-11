import QuizBase, { Question } from '../shared/QuizBase'

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What does RPE 8 mean in practice?',
    options: [
      { id: 'A', text: 'You were working at 80% effort' },
      { id: 'B', text: 'You had two reps remaining with good form' },
      { id: 'C', text: 'You could not complete another set' },
      { id: 'D', text: 'You felt the set was difficult' },
    ],
    correct: 'B',
    explanation: 'RPE 8 means exactly two reps were left in the tank with form intact — not an effort percentage.',
  },
  {
    id: 2,
    text: 'Why does RPE work better than percentage programming right now?',
    options: [
      { id: 'A', text: 'Percentages are too complicated to calculate' },
      { id: 'B', text: 'RPE adjusts to how you feel on the day without needing to know your 1RM' },
      { id: 'C', text: 'Percentages always lead to overtraining' },
      { id: 'D', text: 'RPE is easier to write down' },
    ],
    correct: 'B',
    explanation: 'Percentages require knowing your max. RPE is autoregulation — it scales to your actual capacity on any given day.',
  },
  {
    id: 3,
    text: 'You complete squats and had four or more reps left — what RPE was that?',
    options: [
      { id: 'A', text: 'RPE 8' },
      { id: 'B', text: 'RPE 7' },
      { id: 'C', text: 'RPE 6 or below' },
      { id: 'D', text: 'RPE 9' },
    ],
    correct: 'C',
    explanation: 'RPE 6 or below means four or more reps remaining. You need to load heavier to reach the target RPE 7–8.',
  },
  {
    id: 4,
    text: 'Why should rest periods not be shortened?',
    options: [
      { id: 'A', text: 'It makes the workout too easy' },
      { id: 'B', text: 'Short rest changes the stimulus from strength to cardiovascular' },
      { id: 'C', text: 'Shorter rest leads to injury' },
      { id: 'D', text: 'The programme is designed to take exactly 60 minutes' },
    ],
    correct: 'B',
    explanation: 'The rest period is part of the prescription. Shortened rest means incomplete recovery, which turns strength work into conditioning.',
  },
  {
    id: 5,
    text: 'What does autoregulation mean in training?',
    options: [
      { id: 'A', text: 'Automatically increasing weight every session' },
      { id: 'B', text: 'The load adjusts to your effort level rather than following fixed numbers' },
      { id: 'C', text: 'Regulating your rest periods automatically' },
      { id: 'D', text: 'Training the same regardless of how you feel' },
    ],
    correct: 'B',
    explanation: 'Autoregulation means you adjust load to hit the target effort, rather than blindly following predetermined numbers regardless of daily state.',
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
      weekNum={4}
      questions={QUESTIONS}
      initialPassed={initialPassed}
      onPass={onPass}
    />
  )
}
