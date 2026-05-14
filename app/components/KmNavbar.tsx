'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const NAV_LINKS = [
  { href: '/training',  label: 'Training',  key: 'training' },
  { href: '/nutrition', label: 'Nutrition', key: 'nutrition' },
  { href: '/bundle',    label: 'Bundle',    key: 'bundle' },
  { href: '/about',     label: 'About',     key: 'about' },
]

interface KmNavbarProps {
  activePage?: string
}

export default function KmNavbar({ activePage }: KmNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const tapCount = useRef(0)
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  function handleLogoClick(e: React.MouseEvent) {
    tapCount.current += 1
    if (tapTimer.current) clearTimeout(tapTimer.current)
    if (tapCount.current >= 3) {
      e.preventDefault()
      tapCount.current = 0
      router.push('/dashboard/login')
    } else {
      tapTimer.current = setTimeout(() => { tapCount.current = 0 }, 1500)
    }
  }

  return (
    <>
      <nav className="km-nav">
        <div className="km-nav-inner">
          <Link href="/" className="km-logo" onClick={handleLogoClick}>
            <span className="km-logo-mark">K</span>
            <span className="km-logo-text">Kira Mei</span>
          </Link>

          <div className="km-nav-links">
            {NAV_LINKS.map(({ href, label, key }) => (
              <Link
                key={key}
                href={href}
                className={activePage === key ? 'active' : ''}
              >
                {label}
              </Link>
            ))}
            <Link href="/login" style={{ fontSize: 14, color: 'var(--ink-soft)', textDecoration: 'none', padding: '4px 0' }}>
              Sign in
            </Link>
          </div>

          <Link href="/bundle" className="km-btn km-btn-accent km-nav-cta">
            Get the bundle <span>→</span>
          </Link>

          <button
            className="km-nav-burger"
            aria-label="Menu"
            onClick={() => setMobileOpen(o => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {mobileOpen && (
          <div className="km-nav-mobile" style={{ display: 'flex' }}>
            {NAV_LINKS.map(({ href, label, key }) => (
              <Link key={key} href={href} onClick={() => setMobileOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setMobileOpen(false)} style={{ fontSize: 16, color: 'var(--ink-soft)', textDecoration: 'none' }}>
              Sign in
            </Link>
            <Link href="/bundle" className="km-btn km-btn-accent" onClick={() => setMobileOpen(false)} style={{ alignSelf: 'flex-start' }}>
              Get the bundle
            </Link>
          </div>
        )}
      </nav>

    </>
  )
}
