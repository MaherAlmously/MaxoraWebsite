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
import { Toaster } from '@/components/ui/sonner';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Maxora | Software, Web, Mobile & Desktop Development',
    template: '%s | Maxora',
  },
  description:
    'Software development, web, mobile, and desktop apps for businesses that want to stand out. Built fast, built right.',
  icons: { icon: '/logo-mark.png' },
  openGraph: {
    title: 'Maxora',
    description:
      'Software development, web, mobile, and desktop apps for businesses that want to stand out. Built fast, built right.',
    images: ['/maxora-logo.jpg'],
  },
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
        </CartProvider>
        <Toaster position="bottom-right" />
        <MicrosoftClarity />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
