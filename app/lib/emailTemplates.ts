// Email templates using the light paper/cream design from site/email.html

const BASE = `
  background:#F5EFE3;
  font-family:Arial,Helvetica,sans-serif;
  margin:0;padding:0;
`

function wrapper(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="${BASE}">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE3;padding:48px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FDFAF5;border:1px solid #E2D9C8;border-radius:4px;overflow:hidden;box-shadow:0 1px 0 rgba(31,27,22,0.04),0 24px 48px -20px rgba(31,27,22,0.18);">

      <!-- email header row -->
      <tr><td style="padding:14px 24px;border-bottom:1px solid #E2D9C8;background:#F5EFE3;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:40px;">
              <div style="width:36px;height:36px;border:1.5px solid #1F1B16;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-weight:600;font-size:15px;transform:rotate(-3deg);text-align:center;line-height:36px;">K</div>
            </td>
            <td style="padding-left:12px;">
              <p style="margin:0;font-size:13px;font-weight:500;color:#1F1B16;">Kira Mei <span style="color:#9C8E7E;font-weight:400;">&lt;hello@kiramei.co.uk&gt;</span></p>
            </td>
            <td align="right">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;color:#9C8E7E;">JUST NOW</p>
            </td>
          </tr>
        </table>
      </td></tr>

      <!-- body -->
      <tr><td style="padding:36px 36px 28px;position:relative;">
        ${content}
        <p style="margin:28px 0 0;font-family:'Dancing Script',cursive,Georgia,serif;font-size:28px;color:#B8543A;">— Kira</p>
      </td></tr>

      <!-- footer bar -->
      <tr><td style="padding:18px 36px;border-top:1px solid #E2D9C8;background:#F5EFE3;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td><p style="margin:0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.16em;color:#9C8E7E;text-transform:uppercase;">© KIRA MEI · MMXXVI</p></td>
            <td align="right"><p style="margin:0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.16em;color:#9C8E7E;text-transform:uppercase;">KIRAMEI.CO.UK</p></td>
          </tr>
        </table>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

function accessRow(icon: string, title: string, sub: string, loginUrl: string) {
  return `
  <tr><td style="padding:14px 0;border-top:1px solid #E2D9C8;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:40px;">
          <div style="width:36px;height:36px;border:1.5px solid #1F1B16;border-radius:50%;text-align:center;line-height:34px;font-size:16px;">${icon}</div>
        </td>
        <td style="padding-left:14px;">
          <p style="margin:0;font-family:Georgia,serif;font-size:15px;font-weight:500;color:#1F1B16;">${title}</p>
          <p style="margin:2px 0 0;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.1em;color:#9C8E7E;">${sub}</p>
        </td>
        <td align="right">
          <a href="${loginUrl}" style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.16em;color:#B8543A;text-transform:uppercase;padding:6px 10px;border:1.5px solid #B8543A;border-radius:2px;text-decoration:none;white-space:nowrap;">Open</a>
        </td>
      </tr>
    </table>
  </td></tr>`
}

function receiptRows(lines: [string, string][], discount?: [string, string], total?: string) {
  const rows = lines.map(([label, amt]) => `
  <tr>
    <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#1F1B16;">${label}</td>
    <td align="right" style="font-family:'Courier New',monospace;font-size:13px;color:#1F1B16;">${amt}</td>
  </tr>`).join('')

  const discountRow = discount ? `
  <tr>
    <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#1F1B16;">${discount[0]}</td>
    <td align="right" style="font-family:'Courier New',monospace;font-size:13px;color:#B8543A;">${discount[1]}</td>
  </tr>` : ''

  const totalRow = total ? `
  <tr>
    <td colspan="2" style="border-top:1px solid #E2D9C8;padding-top:10px;"></td>
  </tr>
  <tr>
    <td style="font-family:Georgia,serif;font-size:16px;font-weight:500;color:#1F1B16;">Paid today</td>
    <td align="right" style="font-family:Georgia,serif;font-size:16px;font-weight:500;color:#1F1B16;">${total}</td>
  </tr>` : ''

  return `
  <div style="border:1px dashed #E2D9C8;padding:18px 22px;margin:20px 0;">
    <p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.18em;color:#9C8E7E;text-transform:uppercase;">Receipt</p>
    <table width="100%" cellpadding="0" cellspacing="0">
      ${rows}${discountRow}${totalRow}
    </table>
  </div>`
}

export function buildTrainingEmail(firstName: string, loginUrl: string): string {
  const content = `
    <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.16em;color:#9C8E7E;text-transform:uppercase;">Training Blueprint</p>
    <h1 style="margin:0 0 10px;font-family:Georgia,serif;font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:#1F1B16;">You&rsquo;re <em style="font-style:italic;color:#B8543A;">in</em>, ${firstName}.</h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#5C5347;">Thank you for buying the Training Blueprint. Your programme lives inside your Kira Mei account — sign in any time and pick up where you left off. Week 01 is unlocked and waiting.</p>

    <div style="background:#F5EFE3;border:1px solid #E2D9C8;padding:24px;margin:20px 0;text-align:center;">
      <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;color:#B8543A;text-transform:uppercase;">Ready when you are</p>
      <h3 style="margin:0 0 8px;font-family:Georgia,serif;font-size:20px;font-weight:500;color:#1F1B16;">Open your blueprint.</h3>
      <p style="margin:0 0 16px;font-size:13.5px;color:#5C5347;line-height:1.6;">Read Week 01 in full before your first session — it takes about 15 minutes.</p>
      <a href="${loginUrl}" style="display:inline-block;background:#1F1B16;color:#FDFAF5;padding:14px 28px;font-family:'Courier New',monospace;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;">Start Week 01 &rarr;</a>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2D9C8;margin:20px 0;">
      ${accessRow('📋', 'Training Blueprint', '8 weeks · Week 01 unlocked', loginUrl)}
    </table>

    <p style="font-size:14px;line-height:1.7;color:#5C5347;margin:0 0 8px;"><strong>A small ask:</strong> read Week 01 in full before your first session. The reading <em>is</em> the programme — the workouts just put it into practice.</p>

    ${receiptRows([['Training Blueprint', '£49.99']], undefined, '£49.99')}
  `
  return wrapper(content)
}

export function buildNutritionEmail(firstName: string, loginUrl: string): string {
  const content = `
    <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.16em;color:#9C8E7E;text-transform:uppercase;">Nutrition Blueprint</p>
    <h1 style="margin:0 0 10px;font-family:Georgia,serif;font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:#1F1B16;">You&rsquo;re <em style="font-style:italic;color:#B8543A;">in</em>, ${firstName}.</h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#5C5347;">Thank you for buying the Nutrition Blueprint. Your programme lives inside your Kira Mei account — sign in any time. Week 01 is unlocked and ready to read.</p>

    <div style="background:#F5EFE3;border:1px solid #E2D9C8;padding:24px;margin:20px 0;text-align:center;">
      <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;color:#B8543A;text-transform:uppercase;">Ready when you are</p>
      <h3 style="margin:0 0 8px;font-family:Georgia,serif;font-size:20px;font-weight:500;color:#1F1B16;">Open your blueprint.</h3>
      <p style="margin:0 0 16px;font-size:13.5px;color:#5C5347;line-height:1.6;">8 weeks of nutrition education. Start with Week 01 — Calories &amp; TDEE.</p>
      <a href="${loginUrl}" style="display:inline-block;background:#1F1B16;color:#FDFAF5;padding:14px 28px;font-family:'Courier New',monospace;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;">Start Week 01 &rarr;</a>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2D9C8;margin:20px 0;">
      ${accessRow('🥗', 'Nutrition Blueprint', '8 weeks · Week 01 unlocked', loginUrl)}
    </table>

    <p style="font-size:14px;line-height:1.7;color:#5C5347;margin:0 0 8px;">Any questions? Just reply to this email.</p>

    ${receiptRows([['Nutrition Blueprint', '£49.99']], undefined, '£49.99')}
  `
  return wrapper(content)
}

export function buildBundleEmail(firstName: string, loginUrl: string): string {
  const content = `
    <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:10px;letter-spacing:0.16em;color:#9C8E7E;text-transform:uppercase;">Full Stack Bundle</p>
    <h1 style="margin:0 0 10px;font-family:Georgia,serif;font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:#1F1B16;">You&rsquo;re <em style="font-style:italic;color:#B8543A;">in</em>, ${firstName}.</h1>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#5C5347;">Thank you for buying the Full Stack Bundle. Both blueprints live inside your Kira Mei account — sign in any time and pick up where you left off. Week 01 of each is unlocked and waiting.</p>

    <div style="background:#F5EFE3;border:1px solid #E2D9C8;padding:24px;margin:20px 0;text-align:center;">
      <p style="margin:0 0 6px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.18em;color:#B8543A;text-transform:uppercase;">Ready when you are</p>
      <h3 style="margin:0 0 8px;font-family:Georgia,serif;font-size:20px;font-weight:500;color:#1F1B16;">Open your blueprints.</h3>
      <p style="margin:0 0 16px;font-size:13.5px;color:#5C5347;line-height:1.6;">Both programmes are inside. Start with Training Week 01 — read it in full before your first session.</p>
      <a href="${loginUrl}" style="display:inline-block;background:#1F1B16;color:#FDFAF5;padding:14px 28px;font-family:'Courier New',monospace;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;">Start Week 01 &rarr;</a>
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2D9C8;margin:20px 0;">
      ${accessRow('📋', 'Training Blueprint', '8 weeks · Week 01 unlocked', loginUrl)}
      ${accessRow('🥗', 'Nutrition Blueprint', '8 weeks · Week 01 unlocked', loginUrl)}
    </table>

    <p style="font-size:14px;line-height:1.7;color:#5C5347;margin:0 0 8px;"><strong>A small ask:</strong> read Week 01 of Training in full before your first session. The reading <em>is</em> the programme — the workouts just put it into practice.</p>

    ${receiptRows(
      [['Training Blueprint', '£49.00'], ['Nutrition Blueprint', '£49.99']],
      ['Bundle discount', '— £20.00'],
      '£78.99',
    )}
  `
  return wrapper(content)
}
