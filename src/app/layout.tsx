import type { Metadata } from 'next';
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import { MicrosoftClarity } from '@/components/microsoft-clarity';
import { CartProvider } from '@/lib/cart-context';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { BlackFridayPopup } from '@/components/promo/black-friday-popup';
import { Toaster } from '@/components/ui/sonner';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Maxora | Custom Web & App Development',
    template: '%s | Maxora',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    'web development',
    'custom website development',
    'web app development',
    'mobile app development',
    'cross-platform app development',
    'desktop app development',
    'website maintenance packages',
    'application maintenance',
    'small business software',
    'Dallas web development',
  ],
  category: 'technology',
  alternates: { canonical: '/' },
  icons: { icon: '/logo-mark.png', apple: '/logo-mark.png' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: SITE_URL,
    title: 'Maxora | Custom Web & App Development',
    description: SITE_DESCRIPTION,
    images: [{ url: '/maxora-logo.jpg', alt: 'Maxora' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maxora | Custom Web & App Development',
    description: SITE_DESCRIPTION,
    images: ['/maxora-logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

// Organization schema so Google can build a knowledge panel and link the brand
// name to the site rather than guessing it from page titles.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.png`,
  image: `${SITE_URL}/maxora-logo.jpg`,
  description: SITE_DESCRIPTION,
  areaServed: 'US',
  serviceType: [
    'Web development',
    'Web application development',
    'Mobile app development',
    'Cross-platform app development',
    'Desktop app development',
    'Website and application maintenance',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          // Runs before paint: honors a saved light-mode choice to avoid a flash.
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('maxora-theme')==='light')document.documentElement.classList.remove('dark')}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <CartProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SmoothScrollProvider>
          <CartDrawer />
          <BlackFridayPopup />
        </CartProvider>
        <Toaster position="top-center" />
        <MicrosoftClarity />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
