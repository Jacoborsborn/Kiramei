'use client'

import { useState, useMemo, useCallback, useRef } from 'react'
import { LCard, Tag, Toggle } from '../LedgerComponents'

type LoginEntry = { ts: string; ip: string; ua: string | null; ok: boolean }

export default function AccessClient({
  clickCount: initialClickCount,
  notes: initialNotes,
  loginHistory,
}: {
  clickCount: number; notes: string; loginHistory: LoginEntry[]
}) {
  const [clickCount, setClickCount] = useState(initialClickCount)
  const [savingConfig, setSavingConfig] = useState(false)
  const [savedConfig, setSavedConfig] = useState(false)

  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [currentPw, setCurrentPw] = useState('')
  const [rotating, setRotating] = useState(false)
  const [rotateResult, setRotateResult] = useState<string | null>(null)

  const [twoFA, setTwoFA] = useState(false)
  const [autoLock, setAutoLock] = useState(true)

  const [notes, setNotes] = useState(initialNotes)
  const notesTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const strength = useMemo(() => {
    let s = 0
    if (pw.length >= 12) s += 1
    if (pw.length >= 16) s += 1
    if (/[A-Z]/.test(pw)) s += 1
    if (/[0-9]/.test(pw)) s += 1
    if (/[^A-Za-z0-9]/.test(pw)) s += 1
    return s
  }, [pw])

  const strengthLabels = ['too weak', 'weak', 'fair', 'strong', 'very strong', 'fortress']
  const strengthColor = strength < 2 ? 'var(--accent,#B8543A)' : strength < 4 ? 'var(--gold,#B8923A)' : 'var(--sage,#7A8B6E)'

  async function saveClickCount() {
    setSavingConfig(true)
    await fetch('/api/founder/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ click_count: clickCount }),
    })
    setSavingConfig(false)
    setSavedConfig(true)
    setTimeout(() => setSavedConfig(false), 2000)
  }

  async function rotatePassword() {
    setRotating(true)
    setRotateResult(null)
    const res = await fetch('/api/founder/rotate-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: currentPw, newPassword: pw }),
    })
    const data = await res.json()
    setRotating(false)
    if (res.ok) {
      setRotateResult(`New hash generated. Set in your env:\n\nFOUNDER_PW_HASH=${data.newHash}`)
      setPw(''); setConfirm(''); setCurrentPw('')
    } else {
      setRotateResult(`Error: ${data.error}`)
    }
  }

  const handleNotesChange = useCallback((val: string) => {
    setNotes(val)
    if (notesTimer.current) clearTimeout(notesTimer.current)
    notesTimer.current = setTimeout(async () => {
      await fetch('/api/founder/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: val }),
      })
    }, 800)
  }, [])

  return (
    <>
      <div className="row-2">
        <LCard title="Three-click entry" eyebrow="24 · how you get in">
          <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 14 }}>
            Tap the <strong>Kira Mei</strong> mark in the top-left of the home page <strong>{clickCount}×</strong> within 1.5s
            to open the founder password prompt. Hidden from search engines and the public.
          </p>
          <div className="field">
            <label>Clicks required</label>
            <select value={clickCount} onChange={e => setClickCount(parseInt(e.target.value))}>
              <option value={3}>3 clicks (default)</option>
              <option value={4}>4 clicks</option>
              <option value={5}>5 clicks</option>
              <option value={7}>7 clicks (paranoid mode)</option>
            </select>
          </div>
          <button className="ldg-btn ldg-btn-accent" onClick={saveClickCount} disabled={savingConfig}>
            {savedConfig ? 'Saved ✓' : savingConfig ? 'Saving…' : 'Save click count'}
          </button>
          <div className="margin-pad" style={{ marginTop: 16 }}>
            tip: pair with rate-limit on the password endpoint (5 attempts / 10 min / IP)
          </div>
        </LCard>

        <LCard title="Rotate password" eyebrow="25 · change your key">
          <div className="field">
            <label>Current password</label>
            <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} />
          </div>
          <div className="field">
            <label>New password</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="at least 12 characters" />
          </div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{ flex: 1, height: 4, background: i < strength ? strengthColor : 'var(--paper-edge)', borderRadius: 2 }} />
            ))}
          </div>
          <div className="small-mono" style={{ marginBottom: 12, color: strengthColor }}>
            {pw.length === 0 ? '—' : `STRENGTH · ${strengthLabels[strength].toUpperCase()}`}
          </div>
          <div className="field">
            <label>Confirm</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
            {confirm.length > 0 && pw !== confirm && (
              <div className="small-mono" style={{ color: 'var(--accent)' }}>DOES NOT MATCH</div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--paper-edge)', marginTop: 4 }}>
            <div>
              <div className="small-mono">2FA · TOTP</div>
              <div style={{ fontSize: 13 }}>{twoFA ? 'Enabled' : 'Off — strongly recommend'}</div>
            </div>
            <Toggle on={twoFA} onChange={setTwoFA} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: '1px solid var(--paper-edge)' }}>
            <div>
              <div className="small-mono">AUTO-LOCK</div>
              <div style={{ fontSize: 13 }}>{autoLock ? 'Lock after 15m idle' : 'Stay open until close'}</div>
            </div>
            <Toggle on={autoLock} onChange={setAutoLock} />
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button
              className="ldg-btn ldg-btn-accent"
              disabled={!currentPw || pw.length < 12 || pw !== confirm || rotating}
              style={{ opacity: (!currentPw || pw.length < 12 || pw !== confirm) ? 0.5 : 1 }}
              onClick={rotatePassword}
            >
              {rotating ? 'Rotating…' : 'Rotate password'}
            </button>
          </div>

          {rotateResult && (
            <pre style={{
              marginTop: 12, padding: '12px 14px',
              background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)',
              borderRadius: 2, fontSize: 11, fontFamily: 'var(--mono)',
              whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            }}>
              {rotateResult}
            </pre>
          )}
        </LCard>
      </div>

      <LCard title="Login history" eyebrow="26 · who's been knocking" style={{ marginTop: 18 }}>
        <table className="ltable">
          <thead>
            <tr>
              <th>When</th>
              <th>Device / UA</th>
              <th>IP</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {loginHistory.length === 0 ? (
              <tr><td colSpan={4} className="small-mono" style={{ padding: 16 }}>No login history yet.</td></tr>
            ) : loginHistory.map((l, i) => (
              <tr key={i}>
                <td className="mono" style={{ fontSize: 11.5 }}>
                  {new Date(l.ts).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </td>
                <td style={{ fontSize: 12.5, maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {l.ua ?? '—'}
                </td>
                <td className="mono" style={{ fontSize: 11.5 }}>{l.ip}</td>
                <td>{l.ok ? <Tag kind="tag-sage">success</Tag> : <Tag kind="tag-accent">blocked</Tag>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </LCard>

      <LCard title="Founder-only notes" eyebrow="27 · your captain's log" style={{ marginTop: 18 }}>
        <textarea
          rows={6}
          value={notes}
          onChange={e => handleNotesChange(e.target.value)}
          style={{
            width: '100%',
            background: '#FBE9A8',
            border: '1px solid rgba(184,146,58,0.3)',
            padding: 16,
            fontFamily: 'var(--hand)',
            fontSize: 19,
            color: 'var(--ink)',
            borderRadius: 2,
            outline: 'none',
            boxSizing: 'border-box',
            resize: 'vertical',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <span className="small-mono">AUTO-SAVED · ONLY YOU CAN SEE THIS</span>
        </div>
      </LCard>
    </>
  )
}
