import { SupabaseClient } from '@supabase/supabase-js'

const BLOCKLIST = new Set(['admin', 'kira', 'mei', 'support', 'test'])

export async function generateReferralCode(
  firstName: string,
  supabase: SupabaseClient,
): Promise<string> {
  const base = firstName
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 12)
  const year = new Date().getFullYear().toString().slice(-2)
  const candidate = `${base}-KM${year}`

  if (BLOCKLIST.has(base.toLowerCase())) {
    return generateReferralCode('user', supabase)
  }

  const { data: existing } = await supabase
    .from('profiles')
    .select('referral_code')
    .eq('referral_code', candidate)
    .maybeSingle()

  if (!existing) return candidate

  for (let i = 2; i <= 99; i++) {
    const variant = `${base}-KM${year}-${i}`
    const { data: clash } = await supabase
      .from('profiles')
      .select('referral_code')
      .eq('referral_code', variant)
      .maybeSingle()
    if (!clash) return variant
  }

  return `${base}-KM${year}-${Date.now()}`
}

export function generateOtp(): string {
  const arr = new Uint32Array(1)
  crypto.getRandomValues(arr)
  return String(arr[0] % 100000000).padStart(8, '0')
}

export async function hashValue(value: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(value)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function generateToken(): string {
  return crypto.randomUUID()
}

interface ProvisionParams {
  email: string
  name: string
  stripeEventId: string
  productSku: string
  amountPence: number
  referralCode?: string
  supabase: SupabaseClient
}

interface ProvisionResult {
  isNew: boolean
  userId: string
  activationToken?: string
  otp?: string
}

export async function provisionAccount(params: ProvisionParams): Promise<ProvisionResult> {
  const { email, name, stripeEventId, productSku, amountPence, referralCode, supabase } = params

  const { data: { users } } = await supabase.auth.admin.listUsers()
  const existing = users.find(u => u.email?.toLowerCase() === email.toLowerCase())

  let userId: string
  let isNew = false

  if (existing) {
    userId = existing.id
  } else {
    const { data: userData, error } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: { full_name: name },
    })
    if (error || !userData?.user) throw new Error(`Failed to create user: ${error?.message}`)
    userId = userData.user.id
    isNew = true
  }

  const nameParts = name.trim().split(/\s+/)
  const firstName = nameParts[0] ?? ''
  const lastName = nameParts.slice(1).join(' ') ?? ''

  const entitlementField =
    productSku === 'training' ? 'programme_access' :
    productSku === 'nutrition' ? 'nutrition_access' :
    productSku === 'bundle' ? null : null

  const profileUpdate: Record<string, unknown> = {
    id: userId,
    email,
    first_name: firstName,
    last_name: lastName,
  }

  if (productSku === 'training') {
    profileUpdate.programme_access = true
  } else if (productSku === 'nutrition') {
    profileUpdate.nutrition_access = true
  } else if (productSku === 'bundle') {
    profileUpdate.programme_access = true
    profileUpdate.nutrition_access = true
  }

  if (isNew) {
    const code = await generateReferralCode(firstName || 'user', supabase)
    profileUpdate.referral_code = code
  }

  await supabase.from('profiles').upsert(profileUpdate, { onConflict: 'id' })

  const { data: existingOrder } = await supabase
    .from('orders')
    .select('id')
    .eq('stripe_event_id', stripeEventId)
    .maybeSingle()

  let orderId: string | undefined

  if (!existingOrder) {
    const { data: order } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        stripe_id: stripeEventId,
        product_sku: productSku,
        amount_pence: amountPence,
        status: 'paid',
        stripe_event_id: stripeEventId,
      })
      .select('id')
      .single()
    orderId = order?.id
  }

  let activationToken: string | undefined
  let otp: string | undefined

  if (isNew) {
    activationToken = generateToken()
    otp = generateOtp()
    const otpHash = await hashValue(otp)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

    await supabase.from('activation_tokens').upsert(
      { user_id: userId, token: activationToken, otp_hash: otpHash, expires_at: expiresAt },
      { onConflict: 'user_id' },
    )
  }

  if (referralCode && orderId) {
    const { data: referrer } = await supabase
      .from('profiles')
      .select('id')
      .ilike('referral_code', referralCode)
      .maybeSingle()

    if (referrer && referrer.id !== userId) {
      const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString()
      await supabase.from('referrals').insert({
        referrer_id: referrer.id,
        referee_email: email,
        referee_user_id: userId,
        order_id: orderId,
        status: 'pending',
        reward_pence: 1000,
        discount_pence: 1000,
        expires_at: expiresAt,
      })

      await supabase
        .from('profiles')
        .update({ referred_by_id: referrer.id })
        .eq('id', userId)
    }
  }

  return { isNew, userId, activationToken, otp }
}
