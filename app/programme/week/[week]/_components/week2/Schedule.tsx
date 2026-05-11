import ScheduleBase, { type SessionData } from '../shared/ScheduleBase'

const SESSIONS: SessionData[] = [
  {
    label: 'A', day: 'MONDAY', title: 'Session A',
    exercises: [
      { name: 'Goblet Squat', sets: '3×12', rest: '90s rest' },
      { name: 'Romanian Deadlift', sets: '3×12', rest: '90s rest' },
      { name: 'Hip Thrust (with plate)', sets: '3×15', rest: '60s rest' },
      { name: 'Seated Cable Row', sets: '3×12', rest: '90s rest' },
      { name: 'Plank Hold', sets: '3×40s', rest: '60s rest' },
    ],
  },
  {
    label: 'B', day: 'WEDNESDAY', title: 'Session B',
    exercises: [
      { name: 'Leg Press', sets: '3×12', rest: '90s rest' },
      { name: 'Hip Thrust (with plate)', sets: '3×15', rest: '60s rest' },
      { name: 'Lat Pulldown', sets: '3×12', rest: '90s rest' },
      { name: 'DB Shoulder Press', sets: '3×12', rest: '90s rest' },
      { name: 'Dead Bug', sets: '3×10/side', rest: '60s rest' },
    ],
  },
  {
    label: 'C', day: 'FRIDAY', title: 'Session C · Barbell Introduction',
    exercises: [
      { name: 'Barbell Back Squat', sets: '3×8', rest: '2min rest' },
      { name: 'Barbell Romanian Deadlift', sets: '3×8', rest: '2min rest' },
      { name: 'Incline DB Press', sets: '3×12', rest: '90s rest' },
      { name: 'Single Arm DB Row', sets: '3×10/side', rest: '90s rest' },
      { name: 'Pallof Press', sets: '3×12/side', rest: '60s rest' },
    ],
  },
]

const PLAIN_TEXT = `WEEK 2 SCHEDULE

MONDAY — Session A
Goblet Squat · 3×12 · 90s rest
Romanian Deadlift · 3×12 · 90s rest
Hip Thrust (with plate) · 3×15 · 60s rest
Seated Cable Row · 3×12 · 90s rest
Plank Hold · 3×40s · 60s rest

WEDNESDAY — Session B
Leg Press · 3×12 · 90s rest (add weight from week 1)
Hip Thrust (with plate) · 3×15 · 60s rest
Lat Pulldown · 3×12 · 90s rest
DB Shoulder Press · 3×12 · 90s rest
Dead Bug · 3×10/side · 60s rest

FRIDAY — Session C · Barbell Introduction
Barbell Back Squat · 3×8 · 2min rest (empty bar)
Barbell Romanian Deadlift · 3×8 · 2min rest (empty bar)
Incline DB Press · 3×12 · 90s rest
Single Arm DB Row · 3×10/side · 90s rest
Pallof Press · 3×12/side · 60s rest`

export default function Schedule({ userId, initialLogs }: { userId: string; initialLogs: any[] }) {
  return <ScheduleBase weekNum={2} sessions={SESSIONS} plainText={PLAIN_TEXT} userId={userId} initialLogs={initialLogs} />
}
