import { NextRequest, NextResponse } from 'next/server'
import { isAuthorized } from '@/lib/auth'

export async function GET(req: NextRequest) {
  if (isAuthorized(req)) return NextResponse.json({ ok: true })
  return NextResponse.json({ ok: false }, { status: 401 })
}
