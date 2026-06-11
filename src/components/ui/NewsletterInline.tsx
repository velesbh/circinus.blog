'use client'

import { useState } from 'react'

export function NewsletterInline() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_URL
    if (endpoint) {
      try { await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }); setStatus('success') }
      catch { setStatus('error') }
    } else {
      setTimeout(() => setStatus('success'), 800)
    }
  }

  return (
    <div id="newsletter" className="bg-gradient-to-r from-brand-900 to-brand-700 rounded-2xl p-8 text-white text-center">
      <h2 className="text-2xl font-bold mb-2">Get smarter about money</h2>
      <p className="text-brand-200 mb-6 text-sm max-w-md mx-auto">Join thousands of readers getting weekly personal finance tips, deal alerts, and strategies — free, every week.</p>
      {status === 'success' ? <p className="text-green-300 font-semibold">You're in! Check your inbox.</p> : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" required className="flex-1 px-4 py-2.5 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white" />
          <button type="submit" disabled={status === 'loading'} className="px-5 py-2.5 bg-accent-400 text-white font-semibold rounded-lg hover:bg-accent-500 transition-colors text-sm disabled:opacity-70 shrink-0">{status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}</button>
        </form>
      )}
      <p className="text-xs text-brand-300 mt-3">No spam. Unsubscribe anytime.</p>
    </div>
  )
}
