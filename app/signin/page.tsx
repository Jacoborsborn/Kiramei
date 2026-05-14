'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

function SignInForm() {
  const router = useRouter()
  const params = useSearchParams()
  const errorParam = params.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hint, setHint] = useState('')
  const [magicSent, setMagicSent] = useState(false)
  const [magicLoading, setMagicLoading] = useState(false)

  const errorMessages: Record<string, string> = {
    missing_token: 'Invalid sign-in link.',
    invalid_token: 'This sign-in link is not valid.',
    token_used: 'This link has already been used.',
    token_expired: 'This link has expired. Request a new one.',
    user_not_found: 'Account not found.',
    link_failed: 'Sign-in failed. Please try again.',
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(''); setHint('')

    const checkRes = await fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const checkData = await checkRes.json()

    if (checkData.state === 'check_email') {
      setLoading(false)
      setHint(checkData.hint)
      return
    }

    const supabase = createSupabaseBrowserClient()
    const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (signInErr) {
      setError('Incorrect email or password.')
      return
    }

    router.push('/account')
    router.refresh()
  }

  async function handleMagicLink() {
    if (!email) { setError('Enter your email first.'); return }
    setMagicLoading(true)
    await fetch('/api/signin/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setMagicLoading(false)
    setMagicSent(true)
  }

  return (
    <>
      <style>{`
        .si-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:48px 24px;position:relative;}
        .si-wrap::before{content:'';position:absolute;inset:0;background-image:linear-gradient(to right,rgba(201,214,226,0.35) 1px,transparent 1px),linear-gradient(to bottom,rgba(201,214,226,0.35) 1px,transparent 1px);background-size:28px 28px;pointer-events:none;opacity:0.6;}
        .si-card{position:relative;z-index:1;background:var(--paper);border:1.5px solid var(--ink);padding:44px 48px 40px;box-shadow:4px 4px 0 var(--ink);width:100%;max-width:460px;}
        .si-card::before{content:'';position:absolute;inset:5px;border:1px dashed var(--paper-edge);pointer-events:none;}
        @media(max-width:520px){.si-card{padding:32px 24px;}}
        .si-field{display:flex;flex-direction:column;gap:6px;margin-bottom:18px;}
        .si-field label{font-family:var(--mono);font-size:10.5px;letter-spacing:0.16em;text-transform:uppercase;color:var(--ink-muted);}
        .si-input{width:100%;font-family:var(--sans);font-size:16px;color:var(--ink);background:transparent;border:none;border-bottom:1.5px solid var(--paper-edge);padding:8px 0 10px;outline:none;transition:border-color 0.15s;}
        .si-input:focus{border-bottom-color:var(--accent);}
        .si-input[type="password"]{letter-spacing:0.28em;}
        .si-err{font-family:var(--mono);font-size:11px;color:var(--accent);background:rgba(184,84,58,0.06);padding:10px 14px;border:1px solid rgba(184,84,58,0.2);margin-bottom:14px;}
        .si-hint{font-family:var(--mono);font-size:11px;color:var(--sage);background:rgba(122,139,110,0.06);padding:10px 14px;border:1px solid rgba(122,139,110,0.3);margin-bottom:14px;}
        .si-divider{border:none;border-top:1px dashed var(--paper-edge);margin:24px 0;}
      `}</style>

      <div className="si-wrap">
        <div style={{ width: '100%', maxWidth: 460 }}>
          <a href="/" style={{ display: 'inline-block', marginBottom: 32, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', textDecoration: 'none' }}>
            ← kiramei.co.uk
          </a>

          <div className="si-card">
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>Sign in</p>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 28px' }}>
              Welcome <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>back.</em>
            </h1>

            {errorParam && errorMessages[errorParam] && (
              <p className="si-err">{errorMessages[errorParam]}</p>
            )}

            {hint && <p className="si-hint">{hint}</p>}
            {error && <p className="si-err">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="si-field">
                <label htmlFor="email">Email</label>
                <input id="email" className="si-input" type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required />
              </div>
              <div className="si-field">
                <label htmlFor="password">Password</label>
                <input id="password" className="si-input" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required />
              </div>

              <button
                type="submit" disabled={loading}
                style={{ width: '100%', marginTop: 8, padding: '14px', background: loading ? 'var(--paper-deep)' : 'var(--ink)', color: loading ? 'var(--ink-muted)' : 'var(--paper)', border: 'none', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? 'Signing in…' : 'Sign in →'}
              </button>
            </form>

            <hr className="si-divider" />

            {magicSent ? (
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--sage)', textAlign: 'center' }}>
                Check your email — we sent a sign-in link.
              </p>
            ) : (
              <button
                onClick={handleMagicLink}
                disabled={magicLoading}
                style={{ width: '100%', padding: '12px', background: 'transparent', border: '1.5px solid var(--paper-edge)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-soft)', cursor: magicLoading ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}
              >
                {magicLoading ? 'Sending…' : 'Send me a sign-in link'}
              </button>
            )}

            <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.1em', color: 'var(--ink-muted)', textAlign: 'center', marginTop: 20 }}>
              Don&rsquo;t have an account?{' '}
              <a href="/" style={{ color: 'var(--accent)' }}>Browse plans</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default function SignInPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', position: 'relative', zIndex: 2 }}>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: 80, color: 'var(--ink-muted)', fontFamily: 'var(--mono)' }}>Loading…</div>}>
        <SignInForm />
      </Suspense>
    </div>
  )
}
