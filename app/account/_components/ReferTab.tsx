'use client'

export default function ReferTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 12 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem,2.6vw,2.1rem)', fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>
          Refer &amp; <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>earn.</em>
        </h2>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>06 / Refer</span>
      </div>

      <div style={{
        background: 'var(--paper-deep)',
        border: '1.5px dashed var(--paper-edge)',
        padding: '48px 36px',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>Coming soon</p>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, marginBottom: 10 }}>Referrals &amp; rewards</h3>
        <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto' }}>
          Refer a friend and you both get £10 off. We're putting the finishing touches on this — it'll be live soon.
        </p>
      </div>
    </div>
  )
}
