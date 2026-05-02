import { notFound, redirect } from 'next/navigation'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

const WEEK_META: Record<number, { split: string; theme: string }> = {
  1: { split: 'Full Body', theme: 'Building the baseline' },
  2: { split: 'Full Body', theme: 'Progressing with intent' },
  3: { split: 'Upper / Lower', theme: 'The split begins' },
  4: { split: 'Upper / Lower', theme: 'Pushing your capacity' },
  5: { split: 'Push Pull Legs', theme: 'Mind-muscle connection' },
  6: { split: 'Push Pull Legs', theme: 'Volume and recovery' },
  7: { split: 'PPL Advanced', theme: 'The deload' },
  8: { split: 'PPL Advanced', theme: 'What comes next' },
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

  const meta = WEEK_META[weekNum]

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 10 }}>
          Week {weekNum} · {meta.split}
        </p>
        <h1 className="font-display" style={{ fontSize: 'clamp(36px, 6vw, 60px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 12 }}>
          {meta.theme}
        </h1>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Pill done={progress?.session_a_done} label="Session A" />
          <Pill done={progress?.session_b_done} label="Session B" />
          <Pill done={progress?.session_c_done} label="Session C" />
          <Pill done={progress?.quiz_passed} label="Quiz" />
          <Pill done={progress?.week_complete} label="Complete" accent />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* ── Section 1: Brief ──────────────────────────────── */}
        <Section num={1} title="Brief">
          {/* TODO: Week brief — 2–3 sentence overview of this week's focus */}
        </Section>

        {/* ── Section 2: Mind Map ───────────────────────────── */}
        <Section num={2} title="Mind Map">
          {/* TODO: Visual mind map for the key concept this week */}
        </Section>

        {/* ── Section 3: Exercise Breakdowns ───────────────── */}
        <Section num={3} title="Exercise Breakdowns">
          {/* TODO: Per-exercise cue cards (name, cue, common mistake) */}
        </Section>

        {/* ── Section 4: Week Lesson ────────────────────────── */}
        <Section num={4} title="Week Lesson">
          {/* TODO: The educational lesson — the WHY behind this week's training */}
        </Section>

        {/* ── Section 5: Schedule + Copy-Paste ─────────────── */}
        <Section num={5} title="Clean Schedule">
          {/* TODO: 3-session schedule table (A/B/C) + copy-paste text block */}
        </Section>

        {/* ── Section 6: Quiz ───────────────────────────────── */}
        <Section num={6} title="Quiz">
          {/* TODO: 3–5 question quiz — on pass, set quiz_passed = true in week_progress */}
        </Section>

        {/* ── Section 7: Complete Week ─────────────────────── */}
        <Section num={7} title="Complete Week">
          {/* TODO: Complete Week button — sets week_complete = true, unlocks next week */}
          {/*       Show only when quiz_passed = true */}
          {/*       On complete: if weekNum < 8, show "Week N+1 unlocked" banner */}
          {/*       On complete week 8: show "Programme complete" celebration */}
        </Section>
      </div>
    </div>
  )
}

function Section({ num, title, children }: { num: number; title: string; children?: React.ReactNode }) {
  return (
    <section style={{
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '40px 0',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(238,234,228,0.2)', letterSpacing: '0.08em', minWidth: 20 }}>
          {String(num).padStart(2, '0')}
        </span>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#EEEAE4', letterSpacing: '-0.01em' }}>
          {title}
        </h2>
      </div>
      {children ?? (
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.08)',
          borderRadius: 12, padding: '32px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <p style={{ fontSize: 13, color: 'rgba(238,234,228,0.2)', fontStyle: 'italic' }}>
            Content coming — Week {/* parent infers */} · Section {num}: {title}
          </p>
        </div>
      )}
    </section>
  )
}

function Pill({ done, label, accent }: { done?: boolean | null; label: string; accent?: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 500,
      background: done ? (accent ? '#4A7C59' : 'rgba(74,124,89,0.2)') : 'rgba(255,255,255,0.06)',
      color: done ? (accent ? '#fff' : '#4A7C59') : 'rgba(238,234,228,0.35)',
      border: `1px solid ${done ? (accent ? '#4A7C59' : 'rgba(74,124,89,0.3)') : 'rgba(255,255,255,0.08)'}`,
    }}>
      {done ? '✓' : '·'} {label}
    </span>
  )
}
