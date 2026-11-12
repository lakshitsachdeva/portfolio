'use client';

import ClickSpark from "@/components/react-bits/ClickSpark";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { ReactNode } from "react";

const PixelBlast = dynamic(() => import("@/components/react-bits/PixelBlast"), { ssr: false });

export const EMAIL = "lakshits.official@gmail.com";
export const EASE = [0.2, 0.8, 0.2, 1] as const;

export const socials = [
  { label: "email", href: `mailto:${EMAIL}` },
  { label: "linkedin", href: "https://www.linkedin.com/in/lakshitsachdeva" },
  { label: "github", href: "https://github.com/lakshitsachdeva" },
];

export function PixelField({ className = "opacity-35" }: { className?: string }) {
  return (
    <div className={`pixel-field pointer-events-none fixed inset-0 z-0 ${className}`}>
      <PixelBlast
        variant="square"
        pixelSize={5}
        color="#B19EEF"
        patternScale={2}
        patternDensity={0.8}
        enableRipples={false}
        transparent
        speed={2}
        antialias={false}
      />
    </div>
  );
}

export function Sparks({ children }: { children: ReactNode }) {
  return (
    <ClickSpark sparkColor="#B19EEF" sparkSize={14} sparkRadius={30} sparkCount={12} duration={600}>
      {children}
    </ClickSpark>
  );
}

export function RisingLine({ text, delay = 0, className, descender }: {
  text: string;
  delay?: number;
  className?: string;
  descender?: boolean;
}) {
  const clip = descender ? "[clip-path:inset(-20%_-10%_-30%_-10%)]" : "[clip-path:inset(-20%_-10%_0_-10%)]";
  return (
    <span aria-hidden className={`block ${clip} ${className ?? ""}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          initial={{ y: descender ? "150%" : "112%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: delay + i * 0.045, ease: EASE }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

export function SectionLabel({ index, title, meta }: { index: string; title: string; meta?: string }) {
  return (
    <div className="mb-8 flex items-baseline justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 sm:mb-12">
      <h2 className="flex items-baseline gap-3">
        <span className="text-brand">({index})</span>
        <span className="text-zinc-300">{title}</span>
      </h2>
      {meta && <span className="text-right">{meta}</span>}
    </div>
  );
}

export function PageHeader({ label, title, sub, descender }: {
  label: string;
  title: string;
  sub?: string;
  descender?: boolean;
}) {
  return (
    <header className="pb-16 pt-28 sm:pb-28 sm:pt-40">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
        className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 sm:mb-5 sm:text-xs"
      >
        <span className="text-brand">(</span>{label}<span className="text-brand">)</span>
      </motion.p>
      <h1 aria-label={title} className="text-[min(25vw,17rem)] font-bold lowercase leading-[0.8] tracking-[-0.07em] md:-ml-[0.04em]">
        <RisingLine text={title} delay={0.15} descender={descender} />
      </h1>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
          className={`border-t border-white/10 pt-5 text-sm lowercase leading-relaxed text-zinc-300 sm:text-base ${descender ? "mt-10 sm:mt-16" : "mt-6 sm:mt-8"}`}
        >
          {sub}
        </motion.p>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 flex flex-col gap-4 border-t border-white/10 pb-10 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:mt-32 sm:flex-row sm:items-center sm:justify-between">
      <p>© 2026 lakshit sachdeva</p>
      <div className="flex flex-wrap gap-x-8 gap-y-2">
        <Link href="/" className="transition-colors hover:text-white">home</Link>
        <Link href="/about" className="transition-colors hover:text-white">about</Link>
        <Link href="/experience" className="transition-colors hover:text-white">history</Link>
        <Link href="/blog" className="transition-colors hover:text-white">journal</Link>
        <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-brand">say hi ↗</a>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-black text-white selection:bg-brand selection:text-black">
      <PixelField className="opacity-25" />
      <Sparks>
        <main className="relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-10">
          {children}
          <SiteFooter />
        </main>
      </Sparks>
    </div>
  );
}
