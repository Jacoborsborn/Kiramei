'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

interface Props {
  userId: string
  initialComplete: boolean
  initialQuizPassed: boolean
  programmeStartDate?: string | null
  sessionCount?: number
}

export default function CompleteWeek({ userId, initialComplete, initialQuizPassed, programmeStartDate, sessionCount }: Props) {
  const router = useRouter()
  const [complete, setComplete] = useState(initialComplete)
  const [quizPassed, setQuizPassed] = useState(initialQuizPassed)
  const [loading, setLoading] = useState(false)
  const [celebrated, setCelebrated] = useState(false)

  useEffect(() => {
    if (!initialQuizPassed) {
      const supabase = createSupabaseBrowserClient()
      supabase.from('week_progress').select('quiz_passed, week_complete').eq('user_id', userId).eq('week_number', 8).maybeSingle()
        .then(({ data }) => {
          if (data?.quiz_passed) setQuizPassed(true)
          if (data?.week_complete) setComplete(true)
        })
    }
  }, [])

  async function handleComplete() {
    if (!quizPassed || complete || loading) return
    setLoading(true)
    const supabase = createSupabaseBrowserClient()
    await supabase.from('week_progress').upsert({
      user_id: userId, week_number: 8, week_complete: true, completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,week_number' })
    // Mark programme complete on profile
    await supabase.from('profiles').update({ programme_complete: true }).eq('id', userId)
    setComplete(true)
    setCelebrated(true)
    setLoading(false)
  }

  if (!quizPassed) {
    return (
      <div style={{ padding: 24, borderRadius: 12, border: '1px dashed var(--paper-edge)', background: 'var(--paper-deep)' }}>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', textAlign: 'center' }}>Complete the quiz above to unlock this button.</p>
      </div>
    )
  }

  if (celebrated || (complete && !loading)) {
    // Full programme completion screen
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    const startFormatted = programmeStartDate
      ? new Date(programmeStartDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : '—'

    return (
      <div style={{ textAlign: 'center', padding: '48px 24px', borderRadius: 16, background: 'rgba(184,84,58,0.06)', border: '1px solid rgba(184,84,58,0.15)', animation: 'fadeIn 0.5s ease' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 16 }}>PROGRAMME COMPLETE</p>
        <h2 style={{ fontSize: 'clamp(40px,8vw,72px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 8, fontFamily: 'var(--serif)' }}>YOU DID IT.</h2>
        <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginBottom: 40 }}>8 weeks. Every method. Total understanding.</p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, maxWidth: 480, margin: '0 auto 40px', textAlign: 'left' }}>
          {[
            { label: 'Started', value: startFormatted },
            { label: 'Completed', value: today },
            { label: 'Weeks', value: '8 / 8' },
            { label: 'Sessions logged', value: sessionCount != null ? String(sessionCount) : '—' },
            { label: 'Personal bests', value: 'Week 8' },
            { label: 'Next step', value: 'Build your plan' },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--paper-edge)', borderRadius: 10, padding: '14px 16px' }}>
              <p style={{ fontSize: 10, color: 'var(--ink-muted)', letterSpacing: '0.1em', marginBottom: 4 }}>{label.toUpperCase()}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{value}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--ink-soft)', maxWidth: 540, margin: '0 auto 40px' }}>
          Most people who buy a training programme never finish it. You did. And you did not just follow a plan — you learned how to train. The difference between those two things is the difference between needing another programme in eight weeks and never needing one again.
        </p>

        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 32, fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
          The gym is yours now. What you build next is up to you.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/template" style={{ display: 'inline-block', padding: '14px 28px', borderRadius: 10, background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: '0.04em', textDecoration: 'none' }}>
            BUILD YOUR NEXT PROGRAMME
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText('8 weeks of Kira Mei\'s Educational Fitness programme. Done. @kiramei')
                .then(() => alert('Copied to clipboard'))
            }}
            style={{ padding: '14px 28px', borderRadius: 10, background: 'transparent', border: '1px solid var(--paper-edge)', color: 'var(--ink)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            SHARE YOUR ACHIEVEMENT
          </button>
        </div>

        <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }`}</style>
      </div>
    )
  }

  return (
    <button
      onClick={handleComplete}
      disabled={loading}
      style={{
        width: '100%', padding: '18px 24px', borderRadius: 12,
        fontSize: 15, fontWeight: 700, letterSpacing: '0.04em',
        cursor: loading ? 'default' : 'pointer', border: 'none',
        background: 'var(--accent)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        transition: 'opacity 0.2s', opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? 'Saving…' : 'COMPLETE THE PROGRAMME →'}
    </button>
  )
}
