import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Affiliate Disclosure', description: 'Our affiliate disclosure and editorial policy at Circinus.' }

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Affiliate Disclosure</h1>
      <div className="prose-custom space-y-5">
        <p>Circinus participates in various affiliate programs. Some links on this site are affiliate links. If you click and purchase, we may receive a commission at no additional cost to you.</p>
        <h2>Our editorial standards</h2>
        <p>We only recommend products and services that we believe will genuinely help our readers. Affiliate relationships do not influence our recommendations.</p>
        <h2>Advertising</h2>
        <p>This site displays third-party advertisements through Adsterra. These do not represent editorial endorsements.</p>
      </div>
    </div>
  )
}
