'use client'

import { useState } from 'react'

type Prefs = {
  weekly_recap?: boolean
  product_drops?: boolean
  partner_offers?: boolean
  long_reads?: boolean
  paused_until?: string | null
}

export default function CommsTab({ prefs }: { prefs: Prefs }) {
  const [weeklyRecap, setWeeklyRecap] = useState(prefs.weekly_recap ?? true)
  const [productDrops, setProductDrops] = useState(prefs.product_drops ?? true)
  const [partnerOffers, setPartnerOffers] = useState(prefs.partner_offers ?? false)
  const [longReads, setLongReads] = useState(prefs.long_reads ?? false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSave() {
    setSaving(true); setSaved(false)
    await fetch('/api/me/prefs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weeklyRecap, productDrops, partnerOffers, longReads }),
    })
    setSaving(false); setSaved(true)
  }

  async function handlePause() {
    const until = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    await fetch('/api/me/prefs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pausedUntil: until }),
    })
    setSaved(true)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 12 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem,2.6vw,2.1rem)', fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>
          Communications <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>&amp; email.</em>
        </h2>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>05 / Comms</span>
      </div>

      <div style={{ background: 'var(--paper)', border: '1px solid var(--paper-edge)', borderRadius: 3, padding: '28px 30px', boxShadow: '0 1px 0 rgba(31,27,22,0.04), 0 12px 24px -18px rgba(31,27,22,0.16)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 22, paddingBottom: 14, borderBottom: '1px solid var(--paper-edge)' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>Email preferences</h3>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>Updated live</span>
        </div>

        {[
          { label: 'Weekly recap', desc: 'Progress summaries & training tips, every Sunday.', val: weeklyRecap, set: setWeeklyRecap },
          { label: 'Product drops', desc: 'New programmes, bundles, and updates.', val: productDrops, set: setProductDrops },
          { label: 'Long reads', desc: 'In-depth training & nutrition guides, monthly.', val: longReads, set: setLongReads },
          { label: 'Partner offers', desc: 'Curated discounts from trusted brands.', val: partnerOffers, set: setPartnerOffers },
        ].map(({ label, desc, val, set }) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 24, padding: '14px 0', borderTop: '1px solid var(--paper-edge)' }}>
            <div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 500, margin: 0 }}>{label}</p>
              <p style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--ink-soft)', marginTop: 2 }}>{desc}</p>
            </div>
            <label style={{ position: 'relative', width: 46, height: 26, flexShrink: 0 }}>
              <input type="checkbox" checked={val} onChange={e => { set(e.target.checked); setSaved(false) }} style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }} />
              <span onClick={() => { set(!val); setSaved(false) }} style={{ position: 'absolute', inset: 0, background: val ? 'var(--accent)' : 'var(--paper-deep)', border: `1.5px solid ${val ? 'var(--accent)' : 'var(--ink-muted)'}`, borderRadius: 14, cursor: 'pointer', transition: '0.18s' }}>
                <span style={{ position: 'absolute', width: 18, height: 18, left: val ? 22 : 2, top: 2, background: 'var(--paper)', border: `1.5px solid ${val ? 'var(--accent)' : 'var(--ink-muted)'}`, borderRadius: '50%', transition: '0.18s' }} />
              </span>
            </label>
          </div>
        ))}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, paddingTop: 20, borderTop: '1px dashed var(--paper-edge)', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handlePause} style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)', background: 'transparent', border: '1.5px solid var(--paper-edge)', borderRadius: 2, padding: '8px 14px', cursor: 'pointer' }}>
              Pause 30 days
            </button>
            {saved && <span style={{ fontSize: 12.5, color: 'var(--ink-muted)', display: 'flex', alignItems: 'center' }}>Saved.</span>}
          </div>
          <button onClick={handleSave} disabled={saving} className="km-btn">
            {saving ? 'Saving…' : 'Save preferences'}
          </button>
        </div>

        <p style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--ink-muted)', marginTop: 20 }}>
          Marketing emails are sent under the UK PECR soft opt-in exemption to existing customers of Kira Mei. You can unsubscribe from any individual category above, or use the unsubscribe link in any email. Purely transactional emails (order confirmations, security alerts) cannot be opted out of. See our <a href="/privacy" style={{ color: 'var(--accent)' }}>Privacy Policy</a> for details.
        </p>
      </div>
    </div>
  )
}
