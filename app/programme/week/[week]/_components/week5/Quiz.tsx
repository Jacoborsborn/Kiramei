import QuizBase, { Question } from '../shared/QuizBase'

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What is mind-muscle connection?',
    options: [
      { id: 'A', text: 'A mental technique to push through pain' },
      { id: 'B', text: 'The ability to consciously activate the target muscle, increasing its activation during exercise' },
      { id: 'C', text: 'Visualising the exercise before performing it' },
      { id: 'D', text: 'Breathing technique used during heavy lifts' },
    ],
    correct: 'B',
    explanation: 'Research shows conscious focus on the target muscle produces measurably greater activation. The cue literally changes the outcome.',
  },
  {
    id: 2,
    text: 'On pull day, why are deadlifts programmed first?',
    options: [
      { id: 'A', text: 'Deadlifts are the easiest exercise and act as a warm-up' },
      { id: 'B', text: 'The heaviest compound lift should be performed when freshest' },
      { id: 'C', text: 'Deadlifts are always programmed first regardless of day type' },
      { id: 'D', text: 'It helps avoid lower back fatigue later in the session' },
    ],
    correct: 'B',
    explanation: 'Compound lifts require the most neurological and physical resources. Performing them first ensures maximum quality on the most important movement.',
  },
  {
    id: 3,
    text: 'What is the purpose of 3-1-1 tempo on isolation exercises?',
    options: [
      { id: 'A', text: 'To make the workout last longer' },
      { id: 'B', text: 'To slow the movement enough to feel and direct effort into the target muscle' },
      { id: 'C', text: 'To reduce injury risk by controlling speed' },
      { id: 'D', text: 'To increase cardiovascular demand' },
    ],
    correct: 'B',
    explanation: 'The slower tempo forces you to be deliberate — you cannot use momentum, so you have to feel the muscle working.',
  },
  {
    id: 4,
    text: 'Why is PPL more effective for you now than it would have been in week 1?',
    options: [
      { id: 'A', text: 'You are now stronger so you can handle the volume' },
      { id: 'B', text: 'Your movement patterns and recovery capacity are established after four weeks of foundation work' },
      { id: 'C', text: 'PPL is always more effective than full body training' },
      { id: 'D', text: 'Week 5 exercises are easier than week 1 exercises' },
    ],
    correct: 'B',
    explanation: 'PPL requires clean technique on multiple exercises within a focused session. Without the foundation work, form breaks down and recovery is compromised.',
  },
  {
    id: 5,
    text: 'The lateral delt is primarily developed by which exercise?',
    options: [
      { id: 'A', text: 'Overhead press' },
      { id: 'B', text: 'Bench press' },
      { id: 'C', text: 'Lateral raise' },
      { id: 'D', text: 'Upright row' },
    ],
    correct: 'C',
    explanation: 'The lateral deltoid is the muscle responsible for shoulder width. Almost no other exercise loads it directly — lateral raises are essential and irreplaceable.',
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
      weekNum={5}
      questions={QUESTIONS}
      initialPassed={initialPassed}
      onPass={onPass}
    />
  )
}
