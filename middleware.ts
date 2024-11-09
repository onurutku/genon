import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookie = await cookies()
  const cookieObj = cookie.get('Authorization')
  if (!cookieObj) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
export const config = {
  matcher: ['/((?!api|login|register|_next/static|_next/image).*)']
}
