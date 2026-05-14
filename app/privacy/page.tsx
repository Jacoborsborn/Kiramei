export default function Privacy() {
  return (
    <main style={{ background: 'var(--paper)', minHeight: '100vh', padding: 'clamp(48px, 8vw, 80px) 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        <a href="/" style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.06em', display: 'inline-block', marginBottom: 40 }}>
          ← Back to kiramei.co.uk
        </a>

        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
          Legal
        </p>
        <h1 className="font-display" style={{ fontSize: 'clamp(36px, 7vw, 52px)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 12 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 48 }}>
          Last updated: 14 May 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

          <Section title="1. Who We Are">
            <p>This Privacy Policy describes how <strong>Kira Mei</strong> ("we", "us", "our") collects, uses, stores, and protects your personal data when you visit <strong>www.kiramei.co.uk</strong> or purchase our digital products.</p>
            <p>We are the data controller for the purposes of UK GDPR and the Data Protection Act 2018.</p>
            <p>Contact: <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--accent)' }}>kiira.mei@outlook.com</a></p>
          </Section>

          <Section title="2. What Data We Collect">
            <p><strong>When you make a purchase:</strong></p>
            <ul>
              <li><strong>Identity data:</strong> Name</li>
              <li><strong>Contact data:</strong> Email address</li>
              <li><strong>Payment data:</strong> Processed entirely by Stripe — we do not store card details. We receive confirmation of payment status and a Stripe customer reference only.</li>
            </ul>
            <p><strong>When you visit the website (analytics):</strong></p>
            <ul>
              <li><strong>Visitor ID:</strong> A randomly generated identifier stored in a cookie (<code>km_v</code>) that persists for 365 days, used to distinguish unique visitors</li>
              <li><strong>Session ID:</strong> A randomly generated identifier stored in a cookie (<code>km_s</code>) that expires after 24 hours, used to group activity within a visit</li>
              <li><strong>Pages visited:</strong> The URL path of each page you view</li>
              <li><strong>Referrer:</strong> The URL of the page you came from, if your browser provides it</li>
              <li><strong>UTM parameters:</strong> Campaign and source tags from marketing links (e.g. <code>utm_source</code>, <code>utm_campaign</code>)</li>
              <li><strong>Scroll depth:</strong> How far down a page you scroll (recorded at 25%, 50%, 75%, 100% milestones)</li>
              <li><strong>Click events:</strong> Interactions with specific buttons or links that we have explicitly tagged for tracking</li>
              <li><strong>Device type:</strong> Broadly categorised from your browser's user agent (e.g. mobile, desktop)</li>
              <li><strong>Country:</strong> Derived from your IP address by our hosting provider (Vercel). We receive the country code only — we do not store your IP address.</li>
            </ul>
            <p>This analytics data is collected by our own first-party tracking system. No third-party analytics provider (e.g. Google Analytics) is used.</p>
          </Section>

          <Section title="3. Why We Collect Your Data (Legal Basis)">
            <p>We process your personal data on the following legal bases under UK GDPR:</p>
            <ul>
              <li><strong>Contract performance:</strong> To process your payment, deliver your purchased PDF(s) to your email, and provide order-related communications.</li>
              <li><strong>Legitimate interests:</strong> To operate first-party analytics that help us understand how the website is used and improve the experience. This tracking is privacy-friendly — it uses no third-party scripts, does not profile you for advertising, and collects no sensitive personal data.</li>
              <li><strong>Consent:</strong> For any optional marketing communications you opt into at checkout. You may withdraw consent at any time.</li>
              <li><strong>Legal obligation:</strong> To retain payment and transaction records as required for tax and regulatory purposes.</li>
            </ul>
          </Section>

          <Section title="4. How We Use Your Data">
            <p>Your data is used to:</p>
            <ul>
              <li>Process your payment and deliver your digital products</li>
              <li>Send order confirmation and PDF delivery emails</li>
              <li>Respond to your support queries</li>
              <li>Understand which pages and content are most useful (via analytics)</li>
              <li>Measure the effectiveness of our marketing campaigns (via UTM data)</li>
              <li>Improve the website experience based on scroll and click behaviour</li>
              <li>Send occasional updates about new products or content (only with your consent; opt-out at any time)</li>
            </ul>
            <p>We do not use your data for automated decision-making that produces legal or similarly significant effects. We do not use your data for advertising profiling or sell it to any third party.</p>
          </Section>

          <Section title="5. Cookies">
            <p>We use two first-party cookies for our own analytics. No third-party tracking or advertising cookies are used.</p>
            <ul>
              <li>
                <strong><code>km_v</code> — Visitor ID</strong><br />
                A randomly generated anonymous identifier. Used to count unique visitors and understand return visit patterns. Expires after <strong>365 days</strong>.
              </li>
              <li>
                <strong><code>km_s</code> — Session ID</strong><br />
                A randomly generated identifier scoped to your current visit. Used to group page views and events within a single session. Expires after <strong>24 hours</strong>.
              </li>
            </ul>
            <p>These cookies do not contain any personally identifiable information. They are not shared with any third party and are not used for advertising.</p>
            <p>You can block or delete cookies at any time through your browser settings. Doing so will not affect your ability to use the website or purchase our products.</p>
          </Section>

          <Section title="6. Who We Share Your Data With">
            <p>We share your data with a limited number of trusted third-party processors only as necessary to operate our service:</p>
            <ul>
              <li><strong>Stripe</strong> — payment processing (<a href="https://stripe.com/privacy" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">stripe.com/privacy</a>)</li>
              <li><strong>Vercel</strong> — website hosting and infrastructure (<a href="https://vercel.com/legal/privacy-policy" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a>)</li>
              <li><strong>Supabase</strong> — database storage of order and analytics data (<a href="https://supabase.com/privacy" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">supabase.com/privacy</a>)</li>
              <li><strong>Resend</strong> — transactional email delivery (<a href="https://resend.com/privacy" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">resend.com/privacy</a>)</li>
            </ul>
            <p>All processors are contractually obligated to handle your data securely and in accordance with applicable data protection law.</p>
            <p>We do not sell, rent, or trade your personal data to any third party for marketing purposes. We may disclose your data if required to do so by law, court order, or regulatory authority.</p>
          </Section>

          <Section title="7. Data Retention">
            <p>We retain your personal data only for as long as necessary:</p>
            <ul>
              <li><strong>Order and customer records:</strong> Retained for 7 years as required by HMRC for tax purposes</li>
              <li><strong>Analytics event data:</strong> Retained for up to 12 months, after which it is deleted or anonymised</li>
              <li><strong>Marketing consent records:</strong> Retained until you withdraw consent</li>
            </ul>
          </Section>

          <Section title="8. Your Rights">
            <p>Under UK GDPR, you have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Right of access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Right to rectification:</strong> Ask us to correct inaccurate or incomplete data</li>
              <li><strong>Right to erasure:</strong> Request deletion of your personal data, subject to legal retention obligations</li>
              <li><strong>Right to restrict processing:</strong> Ask us to limit how we use your data in certain circumstances</li>
              <li><strong>Right to data portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Right to object:</strong> Object to processing based on legitimate interests or for direct marketing</li>
              <li><strong>Right to withdraw consent:</strong> Withdraw consent for marketing at any time (this does not affect processing carried out prior to withdrawal)</li>
            </ul>
            <p>To exercise any of these rights, email <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--accent)' }}>kiira.mei@outlook.com</a>. We will respond within 30 days. We may need to verify your identity before processing a request.</p>
          </Section>

          <Section title="9. Security">
            <p>We take the security of your data seriously. Measures in place include:</p>
            <ul>
              <li>HTTPS encryption on all website traffic</li>
              <li>Encrypted database storage via Supabase</li>
              <li>No storage of payment card details</li>
              <li>Analytics data is anonymous — visitor and session IDs are randomly generated and not linked to your identity</li>
            </ul>
            <p>No method of transmission over the internet is 100% secure. In the event of a data breach that poses a risk to your rights and freedoms, we will notify you and the ICO as required by law.</p>
          </Section>

          <Section title="10. Children">
            <p>Our products are not directed at anyone under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has submitted data to us, please contact us immediately and we will delete it.</p>
          </Section>

          <Section title="11. International Transfers">
            <p>Some of our service providers (including Stripe, Vercel, and Supabase) may process data outside the UK. Where this occurs, we ensure appropriate safeguards are in place, including Standard Contractual Clauses or adequacy decisions recognised under UK law.</p>
          </Section>

          <Section title="12. Complaints">
            <p>If you are unhappy with how we have handled your personal data, please contact us first at <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--accent)' }}>kiira.mei@outlook.com</a>.</p>
            <p>You also have the right to lodge a complaint with the <strong>Information Commissioner's Office (ICO)</strong>:</p>
            <p>Website: <a href="https://ico.org.uk" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">ico.org.uk</a><br />Helpline: 0303 123 1113</p>
          </Section>

          <Section title="13. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. The current version will always be available at <strong>www.kiramei.co.uk/privacy</strong>. Significant changes will be communicated by email to customers who have purchased from us.</p>
          </Section>

        </div>

        <div style={{ marginTop: 60, paddingTop: 24, borderTop: '1px solid var(--paper-edge)', textAlign: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Kira Mei — Digital Fitness Education</span>
        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>{title}</h2>
      <div style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {children}
      </div>
    </div>
  )
}
