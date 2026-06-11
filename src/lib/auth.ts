import { NextRequest } from 'next/server'

const ADMIN_SECRET = process.env.ADMIN_SECRET || ''

export function isAuthorized(request: NextRequest): boolean {
  const cookie = request.cookies.get('admin_session')?.value
  if (cookie && cookie === ADMIN_SECRET) return true
  const header = request.headers.get('x-admin-key')
  if (header && header === ADMIN_SECRET) return true
  return false
}

export function checkAdminSecret(provided: string): boolean {
  if (!ADMIN_SECRET) return false
  return provided === ADMIN_SECRET
}
