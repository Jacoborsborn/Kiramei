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

export default function ActivateForm({ email, sessionId, product }: Props) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const productLabel = product === 'nutrition' ? 'nutrition portal' : 'programme'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords don\'t match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }

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
      setError('Account created — please sign in manually.')
      setLoading(false)
      router.push('/login')
      return
    }

    router.push(REDIRECT[product])
    router.refresh()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px', boxSizing: 'border-box',
    background: 'var(--paper)', border: '1.5px solid var(--paper-edge)',
    borderRadius: 3, fontSize: 14, color: 'var(--ink)', fontFamily: 'inherit', outline: 'none',
  }

  return (
    <div style={{ textAlign: 'center', maxWidth: 480, width: '100%' }}>

      <div style={{
        width: 52, height: 52, borderRadius: '50%',
        background: 'rgba(184,84,58,0.08)', border: '1.5px solid var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px', fontSize: 20, color: 'var(--accent)',
      }}>✓</div>

      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>
        Payment confirmed
      </span>

      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.4rem, 6vw, 3.6rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, margin: '12px 0 16px', color: 'var(--ink)' }}>
        You&rsquo;re <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>in.</em>
      </h1>

      <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 36 }}>
        Set a password to create your account and jump straight into your {productLabel}.
      </p>

      <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14 }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Email</label>
          <input
            style={{ ...inputStyle, color: 'var(--ink-muted)', cursor: 'default' }}
            type="email" value={email} readOnly tabIndex={-1}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Password</label>
          <input
            style={inputStyle} type="password" value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Min. 8 characters" required minLength={8} autoFocus
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Confirm password</label>
          <input
            style={inputStyle} type="password" value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Repeat password" required minLength={8}
          />
        </div>

        {error && (
          <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)', background: 'rgba(184,84,58,0.06)', padding: '10px 14px', border: '1px solid rgba(184,84,58,0.2)', borderRadius: 2, margin: 0 }}>
            {error}
          </p>
        )}

        <button
          type="submit" disabled={loading}
          style={{
            marginTop: 6, padding: '14px 28px',
            background: loading ? 'var(--paper-deep)' : 'var(--accent)',
            color: loading ? 'var(--ink-muted)' : '#FBF7EE',
            border: 'none', borderRadius: 3, fontFamily: 'var(--mono)',
            fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Creating account…' : 'Create account & start →'}
        </button>
      </form>

      <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)', marginTop: 24 }}>
        Already have an account?{' '}
        <a href="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sign in</a>
      </p>
    </div>
  )
}
