import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

const links = [
  { href: '/', label: 'Home' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/quotes', label: 'Quotes' },
  { href: '/testimonies', label: 'Testimonies' },
  { href: '/give', label: 'Give' },
  ];
export default function Nav() {
  return (
    <nav className="bg-black-frame sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Logo + name */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <Image
            src="/images/logo.png"
            alt="Ruach Dominion Embassy logo"
            width={36}
            height={36}
            className="object-contain rounded-sm"
          />
          <span className="text-text-primary text-sm font-semibold tracking-wide group-hover:text-accent-gold transition-colors duration-200">
            Ruach Dominion Embassy
          </span>
        </Link>

        {/* Desktop nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link text-sm text-text-primary/70 hover:text-text-primary transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger — hidden on md+ */}
        <MobileMenu />
      </div>
    </nav>
  );
}
