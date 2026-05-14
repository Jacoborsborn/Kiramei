'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

type Props = {
  email: string
  sessionId: string
  product: 'training' | 'nutrition' | 'bundle'
}

const REDIRECT: Record<Props['product'], string> = {
  training:  '/programme',
  nutrition: '/nutrition-portal',
  bundle:    '/programme',
}

const PRODUCT_META: Record<Props['product'], { label: string; rows: { icon: string; title: string; sub: string; href: string }[] }> = {
  training: {
    label: 'Training Blueprint',
    rows: [
      { icon: '📋', title: 'Training Blueprint', sub: '8 weeks · Week 01 unlocked', href: '/programme' },
    ],
  },
  nutrition: {
    label: 'Nutrition Blueprint',
    rows: [
      { icon: '🥗', title: 'Nutrition Blueprint', sub: '8 weeks · Week 01 unlocked', href: '/nutrition-portal' },
    ],
  },
  bundle: {
    label: 'Full Stack Bundle',
    rows: [
      { icon: '📋', title: 'Training Blueprint', sub: '8 weeks · Week 01 unlocked', href: '/programme' },
      { icon: '🥗', title: 'Nutrition Blueprint', sub: '8 weeks · Week 01 unlocked', href: '/nutrition-portal' },
    ],
  },
}

export default function ActivateForm({ email, sessionId, product }: Props) {
  const [password, setPassword]   = useState('')
  const [confirm, setConfirm]     = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const router = useRouter()

  const meta = PRODUCT_META[product]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError("Passwords don't match."); return }
    if (password.length < 8)  { setError('Password must be at least 8 characters.'); return }

    setLoading(true)
    setError('')

    const res = await fetch('/api/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, password }),
    })

    if (!res.ok) {
      const { error: msg } = await res.json().catch(() => ({ error: 'Something went wrong.' }))
      setError(msg ?? 'Something went wrong.')
      setLoading(false)
      return
    }

    const supabase = createSupabaseBrowserClient()
    const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password })
    if (signInErr) {
      setLoading(false)
      router.push('/login')
      return
    }

    router.push(REDIRECT[product])
    router.refresh()
  }

  return (
    <>
      <style>{`
        .s-card { background: var(--paper); border: 1.5px solid var(--ink); padding: 48px 48px 44px; max-width: 560px; width: 100%; text-align: center; box-shadow: 4px 4px 0 var(--ink); position: relative; }
        .s-card::before { content: ''; position: absolute; inset: 6px; border: 1px dashed var(--paper-edge); pointer-events: none; }
        .s-stamp { position: absolute; top: -18px; left: 50%; transform: translateX(-50%) rotate(-2deg); background: var(--accent); color: var(--paper); padding: 7px 18px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; white-space: nowrap; }
        .s-tick { width: 60px; height: 60px; border: 2px solid var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 22px; color: var(--accent); }
        .s-access { margin: 28px 0; padding: 22px 20px 8px; background: var(--paper-deep); border: 1px solid var(--paper-edge); text-align: left; }
        .s-access-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em; color: var(--accent); text-transform: uppercase; margin-bottom: 12px; display: block; }
        .s-access-row { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-top: 1px solid var(--paper-edge); }
        .s-access-row:first-of-type { border-top: 1px solid var(--ink); }
        .s-access-icon { width: 36px; height: 36px; border: 1.5px solid var(--ink); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: var(--paper); font-size: 15px; }
        .s-access-info { flex: 1; }
        .s-access-info p { margin: 0; font-family: var(--serif); font-size: 15px; font-weight: 500; color: var(--ink); }
        .s-access-info span { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; color: var(--ink-muted); text-transform: uppercase; }
        .s-form { text-align: left; display: flex; flex-direction: column; gap: 14px; margin-top: 4px; }
        .s-form label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-muted); display: block; margin-bottom: 6px; }
        .s-form input { width: 100%; padding: 12px 14px; box-sizing: border-box; background: var(--paper); border: 1.5px solid var(--paper-edge); border-radius: 2px; font-size: 14px; color: var(--ink); font-family: inherit; outline: none; }
        .s-form input:focus { border-color: var(--ink); }
        .s-form input[readonly] { color: var(--ink-muted); cursor: default; }
        .s-error { font-family: var(--mono); font-size: 11px; color: var(--accent); background: rgba(184,84,58,0.06); padding: 10px 14px; border: 1px solid rgba(184,84,58,0.2); }
        @media (max-width: 620px) { .s-card { padding: 36px 22px; } }
      `}</style>

      <div className="s-card">
        <div className="s-stamp">Payment confirmed · {meta.label}</div>

        <div className="s-tick">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 16 l 6 6 l 14 -14"/>
          </svg>
        </div>

        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem,6vw,3rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 14, color: 'var(--ink)' }}>
          You&rsquo;re <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>in.</em>
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 4 }}>
          Set a password to create your account and jump straight into your {meta.label.toLowerCase()}.
        </p>

        {/* Access rows */}
        <div className="s-access">
          <span className="s-access-label">Your access</span>
          {meta.rows.map(r => (
            <div key={r.title} className="s-access-row">
              <div className="s-access-icon">{r.icon}</div>
              <div className="s-access-info">
                <p>{r.title}</p>
                <span>{r.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Password form */}
        <form onSubmit={handleSubmit} className="s-form">
          <div>
            <label>Email</label>
            <input type="email" value={email} readOnly tabIndex={-1} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" required minLength={8} autoFocus />
          </div>
          <div>
            <label>Confirm password</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" required minLength={8} />
          </div>

          {error && <p className="s-error">{error}</p>}

          <button
            type="submit" disabled={loading}
            style={{
              marginTop: 6, padding: '14px 28px',
              background: loading ? 'var(--paper-deep)' : 'var(--ink)',
              color: loading ? 'var(--ink-muted)' : 'var(--paper)',
              border: 'none', fontFamily: 'var(--mono)',
              fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Creating account…' : 'Create account & start →'}
          </button>
        </form>

        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', marginTop: 22 }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sign in</a>
        </p>
      </div>
    </>
  )
}
