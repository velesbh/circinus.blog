'use client'

import { useEffect } from 'react'

export function AdsterraSitewide() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER
    if (!key) return
    const script = document.createElement('script')
    script.src = `//pl${key}.profitableratecpm.com/${key}/invoke.js`
    script.async = true
    script.setAttribute('data-cfasync', 'false')
    document.body.appendChild(script)
    return () => { try { document.body.removeChild(script) } catch {} }
  }, [])
  return null
}
