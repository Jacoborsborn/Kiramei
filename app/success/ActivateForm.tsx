'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

type Props = {
  email: string
  sessionId: string
  isProgramme: boolean
}

export default function ActivateForm({ email, sessionId, isProgramme }: Props) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

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

    // Sign in with the newly created account
    const supabase = createSupabaseBrowserClient()
    const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password })
    if (signInErr) {
      setError('Account created — please sign in manually.')
      setLoading(false)
      router.push('/login')
      return
    }

    router.push(isProgramme ? '/programme' : '/')
    router.refresh()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10, fontSize: 14, color: '#EEEAE4', fontFamily: 'inherit', outline: 'none',
  }

  return (
    <div style={{ textAlign: 'center', maxWidth: 460, width: '100%' }}>

      {/* tick */}
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'rgba(74,124,89,0.12)', border: '1.5px solid rgba(74,124,89,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 28px', fontSize: 22, color: '#4A7C59',
      }}>✓</div>

      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 14 }}>
        Payment confirmed
      </p>

      <h1 className="font-display" style={{ fontSize: 'clamp(36px, 7vw, 64px)', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.025em', marginBottom: 16 }}>
        You're in.
      </h1>

      <p style={{ fontSize: 15, color: 'rgba(238,234,228,0.5)', lineHeight: 1.7, marginBottom: 36 }}>
        Set a password to create your account and{' '}
        {isProgramme ? 'jump straight into your programme.' : 'access your downloads.'}
      </p>

      <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* email — read-only */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'rgba(238,234,228,0.35)', letterSpacing: '0.04em' }}>Email</label>
          <input
            style={{ ...inputStyle, color: 'rgba(238,234,228,0.4)', cursor: 'default' }}
            type="email" value={email} readOnly tabIndex={-1}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'rgba(238,234,228,0.35)', letterSpacing: '0.04em' }}>Password</label>
          <input
            style={inputStyle} type="password" value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Min. 8 characters" required minLength={8} autoFocus
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12, color: 'rgba(238,234,228,0.35)', letterSpacing: '0.04em' }}>Confirm password</label>
          <input
            style={inputStyle} type="password" value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Repeat password" required minLength={8}
          />
        </div>

        {error && (
          <p style={{ fontSize: 13, color: '#F08080', background: 'rgba(192,57,43,0.15)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(192,57,43,0.3)', margin: 0 }}>
            {error}
          </p>
        )}

        <button
          type="submit" disabled={loading}
          style={{
            marginTop: 6, padding: '14px',
            background: loading ? 'rgba(238,234,228,0.1)' : '#EEEAE4',
            color: loading ? 'rgba(238,234,228,0.3)' : '#080808',
            border: 'none', borderRadius: 99, fontFamily: 'inherit',
            fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Creating account…' : isProgramme ? 'Create account & start →' : 'Create account →'}
        </button>
      </form>

      <p style={{ fontSize: 13, color: 'rgba(238,234,228,0.25)', marginTop: 24 }}>
        Already have an account?{' '}
        <a href="/login" style={{ color: '#4A7C59', textDecoration: 'none' }}>Sign in</a>
      </p>
    </div>
  )
}
