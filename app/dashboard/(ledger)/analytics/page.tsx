import {
  topClicks, funnelData, topPages, topReferrers,
  liveVisitors, visitorSeries, recentPulse
} from '@/lib/analytics'
import { LCard, Stat, Funnel, MiniChart, Bar } from '../LedgerComponents'

export const revalidate = 10

export default async function AnalyticsPage() {
  const [live, visSeries, funnel, clicks, pages, referrers, pulse] = await Promise.all([
    liveVisitors(),
    visitorSeries(14),
    funnelData(30),
    topClicks(30),
    topPages(30),
    topReferrers(30),
    recentPulse(20),
  ])

  const totalVisitors30 = visSeries.reduce((a, v) => a + v, 0)

  function timeAgo(ts: string) {
    const sec = Math.floor((Date.now() - new Date(ts).getTime()) / 1000)
    if (sec < 60) return `${sec}s ago`
    if (sec < 3600) return `${Math.floor(sec / 60)}m ago`
    return `${Math.floor(sec / 3600)}h ago`
  }

  return (
    <>
      <div className="stat-row">
        <Stat label="Visitors · 30d" value={totalVisitors30.toLocaleString('en-GB')} spark={visSeries} />
        <Stat label="Visitors · live" value={live} delta="● now on site" deltaType="flat" />
        <Stat label="Top click" value={clicks[0]?.label ?? '—'} />
        <Stat label="Top page" value={pages[0]?.path ?? '—'} />
      </div>

      <div className="row-2">
        <LCard title="Visitors · 14 days" eyebrow="16 · the audience">
          <MiniChart values={visSeries.length ? visSeries : [0]} height={180} />
        </LCard>

        <LCard title="Conversion funnel" eyebrow="17 · the gauntlet">
          <Funnel rows={funnel} />
        </LCard>
      </div>

      <div className="row-2" style={{ marginTop: 18 }}>
        <LCard title="Top clicked elements" eyebrow="18 · the heat map"
          action={<div className="small-mono">30D</div>}>
          {clicks.length === 0 ? (
            <div className="small-mono" style={{ padding: '12px 0' }}>No click events yet.</div>
          ) : clicks.map((h, i) => (
            <div key={i} className="heat-row">
              <span className="heat-rank">{String(i + 1).padStart(2, '0')}</span>
              <div className="heat-label-row">
                <span className="heat-label">{h.label}</span>
              </div>
              <span className="heat-count">{h.clicks.toLocaleString('en-GB')}</span>
            </div>
          ))}
        </LCard>

        <LCard title="Top pages" eyebrow="19 · where they linger">
          {pages.length === 0 ? (
            <div className="small-mono" style={{ padding: '12px 0' }}>No pageview data yet.</div>
          ) : (
            <table className="ltable">
              <thead>
                <tr>
                  <th>Path</th>
                  <th className="num">Views</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p, i) => (
                  <tr key={i}>
                    <td className="mono">{p.path}</td>
                    <td className="num">{p.views.toLocaleString('en-GB')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </LCard>
      </div>

      <div className="row-2" style={{ marginTop: 18 }}>
        <LCard title="Referrers" eyebrow="20 · how they find you">
          {referrers.length === 0 ? (
            <div className="small-mono" style={{ padding: '12px 0' }}>No referrer data yet.</div>
          ) : referrers.map((r, i) => {
            const total = referrers.reduce((a, x) => a + x.visits, 0)
            const pct = total ? Math.round((r.visits / total) * 100) : 0
            return (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                  <span>{r.name}</span>
                  <span className="mono muted">{r.visits.toLocaleString('en-GB')} · {pct}%</span>
                </div>
                <Bar pct={pct * 2.2} color={i === 0 ? 'accent' : 'ink'} />
              </div>
            )
          })}
        </LCard>

        <LCard title="Live activity feed" eyebrow="23 · everything happening, right now"
          action={
            <span>
              <span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--sage,#7A8B6E)', borderRadius: '50%', marginRight: 6 }} />
              <span className="small-mono">live</span>
            </span>
          }>
          {pulse.length === 0 ? (
            <div className="small-mono" style={{ padding: '12px 0' }}>No events yet.</div>
          ) : (
            <ul className="pulse-list" style={{ maxHeight: 280, overflowY: 'auto' }}>
              {pulse.map((p, i) => (
                <li key={i}>
                  <span className="pulse-time">{timeAgo(p.ts)}</span>
                  <span>
                    <strong style={{ fontSize: 13 }}>
                      {p.kind === 'pageview' ? `opened ${p.path ?? '/'}` :
                       p.kind === 'click' ? `clicked "${p.target}"` :
                       p.kind}
                    </strong>
                    <div className="muted" style={{ fontSize: 11.5 }}>
                      {p.country ?? 'visitor'}
                    </div>
                  </span>
                  <span className="pulse-loc">{p.country ?? ''}</span>
                </li>
              ))}
            </ul>
          )}
        </LCard>
      </div>
    </>
  )
}
