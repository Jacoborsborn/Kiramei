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

export default function ProgrammeSidebar({ firstName, userEmail }: { firstName: string; userEmail: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [weekStates, setWeekStates] = useState<WeekState[]>(Array(8).fill({ complete: false, unlocked: false }))
  const [streak, setStreak] = useState(0)
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
      const done = states.filter(s => s.complete).length
      setCompletedCount(done)
      setStreak(done) // simplified streak = completed weeks
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

  const sidebarContent = (
    <>
      {/* Header */}
      <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 8 }}>
        <a href="/" style={{ fontSize: 10, color: '#4A7C59', textDecoration: 'none', letterSpacing: '0.1em', fontWeight: 700, textTransform: 'uppercase' }}>
          kiramei.co.uk
        </a>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(238,234,228,0.4)', letterSpacing: '0.06em', marginTop: 16, marginBottom: 4, textTransform: 'uppercase' }}>
          Training Blueprint
        </p>
        <p className="font-display" style={{ fontSize: 18, fontWeight: 600, color: '#EEEAE4', marginBottom: 2 }}>{firstName}</p>
        <p style={{ fontSize: 11, color: 'rgba(238,234,228,0.3)' }}>{userEmail}</p>
      </div>

      {/* Stats */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 24 }}>
        <div>
          <p style={{ fontSize: 22, fontWeight: 700, color: '#EEEAE4', fontFamily: 'DM Sans, sans-serif' }}>{streak}</p>
          <p style={{ fontSize: 10, color: 'rgba(238,234,228,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Streak</p>
        </div>
        <div>
          <p style={{ fontSize: 22, fontWeight: 700, color: '#EEEAE4', fontFamily: 'DM Sans, sans-serif' }}>{completedCount}/8</p>
          <p style={{ fontSize: 10, color: 'rgba(238,234,228,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Weeks done</p>
        </div>
      </div>

      {/* Week rail */}
      <div style={{ flex: 1, padding: '12px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.25)', padding: '8px 8px 4px' }}>
          Programme
        </p>
        {weekStates.map((ws, i) => {
          const weekNum = i + 1
          const isActive = currentWeek === weekNum
          const isLocked = !ws.unlocked

          if (isLocked) {
            return (
              <div key={weekNum} title={`Complete week ${weekNum - 1} first`} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 8px', borderRadius: 8,
                cursor: 'not-allowed', opacity: 0.35,
              }}>
                <span style={{ fontSize: 13, width: 20, textAlign: 'center' }}>🔒</span>
                <div>
                  <p style={{ fontSize: 13, color: 'rgba(238,234,228,0.6)', lineHeight: 1.2 }}>Week {weekNum}</p>
                  <p style={{ fontSize: 10, color: 'rgba(238,234,228,0.3)' }}>{WEEK_SPLITS[i]}</p>
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
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 8px', borderRadius: 8, textDecoration: 'none',
                background: isActive ? 'rgba(74,124,89,0.18)' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              <span style={{ fontSize: 13, width: 20, textAlign: 'center', color: ws.complete ? '#4A7C59' : isActive ? '#4A7C59' : 'rgba(238,234,228,0.4)' }}>
                {ws.complete ? '✓' : isActive ? '◆' : '◇'}
              </span>
              <div>
                <p style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? '#EEEAE4' : 'rgba(238,234,228,0.65)', lineHeight: 1.2 }}>
                  Week {weekNum}
                </p>
                <p style={{ fontSize: 10, color: 'rgba(238,234,228,0.3)' }}>{WEEK_SPLITS[i]}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          style={{
            width: '100%', padding: '10px 8px', background: 'transparent',
            border: 'none', borderRadius: 8, cursor: 'pointer',
            fontSize: 13, color: 'rgba(238,234,228,0.4)', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          <span>↩</span>
          {signingOut ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <nav style={{
        display: 'none', position: 'fixed', top: 0, left: 0, bottom: 0, width: 232,
        background: '#0C0C0C', borderRight: '1px solid rgba(255,255,255,0.06)',
        flexDirection: 'column', padding: '28px 0',
        zIndex: 50, overflowY: 'auto',
      }} className="programme-sidebar">
        {sidebarContent}
      </nav>

      {/* Mobile top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#0C0C0C', borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }} className="programme-mobile-header">
        <a href="/" style={{ fontSize: 13, fontWeight: 700, color: '#EEEAE4', textDecoration: 'none', letterSpacing: '0.04em' }}>
          kira mei
        </a>
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#EEEAE4', fontSize: 18 }}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: 260,
              background: '#0C0C0C', padding: '28px 0',
              display: 'flex', flexDirection: 'column', overflowY: 'auto',
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
          .programme-main { margin-left: 232px !important; }
        }
      `}</style>
    </>
  )
}
