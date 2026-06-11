import { getPostsByCategory, getAllCategories } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'
import { AdUnit } from '@/components/ui/AdUnit'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props { params: { category: string } }

export async function generateStaticParams() {
  return getAllCategories().map(c => ({ category: c.name.toLowerCase() }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  return { title: `${label} Articles`, description: `Browse all ${label} articles and guides on Circinus.` }
}

export const revalidate = 3600

export default function CategoryPage({ params }: Props) {
  const posts = getPostsByCategory(params.category)
  if (posts.length === 0) notFound()
  const label = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="tag mb-3 inline-block">Category</span>
        <h1 className="text-3xl font-bold text-gray-900">{label}</h1>
        <p className="text-gray-500 mt-2">{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
      </div>
      <AdUnit slot={`cat-${params.category}-top`} className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => <PostCard key={post.slug} post={post} />)}
      </div>
    </div>
  )
}
