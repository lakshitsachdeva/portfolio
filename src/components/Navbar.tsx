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
  { name: 'Resume', path: '/resume.pdf', external: true },
] as const;

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 py-2 px-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full">
      <ul className="flex items-center gap-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              {...("external" in item && item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={cn(
                "relative px-4 py-2 text-xs font-medium lowercase transition-colors",
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
