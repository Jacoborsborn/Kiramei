import { NextRequest, NextResponse } from 'next/server'

// Referrals are coming soon — just redirect home for now
export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!
  return NextResponse.redirect(appUrl, { status: 302 })
}
