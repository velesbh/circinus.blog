'use client'

import { useEffect, useState } from 'react'
import { formatDateShort } from '@/lib/format'

interface Stats {
  totalPageviews: number; totalPosts: number
  daily: { date: string; pageviews: number }[]
  topPosts: { slug: string; views: number }[]
  recentPosts: { slug: string; title: string; date: string; category: string }[]
}

export function StatsPanel() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(d => { setStats(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-10 text-gray-400">Loading stats...</div>
  if (!stats) return <div className="text-center py-10 text-red-400">Failed to load stats.</div>

  const last7 = stats.daily.slice(-7).reverse()
  const totalThisWeek = last7.reduce((s, d) => s + d.pageviews, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Total Pageviews" value={stats.totalPageviews.toLocaleString()} />
        <KPI label="This Week" value={totalThisWeek.toLocaleString()} />
        <KPI label="Published Posts" value={stats.totalPosts.toLocaleString()} />
        <KPI label="Top Post Views" value={stats.topPosts[0]?.views?.toLocaleString() || '—'} />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Pageviews — Last 7 Days</h2>
        {last7.length === 0 ? <p className="text-sm text-gray-400">No data yet. Traffic will appear once visitors arrive.</p> : (
          <div className="space-y-2">
            {last7.map(d => {
              const max = Math.max(...last7.map(x => x.pageviews), 1)
              const pct = Math.round((d.pageviews / max) * 100)
              return (
                <div key={d.date} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-24 shrink-0">{d.date}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2"><div className="bg-brand-500 h-2 rounded-full" style={{ width: `${pct}%` }} /></div>
                  <span className="text-xs text-gray-600 w-10 text-right">{d.pageviews}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Top Posts by Views</h2>
          {stats.topPosts.length === 0 ? <p className="text-sm text-gray-400">No data yet.</p> : (
            <ol className="space-y-2">
              {stats.topPosts.slice(0, 8).map((p, i) => (
                <li key={p.slug} className="flex items-center gap-3 text-sm">
                  <span className="text-gray-300 w-4 shrink-0">{i + 1}.</span>
                  <a href={`/blog/${p.slug}`} target="_blank" rel="noopener" className="flex-1 text-brand-600 hover:underline truncate">{p.slug}</a>
                  <span className="text-gray-500 shrink-0">{p.views.toLocaleString()} views</span>
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Recent Posts</h2>
          {(stats.recentPosts || []).length === 0 ? <p className="text-sm text-gray-400">No posts yet.</p> : (
            <ul className="space-y-2">
              {(stats.recentPosts || []).map(p => (
                <li key={p.slug} className="text-sm flex items-start gap-2">
                  <span className="tag shrink-0 mt-0.5">{p.category}</span>
                  <div>
                    <a href={`/blog/${p.slug}`} target="_blank" rel="noopener" className="text-gray-700 hover:text-brand-600 font-medium leading-snug">{p.title}</a>
                    <p className="text-xs text-gray-400">{formatDateShort(p.date)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

function KPI({ label, value }: { label: string; value: string }) {
  return <div className="bg-white rounded-xl border border-gray-200 p-5"><p className="text-xs text-gray-500 mb-1">{label}</p><p className="text-2xl font-bold text-gray-900">{value}</p></div>
}
