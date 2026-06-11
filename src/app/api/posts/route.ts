import { NextRequest, NextResponse } from 'next/server'
import { isAuthorized } from '@/lib/auth'
import { getAllPosts } from '@/lib/posts'
import fs from 'fs'
import path from 'path'

const postsDir = path.join(process.cwd(), 'content/posts')

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ posts: getAllPosts() })
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { title, description, content, category, tags, author, featured, coverImage, affiliateDisclosure, slug: providedSlug } = body
  if (!title || !content) return NextResponse.json({ error: 'title and content are required' }, { status: 400 })
  const slug = providedSlug || title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
  const date = new Date().toISOString()
  const frontmatter = ['---', `title: "${title.replace(/"/g, '\\"')}"`, `description: "${(description || '').replace(/"/g, '\\"')}"`, `date: "${date}"`, `category: "${category || 'General'}"`, `tags: [${(tags || []).map((t: string) => `"${t}"`).join(', ')}]`, `author: "${author || 'Circinus Editorial'}"`, `featured: ${Boolean(featured)}`, `affiliateDisclosure: ${Boolean(affiliateDisclosure)}`, coverImage ? `coverImage: "${coverImage}"` : null, '---'].filter(Boolean).join('\n')
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true })
  fs.writeFileSync(path.join(postsDir, `${slug}.md`), `${frontmatter}\n\n${content}`, 'utf8')
  return NextResponse.json({ ok: true, slug })
}
