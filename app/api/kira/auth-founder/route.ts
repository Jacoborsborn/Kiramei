import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const expected = process.env.FOUNDER_PASSWORD
  if (!expected) return NextResponse.json({ ok: false }, { status: 500 })
  if (password !== expected) return NextResponse.json({ ok: false }, { status: 401 })
  return NextResponse.json({ ok: true })
}
