'use client'

import { useState } from 'react'

type Session = {
  id: string
  device_label: string
  ip_address?: string
  last_seen_at: string
  created_at: string
}

export default function SecurityTab({ sessions, currentSessionId }: { sessions: Session[]; currentSessionId?: string }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saving, setSaving] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSaved, setPwSaved] = useState(false)
  const [sessionsState, setSessionsState] = useState(sessions)

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (next !== confirm) { setPwError("Passwords don't match"); return }
    setSaving(true); setPwError(''); setPwSaved(false)
    const res = await fetch('/api/me/password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ current, next }),
    })
    setSaving(false)
    if (!res.ok) { const d = await res.json(); setPwError(d.error ?? 'Failed'); return }
    setPwSaved(true); setCurrent(''); setNext(''); setConfirm('')
  }

  async function revokeSession(id: string, all = false) {
    await fetch(`/api/me/sessions/${id}${all ? '?all=true' : ''}`, { method: 'DELETE' })
    if (all) {
      setSessionsState(s => s.filter(x => x.id === currentSessionId))
    } else {
      setSessionsState(s => s.filter(x => x.id !== id))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 12 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem,2.6vw,2.1rem)', fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>
          Security &amp; <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>access.</em>
        </h2>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>02 / Security</span>
      </div>

      <div style={{ background: 'var(--paper)', border: '1px solid var(--paper-edge)', borderRadius: 3, padding: '28px 30px', boxShadow: '0 1px 0 rgba(31,27,22,0.04), 0 12px 24px -18px rgba(31,27,22,0.16)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 22, paddingBottom: 14, borderBottom: '1px solid var(--paper-edge)' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>Change password</h3>
        </div>

        <form onSubmit={handleChangePassword}>
          {[
            { field: 'current', label: 'Current password', val: current, set: setCurrent },
            { field: 'next', label: 'New password', val: next, set: setNext },
            { field: 'confirm', label: 'Confirm new password', val: confirm, set: setConfirm },
          ].map(({ field, label, val, set }) => (
            <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
              <label style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>{label}</label>
              <input
                type="password"
                value={val}
                onChange={e => set(e.target.value)}
                autoComplete={field === 'current' ? 'current-password' : 'new-password'}
                style={{ width: '100%', fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)', background: 'transparent', border: 'none', borderBottom: '1.5px solid var(--paper-edge)', padding: '8px 0 10px', outline: 'none', letterSpacing: '0.3em' }}
              />
            </div>
          ))}

          {pwError && <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', background: 'rgba(184,84,58,0.06)', padding: '10px 14px', border: '1px solid rgba(184,84,58,0.2)', marginBottom: 14 }}>{pwError}</p>}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingTop: 20, borderTop: '1px dashed var(--paper-edge)' }}>
            <span style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>{pwSaved ? 'Password updated.' : 'Min. 10 chars, upper + lower + digit.'}</span>
            <button type="submit" disabled={saving} className="km-btn">{saving ? 'Saving…' : 'Update password'}</button>
          </div>
        </form>
      </div>

      <div style={{ background: 'var(--paper)', border: '1px solid var(--paper-edge)', borderRadius: 3, padding: '28px 30px', boxShadow: '0 1px 0 rgba(31,27,22,0.04), 0 12px 24px -18px rgba(31,27,22,0.16)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 22, paddingBottom: 14, borderBottom: '1px solid var(--paper-edge)' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>Active sessions</h3>
          {sessionsState.length > 1 && (
            <button
              onClick={() => currentSessionId && revokeSession(currentSessionId, true)}
              style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--margin-red)', background: 'transparent', border: '1.5px solid rgba(194,106,92,0.4)', borderRadius: 2, padding: '7px 12px', cursor: 'pointer' }}
            >
              Sign out everywhere
            </button>
          )}
        </div>

        {sessionsState.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>No active sessions found.</p>
        ) : (
          sessionsState.map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--paper-edge)' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>
                  {s.device_label}
                  {s.id === currentSessionId && (
                    <span style={{ marginLeft: 8, fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '2px 6px', borderRadius: 2 }}>current</span>
                  )}
                </p>
                <p style={{ margin: '2px 0 0', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>
                  {s.ip_address ?? 'Unknown IP'} · Last seen {new Date(s.last_seen_at).toLocaleDateString()}
                </p>
              </div>
              {s.id !== currentSessionId && (
                <button onClick={() => revokeSession(s.id)} style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)', background: 'transparent', border: '1.5px solid var(--paper-edge)', borderRadius: 2, padding: '7px 12px', cursor: 'pointer' }}>
                  Revoke
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
