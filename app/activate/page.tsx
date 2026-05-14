'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

const STEPS = ['OTP', 'Password', 'About you', 'Preferences', 'Done'] as const
type Step = 0 | 1 | 2 | 3 | 4

function pwStrength(pw: string): { level: 0 | 1 | 2 | 3 | 4; label: string; cls: string } {
  let score = 0
  if (pw.length >= 10) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[a-z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  const map: [string, string][] = [
    ['', ''],
    ['Weak', 'weak'],
    ['Fair', 'fair'],
    ['Good', 'good'],
    ['Strong', 'strong'],
  ]
  return { level: score as 0 | 1 | 2 | 3 | 4, label: map[score][0], cls: map[score][1] }
}

const GOALS = [
  { value: 'strength', title: 'Build strength', desc: 'Lift more, move better' },
  { value: 'general', title: 'General fitness', desc: 'Health & consistency' },
  { value: 'fatloss', title: 'Fat loss', desc: 'Lean out, feel good' },
  { value: 'restart', title: 'Restart & reset', desc: 'Back after a break' },
]

const EXPERIENCES = [
  { value: 'new', title: 'Brand new', desc: 'Never trained seriously' },
  { value: 'some', title: 'Some background', desc: '1–2 years experience' },
  { value: 'exp', title: 'Experienced', desc: '3+ years training' },
  { value: 'returning', title: 'Returning', desc: 'Had a long break' },
]

function ActivateFlow() {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get('token') ?? ''

  const [step, setStep] = useState<Step>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [otp, setOtp] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const [goal, setGoal] = useState('')
  const [experience, setExperience] = useState('')
  const [trainingDays, setTrainingDays] = useState(0)

  const [weeklyRecap, setWeeklyRecap] = useState(true)
  const [productDrops, setProductDrops] = useState(true)
  const [longReads, setLongReads] = useState(false)
  const [partnerOffers, setPartnerOffers] = useState(false)

  const [userEmail, setUserEmail] = useState('')
  const [purchaseProduct, setPurchaseProduct] = useState<'training' | 'nutrition' | 'bundle' | null>(null)

  useEffect(() => {
    return () => { if (cooldownRef.current) clearInterval(cooldownRef.current) }
  }, [])

  function startCooldown() {
    setResendCooldown(30)
    cooldownRef.current = setInterval(() => {
      setResendCooldown(c => {
        if (c <= 1) { clearInterval(cooldownRef.current!); return 0 }
        return c - 1
      })
    }, 1000)
  }

  async function handleVerifyOtp() {
    if (otp.length !== 8) { setError('Enter your 8-digit code'); return }
    setLoading(true); setError('')
    const res = await fetch('/api/activation/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, otp }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error ?? 'Invalid code'); return }
    setStep(1)
  }

  async function handleResend() {
    startCooldown()
    await fetch('/api/activation/resend-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
  }

  async function handleSetPassword() {
    if (password !== confirm) { setError("Passwords don't match"); return }
    const { level } = pwStrength(password)
    if (level < 4) { setError('Please meet all password requirements'); return }
    setLoading(true); setError('')
    const res = await fetch('/api/activation/set-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error ?? 'Failed'); return }
    setStep(2)
  }

  async function handleSaveProfile() {
    setLoading(true); setError('')
    await fetch('/api/activation/save-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        ...(goal && { goal }),
        ...(experience && { experience }),
        ...(trainingDays && { trainingDaysPerWk: trainingDays }),
      }),
    })
    setLoading(false)
    setStep(3)
  }

  async function handleSavePrefs() {
    setLoading(true); setError('')
    const prefsRes = await fetch('/api/activation/save-prefs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, weeklyRecap, productDrops, partnerOffers, longReads }),
    })
    if (!prefsRes.ok) { setLoading(false); setError('Failed to save preferences'); return }

    const completeRes = await fetch('/api/activation/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
    const completeData = await completeRes.json()
    setLoading(false)
    if (!completeRes.ok) { setError(completeData.error ?? 'Failed'); return }

    setUserEmail(completeData.email)

    const supabase = createSupabaseBrowserClient()
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email: completeData.email,
      password,
    })

    if (signInErr) {
      setError('Account created — please sign in manually.')
      setTimeout(() => router.push('/signin'), 2000)
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const profileRes = await supabase
        .from('profiles')
        .select('programme_access, nutrition_access')
        .eq('id', user.id)
        .single()
      if (profileRes.data?.programme_access && profileRes.data?.nutrition_access) {
        setPurchaseProduct('bundle')
      } else if (profileRes.data?.nutrition_access) {
        setPurchaseProduct('nutrition')
      } else {
        setPurchaseProduct('training')
      }
    }

    setStep(4)
  }

  const strength = pwStrength(password)
  const pct = ['0%', '25%', '50%', '75%', '100%'][strength.level]
  const strengthColours: Record<string, string> = {
    weak: 'var(--margin-red)',
    fair: 'var(--gold)',
    good: 'var(--sage)',
    strong: 'var(--accent)',
  }
  const barColour = strengthColours[strength.cls] ?? 'var(--paper-edge)'

  const portalUrl = purchaseProduct === 'nutrition' ? '/nutrition-portal' : '/training'

  return (
    <>
      <style>{`
        .sg-wrap { min-height:calc(100vh - 86px); display:flex; align-items:center; justify-content:center; padding:56px 0 80px; position:relative; }
        .sg-wrap::before { content:''; position:absolute; inset:0; background-image: linear-gradient(to right,rgba(201,214,226,0.35) 1px,transparent 1px), linear-gradient(to bottom,rgba(201,214,226,0.35) 1px,transparent 1px); background-size:28px 28px; pointer-events:none; opacity:0.6; }
        .sg-stage { position:relative; z-index:1; width:100%; max-width:620px; margin:0 auto; padding:0 24px; }
        .sg-progress { display:grid; grid-template-columns:repeat(5,1fr); gap:6px; margin-bottom:32px; }
        .sg-dot { position:relative; height:26px; display:flex; align-items:center; justify-content:center; font-family:var(--mono); font-size:9.5px; letter-spacing:0.18em; color:var(--ink-muted); text-transform:uppercase; }
        .sg-dot::before { content:''; position:absolute; inset:auto 0 0 0; height:3px; background:var(--paper-deep); border:1px solid var(--paper-edge); }
        .sg-dot.active::before { background:var(--ink); border-color:var(--ink); }
        .sg-dot.done::before { background:var(--accent); border-color:var(--accent); }
        .sg-dot.active { color:var(--ink); }
        .sg-dot.done { color:var(--accent); }
        .sg-card { background:var(--paper); border:1.5px solid var(--ink); padding:44px 48px 40px; box-shadow:4px 4px 0 var(--ink); position:relative; }
        .sg-card::before { content:''; position:absolute; inset:5px; border:1px dashed var(--paper-edge); pointer-events:none; }
        @media(max-width:640px){.sg-card{padding:32px 24px;}}
        .otp-input { width:100%; font-family:var(--mono); font-size:22px; font-weight:500; letter-spacing:0.35em; text-align:center; border:1.5px solid var(--paper-edge); background:var(--paper); padding:12px 14px; border-radius:2px; outline:none; transition:all 0.15s; color:var(--ink); -moz-appearance:textfield; }
        .otp-input::-webkit-outer-spin-button,.otp-input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0;}
        .otp-input::placeholder{color:var(--paper-edge);}
        .otp-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(184,84,58,0.12);}
        .sg-field { display:flex; flex-direction:column; gap:6px; margin-bottom:18px; }
        .sg-field label { font-family:var(--mono); font-size:10.5px; letter-spacing:0.16em; text-transform:uppercase; color:var(--ink-muted); }
        .sg-input { width:100%; font-family:var(--sans); font-size:16px; color:var(--ink); background:transparent; border:none; border-bottom:1.5px solid var(--paper-edge); padding:8px 0 10px; outline:none; transition:border-color 0.15s; }
        .sg-input:focus{border-bottom-color:var(--accent);}
        .sg-input[type="password"]{letter-spacing:0.28em;}
        .goal-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px;}
        @media(max-width:480px){.goal-grid{grid-template-columns:1fr;}}
        .goal-tile{background:var(--paper);border:1.5px solid var(--paper-edge);padding:14px 16px;border-radius:2px;cursor:pointer;text-align:left;font-family:var(--sans);display:flex;flex-direction:column;gap:4px;transition:all 0.15s;}
        .goal-tile:hover{border-color:var(--ink);}
        .goal-tile.sel{border-color:var(--accent);background:rgba(184,84,58,0.04);box-shadow:inset 0 0 0 1px var(--accent);}
        .goal-tile .t{font-family:var(--serif);font-size:16px;font-weight:500;}
        .goal-tile .d{font-family:var(--mono);font-size:10.5px;letter-spacing:0.12em;text-transform:uppercase;color:var(--ink-muted);}
        .days-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;}
        .day-pill{background:var(--paper);border:1.5px solid var(--paper-edge);padding:8px 14px;font-family:var(--mono);font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--ink-soft);cursor:pointer;border-radius:2px;transition:all 0.15s;}
        .day-pill.sel{background:var(--ink);color:var(--paper);border-color:var(--ink);}
        .day-pill:hover:not(.sel){border-color:var(--ink);}
        .sg-toggle{display:grid;grid-template-columns:1fr auto;align-items:center;gap:24px;padding:14px 0;border-top:1px solid var(--paper-edge);}
        .sg-toggle:first-of-type{border-top:1.5px solid var(--ink);}
        .sg-switch{position:relative;width:46px;height:26px;flex-shrink:0;}
        .sg-switch input{opacity:0;width:0;height:0;position:absolute;}
        .sg-tr{position:absolute;inset:0;background:var(--paper-deep);border:1.5px solid var(--ink-muted);border-radius:14px;cursor:pointer;transition:0.18s;}
        .sg-tr::before{content:'';position:absolute;width:18px;height:18px;left:2px;top:2px;background:var(--paper);border:1.5px solid var(--ink-muted);border-radius:50%;transition:0.18s;}
        .sg-switch input:checked~.sg-tr{background:var(--accent);border-color:var(--accent);}
        .sg-switch input:checked~.sg-tr::before{left:22px;border-color:var(--accent);}
        .sg-actions{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:28px;padding-top:22px;border-top:1px dashed var(--paper-edge);}
        .sg-back{background:transparent;border:none;cursor:pointer;font-family:var(--mono);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--ink-muted);padding:8px 0;}
        .sg-back:hover{color:var(--ink);}
        .sg-back::before{content:'← ';}
        .sg-skip{background:transparent;border:none;cursor:pointer;font-family:var(--mono);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:var(--ink-muted);padding:8px 0;}
        .sg-skip:hover{color:var(--ink);}
        .sg-done{text-align:center;padding:12px 0;}
        .sg-done-tick{width:72px;height:72px;border:2px solid var(--accent);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;color:var(--accent);}
        .sg-err{font-family:var(--mono);font-size:11px;color:var(--accent);background:rgba(184,84,58,0.06);padding:10px 14px;border:1px solid rgba(184,84,58,0.2);margin-bottom:14px;}
        .km-btn-full{width:100%;padding:14px;background:var(--ink);color:var(--paper);border:none;font-family:var(--mono);font-size:12px;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer;transition:opacity 0.15s;}
        .km-btn-full:disabled{opacity:0.5;cursor:not-allowed;}
      `}</style>

      <div className="sg-wrap">
        <div className="sg-stage">
          <div className="sg-progress">
            {STEPS.map((s, i) => (
              <div key={s} className={`sg-dot${i === step ? ' active' : i < step ? ' done' : ''}`}>{s}</div>
            ))}
          </div>

          <div className="sg-card">
            {step === 0 && (
              <>
                <p className="eyebrow" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>Step 1 of 4</p>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem,4vw,2.6rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 12px' }}>
                  Enter your <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>code.</em>
                </h1>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 28 }}>
                  We emailed you an 8-digit activation code. Enter it below.
                </p>

                <div className="otp-row" style={{ marginBottom: 8, maxWidth: 320 }}>
                  <input
                    className="otp-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    placeholder="00000000"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
                    autoFocus
                    autoComplete="one-time-code"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 13, color: 'var(--ink-muted)', marginBottom: 28 }}>
                  <span>Didn&rsquo;t get it?</span>
                  <button
                    onClick={handleResend}
                    disabled={resendCooldown > 0}
                    style={{ background: 'transparent', border: 'none', padding: 0, color: resendCooldown > 0 ? 'var(--ink-muted)' : 'var(--accent)', cursor: resendCooldown > 0 ? 'default' : 'pointer', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase' }}
                  >
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
                  </button>
                </div>

                {error && <p className="sg-err">{error}</p>}

                <button className="km-btn-full" disabled={loading || otp.length !== 8} onClick={handleVerifyOtp}>
                  {loading ? 'Verifying…' : 'Continue →'}
                </button>
              </>
            )}

            {step === 1 && (
              <>
                <p className="eyebrow" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>Step 2 of 4</p>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem,4vw,2.6rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 12px' }}>
                  Set your <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>password.</em>
                </h1>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 28 }}>
                  Choose a strong password to secure your account.
                </p>

                <div className="sg-field">
                  <label>Password</label>
                  <input className="sg-input" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" />
                </div>

                <div style={{ marginBottom: 18 }}>
                  <div style={{ height: 4, background: 'var(--paper-deep)', border: '1px solid var(--paper-edge)', position: 'relative', overflow: 'hidden', borderRadius: 2 }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: pct, background: barColour, transition: 'width 0.2s, background 0.2s' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: 6 }}>
                    <span>Strength</span>
                    <span style={{ color: barColour }}>{strength.label}</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 14px' }}>
                    {[
                      ['≥ 10 characters', password.length >= 10],
                      ['Uppercase letter', /[A-Z]/.test(password)],
                      ['Lowercase letter', /[a-z]/.test(password)],
                      ['Number', /[0-9]/.test(password)],
                    ].map(([label, ok]) => (
                      <li key={label as string} style={{ fontSize: 12.5, color: ok ? 'var(--ink-soft)' : 'var(--ink-muted)', display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ color: ok ? 'var(--accent)' : 'var(--paper-edge)', width: 12, textAlign: 'center' }}>{ok ? '✓' : '○'}</span>
                        {label as string}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sg-field">
                  <label>Confirm password</label>
                  <input className="sg-input" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} autoComplete="new-password" />
                </div>

                {error && <p className="sg-err">{error}</p>}

                <div className="sg-actions">
                  <button className="sg-back" onClick={() => { setStep(0); setError('') }}>Back</button>
                  <button className="km-btn-full" style={{ width: 'auto', padding: '13px 28px' }} disabled={loading || strength.level < 4} onClick={handleSetPassword}>
                    {loading ? 'Saving…' : 'Continue →'}
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="eyebrow" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>Step 3 of 4</p>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem,4vw,2.6rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 12px' }}>
                  Tell us about <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>you.</em>
                </h1>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 28 }}>
                  This helps us personalise your experience. Totally optional — skip if you like.
                </p>

                <div style={{ marginBottom: 22 }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 10 }}>Your goal</p>
                  <div className="goal-grid">
                    {GOALS.map(g => (
                      <button key={g.value} className={`goal-tile${goal === g.value ? ' sel' : ''}`} onClick={() => setGoal(goal === g.value ? '' : g.value)}>
                        <span className="t">{g.title}</span>
                        <span className="d">{g.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 22 }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 10 }}>Experience level</p>
                  <div className="goal-grid">
                    {EXPERIENCES.map(ex => (
                      <button key={ex.value} className={`goal-tile${experience === ex.value ? ' sel' : ''}`} onClick={() => setExperience(experience === ex.value ? '' : ex.value)}>
                        <span className="t">{ex.title}</span>
                        <span className="d">{ex.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 10 }}>Training days per week</p>
                  <div className="days-row">
                    {[2, 3, 4, 5, 6].map(d => (
                      <button key={d} className={`day-pill${trainingDays === d ? ' sel' : ''}`} onClick={() => setTrainingDays(trainingDays === d ? 0 : d)}>
                        {d} day{d !== 1 ? 's' : ''}/wk
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p className="sg-err">{error}</p>}

                <div className="sg-actions">
                  <div style={{ display: 'flex', gap: 14 }}>
                    <button className="sg-back" onClick={() => { setStep(1); setError('') }}>Back</button>
                    <button className="sg-skip" onClick={() => { setStep(3); setError('') }}>Skip</button>
                  </div>
                  <button className="km-btn-full" style={{ width: 'auto', padding: '13px 28px' }} disabled={loading} onClick={handleSaveProfile}>
                    {loading ? 'Saving…' : 'Continue →'}
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p className="eyebrow" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>Step 4 of 4</p>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem,4vw,2.6rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 0 12px' }}>
                  Stay in the <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>loop.</em>
                </h1>
                <p style={{ fontSize: 15.5, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 28 }}>
                  Choose what you&rsquo;d like to hear about. You can change these any time in your account.
                </p>

                {[
                  { label: 'Weekly recap', desc: 'Progress summaries & weekly tips', val: weeklyRecap, set: setWeeklyRecap },
                  { label: 'Product drops', desc: 'New programmes and bundles', val: productDrops, set: setProductDrops },
                  { label: 'Long reads', desc: 'In-depth training & nutrition guides', val: longReads, set: setLongReads },
                  { label: 'Partner offers', desc: 'Curated brand discounts', val: partnerOffers, set: setPartnerOffers },
                ].map(({ label, desc, val, set }) => (
                  <div key={label} className="sg-toggle">
                    <div>
                      <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500, margin: 0 }}>{label}</p>
                      <p style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-soft)', marginTop: 2 }}>{desc}</p>
                    </div>
                    <label className="sg-switch">
                      <input type="checkbox" checked={val} onChange={e => set(e.target.checked)} />
                      <span className="sg-tr" onClick={() => set(!val)} />
                    </label>
                  </div>
                ))}

                <p style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--ink-muted)', marginTop: 20, marginBottom: 0 }}>
                  By activating your account you consent to Kira Mei processing your data as described in our <a href="/privacy" style={{ color: 'var(--accent)' }}>Privacy Policy</a>. Marketing emails are sent under the UK PECR soft opt-in exemption to existing customers. You can unsubscribe at any time via account settings or the link in any email.
                </p>

                {error && <p className="sg-err" style={{ marginTop: 14 }}>{error}</p>}

                <div className="sg-actions">
                  <button className="sg-back" onClick={() => { setStep(2); setError('') }}>Back</button>
                  <button className="km-btn-full" style={{ width: 'auto', padding: '13px 28px' }} disabled={loading} onClick={handleSavePrefs}>
                    {loading ? 'Finishing…' : "I'm in →"}
                  </button>
                </div>
              </>
            )}

            {step === 4 && (
              <div className="sg-done">
                <div className="sg-done-tick">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 16 l 6 6 l 14 -14" />
                  </svg>
                </div>
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 14, color: 'var(--ink)' }}>
                  You&rsquo;re <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>in.</em>
                </h1>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: 32 }}>
                  Your account is active. Your blueprint is waiting.
                </p>
                <a href={portalUrl ?? '/training'} className="km-btn" style={{ display: 'inline-block', textDecoration: 'none' }}>
                  Open your blueprint →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function ActivatePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', position: 'relative', zIndex: 2 }}>
      <div style={{ padding: '18px 24px' }}>
        <a href="/" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', textDecoration: 'none' }}>
          ← kiramei.co.uk
        </a>
      </div>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: 80, color: 'var(--ink-muted)', fontFamily: 'var(--mono)' }}>Loading…</div>}>
        <ActivateFlow />
      </Suspense>
    </div>
  )
}
