import Link from 'next/link'
import { getAllCategories } from '@/lib/posts'

export function Header() {
  const categories = getAllCategories().slice(0, 5)
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-brand-600">✦ Circinus</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/blog" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors">All Articles</Link>
            {categories.map(c => (
              <Link key={c.name} href={`/category/${c.name.toLowerCase()}`} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors">{c.name}</Link>
            ))}
          </nav>
          <Link href="/#newsletter" className="btn-primary hidden sm:inline-flex">Free Newsletter</Link>
        </div>
      </div>
    </header>
  )
}
