'use client';

import { useState } from 'react';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/quotes', label: 'Quotes' },
  { href: '/testimonies', label: 'Testimonies' },
  { href: '/give', label: 'Give' },
  ];
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none"
      >
        <span
          className={`block w-6 h-px bg-text-primary transition-transform duration-200 origin-center ${
            open ? 'translate-y-[6px] rotate-45' : ''
          }`}
        />
        <span
          className={`block w-6 h-px bg-text-primary transition-opacity duration-200 ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-6 h-px bg-text-primary transition-transform duration-200 origin-center ${
            open ? '-translate-y-[6px] -rotate-45' : ''
          }`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-black-frame border-b border-white/10 shadow-xl z-50">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-text-primary/70 hover:text-accent-gold border-b border-white/5 last:border-0 transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
