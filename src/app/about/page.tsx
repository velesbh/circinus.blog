import type { Metadata } from 'next'
import Link from 'next/link'
import { NewsletterInline } from '@/components/ui/NewsletterInline'

export const metadata: Metadata = {
  title: 'About Circinus',
  description: 'Circinus is a personal finance blog helping everyday people take control of their money through practical, jargon-free guides.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">About Circinus</h1>
      <p className="text-xl text-gray-500 mb-10 leading-relaxed">Personal finance without the jargon.</p>
      <div className="prose-custom space-y-6">
        <p>Circinus was built on a simple frustration: most personal finance content is either too generic to be useful, or so full of financial jargon that it ends up confusing rather than helping.</p>
        <p>We cover budgeting, investing, saving, side income, and debt management — with the goal of giving you practical, actionable steps you can actually use.</p>
        <h2>What you will find here</h2>
        <ul>
          <li>Step-by-step budgeting frameworks that fit different income levels</li>
          <li>Plain-English explanations of investing concepts (index funds, IRAs, compound interest)</li>
          <li>Honest reviews of financial tools and services we have actually tested</li>
          <li>Side income strategies grounded in what is actually working in 2025</li>
          <li>Debt payoff plans with real numbers</li>
        </ul>
        <h2>Affiliate disclosure</h2>
        <p>Some articles on Circinus contain affiliate links. We only recommend products and services we would genuinely use ourselves. Read our full <Link href="/affiliate-disclosure">affiliate disclosure</Link>.</p>
      </div>
      <div className="mt-12"><NewsletterInline /></div>
    </div>
  )
}
