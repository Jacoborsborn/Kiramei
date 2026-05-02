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

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10, fontSize: 14,
    color: '#EEEAE4', fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 500,
    color: 'rgba(238,234,228,0.45)',
    letterSpacing: '0.04em',
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#080808',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <a href="/" style={{
          display: 'inline-block', marginBottom: 40, fontSize: 12,
          color: '#4A7C59', textDecoration: 'none', letterSpacing: '0.06em',
        }}>
          ← kiramei.co.uk
        </a>

        <div style={{
          background: '#101010',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20, padding: '48px 40px',
        }}>
          <p style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: '#4A7C59', marginBottom: 20,
          }}>
            {mode === 'signin' ? 'Training Blueprint' : 'Create Account'}
          </p>
          <h1 className="font-display" style={{
            fontSize: 42, fontWeight: 600, color: '#EEEAE4',
            lineHeight: 1.0, marginBottom: 36, letterSpacing: '-0.02em',
          }}>
            {mode === 'signin' ? 'Sign in.' : 'Get started.'}
          </h1>

          {successMsg ? (
            <div style={{
              background: 'rgba(74,124,89,0.15)',
              border: '1px solid rgba(74,124,89,0.3)',
              borderRadius: 10, padding: '16px 18px',
            }}>
              <p style={{ fontSize: 14, color: 'rgba(238,234,228,0.8)', lineHeight: 1.6 }}>{successMsg}</p>
              <button
                onClick={() => { setSuccessMsg(''); setMode('signin') }}
                style={{ marginTop: 12, fontSize: 13, color: '#4A7C59', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Back to sign in →
              </button>
            </div>
          ) : (
            <form onSubmit={mode === 'signin' ? handleSignIn : handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {mode === 'signup' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <label style={labelStyle}>Full name</label>
                  <input
                    style={inputStyle} type="text" value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Jane Smith" required autoComplete="name"
                  />
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <label style={labelStyle}>Email</label>
                <input
                  style={inputStyle} type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="jane@email.com" required autoComplete="email"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <label style={labelStyle}>Password</label>
                <input
                  style={inputStyle} type="password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  required autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  minLength={8}
                />
              </div>

              {error && (
                <p style={{
                  fontSize: 13, color: '#F08080',
                  background: 'rgba(192,57,43,0.15)',
                  padding: '10px 14px', borderRadius: 8,
                  border: '1px solid rgba(192,57,43,0.3)',
                }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 4, padding: '14px',
                  background: loading ? 'rgba(238,234,228,0.1)' : '#EEEAE4',
                  color: loading ? 'rgba(238,234,228,0.3)' : '#080808',
                  border: 'none', borderRadius: 99,
                  fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#fff' }}
                onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = '#EEEAE4' }}
              >
                {loading
                  ? (mode === 'signin' ? 'Signing in...' : 'Creating account...')
                  : (mode === 'signin' ? 'Sign in →' : 'Create account →')}
              </button>
            </form>
          )}

          {!successMsg && (
            <p style={{ fontSize: 13, color: 'rgba(238,234,228,0.3)', marginTop: 24, textAlign: 'center' }}>
              {mode === 'signin' ? (
                <>No account?{' '}
                  <button
                    onClick={() => { setMode('signup'); setError('') }}
                    style={{ color: '#4A7C59', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, padding: 0 }}
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>Already have one?{' '}
                  <button
                    onClick={() => { setMode('signin'); setError('') }}
                    style={{ color: '#4A7C59', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, padding: 0 }}
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          )}
        </div>
      </div>
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
