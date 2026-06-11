import Link from 'next/link'
import { formatDateShort } from '@/lib/format'
import type { PostMeta } from '@/lib/posts'

interface Props { featured: PostMeta[] }

export function HeroSection({ featured }: Props) {
  const main = featured[0]
  const secondary = featured.slice(1, 3)
  return (
    <section className="bg-gradient-to-b from-brand-900 to-brand-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Take Control of Your Money</h1>
          <p className="text-brand-200 text-lg max-w-xl mx-auto">Practical guides on budgeting, investing, saving, and building wealth — written clearly, without the jargon.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/blog" className="btn-primary bg-white text-brand-700 hover:bg-brand-50">Read Articles</Link>
            <Link href="/#newsletter" className="btn-secondary border-white/30 text-white hover:bg-white/10">Free Newsletter</Link>
          </div>
        </div>
        {main && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <article className="lg:col-span-2 bg-white/10 backdrop-blur rounded-xl p-6 hover:bg-white/20 transition-colors">
              <span className="tag bg-white/20 text-white mb-3 inline-block">{main.category}</span>
              <h2 className="text-2xl font-bold mb-2 leading-snug"><Link href={`/blog/${main.slug}`} className="hover:underline">{main.title}</Link></h2>
              <p className="text-brand-200 text-sm line-clamp-2 mb-4">{main.description}</p>
              <div className="flex items-center gap-3 text-xs text-brand-300"><span>{formatDateShort(main.date)}</span><span>·</span><span>{main.readingTime}</span></div>
            </article>
            <div className="flex flex-col gap-4">
              {secondary.map(p => (
                <article key={p.slug} className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-colors flex-1">
                  <span className="tag bg-white/20 text-white mb-2 inline-block text-xs">{p.category}</span>
                  <h3 className="font-bold leading-snug mb-2"><Link href={`/blog/${p.slug}`} className="hover:underline text-sm">{p.title}</Link></h3>
                </article>
              ))}
              {secondary.length === 0 && <div className="bg-white/10 rounded-xl p-4 flex items-center justify-center"><Link href="/blog" className="text-brand-200 text-sm hover:text-white">View all articles &rarr;</Link></div>}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
