import ScheduleBase, { SessionData } from '../shared/ScheduleBase'

const SESSIONS: SessionData[] = [
  {
    label: 'A',
    day: 'MONDAY · SESSION A',
    title: 'Session A',
    exercises: [
      { name: 'Back Squat', sets: '3×8 @60%', rest: '90s' },
      { name: 'Bench Press', sets: '3×8 @60%', rest: '90s' },
      { name: 'Barbell Row', sets: '3×8 @60%', rest: '90s' },
      { name: 'OHP', sets: '3×10 @60%', rest: '90s' },
      { name: 'Plank Hold', sets: '3×45s', rest: '60s' },
    ],
  },
  {
    label: 'B',
    day: 'WEDNESDAY · SESSION B',
    title: 'Session B',
    exercises: [
      { name: 'Romanian Deadlift', sets: '3×10 @60%', rest: '90s' },
      { name: 'Incline DB Press', sets: '3×10 @60%', rest: '90s' },
      { name: 'Lat Pulldown', sets: '3×12 @60%', rest: '90s' },
      { name: 'Hip Thrust', sets: '3×15 @60%', rest: '60s' },
      { name: 'Face Pull', sets: '3×20', rest: '60s' },
    ],
  },
  {
    label: 'C',
    day: 'FRIDAY · SESSION C (REFLECTION)',
    title: 'Session C',
    exercises: [
      { name: 'Goblet Squat', sets: '3×12', rest: '90s' },
      { name: 'Deadlift', sets: '3×5 @60%', rest: '2min' },
      { name: 'DB Bench Press', sets: '3×12 @60%', rest: '90s' },
      { name: 'Seated Row', sets: '3×12 @60%', rest: '90s' },
      { name: 'Easy Walk', sets: '20min', rest: '—' },
    ],
  },
]

const PLAIN_TEXT = `WEEK 7 SCHEDULE · DELOAD

MONDAY — Session A · Full Body @60%
Back Squat · 3×8 @60% · 90s rest
Bench Press · 3×8 @60% · 90s rest
Barbell Row · 3×8 @60% · 90s rest
OHP · 3×10 @60% · 90s rest
Plank Hold · 3×45s · 60s rest

WEDNESDAY — Session B · Full Body @60%
Romanian Deadlift · 3×10 @60% · 90s rest
Incline DB Press · 3×10 @60% · 90s rest
Lat Pulldown · 3×12 @60% · 90s rest
Hip Thrust · 3×15 @60% · 60s rest
Face Pull · 3×20 · 60s rest

FRIDAY — Session C · Reflection @60%
Goblet Squat · 3×12 · 90s rest
Deadlift · 3×5 @60% · 2min rest
DB Bench Press · 3×12 @60% · 90s rest
Seated Row · 3×12 @60% · 90s rest
Easy Walk · 20min`

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
      weekNum={7}
      sessions={SESSIONS}
      plainText={PLAIN_TEXT}
      initialLogs={initialLogs}
    />
  )
}
