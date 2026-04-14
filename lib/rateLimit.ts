const store = new Map<string, { count: number; resetAt: number }>()

/**
 * Simple in-memory rate limiter.
 * @param key     unique identifier (e.g. IP address)
 * @param limit   max requests allowed in the window
 * @param windowMs time window in milliseconds
 * @returns true if request is allowed, false if rate limited
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) return false

  entry.count++
  return true
}
