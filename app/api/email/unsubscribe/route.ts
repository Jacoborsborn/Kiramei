import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase-server'

// One-click unsubscribe. URL format: /api/email/unsubscribe?uid=<userId>&sig=<hmac>
// The HMAC prevents anyone guessing another user's unsubscribe URL.
// If EMAIL_UNSUB_SECRET is not set, falls back to unsigned (weaker — set the env var).

async function verifySignature(userId: string, sig: string): Promise<boolean> {
  const secret = process.env.EMAIL_UNSUB_SECRET
  if (!secret) return true // degrade gracefully in dev

  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'],
  )
  const expected = encoder.encode(userId)
  const provided = Uint8Array.from(Buffer.from(sig, 'hex'))
  return crypto.subtle.verify('HMAC', key, provided, expected)
}

export async function generateUnsubscribeUrl(userId: string, baseUrl: string): Promise<string> {
  const secret = process.env.EMAIL_UNSUB_SECRET
  if (!secret) return `${baseUrl}/api/email/unsubscribe?uid=${userId}`

  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  )
  const sig = Buffer.from(await crypto.subtle.sign('HMAC', key, encoder.encode(userId))).toString('hex')
  return `${baseUrl}/api/email/unsubscribe?uid=${userId}&sig=${sig}`
}

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get('uid')
  const sig = req.nextUrl.searchParams.get('sig') ?? ''

  if (!uid) {
    return new NextResponse('Invalid unsubscribe link.', { status: 400, headers: { 'Content-Type': 'text/html' } })
  }

  const valid = await verifySignature(uid, sig)
  if (!valid) {
    return new NextResponse('Invalid unsubscribe link.', { status: 400, headers: { 'Content-Type': 'text/html' } })
  }

  const service = createSupabaseServiceClient()
  await service.from('profiles').update({ email_opted_out: true }).eq('id', uid)

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Unsubscribed</title>
  <style>body{margin:0;padding:60px 24px;font-family:Georgia,serif;background:#F5EFE3;color:#1F1B16;text-align:center;}
  h1{font-size:28px;font-weight:500;margin-bottom:12px;}p{font-size:15px;color:#5C5347;line-height:1.7;}
  a{color:#B8543A;}</style></head>
  <body><h1>You're unsubscribed.</h1>
  <p>You won't receive any more emails from Kira Mei.<br>
  Changed your mind? Email <a href="mailto:hello@kiramei.co.uk">hello@kiramei.co.uk</a>.</p>
  </body></html>`

  return new NextResponse(html, { status: 200, headers: { 'Content-Type': 'text/html' } })
}
