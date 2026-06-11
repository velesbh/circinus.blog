import { getAllPosts, getAllCategories } from '@/lib/posts'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const base = 'https://circinus.blog'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...posts.map(p => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...categories.map(c => ({ url: `${base}/category/${c.name.toLowerCase()}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 })),
  ]
}
