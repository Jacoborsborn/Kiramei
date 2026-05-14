// Colour palette (CSS vars resolved to hex for email clients)
const C = {
  paper:      '#FDFAF5',
  paperDeep:  '#F5EFE3',
  paperEdge:  '#E2D9C8',
  ink:        '#1F1B16',
  inkSoft:    '#5C5347',
  inkMuted:   '#9C8E7E',
  accent:     '#B8543A',
}

const mono  = "'Courier New', Courier, monospace"
const serif = "Georgia, 'Times New Roman', serif"

function wrapper(subject: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:${C.paperDeep};font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${C.paperDeep};padding:48px 0;">
<tr><td align="center" style="padding:0 16px;">

  <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:${C.paper};border:1px solid ${C.paperEdge};border-radius:6px;overflow:hidden;box-shadow:0 1px 0 rgba(31,27,22,0.04),0 24px 48px -20px rgba(31,27,22,0.25);">

    <!-- EMAIL HEADER -->
    <tr><td style="padding:16px 24px;border-bottom:1px solid ${C.paperEdge};background:${C.paperDeep};">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width:40px;">
            <div style="width:36px;height:36px;border:1.5px solid ${C.ink};border-radius:50%;text-align:center;line-height:34px;font-family:${serif};font-weight:600;font-size:15px;">&nbsp;K&nbsp;</div>
          </td>
          <td style="padding-left:12px;">
            <p style="margin:0;font-size:13px;font-weight:500;color:${C.ink};">Kira Mei <span style="color:${C.inkMuted};font-weight:400;">&lt;hello@kiramei.co.uk&gt;</span></p>
            <p style="margin:2px 0 0;font-family:${mono};font-size:11px;color:${C.inkMuted};letter-spacing:0.06em;">to you</p>
          </td>
          <td align="right">
            <p style="margin:0;font-family:${mono};font-size:11px;color:${C.inkMuted};letter-spacing:0.1em;">JUST NOW</p>
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- SUBJECT -->
    <tr><td style="padding:18px 24px 14px;border-bottom:1px solid ${C.paperEdge};">
      <p style="margin:0 0 4px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Subject</p>
      <p style="margin:0;font-family:${serif};font-size:22px;font-weight:500;letter-spacing:-0.01em;color:${C.ink};">${subject}</p>
    </td></tr>

    <!-- BODY -->
    <tr><td style="padding:40px 36px 36px;">

      <!-- logo -->
      <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        <tr>
          <td style="width:30px;">
            <div style="width:28px;height:28px;border:1.5px solid ${C.ink};border-radius:50%;text-align:center;line-height:26px;font-family:${serif};font-weight:600;font-size:14px;">&nbsp;K&nbsp;</div>
          </td>
          <td style="padding-left:10px;font-family:${serif};font-size:18px;font-weight:600;color:${C.ink};">Kira Mei</td>
        </tr>
      </table>

      ${body}

      <p style="margin:28px 0 0;font-family:cursive,${serif};font-size:28px;color:${C.accent};">— Kira</p>
    </td></tr>

    <!-- FOOTER -->
    <tr><td style="padding:18px 36px;border-top:1px solid ${C.paperEdge};background:${C.paperDeep};">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td><p style="margin:0;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">© KIRA MEI · MMXXVI</p></td>
          <td align="right"><p style="margin:0;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">KIRAMEI.CO.UK</p></td>
        </tr>
      </table>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`
}

function ctaBlock(sub: string, body: string, btnLabel: string, btnUrl: string) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${C.paperDeep};border:1px solid ${C.paperEdge};margin:24px 0;">
    <tr><td style="padding:28px 24px;text-align:center;">
      <p style="margin:0 0 10px;font-family:${mono};font-size:11px;letter-spacing:0.18em;color:${C.accent};text-transform:uppercase;">${sub}</p>
      <p style="margin:0 0 8px;font-family:${serif};font-size:22px;font-weight:500;color:${C.ink};">${body}</p>
      <a href="${btnUrl}" style="display:inline-block;background:${C.ink};color:${C.paper};padding:14px 28px;font-family:${mono};font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;">${btnLabel}</a>
    </td></tr>
  </table>`
}

function accessRow(icon: string, title: string, sub: string, url: string) {
  return `
  <tr><td style="padding:16px 22px;border-top:1px solid ${C.paperEdge};">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:40px;">
          <div style="width:36px;height:36px;border:1.5px solid ${C.ink};border-radius:50%;text-align:center;line-height:34px;font-size:16px;background:${C.paper};">${icon}</div>
        </td>
        <td style="padding-left:14px;">
          <p style="margin:0;font-family:${serif};font-size:15px;font-weight:500;color:${C.ink};">${title}</p>
          <p style="margin:2px 0 0;font-family:${mono};font-size:10px;letter-spacing:0.1em;color:${C.inkMuted};text-transform:uppercase;">${sub}</p>
        </td>
        <td align="right">
          <a href="${url}" style="font-family:${mono};font-size:11px;letter-spacing:0.16em;color:${C.accent};text-transform:uppercase;padding:6px 10px;border:1.5px solid ${C.accent};border-radius:2px;text-decoration:none;white-space:nowrap;">Open</a>
        </td>
      </tr>
    </table>
  </td></tr>`
}

function receipt(lines: [string, string][], discount?: [string, string], total?: [string, string]) {
  const rows = lines.map(([l, a]) =>
    `<tr><td style="padding:5px 0;font-size:13px;color:${C.ink};">${l}</td><td align="right" style="font-family:${mono};font-size:13px;color:${C.ink};">${a}</td></tr>`
  ).join('')

  const discRow = discount ? `<tr><td style="padding:5px 0;font-size:13px;color:${C.ink};">${discount[0]}</td><td align="right" style="font-family:${mono};font-size:13px;color:${C.accent};">${discount[1]}</td></tr>` : ''

  const totRow = total ? `
  <tr><td colspan="2" style="border-top:1px solid ${C.paperEdge};padding-top:10px;"></td></tr>
  <tr><td style="font-family:${serif};font-size:16px;font-weight:500;color:${C.ink};">${total[0]}</td><td align="right" style="font-family:${serif};font-size:16px;font-weight:500;color:${C.ink};">${total[1]}</td></tr>` : ''

  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px dashed ${C.paperEdge};padding:18px 22px;margin:24px 0;">
    <tr><td colspan="2"><p style="margin:0 0 10px;font-family:${mono};font-size:10px;letter-spacing:0.18em;color:${C.inkMuted};text-transform:uppercase;">Receipt</p></td></tr>
    ${rows}${discRow}${totRow}
  </table>`
}

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
