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

// Persona-quiz submissions.
//
// Legal note: a row is persisted ONLY when storage_consent is true. The quiz
// result is computed and shown client-side regardless, so consent stays
// "freely given" — declining to store does not block the experience.
// weight_band is special-category (health) data and is only ever present when
// the visitor supplied it under the explicit consent recorded in consent_text.
export async function POST(req: NextRequest) {
  // Don't record the founder's own testing sessions.
  if (req.cookies.get(COOKIE_NAME)) return new Response(null, { status: 204 })

  try {
    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return new Response(null, { status: 204 })
    }

    // Hard gate: no consent, no storage.
    if (body.storage_consent !== true) return new Response(null, { status: 204 })

    const ua = req.headers.get('user-agent') ?? ''
    const country = req.headers.get('x-vercel-ip-country') ?? null

    const supabase = createSupabaseServiceClient()
    await supabase.from('kira_quiz_responses').insert({
      visitor_id:      body.visitor_id   ?? 'unknown',
      session_id:      body.session_id   ?? null,
      persona:         body.persona      ?? null,
      age_band:        body.age_band     ?? null,
      weight_band:     body.weight_band  ?? null,
      experience:      body.experience   ?? null,
      goal:            body.goal         ?? null,
      blocker:         body.blocker      ?? null,
      country,
      device:          getDevice(ua),
      // Only retain an email when marketing consent was explicitly given.
      email:           body.email_consent === true ? (body.email ?? null) : null,
      email_consent:   body.email_consent === true,
      storage_consent: true,
      consent_text:    body.consent_text ?? null,
    })
  } catch {
    // Swallow errors — the quiz UX must never break on a storage failure.
  }

  return new Response(null, { status: 204 })
}
