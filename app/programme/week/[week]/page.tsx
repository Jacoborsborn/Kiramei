import { notFound, redirect } from 'next/navigation'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

// Week 1 components
import Brief1 from './_components/week1/Brief'
import MindMap1 from './_components/week1/MindMap'
import ExerciseBreakdowns1 from './_components/week1/ExerciseBreakdowns'
import Lesson1 from './_components/week1/Lesson'
import Schedule1 from './_components/week1/Schedule'
import Quiz1 from './_components/week1/Quiz'
import CompleteWeek1 from './_components/week1/CompleteWeek'

// Week 2 components
import Brief2 from './_components/week2/Brief'
import MindMap2 from './_components/week2/MindMap'
import ExerciseBreakdowns2 from './_components/week2/ExerciseBreakdowns'
import Lesson2 from './_components/week2/Lesson'
import Schedule2 from './_components/week2/Schedule'
import Quiz2 from './_components/week2/Quiz'

// Week 3 components
import Brief3 from './_components/week3/Brief'
import MindMap3 from './_components/week3/MindMap'
import ExerciseBreakdowns3 from './_components/week3/ExerciseBreakdowns'
import Lesson3 from './_components/week3/Lesson'
import Schedule3 from './_components/week3/Schedule'
import Quiz3 from './_components/week3/Quiz'

// Week 4 components
import Brief4 from './_components/week4/Brief'
import MindMap4 from './_components/week4/MindMap'
import ExerciseBreakdowns4 from './_components/week4/ExerciseBreakdowns'
import Lesson4 from './_components/week4/Lesson'
import Schedule4 from './_components/week4/Schedule'
import Quiz4 from './_components/week4/Quiz'

// Week 5 components
import Brief5 from './_components/week5/Brief'
import MindMap5 from './_components/week5/MindMap'
import ExerciseBreakdowns5 from './_components/week5/ExerciseBreakdowns'
import Lesson5 from './_components/week5/Lesson'
import Schedule5 from './_components/week5/Schedule'
import Quiz5 from './_components/week5/Quiz'

// Week 6 components
import Brief6 from './_components/week6/Brief'
import MindMap6 from './_components/week6/MindMap'
import ExerciseBreakdowns6 from './_components/week6/ExerciseBreakdowns'
import Lesson6 from './_components/week6/Lesson'
import Schedule6 from './_components/week6/Schedule'
import Quiz6 from './_components/week6/Quiz'

// Week 7 components
import Brief7 from './_components/week7/Brief'
import MindMap7 from './_components/week7/MindMap'
import ExerciseBreakdowns7 from './_components/week7/ExerciseBreakdowns'
import Lesson7 from './_components/week7/Lesson'
import Schedule7 from './_components/week7/Schedule'
import Quiz7 from './_components/week7/Quiz'

// Week 8 components
import Brief8 from './_components/week8/Brief'
import MindMap8 from './_components/week8/MindMap'
import ExerciseBreakdowns8 from './_components/week8/ExerciseBreakdowns'
import Lesson8 from './_components/week8/Lesson'
import Schedule8 from './_components/week8/Schedule'
import Quiz8 from './_components/week8/Quiz'
import CompleteWeek8 from './_components/week8/CompleteWeek'

// Shared CompleteWeek for weeks 2-7
import CompleteWeek from './_components/week1/CompleteWeek'

const WEEK_META: Record<number, { split: string; theme: string }> = {
  1: { split: 'Full Body', theme: 'Building the baseline' },
  2: { split: 'Full Body', theme: 'Do not quit here' },
  3: { split: 'Upper / Lower', theme: 'You earned this' },
  4: { split: 'Upper / Lower', theme: 'Stop guessing' },
  5: { split: 'Push / Pull / Legs', theme: 'You are ready for this now' },
  6: { split: 'Push / Pull / Legs', theme: 'Learn to coach yourself' },
  7: { split: 'Full Body · Deload', theme: 'Pull back to come forward' },
  8: { split: 'Push / Pull / Legs', theme: 'Your strongest week yet' },
}

export default async function WeekPage({ params }: { params: Promise<{ week: string }> }) {
  const { week: weekParam } = await params
  const weekNum = parseInt(weekParam)

  if (isNaN(weekNum) || weekNum < 1 || weekNum > 8) notFound()

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirect=/programme')

  const service = createSupabaseServiceClient()

  // Enforce week unlock logic
  if (weekNum > 1) {
    const { data: prevWeek } = await service
      .from('week_progress')
      .select('week_complete')
      .eq('user_id', user.id)
      .eq('week_number', weekNum - 1)
      .maybeSingle()

    if (!prevWeek?.week_complete) {
      redirect(`/programme/week/${weekNum - 1}`)
    }
  }

  const { data: progress } = await service
    .from('week_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('week_number', weekNum)
    .maybeSingle()

  // Fetch exercise logs for the current week
  const { data: rawLogs } = await service
    .from('exercise_logs')
    .select('session_label, exercise_name, weight_kg, reps')
    .eq('user_id', user.id)
    .eq('week_number', weekNum)

  // Deduplicate: keep last entry per session+exercise
  const seenKeys = new Set<string>()
  const initialLogs = (rawLogs ?? [])
    .reverse()
    .filter(row => {
      const key = `${row.session_label}__${row.exercise_name}`
      if (seenKeys.has(key)) return false
      seenKeys.add(key)
      return true
    })

  // For week 8: fetch programme start date and session count
  let programmeStartDate: string | null = null
  let sessionCount: number | null = null
  if (weekNum === 8) {
    const { data: week1Progress } = await service
      .from('week_progress')
      .select('created_at')
      .eq('user_id', user.id)
      .eq('week_number', 1)
      .maybeSingle()
    programmeStartDate = week1Progress?.created_at ?? null

    const { count } = await service
      .from('exercise_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
    sessionCount = count ?? null
  }

  const meta = WEEK_META[weekNum]

  function renderWeekSections() {
    const scheduleProps = { userId: user!.id, initialLogs }
    const quizProps = { userId: user!.id, initialPassed: progress?.quiz_passed ?? false }
    const completeProps = {
      userId: user!.id,
      weekNum,
      initialComplete: progress?.week_complete ?? false,
      initialQuizPassed: progress?.quiz_passed ?? false,
    }

    switch (weekNum) {
      case 1:
        return (
          <>
            <Section num={1} title="Brief"><Brief1 /></Section>
            <Section num={2} title="Mind Map"><MindMap1 /></Section>
            <Section num={3} title="Exercise Breakdowns"><ExerciseBreakdowns1 /></Section>
            <Section num={4} title="Week Lesson"><Lesson1 /></Section>
            <Section num={5} title="Clean Schedule"><Schedule1 userId={user!.id} initialLogs={initialLogs} /></Section>
            <Section num={6} title="Week 1 Check · Before you move on"><Quiz1 userId={user!.id} initialPassed={progress?.quiz_passed ?? false} /></Section>
            <Section num={7} title="Complete Week"><CompleteWeek1 {...completeProps} /></Section>
          </>
        )
      case 2:
        return (
          <>
            <Section num={1} title="Brief"><Brief2 /></Section>
            <Section num={2} title="Mind Map"><MindMap2 /></Section>
            <Section num={3} title="Exercise Breakdowns"><ExerciseBreakdowns2 /></Section>
            <Section num={4} title="Week Lesson"><Lesson2 /></Section>
            <Section num={5} title="Clean Schedule"><Schedule2 {...scheduleProps} /></Section>
            <Section num={6} title="Week 2 Check"><Quiz2 {...quizProps} /></Section>
            <Section num={7} title="Complete Week"><CompleteWeek {...completeProps} /></Section>
          </>
        )
      case 3:
        return (
          <>
            <Section num={1} title="Brief"><Brief3 /></Section>
            <Section num={2} title="Mind Map"><MindMap3 /></Section>
            <Section num={3} title="Exercise Breakdowns"><ExerciseBreakdowns3 /></Section>
            <Section num={4} title="Week Lesson"><Lesson3 /></Section>
            <Section num={5} title="Clean Schedule"><Schedule3 {...scheduleProps} /></Section>
            <Section num={6} title="Week 3 Check"><Quiz3 {...quizProps} /></Section>
            <Section num={7} title="Complete Week"><CompleteWeek {...completeProps} /></Section>
          </>
        )
      case 4:
        return (
          <>
            <Section num={1} title="Brief"><Brief4 /></Section>
            <Section num={2} title="Mind Map"><MindMap4 /></Section>
            <Section num={3} title="Exercise Breakdowns"><ExerciseBreakdowns4 /></Section>
            <Section num={4} title="Week Lesson"><Lesson4 /></Section>
            <Section num={5} title="Clean Schedule"><Schedule4 {...scheduleProps} /></Section>
            <Section num={6} title="Week 4 Check"><Quiz4 {...quizProps} /></Section>
            <Section num={7} title="Complete Week"><CompleteWeek {...completeProps} /></Section>
          </>
        )
      case 5:
        return (
          <>
            <Section num={1} title="Brief"><Brief5 /></Section>
            <Section num={2} title="Mind Map"><MindMap5 /></Section>
            <Section num={3} title="Exercise Breakdowns"><ExerciseBreakdowns5 /></Section>
            <Section num={4} title="Week Lesson"><Lesson5 /></Section>
            <Section num={5} title="Clean Schedule"><Schedule5 {...scheduleProps} /></Section>
            <Section num={6} title="Week 5 Check"><Quiz5 {...quizProps} /></Section>
            <Section num={7} title="Complete Week"><CompleteWeek {...completeProps} /></Section>
          </>
        )
      case 6:
        return (
          <>
            <Section num={1} title="Brief"><Brief6 /></Section>
            <Section num={2} title="Mind Map"><MindMap6 /></Section>
            <Section num={3} title="Exercise Breakdowns"><ExerciseBreakdowns6 /></Section>
            <Section num={4} title="Week Lesson"><Lesson6 /></Section>
            <Section num={5} title="Clean Schedule"><Schedule6 {...scheduleProps} /></Section>
            <Section num={6} title="Week 6 Check"><Quiz6 {...quizProps} /></Section>
            <Section num={7} title="Complete Week"><CompleteWeek {...completeProps} /></Section>
          </>
        )
      case 7:
        return (
          <>
            <Section num={1} title="Brief"><Brief7 /></Section>
            <Section num={2} title="Mind Map"><MindMap7 /></Section>
            <Section num={3} title="Exercise Breakdowns"><ExerciseBreakdowns7 /></Section>
            <Section num={4} title="Week Lesson"><Lesson7 /></Section>
            <Section num={5} title="Clean Schedule"><Schedule7 {...scheduleProps} /></Section>
            <Section num={6} title="Week 7 Check"><Quiz7 {...quizProps} /></Section>
            <Section num={7} title="Complete Week"><CompleteWeek {...completeProps} /></Section>
          </>
        )
      case 8:
        return (
          <>
            <Section num={1} title="Brief"><Brief8 /></Section>
            <Section num={2} title="Mind Map"><MindMap8 /></Section>
            <Section num={3} title="Exercise Breakdowns"><ExerciseBreakdowns8 /></Section>
            <Section num={4} title="Week Lesson"><Lesson8 /></Section>
            <Section num={5} title="Clean Schedule"><Schedule8 {...scheduleProps} /></Section>
            <Section num={6} title="Week 8 Check"><Quiz8 {...quizProps} /></Section>
            <Section num={7} title="Complete Programme">
              <CompleteWeek8
                userId={user!.id}
                initialComplete={progress?.week_complete ?? false}
                initialQuizPassed={progress?.quiz_passed ?? false}
                programmeStartDate={programmeStartDate}
                sessionCount={sessionCount ?? undefined}
              />
            </Section>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ marginBottom: 48 }}>
        <p style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: 10,
        }}>
          Week {weekNum} · {meta.split}
        </p>
        <h1 className="font-display" style={{
          fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 600, letterSpacing: '-0.02em',
          lineHeight: 1.05, marginBottom: 12,
        }}>
          {meta.theme}
        </h1>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Pill done={progress?.session_a_done} label="Session A" />
          <Pill done={progress?.session_b_done} label="Session B" />
          {weekNum >= 3 && weekNum <= 4 && <Pill done={progress?.session_c_done} label="Session C" />}
          {weekNum >= 3 && weekNum <= 4 && <Pill done={null} label="Session D" />}
          {(weekNum === 1 || weekNum === 2 || weekNum === 7) && <Pill done={progress?.session_c_done} label="Session C" />}
          <Pill done={progress?.quiz_passed} label="Quiz" />
          <Pill done={progress?.week_complete} label={weekNum === 8 ? 'Programme Complete' : 'Complete'} accent />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {renderWeekSections()}
      </div>
    </div>
  )
}

function Section({ num, title, children }: { num: number; title: string; children?: React.ReactNode }) {
  return (
    <section style={{ borderBottom: '1px solid var(--paper-edge)', padding: '40px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, color: 'var(--ink-muted)',
          letterSpacing: '0.08em', minWidth: 20, fontFamily: 'var(--mono)',
        }}>
          {String(num).padStart(2, '0')}
        </span>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em', fontFamily: 'var(--serif)' }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

function Pill({ done, label, accent }: { done?: boolean | null; label: string; accent?: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 12px', borderRadius: 2, fontSize: 11, fontWeight: 500,
      fontFamily: 'var(--mono)', letterSpacing: '0.08em',
      background: done ? (accent ? 'var(--accent)' : 'rgba(184,84,58,0.08)') : 'var(--paper-deep)',
      color: done ? (accent ? 'var(--paper)' : 'var(--accent)') : 'var(--ink-muted)',
      border: `1px solid ${done ? (accent ? 'var(--accent)' : 'rgba(184,84,58,0.25)') : 'var(--paper-edge)'}`,
    }}>
      {done ? '✓' : '·'} {label}
    </span>
  )
}
