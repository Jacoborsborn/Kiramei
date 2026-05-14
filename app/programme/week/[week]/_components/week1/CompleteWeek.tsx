'use client'

import { useState, useEffect } from 'react'

interface Props {
  userId: string
  weekNum: number
  initialComplete: boolean
  initialQuizPassed: boolean
}

export default function CompleteWeek({ userId, weekNum, initialComplete, initialQuizPassed }: Props) {
  const [complete, setComplete] = useState(initialComplete)
  const [quizPassed, setQuizPassed] = useState(initialQuizPassed)
  const [loading, setLoading] = useState(false)
  const [celebrated, setCelebrated] = useState(false)
  const [saveError, setSaveError] = useState(false)

  // Allow the quiz component on this page to signal a pass
  useEffect(() => {
    function handleQuizPass() {
      setQuizPassed(true)
    }
    window.addEventListener('quiz:passed', handleQuizPass)
    return () => window.removeEventListener('quiz:passed', handleQuizPass)
  }, [])

  // Re-check server state on mount if quiz wasn't passed in server props
  useEffect(() => {
    if (!initialQuizPassed) {
      fetch(`/api/programme/week-state?weekNum=${weekNum}`)
        .then(r => r.json())
        .then(data => {
          if (data?.quiz_passed) setQuizPassed(true)
          if (data?.week_complete) setComplete(true)
        })
        .catch(() => null)
    }
  }, [])

  async function handleComplete() {
    if (!quizPassed || complete || loading) return
    setLoading(true)

    const res = await fetch('/api/programme/complete-week', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weekNum }),
    })

    if (!res.ok) {
      setLoading(false)
      setSaveError(true)
      return
    }

    // Fire lifecycle email
    if (weekNum === 4) {
      fetch('/api/email/week-4-halfway', { method: 'POST' }).catch(() => null)
    } else {
      fetch('/api/email/week-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weekNum }),
      }).catch(() => null)
    }

    setComplete(true)
    setCelebrated(true)
    setLoading(false)

    if (weekNum < 8) {
      setTimeout(() => {
        window.location.href = `/programme/week/${weekNum + 1}`
      }, 2200)
    }
  }

  if (!quizPassed) {
    return (
      <div style={{
        padding: '24px', borderRadius: 12,
        border: '1px dashed var(--paper-edge)',
        background: 'var(--paper-deep)',
      }}>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', textAlign: 'center' }}>
          Complete the quiz above to unlock this button.
        </p>
      </div>
    )
  }

  if (celebrated) {
    return (
      <div style={{
        padding: '28px 24px', borderRadius: 12, textAlign: 'center',
        background: 'rgba(184,84,58,0.07)', border: '1px solid rgba(184,84,58,0.15)',
        animation: 'fadeIn 0.4s ease',
      }}>
        <p style={{
          fontSize: 16, fontWeight: 600, color: 'var(--accent)',
          letterSpacing: '-0.01em', marginBottom: 8,
        }}>
          Week 1 done.
        </p>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          The pattern is in your body now. Week 2 builds on it.
        </p>
        {weekNum < 8 && (
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 12 }}>
            Taking you to Week {weekNum + 1}…
          </p>
        )}
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`}</style>
      </div>
    )
  }

  if (complete) {
    return (
      <div style={{
        padding: '20px 24px', borderRadius: 12,
        background: 'rgba(184,84,58,0.06)', border: '1px solid rgba(184,84,58,0.12)',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <span style={{ fontSize: 20, color: 'var(--accent)' }}>✓</span>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>Week {weekNum} complete</p>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
            {weekNum < 8 ? `Week ${weekNum + 1} is unlocked in the sidebar.` : 'Programme complete.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {saveError && (
        <p style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 12, textAlign: 'center' }}>
          Something went wrong — please try again or reload the page.
        </p>
      )}
    <button
      onClick={() => { setSaveError(false); handleComplete() }}
      disabled={loading}
      style={{
        width: '100%', padding: '18px 24px', borderRadius: 12,
        fontSize: 15, fontWeight: 700, letterSpacing: '0.04em',
        cursor: loading ? 'default' : 'pointer', border: 'none',
        background: 'var(--accent)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        transition: 'opacity 0.2s',
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? (
        'Saving…'
      ) : (
        <>
          COMPLETE WEEK {weekNum}
          {weekNum < 8 && <span style={{ opacity: 0.8 }}>· UNLOCK WEEK {weekNum + 1} →</span>}
        </>
      )}
    </button>
    </>
  )
}
