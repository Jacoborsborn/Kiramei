import { notFound, redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NUTRITION_WEEKS } from '@/app/lib/nutrition-curriculum'
import { NutBrief, NutMindMap, NutLibrary, NutLesson, NutMealPlan } from './_components/shared/NutSections'
import { NutQuiz, NutReflection, NutComplete, NutPlate } from './_components/shared/NutInteractive'
import ScrollProgress from './_components/shared/ScrollProgress'
import {
  TdeeTool, MacrosTool, ProteinCompareTool,
  MealPrepTool, DeficitTool, SurplusTool, PlanBuilderTool,
} from '../../_components/Tools'

const TOOL_MAP: Record<string, React.ComponentType> = {
  'tdee': TdeeTool,
  'macros': MacrosTool,
  'protein-compare': ProteinCompareTool,
  'meal-prep': MealPrepTool,
  'deficit': DeficitTool,
  'surplus': SurplusTool,
  'plan-builder': PlanBuilderTool,
}

export default async function WeekPage({ params }: { params: Promise<{ week: string }> }) {
  const { week: weekParam } = await params
  const weekNum = parseInt(weekParam)
  if (isNaN(weekNum) || weekNum < 1 || weekNum > 8) notFound()

  const data = NUTRITION_WEEKS[weekNum - 1]
  if (!data) notFound()

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirect=/nutrition-portal')

  // Week gating: require previous week complete
  if (weekNum > 1) {
    const { data: prev } = await supabase
      .from('week_progress')
      .select('week_complete')
      .eq('user_id', user.id)
      .eq('week_number', weekNum - 1)
      .maybeSingle()
    if (!prev?.week_complete) redirect(`/nutrition-portal/week/${weekNum - 1}`)
  }

  const { data: progress } = await supabase
    .from('week_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('week_number', weekNum)
    .maybeSingle()

  const Tool = data.tool ? TOOL_MAP[data.tool] : null

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <ScrollProgress />

      {/* Page header */}
      <header style={{ marginBottom: 48 }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: 20 }}>
          <a href="/nutrition-portal" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Nutrition</a>
          <span>/</span>
          <span>Week {String(weekNum).padStart(2, '0')}</span>
        </div>

        {/* Tag chip */}
        <span style={{ display: 'inline-block', background: 'var(--accent)', color: 'var(--paper)', padding: '5px 10px', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>
          Week {String(weekNum).padStart(2, '0')} · {data.phase}
        </span>

        {/* H1 */}
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 14 }}>
          {data.hero.lead}<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>{data.hero.emphasis}</em>
        </h1>

        {/* Lede */}
        <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 600, marginBottom: 24 }}>
          {data.lede}
        </p>

        {/* Hook banner — taped note */}
        <div style={{ position: 'relative', padding: '20px 24px 20px 32px', background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', marginBottom: 28, maxWidth: 600 }}>
          <div style={{ position: 'absolute', top: 0, left: 20, width: 36, height: 14, background: 'rgba(184,144,88,0.35)', borderRadius: 1 }} />
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--serif)', fontSize: 40, color: 'var(--accent)', lineHeight: 1, opacity: 0.4 }}>{data.hook.icon}</span>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.65, color: 'var(--ink)', fontStyle: 'italic' }} dangerouslySetInnerHTML={{ __html: data.hook.text }} />
        </div>

        {/* Stats strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid var(--paper-edge)', borderBottom: '1px solid var(--paper-edge)', marginBottom: 24 }} className="nut-stats-bar">
          {data.stats.map((s, i) => (
            <div key={i} style={{ padding: '16px 0', paddingLeft: i > 0 ? 16 : 0, borderRight: i < 3 ? '1px solid var(--paper-edge)' : 'none' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: 4 }}>{s.l}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 500 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Status pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Pill done={progress?.quiz_passed} label="Quiz" />
          <Pill done={progress?.week_complete} label={weekNum === 8 ? 'Course Complete' : 'Complete'} accent />
        </div>
      </header>

      <style>{`
        @media(max-width:600px){ .nut-stats-bar{grid-template-columns:1fr 1fr!important} .nut-stats-bar>div:nth-child(2){border-right:none!important} .nut-stats-bar>div:nth-child(3),.nut-stats-bar>div:nth-child(4){padding-left:0!important} .nut-stats-bar>div:nth-child(4){padding-left:16px!important} }
      `}</style>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

        <Section num={1} title="Brief">
          <NutBrief brief={data.brief} />
        </Section>

        <Section num={2} title="Mind Map">
          <NutMindMap mindMap={data.mindMap} weekNum={weekNum} />
        </Section>

        <Section num={3} title="Food Library">
          <NutLibrary library={data.library} />
        </Section>

        <Section num={4} title="Week Lesson">
          <NutLesson lesson={data.lesson} />
        </Section>

        {Tool && (
          <Section num={5} title="This Week's Tool">
            <Tool />
          </Section>
        )}

        {data.plate && (
          <Section num={6} title="Plate Builder">
            <NutPlate title={data.plate.title} caption={data.plate.caption} />
          </Section>
        )}

        {data.mealPlan && (
          <Section num={data.plate ? 7 : 6} title="Meal Plan">
            <NutMealPlan mealPlan={data.mealPlan} />
          </Section>
        )}

        <Section num={data.plate || data.mealPlan ? 8 : 6} title={`Week ${String(weekNum).padStart(2, '0')} Check`}>
          <NutQuiz
            questions={data.quiz}
            weekNum={weekNum}
            userId={user.id}
            initialPassed={progress?.quiz_passed ?? false}
          />
        </Section>

        <Section num={data.plate || data.mealPlan ? 9 : 7} title="Reflection">
          <NutReflection
            prompt={data.reflection}
            weekNum={weekNum}
            userId={user.id}
          />
        </Section>

        <section style={{ padding: '40px 0' }}>
          <NutComplete
            weekNum={weekNum}
            userId={user.id}
            initialComplete={progress?.week_complete ?? false}
            initialQuizPassed={progress?.quiz_passed ?? false}
          />
        </section>

      </div>
    </div>
  )
}

function Section({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <section style={{ borderBottom: '1px solid var(--paper-edge)', padding: '40px 0' }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 24 }}>
        § {num}.0 · {title}
      </p>
      {children}
    </section>
  )
}

function Pill({ done, label, accent }: { done?: boolean | null; label: string; accent?: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px',
      fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
      background: done ? (accent ? 'var(--accent)' : 'rgba(184,84,58,0.07)') : 'var(--paper-deep)',
      color: done ? (accent ? 'var(--paper)' : 'var(--accent)') : 'var(--ink-muted)',
      border: `1px solid ${done ? (accent ? 'var(--accent)' : 'rgba(184,84,58,0.2)') : 'var(--paper-edge)'}`,
    }}>
      {done ? '✓' : '·'} {label}
    </span>
  )
}
