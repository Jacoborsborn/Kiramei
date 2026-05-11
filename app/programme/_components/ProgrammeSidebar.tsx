'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

const WEEK_SPLITS = ['Full Body', 'Full Body', 'Upper / Lower', 'Upper / Lower', 'PPL', 'PPL', 'PPL Advanced', 'PPL Advanced']

interface WeekState {
  complete: boolean
  unlocked: boolean
}

export default function ProgrammeSidebar({ firstName, userEmail, hasNutrition = false }: { firstName: string; userEmail: string; hasNutrition?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [weekStates, setWeekStates] = useState<WeekState[]>(Array(8).fill({ complete: false, unlocked: false }))
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase
        .from('week_progress')
        .select('week_number, week_complete')
        .eq('user_id', user.id)
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
  }, [pathname])

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
      <div style={{ padding: '0 24px 20px', borderBottom: '1px solid var(--paper-edge)', marginBottom: 8 }}>
        <a href="/" style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', textDecoration: 'none' }}>
          kiramei.co.uk
        </a>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: 16, marginBottom: 6 }}>
          Training Blueprint
        </p>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>{firstName}</p>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.06em' }}>{userEmail}</p>
      </div>

      {/* Mode switcher — bundle holders only */}
      {hasNutrition && (
        <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--paper-edge)' }}>
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
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--paper-edge)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 8 }}>
          <span>Progress</span>
          <span>{completedCount}/8 weeks</span>
        </div>
        <div style={{ height: 6, background: 'var(--paper)', border: '1px solid var(--paper-edge)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--accent)', width: `${progressPct}%`, transition: 'width 0.4s ease', borderRadius: 3 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)', marginTop: 6 }}>
          <span>Wk 01</span>
          <span>{progressPct}%</span>
          <span>Wk 08</span>
        </div>
      </div>

      {/* Week list */}
      <div style={{ flex: 1, padding: '12px', overflowY: 'auto' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', padding: '6px 12px 10px' }}>
          Programme
        </p>
        {weekStates.map((ws, i) => {
          const weekNum = i + 1
          const isActive = currentWeek === weekNum
          const isLocked = !ws.unlocked

          if (isLocked) {
            return (
              <div key={weekNum} title={`Complete week ${weekNum - 1} first`} style={{
                display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10,
                padding: '10px 12px', borderRadius: 2,
                cursor: 'not-allowed', opacity: 0.35,
              }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-muted)', marginTop: 1 }}>🔒</span>
                <div>
                  <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.2 }}>Week {String(weekNum).padStart(2, '0')}</p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)', marginTop: 2 }}>{WEEK_SPLITS[i]}</p>
                </div>
              </div>
            )
          }

          return (
            <Link
              key={weekNum}
              href={`/programme/week/${weekNum}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'grid', gridTemplateColumns: '28px 1fr', gap: 10,
                padding: '10px 12px', borderRadius: 2, textDecoration: 'none',
                background: isActive ? 'rgba(184,84,58,0.07)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                transition: 'background 0.15s',
              }}
            >
              <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: ws.complete ? 'var(--accent)' : isActive ? 'var(--accent)' : 'var(--paper-edge)', marginTop: 1, fontWeight: 600 }}>
                {ws.complete ? '✓' : isActive ? '◆' : '◇'}
              </span>
              <div>
                <p style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? 'var(--ink)' : 'var(--ink-soft)', lineHeight: 1.2 }}>
                  Week {String(weekNum).padStart(2, '0')}
                </p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)', marginTop: 2 }}>{WEEK_SPLITS[i]}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--paper-edge)' }}>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          style={{
            width: '100%', padding: '10px 12px', background: 'transparent',
            border: 'none', borderRadius: 2, cursor: 'pointer',
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--ink-muted)', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          <span>↩</span>
          {signingOut ? 'Signing out…' : 'Sign out'}
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <nav style={{
        display: 'none', position: 'fixed', top: 0, left: 0, bottom: 0, width: 240,
        background: 'var(--paper-deep)', borderRight: '1px solid var(--paper-edge)',
        flexDirection: 'column', padding: '28px 0',
        zIndex: 50, overflowY: 'auto',
      }} className="programme-sidebar">
        {sidebarContent}
      </nav>

      {/* Mobile top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(242,237,226,0.92)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--paper-edge)',
        padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }} className="programme-mobile-header">
        <a href="/" style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none', letterSpacing: '-0.01em' }}>
          kira mei
        </a>
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--ink)', fontSize: 18 }}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(31,27,22,0.5)' }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: 280,
              background: 'var(--paper-deep)', padding: '28px 0',
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
          .programme-main { margin-left: 240px !important; }
        }
      `}</style>
    </>
  )
}
