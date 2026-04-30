'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

function ActivateForm() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validating, setValidating] = useState(true)
  const [email, setEmail] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get('token')
  const leadId = params.get('lead_id')

  useEffect(() => {
    if (!token || !leadId) {
      setError('This activation link is invalid or has expired.')
      setValidating(false)
    } else {
      setValidating(false)
    }
  }, [token, leadId])

  async function handleActivate(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    setError('')

    const res = await fetch('/api/kira/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, lead_id: leadId, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Activation failed. Please contact support.')
      setLoading(false)
      return
    }

    const supabase = createSupabaseBrowserClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password,
    })

    if (signInError) {
      setError('Account activated — please sign in.')
      setTimeout(() => router.push('/login'), 2000)
      return
    }

    router.push('/portal')
    router.refresh()
  }

  if (validating) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--ink-muted)', fontSize: 15 }}>
        Validating your link...
      </div>
    )
  }

  if (!token || !leadId) {
    return (
      <div className="paper-card" style={{ padding: '48px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 20 }}>
          Invalid Link
        </p>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 600, color: 'var(--ink)', marginBottom: 16 }}>
          This link has expired.
        </h1>
        <p style={{ fontSize: 15, color: 'var(--ink-muted)', marginBottom: 24 }}>
          Please contact <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--sage)' }}>kiira.mei@outlook.com</a> to receive a new activation link.
        </p>
      </div>
    )
  }

  return (
    <div className="paper-card" style={{ padding: '48px 40px' }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 20 }}>
        Account Setup
      </p>
      <h1 className="font-display" style={{ fontSize: 38, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 12 }}>
        Set your password.
      </h1>
      <p style={{ fontSize: 15, color: 'var(--ink-muted)', marginBottom: 32 }}>
        Choose a password to activate your client account.
      </p>

      <form onSubmit={handleActivate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>New password</label>
          <input
            className="kira-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>Confirm password</label>
          <input
            className="kira-input"
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
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
          {loading ? 'Activating...' : 'Activate account →'}
        </button>
      </form>
    </div>
  )
}

export default function ActivatePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <a href="/" style={{ display: 'inline-block', marginBottom: 40, fontSize: 12, color: 'var(--sage)', textDecoration: 'none', letterSpacing: '0.06em' }}>
          ← kiramei.co.uk
        </a>
        <Suspense fallback={<div style={{ textAlign: 'center', color: 'var(--ink-muted)' }}>Loading...</div>}>
          <ActivateForm />
        </Suspense>
      </div>
    </div>
  )
}
