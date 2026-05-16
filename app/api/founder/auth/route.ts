import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { verifyPassword, createSessionToken, COOKIE_NAME } from '@/lib/founder-auth'

const RATE_LIMIT = 5
const RATE_WINDOW_MIN = 10

function getIP(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

export async function POST(req: NextRequest) {
  const ip = getIP(req)
  const ua = req.headers.get('user-agent') ?? ''
  const supabase = createSupabaseServiceClient()

  // Rate-limit check
  const windowStart = new Date(Date.now() - RATE_WINDOW_MIN * 60 * 1000).toISOString()
  const { count } = await supabase
    .from('kira_founder_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('ts', windowStart)

  if ((count ?? 0) >= RATE_LIMIT) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in 10 minutes.' },
      { status: 429 }
    )
  }

  // Log attempt
  await supabase.from('kira_founder_attempts').insert({ ip })

  let body: { password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const ok = verifyPassword(body.password ?? '')

  // Log login attempt
  await supabase.from('kira_founder_logins').insert({ ip, ua, ok })

  if (!ok) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const token = createSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 8 * 3600,
  })
  return res
}
