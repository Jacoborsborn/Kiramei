'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { href: '/training',  label: 'Training' },
  { href: '/nutrition', label: 'Nutrition' },
  { href: '/bundle',    label: 'Bundle' },
  { href: '/about',     label: 'About' },
]

interface NavbarProps {
  transparent?: boolean
  onLogoTap?: () => void
}

export default function Navbar({ transparent = false, onLogoTap }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const tapCount = useRef(0)
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!transparent) return
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [transparent])

  const solid = !transparent || scrolled

  function handleLogoClick() {
    if (!onLogoTap) return
    tapCount.current += 1
    if (tapTimer.current) clearTimeout(tapTimer.current)
    if (tapCount.current >= 3) {
      tapCount.current = 0
      onLogoTap()
    } else {
      tapTimer.current = setTimeout(() => { tapCount.current = 0 }, 400)
    }
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: solid ? 'rgba(8,8,8,0.96)' : 'transparent',
        borderBottom: solid ? '1px solid rgba(255,255,255,0.07)' : 'none',
        backdropFilter: solid ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: solid ? 'blur(12px)' : 'none',
        transition: 'background 0.35s ease, border-color 0.35s ease',
        padding: '0 24px',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          style={{
            fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#EEEAE4',
            textDecoration: 'none', userSelect: 'none', cursor: onLogoTap ? 'default' : 'pointer',
          }}
        >
          Kira Mei
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              padding: '7px 14px', borderRadius: 99, fontSize: 13, fontWeight: 500,
              color: 'rgba(238,234,228,0.65)', textDecoration: 'none',
              transition: 'color 0.15s, background 0.15s',
              letterSpacing: '0.01em',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EEEAE4'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(238,234,228,0.65)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              {label}
            </Link>
          ))}
          <Link href="/login" style={{
            padding: '7px 14px', borderRadius: 99, fontSize: 13, fontWeight: 500,
            color: 'rgba(238,234,228,0.65)', textDecoration: 'none',
            transition: 'color 0.15s, background 0.15s', letterSpacing: '0.01em',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EEEAE4'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(238,234,228,0.65)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            Sign in
          </Link>
          <Link href="/#products" style={{
            marginLeft: 4, padding: '8px 20px', borderRadius: 99,
            background: '#EEEAE4', color: '#080808',
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
            letterSpacing: '0.02em', transition: 'background 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EEEAE4' }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          className="mobile-menu-btn"
          aria-label="Menu"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 8, display: 'flex', flexDirection: 'column', gap: 5,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 1.5,
              background: '#EEEAE4',
              transform: menuOpen
                ? (i === 0 ? 'rotate(45deg) translateY(4.5px)' : i === 2 ? 'rotate(-45deg) translateY(-4.5px)' : 'scaleX(0)')
                : 'none',
              transition: 'transform 0.2s ease',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(8,8,8,0.98)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 8,
        }}
          onClick={() => setMenuOpen(false)}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              fontSize: 32, fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600, color: '#EEEAE4', textDecoration: 'none',
              padding: '12px 32px', letterSpacing: '-0.01em',
            }}>
              {label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setMenuOpen(false)} style={{
            marginTop: 16, fontSize: 18, fontWeight: 500,
            color: 'rgba(238,234,228,0.5)', textDecoration: 'none',
            padding: '10px 32px', letterSpacing: '0.02em',
          }}>
            Sign in
          </Link>
          <Link href="/#products" onClick={() => setMenuOpen(false)} style={{
            marginTop: 8, padding: '14px 40px', borderRadius: 99,
            background: '#EEEAE4', color: '#080808',
            fontSize: 15, fontWeight: 600, textDecoration: 'none',
          }}>
            Get Started
          </Link>
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
