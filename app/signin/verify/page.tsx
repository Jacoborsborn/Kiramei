'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function VerifyContent() {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get('token')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) {
      setError('Invalid sign-in link.')
      return
    }
    router.push(`/api/signin/verify?token=${encodeURIComponent(token)}`)
  }, [token, router])

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
          {error}
        </p>
        <a href="/signin" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', textDecoration: 'none' }}>
          ← Back to sign in
        </a>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
        Signing you in…
      </p>
    </div>
  )
}

export default function SignInVerifyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
      <Suspense fallback={<div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-muted)' }}>Loading…</div>}>
        <VerifyContent />
      </Suspense>
    </div>
  )
}
