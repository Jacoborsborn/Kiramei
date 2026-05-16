'use client'

import { useState } from 'react'

interface BuyButtonProps {
  product: 'training' | 'nutrition' | 'bundle'
  label?: string
  style?: React.CSSProperties
  requireTerms?: boolean
}

export default function BuyButton({ product, label = 'Buy Now →', style, requireTerms }: BuyButtonProps) {
  const [loading, setLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canProceed = !requireTerms || agreed

  async function handleClick() {
    if (!canProceed) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Server error ${res.status}`)
      }
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  const btnStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '15px 36px', borderRadius: 99, border: 'none',
    background: canProceed ? 'var(--accent)' : 'var(--paper-edge)',
    color: canProceed ? '#FBF7EE' : 'var(--ink-muted)',
    fontSize: 15, fontWeight: 600, letterSpacing: '0.03em',
    cursor: loading ? 'wait' : canProceed ? 'pointer' : 'not-allowed',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'background 0.15s, transform 0.15s',
    opacity: loading ? 0.7 : 1,
    ...style,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
      {requireTerms && (
        <Checkbox
          checked={agreed}
          onChange={setAgreed}
          label={<>I agree to the <a href="/terms" target="_blank" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Terms & Conditions</a>, including that this is a digital product with instant delivery.</>}
        />
      )}
      <button
        onClick={handleClick}
        disabled={loading || !canProceed}
        style={btnStyle}
        onMouseEnter={e => { if (!loading && canProceed) (e.currentTarget as HTMLElement).style.background = '#C0583A' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = canProceed ? 'var(--accent)' : 'var(--paper-edge)' }}
      >
        {loading ? 'Redirecting…' : label}
      </button>
      {error && (
        <p style={{ margin: 0, fontSize: 13, color: '#C0583A', fontFamily: 'var(--mono)' }}>
          Error: {error}
        </p>
      )}
    </div>
  )
}

function Checkbox({ checked, onChange, label }: {
  checked: boolean
  onChange: (v: boolean) => void
  label: React.ReactNode
}) {
  return (
    <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
      <span
        onClick={() => onChange(!checked)}
        style={{
          flexShrink: 0, marginTop: 3,
          width: 17, height: 17,
          border: `1.5px solid ${checked ? 'var(--accent)' : 'var(--ink-muted)'}`,
          borderRadius: 3,
          background: checked ? 'var(--accent)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.12s',
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="#FBF7EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{label}</span>
    </label>
  )
}
