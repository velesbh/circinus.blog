import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-bold text-white mb-3 inline-block">✦ Circinus</Link>
            <p className="text-sm leading-relaxed max-w-sm">Practical personal finance guides, money-saving strategies, and investment tips to help you build wealth.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Topics</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/budgeting" className="hover:text-white transition-colors">Budgeting</Link></li>
              <li><Link href="/category/investing" className="hover:text-white transition-colors">Investing</Link></li>
              <li><Link href="/category/saving" className="hover:text-white transition-colors">Saving Money</Link></li>
              <li><Link href="/category/debt" className="hover:text-white transition-colors">Debt Freedom</Link></li>
              <li><Link href="/category/side-income" className="hover:text-white transition-colors">Side Income</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Site</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-white transition-colors">Affiliate Disclosure</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
          <p>&copy; {new Date().getFullYear()} Circinus. All rights reserved.</p>
          <p>This site may contain affiliate links. <Link href="/affiliate-disclosure" className="underline hover:text-white">Read our disclosure</Link>.</p>
        </div>
      </div>
    </footer>
  )
}
