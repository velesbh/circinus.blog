import Link from 'next/link'
import { formatDateShort } from '@/lib/format'
import type { PostMeta } from '@/lib/posts'

interface Props { post: PostMeta; featured?: boolean }

export function PostCard({ post, featured }: Props) {
  return (
    <article className={`group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow ${featured ? 'ring-2 ring-brand-200' : ''}`}>
      {post.coverImage
        ? <div className="overflow-hidden h-44 bg-gray-100"><img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /></div>
        : <div className="h-44 bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center"><span className="text-4xl opacity-20">✦</span></div>
      }
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="tag">{post.category}</span>
          {featured && <span className="tag bg-amber-50 text-amber-600">Featured</span>}
        </div>
        <h2 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1 mb-4">{post.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-gray-50">
          <span>{formatDateShort(post.date)}</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </article>
  )
}
