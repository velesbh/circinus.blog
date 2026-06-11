import fs from 'fs'
import path from 'path'

const statsFile = path.join(process.cwd(), 'data/stats.json')

interface Stats {
  totalPageviews: number
  totalPosts: number
  daily: { date: string; pageviews: number; uniqueVisitors: number; posts: number }[]
  topPosts: { slug: string; views: number }[]
}

function ensureStatsFile() {
  const dir = path.dirname(statsFile)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(statsFile)) {
    fs.writeFileSync(statsFile, JSON.stringify({ totalPageviews: 0, totalPosts: 0, daily: [], topPosts: [] }, null, 2))
  }
}

export function getStats(): Stats {
  ensureStatsFile()
  try { return JSON.parse(fs.readFileSync(statsFile, 'utf8')) }
  catch { return { totalPageviews: 0, totalPosts: 0, daily: [], topPosts: [] } }
}

export function recordPageview(slug: string) {
  ensureStatsFile()
  const stats = getStats()
  stats.totalPageviews += 1
  const today = new Date().toISOString().split('T')[0]
  const dayEntry = stats.daily.find(d => d.date === today)
  if (dayEntry) { dayEntry.pageviews += 1 }
  else { stats.daily.push({ date: today, pageviews: 1, uniqueVisitors: 1, posts: 0 }) }
  const postEntry = stats.topPosts.find(p => p.slug === slug)
  if (postEntry) { postEntry.views += 1 } else { stats.topPosts.push({ slug, views: 1 }) }
  stats.topPosts.sort((a, b) => b.views - a.views)
  stats.topPosts = stats.topPosts.slice(0, 20)
  stats.daily = stats.daily.slice(-60)
  fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2))
}

export function updatePostCount(count: number) {
  ensureStatsFile()
  const stats = getStats()
  stats.totalPosts = count
  fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2))
}
