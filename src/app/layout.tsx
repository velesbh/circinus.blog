import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AdsterraSitewide } from '@/components/ui/AdsterraSitewide'

export const metadata: Metadata = {
  title: { default: 'Circinus — Personal Finance & Smart Money Tips', template: '%s | Circinus' },
  description: 'Practical personal finance guides, money-saving strategies, and investment tips to help you build wealth and take control of your financial future.',
  metadataBase: new URL('https://circinus.blog'),
  openGraph: { type: 'website', locale: 'en_US', url: 'https://circinus.blog', siteName: 'Circinus', title: 'Circinus — Personal Finance & Smart Money Tips', description: 'Practical personal finance guides.', images: [{ url: '/og-default.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Circinus — Personal Finance & Smart Money Tips', description: 'Practical personal finance guides.', images: ['/og-default.png'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' } },
  alternates: { canonical: 'https://circinus.blog' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="adsterra-site-verification" content={process.env.NEXT_PUBLIC_ADSTERRA_VERIFY || ''} />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <AdsterraSitewide />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
