'use client'

import Link from 'next/link'
import Navbar from '@/app/components/Navbar'

export default function SuccessPage() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#EEEAE4', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px' }}>
        <div style={{ textAlign: 'center', maxWidth: 520 }}>

          {/* Check circle */}
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: 'rgba(74,124,89,0.12)',
            border: '1.5px solid rgba(74,124,89,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 32px',
            fontSize: 22, color: '#4A7C59',
          }}>
            ✓
          </div>

          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 16 }}>
            Payment confirmed
          </p>

          <h1 className="font-display" style={{
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: 600, lineHeight: 1, letterSpacing: '-0.025em', marginBottom: 20,
          }}>
            You're in.
          </h1>

          <p style={{ fontSize: 16, color: 'rgba(238,234,228,0.6)', lineHeight: 1.75, marginBottom: 8 }}>
            Your download links are on their way to your inbox. Check your email — and your spam folder just in case.
          </p>
          <p style={{ fontSize: 16, color: 'rgba(238,234,228,0.6)', lineHeight: 1.75, marginBottom: 48 }}>
            This is the last programme you'll ever need to buy.
          </p>

          <div style={{
            background: '#101010', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '24px 28px',
            textAlign: 'left', marginBottom: 40,
          }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.3)', marginBottom: 14 }}>
              What to expect
            </p>
            {[
              ['📬', 'Email with download links arrives within minutes'],
              ['📄', 'Download your PDF(s) — save them somewhere safe'],
              ['📖', 'Work through week by week — don\'t rush it'],
              ['💪', 'By week 8, you build your own programme'],
            ].map(([icon, text]) => (
              <div key={text as string} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 14 }}>{icon}</span>
                <span style={{ fontSize: 13, color: 'rgba(238,234,228,0.55)', lineHeight: 1.6 }}>{text}</span>
              </div>
            ))}
          </div>

          <Link href="/" style={{
            display: 'inline-block', padding: '12px 28px', borderRadius: 99,
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(238,234,228,0.6)', fontSize: 14, fontWeight: 500,
            textDecoration: 'none', transition: 'all 0.15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EEEAE4'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(238,234,228,0.6)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
