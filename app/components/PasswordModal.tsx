'use client'

import { useState, useRef, useEffect } from 'react'

const FOUNDER_PASSWORD = 'WorthingHigh1!'

type Props = {
  onSuccess: () => void
  onClose: () => void
}

export default function PasswordModal({ onSuccess, onClose }: Props) {
  const [value, setValue] = useState('')
  const [shake, setShake] = useState(false)
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (visible) inputRef.current?.focus()
  }, [visible])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (value === FOUNDER_PASSWORD) {
      onSuccess()
    } else {
      setValue('')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(26,25,22,0.55)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        transition: 'opacity 0.2s',
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        style={{
          background: 'var(--paper)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '40px 36px',
          width: '100%',
          maxWidth: 360,
          boxShadow: '0 24px 80px rgba(26,25,22,0.18)',
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'transform 0.2s ease-out',
        }}
      >
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 20 }}>
          Founder Mode
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            ref={inputRef}
            className="kira-input"
            type="password"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Password"
            autoComplete="off"
            style={{
              borderColor: shake ? '#C0392B' : undefined,
              animation: shake ? 'shake 0.4s ease' : undefined,
            }}
          />
          <button
            type="submit"
            style={{
              padding: '13px',
              background: 'var(--ink)',
              color: '#F8F6F1',
              border: 'none',
              borderRadius: 99,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: '0.04em',
            }}
          >
            Enter
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-5px)}
          80%{transform:translateX(5px)}
        }
      `}</style>
    </div>
  )
}
