'use client'

type Order = {
  id: string
  product_sku: string
  amount_pence: number
  status: string
  created_at: string
  stripe_id?: string
}

const PRODUCT_NAMES: Record<string, string> = {
  training: 'Training Blueprint',
  nutrition: 'Nutrition Blueprint',
  bundle: 'Full Stack Bundle',
}

export default function BillingTab({ orders, creditPence }: { orders: Order[]; creditPence: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 12 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem,2.6vw,2.1rem)', fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>
          Billing &amp; <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>credits.</em>
        </h2>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>06 / Billing</span>
      </div>

      {creditPence > 0 && (
        <div style={{ background: 'var(--paper)', border: '1.5px solid var(--accent)', borderRadius: 3, padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 20, boxShadow: '3px 3px 0 var(--accent)' }}>
          <div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>Account credit</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 40, fontWeight: 500, letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}>
              £{(creditPence / 100).toFixed(2)}
            </p>
            <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 6 }}>Available to use on your next purchase.</p>
          </div>
        </div>
      )}

      <div style={{ background: 'var(--paper)', border: '1px solid var(--paper-edge)', borderRadius: 3, padding: '28px 30px', boxShadow: '0 1px 0 rgba(31,27,22,0.04), 0 12px 24px -18px rgba(31,27,22,0.16)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 22, paddingBottom: 14, borderBottom: '1px solid var(--paper-edge)' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>Order history</h3>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Recent 10</span>
        </div>

        {orders.length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>No orders yet.</p>
        ) : (
          orders.map(o => (
            <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--paper-edge)' }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{PRODUCT_NAMES[o.product_sku] ?? o.product_sku}</p>
                <p style={{ margin: '2px 0 0', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--ink-muted)' }}>
                  {new Date(o.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 500 }}>£{(o.amount_pence / 100).toFixed(2)}</p>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 2, ...(o.status === 'paid' ? { color: '#355840', background: '#E8F2EC', border: '1px solid #B8D8C2' } : { color: '#8A2A2A', background: '#FEF0F0', border: '1px solid #F0AAAA' }) }}>
                  {o.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ paddingTop: 8 }}>
        <button
          onClick={async () => { await fetch('/api/me/export', { method: 'POST' }) }}
          style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          Request data export (GDPR) →
        </button>
      </div>
    </div>
  )
}
