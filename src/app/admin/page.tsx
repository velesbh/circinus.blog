'use client'

import { useState, useEffect } from 'react'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { AdminLogin } from '@/components/admin/AdminLogin'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    fetch('/api/auth/check')
      .then(r => r.json())
      .then(d => { setAuthed(d.ok === true); setChecking(false) })
      .catch(() => setChecking(false))
  }, [])

  if (checking) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full" /></div>
  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />
  return <AdminDashboard onLogout={() => setAuthed(false)} />
}
