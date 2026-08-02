import Link from 'next/link';
import Image from 'next/image';
import { getProduct } from '@/lib/products';
import { SITE_DESCRIPTION } from '@/lib/site';

const footerServiceSlugs = [
  'website-development',
  'saas-development',
  'app-development',
  'website-care-plan',
] as const;

export function Footer() {
  const footerServices = footerServiceSlugs
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <footer className="border-border bg-card/40 border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-mark.png"
              alt="Maxora"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="font-heading text-lg font-semibold tracking-wide">Maxora</span>
          </Link>
          <p className="text-muted-foreground mt-4 max-w-sm text-sm">{SITE_DESCRIPTION}</p>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Services</h3>
          <ul className="space-y-2.5 text-sm">
            {footerServices.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/services/${p.slug}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Company</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                href="/services"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                All Services
              </Link>
            </li>
            <li>
              <Link
                href="/pay"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Custom Payment
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/account"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                My Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col-reverse items-center gap-3 px-4 py-5 text-xs sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} Maxora. All rights reserved. Developed by{' '}
            <Link
              href="https://maxora.tech"
              className="hover:text-foreground font-medium transition-colors"
            >
              maxora.tech
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
