'use client'

import { useState } from 'react'

type Profile = {
  first_name?: string
  last_name?: string
  email?: string
  date_of_birth?: string
  country?: string
  goal?: string
  experience?: string
  training_days_pw?: number
}

export default function ProfileTab({ profile }: { profile: Profile }) {
  const [form, setForm] = useState({
    first_name: profile.first_name ?? '',
    last_name: profile.last_name ?? '',
    date_of_birth: profile.date_of_birth ?? '',
    country: profile.country ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    setSaved(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError(''); setSaved(false)
    const res = await fetch('/api/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (!res.ok) { const d = await res.json(); setError(d.error ?? 'Failed to save'); return }
    setSaved(true)
  }

  const initials = [form.first_name?.[0], form.last_name?.[0]].filter(Boolean).join('').toUpperCase() || 'KM'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 12 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem,2.6vw,2.1rem)', fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>
          Your <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>profile.</em>
        </h2>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>01 / Profile</span>
      </div>

      <div style={{ background: 'var(--paper)', border: '1px solid var(--paper-edge)', borderRadius: 3, padding: '28px 30px', boxShadow: '0 1px 0 rgba(31,27,22,0.04), 0 12px 24px -18px rgba(31,27,22,0.16)' }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center', marginBottom: 28, paddingBottom: 24, borderBottom: '1px dashed var(--paper-edge)' }}>
          <div style={{ width: 88, height: 88, background: 'var(--paper-deep)', border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 500, color: 'var(--ink)', flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, margin: '0 0 4px' }}>
              {form.first_name} {form.last_name}
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: 0 }}>
              {profile.email}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 24px' }}>
            {[
              { field: 'first_name', label: 'First name' },
              { field: 'last_name', label: 'Last name' },
              { field: 'date_of_birth', label: 'Date of birth', type: 'date' },
              { field: 'country', label: 'Country' },
            ].map(({ field, label, type }) => (
              <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>{label}</label>
                <input
                  type={type ?? 'text'}
                  value={(form as Record<string, string>)[field]}
                  onChange={e => set(field, e.target.value)}
                  style={{ width: '100%', fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)', background: 'transparent', border: 'none', borderBottom: '1.5px solid var(--paper-edge)', padding: '8px 0 10px', outline: 'none' }}
                />
              </div>
            ))}
          </div>

          {error && <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', background: 'rgba(184,84,58,0.06)', padding: '10px 14px', border: '1px solid rgba(184,84,58,0.2)', marginTop: 16 }}>{error}</p>}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 26, paddingTop: 20, borderTop: '1px dashed var(--paper-edge)' }}>
            <span style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>{saved ? 'Changes saved.' : ''}</span>
            <button type="submit" disabled={saving} className="km-btn">
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
