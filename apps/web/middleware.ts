import {authMiddleware} from '@clerk/nextjs'

// Disable redirects
export default authMiddleware({publicRoutes: [/^(.*)/]})

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next
   * - static (static files)
   * - favicon.ico (favicon file)
   * - public folder
   * - public folder
   * - connect (Venice connect, which has separate auth logic)
   * - debug page
   * - oauth routes
   */
  matcher: [
    '/((?!.*\\..*|_next|connect|debug|oauth).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
}
