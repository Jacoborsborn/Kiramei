import { C, mono, serif, wrapper, ctaBlock, accessRow, receipt } from './_emailShared'

export function buildAccountActivationEmail(firstName: string, activateUrl: string, otp: string): string {
  const name = firstName || 'there'
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Account Activation</p>
    <p style="margin:0 0 10px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">You&rsquo;re <em style="font-style:italic;color:${C.accent};">in</em>, ${name}.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.inkSoft};">Your blueprint is waiting. Tap the button or enter the 8-digit code below.</p>

    ${ctaBlock('Ready when you are', 'Activate your account.', 'Activate account &rarr;', activateUrl)}

    <p style="margin:0 0 10px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Your activation code</p>
    <p style="margin:0 0 24px;font-family:${mono};font-size:40px;font-weight:500;letter-spacing:0.3em;color:${C.ink};text-align:center;padding:20px;background:${C.paperDeep};border:1px solid ${C.paperEdge};">${otp}</p>

    <p style="font-size:13.5px;line-height:1.7;color:${C.inkSoft};margin:0;">This link expires in 7 days. Any questions? Just reply to this email.</p>
  `
  return wrapper("You're in. Here's your code.", body)
}

export function buildAccessGrantedEmail(firstName: string, productName: string, portalUrl: string): string {
  const name = firstName || 'there'
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Access Granted</p>
    <p style="margin:0 0 10px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">Your ${productName} is <em style="font-style:italic;color:${C.accent};">unlocked</em>, ${name}.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.inkSoft};">We&rsquo;ve added ${productName} to your account. Sign in to access it now.</p>

    ${ctaBlock('Ready when you are', `Open your ${productName}.`, 'Go to portal &rarr;', portalUrl)}

    <p style="font-size:13.5px;line-height:1.7;color:${C.inkSoft};margin:0;">Any questions? Just reply to this email.</p>
  `
  return wrapper(`Your ${productName} is unlocked`, body)
}

export function buildMagicLinkEmail(firstName: string, magicLinkUrl: string): string {
  const name = firstName || 'there'
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Sign in</p>
    <p style="margin:0 0 10px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">Hi ${name}.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.inkSoft};">Tap the button below to sign in. This link expires in 15 minutes and can only be used once.</p>

    ${ctaBlock('One tap', 'Sign in to Kira Mei.', 'Sign in &rarr;', magicLinkUrl)}

    <p style="font-size:13.5px;line-height:1.7;color:${C.inkSoft};margin:0;">Didn&rsquo;t request this? You can safely ignore it.</p>
  `
  return wrapper('Sign in to Kira Mei', body)
}

export function buildReferralUnlockedEmail(firstName: string, creditAmount: string, spendUrl: string): string {
  const name = firstName || 'there'
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Referral reward</p>
    <p style="margin:0 0 10px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">${creditAmount} just landed in your account, ${name}.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.inkSoft};">Your referral reward has been unlocked. Use it against your next purchase.</p>

    ${ctaBlock('Your reward is ready', 'Use it against your next order.', 'Spend it &rarr;', spendUrl)}

    <p style="font-size:13.5px;line-height:1.7;color:${C.inkSoft};margin:0;">Credits expire after 12 months if unused.</p>
  `
  return wrapper('£10 just landed in your account', body)
}

export function buildFriendJoinedEmail(firstName: string, friendFirstName: string, referUrl: string): string {
  const name = firstName || 'there'
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Referral update</p>
    <p style="margin:0 0 10px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">${friendFirstName} just joined &mdash; thanks for sharing, ${name}.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.inkSoft};">Your reward will unlock 14 days after their purchase, once we&rsquo;re past the refund window.</p>

    ${ctaBlock('Keep sharing', 'Send your link to more friends.', 'Refer more &rarr;', referUrl)}

    <p style="font-size:13.5px;line-height:1.7;color:${C.inkSoft};margin:0;">Any questions? Just reply to this email.</p>
  `
  return wrapper(`${friendFirstName} just joined — thanks for sharing`, body)
}

export function buildPasswordChangedEmail(firstName: string, secureUrl: string): string {
  const name = firstName || 'there'
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Security notice</p>
    <p style="margin:0 0 10px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">Your password was changed, ${name}.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.inkSoft};">Your Kira Mei account password was just updated. If you made this change, no action is needed.</p>

    ${ctaBlock("Wasn't you?", 'Secure your account immediately.', 'Not you? &rarr;', secureUrl)}

    <p style="font-size:13.5px;line-height:1.7;color:${C.inkSoft};margin:0;">If you didn&rsquo;t change your password, please secure your account right away.</p>
  `
  return wrapper('Your password was changed', body)
}

export function buildAccountDeletionEmail(firstName: string, cancelUrl: string): string {
  const name = firstName || 'there'
  const body = `
    <p style="margin:0 0 6px;font-family:${mono};font-size:10px;letter-spacing:0.16em;color:${C.inkMuted};text-transform:uppercase;">Account notice</p>
    <p style="margin:0 0 10px;font-family:${serif};font-size:32px;font-weight:500;letter-spacing:-0.02em;line-height:1.1;color:${C.ink};">Your account is closing, ${name}.</p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:${C.inkSoft};">We&rsquo;ve received a request to delete your Kira Mei account. Your account and all data will be permanently removed in 14 days. If you changed your mind, cancel below.</p>

    ${ctaBlock('Changed your mind?', 'Keep your account and all your content.', 'Keep my account &rarr;', cancelUrl)}

    <p style="font-size:13.5px;line-height:1.7;color:${C.inkSoft};margin:0;">If you did request deletion, no action is needed. Your account will be removed on schedule.</p>
  `
  return wrapper('Account closing — 14 days to cancel', body)
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
