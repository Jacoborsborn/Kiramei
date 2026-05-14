'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import ProfileTab from './_components/ProfileTab'
import SecurityTab from './_components/SecurityTab'
import LibraryTab from './_components/LibraryTab'
import CommsTab from './_components/CommsTab'
import BillingTab from './_components/BillingTab'
import ReferTab from './_components/ReferTab'

type TabId = 'profile' | 'security' | 'library' | 'comms' | 'billing' | 'refer'

const TABS: { id: TabId; num: string; label: string }[] = [
  { id: 'profile', num: '01', label: 'Profile' },
  { id: 'security', num: '02', label: 'Security' },
  { id: 'library', num: '03', label: 'Library' },
  { id: 'comms', num: '05', label: 'Communications' },
  { id: 'billing', num: '06', label: 'Billing' },
  { id: 'refer', num: '07', label: 'Refer & extras' },
]

export default function AccountPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabId>('profile')
  const [data, setData] = useState<{
    profile?: Record<string, unknown>
    prefs?: Record<string, unknown>
    orders?: unknown[]
    credit_pence?: number
    referral_code?: string
  } | null>(null)
  const [sessions, setSessions] = useState<unknown[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as TabId
    if (TABS.some(t => t.id === hash)) setActiveTab(hash)
  }, [])

  useEffect(() => {
    async function load() {
      const supabase = createSupabaseBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/signin'); return }

      const [meRes, sessionsRes] = await Promise.all([
        fetch('/api/me'),
        fetch('/api/me/sessions'),
      ])

      if (!meRes.ok) { router.push('/signin'); return }

      const [meData, sessData] = await Promise.all([meRes.json(), sessionsRes.json()])
      setData(meData)
      setSessions(sessData.sessions ?? [])
      setLoading(false)
    }
    load()
  }, [router])

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Loading…</p>
      </div>
    )
  }

  const profile = data?.profile as Record<string, unknown> | undefined
  const firstName = (profile?.first_name as string) || 'there'
  const lastName = (profile?.last_name as string) || ''

  return (
    <>
      <style>{`
        .acc-tab{text-align:left;background:transparent;border:none;cursor:pointer;padding:11px 14px 11px 18px;display:flex;align-items:center;gap:12px;font-family:var(--sans);font-size:14.5px;color:var(--ink-soft);border-radius:2px;position:relative;transition:background 0.12s,color 0.12s;width:100%;}
        .acc-tab:hover{color:var(--ink);background:var(--paper-deep);}
        .acc-tab.active{color:var(--ink);background:var(--paper-deep);font-weight:500;}
        .acc-tab.active::before{content:'';position:absolute;left:0;top:6px;bottom:6px;width:2px;background:var(--accent);}
        .acc-tab-num{font-family:var(--mono);font-size:10px;letter-spacing:0.14em;color:var(--ink-muted);width:22px;}
        .acc-tab.active .acc-tab-num{color:var(--accent);}
        @media(max-width:880px){.acc-side{position:static!important;flex-direction:row!important;flex-wrap:wrap!important;gap:4px!important;overflow-x:auto;}.acc-tab{padding:10px 14px;white-space:nowrap;}.acc-tab.active::before{display:none;}.acc-tab.active{border-bottom:2px solid var(--accent);}}
      `}</style>

      <div style={{ background: 'var(--paper)', minHeight: '100vh', position: 'relative', zIndex: 2 }}>
        <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(245,239,227,0.85)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--paper-edge)', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none', letterSpacing: '-0.01em' }}>Kira Mei</a>
          <button onClick={handleSignOut} style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Sign out</button>
        </nav>

        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 32px 80px' }}>
          <div style={{ paddingBottom: 32, borderBottom: '1px solid var(--paper-edge)', marginBottom: 36, display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 24 }}>
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 8 }}>Your account</p>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,3.6vw,2.8rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0 }}>
                Good to see you, <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>{firstName}.</em>
              </h1>
            </div>
            <div style={{ textAlign: 'right', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', lineHeight: 1.9 }}>
              <div>{firstName} {lastName}</div>
              <div style={{ color: 'var(--ink-muted)' }}>{(profile?.email as string) ?? ''}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 56, alignItems: 'start' }}>
            <aside className="acc-side" style={{ position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p className="label" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: 14 }}>Menu</p>
              {TABS.map(t => (
                <button key={t.id} className={`acc-tab${activeTab === t.id ? ' active' : ''}`} onClick={() => { setActiveTab(t.id); window.location.hash = t.id }}>
                  <span className="acc-tab-num">{t.num}</span>
                  {t.label}
                </button>
              ))}
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--paper-edge)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                <a href="/privacy" style={{ display: 'block', padding: '6px 0', color: 'inherit', textDecoration: 'none' }}>Privacy</a>
                <a href="/terms" style={{ display: 'block', padding: '6px 0', color: 'inherit', textDecoration: 'none' }}>Terms</a>
              </div>
            </aside>

            <main>
              {activeTab === 'profile' && profile && (
                <ProfileTab profile={profile as Parameters<typeof ProfileTab>[0]['profile']} />
              )}
              {activeTab === 'security' && (
                <SecurityTab sessions={sessions as Parameters<typeof SecurityTab>[0]['sessions']} />
              )}
              {activeTab === 'library' && profile && (
                <LibraryTab profile={profile as Parameters<typeof LibraryTab>[0]['profile']} />
              )}
              {activeTab === 'comms' && (
                <CommsTab prefs={(data?.prefs ?? {}) as Parameters<typeof CommsTab>[0]['prefs']} />
              )}
              {activeTab === 'billing' && (
                <BillingTab orders={(data?.orders ?? []) as Parameters<typeof BillingTab>[0]['orders']} creditPence={data?.credit_pence ?? 0} />
              )}
              {activeTab === 'refer' && (
                <ReferTab />
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  )
}
