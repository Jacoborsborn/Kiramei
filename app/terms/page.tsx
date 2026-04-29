export default function Terms() {
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
          Terms & Conditions
        </h1>
        <p style={{ fontSize: 13, color: 'var(--ink-faint)', marginBottom: 48 }}>
          Last updated: 29 April 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

          <Section title="1. Who We Are">
            <p>These Terms & Conditions govern your use of the website <strong>www.kiramei.co.uk</strong> and all services offered through it, operated by Kira Mei ("we", "us", "our"). Contact: <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--sage)' }}>kiira.mei@outlook.com</a>.</p>
            <p>By purchasing a plan or submitting an application, you agree to these terms in full. If you do not agree, do not use this service.</p>
          </Section>

          <Section title="2. The Service">
            <p>Kira Mei provides personalised online fitness and nutrition coaching, including:</p>
            <ul>
              <li>Custom workout programmes</li>
              <li>Personalised meal plans, macros, and recipes</li>
              <li>Weekly shopping lists</li>
              <li>Email check-ins and programme adjustments (Standard and Pro)</li>
              <li>Body composition analysis and progress tracking (Pro only)</li>
            </ul>
            <p>All programmes are delivered digitally via email within 4 business days of payment being received and your intake form being completed.</p>
          </Section>

          <Section title="3. Not Medical Advice">
            <p><strong>The services provided by Kira Mei are for general fitness and wellness purposes only. Nothing on this website or within any programme, communication, or document constitutes medical advice, diagnosis, or treatment.</strong></p>
            <p>You must consult a qualified medical professional before starting any new exercise or nutrition programme, particularly if you:</p>
            <ul>
              <li>Have any existing medical conditions, injuries, or chronic illness</li>
              <li>Are pregnant, postpartum, or perimenopausal</li>
              <li>Take any prescription medication</li>
              <li>Have a history of disordered eating or exercise addiction</li>
            </ul>
            <p>By purchasing, you confirm you have done so or accept full responsibility for not doing so. We are not liable for any injury, illness, or adverse health outcome resulting from use of our services.</p>
          </Section>

          <Section title="4. Results Disclaimer">
            <p>Results shown or described on this website — including example progress data, case studies, and client results — are illustrative only. Individual results vary and are not guaranteed. Factors including but not limited to adherence, lifestyle, sleep, stress, age, and underlying health conditions all affect outcomes.</p>
            <p>We make no guarantees of specific results, weight loss, muscle gain, or fitness improvements.</p>
          </Section>

          <Section title="5. Payments & Billing">
            <p>All payments are processed securely through <strong>Stripe</strong>. We do not store your card details. By completing payment you agree to Stripe's own Terms of Service.</p>
            <p>Plans are billed per <strong>4-week cycle</strong>, not a calendar month. Your first cycle begins upon delivery of your programme.</p>
            <p>Prices are listed in GBP (British Pounds) and include VAT where applicable. We reserve the right to change pricing at any time; existing subscribers will be notified at least 7 days in advance of any price change.</p>
          </Section>

          <Section title="6. Refund Policy">
            <p>Due to the bespoke and digital nature of our service, <strong>we do not offer refunds once a programme has been delivered</strong>.</p>
            <p>If you have paid but your programme has not yet been started, you may request a full refund within 24 hours of payment by emailing <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--sage)' }}>kiira.mei@outlook.com</a>.</p>
            <p>In exceptional circumstances (e.g. serious illness or bereavement), we will consider refund or deferral requests on a case-by-case basis at our sole discretion.</p>
            <p>Chargebacks raised without first contacting us will be disputed. Fraudulent chargebacks may result in legal action.</p>
          </Section>

          <Section title="7. Cancellation">
            <p>You may cancel at any time. Cancellation takes effect at the end of your current billing cycle. No partial-cycle refunds are issued.</p>
            <p>To cancel, email <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--sage)' }}>kiira.mei@outlook.com</a> with your name and registered email address. Please allow up to 48 hours for confirmation.</p>
          </Section>

          <Section title="8. Programme Delivery & Timelines">
            <p>We aim to deliver your programme within <strong>4 business days</strong> of receiving both payment and a completed intake form. Delays caused by incomplete or unclear intake responses are not our responsibility.</p>
            <p>Delivery is by email. You are responsible for ensuring your email address is correct at the time of application. We are not liable for programmes sent to an incorrect address provided by you.</p>
          </Section>

          <Section title="9. Your Responsibilities">
            <p>By purchasing, you confirm that:</p>
            <ul>
              <li>You are at least 18 years of age</li>
              <li>The information provided in your intake form is accurate and complete to the best of your knowledge</li>
              <li>You will inform us immediately if your health status changes materially during your programme</li>
              <li>You will exercise within your own physical limits and stop immediately if you experience pain, dizziness, or discomfort</li>
              <li>You will not share, distribute, or resell your programme to any third party</li>
            </ul>
          </Section>

          <Section title="10. Intellectual Property">
            <p>All programmes, plans, documents, and content produced by Kira Mei are our intellectual property. They are provided for your personal use only.</p>
            <p>You may not reproduce, distribute, publish, share, or sell any part of your programme without our written permission. Breach of this clause may result in legal action.</p>
          </Section>

          <Section title="11. Limitation of Liability">
            <p>To the fullest extent permitted by law, Kira Mei shall not be liable for:</p>
            <ul>
              <li>Any injury, illness, or adverse health outcome resulting from following our programmes</li>
              <li>Any indirect, incidental, or consequential loss or damage</li>
              <li>Loss of earnings, business, or opportunity</li>
              <li>Any technical failure, delay in delivery, or data loss</li>
            </ul>
            <p>Our total liability to you in respect of any claim shall not exceed the amount paid by you in the most recent billing cycle.</p>
            <p>Nothing in these terms excludes our liability for death or personal injury caused by our negligence, or for fraud or fraudulent misrepresentation.</p>
          </Section>

          <Section title="12. Communications">
            <p>By submitting an application or purchasing a plan, you agree to receive service-related emails including programme delivery, check-in reminders, and account updates.</p>
            <p>We may also send occasional marketing communications. You may opt out at any time by emailing <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--sage)' }}>kiira.mei@outlook.com</a> or clicking "unsubscribe" in any marketing email.</p>
          </Section>

          <Section title="13. Behaviour & Termination">
            <p>We reserve the right to terminate your plan without refund if you:</p>
            <ul>
              <li>Are abusive, threatening, or harassing toward us in any communication</li>
              <li>Provide false information that materially affects the programme we build for you</li>
              <li>Breach these Terms & Conditions</li>
            </ul>
          </Section>

          <Section title="14. Governing Law">
            <p>These terms are governed by and construed in accordance with the laws of <strong>England and Wales</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </Section>

          <Section title="15. Changes to These Terms">
            <p>We may update these Terms & Conditions at any time. The current version will always be available at <strong>www.kiramei.co.uk/terms</strong>. Continued use of the service after changes constitutes acceptance of the revised terms.</p>
          </Section>

          <Section title="16. Contact">
            <p>For any questions about these terms, contact us at: <a href="mailto:kiira.mei@outlook.com" style={{ color: 'var(--sage)' }}>kiira.mei@outlook.com</a></p>
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
