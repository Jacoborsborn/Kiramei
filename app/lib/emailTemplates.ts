import { C, mono, serif, wrapper, ctaBlock, accessRow, receipt } from './_emailShared'

export function buildActivationEmail(firstName: string, activationUrl: string): string {
  const name = firstName || 'there'
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Client Portal</p>
    <p style="margin:0 0 10px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">Payment confirmed, <em style="font-style:italic;color:${C.accent};">${name}.</em></p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.inkSoft};">Your programme is being built. You'll receive it within 4 days. First, set up your client portal — this is where you'll view your programme, manage your subscription, and track your progress.</p>

    ${ctaBlock('Ready when you are', 'Activate your account.', 'Set up portal access &rarr;', activationUrl)}

    <p style="font-size:14px;line-height:1.7;color:${C.inkSoft};margin:0 0 8px;">This link expires in 72 hours. Any questions? Just reply to this email.</p>
  `
  return wrapper('Your Kira Mei account is ready.', body)
}

export function buildTrainingEmail(firstName: string, loginUrl: string): string {
  const name = firstName || 'there'
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Training Blueprint</p>
    <p style="margin:0 0 10px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">You&rsquo;re <em style="font-style:italic;color:${C.accent};">in</em>, ${name}.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.inkSoft};">Thank you for buying the Training Blueprint. Your programme is inside your Kira Mei account — sign in any time and pick up where you left off. Week 01 is unlocked and waiting.</p>

    ${ctaBlock('Ready when you are', 'Open your blueprint.', 'Start Week 01 &rarr;', loginUrl)}

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.paperEdge};margin:24px 0;">
      ${accessRow('📋', 'Training Blueprint', '8 weeks · Week 01 unlocked', loginUrl)}
    </table>

    <p style="font-size:14px;line-height:1.7;color:${C.inkSoft};margin:0 0 8px;"><strong>A small ask:</strong> read Week 01 in full before your first session. The reading <em>is</em> the programme — the workouts just put it into practice.</p>

    ${receipt([['Training Blueprint', '£49.99']], undefined, ['Paid today', '£49.99'])}

    <p style="font-size:13.5px;line-height:1.7;color:${C.inkSoft};margin:0;">Any questions? Just reply to this email.</p>
  `
  return wrapper('Your Training Blueprint is unlocked.', body)
}

export function buildNutritionEmail(firstName: string, loginUrl: string): string {
  const name = firstName || 'there'
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Nutrition Blueprint</p>
    <p style="margin:0 0 10px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">You&rsquo;re <em style="font-style:italic;color:${C.accent};">in</em>, ${name}.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.inkSoft};">Thank you for buying the Nutrition Blueprint. Your programme is inside your Kira Mei account — sign in any time. Week 01 is unlocked and ready to read.</p>

    ${ctaBlock('Ready when you are', 'Open your blueprint.', 'Start Week 01 &rarr;', loginUrl)}

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.paperEdge};margin:24px 0;">
      ${accessRow('🥗', 'Nutrition Blueprint', '8 weeks · Week 01 unlocked', loginUrl)}
    </table>

    <p style="font-size:14px;line-height:1.7;color:${C.inkSoft};margin:0 0 8px;">8 weeks of nutrition education. Start with Week 01 — Calories &amp; TDEE — and read it in full before tracking anything.</p>

    ${receipt([['Nutrition Blueprint', '£49.99']], undefined, ['Paid today', '£49.99'])}

    <p style="font-size:13.5px;line-height:1.7;color:${C.inkSoft};margin:0;">Any questions? Just reply to this email.</p>
  `
  return wrapper('Your Nutrition Blueprint is unlocked.', body)
}

export function buildBundleEmail(firstName: string, loginUrl: string): string {
  const name = firstName || 'there'
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Full Stack Bundle</p>
    <p style="margin:0 0 10px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">You&rsquo;re <em style="font-style:italic;color:${C.accent};">in</em>, ${name}.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.inkSoft};">Thank you for buying the Full Stack Bundle. Both blueprints live inside your Kira Mei account — sign in any time and pick up where you left off. Week 01 of each is unlocked and waiting.</p>

    ${ctaBlock('Ready when you are', 'Open your blueprints.', 'Start Week 01 &rarr;', loginUrl)}

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.paperEdge};margin:24px 0;">
      ${accessRow('📋', 'Training Blueprint', '8 weeks · Week 01 unlocked', loginUrl)}
      ${accessRow('🥗', 'Nutrition Blueprint', '8 weeks · Week 01 unlocked', loginUrl)}
    </table>

    <p style="font-size:14px;line-height:1.7;color:${C.inkSoft};margin:0 0 8px;"><strong>A small ask:</strong> read Week 01 of Training in full before your first session. The reading <em>is</em> the programme — the workouts just put it into practice.</p>

    ${receipt(
      [['Training Blueprint', '£49.99'], ['Nutrition Blueprint', '£49.99']],
      ['Bundle discount', '— £20.00'],
      ['Paid today', '£78.99'],
    )}

    <p style="font-size:13.5px;line-height:1.7;color:${C.inkSoft};margin:0;">Any questions? Just reply to this email.</p>
  `
  return wrapper('Your Full Stack Bundle is unlocked.', body)
}
