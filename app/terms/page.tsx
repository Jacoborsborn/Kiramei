export default function Terms() {
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
          Terms & Conditions
        </h1>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 48 }}>
          Last updated: 14 May 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

          <Section title="1. Who We Are">
            <p>These Terms & Conditions govern your purchase and use of digital products available at <strong>www.kiramei.co.uk</strong>. <strong>Kira Mei</strong> is an editorial brand created and operated by <strong>Jacob Orsborn-Smith</strong>. All training methodology, content and customer support is authored and provided by the founder. Contact: <a href="mailto:hello@kiramei.co.uk" style={{ color: 'var(--accent)' }}>hello@kiramei.co.uk</a>.</p>
            <p>By completing a purchase you confirm that you have read, understood, and agree to these terms in full. If you do not agree, do not proceed with a purchase.</p>
          </Section>

          <Section title="2. Our Products">
            <p>Kira Mei sells the following digital products:</p>
            <ul>
              <li><strong>Training Blueprint</strong> — an 8-week progressive training education programme delivered via an interactive web portal (£49.99)</li>
              <li><strong>Nutrition Blueprint</strong> — an 8-week nutrition framework and education programme delivered via an interactive web portal (£49.99)</li>
              <li><strong>Full Stack Bundle</strong> — both blueprints together at a discounted rate (£78.99)</li>
            </ul>
            <p>Products are delivered as a personalised account on our web portal, accessed via a login link sent to your email after purchase. Content unlocks progressively week-by-week as you complete each week. There are no physical goods, no subscription, and no recurring charges. Each product is a one-time purchase that grants lifetime access to your account.</p>
            <p>Content is educational in nature. The blueprints teach training and nutrition principles — they are not bespoke or personalised programmes.</p>
          </Section>

          <Section title="3. Not Medical Advice">
            <p><strong>The content within our products is for general fitness and wellness education only. Nothing constitutes medical advice, diagnosis, or treatment.</strong></p>
            <p>You should consult a qualified medical professional before starting any new exercise or nutrition approach, particularly if you:</p>
            <ul>
              <li>Have any existing medical conditions, injuries, or chronic illness</li>
              <li>Are pregnant, postpartum, or perimenopausal</li>
              <li>Take any prescription medication</li>
              <li>Have a history of disordered eating or exercise addiction</li>
            </ul>
            <p>By purchasing, you confirm you have done so or accept full responsibility for not doing so. We are not liable for any injury, illness, or adverse health outcome resulting from use of our products.</p>
          </Section>

          <Section title="4. Results Disclaimer">
            <p>Any results referenced or shown on this website — including example progress, case studies, and illustrative outcomes — are not guaranteed. Individual results vary depending on adherence, lifestyle, sleep, stress, age, health status, and many other factors outside our control.</p>
            <p>We make no guarantees of specific results, weight loss, muscle gain, or fitness improvements.</p>
          </Section>

          <Section title="5. Payments">
            <p>All payments are processed securely through <strong>Stripe</strong>. We do not store your card details. By completing payment you agree to Stripe's own Terms of Service.</p>
            <p>All prices are listed in GBP (British Pounds) and are one-time charges. VAT is included where applicable. There are no subscriptions, recurring charges, or hidden fees.</p>
            <p>We reserve the right to change product pricing at any time. Any price change will not affect purchases already completed.</p>
          </Section>

          <Section title="6. Delivery">
            <p>Upon successful payment, an account-activation link will be sent to the email address you provide at checkout. Delivery is typically <strong>instant</strong> — you should receive the link within a few minutes. Once activated, your account grants access to the web portal where Week 1 unlocks immediately. Subsequent weeks unlock progressively as you complete each one.</p>
            <p>If you have not received the activation link within 30 minutes of purchase, check your spam or junk folder, then contact us at <a href="mailto:hello@kiramei.co.uk" style={{ color: 'var(--accent)' }}>hello@kiramei.co.uk</a>.</p>
            <p>You are responsible for providing a correct and accessible email address at checkout. We are not liable for non-delivery caused by an incorrect address you have provided.</p>
          </Section>

          <Section title="7. Refund Policy &amp; Right to Cancel">
            <p>Under the Consumer Contracts Regulations 2013, you have a 14-day right to cancel a digital purchase from the date of contract. We honour this right as our standard refund policy.</p>
            <p><strong>Refund eligibility — both conditions must be met:</strong></p>
            <ul>
              <li>Your refund request is made within <strong>14 days</strong> of purchase, AND</li>
              <li>You have not yet unlocked Week 3 of the programme (which occurs when you mark Week 2 as complete in the portal).</li>
            </ul>
            <p>If both conditions are met, we will issue a full refund — no forms, no questions. To request a refund, email <a href="mailto:hello@kiramei.co.uk" style={{ color: 'var(--accent)' }}>hello@kiramei.co.uk</a> from the email address used at purchase.</p>
            <p><strong>Why Week 3 closes the refund window:</strong> unlocking Week 3 confirms you have worked through Weeks 1 and 2, which represents substantive consumption of the programme. After this point a refund would not be fair to either party, and your refund eligibility ends — even within the 14-day window.</p>
            <p>If you have been charged but have not received your activation link and we are unable to resend it, you are entitled to a full refund regardless of the conditions above. Please contact us within 7 days.</p>
            <p>In exceptional circumstances (e.g. duplicate accidental purchase, account inaccessibility through no fault of yours), we will consider refund requests at our sole discretion.</p>
            <p>Chargebacks raised without first contacting us will be disputed. Fraudulent chargebacks may result in legal action.</p>
          </Section>

          <Section title="8. Your Responsibilities">
            <p>By purchasing, you confirm that:</p>
            <ul>
              <li>You are at least 18 years of age</li>
              <li>You will use the products for personal, non-commercial use only</li>
              <li>You will exercise within your own physical limits and stop immediately if you experience pain, dizziness, or discomfort</li>
              <li>You will not share, distribute, screenshot for re-publication, upload, or resell any part of the programme content (including portal content, exercises, written material or videos) to any third party</li>
            </ul>
          </Section>

          <Section title="9. Intellectual Property">
            <p>All content within our products — including text, frameworks, training structures, and design — is the intellectual property of Kira Mei. It is licensed to you for personal use only upon purchase.</p>
            <p>You may not reproduce, distribute, publish, share publicly, upload online, or sell any part of our products without our written permission. Breach of this clause may result in legal action.</p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>To the fullest extent permitted by law, Kira Mei shall not be liable for:</p>
            <ul>
              <li>Any injury, illness, or adverse health outcome resulting from use of our products</li>
              <li>Any indirect, incidental, or consequential loss or damage</li>
              <li>Loss of earnings, business, or opportunity</li>
              <li>Any technical failure, email delivery delay, or data loss</li>
            </ul>
            <p>Our total liability to you shall not exceed the amount you paid for the relevant product.</p>
            <p>Nothing in these terms excludes our liability for death or personal injury caused by our negligence, or for fraud or fraudulent misrepresentation.</p>
          </Section>

          <Section title="11. Communications">
            <p>By purchasing, you agree to receive transactional emails related to your order (delivery confirmation, receipt).</p>
            <p>If you opt in at checkout, we may also send occasional updates about new content. You can opt out at any time by emailing <a href="mailto:hello@kiramei.co.uk" style={{ color: 'var(--accent)' }}>hello@kiramei.co.uk</a> or clicking "unsubscribe" in any marketing email.</p>
          </Section>

          <Section title="12. Governing Law">
            <p>These terms are governed by and construed in accordance with the laws of <strong>England and Wales</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </Section>

          <Section title="13. Changes to These Terms">
            <p>We may update these Terms & Conditions at any time. The current version will always be available at <strong>www.kiramei.co.uk/terms</strong>. Changes take effect upon publication and apply to purchases made after that date.</p>
          </Section>

          <Section title="14. Contact">
            <p>For any questions about these terms or your purchase, contact us at: <a href="mailto:hello@kiramei.co.uk" style={{ color: 'var(--accent)' }}>hello@kiramei.co.uk</a></p>
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
