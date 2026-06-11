import Link from 'next/link'

export function AffiliateDisclosure() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-sm text-amber-800">
      <strong>Affiliate Disclosure:</strong> This article contains affiliate links. If you click and make a purchase, we may earn a commission at no extra cost to you.{' '}
      <Link href="/affiliate-disclosure" className="underline hover:text-amber-900">Read our full disclosure.</Link>
    </div>
  )
}
