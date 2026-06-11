'use client'

interface Props { slot: string; variant?: 'banner' | 'rectangle' | 'leaderboard'; className?: string }

export function AdUnit({ slot, variant = 'banner', className = '' }: Props) {
  const getKey = () => {
    if (variant === 'rectangle') return process.env.NEXT_PUBLIC_ADSTERRA_RECTANGLE || ''
    if (variant === 'leaderboard') return process.env.NEXT_PUBLIC_ADSTERRA_LEADERBOARD || ''
    return process.env.NEXT_PUBLIC_ADSTERRA_BANNER || ''
  }
  const key = getKey()
  const dims = { banner: { w: 728, h: 90 }, rectangle: { w: 300, h: 250 }, leaderboard: { w: 970, h: 90 } }[variant]

  if (!key) {
    return <div className={`ad-unit ${className}`} style={{ width: '100%', maxWidth: dims.w, height: dims.h, margin: '0 auto' }} data-slot={slot}><span className="text-xs text-gray-300">Ad: {slot}</span></div>
  }

  return (
    <div className={`ad-unit ${className}`} style={{ width: '100%', maxWidth: dims.w, margin: '0 auto' }}>
      <script async data-cfasync="false" src={`//pl${key}.profitableratecpm.com/${key}/invoke.js`} />
      <div id={`container-${key}`} />
    </div>
  )
}
