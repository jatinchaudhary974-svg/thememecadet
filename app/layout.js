import { Inter, Playfair_Display, JetBrains_Mono, Homemade_Apple } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['300', '400', '500', '600'],
})

const signature = Homemade_Apple({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-signature',
  weight: ['400'],
})

export const metadata = {
  metadataBase: new URL('https://thememecadet.in'),
  title: {
    default: 'THEMEMECADET — Vision to Execution',
    template: '%s — THEMEMECADET',
  },
  description:
    'THEMEMECADET — official headquarters. A premium creator brand built on discipline, creativity and meaningful short-form content. VEER BHOGYA VASUNDHARA. Established October 2025.',
  applicationName: 'THEMEMECADET',
  authors: [{ name: 'THEMEMECADET' }],
  creator: 'THEMEMECADET',
  publisher: 'THEMEMECADET',
  keywords: [
    'THEMEMECADET', 'MEMECADET', 'the meme cadet',
    'Vision to Execution', 'VEER BHOGYA VASUNDHARA',
    'creator brand', 'short-form content', 'YouTube Shorts',
    'YouTube creator', 'premium creator brand', 'meme cadet'
  ],
  icons: {
    icon: [
      { url: '/logo-boxed.png', type: 'image/png' },
    ],
    shortcut: '/logo-boxed.png',
    apple: '/logo-boxed.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'THEMEMECADET — Vision to Execution',
    description:
      'Official headquarters of THEMEMECADET. A premium creator brand. VEER BHOGYA VASUNDHARA. Established October 2025.',
    url: 'https://thememecadet.in',
    siteName: 'THEMEMECADET',
    type: 'website',
    images: [
      {
        url: '/logo-boxed.png',
        width: 1024,
        height: 1024,
        alt: 'THEMEMECADET — official logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THEMEMECADET — Vision to Execution',
    description: 'Official headquarters of THEMEMECADET. VEER BHOGYA VASUNDHARA.',
    images: ['/logo-boxed.png'],
    creator: '@thememecadet',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport = {
  themeColor: '#050706',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://thememecadet.in/#org',
      name: 'THEMEMECADET',
      alternateName: ['MEMECADET', 'The Meme Cadet'],
      url: 'https://thememecadet.in',
      logo: 'https://thememecadet.com/logo-boxed.png',
      foundingDate: '2025-10',
      slogan: 'Vision to Execution',
      description:
        'A premium creator brand built on discipline, creativity and meaningful short-form content. VEER BHOGYA VASUNDHARA.',
      sameAs: [
        'https://youtube.com/@thememecadet',
        'https://instagram.com/thememecadet',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'thememecadet974@gmail.com',
        contactType: 'General',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://thememecadet.in/#website',
      url: 'https://thememecadet.in',
      name: 'THEMEMECADET',
      publisher: { '@id': 'https://thememecadet.in/#org' },
      inLanguage: 'en',
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${mono.variable} ${signature.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" as="image" href="/logo-boxed.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/logo-transparent.png" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-cadet-ink text-cadet-bone selection:bg-cadet-gold selection:text-cadet-night">
        {children}
      </body>
    </html>
  )
}
