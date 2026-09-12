import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/services';
import { SITE_DESCRIPTION } from '@/lib/site';

export function Footer() {
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
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {service.shortName}
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
                href="/portfolio"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
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
