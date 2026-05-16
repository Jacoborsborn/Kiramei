'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function FounderLoginPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/founder/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      const data = await res.json().catch(() => ({}))
      if (data.session?.access_token) {
        const supabase = createSupabaseBrowserClient()
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        })
      }
      router.push('/dashboard')
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? 'Authentication failed')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--paper)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Cross-grid background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(to right, var(--rule-soft, rgba(31,27,22,0.06)) 1px, transparent 1px), linear-gradient(to bottom, var(--rule-soft, rgba(31,27,22,0.06)) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.4,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        width: 380,
        background: 'var(--paper)',
        border: '1px solid var(--paper-edge, rgba(31,27,22,0.1))',
        padding: '40px 36px',
        borderRadius: 3,
        boxShadow: '0 4px 0 rgba(31,27,22,0.04), 0 24px 60px -28px rgba(31,27,22,0.35)',
      }}>
        {/* Tape strip */}
        <div style={{
          position: 'absolute',
          top: -10,
          left: '50%',
          transform: 'translateX(-50%) rotate(-1.5deg)',
          width: 90,
          height: 16,
          background: 'rgba(184,146,58,0.2)',
          border: '1px solid rgba(184,146,58,0.3)',
        }} />

        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--serif)',
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            marginBottom: 4,
          }}>
            kira<span style={{ fontStyle: 'italic', color: 'var(--accent, #B8543A)' }}>mei</span>
          </div>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted, #8a8279)',
          }}>
            founder's ledger
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted, #8a8279)',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
              autoComplete="current-password"
              style={{
                background: 'var(--paper)',
                border: '1px solid var(--paper-edge, rgba(31,27,22,0.1))',
                padding: '9px 12px',
                borderRadius: 2,
                fontFamily: 'var(--sans)',
                fontSize: 14,
                color: 'var(--ink)',
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <div style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.08em',
              color: 'var(--accent, #B8543A)',
              padding: '8px 10px',
              background: 'rgba(184,84,58,0.06)',
              border: '1px solid rgba(184,84,58,0.2)',
              borderRadius: 2,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              marginTop: 4,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontFamily: 'var(--sans)',
              fontSize: 13,
              fontWeight: 500,
              padding: '9px 16px',
              borderRadius: 3,
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              border: '1px solid var(--ink)',
              background: 'var(--ink)',
              color: 'var(--paper)',
              opacity: loading || !password ? 0.55 : 1,
              transition: 'transform 0.12s ease, box-shadow 0.12s ease',
            }}
          >
            {loading ? 'Verifying…' : 'Unlock ledger'}
          </button>
        </form>

        <div style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1px solid var(--paper-edge, rgba(31,27,22,0.1))',
          fontFamily: 'var(--mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          color: 'var(--ink-muted, #8a8279)',
          textAlign: 'center',
        }}>
          PRIVATE — NOT FOR PUBLIC ACCESS
        </div>
      </div>
    </div>
  )
}
