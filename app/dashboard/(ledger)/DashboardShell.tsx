'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { mark: '01', label: 'Command Centre', href: '/dashboard' },
  { mark: '02', label: 'Products',       href: '/dashboard/products' },
  { mark: '03', label: 'Waitlist',       href: '/dashboard/waitlist' },
  { mark: '04', label: 'Transactions',   href: '/dashboard/transactions' },
  { mark: '05', label: 'Analytics',      href: '/dashboard/analytics' },
  { mark: '06', label: 'Access',         href: '/dashboard/access' },
  { mark: '07', label: 'Programme',      href: '/dashboard/programme' },
]

const TITLES: Record<string, { title: string; sub: string }> = {
  '/dashboard':              { title: 'Command Centre',  sub: 'overview · the whole picture' },
  '/dashboard/products':     { title: 'Products',        sub: 'what you sell' },
  '/dashboard/waitlist':     { title: 'Waitlist',        sub: 'inbox of intent' },
  '/dashboard/transactions': { title: 'Transactions',    sub: 'the money ledger' },
  '/dashboard/analytics':    { title: 'Analytics',       sub: 'first-party · no third parties' },
  '/dashboard/access':       { title: 'Founder Access',  sub: 'security & settings' },
  '/dashboard/programme':    { title: 'Programme',       sub: 'preview weeks 1–8' },
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const meta = TITLES[pathname] ?? { title: 'Ledger', sub: '' }

  async function handleLock() {
    await fetch('/api/founder/logout', { method: 'POST' })
    router.push('/dashboard/login')
  }

  return (
    <div className="ledger">
      {/* Sidebar */}
      <aside className={`ldg-side${sidebarOpen ? ' open' : ''}`}>
        <div className="ldg-brand">
          <span className="ldg-brand-mark">kira<span style={{ fontStyle: 'italic', color: 'var(--accent, #B8543A)' }}>mei</span></span>
          <span className="ldg-brand-sub">ledger</span>
        </div>

        <div className="ldg-section-label">navigation</div>

        {NAV.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`ldg-nav-item${pathname === item.href ? ' active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="ldg-nav-mark">{item.mark}</span>
            <span>{item.label}</span>
          </Link>
        ))}

        <div className="ldg-side-footer">
          <div>
            <span className="pulse" />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em' }}>LEDGER LIVE</span>
          </div>
          <button
            onClick={handleLock}
            style={{
              background: 'transparent',
              border: '1px solid var(--paper-edge, rgba(31,27,22,0.1))',
              borderRadius: 2,
              padding: '6px 10px',
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted, #8a8279)',
              cursor: 'pointer',
            }}
          >
            Lock
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="ldg-main">
        {/* Topbar */}
        <header className="ldg-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Mobile hamburger */}
            <button
              className="ldg-hamburger"
              onClick={() => setSidebarOpen(v => !v)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                color: 'var(--ink)',
              }}
              aria-label="Open navigation"
            >
              ☰
            </button>
            <div className="ldg-crumb">
              <h1>{meta.title}</h1>
              {meta.sub && <span className="ldg-crumb-sub">{meta.sub}</span>}
            </div>
          </div>
          <div className="ldg-top-actions">
            <input className="ldg-search" placeholder="Search…" type="search" />
          </div>
        </header>

        {/* Page body */}
        <div className="ldg-body">
          {children}
        </div>
      </div>
    </div>
  )
}
