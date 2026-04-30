'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

interface Props {
  firstName: string
  isPro: boolean
  userEmail: string
}

const navLinks = [
  { href: '/portal', label: 'Home', icon: '⊙' },
  { href: '/portal/programme', label: 'My Programme', icon: '◎' },
  { href: '/portal/billing', label: 'Billing', icon: '◈' },
  { href: '/portal/account', label: 'Account', icon: '◉' },
]

const proLinks = [
  { href: '/portal/checkins', label: 'Weekly Check-ins', icon: '✓' },
  { href: '/portal/body-comp', label: 'Body Composition', icon: '◐' },
  { href: '/portal/progress', label: 'Progress', icon: '↗' },
]

export default function PortalNav({ firstName, isPro, userEmail }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const allLinks = isPro ? [...navLinks, ...proLinks] : navLinks

  return (
    <>
      {/* Desktop sidebar */}
      <nav style={{
        display: 'none',
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 240,
        background: '#FDFCF9', borderRight: '1px solid var(--border)',
        flexDirection: 'column', padding: '32px 0',
        zIndex: 50,
      }} className="portal-sidebar">
        <div style={{ padding: '0 24px 32px', borderBottom: '1px solid var(--border)' }}>
          <a href="/" style={{ fontSize: 11, color: 'var(--sage)', textDecoration: 'none', letterSpacing: '0.08em', fontWeight: 600 }}>
            kiramei.co.uk
          </a>
          <p className="font-display" style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)', marginTop: 12, marginBottom: 2 }}>
            {firstName}
          </p>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{userEmail}</p>
          {isPro && (
            <span style={{
              display: 'inline-block', marginTop: 8, padding: '3px 10px',
              background: 'var(--ink)', color: '#F8F6F1',
              borderRadius: 99, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Pro
            </span>
          )}
        </div>

        <div style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navLinks.map(link => (
            <NavItem key={link.href} {...link} active={pathname === link.href} />
          ))}

          {isPro && (
            <>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', padding: '16px 12px 6px' }}>
                Pro Features
              </p>
              {proLinks.map(link => (
                <NavItem key={link.href} {...link} active={pathname === link.href} />
              ))}
            </>
          )}
        </div>

        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            style={{
              width: '100%', padding: '10px 12px', background: 'transparent',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              fontSize: 13, color: 'var(--ink-muted)', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 10,
              transition: 'background 0.15s',
            }}
          >
            <span>↩</span>
            {signingOut ? 'Signing out...' : 'Sign out'}
          </button>
        </div>
      </nav>

      {/* Mobile top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: '#FDFCF9', borderBottom: '1px solid var(--border)',
        padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }} className="portal-mobile-header">
        <a href="/" style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', textDecoration: 'none', letterSpacing: '0.04em' }}>
          kira mei
        </a>
        <button
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--ink)', fontSize: 20 }}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(0,0,0,0.25)',
        }} onClick={() => setMenuOpen(false)}>
          <div
            style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, width: 280,
              background: '#FDFCF9', padding: '24px 16px',
              display: 'flex', flexDirection: 'column', gap: 2,
              overflowY: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: '0 12px 20px', marginBottom: 8, borderBottom: '1px solid var(--border)' }}>
              <p className="font-display" style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>
                {firstName}
              </p>
              <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{userEmail}</p>
              {isPro && (
                <span style={{
                  display: 'inline-block', marginTop: 8, padding: '3px 10px',
                  background: 'var(--ink)', color: '#F8F6F1',
                  borderRadius: 99, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Pro
                </span>
              )}
            </div>

            {navLinks.map(link => (
              <NavItem key={link.href} {...link} active={pathname === link.href} onClick={() => setMenuOpen(false)} />
            ))}

            {isPro && (
              <>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', padding: '16px 12px 6px' }}>
                  Pro Features
                </p>
                {proLinks.map(link => (
                  <NavItem key={link.href} {...link} active={pathname === link.href} onClick={() => setMenuOpen(false)} />
                ))}
              </>
            )}

            <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                style={{
                  width: '100%', padding: '10px 12px', background: 'transparent',
                  border: 'none', borderRadius: 8, cursor: 'pointer',
                  fontSize: 13, color: 'var(--ink-muted)', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                <span>↩</span>
                {signingOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .portal-sidebar { display: flex !important; }
          .portal-mobile-header { display: none !important; }
          main { margin-left: 240px !important; }
        }
      `}</style>
    </>
  )
}

function NavItem({ href, label, icon, active, onClick }: {
  href: string; label: string; icon: string; active: boolean; onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 12px', borderRadius: 8, textDecoration: 'none',
        fontSize: 14, fontWeight: active ? 600 : 400,
        color: active ? 'var(--ink)' : 'var(--ink-muted)',
        background: active ? 'var(--border)' : 'transparent',
        transition: 'background 0.15s, color 0.15s',
      }}
    >
      <span style={{ fontSize: 16, opacity: active ? 1 : 0.5 }}>{icon}</span>
      {label}
    </Link>
  )
}
