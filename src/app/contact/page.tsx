import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Contact', description: 'Get in touch with the Circinus team.' }

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact</h1>
      <p className="text-gray-500 mb-8">Questions, suggestions, corrections, or partnership inquiries.</p>
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-gray-600 text-sm space-y-2">
        <p>Editorial questions: <strong>hello@circinus.blog</strong></p>
        <p>Advertising inquiries: <strong>ads@circinus.blog</strong></p>
      </div>
    </div>
  )
}
