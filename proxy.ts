import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, COOKIE_NAME } from '@/lib/founder-auth'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Inject pathname so server layouts can build accurate redirect URLs
  const headers = new Headers(request.headers)
  headers.set('x-pathname', pathname)
  const response = NextResponse.next({ request: { headers } })

  // Dashboard auth guard
  if (pathname.startsWith('/dashboard')) {
    if (
      pathname === '/dashboard/login' ||
      pathname.startsWith('/api/founder/auth')
    ) {
      return response
    }
    const token = request.cookies.get(COOKIE_NAME)?.value ?? ''
    if (!verifySessionToken(token)) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
