import { NextRequest, NextResponse } from 'next/server'
import { recordPageview } from '@/lib/stats'

export async function POST(req: NextRequest) {
  try { const { slug } = await req.json(); if (slug) recordPageview(slug); return NextResponse.json({ ok: true }) }
  catch { return NextResponse.json({ ok: false }) }
}
