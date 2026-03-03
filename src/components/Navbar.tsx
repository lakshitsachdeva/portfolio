'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { memo } from 'react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Blog', path: '/blog' },
] as const;

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-3 sm:top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-auto max-w-max py-1.5 sm:py-2 px-1.5 sm:px-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
      <ul className="flex items-center justify-center gap-1 sm:gap-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={cn(
                "relative px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium lowercase transition-colors whitespace-nowrap",
                pathname === item.path ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {pathname === item.path && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-brand/20 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item.name.toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default memo(Navbar);
