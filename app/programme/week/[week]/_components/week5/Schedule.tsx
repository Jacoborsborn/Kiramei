import ScheduleBase, { SessionData } from '../shared/ScheduleBase'

const SESSIONS: SessionData[] = [
  {
    label: 'Push',
    day: 'MONDAY (& FRIDAY)',
    title: 'Push Day',
    exercises: [
      { name: 'Bench Press', sets: '4×6 @RPE8', rest: '2min' },
      { name: 'Incline DB Press', sets: '3×10 @RPE7', rest: '90s' },
      { name: 'OHP', sets: '3×10 @RPE7', rest: '90s' },
      { name: 'Cable Fly', sets: '3×15 @RPE7', rest: '60s' },
      { name: 'Lateral Raise', sets: '4×15 @RPE7', rest: '60s' },
      { name: 'Tricep Pushdown', sets: '3×15 @RPE7', rest: '60s' },
      { name: 'Overhead Tricep Extension', sets: '3×12 @RPE7', rest: '60s' },
    ],
  },
  {
    label: 'Pull',
    day: 'TUESDAY (& SATURDAY)',
    title: 'Pull Day',
    exercises: [
      { name: 'Deadlift', sets: '4×5 @RPE8', rest: '2min' },
      { name: 'Weighted Pull-Up/Pulldown', sets: '4×8 @RPE8', rest: '90s' },
      { name: 'Cable Row', sets: '4×10 @RPE7', rest: '90s' },
      { name: 'Face Pull', sets: '3×15', rest: '60s' },
      { name: 'Rear Delt Fly', sets: '3×15 @RPE7', rest: '60s' },
      { name: 'EZ Bar Curl', sets: '3×12 @RPE7', rest: '60s' },
      { name: 'Hammer Curl', sets: '3×12 @RPE7', rest: '60s' },
    ],
  },
  {
    label: 'Legs',
    day: 'WEDNESDAY',
    title: 'Legs Day',
    exercises: [
      { name: 'Back Squat', sets: '4×6 @RPE8', rest: '2min' },
      { name: 'Romanian Deadlift', sets: '4×10 @RPE7', rest: '90s' },
      { name: 'Leg Press', sets: '3×15 @RPE7', rest: '90s' },
      { name: 'Hip Thrust', sets: '4×10 @RPE8', rest: '90s' },
      { name: 'Leg Curl', sets: '3×15 @RPE7', rest: '60s' },
      { name: 'Calf Raise', sets: '4×20', rest: '45s' },
    ],
  },
]

const PLAIN_TEXT = `WEEK 5 SCHEDULE — PUSH / PULL / LEGS

MONDAY & FRIDAY — Push Day
Bench Press · 4×6 @RPE8 · 2min rest
Incline DB Press · 3×10 @RPE7 · 90s rest
OHP · 3×10 @RPE7 · 90s rest
Cable Fly · 3×15 @RPE7 · 60s rest
Lateral Raise · 4×15 @RPE7 · 60s rest
Tricep Pushdown · 3×15 @RPE7 · 60s rest
Overhead Tricep Extension · 3×12 @RPE7 · 60s rest

TUESDAY & SATURDAY — Pull Day
Deadlift · 4×5 @RPE8 · 2min rest
Weighted Pull-Up/Pulldown · 4×8 @RPE8 · 90s rest
Cable Row · 4×10 @RPE7 · 90s rest
Face Pull · 3×15 · 60s rest
Rear Delt Fly · 3×15 @RPE7 · 60s rest
EZ Bar Curl · 3×12 @RPE7 · 60s rest
Hammer Curl · 3×12 @RPE7 · 60s rest

WEDNESDAY — Legs Day
Back Squat · 4×6 @RPE8 · 2min rest
Romanian Deadlift · 4×10 @RPE7 · 90s rest
Leg Press · 3×15 @RPE7 · 90s rest
Hip Thrust · 4×10 @RPE8 · 90s rest
Leg Curl · 3×15 @RPE7 · 60s rest
Calf Raise · 4×20 · 45s rest

THURSDAY — Rest Day (non-negotiable)
FRIDAY — Push Day (same as Monday)
SATURDAY — Pull Day (same as Tuesday)`

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
      weekNum={5}
      sessions={SESSIONS}
      plainText={PLAIN_TEXT}
      initialLogs={initialLogs}
    />
  )
}
