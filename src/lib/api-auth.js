import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

/**
 * Session guard for API route handlers.
 *
 * Call as the first statement of every handler that reads or writes business
 * data:
 *
 *   const denied = await requireSession()
 *   if (denied) return denied
 *
 * Returns a 401 response when there is no session, or null to continue.
 *
 * A route protects itself. The middleware matcher only covers
 * `/modules/:path*`, so nothing under `/api` was ever behind it — and every
 * handler was trusting a guard that did not apply to it. The result was that
 * an unauthenticated request could read the whole curriculum, including
 * unpublished drafts, and create, edit or delete lessons. Middleware is a
 * convenience on top of this, never the only lock.
 */
export async function requireSession() {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return null
}

/**
 * Returns the signed-in user's id, or null. For handlers that need to scope a
 * query or a write to the caller rather than trusting an id from the body.
 */
export async function sessionUserId() {
  const session = await auth()
  return session?.user?.id ?? null
}
