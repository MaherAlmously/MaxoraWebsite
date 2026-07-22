'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingCart, User } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/pay', label: 'Custom Payment' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { count, ready, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo-mark.png"
            alt="Maxora"
            width={36}
            height={36}
            className="rounded-md"
            priority
          />
          <span className="font-heading text-lg font-semibold tracking-wide">Maxora</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm transition-colors',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open cart"
            className="relative"
            onClick={openDrawer}
          >
            <ShoppingCart className="size-5" />
            {ready && count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-[0.65rem] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Button>

          <Button variant="ghost" size="icon" asChild aria-label="Account">
            <Link href={user ? '/account' : '/login'}>
              <User className="size-5" />
            </Link>
          </Button>

          <Button asChild size="sm" className="hidden glow md:inline-flex">
            <Link href="/services">Get Started</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="glass inset-0 h-dvh w-full max-w-none border-0 data-[side=right]:border-0 sm:max-w-none"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col justify-center px-8 py-16">
                <nav className="flex flex-col items-center gap-3 text-center">
                  {links.map((link, i) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'w-full rounded-xl px-4 py-4 font-heading text-2xl font-semibold transition-colors',
                        pathname === link.href
                          ? 'text-primary'
                          : 'text-foreground hover:text-primary',
                      )}
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href={user ? '/account' : '/login'}
                    onClick={() => setMobileOpen(false)}
                    className="w-full rounded-xl px-4 py-4 font-heading text-2xl font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {user ? 'My Account' : 'Log In'}
                  </Link>
                </nav>

                <Button
                  asChild
                  size="lg"
                  className="glow mt-10 w-full max-w-xs self-center"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link href="/services">Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
