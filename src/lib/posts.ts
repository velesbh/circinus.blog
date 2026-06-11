import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  author: string
  readingTime: string
  featured: boolean
  coverImage?: string
  content: string
  affiliateDisclosure?: boolean
}

export interface PostMeta extends Omit<Post, 'content'> {}

function ensurePostsDir() {
  if (!fs.existsSync(postsDirectory)) fs.mkdirSync(postsDirectory, { recursive: true })
}

export function getAllPostSlugs(): string[] {
  ensurePostsDir()
  return fs.readdirSync(postsDirectory)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx?$/, ''))
}

export function getPostBySlug(slug: string): Post | null {
  ensurePostsDir()
  const mdPath = path.join(postsDirectory, `${slug}.md`)
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
  const filePath = fs.existsSync(mdPath) ? mdPath : fs.existsSync(mdxPath) ? mdxPath : null
  if (!filePath) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)
  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    category: data.category || 'General',
    tags: data.tags || [],
    author: data.author || 'Circinus Editorial',
    readingTime: rt.text,
    featured: data.featured || false,
    coverImage: data.coverImage || null,
    affiliateDisclosure: data.affiliateDisclosure || false,
    content,
  }
}

export function getAllPosts(): PostMeta[] {
  return getAllPostSlugs()
    .map(slug => { const p = getPostBySlug(slug); if (!p) return null; const { content: _, ...meta } = p; return meta })
    .filter(Boolean) as PostMeta[]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter(p => p.featured).slice(0, 3)
}

export function getRecentPosts(count = 6): PostMeta[] {
  return getAllPosts().slice(0, count)
}

export function getAllCategories(): { name: string; count: number }[] {
  const map: Record<string, number> = {}
  for (const p of getAllPosts()) map[p.category] = (map[p.category] || 0) + 1
  return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
}

export function getAllTags(): string[] {
  const set = new Set<string>()
  for (const p of getAllPosts()) p.tags.forEach(t => set.add(t))
  return Array.from(set)
}

export function getRelatedPosts(currentSlug: string, category: string, count = 3): PostMeta[] {
  return getAllPosts().filter(p => p.slug !== currentSlug && p.category === category).slice(0, count)
}
