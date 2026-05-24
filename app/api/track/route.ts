import { NextRequest } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'
import { COOKIE_NAME } from '@/lib/founder-auth'

function getDevice(ua: string): string {
  if (/ipad|tablet/i.test(ua)) return 'tablet'
  if (/iphone|ios/i.test(ua)) return 'ios'
  if (/android/i.test(ua)) return 'android'
  if (/mac os x/i.test(ua)) return 'mac'
  if (/windows/i.test(ua)) return 'win'
  return 'other'
}

export async function POST(req: NextRequest) {
  if (req.cookies.get(COOKIE_NAME)) return new Response(null, { status: 204 })

  try {
    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return new Response(null, { status: 204 })
    }

    const ua = req.headers.get('user-agent') ?? ''
    // Vercel sets x-vercel-ip-country; fall back gracefully
    const country = req.headers.get('x-vercel-ip-country') ?? null

    const supabase = createSupabaseServiceClient()
    await supabase.from('kira_events').insert({
      session_id:   body.session_id   ?? 'unknown',
      visitor_id:   body.visitor_id   ?? 'unknown',
      kind:         body.kind         ?? 'pageview',
      path:         body.path         ?? null,
      target:       body.target       ?? null,
      referrer:     body.referrer     ?? null,
      utm_source:   body.utm_source   ?? null,
      utm_campaign: body.utm_campaign ?? null,
      country,
      device: getDevice(ua),
      meta: body.meta ?? null,
    })
  } catch {
    // Swallow errors — analytics must never break the user experience
  }

  return new Response(null, { status: 204 })
}
