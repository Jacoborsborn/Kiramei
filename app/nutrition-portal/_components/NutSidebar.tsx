'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

const WEEK_TITLES = [
  'Calories & TDEE',
  'Macros',
  'Protein sourcing',
  'Meal timing',
  'Meal prep & budget',
  'Fat loss',
  'Building muscle',
  'Build your own',
]

export default function NutSidebar({
  firstName,
  userEmail,
  hasTraining,
}: {
  firstName: string
  userEmail: string
  hasTraining: boolean
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [weekComplete, setWeekComplete] = useState<Record<number, boolean>>({})

  const activeWeekNum = (() => {
    const m = pathname.match(/\/nutrition-portal\/week\/(\d+)/)
    return m ? parseInt(m[1]) : null
  })()

  const completedCount = Object.values(weekComplete).filter(Boolean).length

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    supabase
      .from('week_progress')
      .select('week_number, week_complete')
      .then(({ data }) => {
        if (!data) return
        const map: Record<number, boolean> = {}
        data.forEach(row => { map[row.week_number] = row.week_complete })
        setWeekComplete(map)
      })
  }, [pathname])

  async function handleSignOut() {
    setSigningOut(true)
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const sidebarContent = (
    <>
      {/* Header */}
      <div style={{ padding: '0 20px 20px', borderBottom: '1px solid var(--paper-edge)', marginBottom: 8 }}>
        <a href="/" style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', color: 'var(--accent)', textDecoration: 'none', textTransform: 'uppercase' }}>
          kiramei.co.uk
        </a>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginTop: 16, marginBottom: 4 }}>
          Nutrition Blueprint
        </p>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>{firstName}</p>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-muted)' }}>{userEmail}</p>
      </div>

      {/* Mode switcher — bundle holders only */}
      {hasTraining && (
        <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--paper-edge)' }}>
          <div style={{ display: 'flex', background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', borderRadius: 3, padding: 3, gap: 3 }}>
            <Link
              href="/programme"
              style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', padding: '6px 8px', borderRadius: 2, textDecoration: 'none' }}
            >
              Training
            </Link>
            <div style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--paper)', padding: '6px 8px', borderRadius: 2, background: 'var(--accent)' }}>
              Nutrition
            </div>
          </div>
        </div>
      )}

      {/* Progress strip */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--paper-edge)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Progress</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', fontWeight: 600 }}>{completedCount}/8</span>
        </div>
        <div style={{ height: 3, background: 'var(--paper-edge)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(completedCount / 8) * 100}%`, background: 'var(--accent)', borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Week rail */}
      <div style={{ flex: 1, padding: '8px 12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {WEEK_TITLES.map((title, i) => {
          const weekNum = i + 1
          const isActive = activeWeekNum === weekNum
          const isDone = weekComplete[weekNum]

          return (
            <Link
              key={weekNum}
              href={`/nutrition-portal/week/${weekNum}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 10px', textDecoration: 'none',
                borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                background: isActive ? 'rgba(184,84,58,0.05)' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 10, width: 16, textAlign: 'center', flexShrink: 0,
                color: isDone ? 'var(--accent)' : isActive ? 'var(--accent)' : 'var(--ink-muted)',
              }}>
                {isDone ? '✓' : '·'}
              </span>
              <div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 1 }}>
                  Week {String(weekNum).padStart(2, '0')}
                </p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 13, fontWeight: isActive ? 500 : 400, color: isActive ? 'var(--ink)' : 'var(--ink-soft)' }}>
                  {title}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--paper-edge)' }}>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          style={{
            width: '100%', padding: '8px 0', background: 'transparent',
            border: 'none', cursor: 'pointer',
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--ink-muted)', textAlign: 'left',
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
      <nav style={{
        display: 'none', position: 'fixed', top: 0, left: 0, bottom: 0, width: 236,
        background: 'var(--paper)', borderRight: '1px solid var(--paper-edge)',
        flexDirection: 'column', padding: '28px 0',
        zIndex: 50, overflowY: 'auto',
      }} className="nutrition-sidebar">
        {sidebarContent}
      </nav>

      {/* Mobile top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--paper)', borderBottom: '1px solid var(--paper-edge)',
        padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }} className="nutrition-mobile-header">
        <a href="/" style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none' }}>
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
          style={{ position: 'fixed', inset: 0, zIndex: 40, background: 'rgba(31,27,22,0.4)' }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: 260,
              background: 'var(--paper)', padding: '28px 0',
              display: 'flex', flexDirection: 'column', overflowY: 'auto',
              borderRight: '1px solid var(--paper-edge)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
