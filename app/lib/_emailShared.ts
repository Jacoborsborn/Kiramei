export const C = {
  paper:     '#FDFAF5',
  paperDeep: '#F5EFE3',
  paperEdge: '#E2D9C8',
  ink:       '#1F1B16',
  inkSoft:   '#5C5347',
  inkMuted:  '#9C8E7E',
  accent:    '#B8543A',
}

export const mono  = "'Courier New', Courier, monospace"
export const serif = "Georgia, 'Times New Roman', serif"

// Pass a signed unsubscribe URL to include the one-click opt-out link.
// Pass undefined for purely transactional emails (week-complete etc.) where
// marketing content is absent and no opt-out is legally required.
export function wrapper(subject: string, body: string, unsubscribeUrl?: string): string {
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
        ${unsubscribeUrl ? `<tr><td colspan="2" style="padding-top:10px;text-align:center;">
          <a href="${unsubscribeUrl}" style="font-family:${mono};font-size:9px;letter-spacing:0.12em;color:${C.inkMuted};text-transform:uppercase;text-decoration:underline;">Unsubscribe from these emails</a>
        </td></tr>` : ''}
      </table>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`
}

export function ctaBlock(sub: string, body: string, btnLabel: string, btnUrl: string) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${C.paperDeep};border:1px solid ${C.paperEdge};margin:24px 0;">
    <tr><td style="padding:28px 24px;text-align:center;">
      <p style="margin:0 0 10px;font-family:${mono};font-size:11px;letter-spacing:0.18em;color:${C.accent};text-transform:uppercase;">${sub}</p>
      <p style="margin:0 0 8px;font-family:${serif};font-size:22px;font-weight:500;color:${C.ink};">${body}</p>
      <a href="${btnUrl}" style="display:inline-block;background:${C.ink};color:${C.paper};padding:14px 28px;font-family:${mono};font-size:12px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;">${btnLabel}</a>
    </td></tr>
  </table>`
}

export function accessRow(icon: string, title: string, sub: string, url: string) {
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

export function receipt(lines: [string, string][], discount?: [string, string], total?: [string, string]) {
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
