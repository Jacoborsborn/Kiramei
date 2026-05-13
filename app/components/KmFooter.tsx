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
          <div>
            <p className="km-label" style={{ marginBottom: 14 }}>Stay close</p>
            <ul className="km-footer-list">
              <li><a href="https://www.instagram.com/kiramei.pt" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.tiktok.com/@kira.plans" target="_blank" rel="noopener noreferrer">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--paper-edge)', paddingTop: 28, marginBottom: 24 }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-muted)', lineHeight: 1.8, maxWidth: 780, textTransform: 'uppercase' }}>
            Programme structure notice — This programme was developed with the assistance of AI tools to help organise, structure and present the content in the most clear and effective way for you. All training principles, methods and expertise remain Kira&apos;s own. AI was used as a structural and editorial aid, not as a source of advice.
          </p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-muted)', lineHeight: 1.8, maxWidth: 780, textTransform: 'uppercase', marginTop: 12 }}>
            Liability disclaimer — This programme is provided for educational and informational purposes only and is not a substitute for professional medical or fitness advice. By participating, you confirm that you are doing so voluntarily and at your own risk. Kira Mei accepts no responsibility for any injury, illness or adverse outcome arising from following this programme. Always consult a qualified professional before beginning any new exercise or nutrition plan.
          </p>
        </div>
        <div className="km-footer-bottom">
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-muted)' }}>© KIRA MEI · MMXXVI</p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-muted)' }}>KIRAMEI.CO.UK</p>
        </div>
      </div>
    </footer>
  )
}
