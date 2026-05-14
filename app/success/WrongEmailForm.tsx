'use client'

import { useState } from 'react'

export default function WrongEmailForm({ sessionId, currentEmail }: { sessionId: string; currentEmail: string }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || email === currentEmail) { setError('Please enter a different email address.'); return }
    setLoading(true); setError('')

    const res = await fetch('/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, session_id: sessionId }),
    })

    setLoading(false)
    if (!res.ok) { setError('Unable to update email. Please contact hello@kiramei.co.uk.'); return }
    setDone(true)
  }

  if (!open) {
    return (
      <p style={{ textAlign: 'center', marginTop: 20, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>
        Wrong email?{' '}
        <button onClick={() => setOpen(true)} style={{ background: 'transparent', border: 'none', padding: 0, color: 'var(--accent)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit' }}>
          Correct it here
        </button>
      </p>
    )
  }

  if (done) {
    return (
      <p style={{ textAlign: 'center', marginTop: 20, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--sage)' }}>
        Updated. Check your new email for the activation link.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20, background: 'var(--paper-deep)', border: '1px dashed var(--paper-edge)', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: 0 }}>Correct your email</p>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="kira-input"
        autoFocus
      />
      {error && <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', margin: 0 }}>{error}</p>}
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" disabled={loading} className="km-btn" style={{ fontSize: 12 }}>
          {loading ? 'Updating…' : 'Update email'}
        </button>
        <button type="button" onClick={() => setOpen(false)} style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    </form>
  )
}
