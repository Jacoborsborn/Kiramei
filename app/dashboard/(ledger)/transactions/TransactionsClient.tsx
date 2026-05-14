'use client'

import { useState } from 'react'
import { Stat, LCard, StatusTag } from '../LedgerComponents'

const fmtGBP = (n: number) =>
  '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

type Tx = {
  id: string; when: string; date: string; email: string
  product: string; amount: number; country: string; status: string
}

type NextPayout = { amount: number; date: string } | null

export default function TransactionsClient({
  transactions, nextPayout, gross, units, refundTotal
}: {
  transactions: Tx[]; nextPayout: NextPayout; gross: number; units: number; refundTotal: number
}) {
  const [range, setRange] = useState('30d')

  function exportCSV() {
    const rows = transactions.map(t => [t.id, t.date, t.when, t.email, t.product, t.amount, t.country, t.status])
    const csv = ['id,date,time,email,product,amount_gbp,country,status',
      ...rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
    ].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const a = document.createElement('a'); a.href = url; a.download = 'transactions.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const filterDays = range === 'today' ? 0 : range === '7d' ? 7 : range === '30d' ? 30 : 9999
  const now = Date.now()
  const filtered = filterDays === 9999 ? transactions : transactions.filter(t => {
    const d = new Date(`${t.date} ${t.when}`).getTime()
    return (now - d) / 86400_000 <= filterDays
  })

  const filteredTotal = filtered.filter(t => t.status === 'paid').reduce((s, t) => s + t.amount, 0)

  return (
    <>
      <div className="stat-row">
        <Stat label="Gross revenue · 50 txns" value={fmtGBP(gross)} />
        <Stat label="Transactions" value={units} />
        <Stat label="Avg order value" value={units > 0 ? fmtGBP(gross / units) : '—'} deltaType="flat" />
        <Stat label="Refunded" value={fmtGBP(refundTotal)} deltaType="neg" scribble="watch this" />
      </div>

      <div className="row-2">
        <LCard title="Payout schedule" eyebrow="14 · stripe">
          {nextPayout ? (
            <div style={{ padding: '6px 0' }}>
              <div className="small-mono">NEXT PAYOUT</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 28 }}>{fmtGBP(nextPayout.amount)}</div>
              <div className="small-mono" style={{ marginTop: 4 }}>{nextPayout.date.toUpperCase()} · STRIPE</div>
            </div>
          ) : (
            <div className="small-mono" style={{ padding: '12px 0' }}>No pending payout.</div>
          )}
        </LCard>

        <LCard title="Summary" eyebrow="13 · what's moving">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><div className="small-mono">GROSS REVENUE</div><div style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>{fmtGBP(gross)}</div></div>
            <div><div className="small-mono">TRANSACTIONS</div><div style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>{units}</div></div>
            <div><div className="small-mono">REFUNDS</div><div style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>{fmtGBP(refundTotal)}</div></div>
            <div><div className="small-mono">NET</div><div style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>{fmtGBP(gross - refundTotal)}</div></div>
          </div>
        </LCard>
      </div>

      <LCard
        title="All transactions"
        eyebrow="15 · the ledger"
        style={{ marginTop: 18 }}
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <div className="tabs" style={{ borderBottom: 'none', margin: 0 }}>
              {(['today', '7d', '30d', 'all'] as const).map(r => (
                <div key={r} className={`tab${range === r ? ' active' : ''}`} onClick={() => setRange(r)}>{r}</div>
              ))}
            </div>
            <button className="ldg-btn ldg-btn-ghost" onClick={exportCSV}>Export CSV</button>
          </div>
        }
      >
        <table className="ltable">
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Email</th>
              <th>Product</th>
              <th>Country</th>
              <th className="num">Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td className="mono" style={{ fontSize: 11.5 }}>{t.id.slice(0, 12)}…</td>
                <td className="mono" style={{ fontSize: 11.5, color: 'var(--ink-muted)' }}>{t.date} · {t.when}</td>
                <td><strong>{t.email}</strong></td>
                <td>{t.product}</td>
                <td className="mono" style={{ fontSize: 11.5 }}>{t.country}</td>
                <td className="num"><strong>{fmtGBP(t.amount)}</strong></td>
                <td><StatusTag status={t.status} /></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} style={{ paddingTop: 16, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                TOTAL · {filtered.length} SHOWN
              </td>
              <td className="num" style={{ paddingTop: 16, fontFamily: 'var(--serif)', fontSize: 18 }}>{fmtGBP(filteredTotal)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </LCard>
    </>
  )
}
