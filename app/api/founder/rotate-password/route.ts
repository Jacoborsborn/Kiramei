import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, verifySessionToken, COOKIE_NAME } from '@/lib/founder-auth'

export async function POST(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? ''
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { currentPassword?: string; newPassword?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!verifyPassword(body.currentPassword ?? '')) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })
  }

  const newPw = body.newPassword ?? ''
  if (newPw.length < 12) {
    return NextResponse.json({ error: 'Password must be at least 12 characters' }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    instruction: `Update FOUNDER_PASSWORD to your new password in Vercel → Settings → Environment Variables, then redeploy.`,
  })
}
