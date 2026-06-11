import { getAllPosts, getAllCategories } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'
import { CategoryNav } from '@/components/blog/CategoryNav'
import { AdUnit } from '@/components/ui/AdUnit'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Browse all personal finance articles, money tips, and investment guides on Circinus.',
}
export const revalidate = 3600

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Articles</h1>
        <p className="text-gray-500">{posts.length} article{posts.length !== 1 ? 's' : ''} on personal finance, investing, and building wealth.</p>
      </div>
      <CategoryNav categories={categories} showAll />
      <AdUnit slot="blog-list-top" className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {posts.map((post, i) => (<>
          <PostCard key={post.slug} post={post} />
          {(i + 1) % 6 === 0 && i !== posts.length - 1 && <div key={`ad-${i}`} className="md:col-span-2 lg:col-span-3"><AdUnit slot={`blog-list-mid-${Math.floor(i / 6)}`} /></div>}
        </>))}
      </div>
      {posts.length === 0 && <div className="text-center py-20 text-gray-400"><p className="text-xl">No articles yet.</p></div>}
    </div>
  )
}
