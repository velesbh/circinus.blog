import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/posts'
import { formatDate } from '@/lib/format'
import { notFound } from 'next/navigation'
import { AdUnit } from '@/components/ui/AdUnit'
import { PostCard } from '@/components/blog/PostCard'
import { AffiliateDisclosure } from '@/components/blog/AffiliateDisclosure'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { NewsletterInline } from '@/components/ui/NewsletterInline'
import type { Metadata } from 'next'
import Link from 'next/link'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: 'article', publishedTime: post.date, authors: [post.author], tags: post.tags, images: post.coverImage ? [{ url: post.coverImage }] : [] },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
    alternates: { canonical: `https://circinus.blog/blog/${params.slug}` },
  }
}

export const revalidate = 3600

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(params.slug, post.category, 3)
  const headings = Array.from(post.content.matchAll(/^#{2,3}\s+(.+)$/gm)).map(m => ({
    text: m[1], level: m[0].startsWith('### ') ? 3 : 2,
    id: m[1].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
  }))

  const htmlContent = post.content
    .replace(/^### (.+)$/gm, '<h3 id="$1">$1</h3>')
    .replace(/^## (.+)$/gm, (_, t) => `<h2 id="${t.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}">${t}</h2>`)
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, s => `<ul>${s}</ul>`)
    .replace(/\n\n/g, '</p><p>')

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: post.title, description: post.description, datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'Circinus', logo: { '@type': 'ImageObject', url: 'https://circinus.blog/logo.png' } },
    image: post.coverImage || 'https://circinus.blog/og-default.png',
    url: `https://circinus.blog/blog/${params.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex gap-10">
          <article className="flex-1 min-w-0">
            <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1.5">
              <Link href="/" className="hover:text-brand-500">Home</Link><span>/</span>
              <Link href="/blog" className="hover:text-brand-500">Blog</Link><span>/</span>
              <Link href={`/category/${post.category.toLowerCase()}`} className="hover:text-brand-500">{post.category}</Link>
            </nav>
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="tag">{post.category}</span>
                {post.tags.slice(0, 2).map(tag => <span key={tag} className="tag bg-gray-100 text-gray-600">{tag}</span>)}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">{post.title}</h1>
              <p className="text-lg text-gray-500 mb-5">{post.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-b border-gray-100 py-3">
                <span>By <strong className="text-gray-600">{post.author}</strong></span>
                <span>·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
            </header>
            {post.coverImage && <div className="mb-8 rounded-xl overflow-hidden"><img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover" /></div>}
            <AdUnit slot="article-top" className="mb-8" />
            {post.affiliateDisclosure && <AffiliateDisclosure />}
            <div className="prose-custom article-body" dangerouslySetInnerHTML={{ __html: `<p>${htmlContent}</p>` }} />
            <AdUnit slot="article-mid" className="my-10" />
            <ShareButtons url={`https://circinus.blog/blog/${params.slug}`} title={post.title} />
            <div className="mt-10"><NewsletterInline /></div>
            <AdUnit slot="article-bottom" className="mt-10" />
          </article>
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-6">
              {headings.length > 2 && <TableOfContents headings={headings} />}
              <AdUnit slot="sidebar-1" variant="rectangle" />
              <AdUnit slot="sidebar-2" variant="rectangle" />
            </div>
          </aside>
        </div>
        {related.length > 0 && (
          <section className="mt-16 border-t border-gray-100 pt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{related.map(p => <PostCard key={p.slug} post={p} />)}</div>
          </section>
        )}
      </div>
    </>
  )
}
