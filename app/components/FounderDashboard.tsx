'use client'

import { useState, useEffect } from 'react'

const SECRET = process.env.NEXT_PUBLIC_STUDIO_SECRET ?? ''

const WEEK_SPLITS = ['Full Body', 'Full Body', 'Upper / Lower', 'Upper / Lower', 'PPL', 'PPL', 'PPL Advanced', 'PPL Advanced']

type Sale = {
  id: string
  name: string
  email: string
  product: string
  amount: number
  created: number
}

type StatsData = {
  revenue: { today: number; week: number; allTime: number; totalOrders: number }
  recentSales: Sale[]
  breakdown: { training: number; nutrition: number; bundle: number; programme: number; template: number }
}

function fmt(n: number) {
  return '£' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function timeAgo(unix: number) {
  const diff = Math.floor(Date.now() / 1000 - unix)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function productBadge(product: string) {
  if (product.includes('Programme')) return { label: 'Programme', color: '#4A7C59' }
  if (product.includes('Bundle')) return { label: 'Bundle', color: '#8B6FDB' }
  if (product.includes('Template')) return { label: 'Template', color: '#C07850' }
  if (product.includes('Training')) return { label: 'Training PDF', color: '#6B7FDB' }
  if (product.includes('Nutrition')) return { label: 'Nutrition', color: '#C07850' }
  return { label: product, color: '#888' }
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '20px 24px' }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>{label}</p>
      <p style={{ fontSize: 26, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.02em' }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: '#999', marginTop: 4 }}>{sub}</p>}
    </div>
  )
}

function OverviewTab({ stats }: { stats: StatsData }) {
  const { revenue, recentSales, breakdown } = stats
  const totalBreakdown = Object.values(breakdown).reduce((a, b) => a + b, 0) || 1

  const products = [
    { label: 'Training Programme', count: breakdown.programme, color: '#4A7C59' },
    { label: 'Build Your Own Template', count: breakdown.template, color: '#C07850' },
    { label: 'Training Blueprint PDF', count: breakdown.training, color: '#6B7FDB' },
    { label: 'Nutrition Blueprint', count: breakdown.nutrition, color: '#DB8B6F' },
    { label: 'Full Stack Bundle', count: breakdown.bundle, color: '#8B6FDB' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
        <StatCard label="Today" value={fmt(revenue.today)} />
        <StatCard label="This week" value={fmt(revenue.week)} />
        <StatCard label="All time" value={fmt(revenue.allTime)} />
        <StatCard label="Total orders" value={String(revenue.totalOrders)} />
      </div>

      <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, padding: '20px 24px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999', marginBottom: 16 }}>
          Last 30 days — product split
        </p>
        {products.map(({ label, count, color }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: '#333', fontWeight: 500 }}>{label}</span>
              <span style={{ fontSize: 13, color: '#666' }}>{count} sales</span>
            </div>
            <div style={{ height: 6, background: '#F0EDE8', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(count / totalBreakdown) * 100}%`, background: color, borderRadius: 99, transition: 'width 0.6s ease' }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #E8E4DE' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#999' }}>Recent sales</p>
        </div>
        {recentSales.slice(0, 10).map(sale => {
          const badge = productBadge(sale.product)
          return (
            <div key={sale.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid #F2EFE9', gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 2 }}>{sale.name || 'Anonymous'}</p>
                <p style={{ fontSize: 12, color: '#999', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sale.email}</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: badge.color + '18', color: badge.color, whiteSpace: 'nowrap' }}>
                {badge.label}
              </span>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{fmt(sale.amount)}</p>
                <p style={{ fontSize: 11, color: '#bbb' }}>{timeAgo(sale.created)}</p>
              </div>
            </div>
          )
        })}
        {recentSales.length === 0 && (
          <p style={{ padding: '32px 24px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>No sales yet</p>
        )}
      </div>
    </div>
  )
}

function OrdersTab({ sales }: { sales: Sale[] }) {
  const [query, setQuery] = useState('')
  const filtered = sales.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.email.toLowerCase().includes(query.toLowerCase()) ||
    s.product.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <input
        value={query} onChange={e => setQuery(e.target.value)}
        placeholder="Search by name, email, or product…"
        style={{ width: '100%', padding: '11px 16px', border: '1px solid #E8E4DE', borderRadius: 8, fontSize: 14, color: '#1a1a1a', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
      />
      <div style={{ background: '#fff', border: '1px solid #E8E4DE', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 180px 80px 80px', padding: '10px 20px', background: '#FAFAF8', borderBottom: '1px solid #E8E4DE', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', gap: 12 }}>
          <span>Customer</span><span>Email</span><span>Product</span><span>Amount</span><span style={{ textAlign: 'right' }}>When</span>
        </div>
        {filtered.map(sale => {
          const badge = productBadge(sale.product)
          return (
            <div key={sale.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 180px 80px 80px', padding: '12px 20px', borderBottom: '1px solid #F2EFE9', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{sale.name || '—'}</span>
              <span style={{ fontSize: 12, color: '#777', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sale.email}</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: badge.color + '18', color: badge.color, whiteSpace: 'nowrap', display: 'inline-block' }}>{badge.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{fmt(sale.amount)}</span>
              <span style={{ fontSize: 11, color: '#bbb', textAlign: 'right' }}>{timeAgo(sale.created)}</span>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <p style={{ padding: '32px 24px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>{query ? 'No results' : 'No orders yet'}</p>
        )}
      </div>
      <p style={{ fontSize: 12, color: '#bbb', textAlign: 'right' }}>Showing {filtered.length} of {sales.length} orders</p>
    </div>
  )
}

function ProgrammeTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>
        Click any week to preview it. Opens in a new tab — you'll be redirected to login if not already signed in with programme access.
      </p>
      {Array.from({ length: 8 }, (_, i) => {
        const week = i + 1
        return (
          <a
            key={week}
            href={`/programme/week/${week}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 20px', background: '#fff',
              border: '1px solid #E8E4DE', borderRadius: 10,
              textDecoration: 'none', transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#4A7C59')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#E8E4DE')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#bbb', letterSpacing: '0.08em', minWidth: 20 }}>
                W{week}
              </span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>Week {week}</p>
                <p style={{ fontSize: 12, color: '#999' }}>{WEEK_SPLITS[i]}</p>
              </div>
            </div>
            <span style={{ fontSize: 12, color: '#4A7C59', fontWeight: 600 }}>Preview →</span>
          </a>
        )
      })}
    </div>
  )
}

type Tab = 'overview' | 'orders' | 'programme'

export default function FounderDashboard({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('overview')
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/kira/stripe-stats', { headers: { 'x-studio-secret': SECRET } })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(setStats)
      .catch(() => setError('Failed to load stats'))
      .finally(() => setLoading(false))
  }, [])

  const TABS: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders' },
    { id: 'programme', label: 'Programme' },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 900, background: '#F7F4EF', borderRadius: '20px 20px 0 0', maxHeight: '92vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px 0', flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 4 }}>Founder</p>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.02em' }}>Dashboard</h2>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: '50%', background: '#E8E4DE', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#555' }}>✕</button>
        </div>

        <div style={{ display: 'flex', gap: 4, padding: '16px 28px 0', flexShrink: 0 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: tab === t.id ? '#1a1a1a' : 'transparent', color: tab === t.id ? '#fff' : '#888', transition: 'all 0.15s' }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ height: 1, background: '#E8E4DE', margin: '16px 28px 0', flexShrink: 0 }} />

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 32px' }}>
          {tab === 'programme' ? (
            <ProgrammeTab />
          ) : loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#999', fontSize: 14 }}>Loading…</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#c00', fontSize: 14 }}>{error}</div>
          ) : stats ? (
            tab === 'overview' ? <OverviewTab stats={stats} /> : <OrdersTab sales={stats.recentSales} />
          ) : null}
        </div>
      </div>
    </div>
  )
}
