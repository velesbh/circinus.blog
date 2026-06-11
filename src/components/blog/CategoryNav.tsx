import Link from 'next/link'

interface Props { categories: { name: string; count: number }[]; showAll?: boolean }

export function CategoryNav({ categories, showAll }: Props) {
  return (
    <nav className="flex items-center gap-1 overflow-x-auto py-3">
      {showAll && <Link href="/blog" className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500 text-white">All</Link>}
      {categories.map(c => (
        <Link key={c.name} href={`/category/${c.name.toLowerCase()}`} className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          {c.name}<span className="ml-1 text-xs text-gray-400">{c.count}</span>
        </Link>
      ))}
    </nav>
  )
}
