import { createHmac, timingSafeEqual } from 'crypto'

const SESSION_SECRET = process.env.FOUNDER_SESSION_SECRET ?? 'dev-secret-change-me-in-production'
const COOKIE_NAME = 'kira_founder'

// ── Token (HMAC-signed, no external dep) ───────────────────

function hmacSign(payload: string): string {
  return createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url')
}

export function createSessionToken(): string {
  const now = Math.floor(Date.now() / 1000)
  const payload = Buffer.from(
    JSON.stringify({ sub: 'founder', iat: now, exp: now + 8 * 3600 })
  ).toString('base64url')
  return `${payload}.${hmacSign(payload)}`
}

export function verifySessionToken(token: string): boolean {
  try {
    const dot = token.lastIndexOf('.')
    if (dot < 0) return false
    const payload = token.slice(0, dot)
    const sig = token.slice(dot + 1)
    const expected = hmacSign(payload)
    // timing-safe compare
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return typeof data.exp === 'number' && data.exp > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}

// ── Password ────────────────────────────────────────────────
// Reads FOUNDER_PASSWORD from env and compares with timing-safe equal.

export function verifyPassword(password: string): boolean {
  const stored = process.env.FOUNDER_PASSWORD
  if (!stored) return false
  const a = Buffer.from(password)
  const b = Buffer.from(stored)
  if (a.length !== b.length) {
    // Still run a dummy compare to avoid timing leak on length
    timingSafeEqual(Buffer.alloc(b.length), b)
    return false
  }
  return timingSafeEqual(a, b)
}

export { COOKIE_NAME }
