import QuizBase, { type Question } from '../shared/QuizBase'

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What does progressive overload mean?',
    options: [
      { id: 'A', text: 'Lifting as heavy as possible every session' },
      { id: 'B', text: 'Giving your body a slightly greater demand than last time' },
      { id: 'C', text: 'Doing more cardio each week' },
      { id: 'D', text: 'Changing your exercises every week' },
    ],
    correct: 'B',
    explanation: 'Progressive overload is simply giving the body a slightly greater demand than it faced last time. This forces adaptation — if nothing changes, nothing changes.',
  },
  {
    id: 2,
    text: 'Which of these is NOT a valid form of progressive overload?',
    options: [
      { id: 'A', text: 'Adding 2.5kg to the bar' },
      { id: 'B', text: 'Doing one more rep at the same weight' },
      { id: 'C', text: 'Doing the same session but feeling less tired' },
      { id: 'D', text: 'Reducing rest time between sets' },
    ],
    correct: 'C',
    explanation: 'Feeling less tired doing the same session is adaptation — your body has become more efficient. But it is not progressive overload because you have not added any new demand.',
  },
  {
    id: 3,
    text: 'Why do we introduce the barbell on an empty bar this week?',
    options: [
      { id: 'A', text: 'Because you are not strong enough for weight yet' },
      { id: 'B', text: 'Because the technique pattern must be learned before load is added' },
      { id: 'C', text: 'To save energy for the other exercises' },
      { id: 'D', text: 'Because barbells are only for advanced lifters' },
    ],
    correct: 'B',
    explanation: 'The barbell pattern — bar path, bracing, foot position — must become automatic before load is added. Poor technique under heavy load causes injury. Empty bar work is precision training, not easy training.',
  },
  {
    id: 4,
    text: 'What happens to your body if the training stimulus stays exactly the same week after week?',
    options: [
      { id: 'A', text: 'You continue to grow slowly' },
      { id: 'B', text: 'You maintain your current level but do not progress' },
      { id: 'C', text: 'You overtrain and get injured' },
      { id: 'D', text: 'Nothing — consistency is all that matters' },
    ],
    correct: 'B',
    explanation: 'Your body adapts to a given stimulus and then stops changing. Without progressive overload you are maintaining, not building. This is why people go to the gym for years and look identical.',
  },
  {
    id: 5,
    text: 'You cannot add weight this week on Romanian Deadlifts. What should you do?',
    options: [
      { id: 'A', text: 'Skip the exercise' },
      { id: 'B', text: 'Add weight anyway and accept the form breakdown' },
      { id: 'C', text: 'Find another form of overload — more reps, slower tempo, better range' },
      { id: 'D', text: 'Rest that muscle group for the week' },
    ],
    correct: 'C',
    explanation: 'When weight cannot be added, other forms of overload apply. One extra rep is overload. A slower tempo is overload. Better range is overload. Progress is always available — the log helps you find it.',
  },
]

export default function Quiz({ userId, initialPassed }: { userId: string; initialPassed: boolean }) {
  return <QuizBase weekNum={2} questions={QUESTIONS} userId={userId} initialPassed={initialPassed} />
}
