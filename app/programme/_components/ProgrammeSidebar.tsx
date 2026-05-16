'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

const WEEK_NAMES = [
  'Full Body',
  'Full Body II',
  'Upper / Lower',
  'Upper / Lower II',
  'Push Pull Legs',
  'Push Pull Legs II',
  'PPL Advanced',
  'Build your own',
]
const WEEK_PHASES = [
  'Foundations',
  'Foundations',
  'Specialisation',
  'Specialisation',
  'Refinement',
  'Refinement',
  'Independence',
  'Final week',
]

interface WeekState {
  complete: boolean
  unlocked: boolean
}

export default function ProgrammeSidebar({ firstName, userEmail, hasNutrition = false, isFounder = false }: { firstName: string; userEmail: string; hasNutrition?: boolean; isFounder?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [weekStates, setWeekStates] = useState<WeekState[]>(
    isFounder
      ? Array(8).fill({ complete: false, unlocked: true })
      : Array(8).fill({ complete: false, unlocked: false })
  )
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    if (isFounder) {
      setWeekStates(Array(8).fill({ complete: false, unlocked: true }))
      return
    }
    const supabase = createSupabaseBrowserClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase
        .from('week_progress')
        .select('week_number, week_complete')
        .eq('user_id', user.id)
        .eq('programme_type', 'training')
        .order('week_number')

      const states: WeekState[] = Array.from({ length: 8 }, (_, i) => {
        const row = data?.find(r => r.week_number === i + 1)
        const prevComplete = i === 0 || data?.find(r => r.week_number === i)?.week_complete === true
        return {
          complete: row?.week_complete ?? false,
          unlocked: i === 0 || prevComplete,
        }
      })
      setWeekStates(states)
      setCompletedCount(states.filter(s => s.complete).length)
    })
  }, [pathname, isFounder])

  async function handleSignOut() {
    setSigningOut(true)
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  function activeWeek() {
    const m = pathname.match(/\/programme\/week\/(\d+)/)
    return m ? parseInt(m[1]) : null
  }
  const currentWeek = activeWeek()
  const progressPct = Math.round((completedCount / 8) * 100)

  const sidebarContent = (
    <>
      {/* Header */}
      <div style={{ padding: '0 28px 20px', borderBottom: '1px solid var(--paper-edge)', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase' }}>
            Training Blueprint
          </p>
          <a
            href="/account"
            title="Account"
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--ink)', color: 'var(--paper)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
              textDecoration: 'none', flexShrink: 0,
            }}
          >
            {firstName.charAt(0).toUpperCase()}
          </a>
        </div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 6, lineHeight: 1.1, color: 'var(--ink)' }}>
          Your eight weeks.
        </h2>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
          {firstName} · Programme
        </p>
      </div>

      {/* Mode switcher — bundle holders only */}
      {hasNutrition && (
        <div style={{ padding: '12px 28px', borderBottom: '1px solid var(--paper-edge)' }}>
          <div style={{ display: 'flex', background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', borderRadius: 2, padding: 3, gap: 3 }}>
            <div style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink)', padding: '7px 8px', borderRadius: 2, background: 'var(--paper)', boxShadow: '0 1px 3px rgba(31,27,22,0.08)' }}>
              Training
            </div>
            <Link href="/nutrition-portal" style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', padding: '7px 8px', borderRadius: 2, textDecoration: 'none' }}>
              Nutrition
            </Link>
          </div>
        </div>
      )}

      {/* Progress */}
      <div style={{ padding: '16px 28px', borderBottom: '1px solid var(--paper-edge)' }}>
        <div style={{ height: 6, background: 'var(--paper)', border: '1px solid var(--paper-edge)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--accent)', width: `${progressPct}%`, transition: 'width 0.4s ease' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-muted)', marginTop: 8, textTransform: 'uppercase' }}>
          <span>Week {String(Math.max(completedCount, 1)).padStart(2, '0')} of 08</span>
          <span>{progressPct}% complete</span>
        </div>
      </div>

      {/* Week list */}
      <div style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginBottom: 12, padding: '0 12px' }}>
          Curriculum
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {weekStates.map((ws, i) => {
            const weekNum = i + 1
            const isActive = currentWeek === weekNum
            const isLocked = !ws.unlocked

            if (isLocked) {
              return (
                <li key={weekNum}>
                  <div
                    title={`Complete week ${weekNum - 1} first`}
                    style={{
                      display: 'grid', gridTemplateColumns: '36px 1fr auto',
                      gap: 12, alignItems: 'center',
                      padding: '11px 12px', borderRadius: 4,
                      opacity: 0.45, cursor: 'not-allowed',
                    }}
                  >
                    <span style={{
                      width: 32, height: 32, flexShrink: 0,
                      border: '1.5px dashed var(--paper-edge)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--paper)',
                    }}>
                      <svg width="11" height="13" viewBox="0 0 11 13" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ color: 'var(--ink-muted)' }}>
                        <rect x="1.5" y="6" width="8" height="6" rx="0.5" />
                        <path d="M3 6 V 4 a 2.5 2.5 0 0 1 5 0 V 6" />
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 500, lineHeight: 1.15, color: 'var(--ink)' }}>{WEEK_NAMES[i]}</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-muted)', marginTop: 2, textTransform: 'uppercase' }}>
                        Wk {String(weekNum).padStart(2, '0')} · {WEEK_PHASES[i]}
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                      Locked
                    </span>
                  </div>
                </li>
              )
            }

            return (
              <li key={weekNum}>
                <Link
                  href={`/programme/week/${weekNum}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'grid', gridTemplateColumns: '36px 1fr auto',
                    gap: 12, alignItems: 'center',
                    padding: '11px 12px', borderRadius: 4,
                    textDecoration: 'none', color: 'var(--ink)',
                    border: `1px solid ${isActive ? 'var(--ink)' : 'transparent'}`,
                    background: isActive ? 'var(--paper)' : 'transparent',
                    position: 'relative',
                    transition: 'background 0.15s, border-color 0.15s',
                  }}
                >
                  {isActive && (
                    <span style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                      background: 'var(--accent)', borderRadius: '4px 0 0 4px',
                    }} />
                  )}
                  <span style={{
                    width: 32, height: 32, flexShrink: 0,
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.04em', fontWeight: 600,
                    border: `1.5px solid ${ws.complete ? 'var(--ink)' : isActive ? 'var(--accent)' : 'var(--ink)'}`,
                    background: ws.complete ? 'var(--ink)' : isActive ? 'var(--accent)' : 'var(--paper)',
                    color: (ws.complete || isActive) ? 'var(--paper)' : 'var(--ink)',
                  }}>
                    {ws.complete ? '✓' : String(weekNum).padStart(2, '0')}
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 500, lineHeight: 1.15 }}>{WEEK_NAMES[i]}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-muted)', marginTop: 2, textTransform: 'uppercase' }}>
                      Wk {String(weekNum).padStart(2, '0')} · {WEEK_PHASES[i]}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: isActive ? 'var(--accent)' : ws.complete ? 'var(--ink-muted)' : 'transparent',
                    fontWeight: isActive ? 600 : 400,
                  }}>
                    {isActive ? 'Now' : ws.complete ? 'Done' : '·'}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Footer */}
      <div style={{ padding: '16px 28px', borderTop: '1px solid var(--paper-edge)' }}>
        <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-soft)', marginBottom: 12 }}>
          Weeks unlock as you complete the previous one. Take your time — this isn&apos;t a race.
        </p>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em',
            color: 'var(--accent)', textTransform: 'uppercase',
          }}
        >
          {signingOut ? 'Signing out…' : '↩ Sign out'}
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <nav
        style={{
          display: 'none', position: 'fixed', top: 0, left: 0, bottom: 0, width: 320,
          background: 'var(--paper-deep)', borderRight: '1px solid var(--paper-edge)',
          flexDirection: 'column', padding: '32px 0',
          zIndex: 50, overflowY: 'auto',
        }}
        className="programme-sidebar"
      >
        {sidebarContent}
      </nav>

      {/* Mobile top bar */}
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(242,237,226,0.92)', backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--paper-edge)',
          padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
        className="programme-mobile-header"
      >
        <a href="/" style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none', letterSpacing: '-0.01em' }}>
          kira mei
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a
            href="/account"
            style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'var(--ink)', color: 'var(--paper)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            {firstName.charAt(0).toUpperCase()}
          </a>
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--ink)', fontSize: 18 }}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(31,27,22,0.5)' }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: 300,
              background: 'var(--paper-deep)', padding: '32px 0',
              display: 'flex', flexDirection: 'column', overflowY: 'auto',
              borderRight: '1px solid var(--paper-edge)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .programme-sidebar { display: flex !important; }
          .programme-mobile-header { display: none !important; }
          .programme-main { margin-left: 320px !important; }
        }
      `}</style>
    </>
  )
}
