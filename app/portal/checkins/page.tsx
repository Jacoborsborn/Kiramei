'use client'

import { useState, useEffect } from 'react'

type Checkin = {
  id: string
  week_number: number
  energy: number
  sleep_hrs: number
  sessions_completed: number
  weight: number | null
  notes: string | null
  submitted_at: string
}

export default function CheckinsPage() {
  const [checkins, setCheckins] = useState<Checkin[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)

  // Form state
  const [weekNumber, setWeekNumber] = useState(1)
  const [energy, setEnergy] = useState(5)
  const [sleepHrs, setSleepHrs] = useState('')
  const [sessions, setSessions] = useState('')
  const [weight, setWeight] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetch('/api/kira/checkins')
      .then(r => r.json())
      .then(data => {
        setCheckins(Array.isArray(data) ? data : [])
        // Suggest next week number
        if (Array.isArray(data) && data.length > 0) {
          const max = Math.max(...data.map((c: Checkin) => c.week_number))
          setWeekNumber(max + 1)
        }
      })
      .finally(() => setLoadingHistory(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setMsg('')
    const res = await fetch('/api/kira/checkins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        week_number: weekNumber,
        energy,
        sleep_hrs: parseFloat(sleepHrs),
        sessions_completed: parseInt(sessions),
        weight: weight ? parseFloat(weight) : null,
        notes: notes || null,
      }),
    })
    const data = await res.json()
    setSubmitting(false)
    if (!res.ok) {
      setIsError(true)
      setMsg(data.error ?? 'Failed to submit. Try again.')
    } else {
      setIsError(false)
      setMsg('Check-in submitted!')
      setCheckins(prev => [data, ...prev])
      setWeekNumber(weekNumber + 1)
      setSleepHrs(''); setSessions(''); setWeight(''); setNotes('')
      setEnergy(5)
      setTimeout(() => setMsg(''), 3000)
    }
  }

  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 10 }}>
        Pro Feature
      </p>
      <h1 className="font-display" style={{ fontSize: 38, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 8 }}>
        Weekly Check-in.
      </h1>
      <p style={{ fontSize: 15, color: 'var(--ink-muted)', marginBottom: 40 }}>
        Log your weekly stats so we can track your progress together.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="paper-card" style={{ padding: '32px', marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 24 }}>
            Week {weekNumber} check-in
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            <FormField label="Week number">
              <input
                className="kira-input" type="number" min={1} value={weekNumber}
                onChange={e => setWeekNumber(parseInt(e.target.value))} required
              />
            </FormField>
            <FormField label="Sessions completed">
              <input
                className="kira-input" type="number" min={0} max={7}
                value={sessions} onChange={e => setSessions(e.target.value)} required
                placeholder="e.g. 3"
              />
            </FormField>
            <FormField label="Avg sleep (hrs)">
              <input
                className="kira-input" type="number" min={0} max={24} step={0.5}
                value={sleepHrs} onChange={e => setSleepHrs(e.target.value)} required
                placeholder="e.g. 7.5"
              />
            </FormField>
            <FormField label="Weight (kg) — optional">
              <input
                className="kira-input" type="number" step={0.1} min={0}
                value={weight} onChange={e => setWeight(e.target.value)}
                placeholder="e.g. 65.2"
              />
            </FormField>
          </div>

          {/* Energy slider */}
          <FormField label={`Energy level — ${energy}/10`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>Low</span>
              <input
                type="range" min={1} max={10} value={energy}
                onChange={e => setEnergy(parseInt(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--sage)' }}
              />
              <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>High</span>
            </div>
          </FormField>

          <FormField label="Notes — optional" style={{ marginTop: 16 }}>
            <textarea
              className="kira-input"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="How did the week feel? Any highlights or struggles..."
              rows={3}
              style={{ resize: 'vertical' }}
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
              marginTop: 24, padding: '13px 28px',
              background: submitting ? 'var(--border)' : 'var(--ink)',
              color: submitting ? 'var(--ink-muted)' : '#F8F6F1',
              border: 'none', borderRadius: 99,
              fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600,
              cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
            }}
          >
            {submitting ? 'Submitting...' : 'Submit check-in →'}
          </button>
        </div>
      </form>

      {/* History */}
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>
        History
      </p>

      {loadingHistory ? (
        <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Loading...</p>
      ) : checkins.length === 0 ? (
        <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>No check-ins yet. Submit your first one above.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {checkins.map(c => (
            <div key={c.id} style={{
              background: '#FDFCF9', border: '1px solid var(--border)', borderRadius: 12,
              padding: '20px', display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 16,
            }}>
              <StatItem label="Week" value={`Week ${c.week_number}`} />
              <StatItem label="Energy" value={`${c.energy}/10`} />
              <StatItem label="Sleep" value={`${c.sleep_hrs}h`} />
              <StatItem label="Sessions" value={String(c.sessions_completed)} />
              {c.weight && <StatItem label="Weight" value={`${c.weight}kg`} />}
              {c.notes && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 4 }}>Notes</p>
                  <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{c.notes}</p>
                </div>
              )}
            </div>
          ))}
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

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 3 }}>{label}</p>
      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{value}</p>
    </div>
  )
}
