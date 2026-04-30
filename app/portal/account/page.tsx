'use client'

import { useState, useEffect } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

export default function AccountPage() {
  const [user, setUser] = useState<{ email: string; id: string } | null>(null)
  const [name, setName] = useState('')

  // Email change
  const [newEmail, setNewEmail] = useState('')
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailMsg, setEmailMsg] = useState('')

  // Password change
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [passLoading, setPassLoading] = useState(false)
  const [passMsg, setPassMsg] = useState('')

  // Name change
  const [nameLoading, setNameLoading] = useState(false)
  const [nameMsg, setNameMsg] = useState('')

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser({ email: data.user.email ?? '', id: data.user.id })
    })
    fetch('/api/kira/account').then(r => r.json()).then(d => {
      if (d.name) setName(d.name)
    })
  }, [])

  async function handleNameSave(e: React.FormEvent) {
    e.preventDefault()
    setNameLoading(true)
    setNameMsg('')
    const res = await fetch('/api/kira/account', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    setNameLoading(false)
    setNameMsg(res.ok ? 'Name updated.' : 'Failed to update name.')
    setTimeout(() => setNameMsg(''), 3000)
  }

  async function handleEmailChange(e: React.FormEvent) {
    e.preventDefault()
    setEmailLoading(true)
    setEmailMsg('')
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    setEmailLoading(false)
    if (error) {
      setEmailMsg(error.message)
    } else {
      setEmailMsg('Confirmation email sent to your new address. Click the link to verify.')
      setNewEmail('')
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    if (newPass !== confirmPass) { setPassMsg('Passwords do not match.'); return }
    if (newPass.length < 8) { setPassMsg('Password must be at least 8 characters.'); return }
    setPassLoading(true)
    setPassMsg('')

    // Re-authenticate first to verify current password
    const supabase = createSupabaseBrowserClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user?.email ?? '',
      password: currentPass,
    })
    if (signInError) {
      setPassMsg('Current password is incorrect.')
      setPassLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({ password: newPass })
    setPassLoading(false)
    if (error) {
      setPassMsg(error.message)
    } else {
      setPassMsg('Password updated successfully.')
      setCurrentPass(''); setNewPass(''); setConfirmPass('')
      setTimeout(() => setPassMsg(''), 3000)
    }
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 10 }}>
        Settings
      </p>
      <h1 className="font-display" style={{ fontSize: 38, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 40 }}>
        Account.
      </h1>

      {/* Name */}
      <form onSubmit={handleNameSave} style={{ marginBottom: 40 }}>
        <SectionLabel>Profile</SectionLabel>
        <Field label="Full name">
          <input
            className="kira-input" value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Jane Smith"
          />
        </Field>
        <div style={{ marginTop: 12 }}>
          <SaveButton loading={nameLoading}>Save name</SaveButton>
        </div>
        {nameMsg && <StatusMsg text={nameMsg} />}
      </form>

      <Divider />

      {/* Email */}
      <form onSubmit={handleEmailChange} style={{ margin: '40px 0' }}>
        <SectionLabel>Email address</SectionLabel>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 16 }}>
          Current: <strong style={{ color: 'var(--ink)' }}>{user?.email}</strong>
        </p>
        <Field label="New email address">
          <input
            className="kira-input" type="email" value={newEmail}
            onChange={e => setNewEmail(e.target.value)}
            placeholder="new@email.com" required
          />
        </Field>
        <div style={{ marginTop: 12 }}>
          <SaveButton loading={emailLoading}>Update email</SaveButton>
        </div>
        {emailMsg && <StatusMsg text={emailMsg} />}
      </form>

      <Divider />

      {/* Password */}
      <form onSubmit={handlePasswordChange} style={{ marginTop: 40 }}>
        <SectionLabel>Change password</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          <Field label="Current password">
            <input
              className="kira-input" type="password" value={currentPass}
              onChange={e => setCurrentPass(e.target.value)} required
              autoComplete="current-password"
            />
          </Field>
          <Field label="New password">
            <input
              className="kira-input" type="password" value={newPass}
              onChange={e => setNewPass(e.target.value)} minLength={8} required
              autoComplete="new-password" placeholder="Min. 8 characters"
            />
          </Field>
          <Field label="Confirm new password">
            <input
              className="kira-input" type="password" value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)} required
              autoComplete="new-password"
            />
          </Field>
        </div>
        <SaveButton loading={passLoading}>Update password</SaveButton>
        {passMsg && <StatusMsg text={passMsg} />}
      </form>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>
      {children}
    </p>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>{label}</label>
      {children}
    </div>
  )
}

function SaveButton({ children, loading }: { children: React.ReactNode; loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        padding: '12px 24px',
        background: loading ? 'var(--border)' : 'var(--ink)',
        color: loading ? 'var(--ink-muted)' : '#F8F6F1',
        border: 'none', borderRadius: 99,
        fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600,
        cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
      }}
    >
      {loading ? 'Saving...' : children}
    </button>
  )
}

function StatusMsg({ text }: { text: string }) {
  const isError = text.toLowerCase().includes('fail') || text.toLowerCase().includes('incorrect') || text.toLowerCase().includes('match')
  return (
    <p style={{
      fontSize: 13, marginTop: 12,
      color: isError ? '#C0392B' : 'var(--sage)',
      background: isError ? '#FEF0F0' : '#F0F5F2',
      padding: '8px 12px', borderRadius: 8,
      border: `1px solid ${isError ? '#F0AAAA' : '#C5D9CB'}`,
    }}>
      {text}
    </p>
  )
}

function Divider() {
  return <div style={{ borderTop: '1px solid var(--border)' }} />
}
