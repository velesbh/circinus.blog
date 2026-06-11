'use client'

import { useState } from 'react'
import { PostEditor } from './PostEditor'
import { PostList } from './PostList'
import { StatsPanel } from './StatsPanel'

type Tab = 'stats' | 'posts' | 'new'
interface Props { onLogout: () => void }

export function AdminDashboard({ onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('stats')
  const [editSlug, setEditSlug] = useState<string | null>(null)

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    onLogout()
  }

  if (editSlug) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminNav active="posts" onTabChange={() => {}} onLogout={handleLogout} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button onClick={() => setEditSlug(null)} className="text-sm text-brand-500 hover:underline mb-6">&larr; Back to posts</button>
          <PostEditor editSlug={editSlug} onSaved={() => setEditSlug(null)} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav active={tab} onTabChange={setTab} onLogout={handleLogout} />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {tab === 'stats' && <StatsPanel />}
        {tab === 'posts' && <PostList onEdit={slug => { setEditSlug(slug); setTab('posts') }} />}
        {tab === 'new' && <PostEditor onSaved={() => setTab('posts')} />}
      </div>
    </div>
  )
}

function AdminNav({ active, onTabChange, onLogout }: { active: Tab; onTabChange: (t: Tab) => void; onLogout: () => void }) {
  const tabs: { id: Tab; label: string }[] = [{ id: 'stats', label: 'Statistics' }, { id: 'posts', label: 'All Posts' }, { id: 'new', label: '+ New Post' }]
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="font-bold text-brand-600 mr-4">✦ Admin</span>
          {tabs.map(t => <button key={t.id} onClick={() => onTabChange(t.id)} className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${active === t.id ? 'bg-brand-50 text-brand-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>{t.label}</button>)}
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener" className="text-xs text-gray-400 hover:text-gray-600">View Site &rarr;</a>
          <button onClick={onLogout} className="text-xs text-red-400 hover:text-red-600 font-medium">Logout</button>
        </div>
      </div>
    </header>
  )
}
