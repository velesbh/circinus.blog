'use client'

interface Props { url: string; title: string }

export function ShareButtons({ url, title }: Props) {
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const links = [
    { label: 'Twitter/X', href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`, color: 'bg-black' },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, color: 'bg-blue-600' },
    { label: 'Reddit', href: `https://reddit.com/submit?url=${encoded}&title=${encodedTitle}`, color: 'bg-orange-500' },
    { label: 'LinkedIn', href: `https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`, color: 'bg-blue-700' },
  ]
  return (
    <div className="border-t border-gray-100 pt-6 mt-6">
      <p className="text-sm font-semibold text-gray-600 mb-3">Found this helpful? Share it:</p>
      <div className="flex flex-wrap gap-2">
        {links.map(l => <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`${l.color} text-white text-xs font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity`}>{l.label}</a>)}
        <button onClick={() => navigator.clipboard.writeText(url)} className="border border-gray-200 text-gray-600 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">Copy Link</button>
      </div>
    </div>
  )
}
