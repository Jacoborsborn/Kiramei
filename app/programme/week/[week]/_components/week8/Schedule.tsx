import ScheduleBase, { SessionData } from '../shared/ScheduleBase'

const SESSIONS: SessionData[] = [
  {
    label: 'Push',
    day: 'MONDAY · PUSH · RPE9',
    title: 'Push',
    exercises: [
      { name: 'Bench Press', sets: '5×5 @RPE9', rest: '2min' },
      { name: 'Incline DB Press', sets: '4×10 @RPE8', rest: '90s' },
      { name: 'OHP', sets: '4×8 @RPE8', rest: '90s' },
      { name: 'Cable Fly', sets: '4×15', rest: '60s' },
      { name: 'Lateral+Front Raise Superset', sets: '3×15+10', rest: '90s' },
      { name: 'Tricep Superset Pushdown+Dips', sets: '3×12+10', rest: '90s' },
    ],
  },
  {
    label: 'Pull',
    day: 'TUESDAY · PULL · RPE9',
    title: 'Pull',
    exercises: [
      { name: 'Deadlift', sets: '5×3 @RPE9', rest: '3min' },
      { name: 'Weighted Pull-Up', sets: '4×6 @RPE8', rest: '2min' },
      { name: 'Chest Supported Row', sets: '4×10 @RPE8', rest: '90s' },
      { name: 'Face Pull', sets: '4×20', rest: '60s' },
      { name: 'Full Curl Giant Set (EZ+Hammer+Cable)', sets: '3×10+10+10', rest: '2min' },
    ],
  },
  {
    label: 'Legs',
    day: 'WEDNESDAY · LEGS · RPE9',
    title: 'Legs',
    exercises: [
      { name: 'Back Squat', sets: '5×5 @RPE9', rest: '2min' },
      { name: 'RDL', sets: '4×8 @RPE8', rest: '90s' },
      { name: 'Bulgarian Split Squat', sets: '4×10/side @RPE8', rest: '90s' },
      { name: 'Hip Thrust', sets: '5×10 @RPE8', rest: '90s' },
      { name: 'Leg Curl+Leg Extension Superset', sets: '4×12+12', rest: '90s' },
      { name: 'Calf Raise', sets: '5×20', rest: '45s' },
    ],
  },
]

const PLAIN_TEXT = `WEEK 8 SCHEDULE · PERSONAL BEST WEEK

MONDAY — Push · RPE 9
Bench Press · 5×5 @RPE9 · 2min
Incline DB Press · 4×10 @RPE8 · 90s
OHP · 4×8 @RPE8 · 90s
Cable Fly · 4×15 · 60s
Lateral+Front Raise Superset · 3×15+10 · 90s
Tricep Superset Pushdown+Dips · 3×12+10 · 90s

TUESDAY — Pull · RPE 9
Deadlift · 5×3 @RPE9 · 3min
Weighted Pull-Up · 4×6 @RPE8 · 2min
Chest Supported Row · 4×10 @RPE8 · 90s
Face Pull · 4×20 · 60s
Full Curl Giant Set (EZ+Hammer+Cable) · 3×10+10+10 · 2min

WEDNESDAY — Legs · RPE 9
Back Squat · 5×5 @RPE9 · 2min
RDL · 4×8 @RPE8 · 90s
Bulgarian Split Squat · 4×10/side @RPE8 · 90s
Hip Thrust · 5×10 @RPE8 · 90s
Leg Curl+Leg Extension Superset · 4×12+12 · 90s
Calf Raise · 5×20 · 45s

FRIDAY — Push (repeat)
SATURDAY — Pull (repeat — final session of the programme)`

interface Props {
  userId: string
  initialLogs: Array<{
    session_label: string
    exercise_name: string
    weight_kg: number | null
    reps: number | null
  }>
}

export default function Schedule({ userId, initialLogs }: Props) {
  return (
    <ScheduleBase
      userId={userId}
      weekNum={8}
      sessions={SESSIONS}
      plainText={PLAIN_TEXT}
      initialLogs={initialLogs}
    />
  )
}
