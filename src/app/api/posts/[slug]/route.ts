import { NextRequest, NextResponse } from 'next/server'
import { isAuthorized } from '@/lib/auth'
import { getPostBySlug } from '@/lib/posts'
import fs from 'fs'
import path from 'path'

const postsDir = path.join(process.cwd(), 'content/posts')

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const post = getPostBySlug(params.slug)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ post })
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const mdPath = path.join(postsDir, `${params.slug}.md`)
  const mdxPath = path.join(postsDir, `${params.slug}.mdx`)
  const filePath = fs.existsSync(mdPath) ? mdPath : fs.existsSync(mdxPath) ? mdxPath : null
  if (!filePath) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  fs.unlinkSync(filePath)
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { title, description, content, category, tags, author, featured, coverImage, affiliateDisclosure } = body
  const existing = getPostBySlug(params.slug)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const frontmatter = ['---', `title: "${(title || existing.title).replace(/"/g, '\\"')}"`, `description: "${(description || existing.description).replace(/"/g, '\\"')}"`, `date: "${existing.date}"`, `category: "${category || existing.category}"`, `tags: [${(tags || existing.tags).map((t: string) => `"${t}"`).join(', ')}]`, `author: "${author || existing.author}"`, `featured: ${Boolean(featured !== undefined ? featured : existing.featured)}`, `affiliateDisclosure: ${Boolean(affiliateDisclosure !== undefined ? affiliateDisclosure : existing.affiliateDisclosure)}`, (coverImage || existing.coverImage) ? `coverImage: "${coverImage || existing.coverImage}"` : null, '---'].filter(Boolean).join('\n')
  fs.writeFileSync(path.join(postsDir, `${params.slug}.md`), `${frontmatter}\n\n${content || existing.content}`, 'utf8')
  return NextResponse.json({ ok: true, slug: params.slug })
}
