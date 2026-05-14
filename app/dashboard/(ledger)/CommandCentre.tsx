'use client'

import { Stat, LCard, Tag, Funnel, MiniChart, Bar, Donut } from './LedgerComponents'

const fmtGBP = (n: number) =>
  '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function timeAgo(ts: string): string {
  const sec = Math.floor((Date.now() - new Date(ts).getTime()) / 1000)
  if (sec < 60) return `${sec}s ago`
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`
  return `${Math.floor(sec / 3600)}h ago`
}

type PulseRow = { kind: string; path?: string; target?: string; country?: string; ts: string }

export default function CommandCentre({
  revenue30, units30, waitlistCount, liveCount,
  revSeries, visSeries, wlSeries,
  funnel, clicks, pulse,
}: {
  revenue30: number; units30: number; waitlistCount: number; liveCount: number
  revSeries: number[]; visSeries: number[]; wlSeries: number[]
  funnel: Array<{ label: string; value: number; pct: number }>
  clicks: Array<{ label: string; clicks: number }>
  pulse: PulseRow[]
}) {
  const REFERRERS = [
    { name: 'Instagram (story)', pct: 41 },
    { name: 'Instagram (bio)',   pct: 18 },
    { name: 'TikTok',            pct: 16 },
    { name: 'Direct',            pct: 14 },
    { name: 'Google search',     pct: 6  },
  ]
  const COUNTRIES = [
    { c: 'United Kingdom', share: 78 },
    { c: 'Ireland',        share: 7  },
    { c: 'Australia',      share: 4  },
    { c: 'France',         share: 3  },
    { c: 'United States',  share: 3  },
    { c: 'Other',          share: 5  },
  ]

  return (
    <>
      <div className="stat-row">
        <Stat label="Revenue · last 30d" value={fmtGBP(revenue30)} delta="vs prev 30d" spark={revSeries} scribble="↗" />
        <Stat label="Units sold · 30d" value={units30} delta="last 30 days" spark={revSeries.map(v => v > 0 ? 1 : 0)} />
        <Stat label="Waitlist · combined" value={waitlistCount.toLocaleString('en-GB')} delta="total signed up" spark={wlSeries} />
        <Stat label="Visitors · live" value={liveCount} delta="● now on site" deltaType="flat" spark={visSeries} />
      </div>

      <div className="row-2">
        <LCard title="Revenue · 14 days" eyebrow="01 · the money line"
          action={<div className="small-mono">DAILY GBP</div>}>
          <MiniChart values={revSeries.length ? revSeries : [0]} height={180} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span className="small-mono">14 days ago</span>
            <span className="small-mono">today</span>
          </div>
        </LCard>

        <LCard title="Live pulse" eyebrow="02 · right now"
          action={
            <span>
              <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--sage,#7A8B6E)', borderRadius: '50%', marginRight: 6 }} />
              <span className="small-mono">streaming</span>
            </span>
          }>
          {pulse.length === 0 ? (
            <div className="small-mono" style={{ padding: '12px 0' }}>No events yet — tracker is live.</div>
          ) : (
            <ul className="pulse-list">
              {pulse.slice(0, 7).map((p, i) => (
                <li key={i}>
                  <span className="pulse-time">{timeAgo(p.ts)}</span>
                  <span>
                    <strong style={{ fontSize: 13 }}>
                      {p.kind === 'pageview' ? `opened ${p.path}` :
                       p.kind === 'click' ? `clicked "${p.target}"` :
                       p.kind === 'purchase' ? 'completed checkout' :
                       p.kind === 'waitlist_join' ? 'joined waitlist' :
                       p.kind}
                    </strong>
                    <div className="muted" style={{ fontSize: 11.5 }}>visitor · {p.country ?? '?'}</div>
                  </span>
                  <span className="pulse-loc">{p.country ?? ''}</span>
                </li>
              ))}
            </ul>
          )}
        </LCard>
      </div>

      <div className="row-2">
        <LCard title="Funnel · last 30 days" eyebrow="03 · where they drop">
          <Funnel rows={funnel} />
          <div className="divider" />
          <div className="small-mono">Checkout → Paid drop is often highest. Consider trust signals on the Stripe step.</div>
        </LCard>

        <LCard title="Top clicks · 30d" eyebrow="04 · what gets tapped">
          {clicks.length === 0 ? (
            <div className="small-mono" style={{ padding: '12px 0' }}>No click data yet.</div>
          ) : (
            clicks.slice(0, 6).map((h, i) => (
              <div key={i} className="heat-row">
                <span className="heat-rank">{String(i + 1).padStart(2, '0')}</span>
                <div className="heat-label-row">
                  <span className="heat-label">{h.label}</span>
                </div>
                <span className="heat-count">{h.clicks.toLocaleString('en-GB')}</span>
              </div>
            ))
          )}
        </LCard>
      </div>

      <div className="row-3" style={{ marginTop: 18 }}>
        <LCard title="Top referrers" eyebrow="05 · where they came from">
          {REFERRERS.map((r, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                <span>{r.name}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{r.pct}%</span>
              </div>
              <Bar pct={r.pct * 2.2} color={i === 0 ? 'accent' : 'ink'} />
            </div>
          ))}
        </LCard>

        <LCard title="Country split" eyebrow="06 · who's buying">
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Donut segments={COUNTRIES.map(c => ({ value: c.share }))} />
            <div style={{ fontSize: 12.5, lineHeight: 1.7, flex: 1 }}>
              {COUNTRIES.map((c, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{c.c}</span>
                  <span className="mono muted">{c.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </LCard>

        <LCard title="Quick actions" eyebrow="07 · do something">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="/dashboard/waitlist" className="ldg-btn ldg-btn-accent" style={{ justifyContent: 'space-between' }}>
              Email waitlist<span>→</span>
            </a>
            <a href="/dashboard/transactions" className="ldg-btn ldg-btn-ghost" style={{ justifyContent: 'space-between' }}>
              Export sales CSV<span>→</span>
            </a>
            <a href="/dashboard/access" className="ldg-btn ldg-btn-ghost" style={{ justifyContent: 'space-between' }}>
              Rotate founder password<span>→</span>
            </a>
          </div>
          <div className="margin-pad" style={{ marginTop: 14 }}>idea: launch bundle Friday — pre-warm Wed/Thu</div>
        </LCard>
      </div>
    </>
  )
}
