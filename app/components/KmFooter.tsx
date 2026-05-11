import Link from 'next/link'

export default function KmFooter() {
  return (
    <footer className="km-footer">
      <div className="km-container">
        <hr className="km-rule-sketch" style={{ marginBottom: 48 }} />
        <div className="km-footer-grid">
          <div>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 26, marginBottom: 8, color: 'var(--ink)' }}>Kira Mei</p>
            <p style={{ color: 'var(--ink-muted)', fontSize: 13, maxWidth: 260, lineHeight: 1.6 }}>
              Train once. Understand forever. An education in your own body.
            </p>
            <p style={{ marginTop: 18, fontFamily: 'var(--hand)', color: 'var(--margin-red)', fontSize: 18 }}>
              — made with care, in London
            </p>
          </div>
          <div>
            <p className="km-label" style={{ marginBottom: 14 }}>Programmes</p>
            <ul className="km-footer-list">
              <li><Link href="/training">Training Blueprint</Link></li>
              <li><Link href="/nutrition">Nutrition Blueprint</Link></li>
              <li><Link href="/bundle">Full Stack Bundle</Link></li>
            </ul>
          </div>
          <div>
            <p className="km-label" style={{ marginBottom: 14 }}>More</p>
            <ul className="km-footer-list">
              <li><Link href="/about">About Kira</Link></li>
              <li><a href="mailto:hello@kiramei.co.uk">Contact</a></li>
              <li><Link href="/terms">Terms</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <p className="km-label" style={{ marginBottom: 14 }}>Account</p>
            <ul className="km-footer-list">
              <li><Link href="/login">Sign in</Link></li>
              <li><Link href="/portal">My programmes</Link></li>
            </ul>
          </div>
        </div>
        <div className="km-footer-bottom">
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-muted)' }}>© KIRA MEI · MMXXVI</p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-muted)' }}>KIRAMEI.CO.UK</p>
        </div>
      </div>
    </footer>
  )
}
