'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Studio = dynamic(() => import('./Studio'), { ssr: false })

const SECRET = process.env.NEXT_PUBLIC_STUDIO_SECRET ?? ''

// ── Types ──────────────────────────────────────────────────────────────────

type EnrichedLead = {
  id: string
  name: string
  email: string
  age: number
  country: string
  plan_selected: string
  status: 'pending' | 'paid' | 'accepted' | 'rejected'
  created_at: string
  goal: string | null
  fitness_level: string | null
  days_per_week: string | null
  equipment: string | null
  injuries: string | null
  instagram: string | null
  referral_source: string | null
  notes: string | null
  user_id: string | null
  programme_sent: boolean
  checkin_count: number
  last_checkin_at: string | null
  progress_count: number
  has_body_comp: boolean
}

type ActivityItem = {
  type: 'checkin' | 'progress'
  client_name: string
  week_number: number
  submitted_at: string
  energy?: number
  weight?: number
}

type OverviewData = {
  leads: EnrichedLead[]
  recent_activity: ActivityItem[]
}

type Tab = 'overview' | 'clients' | 'activity' | 'studio' | 'bodycomp'

const STATUS_CYCLE: EnrichedLead['status'][] = ['pending', 'paid', 'accepted', 'rejected']
const STATUS_COLORS: Record<string, string> = {
  pending: '#B5803A',
  paid: '#2D6A4F',
  accepted: 'var(--sage)',
  rejected: '#999',
}

// ── Needs-attention logic ──────────────────────────────────────────────────

function flagClient(lead: EnrichedLead): string[] {
  const flags: string[] = []
  if (lead.status === 'paid' && !lead.programme_sent) flags.push('Programme pending')
  if (lead.status === 'accepted' && lead.plan_selected === 'bundle' && lead.checkin_count === 0) flags.push('No check-ins yet')
  if (lead.status === 'accepted' && lead.last_checkin_at) {
    const days = (Date.now() - new Date(lead.last_checkin_at).getTime()) / 86400000
    if (days > 14) flags.push('Follow-up due')
  }
  if (lead.status === 'pending') {
    const hours = (Date.now() - new Date(lead.created_at).getTime()) / 3600000
    if (hours > 48) flags.push('Awaiting payment')
  }
  return flags
}

// ── Main component ─────────────────────────────────────────────────────────

type Props = { onClose: () => void }

export default function FounderDashboard({ onClose }: Props) {
  const [visible, setVisible] = useState(false)
  const [tab, setTab] = useState<Tab>('overview')
  const [data, setData] = useState<OverviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (tab !== 'studio') fetchOverview()
  }, [tab])

  async function fetchOverview() {
    if (tab === 'studio') return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/kira/studio/overview', {
        headers: { 'x-studio-secret': SECRET },
      })
      if (!res.ok) throw new Error('Failed to load')
      setData(await res.json())
    } catch {
      setError('Could not load data. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  async function cycleStatus(lead: EnrichedLead) {
    const nextStatus = STATUS_CYCLE[(STATUS_CYCLE.indexOf(lead.status) + 1) % STATUS_CYCLE.length]
    const res = await fetch(`/api/kira/leads/${lead.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus }),
    })
    if (res.ok && data) {
      setData({
        ...data,
        leads: data.leads.map(l => l.id === lead.id ? { ...l, status: nextStatus } : l),
      })
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'clients', label: 'Clients' },
    { id: 'activity', label: 'Activity' },
    { id: 'studio', label: 'Studio' },
    { id: 'bodycomp', label: 'Body Comp' },
  ]

  const needsAttention = data?.leads.filter(l => flagClient(l).length > 0) ?? []
  const proClients = data?.leads.filter(l => l.plan_selected === 'bundle' && l.user_id) ?? []

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--paper)',
      transform: visible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.3s cubic-bezier(0.32,0,0.15,1)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: 56,
        borderBottom: '1px solid var(--border)',
        background: 'var(--ink)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="font-display" style={{ fontSize: 20, fontWeight: 600, color: '#F8F6F1', lineHeight: 1 }}>Founder</span>
          <span style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em' }}>Kira Mei</span>
          {needsAttention.length > 0 && (
            <span style={{
              background: '#C0392B', color: '#fff', fontSize: 11, fontWeight: 700,
              borderRadius: 99, padding: '2px 8px', letterSpacing: '0.04em',
            }}>
              {needsAttention.length} need attention
            </span>
          )}
        </div>
        <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 20, padding: '8px 10px', borderRadius: 8, fontFamily: 'DM Sans, sans-serif' }}>×</button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', background: 'var(--surface)', flexShrink: 0, overflowX: 'auto' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '12px 20px', border: 'none', cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: tab === t.id ? 600 : 400,
              color: tab === t.id ? 'var(--ink)' : 'var(--ink-muted)',
              background: 'transparent',
              borderBottom: tab === t.id ? '2px solid var(--ink)' : '2px solid transparent',
              whiteSpace: 'nowrap', transition: 'color 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        {tab === 'studio' ? (
          // Studio is position:fixed so it overlays everything — close returns to overview tab
          <div style={{ position: 'absolute', inset: 0 }}>
            <Studio onClose={() => setTab('overview')} />
          </div>
        ) : loading ? (
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--ink-muted)', fontSize: 14 }}>Loading...</div>
        ) : error ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#C0392B', fontSize: 14 }}>{error}</div>
        ) : (
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>

            {tab === 'overview' && <OverviewTab data={data!} needsAttention={needsAttention} />}
            {tab === 'clients' && <ClientsTab leads={data!.leads} onCycleStatus={cycleStatus} />}
            {tab === 'activity' && <ActivityTab proClients={proClients} allActivity={data!.recent_activity} />}
            {tab === 'bodycomp' && <BodyCompTab proClients={proClients} />}

          </div>
        )}
      </div>
    </div>
  )
}

// ── Overview Tab ───────────────────────────────────────────────────────────

function OverviewTab({ data, needsAttention }: { data: OverviewData; needsAttention: EnrichedLead[] }) {
  const counts = data.leads.reduce((acc, l) => { acc[l.status] = (acc[l.status] || 0) + 1; return acc }, {} as Record<string, number>)

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 40 }}>
        {[
          { label: 'Total clients', value: data.leads.length },
          { label: 'Active', value: counts['accepted'] || 0 },
          { label: 'Paid, awaiting plan', value: counts['paid'] || 0 },
          { label: 'Pending payment', value: counts['pending'] || 0 },
          { label: 'Needs attention', value: needsAttention.length, alert: needsAttention.length > 0 },
        ].map(s => (
          <div key={s.label} style={{
            background: s.alert ? '#FEF0F0' : '#FDFCF9',
            border: `1px solid ${s.alert ? '#F0AAAA' : 'var(--border)'}`,
            borderRadius: 12, padding: '18px 20px',
          }}>
            <p style={{ fontSize: 28, fontWeight: 700, color: s.alert ? '#C0392B' : 'var(--ink)', marginBottom: 4 }}>{s.value}</p>
            <p style={{ fontSize: 12, color: s.alert ? '#C0392B' : 'var(--ink-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Needs attention */}
      {needsAttention.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <SectionLabel>Needs attention</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {needsAttention.map(lead => (
              <div key={lead.id} style={{
                background: '#FDFCF9', border: '1px solid #F0AAAA',
                borderRadius: 12, padding: '16px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
              }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{lead.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{lead.email} · {lead.plan_selected === 'bundle' ? 'Pro' : 'Standard'}</p>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {flagClient(lead).map(flag => (
                    <span key={flag} style={{ fontSize: 11, fontWeight: 600, background: '#FEF0F0', color: '#C0392B', border: '1px solid #F0AAAA', borderRadius: 99, padding: '3px 10px' }}>
                      {flag}
                    </span>
                  ))}
                </div>
                <a href={`mailto:${lead.email}`} style={{ fontSize: 13, color: 'var(--sage)', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  Email →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent activity */}
      <SectionLabel>Recent activity</SectionLabel>
      {data.recent_activity.length === 0 ? (
        <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>No client activity yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {data.recent_activity.map((item, i) => (
            <div key={i} style={{
              background: '#FDFCF9', border: '1px solid var(--border)',
              borderRadius: i === 0 ? '12px 12px 0 0' : i === data.recent_activity.length - 1 ? '0 0 12px 12px' : '0',
              padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16 }}>{item.type === 'checkin' ? '✓' : '↗'}</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>
                    <strong>{item.client_name}</strong> — {item.type === 'checkin' ? 'weekly check-in' : 'progress log'} · Week {item.week_number}
                  </p>
                  {(item.energy || item.weight) && (
                    <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>
                      {item.energy ? `Energy ${item.energy}/10` : ''}
                      {item.energy && item.weight ? ' · ' : ''}
                      {item.weight ? `${item.weight}kg` : ''}
                    </p>
                  )}
                </div>
              </div>
              <p style={{ fontSize: 12, color: 'var(--ink-faint)', whiteSpace: 'nowrap' }}>
                {new Date(item.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Clients Tab ────────────────────────────────────────────────────────────

function ClientsTab({ leads, onCycleStatus }: { leads: EnrichedLead[]; onCycleStatus: (l: EnrichedLead) => void }) {
  const [filter, setFilter] = useState<string>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)
  const counts = leads.reduce((acc, l) => { acc[l.status] = (acc[l.status] || 0) + 1; return acc }, {} as Record<string, number>)

  return (
    <div>
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        {(['all', 'pending', 'paid', 'accepted', 'rejected'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 16px', borderRadius: 99, cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: 13,
            fontWeight: filter === f ? 600 : 400,
            border: `1.5px solid ${filter === f ? 'var(--sage)' : 'var(--border)'}`,
            background: filter === f ? 'var(--sage-light)' : 'transparent',
            color: filter === f ? 'var(--sage-dark)' : 'var(--ink-muted)',
            textTransform: 'capitalize',
          }}>
            {f} {f !== 'all' && counts[f] ? `(${counts[f]})` : f === 'all' ? `(${leads.length})` : ''}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>No clients in this category.</p>
      ) : (
        <div style={{ background: '#FDFCF9', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Name', 'Plan', 'Status', 'Programme', 'Check-ins', 'Joined', 'Email'].map(h => (
                    <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <>
                    <tr
                      key={lead.id}
                      onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                      style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.012)' }}
                    >
                      <td style={{ padding: '13px 16px', fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                        {lead.name}
                        {flagClient(lead).length > 0 && <span style={{ marginLeft: 6, fontSize: 10, color: '#C0392B' }}>●</span>}
                      </td>
                      <td style={{ padding: '13px 16px' }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: lead.plan_selected === 'bundle' ? 'var(--sage)' : 'var(--ink-muted)' }}>
                          {lead.plan_selected === 'bundle' ? 'Pro' : 'Standard'}
                        </span>
                      </td>
                      <td style={{ padding: '13px 16px' }}>
                        <button
                          onClick={e => { e.stopPropagation(); onCycleStatus(lead) }}
                          style={{
                            padding: '4px 10px', borderRadius: 99, cursor: 'pointer',
                            fontSize: 11, fontWeight: 700, border: 'none', fontFamily: 'DM Sans, sans-serif',
                            background: lead.status === 'accepted' ? 'var(--sage-light)' : lead.status === 'paid' ? '#E8F5EE' : lead.status === 'rejected' ? '#F5F5F5' : '#FFF8EE',
                            color: STATUS_COLORS[lead.status],
                            textTransform: 'capitalize',
                          }}
                        >
                          {lead.status}
                        </button>
                      </td>
                      <td style={{ padding: '13px 16px', fontSize: 12 }}>
                        {lead.programme_sent
                          ? <span style={{ color: 'var(--sage)', fontWeight: 600 }}>Sent ✓</span>
                          : <span style={{ color: 'var(--ink-faint)' }}>Not sent</span>}
                      </td>
                      <td style={{ padding: '13px 16px', color: 'var(--ink-muted)', fontSize: 13 }}>
                        {lead.checkin_count > 0 ? `${lead.checkin_count} (last: ${new Date(lead.last_checkin_at!).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })})` : '—'}
                      </td>
                      <td style={{ padding: '13px 16px', color: 'var(--ink-muted)', whiteSpace: 'nowrap', fontSize: 13 }}>
                        {new Date(lead.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })}
                      </td>
                      <td style={{ padding: '13px 16px' }}>
                        <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()} style={{ color: 'var(--sage)', textDecoration: 'none', fontSize: 13 }}>{lead.email}</a>
                      </td>
                    </tr>
                    {expanded === lead.id && (
                      <tr key={`${lead.id}-exp`} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td colSpan={7} style={{ padding: '0 16px 20px', background: 'var(--paper)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10, paddingTop: 16 }}>
                            {[
                              ['Age', lead.age],
                              ['Country', lead.country],
                              ['Goal', lead.goal],
                              ['Fitness level', lead.fitness_level],
                              ['Days/week', lead.days_per_week],
                              ['Equipment', lead.equipment],
                              ['Instagram', lead.instagram ? `@${lead.instagram}` : null],
                              ['Found via', lead.referral_source],
                              ['Injuries', lead.injuries],
                              ['Notes', lead.notes],
                              ['Body comp', lead.has_body_comp ? 'Filed ✓' : 'Not filed'],
                              ['Progress logs', lead.progress_count || '0'],
                            ].filter(([, v]) => v != null && v !== '').map(([k, v]) => (
                              <div key={String(k)} style={{ padding: '10px 14px', background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{k}</div>
                                <div style={{ fontSize: 13, color: 'var(--ink)' }}>{String(v)}</div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Activity Tab ───────────────────────────────────────────────────────────

function ActivityTab({ proClients, allActivity }: { proClients: EnrichedLead[]; allActivity: ActivityItem[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  if (proClients.length === 0) {
    return <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>No Pro clients yet.</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SectionLabel>Pro client activity</SectionLabel>
      {proClients.map(client => {
        const clientActivity = allActivity.filter(a => a.client_name === client.name)
        const checkins = clientActivity.filter(a => a.type === 'checkin')
        const avgEnergy = checkins.filter(c => c.energy).length > 0
          ? Math.round(checkins.filter(c => c.energy).reduce((s, c) => s + (c.energy ?? 0), 0) / checkins.filter(c => c.energy).length * 10) / 10
          : null
        const isExpanded = expanded === client.id

        return (
          <div key={client.id} style={{ background: '#FDFCF9', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <button
              onClick={() => setExpanded(isExpanded ? null : client.id)}
              style={{
                width: '100%', padding: '18px 20px', background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, textAlign: 'left',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flex: 1, flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{client.name}</p>
                  <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>{client.email}</p>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <MiniStat label="Check-ins" value={String(client.checkin_count)} />
                  <MiniStat label="Progress logs" value={String(client.progress_count)} />
                  {avgEnergy && <MiniStat label="Avg energy" value={`${avgEnergy}/10`} />}
                  {client.last_checkin_at && (
                    <MiniStat label="Last check-in" value={new Date(client.last_checkin_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} />
                  )}
                </div>
              </div>
              <span style={{ fontSize: 18, color: 'var(--ink-muted)' }}>{isExpanded ? '↑' : '↓'}</span>
            </button>

            {isExpanded && (
              <div style={{ borderTop: '1px solid var(--border)', padding: '16px 20px' }}>
                {checkins.length === 0 ? (
                  <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>No check-ins logged yet.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                          {['Week', 'Energy', 'Weight', 'Date'].map(h => (
                            <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {checkins.sort((a, b) => a.week_number - b.week_number).map((c, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--ink)' }}>Week {c.week_number}</td>
                            <td style={{ padding: '10px 12px', color: 'var(--sage)' }}>{c.energy ? `${c.energy}/10` : '—'}</td>
                            <td style={{ padding: '10px 12px', color: 'var(--ink-muted)' }}>{c.weight ? `${c.weight}kg` : '—'}</td>
                            <td style={{ padding: '10px 12px', color: 'var(--ink-faint)' }}>
                              {new Date(c.submitted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Body Comp Tab ──────────────────────────────────────────────────────────

function BodyCompTab({ proClients }: { proClients: EnrichedLead[] }) {
  const [selectedId, setSelectedId] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [isError, setIsError] = useState(false)

  // Form state
  const [frameType, setFrameType] = useState('')
  const [bodyFatEst, setBodyFatEst] = useState('')
  const [hormonalNotes, setHormonalNotes] = useState('')
  const [priorityAreas, setPriorityAreas] = useState('')
  const [measurements, setMeasurements] = useState<Array<{ key: string; value: string }>>([{ key: '', value: '' }])

  useEffect(() => {
    if (!selectedId) return
    setLoading(true)
    fetch(`/api/kira/studio/body-comp?lead_id=${selectedId}`, { headers: { 'x-studio-secret': SECRET } })
      .then(r => r.json())
      .then(data => {
        if (data) {
          setFrameType(data.frame_type ?? '')
          setBodyFatEst(data.body_fat_est ?? '')
          setHormonalNotes(data.hormonal_notes ?? '')
          setPriorityAreas(data.priority_areas ?? '')
          const m = data.measurements ? Object.entries(data.measurements).map(([k, v]) => ({ key: k, value: String(v) })) : []
          setMeasurements(m.length > 0 ? m : [{ key: '', value: '' }])
        } else {
          setFrameType(''); setBodyFatEst(''); setHormonalNotes(''); setPriorityAreas('')
          setMeasurements([{ key: '', value: '' }])
        }
      })
      .finally(() => setLoading(false))
  }, [selectedId])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    const measurementsObj = measurements
      .filter(m => m.key.trim())
      .reduce((acc, m) => ({ ...acc, [m.key.trim()]: m.value.trim() }), {} as Record<string, string>)

    const res = await fetch('/api/kira/studio/body-comp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-studio-secret': SECRET },
      body: JSON.stringify({ lead_id: selectedId, frame_type: frameType, body_fat_est: bodyFatEst, hormonal_notes: hormonalNotes, priority_areas: priorityAreas, measurements: measurementsObj }),
    })
    setSaving(false)
    if (res.ok) {
      setIsError(false); setMsg('Body comp report saved. Client can now see it in their portal.')
    } else {
      const d = await res.json()
      setIsError(true); setMsg(d.error ?? 'Failed to save.')
    }
    setTimeout(() => setMsg(''), 4000)
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <SectionLabel>File a body composition report</SectionLabel>
      <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 28 }}>
        Select a Pro client and fill in their body comp analysis. This will appear immediately in their portal.
      </p>

      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', display: 'block', marginBottom: 8 }}>Client</label>
        <select className="kira-input" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
          <option value="">Select a Pro client…</option>
          {proClients.map(c => (
            <option key={c.id} value={c.id}>{c.name} — {c.email}</option>
          ))}
        </select>
        {proClients.length === 0 && <p style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 8 }}>No Pro clients with portal accounts yet.</p>}
      </div>

      {selectedId && (
        loading ? (
          <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Loading existing report...</p>
        ) : (
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <BCField label="Frame type" value={frameType} onChange={setFrameType} placeholder="e.g. Ectomorph, Mesomorph, Endomorph" />
            <BCField label="Estimated body fat" value={bodyFatEst} onChange={setBodyFatEst} placeholder="e.g. 22–25%" />
            <BCField label="Priority focus areas" value={priorityAreas} onChange={setPriorityAreas} placeholder="e.g. Core, glutes, upper body definition" />
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', display: 'block', marginBottom: 8 }}>Hormonal / lifestyle notes</label>
              <textarea className="kira-input" value={hormonalNotes} onChange={e => setHormonalNotes(e.target.value)} rows={3} style={{ resize: 'vertical' }} placeholder="Cycle phase considerations, sleep, stress, etc." />
            </div>

            {/* Measurements key/value pairs */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', display: 'block', marginBottom: 8 }}>Measurements</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {measurements.map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8 }}>
                    <input className="kira-input" value={m.key} onChange={e => setMeasurements(prev => prev.map((x, j) => j === i ? { ...x, key: e.target.value } : x))} placeholder="Label (e.g. Waist)" style={{ flex: 1 }} />
                    <input className="kira-input" value={m.value} onChange={e => setMeasurements(prev => prev.map((x, j) => j === i ? { ...x, value: e.target.value } : x))} placeholder="Value (e.g. 74cm)" style={{ flex: 1 }} />
                    <button type="button" onClick={() => setMeasurements(prev => prev.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', fontSize: 18, padding: '0 4px' }}>×</button>
                  </div>
                ))}
                <button type="button" onClick={() => setMeasurements(prev => [...prev, { key: '', value: '' }])} style={{ background: 'none', border: '1px dashed var(--border)', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13, color: 'var(--ink-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                  + Add measurement
                </button>
              </div>
            </div>

            {msg && (
              <p style={{ fontSize: 13, color: isError ? '#C0392B' : 'var(--sage)', background: isError ? '#FEF0F0' : '#F0F5F2', padding: '8px 12px', borderRadius: 8, border: `1px solid ${isError ? '#F0AAAA' : '#C5D9CB'}` }}>{msg}</p>
            )}

            <button type="submit" disabled={saving} style={{ padding: '13px 28px', background: saving ? 'var(--border)' : 'var(--ink)', color: saving ? 'var(--ink-muted)' : '#F8F6F1', border: 'none', borderRadius: 99, fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', transition: 'all 0.15s', width: 'fit-content' }}>
              {saving ? 'Saving...' : 'Save report →'}
            </button>
          </form>
        )
      )}
    </div>
  )
}

// ── Small helpers ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>
      {children}
    </p>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 12px' }}>
      <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 2 }}>{label}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{value}</p>
    </div>
  )
}

function BCField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', display: 'block', marginBottom: 8 }}>{label}</label>
      <input className="kira-input" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  )
}
