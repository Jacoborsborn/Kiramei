'use client'

import { useState, useEffect } from 'react'

type ProgressEntry = {
  id: string
  week_number: number
  waist: number | null
  hips: number | null
  weight: number | null
  energy_score: number | null
  strength_notes: string | null
  logged_at: string
}

export default function ProgressPage() {
  const [entries, setEntries] = useState<ProgressEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [weekNumber, setWeekNumber] = useState(1)
  const [waist, setWaist] = useState('')
  const [hips, setHips] = useState('')
  const [weight, setWeight] = useState('')
  const [energyScore, setEnergyScore] = useState(5)
  const [strengthNotes, setStrengthNotes] = useState('')

  useEffect(() => {
    fetch('/api/kira/progress')
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : []
        setEntries(list)
        if (list.length > 0) {
          const max = Math.max(...list.map((e: ProgressEntry) => e.week_number))
          setWeekNumber(max + 1)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setMsg('')
    const res = await fetch('/api/kira/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        week_number: weekNumber,
        waist: waist ? parseFloat(waist) : null,
        hips: hips ? parseFloat(hips) : null,
        weight: weight ? parseFloat(weight) : null,
        energy_score: energyScore,
        strength_notes: strengthNotes || null,
      }),
    })
    const data = await res.json()
    setSubmitting(false)
    if (!res.ok) {
      setIsError(true)
      setMsg(data.error ?? 'Failed to save. Try again.')
    } else {
      setIsError(false)
      setMsg('Progress logged!')
      setEntries(prev => [...prev, data].sort((a, b) => a.week_number - b.week_number))
      setWeekNumber(weekNumber + 1)
      setWaist(''); setHips(''); setWeight(''); setStrengthNotes(''); setEnergyScore(5)
      setShowForm(false)
      setTimeout(() => setMsg(''), 3000)
    }
  }

  // Chart data — derive from entries
  const chartEntries = entries.filter(e => e.weight || e.waist || e.energy_score)

  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 10 }}>
        Pro Feature
      </p>
      <h1 className="font-display" style={{ fontSize: 38, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 8 }}>
        Progress.
      </h1>
      <p style={{ fontSize: 15, color: 'var(--ink-muted)', marginBottom: 32 }}>
        Log your measurements each week and watch the trends develop.
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'} logged
        </p>
        <button
          onClick={() => setShowForm(v => !v)}
          style={{
            padding: '10px 20px',
            background: showForm ? 'var(--border)' : 'var(--ink)',
            color: showForm ? 'var(--ink-muted)' : '#F8F6F1',
            border: 'none', borderRadius: 99,
            fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          {showForm ? 'Cancel' : '+ Log this week'}
        </button>
      </div>

      {/* Log form */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="paper-card" style={{ padding: '28px', marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 20 }}>
              Week {weekNumber} measurements
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginBottom: 16 }}>
              <FormField label="Week number">
                <input className="kira-input" type="number" min={1} value={weekNumber} onChange={e => setWeekNumber(parseInt(e.target.value))} required />
              </FormField>
              <FormField label="Waist (cm)">
                <input className="kira-input" type="number" step={0.1} value={waist} onChange={e => setWaist(e.target.value)} placeholder="e.g. 72" />
              </FormField>
              <FormField label="Hips (cm)">
                <input className="kira-input" type="number" step={0.1} value={hips} onChange={e => setHips(e.target.value)} placeholder="e.g. 90" />
              </FormField>
              <FormField label="Weight (kg)">
                <input className="kira-input" type="number" step={0.1} value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 65.0" />
              </FormField>
            </div>

            <FormField label={`Energy score — ${energyScore}/10`} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>Low</span>
                <input type="range" min={1} max={10} value={energyScore} onChange={e => setEnergyScore(parseInt(e.target.value))} style={{ flex: 1, accentColor: 'var(--sage)' }} />
                <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>High</span>
              </div>
            </FormField>

            <FormField label="Strength notes — optional">
              <textarea
                className="kira-input" value={strengthNotes}
                onChange={e => setStrengthNotes(e.target.value)}
                placeholder="Any PRs, improvements, or notes on strength..."
                rows={2} style={{ resize: 'vertical' }}
              />
            </FormField>

            {msg && (
              <p style={{
                fontSize: 13, marginTop: 12,
                color: isError ? '#C0392B' : 'var(--sage)',
                background: isError ? '#FEF0F0' : '#F0F5F2',
                padding: '8px 12px', borderRadius: 8,
                border: `1px solid ${isError ? '#F0AAAA' : '#C5D9CB'}`,
              }}>
                {msg}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: 20, padding: '12px 24px',
                background: submitting ? 'var(--border)' : 'var(--ink)',
                color: submitting ? 'var(--ink-muted)' : '#F8F6F1',
                border: 'none', borderRadius: 99,
                fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600,
                cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
              }}
            >
              {submitting ? 'Saving...' : 'Save progress →'}
            </button>
          </div>
        </form>
      )}

      {msg && !showForm && (
        <p style={{
          fontSize: 13, marginBottom: 16,
          color: isError ? '#C0392B' : 'var(--sage)',
          background: isError ? '#FEF0F0' : '#F0F5F2',
          padding: '8px 12px', borderRadius: 8,
          border: `1px solid ${isError ? '#F0AAAA' : '#C5D9CB'}`,
        }}>
          {msg}
        </p>
      )}

      {/* History table */}
      {loading ? (
        <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Loading...</p>
      ) : entries.length === 0 ? (
        <div style={{ background: '#F4F2EE', borderRadius: 12, padding: '28px', textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>No progress logged yet. Start by logging Week 1 above.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                {['Week', 'Waist', 'Hips', 'Weight', 'Energy', 'Notes'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr key={e.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)' }}>
                  <td style={{ padding: '12px' }}><strong>Week {e.week_number}</strong></td>
                  <td style={{ padding: '12px', color: 'var(--ink-muted)' }}>{e.waist ? `${e.waist}cm` : '—'}</td>
                  <td style={{ padding: '12px', color: 'var(--ink-muted)' }}>{e.hips ? `${e.hips}cm` : '—'}</td>
                  <td style={{ padding: '12px', color: 'var(--ink-muted)' }}>{e.weight ? `${e.weight}kg` : '—'}</td>
                  <td style={{ padding: '12px', color: 'var(--sage)', fontWeight: 600 }}>{e.energy_score ? `${e.energy_score}/10` : '—'}</td>
                  <td style={{ padding: '12px', color: 'var(--ink-muted)', maxWidth: 200 }}>{e.strength_notes ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function FormField({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>{label}</label>
      {children}
    </div>
  )
}
