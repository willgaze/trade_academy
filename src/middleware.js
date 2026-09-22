// v5 replaces `withAuth` from next-auth/middleware with the `auth` export
// itself, used directly as the middleware. Unauthenticated requests to a
// matched path are redirected to the `pages.signIn` route configured in
// src/lib/auth.js.
export { auth as middleware } from '@/lib/auth'

export const config = {
  matcher: ['/modules/:path*']
}
