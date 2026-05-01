import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: '#040404',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '48px 24px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '32px 48px',
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <p style={{
              fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#EEEAE4', marginBottom: 10,
            }}>
              Kira Mei
            </p>
            <p style={{ fontSize: 13, color: 'rgba(238,234,228,0.35)', lineHeight: 1.7, maxWidth: 200 }}>
              Digital fitness education. Buy once, understand forever.
            </p>
          </div>

          {/* Products */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.3)', marginBottom: 12 }}>
              Products
            </p>
            {[
              { href: '/training',  label: 'Training Blueprint' },
              { href: '/nutrition', label: 'Nutrition Blueprint' },
              { href: '/bundle',    label: 'Full Stack Bundle' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{
                display: 'block', fontSize: 13, color: 'rgba(238,234,228,0.5)',
                textDecoration: 'none', marginBottom: 8, transition: 'color 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EEEAE4' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(238,234,228,0.5)' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Info */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.3)', marginBottom: 12 }}>
              Info
            </p>
            {[
              { href: '/about',   label: 'About Kira' },
              { href: '/terms',   label: 'Terms & Conditions' },
              { href: '/privacy', label: 'Privacy Policy' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{
                display: 'block', fontSize: 13, color: 'rgba(238,234,228,0.5)',
                textDecoration: 'none', marginBottom: 8, transition: 'color 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EEEAE4' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(238,234,228,0.5)' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Client */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(238,234,228,0.3)', marginBottom: 12 }}>
              Client Access
            </p>
            <Link href="/login" style={{
              display: 'block', fontSize: 13, color: 'rgba(238,234,228,0.5)',
              textDecoration: 'none', marginBottom: 8, transition: 'color 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EEEAE4' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(238,234,228,0.5)' }}
            >
              Client Login
            </Link>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
          <p style={{ fontSize: 12, color: 'rgba(238,234,228,0.2)', letterSpacing: '0.06em' }}>
            © Kira Mei 2025 · London · Digital products are non-refundable once downloaded.
          </p>
        </div>
      </div>
    </footer>
  )
}
