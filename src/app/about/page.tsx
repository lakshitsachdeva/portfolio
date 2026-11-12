'use client';

import { EASE, EMAIL, PageHeader, PageShell, SectionLabel, socials } from "@/components/site";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const paragraphs = [
  "i also work as an independent contractor, providing ai/ml engineering, model evaluation, dataset development, research, and related technical services",
  "most of the fun for me is in taking ideas that could stay academic or half-baked forever and turning them into something sharp, usable, and calm",
  "i've ended up exploring that through products like recurdo, athair, and drift, plus research-heavy work in numeric reasoning, benchmark reliability, and computer vision",
  "i like systems that do more than generate nice looking output. retrieval that actually finds the right thing, reasoning that can be inspected, evaluation that knows when something is shaky",
  "outside product work, i've spent time in research, shipped open-source tools, and worked on everything from solar-cell simulation to captcha benchmarks to local-first memory engines",
  "i also like building around communities and ideas, not just code, which is part of why i keep coming back to open source and student-led technical spaces",
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader label="who" title="about" />

      <section className="pb-20 sm:pb-36">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
          className="text-[clamp(1.6rem,4vw,4rem)] font-light lowercase leading-[1.08] tracking-[-0.035em] text-white"
        >
          i&apos;m lakshit sachdeva. i build things around machine learning, retrieval, and product systems, and right now i&apos;m building agent evaluation infrastructure at{" "}
          <span className="font-medium italic text-brand">parsewave</span> and doing llm interpretability research with{" "}
          <span className="font-medium italic text-brand">uiuc</span>
        </motion.p>
      </section>

      <section className="pb-20 sm:pb-36">
        <SectionLabel index="01" title="the longer version" meta="in no particular order" />
        <ol className="border-b border-white/10">
          {paragraphs.map((text, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="work-row group relative grid grid-cols-[2.25rem_1fr] gap-x-3 border-t border-white/10 py-6 sm:grid-cols-[4rem_1fr] sm:py-9 lg:grid-cols-[5rem_1fr_minmax(0,18rem)] lg:gap-x-10"
            >
              <span className="pt-1 font-mono text-[11px] tracking-[0.18em] text-zinc-600 transition-colors duration-300 group-hover:text-brand sm:pt-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="max-w-3xl text-lg lowercase leading-snug tracking-[-0.01em] text-zinc-300 transition-colors duration-300 group-hover:text-white sm:text-2xl">
                {text}
              </p>
            </motion.li>
          ))}
        </ol>
      </section>

      <section>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-[clamp(2.25rem,7.4vw,8rem)] font-bold lowercase leading-[0.9] tracking-[-0.06em]"
        >
          if it&apos;s technically ambitious, slightly obsessive, and genuinely useful,{" "}
          <span className="hero-outline">i&apos;ll probably want in</span>
        </motion.p>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <a href={`mailto:${EMAIL}`} className="link-sweep w-fit break-all text-lg lowercase text-zinc-100 hover:text-brand sm:text-2xl">
            {EMAIL}
          </a>
          <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            {socials.slice(1).map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-sweep group inline-flex items-center gap-1 transition-colors hover:text-brand">
                {s.label} <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
