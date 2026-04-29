export default function Privacy() {
  return (
    <main style={{ background: 'var(--paper)', minHeight: '100vh', padding: 'clamp(48px, 8vw, 80px) 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        <a href="/" style={{ fontSize: 12, color: 'var(--sage)', textDecoration: 'none', letterSpacing: '0.06em', display: 'inline-block', marginBottom: 40 }}>
          ← Back to kiramei.co.uk
        </a>

        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 16 }}>
          Legal
        </p>
        <h1 className="font-display" style={{ fontSize: 'clamp(36px, 7vw, 52px)', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 12 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 13, color: 'var(--ink-faint)', marginBottom: 48 }}>
          Last updated: 29 April 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

          <Section title="1. Who We Are">
            <p>This Privacy Policy describes how <strong>Kira Mei</strong> ("we", "us", "our") collects, uses, stores, and protects your personal data when you visit <strong>www.kiramei.co.uk</strong> or purchase our services.</p>
            <p>We are the data controller for the purposes of UK GDPR and the Data Protection Act 2018.</p>
            <p>Contact: <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--sage)' }}>kiira.mei@outlook.com</a></p>
          </Section>

          <Section title="2. What Data We Collect">
            <p>We collect the following personal data when you submit an application or purchase a plan:</p>
            <ul>
              <li><strong>Identity data:</strong> Full name, age</li>
              <li><strong>Contact data:</strong> Email address, Instagram handle (optional)</li>
              <li><strong>Location data:</strong> Country of residence</li>
              <li><strong>Health & fitness data:</strong> Goals, fitness level, training frequency, equipment, injuries or physical limitations, any additional notes you provide</li>
              <li><strong>Payment data:</strong> Processed by Stripe — we do not store card details. We receive confirmation of payment status only.</li>
              <li><strong>Marketing data:</strong> How you found us (referral source)</li>
            </ul>
            <p>We may also collect basic technical data such as IP address and browser type through our website hosting provider (Vercel) for security and performance purposes.</p>
          </Section>

          <Section title="3. Why We Collect Your Data (Legal Basis)">
            <p>We process your personal data on the following legal bases under UK GDPR:</p>
            <ul>
              <li><strong>Contract performance:</strong> To deliver your programme, process payment, and provide ongoing coaching services.</li>
              <li><strong>Legitimate interests:</strong> To improve our services, maintain records, and communicate with you about your programme.</li>
              <li><strong>Consent:</strong> For any marketing communications. You may withdraw consent at any time.</li>
              <li><strong>Legal obligation:</strong> Where we are required to retain records for tax, fraud prevention, or regulatory purposes.</li>
            </ul>
            <p><strong>Special category data:</strong> Health and fitness information you provide is processed under Article 9(2)(a) UK GDPR — your explicit consent given by submitting the intake form. This data is used solely to personalise your programme.</p>
          </Section>

          <Section title="4. How We Use Your Data">
            <p>Your data is used to:</p>
            <ul>
              <li>Build and deliver your personalised fitness and nutrition programme</li>
              <li>Process your payment and manage billing</li>
              <li>Send programme updates, check-in emails, and adjustments</li>
              <li>Respond to your queries and support requests</li>
              <li>Maintain client records as required for our business operations</li>
              <li>Send marketing emails (only with your consent; opt-out available at any time)</li>
            </ul>
            <p>We do not use your data for automated decision-making that produces legal or similarly significant effects.</p>
          </Section>

          <Section title="5. Who We Share Your Data With">
            <p>We share your data with a limited number of trusted third-party processors only as necessary to operate our service:</p>
            <ul>
              <li><strong>Stripe</strong> — payment processing (stripe.com/privacy)</li>
              <li><strong>Vercel</strong> — website hosting and infrastructure (vercel.com/legal/privacy-policy)</li>
              <li><strong>Supabase</strong> — secure database storage of application data (supabase.com/privacy)</li>
              <li><strong>Resend</strong> — transactional email delivery (resend.com/privacy)</li>
            </ul>
            <p>All processors are contractually obligated to handle your data securely and in accordance with applicable data protection law.</p>
            <p>We do not sell, rent, or trade your personal data to any third party for marketing purposes.</p>
            <p>We may disclose your data if required to do so by law, court order, or regulatory authority.</p>
          </Section>

          <Section title="6. Health Data">
            <p>Information you provide about injuries, physical limitations, hormonal health, and medical history is sensitive personal data. We treat it with the highest level of care:</p>
            <ul>
              <li>It is stored in an encrypted database with restricted access</li>
              <li>It is used solely for the purpose of building and adjusting your programme</li>
              <li>It is never shared with third parties except as required by law</li>
              <li>It is not used for any marketing, profiling, or research purposes</li>
            </ul>
          </Section>

          <Section title="7. Data Retention">
            <p>We retain your personal data for as long as necessary to provide our services and meet our legal obligations:</p>
            <ul>
              <li><strong>Active client records:</strong> Retained for the duration of your subscription plus 2 years</li>
              <li><strong>Payment records:</strong> Retained for 7 years as required by HMRC for tax purposes</li>
              <li><strong>Health data:</strong> Deleted within 6 months of your last active subscription, or sooner upon your written request</li>
              <li><strong>Marketing consent records:</strong> Retained until you withdraw consent</li>
            </ul>
          </Section>

          <Section title="8. Your Rights">
            <p>Under UK GDPR, you have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Right of access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Right to rectification:</strong> Ask us to correct inaccurate or incomplete data</li>
              <li><strong>Right to erasure:</strong> Request deletion of your personal data ("right to be forgotten"), subject to legal retention obligations</li>
              <li><strong>Right to restrict processing:</strong> Ask us to limit how we use your data in certain circumstances</li>
              <li><strong>Right to data portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Right to object:</strong> Object to processing based on legitimate interests or for direct marketing</li>
              <li><strong>Right to withdraw consent:</strong> Withdraw consent for health data processing or marketing at any time (this does not affect processing carried out prior to withdrawal)</li>
            </ul>
            <p>To exercise any of these rights, email <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--sage)' }}>kiira.mei@outlook.com</a>. We will respond within 30 days. We may need to verify your identity before processing a request.</p>
          </Section>

          <Section title="9. Security">
            <p>We take the security of your data seriously. Measures in place include:</p>
            <ul>
              <li>HTTPS encryption on all website traffic</li>
              <li>Encrypted database storage via Supabase</li>
              <li>Restricted access to client data — accessible only to us and our processors</li>
              <li>No storage of payment card details</li>
            </ul>
            <p>No method of transmission over the internet is 100% secure. While we do our best to protect your data, we cannot guarantee absolute security. In the event of a data breach that poses a risk to your rights and freedoms, we will notify you and the ICO as required by law.</p>
          </Section>

          <Section title="10. Cookies">
            <p>Our website uses minimal cookies necessary to operate the site. We do not currently use tracking, advertising, or analytics cookies. If this changes, we will update this policy and seek your consent where required.</p>
          </Section>

          <Section title="11. Children">
            <p>Our services are not directed at anyone under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has submitted data to us, please contact us immediately and we will delete it.</p>
          </Section>

          <Section title="12. International Transfers">
            <p>Some of our service providers (including Stripe, Vercel, and Supabase) may process data outside the UK. Where this occurs, we ensure appropriate safeguards are in place, including Standard Contractual Clauses or adequacy decisions recognised under UK law.</p>
          </Section>

          <Section title="13. Complaints">
            <p>If you are unhappy with how we have handled your personal data, please contact us first at <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--sage)' }}>kiira.mei@outlook.com</a>.</p>
            <p>You also have the right to lodge a complaint with the <strong>Information Commissioner's Office (ICO)</strong>:</p>
            <p>Website: <a href="https://ico.org.uk" style={{ color: 'var(--sage)' }} target="_blank" rel="noopener noreferrer">ico.org.uk</a><br />Helpline: 0303 123 1113</p>
          </Section>

          <Section title="14. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. The current version will always be available at <strong>www.kiramei.co.uk/privacy</strong>. Significant changes will be communicated by email if you are an active client.</p>
          </Section>

        </div>

        <div style={{ marginTop: 60, paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--ink-faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Kira Mei — Online PT</span>
        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>{title}</h2>
      <div style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {children}
      </div>
    </div>
  )
}
