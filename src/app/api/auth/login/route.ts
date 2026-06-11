import { NextRequest, NextResponse } from 'next/server'
import { checkAdminSecret } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { secret } = await req.json()
  if (!checkAdminSecret(secret)) return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 })
  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin_session', secret, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 60 * 60 * 24 * 7, path: '/' })
  return response
}
