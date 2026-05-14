'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

function LoginForm() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get('redirect') ?? ''

  async function getPostAuthRedirect(supabase: ReturnType<typeof createSupabaseBrowserClient>) {
    if (redirect) return redirect
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return '/pricing'
    const { data: profile } = await supabase
      .from('profiles')
      .select('programme_access')
      .eq('id', user.id)
      .single()
    if (profile?.programme_access) return '/programme'
    const { data: lead } = await supabase
      .from('kira_leads')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
      .maybeSingle()
    return lead ? '/portal' : '/pricing'
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createSupabaseBrowserClient()
    const { error: authErr } = await supabase.auth.signInWithPassword({ email, password })
    if (authErr) {
      setError('Incorrect email or password.')
      setLoading(false)
      return
    }
    const dest = await getPostAuthRedirect(supabase)
    router.push(dest)
    router.refresh()
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createSupabaseBrowserClient()
    const { data, error: authErr } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (authErr) {
      setError(authErr.message)
      setLoading(false)
      return
    }
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        email,
        full_name: name,
      }, { onConflict: 'id' })
    }
    if (data.session) {
      router.push('/pricing')
      router.refresh()
    } else {
      setSuccessMsg('Check your email to confirm your account, then come back to sign in.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', zIndex: 2 }}>
      <style>{`
        .login-card {
          width: 100%; max-width: 420px;
          background: var(--paper);
          border: 1.5px solid var(--ink);
          padding: 40px 36px;
          box-shadow: 4px 4px 0 var(--ink);
          position: relative;
        }
        .login-card::before {
          content: '';
          position: absolute;
          inset: 6px;
          border: 1px dashed var(--paper-edge);
          pointer-events: none;
        }
        .login-tabs {
          display: flex;
          background: var(--paper-deep);
          border: 1px solid var(--paper-edge);
          border-radius: 2px;
          padding: 3px;
          gap: 3px;
          margin-bottom: 28px;
        }
        .login-tab {
          flex: 1; text-align: center;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          padding: 9px 8px; border-radius: 2px; cursor: pointer;
          background: transparent; border: none; color: var(--ink-muted);
          transition: all 0.15s;
        }
        .login-tab.active {
          background: var(--paper); color: var(--ink);
          box-shadow: 0 1px 3px rgba(31,27,22,0.1);
        }
        .login-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
        .login-field label {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--ink-muted);
        }
        .login-error {
          font-size: 13px; color: var(--accent);
          background: rgba(184,84,58,0.06);
          border: 1px solid rgba(184,84,58,0.2);
          padding: 10px 14px; border-radius: 2px;
          margin-bottom: 14px;
        }
        .login-success {
          background: rgba(122,139,110,0.1);
          border: 1px solid rgba(122,139,110,0.3);
          border-radius: 2px; padding: 16px;
        }
        .login-foot {
          text-align: center; margin-top: 20px;
          font-size: 13px; color: var(--ink-muted);
        }
        .login-foot button {
          background: none; border: none; cursor: pointer;
          color: var(--accent); font-size: 13px; padding: 0;
          text-decoration: underline; text-underline-offset: 2px;
        }
      `}</style>

      {/* Back link */}
      <a href="/" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', textDecoration: 'none', marginBottom: 32, display: 'block' }}>
        ← kiramei.co.uk
      </a>

      <div className="login-card">
        <span className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>Training Blueprint</span>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 28, lineHeight: 1.1 }}>
          {mode === 'signin' ? 'Welcome back.' : 'Get started.'}
        </h1>

        {/* Mode tabs */}
        <div className="login-tabs">
          <button className={`login-tab${mode === 'signin' ? ' active' : ''}`} onClick={() => { setMode('signin'); setError('') }}>Sign in</button>
          <button className={`login-tab${mode === 'signup' ? ' active' : ''}`} onClick={() => { setMode('signup'); setError('') }}>Create account</button>
        </div>

        {successMsg ? (
          <div className="login-success">
            <p style={{ fontSize: 14, color: 'var(--sage)', lineHeight: 1.6, marginBottom: 12 }}>{successMsg}</p>
            <button
              onClick={() => { setSuccessMsg(''); setMode('signin') }}
              style={{ fontSize: 13, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}
            >
              Back to sign in →
            </button>
          </div>
        ) : (
          <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp}>
            {mode === 'signup' && (
              <div className="login-field">
                <label>Full name</label>
                <input
                  className="kira-input" type="text" value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jane Smith" required autoComplete="name"
                />
              </div>
            )}
            <div className="login-field">
              <label>Email address</label>
              <input
                className="kira-input" type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jane@email.com" required autoComplete="off"
              />
            </div>
            <div className="login-field">
              <label>Password</label>
              <input
                className="kira-input" type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                required autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                minLength={8}
                placeholder={mode === 'signup' ? 'Min. 8 characters' : ''}
              />
            </div>

            {error && <div className="login-error">{error}</div>}

            <button
              type="submit" disabled={loading}
              className="btn btn-accent"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading
                ? (mode === 'signin' ? 'Signing in…' : 'Creating account…')
                : (mode === 'signin' ? 'Sign in →' : 'Create account →')}
            </button>
          </form>
        )}

        {!successMsg && (
          <div className="login-foot">
            {mode === 'signin' ? (
              <>No account?{' '}
                <button onClick={() => { setMode('signup'); setError('') }}>Create one</button>
              </>
            ) : (
              <>Already have one?{' '}
                <button onClick={() => { setMode('signin'); setError('') }}>Sign in</button>
              </>
            )}
          </div>
        )}
      </div>

      <p style={{ marginTop: 24, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', textAlign: 'center' }}>
        Secure login · No subscription
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
