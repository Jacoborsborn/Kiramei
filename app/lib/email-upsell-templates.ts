// Lifecycle & upsell email templates.
// Emails 04/05/06 (bundle upsell) and 02/03 (waitlist/browse) are stubbed
// at the bottom — ready to activate when those products launch.
import { wrapper, C, mono, serif } from './_emailShared'

const SITE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://kiramei.co.uk'

// ─── 01 · Cart abandoned (fires via checkout.session.expired webhook) ─────────

export function buildCartAbandonedEmail(
  firstName: string,
  productName: string,
  productPageUrl: string,
  unsubscribeUrl?: string,
): string {
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">A note</p>
    <h1 style="margin:0 0 14px;font-family:${serif};font-size:30px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">A thought about your <em style="font-style:italic;color:${C.accent};">${productName}</em>.</h1>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:${C.inkSoft};">${firstName}, saw you came close to grabbing the ${productName} earlier. No pressure — most people who buy this hover for a day first. That's normal.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.75;color:${C.inkSoft};">If something specific is stopping you — price, timing, whether it's right for you — just hit reply and tell me. I read every one. Otherwise the page is here when you're ready.</p>
    <a href="${productPageUrl}" style="display:inline-block;background:${C.ink};color:#FDFAF5;padding:14px 28px;font-family:${mono};font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;">Back to checkout &rarr;</a>
  `
  return wrapper('A thought about your blueprint.', body, unsubscribeUrl)
}

// ─── 07 · Week N complete (weeks 1–3, 5–7) — encouragement, no upsell ────────

export function buildWeekCompleteEmail(
  firstName: string,
  weekNum: number,
  nextUrl: string,
): string {
  const hooks: Record<number, string> = {
    1: "Week one is the hardest because you had to start. You did. Most people don't.",
    2: "Week two is where most people quit — the novelty wore off and the soreness hadn't. You stayed. That's the entire battle.",
    3: 'Three weeks in. The pattern is yours now. Week 4 is where it stops feeling like learning and starts feeling like doing.',
    5: "Week 5 means you've crossed into the part of the programme that most courses never get to. Keep going.",
    6: 'Two weeks left. Stay heavy. Stay boring. The compounding is happening underneath.',
    7: "Deload week. Don't skip it. The recovery is where the gains arrive.",
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  const nextWeekNum = weekNum + 1

  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Training · Week ${pad(weekNum)}</p>
    <h1 style="margin:0 0 14px;font-family:${serif};font-size:30px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">Week ${pad(weekNum)} <em style="font-style:italic;color:${C.accent};">done</em>.</h1>
    <p style="margin:0 0 28px;font-size:16px;line-height:1.75;color:${C.inkSoft};">${hooks[weekNum] ?? ''}</p>
    <a href="${nextUrl}" style="display:inline-block;background:${C.ink};color:#FDFAF5;padding:14px 28px;font-family:${mono};font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;">Open Week ${pad(nextWeekNum)} &rarr;</a>
  `
  return wrapper(`Week ${pad(weekNum)} done.`, body)
}

// ─── 08 · Week N inactive 4 days ─────────────────────────────────────────────

export function buildWeekInactiveEmail(
  firstName: string,
  weekNum: number,
  resumeUrl: string,
): string {
  const pad = (n: number) => String(n).padStart(2, '0')

  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">A nudge</p>
    <h1 style="margin:0 0 14px;font-family:${serif};font-size:30px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">Still <em style="font-style:italic;color:${C.accent};">there</em>?</h1>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:${C.inkSoft};">${firstName}, noticed you haven't been in for a few days. Could be anything — life, busy, lost momentum. I won't lecture.</p>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:${C.inkSoft};">If something specific got in the way, hit reply and tell me. If you've just gone quiet, this is your nudge.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.75;color:${C.inkSoft};"><strong>15 minutes of reading is enough to get back in.</strong> The page remembers where you left off.</p>
    <a href="${resumeUrl}" style="display:inline-block;background:${C.ink};color:#FDFAF5;padding:14px 28px;font-family:${mono};font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;">Pick up Week ${pad(weekNum)} &rarr;</a>
  `
  return wrapper('Still there?', body)
}

// ─── 09 · Week 4 halfway milestone ───────────────────────────────────────────
// Bundle upsell card omitted — nutrition product not yet live.

export function buildWeek4MilestoneEmail(
  firstName: string,
  nextUrl: string,
): string {
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Training · Halfway</p>
    <h1 style="margin:0 0 14px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">You're <em style="font-style:italic;color:${C.accent};">halfway</em>.</h1>
    <p style="margin:0 0 18px;font-size:16px;line-height:1.75;color:${C.inkSoft};">${firstName} — four weeks in. Most people who start something like this don't get here. You did.</p>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.75;color:${C.inkSoft};">Quick note about what comes next. The volume goes up. The complexity does too. That's the whole point — you've earned harder work. Show up.</p>
    <a href="${nextUrl}" style="display:inline-block;background:${C.ink};color:#FDFAF5;padding:14px 28px;font-family:${mono};font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;">Open Week 05 &rarr;</a>
  `
  return wrapper("You're halfway.", body)
}

// ─── 10 · Week 8 graduation ───────────────────────────────────────────────────

export function buildGraduationEmail(
  firstName: string,
  options: {
    rerunUrl: string
    advancedPlanUrl: string  // currently 404s — future product
    referUrl: string
    referralCode: string
    unsubscribeUrl?: string
  },
): string {
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Eight weeks · Done</p>
    <h1 style="margin:0 0 14px;font-family:${serif};font-size:34px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">You <em style="font-style:italic;color:${C.accent};">finished</em> it.</h1>
    <p style="margin:0 0 18px;font-size:16px;line-height:1.75;color:${C.inkSoft};">${firstName} — eight weeks. You're not the same person who started this. The lifts are heavier. The system is yours.</p>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.75;color:${C.inkSoft};">Quick note about what comes next. You've got three options. Pick one.</p>

    <div style="border:1px solid ${C.paperEdge};padding:18px 22px;margin:0 0 14px;">
      <p style="margin:0 0 4px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Option 01 · Free</p>
      <h3 style="margin:0 0 6px;font-family:${serif};font-size:18px;font-weight:500;color:${C.ink};">Run it again.</h3>
      <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${C.inkSoft};">Same programme, heavier weights. The compounding only kicks in past round one.</p>
      <a href="${options.rerunUrl}" style="font-family:${mono};font-size:11px;letter-spacing:0.16em;color:${C.accent};text-transform:uppercase;text-decoration:none;border-bottom:1px solid ${C.accent};padding-bottom:2px;">Reset Week 01 &rarr;</a>
    </div>

    <div style="border:1px solid ${C.paperEdge};padding:18px 22px;margin:0 0 14px;">
      <p style="margin:0 0 4px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Option 02 · £29</p>
      <h3 style="margin:0 0 6px;font-family:${serif};font-size:18px;font-weight:500;color:${C.ink};">Advanced phase plan.</h3>
      <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${C.inkSoft};">A one-page blueprint for your next 12 weeks. Cut, build, or maintain — pick a direction, get the protocol.</p>
      <a href="${options.advancedPlanUrl}" style="font-family:${mono};font-size:11px;letter-spacing:0.16em;color:${C.accent};text-transform:uppercase;text-decoration:none;border-bottom:1px solid ${C.accent};padding-bottom:2px;">See the plan &rarr;</a>
    </div>

    <div style="border:1px solid ${C.paperEdge};padding:18px 22px;margin:0 0 28px;">
      <p style="margin:0 0 4px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Option 03 · £10 each</p>
      <h3 style="margin:0 0 6px;font-family:${serif};font-size:18px;font-weight:500;color:${C.ink};">Send a friend in.</h3>
      <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:${C.inkSoft};">£10 off for them, £10 credit for you when they buy. Your code: <strong style="font-family:${mono};color:${C.accent};">${options.referralCode}</strong></p>
      <a href="${options.referUrl}" style="font-family:${mono};font-size:11px;letter-spacing:0.16em;color:${C.accent};text-transform:uppercase;text-decoration:none;border-bottom:1px solid ${C.accent};padding-bottom:2px;">Share your link &rarr;</a>
    </div>

    <p style="margin:0 0 8px;font-size:15px;line-height:1.75;color:${C.inkSoft};">One last thing. You worked harder than you think you did. I'm proud of you.</p>
  `
  return wrapper('You finished it.', body, options.unsubscribeUrl)
}

// ─── 11 · 30 days post-completion ─────────────────────────────────────────────

export function buildPostCompletionCheckinEmail(
  firstName: string,
  referralCode: string,
  referUrl: string,
  unsubscribeUrl?: string,
): string {
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Check-in</p>
    <h1 style="margin:0 0 14px;font-family:${serif};font-size:30px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">Still <em style="font-style:italic;color:${C.accent};">running</em> it?</h1>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:${C.inkSoft};">${firstName} — month since you finished. Genuinely curious how it's going.</p>
    <p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:${C.inkSoft};"><strong>Reply with one line.</strong> If you've kept it up, tell me what changed. If you've fallen off, tell me why. I'll write back.</p>
    <p style="margin:0 0 0;font-size:14px;line-height:1.75;color:${C.inkSoft};">Also: your referral credit is still live. Code <strong style="font-family:${mono};color:${C.accent};">${referralCode}</strong> — £10 off for a friend, £10 to you. <a href="${referUrl}" style="color:${C.accent};text-decoration:underline;">Share link.</a></p>
  `
  return wrapper('Still running it?', body, unsubscribeUrl)
}

// ─── COMING SOON — activate when nutrition & bundle launch ────────────────────
// buildWaitlistWelcomeEmail   (02 · immediate on waitlist signup)
// buildBrowsedNoBuyEmail      (03 · T+24h, requires email capture on product pages)
// buildBundleFollowupEmail    (04/05 · receipt + bundle upsell)
// buildBundleT3Email          (06 · T+3 last bundle nudge)
// buildWeek4MilestoneWithUpsell (09 · halfway + bundle card for single-buyers)
