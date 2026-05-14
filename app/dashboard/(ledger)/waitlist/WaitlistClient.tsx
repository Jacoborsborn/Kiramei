'use client'

import { useState, useMemo } from 'react'
import { Stat, LCard, Tag, MiniChart } from '../LedgerComponents'

type Lead = { id: string; email: string; product: string; joined: string }

export default function WaitlistClient({
  waitlist, series
}: {
  waitlist: Lead[]; series: number[]
}) {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [composing, setComposing] = useState(false)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const counts = {
    all:       waitlist.length,
    bundle:    waitlist.filter(w => w.product.toLowerCase().includes('bundle')).length,
    nutrition: waitlist.filter(w => w.product.toLowerCase().includes('nutrition')).length,
  }

  const list = useMemo(() => {
    if (filter === 'all') return waitlist
    return waitlist.filter(w => w.product.toLowerCase().includes(filter))
  }, [filter, waitlist])

  function toggle(id: string) {
    const next = new Set(selected)
    next.has(id) ? next.delete(id) : next.add(id)
    setSelected(next)
  }

  function toggleAll() {
    if (selected.size === list.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(list.map(w => w.id)))
    }
  }

  async function sendEmails() {
    setSending(true)
    const ids = Array.from(selected)
    await fetch('/api/founder/waitlist/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, subject, body }),
    })
    setSending(false)
    setSent(true)
    setComposing(false)
    setSelected(new Set())
  }

  function exportCSV() {
    const segment = filter === 'all' ? '' : `?segment=${filter}`
    window.open(`/api/founder/waitlist/export${segment}`, '_blank')
  }

  const bundleCount = counts.bundle
  const nutritionCount = counts.nutrition

  return (
    <>
      <div className="stat-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Stat label="Combined waitlist" value={counts.all.toLocaleString('en-GB')} delta="total" spark={series} />
        <Stat label="Bundle waitlist" value={bundleCount.toLocaleString('en-GB')} delta="wants the bundle" spark={series} scribble="strongest signal" />
        <Stat label="Nutrition waitlist" value={nutritionCount.toLocaleString('en-GB')} delta="wants nutrition" spark={series} />
      </div>

      <LCard
        title="Waitlist entries"
        eyebrow="10 · the inbox of intent"
        action={
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="tabs" style={{ borderBottom: 'none', margin: 0 }}>
              {(['all', 'bundle', 'nutrition'] as const).map(f => (
                <div key={f} className={`tab${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)} · {counts[f]}
                </div>
              ))}
            </div>
            <button className="ldg-btn ldg-btn-ghost" onClick={exportCSV}>Export CSV</button>
          </div>
        }
      >
        {selected.size > 0 && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 12px', background: 'rgba(184,84,58,0.06)',
            border: '1px solid rgba(184,84,58,0.2)', borderRadius: 2, marginBottom: 10,
          }}>
            <span className="small-mono">{selected.size} SELECTED</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="ldg-btn ldg-btn-ghost" onClick={() => setSelected(new Set())}>Clear</button>
              <button className="ldg-btn ldg-btn-accent" onClick={() => setComposing(true)}>
                Email selected
              </button>
            </div>
          </div>
        )}

        {sent && (
          <div style={{
            padding: '10px 12px', background: 'rgba(122,139,110,0.08)',
            border: '1px solid rgba(122,139,110,0.2)', borderRadius: 2, marginBottom: 10,
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--sage)',
          }}>
            EMAILS QUEUED ✓
          </div>
        )}

        <table className="ltable">
          <thead>
            <tr>
              <th style={{ width: 24 }}>
                <input type="checkbox"
                  checked={selected.size > 0 && selected.size === list.length}
                  onChange={toggleAll}
                />
              </th>
              <th>Email</th>
              <th>Wants</th>
              <th>Joined</th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {list.map(w => (
              <tr key={w.id} className={selected.has(w.id) ? 'checked' : ''}>
                <td><input type="checkbox" checked={selected.has(w.id)} onChange={() => toggle(w.id)} /></td>
                <td><strong>{w.email}</strong></td>
                <td>
                  <Tag kind={w.product.toLowerCase().includes('bundle') ? 'tag-accent' : 'tag-sage'}>
                    {w.product}
                  </Tag>
                </td>
                <td className="mono" style={{ fontSize: 11.5, color: 'var(--ink-muted)' }}>{w.joined}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--paper-edge)' }}>
          <span className="small-mono">SHOWING {list.length} OF {counts.all}</span>
        </div>
      </LCard>

      {composing && (
        <LCard title="Compose email" eyebrow="11 · go to market" style={{ marginTop: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
            <div>
              <div className="field">
                <label>Recipients</label>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, padding: '8px 0', color: 'var(--ink-muted)' }}>
                  {selected.size} selected leads
                </div>
              </div>
              <div className="field">
                <label>Subject</label>
                <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="The Bundle is open." />
              </div>
              <div className="field">
                <label>Body</label>
                <textarea rows={6} value={body} onChange={e => setBody(e.target.value)}
                  placeholder={"Hey —\n\nThe Bundle is now live.\n\n→ kiramei.co/bundle\n\n— Kira"} />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="ldg-btn ldg-btn-accent" onClick={sendEmails} disabled={sending || !subject || !body}>
                  {sending ? 'Sending…' : 'Send via Resend'}
                </button>
                <button className="ldg-btn ldg-btn-ghost" onClick={() => setComposing(false)}>Cancel</button>
              </div>
            </div>
            <div>
              <LCard eyebrow="12 · the build">
                <MiniChart values={series.length ? series : [0]} height={160} />
                <div className="divider" />
                <div className="margin-pad">assume 6–12% of waitlist converts on launch</div>
              </LCard>
            </div>
          </div>
        </LCard>
      )}
    </>
  )
}
