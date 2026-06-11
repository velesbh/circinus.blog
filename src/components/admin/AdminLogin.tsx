'use client'

import { useState } from 'react'

interface Props { onSuccess: () => void }

export function AdminLogin({ onSuccess }: Props) {
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ secret }) })
    if (res.ok) { onSuccess() } else { setError('Invalid admin secret.') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <span className="text-3xl">✦</span>
          <h1 className="text-xl font-bold text-gray-900 mt-2">Circinus Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Enter your admin secret to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Admin secret" required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" disabled={loading} className="w-full btn-primary justify-center py-2.5">{loading ? 'Checking...' : 'Enter Dashboard'}</button>
        </form>
      </div>
    </div>
  )
}
