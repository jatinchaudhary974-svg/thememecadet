import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
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

export const metadata = {
  title: 'THEMEMECADET — Vision to Execution',
  description:
    'THEMEMECADET — Official brand headquarters. VEER BHOGYA VASUNDHARA. A premium creator brand built on discipline, creativity and meaningful short-form content. Established October 2025.',
  keywords: [
    'THEMEMECADET', 'MEMECADET', 'Vision to Execution',
    'VEER BHOGYA VASUNDHARA', 'creator brand', 'short-form content',
    'YouTube creator', 'premium creator brand', 'discipline'
  ],
  metadataBase: new URL('https://thememecadet.com'),
  openGraph: {
    title: 'THEMEMECADET — Vision to Execution',
    description: 'Official headquarters of THEMEMECADET. VEER BHOGYA VASUNDHARA.',
    type: 'website',
    siteName: 'THEMEMECADET',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THEMEMECADET — Vision to Execution',
    description: 'Official headquarters of THEMEMECADET. VEER BHOGYA VASUNDHARA.',
  },
  robots: { index: true, follow: true },
  themeColor: '#050706',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${mono.variable} dark`}>
      <body className="font-sans antialiased bg-cadet-ink text-cadet-bone selection:bg-cadet-gold selection:text-cadet-night">
        {children}
      </body>
    </html>
  )
}
