'use client'

import { useState, useEffect } from 'react'

const CATEGORIES = ['Budgeting', 'Investing', 'Saving', 'Debt', 'Side Income', 'Credit Cards', 'Real Estate', 'Retirement', 'Taxes', 'Tools & Reviews']

interface Props { editSlug?: string | null; onSaved: () => void }
interface FormState { title: string; description: string; content: string; category: string; tags: string; author: string; featured: boolean; affiliateDisclosure: boolean; coverImage: string }

const EMPTY: FormState = { title: '', description: '', content: '', category: 'Budgeting', tags: '', author: 'Circinus Editorial', featured: false, affiliateDisclosure: false, coverImage: '' }

export function PostEditor({ editSlug, onSaved }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(Boolean(editSlug))
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (!editSlug) return
    fetch(`/api/posts/${editSlug}`).then(r => r.json()).then(({ post }) => {
      if (post) setForm({ title: post.title || '', description: post.description || '', content: post.content || '', category: post.category || 'Budgeting', tags: (post.tags || []).join(', '), author: post.author || 'Circinus Editorial', featured: Boolean(post.featured), affiliateDisclosure: Boolean(post.affiliateDisclosure), coverImage: post.coverImage || '' })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [editSlug])

  function update(field: keyof FormState, value: string | boolean) { setForm(f => ({ ...f, [field]: value })) }

  async function handleSave() {
    if (!form.title.trim() || !form.content.trim()) { setError('Title and content are required.'); return }
    setSaving(true); setError('')
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
    const url = editSlug ? `/api/posts/${editSlug}` : '/api/posts'
    const method = editSlug ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) { onSaved() } else { const d = await res.json(); setError(d.error || 'Save failed.') }
    setSaving(false)
  }

  if (loading) return <div className="text-center py-10 text-gray-400">Loading post...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{editSlug ? 'Edit Post' : 'New Post'}</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setPreview(!preview)} className="btn-secondary">{preview ? 'Edit' : 'Preview'}</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary">{saving ? 'Saving...' : editSlug ? 'Update Post' : 'Publish Post'}</button>
        </div>
      </div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">{error}</div>}
      {preview ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{form.title || 'Untitled'}</h2>
          <p className="text-gray-500 mb-6">{form.description}</p>
          <div className="prose-custom whitespace-pre-wrap text-gray-700 leading-relaxed">{form.content}</div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Title *</label><input value={form.title} onChange={e => update('title', e.target.value)} placeholder="Your article title" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label><select value={form.category} onChange={e => update('category', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white">{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Description (SEO meta, 150-160 chars)</label><input value={form.description} onChange={e => update('description', e.target.value)} placeholder="Brief description" maxLength={160} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /><p className="text-xs text-gray-400 mt-0.5">{form.description.length}/160</p></div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label><input value={form.tags} onChange={e => update('tags', e.target.value)} placeholder="budgeting, savings, tips" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Author</label><input value={form.author} onChange={e => update('author', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL (optional)</label><input value={form.coverImage} onChange={e => update('coverImage', e.target.value)} placeholder="https://..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" /></div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.featured} onChange={e => update('featured', e.target.checked)} className="rounded" /><span className="text-sm text-gray-700">Mark as featured</span></label>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.affiliateDisclosure} onChange={e => update('affiliateDisclosure', e.target.checked)} className="rounded" /><span className="text-sm text-gray-700">Show affiliate disclosure</span></label>
          </div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Content * <span className="text-gray-400 font-normal">(Markdown supported)</span></label><textarea value={form.content} onChange={e => update('content', e.target.value)} placeholder="## Introduction\n\nWrite your article here..." rows={28} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono resize-y" /><p className="text-xs text-gray-400 mt-1">{form.content.length} characters</p></div>
        </div>
      )}
    </div>
  )
}
