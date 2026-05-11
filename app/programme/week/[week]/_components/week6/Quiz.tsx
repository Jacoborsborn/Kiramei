import QuizBase, { Question } from '../shared/QuizBase'

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What is a weak link in a compound lift?',
    options: [
      { id: 'A', text: 'The lightest weight you can lift' },
      { id: 'B', text: 'The muscle that fails before the target muscle reaches its limit' },
      { id: 'C', text: 'Poor gym equipment' },
      { id: 'D', text: 'A muscle that is too strong relative to others' },
    ],
    correct: 'B',
    explanation: 'The weak link robs the target muscle of its training stimulus. Identifying and addressing it makes your compound lifts more effective.',
  },
  {
    id: 2,
    text: 'If your knees cave during a squat, which muscles are the weak link?',
    options: [
      { id: 'A', text: 'Quads — they are pulling the knees in' },
      { id: 'B', text: 'Hamstrings — they are too tight' },
      { id: 'C', text: 'Adductors or glutes — the muscles that should be holding the knees out' },
      { id: 'D', text: 'Calves — causing heel rise which shifts the knee path' },
    ],
    correct: 'C',
    explanation: 'Knee caving indicates weak adductors or glutes — the muscles that should be pulling the knees into alignment. Adding abductor/glute accessory work addresses this directly.',
  },
  {
    id: 3,
    text: 'Why does the chest supported row eliminate lower back compensation?',
    options: [
      { id: 'A', text: 'Because the weight is lighter so there is less strain' },
      { id: 'B', text: 'Because lying prone on the bench physically prevents lower back extension' },
      { id: 'C', text: 'Because the angle changes which muscles are recruited' },
      { id: 'D', text: 'Because you use dumbbells instead of a barbell' },
    ],
    correct: 'B',
    explanation: 'The chest pad physically constrains your torso. You cannot hinge your spine to generate momentum, so the lats must do all the work.',
  },
  {
    id: 4,
    text: 'Why do we use supersets this week?',
    options: [
      { id: 'A', text: 'To save time — supersets are faster than straight sets' },
      { id: 'B', text: 'To accumulate fatigue and increase time under tension across related muscle groups' },
      { id: 'C', text: 'To lift heavier because pre-fatigue increases strength output' },
      { id: 'D', text: 'Because straight sets are too easy at this stage' },
    ],
    correct: 'B',
    explanation: 'Supersets pair exercises so that rest between them is replaced by work on a complementary movement. The result is more total work in the same time and higher metabolic stress.',
  },
  {
    id: 5,
    text: 'What is the primary purpose of filming your lifts?',
    options: [
      { id: 'A', text: 'To post progress videos on social media' },
      { id: 'B', text: 'To identify weak links and form errors that cannot be felt from inside the movement' },
      { id: 'C', text: 'To compare your physique week to week' },
      { id: 'D', text: 'To check your tempo is correct' },
    ],
    correct: 'B',
    explanation: 'You cannot feel your own knee tracking or bar path from inside the movement. Video gives you an external view that coaches use — now you can use it yourself.',
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
      weekNum={6}
      questions={QUESTIONS}
      initialPassed={initialPassed}
      onPass={onPass}
    />
  )
}
