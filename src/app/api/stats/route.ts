import { NextRequest, NextResponse } from 'next/server'
import { isAuthorized } from '@/lib/auth'
import { getStats } from '@/lib/stats'
import { getAllPosts } from '@/lib/posts'

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const stats = getStats()
  const posts = getAllPosts()
  return NextResponse.json({ ...stats, totalPosts: posts.length, recentPosts: posts.slice(0, 5) })
}
