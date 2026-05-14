import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, COOKIE_NAME } from '@/lib/founder-auth'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow the login page and auth API through
  if (
    pathname === '/dashboard/login' ||
    pathname.startsWith('/api/founder/auth')
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get(COOKIE_NAME)?.value ?? ''
  if (!verifySessionToken(token)) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
