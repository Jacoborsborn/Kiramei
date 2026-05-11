import ScheduleBase, { SessionData } from '../shared/ScheduleBase'

const SESSIONS: SessionData[] = [
  {
    label: 'Upper-A',
    day: 'MONDAY · RPE 7-8',
    title: 'Upper A',
    exercises: [
      { name: 'Bench Press', sets: '4×6 @RPE8', rest: '2min' },
      { name: 'Barbell Row', sets: '4×6 @RPE8', rest: '2min' },
      { name: 'DB OHP', sets: '3×10 @RPE7', rest: '90s' },
      { name: 'Weighted Pulldown', sets: '3×8 @RPE8', rest: '90s' },
      { name: 'Close Grip Bench', sets: '3×10 @RPE7', rest: '60s' },
      { name: 'EZ Bar Curl', sets: '3×12 @RPE7', rest: '60s' },
    ],
  },
  {
    label: 'Lower-A',
    day: 'TUESDAY · RPE 7-8',
    title: 'Lower A',
    exercises: [
      { name: 'Back Squat', sets: '4×6 @RPE8', rest: '2min' },
      { name: 'Conventional Deadlift', sets: '4×5 @RPE8', rest: '2min' },
      { name: 'Leg Press', sets: '3×12 @RPE7', rest: '90s' },
      { name: 'Leg Curl', sets: '3×12 @RPE7', rest: '90s' },
      { name: 'Hip Thrust (heavy)', sets: '4×8 @RPE8', rest: '90s' },
      { name: 'Calf Raise', sets: '4×15', rest: '60s' },
    ],
  },
  {
    label: 'Upper-B',
    day: 'THURSDAY · HYPERTROPHY',
    title: 'Upper B',
    exercises: [
      { name: 'Incline DB Press', sets: '4×12 @RPE7', rest: '90s' },
      { name: 'Cable Row (wide)', sets: '4×12 @RPE7', rest: '90s' },
      { name: 'Lateral Raise', sets: '4×15 @RPE7', rest: '60s' },
      { name: 'Rear Delt Fly', sets: '3×15 @RPE7', rest: '60s' },
      { name: 'Tricep Overhead Extension', sets: '3×12 @RPE7', rest: '60s' },
      { name: 'Cable Curl', sets: '3×15 @RPE7', rest: '60s' },
    ],
  },
  {
    label: 'Lower-B',
    day: 'FRIDAY · HYPERTROPHY',
    title: 'Lower B',
    exercises: [
      { name: 'Bulgarian Split Squat', sets: '4×10/side @RPE7', rest: '90s' },
      { name: 'Leg Extension', sets: '4×15 @RPE7', rest: '60s' },
      { name: 'Lying Leg Curl', sets: '4×12 @RPE7', rest: '60s' },
      { name: 'Hip Thrust', sets: '4×12 @RPE7', rest: '90s' },
      { name: 'Cable Pull-Through', sets: '3×15', rest: '60s' },
      { name: 'Ab Wheel Rollout', sets: '3×8', rest: '60s' },
    ],
  },
]

const PLAIN_TEXT = `WEEK 4 SCHEDULE

MONDAY — Upper A · RPE 7-8
Bench Press · 4×6 @RPE8 · 2min rest
Barbell Row · 4×6 @RPE8 · 2min rest
DB OHP · 3×10 @RPE7 · 90s rest
Weighted Pulldown · 3×8 @RPE8 · 90s rest
Close Grip Bench · 3×10 @RPE7 · 60s rest
EZ Bar Curl · 3×12 @RPE7 · 60s rest

TUESDAY — Lower A · RPE 7-8
Back Squat · 4×6 @RPE8 · 2min rest
Conventional Deadlift · 4×5 @RPE8 · 2min rest
Leg Press · 3×12 @RPE7 · 90s rest
Leg Curl · 3×12 @RPE7 · 90s rest
Hip Thrust (heavy) · 4×8 @RPE8 · 90s rest
Calf Raise · 4×15 · 60s rest

THURSDAY — Upper B · Hypertrophy
Incline DB Press · 4×12 @RPE7 · 90s rest
Cable Row (wide) · 4×12 @RPE7 · 90s rest
Lateral Raise · 4×15 @RPE7 · 60s rest
Rear Delt Fly · 3×15 @RPE7 · 60s rest
Tricep Overhead Extension · 3×12 @RPE7 · 60s rest
Cable Curl · 3×15 @RPE7 · 60s rest

FRIDAY — Lower B · Hypertrophy
Bulgarian Split Squat · 4×10/side @RPE7 · 90s rest
Leg Extension · 4×15 @RPE7 · 60s rest
Lying Leg Curl · 4×12 @RPE7 · 60s rest
Hip Thrust · 4×12 @RPE7 · 90s rest
Cable Pull-Through · 3×15 · 60s rest
Ab Wheel Rollout · 3×8 · 60s rest`

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
      weekNum={4}
      sessions={SESSIONS}
      plainText={PLAIN_TEXT}
      initialLogs={initialLogs}
    />
  )
}
