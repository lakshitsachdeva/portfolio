'use client';

import { EASE, PageHeader, PageShell, SectionLabel } from "@/components/site";
import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <PageShell>
      <PageHeader label="writing" title="journal" sub="thoughts, experiments, and things i'm learning" descender />

      <section>
        <SectionLabel index="00" title="entries" meta="none yet" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
          className="border-y border-white/10 py-10 sm:py-16"
        >
          <p className="hero-outline text-[clamp(2.75rem,10vw,10rem)] font-bold lowercase leading-[0.9] tracking-[-0.06em]">
            coming soon.
          </p>
          <p className="mt-6 max-w-xl text-sm lowercase leading-relaxed text-zinc-400 sm:mt-8 sm:text-base">
            i&apos;m still setting this up — will start posting writeups, experiments, and little breakdowns here.
          </p>
        </motion.div>
      </section>
    </PageShell>
  );
}
