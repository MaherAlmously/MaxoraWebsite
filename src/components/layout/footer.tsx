import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/products';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo-mark.png" alt="Maxora" width={32} height={32} className="rounded-md" />
            <span className="font-heading text-lg font-semibold tracking-wide">Maxora</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Websites, branding, and digital growth for businesses that want to stand out. Built
            fast, built right.
          </p>
        </div>

        <div>
          <h3 className="eyebrow mb-4">Services</h3>
          <ul className="space-y-2.5 text-sm">
            {products.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/services/${p.slug}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
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
              <Link href="/services" className="text-muted-foreground transition-colors hover:text-foreground">
                All Services
              </Link>
            </li>
            <li>
              <Link href="/pay" className="text-muted-foreground transition-colors hover:text-foreground">
                Custom Payment
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/account" className="text-muted-foreground transition-colors hover:text-foreground">
                My Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Maxora. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
