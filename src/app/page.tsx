import { getFeaturedPosts, getRecentPosts, getAllCategories } from '@/lib/posts'
import { HeroSection } from '@/components/blog/HeroSection'
import { PostCard } from '@/components/blog/PostCard'
import { CategoryNav } from '@/components/blog/CategoryNav'
import { AdUnit } from '@/components/ui/AdUnit'
import { NewsletterInline } from '@/components/ui/NewsletterInline'
import Link from 'next/link'

export const revalidate = 3600

export default function HomePage() {
  const featured = getFeaturedPosts()
  const recent = getRecentPosts(9)
  const categories = getAllCategories()
  return (
    <>
      <HeroSection featured={featured} />
      <div className="border-b border-gray-100 bg-white sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4"><CategoryNav categories={categories} /></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <AdUnit slot="homepage-top" className="mb-10" />
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
            <Link href="/blog" className="text-brand-500 hover:text-brand-700 text-sm font-medium">View all &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map((post, i) => (<>
              <PostCard key={post.slug} post={post} />
              {i === 2 && <div className="md:col-span-2 lg:col-span-3"><AdUnit slot="homepage-mid" /></div>}
            </>))}
          </div>
        </section>
        <div className="my-12"><NewsletterInline /></div>
        <AdUnit slot="homepage-bottom" className="mt-4" />
      </div>
    </>
  )
}
