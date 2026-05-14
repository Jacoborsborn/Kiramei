'use client'

type Profile = {
  programme_access?: boolean
  nutrition_access?: boolean
}

const PRODUCTS = [
  {
    key: 'programme_access',
    title: 'Training Blueprint',
    desc: '8-week progressive training programme',
    href: '/training',
    price: '£49',
    icon: '📋',
  },
  {
    key: 'nutrition_access',
    title: 'Nutrition Blueprint',
    desc: '8-week nutrition education & tracking',
    href: '/nutrition-portal',
    price: '£49',
    icon: '🥗',
  },
]

export default function LibraryTab({ profile }: { profile: Profile }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 12 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem,2.6vw,2.1rem)', fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>
          Your <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>library.</em>
        </h2>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>03 / Library</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {PRODUCTS.map(p => {
          const unlocked = !!(profile as Record<string, boolean | undefined>)[p.key]
          return (
            <div key={p.key} style={{ background: 'var(--paper)', border: `1px solid ${unlocked ? 'var(--ink)' : 'var(--paper-edge)'}`, borderRadius: 3, padding: '24px 22px', boxShadow: unlocked ? '3px 3px 0 var(--ink)' : 'none', opacity: unlocked ? 1 : 0.7, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, border: '1.5px solid var(--ink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, background: 'var(--paper)' }}>{p.icon}</div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: unlocked ? 'var(--accent)' : 'var(--ink-muted)', border: `1px solid ${unlocked ? 'var(--accent)' : 'var(--paper-edge)'}`, padding: '3px 8px', borderRadius: 2 }}>
                  {unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, margin: '0 0 4px' }}>{p.title}</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)', margin: '0 0 16px' }}>{p.desc}</p>
              {unlocked ? (
                <a href={p.href} className="km-btn" style={{ display: 'inline-block', padding: '10px 18px', fontSize: 12, textDecoration: 'none' }}>Open →</a>
              ) : (
                <a href={`/${p.key.replace('_access', '')}`} style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', textDecoration: 'none', border: '1.5px solid var(--accent)', padding: '8px 14px', borderRadius: 2, display: 'inline-block' }}>
                  Get access — {p.price}
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
