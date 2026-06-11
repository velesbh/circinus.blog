'use client'

import { useEffect, useState } from 'react'
import { formatDateShort } from '@/lib/format'

interface PostMeta { slug: string; title: string; date: string; category: string; featured: boolean; readingTime: string }
interface Props { onEdit: (slug: string) => void }

export function PostList({ onEdit }: Props) {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function loadPosts() {
    setLoading(true)
    const res = await fetch('/api/posts')
    const data = await res.json()
    setPosts(data.posts || [])
    setLoading(false)
  }

  useEffect(() => { loadPosts() }, [])

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return
    setDeleting(slug)
    await fetch(`/api/posts/${slug}`, { method: 'DELETE' })
    await loadPosts()
    setDeleting(null)
  }

  if (loading) return <div className="text-center py-10 text-gray-400">Loading posts...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Posts ({posts.length})</h1>
        <button onClick={loadPosts} className="text-sm text-gray-400 hover:text-gray-600">Refresh</button>
      </div>
      {posts.length === 0 && <div className="text-center py-16 text-gray-400"><p>No posts yet. Create your first one.</p></div>}
      <div className="space-y-2">
        {posts.map(p => (
          <div key={p.slug} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="tag">{p.category}</span>
                {p.featured && <span className="tag bg-amber-50 text-amber-600">Featured</span>}
              </div>
              <h3 className="font-semibold text-gray-900 leading-snug truncate">{p.title}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{formatDateShort(p.date)} · {p.readingTime} · <a href={`/blog/${p.slug}`} target="_blank" rel="noopener" className="text-brand-500 hover:underline">{p.slug}</a></p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => onEdit(p.slug)} className="text-sm text-brand-500 hover:text-brand-700 font-medium px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors">Edit</button>
              <button onClick={() => handleDelete(p.slug)} disabled={deleting === p.slug} className="text-sm text-red-400 hover:text-red-600 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50">{deleting === p.slug ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
