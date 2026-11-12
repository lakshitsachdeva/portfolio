'use client';

import HalftonePortrait from "@/components/HalftonePortrait";
import { EASE, EMAIL, PixelField, RisingLine, SectionLabel, Sparks, socials } from "@/components/site";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

const projects = [
  {
    name: "recurdo",
    kind: "local-first ai memory engine",
    description: "a private memory layer that indexes files, screenshots, browser activity, chats, and saved links so information can be retrieved through contextual natural-language search instead of exact filenames.",
    tags: ["FastAPI", "React", "FAISS", "SQLite FTS", "local-first"],
    live: "https://recurdo.lakshitsachdeva.tech/",
  },
  {
    name: "athair",
    kind: "trade thesis stress testing",
    description: "an ai-powered engine that pressure-tests trade ideas with thesis decomposition, volatility regime detection, fat-tailed monte carlo simulation, and confidence-driven invalidation logic.",
    tags: ["LLM agents", "quant risk", "Monte Carlo", "trading"],
    live: "https://athair.lakshitsachdeva.tech/",
  },
  {
    name: "drift",
    kind: "local-first automl cli",
    description: "an open-source automl system that turns plain-english and hinglish requests into trained, validated ml models through structured planning, self-healing retries, and hard reliability gates.",
    tags: ["Python", "FastAPI", "agentic workflows", "AutoML"],
    live: "https://drift.lakshitsachdeva.tech/",
    github: "https://github.com/lakshitsachdeva/intent2model",
  },
  {
    name: "captcha-x",
    kind: "benchmark reliability study",
    description: "a synthetic benchmark reliability study showing captcha recognition performance can collapse under cross-generator transfer, backed by a 160,000-image benchmark and reliability-aware evaluation.",
    tags: ["research", "CNNs", "OOD evaluation", "benchmarking"],
    live: "https://doi.org/10.21203/rs.3.rs-9558596/v1",
    liveLabel: "paper",
  },
  {
    name: "smart waste",
    kind: "hardware-software waste segregation",
    description: "a hardware-software co-design build with a fine-tuned resnet-50, opencv-based live inference, streamlit monitoring, and arduino-driven servo actuation for automated waste segregation.",
    tags: ["PyTorch", "OpenCV", "Arduino", "computer vision"],
  },
  {
    name: "investtrack",
    kind: "financial portfolio management system",
    description: "a full-stack tracker with secure jwt auth, multi-asset portfolio views, real-time performance analytics, and supabase-backed live updates for holdings and allocations.",
    tags: ["React", "Supabase", "PostgreSQL", "analytics"],
    github: "https://github.com/lakshitsachdeva",
  },
] as const satisfies readonly {
  name: string;
  kind: string;
  description: string;
  tags: readonly string[];
  live?: string;
  liveLabel?: string;
  github?: string;
}[];

const highlights = [
  { label: "now", value: "agent evals at parsewave + llm research with uiuc" },
  { label: "base", value: "mumbai" },
  { label: "focus", value: "evaluation, retrieval, local-first systems" },
  { label: "side quests", value: "research, products, open source" },
];

const skillGroups = [
  { title: "ml / ai", items: ["PyTorch", "scikit-learn", "LLM integration", "RAG", "FAISS", "CNNs", "ResNet", "reinforcement learning"] },
  { title: "backend / data", items: ["FastAPI", "Supabase", "PostgreSQL", "SQLite FTS", "SQL", "Node.js"] },
  { title: "frontend / product", items: ["React", "Next.js", "TypeScript", "Streamlit", "Tauri"] },
];

const statement: { text: string; accent?: boolean }[] = [
  { text: "i build machine learning products, retrieval systems, and weirdly specific tools that feel useful the second you touch them. currently building agent evals at" },
  { text: "parsewave,", accent: true },
  { text: "doing llm research with" },
  { text: "uiuc,", accent: true },
  { text: "and shipping things on my own." },
];

function MumbaiClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--:--"} ist</span>;
}

function RevealWord({ children, progress, range, accent }: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "font-medium italic text-brand" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = statement.flatMap((part) => part.text.split(" ").map((word) => ({ word, accent: part.accent })));
  return (
    <p ref={ref} className="max-w-[22ch] text-[clamp(1.75rem,4.6vw,4.75rem)] font-light lowercase leading-[1.06] tracking-[-0.035em] text-white sm:max-w-none">
      {words.map((w, i) => (
        <RevealWord
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 4) / words.length)]}
          accent={w.accent}
        >
          {w.word}
        </RevealWord>
      ))}
    </p>
  );
}

function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div onPointerMove={onMove} onPointerLeave={reset} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-black text-white selection:bg-brand selection:text-black">
      <PixelField />

      <Sparks>
        <main className="relative z-10">
          <header className="relative mx-auto flex min-h-[100svh] w-full max-w-[1680px] flex-col px-4 pb-6 pt-20 sm:px-10 sm:pb-8 sm:pt-28">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 1 }}
              className="absolute inset-x-4 top-9 hidden items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 md:flex sm:inset-x-10"
            >
              <span>portfolio — 2026</span>
              <span className="flex items-center gap-3">
                <span>mumbai</span>
                <span className="text-zinc-300"><MumbaiClock /></span>
              </span>
            </motion.div>

            <div className="relative mx-auto mt-2 aspect-[172/197] w-[min(64vw,36svh)] md:absolute md:right-[5vw] md:top-[11svh] md:mx-0 md:mt-0 md:h-[min(62svh,46vw)] md:w-auto">
              <HalftonePortrait className="h-full w-full" />
            </div>

            <div className="pointer-events-none relative mt-auto">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
                className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 sm:mb-5 sm:text-xs"
              >
                <span className="text-brand">(</span>hi, i&apos;m<span className="text-brand">)</span>
              </motion.p>
              <h1
                aria-label="lakshit sachdeva"
                className="text-[min(22vw,33svh)] md:text-[min(18.4vw,33svh)] font-bold lowercase leading-[0.8] tracking-[-0.07em] mix-blend-difference md:-ml-[0.04em]"
              >
                <RisingLine text="lakshit" delay={0.2} />
                <RisingLine text="sachdeva" delay={0.38} className="hero-outline" />
              </h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.9, ease: EASE }}
              className="mt-6 grid grid-cols-1 gap-5 border-t border-white/10 pt-5 sm:mt-8 md:grid-cols-[1.4fr_1fr_auto] md:items-end md:gap-10"
            >
              <p className="max-w-xl text-sm lowercase leading-relaxed text-zinc-300 sm:text-base">
                ml products, retrieval systems, and weirdly specific tools.
                agent evals at <span className="text-brand">parsewave</span>, llm research with <span className="text-brand">uiuc</span>.
              </p>
              <nav aria-label="contact" className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="link-sweep group inline-flex items-center gap-1 text-zinc-200 transition-colors hover:text-brand"
                  >
                    {s.label}
                    <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </nav>
              <a href="#about" className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500 transition-colors hover:text-white md:inline-flex">
                scroll <ArrowDown size={12} className="scroll-cue" />
              </a>
            </motion.div>
          </header>

          <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-10">
            <section id="about" className="scroll-mt-24 py-24 sm:py-44">
              <SectionLabel index="01" title="about" meta="what i do" />
              <Statement />
              <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-20 md:grid-cols-[1fr_1.3fr] md:gap-16">
                <p className="max-w-lg text-sm lowercase leading-relaxed text-zinc-400 sm:text-base">
                  most of what i like sits somewhere between software, ml, and product taste. private memory, numeric reasoning, agent workflows, interfaces that make complicated systems feel obvious. also shipping experiments at{" "}
                  <a href="https://athair.lakshitsachdeva.tech/" target="_blank" rel="noopener noreferrer" className="link-sweep text-brand">athair</a>{" "}
                  and{" "}
                  <a href="https://recurdo.lakshitsachdeva.tech/" target="_blank" rel="noopener noreferrer" className="link-sweep text-brand">recurdo</a>.
                </p>
                <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                  {highlights.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ delay: i * 0.07, duration: 0.7, ease: EASE }}
                      className="border-t border-white/10 py-5"
                    >
                      <dt className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{item.label}</dt>
                      <dd className="text-base lowercase leading-snug text-zinc-100 sm:text-lg">{item.value}</dd>
                    </motion.div>
                  ))}
                </dl>
              </div>
            </section>

            <section id="work" className="scroll-mt-24 pb-24 sm:pb-44">
              <SectionLabel index="02" title="selected work" meta={`${String(projects.length).padStart(2, "0")} projects`} />
              <ul className="border-b border-white/10">
                {projects.map((project, i) => (
                  <motion.li
                    key={project.name}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="work-row group relative grid grid-cols-[2.25rem_1fr] gap-x-3 gap-y-4 border-t border-white/10 py-7 sm:grid-cols-[4rem_1fr] sm:py-10 lg:grid-cols-[5rem_1.1fr_1.2fr_auto] lg:items-start lg:gap-x-10"
                  >
                    <span className="pt-2 font-mono text-[11px] tracking-[0.18em] text-zinc-600 transition-colors duration-300 group-hover:text-brand sm:pt-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 transition-transform duration-500 ease-out lg:group-hover:translate-x-3">
                      <h3 className="text-[clamp(2.25rem,5.4vw,5rem)] font-bold lowercase leading-[0.9] tracking-[-0.055em] transition-colors duration-300 group-hover:text-brand">
                        {project.name}
                      </h3>
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">{project.kind}</p>
                    </div>
                    <div className="col-start-2 lg:col-start-3 lg:pt-3">
                      <p className="max-w-xl text-sm lowercase leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200 sm:text-[15px]">
                        {project.description}
                      </p>
                      <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-zinc-500">
                        {project.tags.join("  ·  ")}
                      </p>
                    </div>
                    <div className="col-start-2 flex flex-wrap gap-2 lg:col-start-4 lg:w-28 lg:flex-col lg:items-end lg:pt-3">
                      {"live" in project && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pill inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-black"
                        >
                          {"liveLabel" in project ? project.liveLabel : "live"} <ArrowUpRight size={12} />
                        </a>
                      )}
                      {"github" in project && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pill inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-black"
                        >
                          repo <ArrowUpRight size={12} />
                        </a>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </section>
          </div>

          <section id="toolkit" className="pb-24 sm:pb-44">
            <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-10">
              <SectionLabel index="03" title="toolkit" meta="things i reach for" />
            </div>
            <div className="border-b border-white/10">
              {skillGroups.map((group, gi) => (
                <div key={group.title} className="marquee relative flex items-center overflow-hidden border-t border-white/10 py-5 sm:py-7">
                  <span className="absolute left-0 top-0 z-10 bg-black px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-brand sm:px-10">
                    {group.title}
                  </span>
                  <div className={`marquee-track flex shrink-0 items-center pt-4 ${gi % 2 ? "marquee-reverse" : ""}`} style={{ animationDuration: `${group.items.length * 5.5}s` }}>
                    {[0, 1, 2, 3].map((copy) => (
                      <ul key={copy} aria-hidden={copy > 0} className="flex shrink-0 items-center">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-center whitespace-nowrap text-[clamp(2rem,5vw,4.5rem)] font-bold lowercase leading-none tracking-[-0.05em] text-zinc-200">
                            {item}
                            <span className="mx-5 text-brand/70 sm:mx-8">/</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="mx-auto w-full max-w-[1680px] px-4 pb-10 sm:px-10">
            <SectionLabel index="04" title="contact" meta="wanna build something?" />
            <div className="relative">
              <h2 className="text-[21vw] md:text-[min(13.6vw,15rem)] font-bold lowercase leading-[0.82] tracking-[-0.07em]">
                <span className="block">let&apos;s</span>
                <span className="hero-outline block">connect</span>
              </h2>
              <Magnetic className="mt-10 w-fit md:absolute md:right-[4%] md:top-1/2 md:mt-0 md:-translate-y-1/2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex h-36 w-36 items-center justify-center gap-1.5 rounded-full bg-brand text-sm font-medium lowercase text-black transition-transform duration-300 hover:scale-105 active:scale-95 sm:h-48 sm:w-48 sm:text-base"
                >
                  say hi
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
            </div>
            <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
              <a href={`mailto:${EMAIL}`} className="link-sweep w-fit break-all text-lg lowercase text-zinc-100 hover:text-brand sm:text-2xl">
                {EMAIL}
              </a>
              <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                {socials.slice(1).map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-sweep transition-colors hover:text-brand">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <footer className="mt-16 flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 lakshit sachdeva</p>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                <Link href="/blog" className="transition-colors hover:text-white">journal</Link>
                <Link href="/experience" className="transition-colors hover:text-white">history</Link>
                <Link href="/about" className="transition-colors hover:text-white">about</Link>
                <a href="#" className="transition-colors hover:text-white">back to top ↑</a>
              </div>
            </footer>
          </section>
        </main>
      </Sparks>
    </div>
  );
}
