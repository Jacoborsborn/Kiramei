'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

type Lead = {
  id: string
  created_at: string
  name: string
  age: number
  country: string
  email: string
  plan_selected: string
  goal: string | null
  fitness_level: string | null
  days_per_week: string | null
  equipment: string | null
  injuries: string | null
  referral_source: string | null
  notes: string | null
  instagram: string | null
  status: 'pending' | 'paid' | 'accepted' | 'rejected'
}

const STATUS_CYCLE: Lead['status'][] = ['pending', 'paid', 'accepted', 'rejected']

const STATUS_LABELS: Record<Lead['status'], string> = {
  pending: 'Pending',
  paid: 'Paid',
  accepted: 'Accepted',
  rejected: 'Rejected',
}

type FilterTab = 'all' | Lead['status']

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState<FilterTab>('all')
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const router = useRouter()

  function getSupabase() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  useEffect(() => {
    getSupabase().auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/dashboard/login')
    })
  }, [])

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const url = filter === 'all' ? '/api/kira/leads' : `/api/kira/leads?status=${filter}`
    const res = await fetch(url)
    if (res.ok) setLeads(await res.json())
    setLoading(false)
  }, [filter])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  async function cycleStatus(lead: Lead) {
    const currentIdx = STATUS_CYCLE.indexOf(lead.status)
    const nextStatus = STATUS_CYCLE[(currentIdx + 1) % STATUS_CYCLE.length]

    const res = await fetch(`/api/kira/leads/${lead.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus }),
    })

    if (res.ok) {
      setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: nextStatus } : l))
    }
  }

  async function signOut() {
    await getSupabase().auth.signOut()
    router.push('/dashboard/login')
  }

  const tabs: FilterTab[] = ['all', 'pending', 'paid', 'accepted', 'rejected']

  const counts = leads.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Header */}
      <header style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="font-display" style={{ fontSize: 20, fontWeight: 600, color: 'var(--ink)' }}>Kira Mei</span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)' }}>Leads</span>
        </div>
        <button
          onClick={signOut}
          style={{ fontSize: 13, color: 'var(--ink-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 12px' }}
        >
          Sign out
        </button>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
          {(['pending', 'paid', 'accepted', 'rejected'] as Lead['status'][]).map(s => (
            <div key={s} className="paper-card" style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink)' }}>{counts[s] || 0}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2, textTransform: 'capitalize' }}>{s}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '7px 16px',
                borderRadius: 99,
                border: `1.5px solid ${filter === tab ? 'var(--sage)' : 'var(--border)'}`,
                background: filter === tab ? 'var(--sage-light)' : 'var(--surface)',
                color: filter === tab ? 'var(--sage-dark)' : 'var(--ink-muted)',
                fontSize: 13,
                fontWeight: filter === tab ? 600 : 400,
                fontFamily: 'DM Sans, sans-serif',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--ink-faint)' }}>Loading...</div>
        ) : leads.length === 0 ? (
          <div className="paper-card" style={{ padding: 48, textAlign: 'center', color: 'var(--ink-muted)' }}>
            No leads yet.
          </div>
        ) : (
          <div className="paper-card" style={{ overflow: 'hidden' }}>
            {/* Desktop table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Name', 'Age', 'Country', 'Plan', 'Goal', 'Status', 'Date', 'Email'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map(lead => (
                    <>
                      <tr
                        key={lead.id}
                        onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                        style={{ borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.1s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--paper)'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                      >
                        <td style={{ padding: '14px 16px', fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{lead.name}</td>
                        <td style={{ padding: '14px 16px', color: 'var(--ink-muted)' }}>{lead.age}</td>
                        <td style={{ padding: '14px 16px', color: 'var(--ink-muted)', whiteSpace: 'nowrap' }}>{lead.country}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{ fontSize: 12, fontWeight: 600, color: lead.plan_selected === 'bundle' ? 'var(--sage-dark)' : 'var(--ink-muted)', textTransform: 'capitalize' }}>
                            {lead.plan_selected === 'bundle' ? '2-Month' : '1-Month'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--ink-muted)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.goal || '—'}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <button
                            onClick={e => { e.stopPropagation(); cycleStatus(lead) }}
                            className={`status-${lead.status}`}
                            style={{ padding: '4px 10px', borderRadius: 99, fontSize: 12, fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', whiteSpace: 'nowrap' }}
                          >
                            {STATUS_LABELS[lead.status]}
                          </button>
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--ink-muted)', whiteSpace: 'nowrap', fontSize: 13 }}>
                          {new Date(lead.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()} style={{ color: 'var(--sage)', textDecoration: 'none', fontSize: 13 }}>
                            {lead.email}
                          </a>
                        </td>
                      </tr>
                      {expanded === lead.id && (
                        <tr key={`${lead.id}-detail`} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td colSpan={8} style={{ padding: '0 16px 20px', background: 'var(--paper)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, paddingTop: 16 }}>
                              {[
                                ['Fitness level', lead.fitness_level],
                                ['Days/week', lead.days_per_week],
                                ['Equipment', lead.equipment],
                                ['Instagram', lead.instagram ? `@${lead.instagram}` : null],
                                ['Found via', lead.referral_source],
                                ['Injuries', lead.injuries],
                                ['Notes', lead.notes],
                              ].filter(([, v]) => v).map(([k, v]) => (
                                <div key={String(k)} style={{ padding: '10px 14px', background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }}>
                                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{k}</div>
                                  <div style={{ fontSize: 13, color: 'var(--ink)' }}>{v}</div>
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
    </div>
  )
}
