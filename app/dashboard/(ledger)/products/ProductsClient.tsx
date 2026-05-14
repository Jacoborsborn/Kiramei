'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LCard, Tag, StatusTag, Toggle, Bar } from '../LedgerComponents'

const fmtGBP = (pence: number) =>
  '£' + (pence / 100).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

type Product = {
  id: string; name: string; blurb: string; price_pence: number
  stripe_price_id: string; status: string; banner_active: boolean; long_description: string | null
}

function ProductEditor({ product, onClose }: { product: Product; onClose: () => void }) {
  const router = useRouter()
  const [name, setName] = useState(product.name)
  const [blurb, setBlurb] = useState(product.blurb)
  const [pricePence, setPricePence] = useState(product.price_pence)
  const [stripeId, setStripeId] = useState(product.stripe_price_id)
  const [longDesc, setLongDesc] = useState(product.long_description ?? '')
  const [live, setLive] = useState(product.status === 'live')
  const [banner, setBanner] = useState(product.banner_active)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function save() {
    setSaving(true)
    await fetch(`/api/founder/products/${product.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name, blurb, price_pence: pricePence, stripe_price_id: stripeId,
        status: live ? 'live' : 'waitlist',
        banner_active: banner,
        long_description: longDesc,
      }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    router.refresh()
  }

  return (
    <LCard
      title={`Edit · ${product.name}`}
      eyebrow={`product · ${product.id}`}
      action={<button className="ldg-btn ldg-btn-ghost" onClick={onClose}>close</button>}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28 }}>
        <div>
          <div className="field">
            <label>Display name</label>
            <input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="field">
            <label>One-line blurb</label>
            <input value={blurb} onChange={e => setBlurb(e.target.value)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="field">
              <label>Price (pence)</label>
              <input type="number" value={pricePence} onChange={e => setPricePence(parseInt(e.target.value))} step="1" />
            </div>
            <div className="field">
              <label>Stripe Price ID</label>
              <input value={stripeId} onChange={e => setStripeId(e.target.value)} placeholder="price_..." />
            </div>
          </div>
          <div className="field">
            <label>Long description</label>
            <textarea rows={5} value={longDesc} onChange={e => setLongDesc(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <button className="ldg-btn ldg-btn-accent" onClick={save} disabled={saving}>
              {saved ? 'Saved ✓' : saving ? 'Saving…' : 'Save changes'}
            </button>
            <a href={`/${product.id}`} target="_blank" className="ldg-btn ldg-btn-ghost">Preview page</a>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--paper-edge)' }}>
            <div>
              <div className="small-mono">STATUS</div>
              <strong>{live ? 'Live on site' : 'Waitlist mode'}</strong>
            </div>
            <Toggle on={live} onChange={setLive} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--paper-edge)' }}>
            <div>
              <div className="small-mono">LAUNCH BANNER</div>
              <strong>{banner ? 'Showing on home' : 'Hidden'}</strong>
            </div>
            <Toggle on={banner} onChange={setBanner} />
          </div>
          <div className="margin-pad" style={{ marginTop: 18 }}>
            preview at /{product.id} after save<br />edits are atomic
          </div>
          <div style={{ marginTop: 18 }}>
            <div className="small-mono">CURRENT PRICE</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 24 }}>{fmtGBP(pricePence)}</div>
          </div>
        </div>
      </div>
    </LCard>
  )
}

export default function ProductsClient({ products }: { products: Product[] }) {
  const [editing, setEditing] = useState<string | null>(null)
  const product = products.find(p => p.id === editing)

  if (product) return <ProductEditor product={product} onClose={() => setEditing(null)} />

  return (
    <>
      <div className="stat-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {products.map(p => (
          <div key={p.id} className={`product-tile${p.id === 'bundle' ? ' featured' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="small">{p.id}</span>
              <StatusTag status={p.status} />
            </div>
            <h3>{p.name}</h3>
            <div className="small">{p.blurb}</div>
            <div className="price">{fmtGBP(p.price_pence)}</div>
            <div className="product-actions">
              <button className="ldg-btn" onClick={() => setEditing(p.id)}>Edit</button>
              <a href={`/${p.id}`} target="_blank" className="ldg-btn ldg-btn-ghost">Preview</a>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        <LCard title="Product page conversion" eyebrow="08 · which page sells">
          {products.map((p, i) => (
            <div key={p.id} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                <strong>{p.name}</strong>
                <span className="mono muted">{fmtGBP(p.price_pence)} · {p.status}</span>
              </div>
              <Bar pct={p.status === 'live' ? 65 : 4} color={i === 2 ? 'accent' : 'ink'} />
            </div>
          ))}
        </LCard>
      </div>
    </>
  )
}
