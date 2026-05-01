'use client'

import { useState } from 'react'

interface BuyButtonProps {
  product: 'training' | 'nutrition' | 'bundle'
  label?: string
  style?: React.CSSProperties
}

export default function BuyButton({ product, label = 'Buy Now →', style }: BuyButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      })
      if (!res.ok) throw new Error('Checkout failed')
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '15px 36px', borderRadius: 99, border: 'none',
    background: '#EEEAE4', color: '#080808',
    fontSize: 15, fontWeight: 600, letterSpacing: '0.03em',
    cursor: loading ? 'wait' : 'pointer',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'background 0.15s, transform 0.15s',
    opacity: loading ? 0.7 : 1,
    ...style,
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={baseStyle}
      onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#fff' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EEEAE4' }}
    >
      {loading ? 'Redirecting…' : label}
    </button>
  )
}
