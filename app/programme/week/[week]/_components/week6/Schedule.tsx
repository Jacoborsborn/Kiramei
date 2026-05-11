import ScheduleBase, { SessionData } from '../shared/ScheduleBase'

const SESSIONS: SessionData[] = [
  {
    label: 'Push',
    day: 'MONDAY · PUSH',
    title: 'Push',
    exercises: [
      { name: 'Bench Press', sets: '4×6 @RPE8', rest: '2min · FILM' },
      { name: 'Incline DB Press', sets: '4×10 @RPE7', rest: '90s' },
      { name: 'OHP', sets: '4×8 @RPE8', rest: '90s' },
      { name: 'Cable Fly', sets: '3×15 @RPE7', rest: '60s' },
      { name: 'Lateral Raise', sets: '4×15 @RPE7', rest: '60s' },
      { name: 'Tricep Superset (Pushdown+Overhead)', sets: '3×12+12', rest: '90s' },
    ],
  },
  {
    label: 'Pull',
    day: 'TUESDAY · PULL',
    title: 'Pull',
    exercises: [
      { name: 'Deadlift', sets: '4×5 @RPE8', rest: '2min · FILM' },
      { name: 'Pull-Up or Pulldown', sets: '4×8 @RPE8', rest: '90s' },
      { name: 'Chest Supported Row', sets: '4×10 @RPE7', rest: '90s' },
      { name: 'Face Pull', sets: '4×20', rest: '60s' },
      { name: 'Curl Superset (EZ+Hammer)', sets: '3×10+10', rest: '90s' },
    ],
  },
  {
    label: 'Legs',
    day: 'WEDNESDAY · LEGS',
    title: 'Legs',
    exercises: [
      { name: 'Back Squat', sets: '4×6 @RPE8', rest: '2min · FILM BOTH ANGLES' },
      { name: 'RDL', sets: '4×10 @RPE7', rest: '90s' },
      { name: 'Bulgarian Split Squat', sets: '4×10/side @RPE7', rest: '90s' },
      { name: 'Hip Thrust', sets: '4×12 @RPE8', rest: '90s' },
      { name: 'Leg Curl+Leg Extension Superset', sets: '3×12+12', rest: '90s' },
    ],
  },
]

const PLAIN_TEXT = `WEEK 6 SCHEDULE · FORM AUDIT WEEK

MONDAY — Push
Bench Press · 4×6 @RPE8 · 2min · FILM
Incline DB Press · 4×10 @RPE7 · 90s
OHP · 4×8 @RPE8 · 90s
Cable Fly · 3×15 @RPE7 · 60s
Lateral Raise · 4×15 @RPE7 · 60s
Tricep Superset (Pushdown+Overhead) · 3×12+12 · 90s

TUESDAY — Pull
Deadlift · 4×5 @RPE8 · 2min · FILM
Pull-Up or Pulldown · 4×8 @RPE8 · 90s
Chest Supported Row · 4×10 @RPE7 · 90s
Face Pull · 4×20 · 60s
Curl Superset (EZ+Hammer) · 3×10+10 · 90s

WEDNESDAY — Legs
Back Squat · 4×6 @RPE8 · 2min · FILM BOTH ANGLES
RDL · 4×10 @RPE7 · 90s
Bulgarian Split Squat · 4×10/side @RPE7 · 90s
Hip Thrust · 4×12 @RPE8 · 90s
Leg Curl+Leg Extension Superset · 3×12+12 · 90s

FRIDAY — Push (repeat)
SATURDAY — Pull (repeat)`

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
      weekNum={6}
      sessions={SESSIONS}
      plainText={PLAIN_TEXT}
      initialLogs={initialLogs}
    />
  )
}
