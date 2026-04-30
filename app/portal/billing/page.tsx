'use client'

import { useState } from 'react'

const PLAN_LABELS: Record<string, string> = {
  bundle: 'Pro Bundle',
  standard: 'Standard',
}

export default function BillingPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handlePortal() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/kira/portal', { method: 'POST' })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Something went wrong. Please try again.')
      setLoading(false)
      return
    }
    window.location.href = data.url
  }

  return (
    <div style={{ maxWidth: 560 }}>
      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 10 }}>
        Subscription
      </p>
      <h1 className="font-display" style={{ fontSize: 38, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 32 }}>
        Billing.
      </h1>

      <div className="paper-card" style={{ padding: '32px', marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>
          Manage your plan
        </p>
        <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: 24 }}>
          View your invoices, update your payment method, change your subscription, or cancel — all managed securely through Stripe.
        </p>

        {error && (
          <p style={{ fontSize: 13, color: '#C0392B', background: '#FEF0F0', padding: '10px 14px', borderRadius: 8, border: '1px solid #F0AAAA', marginBottom: 16 }}>
            {error}
          </p>
        )}

        <button
          onClick={handlePortal}
          disabled={loading}
          style={{
            padding: '14px 28px',
            background: loading ? 'var(--border)' : 'var(--ink)',
            color: loading ? 'var(--ink-muted)' : '#F8F6F1',
            border: 'none', borderRadius: 99,
            fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
          }}
        >
          {loading ? 'Opening portal...' : 'Open billing portal →'}
        </button>
      </div>

      <div style={{ background: '#F4F2EE', borderRadius: 12, padding: '18px 20px' }}>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.65 }}>
          You&apos;ll be redirected to Stripe&apos;s secure portal. Any changes take effect immediately.
          To cancel, please do so at least 24 hours before your next billing date.
        </p>
      </div>
    </div>
  )
}
