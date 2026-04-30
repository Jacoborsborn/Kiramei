'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function ClientLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Incorrect email or password.')
      setLoading(false)
    } else {
      router.push('/portal')
      router.refresh()
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: 40, fontSize: 12, color: 'var(--sage)', textDecoration: 'none', letterSpacing: '0.06em' }}>
          ← kiramei.co.uk
        </a>

        <div className="paper-card" style={{ padding: '48px 40px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 20 }}>
            Client Portal
          </p>
          <h1 className="font-display" style={{ fontSize: 38, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 32 }}>
            Sign in.
          </h1>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>Email</label>
              <input
                className="kira-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jane@email.com"
                required
                autoComplete="email"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>Password</label>
              <input
                className="kira-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p style={{ fontSize: 13, color: '#C0392B', background: '#FEF0F0', padding: '10px 14px', borderRadius: 8, border: '1px solid #F0AAAA' }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 8, padding: '14px',
                background: loading ? 'var(--border)' : 'var(--ink)',
                color: loading ? 'var(--ink-muted)' : '#F8F6F1',
                border: 'none', borderRadius: 99,
                fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
              }}
            >
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>

          <p style={{ fontSize: 13, color: 'var(--ink-faint)', marginTop: 24, textAlign: 'center' }}>
            New client?{' '}
            <a href="/#apply" style={{ color: 'var(--sage)', textDecoration: 'none' }}>Apply for a programme</a>
          </p>
        </div>
      </div>
    </div>
  )
}
