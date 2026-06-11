import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Privacy policy for Circinus.blog' }

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose-custom space-y-5">
        <h2>Information we collect</h2>
        <p>We collect minimal information: basic analytics data and email addresses if you subscribe to our newsletter.</p>
        <h2>Third-party advertising</h2>
        <p>This site uses Adsterra to display advertisements. Adsterra may use cookies to serve relevant ads. See <a href="https://www.adsterra.com/privacy-policy/" target="_blank" rel="noopener">Adsterra's privacy policy</a>.</p>
        <h2>Cookies</h2>
        <p>This site uses cookies for advertising purposes. You can disable cookies in your browser settings.</p>
      </div>
    </div>
  )
}
