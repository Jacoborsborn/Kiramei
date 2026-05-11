import ScheduleBase, { type SessionData } from '../shared/ScheduleBase'

const SESSIONS: SessionData[] = [
  {
    label: 'UA', day: 'MONDAY', title: 'Upper A',
    exercises: [
      { name: 'Barbell Bench Press', sets: '4×8', rest: '2min rest' },
      { name: 'Barbell Row', sets: '4×8', rest: '2min rest' },
      { name: 'DB Overhead Press', sets: '3×10', rest: '90s rest' },
      { name: 'Lat Pulldown', sets: '3×10', rest: '90s rest' },
      { name: 'Tricep Pushdown', sets: '3×12', rest: '60s rest' },
      { name: 'Hammer Curl', sets: '3×12', rest: '60s rest' },
    ],
  },
  {
    label: 'LA', day: 'TUESDAY', title: 'Lower A',
    exercises: [
      { name: 'Barbell Back Squat', sets: '4×8', rest: '2min rest' },
      { name: 'Barbell RDL', sets: '4×8', rest: '2min rest' },
      { name: 'Leg Press', sets: '3×12', rest: '90s rest' },
      { name: 'Leg Curl', sets: '3×12', rest: '90s rest' },
      { name: 'Hip Thrust', sets: '3×15', rest: '60s rest' },
      { name: 'Calf Raise', sets: '4×15', rest: '45s rest' },
    ],
  },
  {
    label: 'UB', day: 'THURSDAY', title: 'Upper B',
    exercises: [
      { name: 'Incline DB Press', sets: '4×10', rest: '90s rest' },
      { name: 'Seated Cable Row', sets: '4×10', rest: '90s rest' },
      { name: 'Lateral Raise', sets: '3×15', rest: '60s rest' },
      { name: 'Face Pull', sets: '3×15', rest: '60s rest' },
      { name: 'Skull Crusher', sets: '3×12', rest: '60s rest' },
      { name: 'Incline Curl', sets: '3×12', rest: '60s rest' },
    ],
  },
  {
    label: 'LB', day: 'FRIDAY', title: 'Lower B',
    exercises: [
      { name: 'Romanian Deadlift (heavy)', sets: '4×6', rest: '2min rest' },
      { name: 'Bulgarian Split Squat', sets: '3×10/side', rest: '90s rest' },
      { name: 'Leg Extension', sets: '3×15', rest: '60s rest' },
      { name: 'Hip Thrust (heavy)', sets: '4×10', rest: '90s rest' },
      { name: 'Nordic / Leg Curl', sets: '3×8', rest: '90s rest' },
      { name: 'Plank', sets: '3×45s', rest: '45s rest' },
    ],
  },
]

const PLAIN_TEXT = `WEEK 3 SCHEDULE

MONDAY — Upper A
Barbell Bench Press · 4×8 · 2min rest
Barbell Row · 4×8 · 2min rest
DB Overhead Press · 3×10 · 90s rest
Lat Pulldown · 3×10 · 90s rest
Tricep Pushdown · 3×12 · 60s rest
Hammer Curl · 3×12 · 60s rest

TUESDAY — Lower A
Barbell Back Squat · 4×8 · 2min rest
Barbell RDL · 4×8 · 2min rest
Leg Press · 3×12 · 90s rest
Leg Curl · 3×12 · 90s rest
Hip Thrust · 3×15 · 60s rest
Calf Raise · 4×15 · 45s rest

THURSDAY — Upper B
Incline DB Press · 4×10 · 90s rest
Seated Cable Row · 4×10 · 90s rest
Lateral Raise · 3×15 · 60s rest
Face Pull · 3×15 · 60s rest
Skull Crusher · 3×12 · 60s rest
Incline Curl · 3×12 · 60s rest

FRIDAY — Lower B
Romanian Deadlift (heavy) · 4×6 · 2min rest
Bulgarian Split Squat · 3×10/side · 90s rest
Leg Extension · 3×15 · 60s rest
Hip Thrust (heavy) · 4×10 · 90s rest
Nordic / Leg Curl · 3×8 · 90s rest
Plank · 3×45s · 45s rest`

export default function Schedule({ userId, initialLogs }: { userId: string; initialLogs: any[] }) {
  return <ScheduleBase weekNum={3} sessions={SESSIONS} plainText={PLAIN_TEXT} userId={userId} initialLogs={initialLogs} />
}
