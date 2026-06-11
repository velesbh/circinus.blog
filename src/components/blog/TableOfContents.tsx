'use client'

interface Heading { text: string; level: number; id: string }
interface Props { headings: Heading[] }

export function TableOfContents({ headings }: Props) {
  return (
    <nav className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <h3 className="font-semibold text-gray-800 text-sm mb-3">In this article</h3>
      <ul className="space-y-1.5">
        {headings.map(h => (
          <li key={h.id} className={h.level === 3 ? 'ml-3' : ''}>
            <a href={`#${h.id}`} className="text-sm text-gray-600 hover:text-brand-600 transition-colors leading-snug block">{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
