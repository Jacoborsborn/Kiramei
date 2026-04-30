import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseServerClient, createSupabaseServiceClient } from '@/lib/supabase-server'

export default async function PortalHomePage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const service = createSupabaseServiceClient()
  const { data: lead } = await service
    .from('kira_leads')
    .select('name, plan_selected, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const { data: programme } = await service
    .from('kira_programmes')
    .select('id, sent_at')
    .eq('user_id', user.id)
    .order('sent_at', { ascending: false })
    .limit(1)
    .single()

  const firstName = lead?.name?.split(' ')[0] ?? 'there'
  const isPro = lead?.plan_selected === 'bundle'
  const planLabel = isPro ? 'Pro Bundle' : 'Standard'

  const quickLinks = [
    { href: '/portal/programme', label: 'View My Programme', desc: programme ? 'Your plan is ready' : 'Pending delivery', icon: '◎', available: !!programme },
    { href: '/portal/billing', label: 'Manage Billing', desc: 'Subscription & invoices', icon: '◈', available: true },
    { href: '/portal/account', label: 'Account Settings', desc: 'Profile, email & password', icon: '◉', available: true },
  ]

  const proLinks = [
    { href: '/portal/checkins', label: 'Weekly Check-in', desc: 'Log your weekly progress', icon: '✓' },
    { href: '/portal/body-comp', label: 'Body Composition', desc: 'Your analysis report', icon: '◐' },
    { href: '/portal/progress', label: 'Progress Tracker', desc: 'Measurements & trends', icon: '↗' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 10 }}>
          Client Portal
        </p>
        <h1 className="font-display" style={{ fontSize: 40, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 12 }}>
          Welcome back, {firstName}.
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            padding: '4px 12px', borderRadius: 99,
            background: isPro ? 'var(--ink)' : 'var(--border)',
            color: isPro ? '#F8F6F1' : 'var(--ink-muted)',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            {planLabel}
          </span>
          <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>plan active</span>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginBottom: 40 }}>
        {quickLinks.map(item => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'block', textDecoration: 'none',
              background: '#FDFCF9', border: '1px solid var(--border)',
              borderRadius: 16, padding: '24px',
              transition: 'box-shadow 0.15s, transform 0.15s',
              opacity: item.available ? 1 : 0.6,
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{item.label}</p>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* Pro section */}
      {isPro && (
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 16 }}>
            Pro Features
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {proLinks.map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'block', textDecoration: 'none',
                  background: 'var(--ink)', borderRadius: 16, padding: '24px',
                  transition: 'opacity 0.15s',
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 12, color: 'var(--sage)' }}>{item.icon}</div>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#F8F6F1', marginBottom: 4 }}>{item.label}</p>
                <p style={{ fontSize: 13, color: 'rgba(248,246,241,0.55)' }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {!isPro && (
        <div style={{
          background: '#F4F2EE', borderRadius: 16, padding: '28px',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Want Pro features?</p>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6 }}>
            Upgrade to the Pro Bundle to unlock body composition analysis, weekly check-ins, and progress tracking.
          </p>
          <Link
            href="/portal/billing"
            style={{
              display: 'inline-block', padding: '12px 24px',
              background: 'var(--ink)', color: '#F8F6F1',
              borderRadius: 99, fontSize: 14, fontWeight: 600, textDecoration: 'none',
              width: 'fit-content',
            }}
          >
            Manage subscription →
          </Link>
        </div>
      )}
    </div>
  )
}
