'use client'

import Link from 'next/link'
import { useSearchParams, Suspense } from 'next/navigation'
import Navbar from '@/app/components/Navbar'

const PROGRAMME_STEPS = [
  ['✉️', 'Login link arrives in your inbox within a minute'],
  ['🔑', 'Click it — you\'re taken straight into your programme'],
  ['📅', 'Work through one week at a time — each unlocks the next'],
  ['💪', 'By week 8 you can build your own programme for life'],
]

const PDF_STEPS = [
  ['✉️', 'Your download link arrives in your inbox within a minute'],
  ['🔑', 'Click the link in the email — it also signs you into your account'],
  ['📄', 'Save the file somewhere permanent — it\'s yours to keep'],
  ['📖', 'Work through it at your own pace'],
]

function SuccessContent() {
  const params = useSearchParams()
  const type = params.get('type') ?? 'programme'
  const isPdf = type === 'pdf'

  const steps = isPdf ? PDF_STEPS : PROGRAMME_STEPS

  return (
    <div style={{ textAlign: 'center', maxWidth: 520 }}>

      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'rgba(74,124,89,0.12)',
        border: '1.5px solid rgba(74,124,89,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 32px', fontSize: 22, color: '#4A7C59',
      }}>
        ✓
      </div>

      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A7C59', marginBottom: 16 }}>
        Payment confirmed
      </p>

      <h1 className="font-display" style={{
        fontSize: 'clamp(40px, 8vw, 72px)',
        fontWeight: 600, lineHeight: 1, letterSpacing: '-0.025em', marginBottom: 20,
      }}>
        You're in.
      </h1>

      <p style={{ fontSize: 16, color: 'rgba(238,234,228,0.6)', lineHeight: 1.75, marginBottom: 48 }}>
        {isPdf
          ? 'Check your email — your download link is on its way.'
          : 'Check your email — we\'ve sent a login link to get you straight into your programme.'}
      </p>

      <div style={{
        background: '#101010', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, padding: '24px 28px',
        textAlign: 'left', marginBottom: 40,
      }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.3)', marginBottom: 14 }}>
          What happens next
        </p>
        {steps.map(([icon, text]) => (
          <div key={text as string} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 14 }}>{icon}</span>
            <span style={{ fontSize: 13, color: 'rgba(238,234,228,0.55)', lineHeight: 1.6 }}>{text as string}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 13, color: 'rgba(238,234,228,0.3)', marginBottom: 24 }}>
        Already have an account?
      </p>

      <Link href="/login" style={{
        display: 'inline-block', padding: '14px 32px', borderRadius: 99,
        background: '#EEEAE4', color: '#080808',
        fontSize: 14, fontWeight: 600, textDecoration: 'none',
      }}>
        {isPdf ? 'Sign in →' : 'Sign in to your programme →'}
      </Link>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <main style={{ background: '#080808', minHeight: '100vh', color: '#EEEAE4', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px' }}>
        <Suspense fallback={null}>
          <SuccessContent />
        </Suspense>
      </div>
    </main>
  )
}
