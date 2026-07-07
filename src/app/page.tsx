'use client';

import BlurText from "@/components/react-bits/BlurText";
import ClickSpark from "@/components/react-bits/ClickSpark";
import PixelBlast from "@/components/react-bits/PixelBlast";
import PixelCard from "@/components/react-bits/PixelCard";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Cpu, Network, ExternalLink, Shield, Sparkles, FileText, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function Home() {
  const projects = useMemo(() => [
    {
      title: "Recurdo - local-first AI memory engine",
      description: "A private memory layer that indexes files, screenshots, browser activity, chats, and saved links so information can be retrieved through contextual natural-language search instead of exact filenames.",
      tags: ["FastAPI", "React", "FAISS", "SQLite FTS", "local-first"],
      variant: "blue" as const,
      live: "https://recurdo.lakshitsachdeva.tech/",
      icon: FileText
    },
    {
      title: "Athair - trade thesis stress testing",
      description: "An AI-powered engine that pressure-tests trade ideas with thesis decomposition, volatility regime detection, fat-tailed Monte Carlo simulation, and confidence-driven invalidation logic.",
      tags: ["LLM agents", "quant risk", "Monte Carlo", "trading"],
      variant: "blue" as const,
      live: "https://athair.lakshitsachdeva.tech/",
      icon: TrendingUp
    },
    {
      title: "drift - local-first AutoML CLI",
      description: "An open-source AutoML system that turns plain-English and Hinglish requests into trained, validated ML models through structured planning, self-healing retries, and hard reliability gates.",
      tags: ["Python", "FastAPI", "agentic workflows", "AutoML"],
      variant: "blue" as const,
      github: "https://github.com/lakshitsachdeva/intent2model",
      live: "https://drift.lakshitsachdeva.tech/",
      icon: Sparkles
    },
    {
      title: "Smart waste management system",
      description: "A hardware-software co-design build with a fine-tuned ResNet-50, OpenCV-based live inference, Streamlit monitoring, and Arduino-driven servo actuation for automated waste segregation.",
      tags: ["PyTorch", "OpenCV", "Arduino", "computer vision"],
      variant: "blue" as const,
      icon: Cpu
    },
    {
      title: "Financial portfolio management system",
      description: "A full-stack tracker with secure JWT auth, multi-asset portfolio views, real-time performance analytics, and Supabase-backed live updates for holdings and allocations.",
      tags: ["React", "Supabase", "PostgreSQL", "analytics"],
      variant: "blue" as const,
      github: "https://github.com/lakshitsachdeva",
      icon: Network
    },
    {
      title: "CAPTCHA-X benchmark study",
      description: "A synthetic benchmark reliability study showing CAPTCHA recognition performance can collapse under cross-generator transfer, backed by a 160,000-image benchmark and reliability-aware evaluation.",
      tags: ["research", "CNNs", "OOD evaluation", "benchmarking"],
      variant: "blue" as const,
      live: "https://doi.org/10.21203/rs.3.rs-9558596/v1",
      icon: Shield
    }
  ], []);

  const highlights = useMemo(() => [
    {
      label: "current",
      value: "AI intern at Ernst & Young"
    },
    {
      label: "education",
      value: "B.Tech in computer engineering, NMIMS MPSTME"
    },
    {
      label: "recognition",
      value: "Amazon ML Summer School 2025"
    },
    {
      label: "research",
      value: "IEEE conference paper + CAPTCHA-X preprint"
    }
  ], []);

  const skillGroups = useMemo(() => [
    {
      title: "ml / ai",
      items: ["PyTorch", "scikit-learn", "LLM integration", "RAG", "FAISS", "CNNs", "ResNet", "reinforcement learning"]
    },
    {
      title: "backend / data",
      items: ["FastAPI", "Supabase", "PostgreSQL", "SQLite FTS", "SQL", "Node.js"]
    },
    {
      title: "frontend / product",
      items: ["React", "Next.js", "TypeScript", "Streamlit", "Tauri"]
    }
  ], []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white selection:bg-brand selection:text-black">
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 opacity-70" style={{ minHeight: '100vh', height: '100%' }}>
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

      <ClickSpark
        sparkColor='#93C5FD'
        sparkSize={20}
        sparkRadius={35}
        sparkCount={20}
        duration={800}
      >
        <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-12 sm:pb-20 sm:pt-32 lg:px-16">
          {/* Hero Section */}
          <header className="mb-20 flex flex-col gap-10 sm:mb-40 sm:flex-row sm:items-center sm:justify-between sm:gap-16">
            <div className="order-2 flex flex-col gap-6 sm:order-1 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <BlurText 
                  text="hi, i'm lakshit sachdeva" 
                  className="text-4xl font-bold tracking-tighter lowercase sm:text-7xl lg:text-9xl" 
                  delay={100}
                  animateBy="words"
                />
              </motion.div>
            
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="flex flex-wrap gap-4 text-xs font-medium lowercase text-zinc-500 sm:gap-8 sm:text-sm"
              >
                <a href="mailto:Lakshits.official@gmail.com" className="flex items-center gap-2 break-all text-brand transition-colors hover:text-brand/80 sm:break-normal">
                  <Mail size={16} /> lakshits.official@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/lakshitsachdeva" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand transition-colors hover:text-brand/80">
                  <Linkedin size={16} /> linkedin
                </a>
                <a href="https://github.com/lakshitsachdeva" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand transition-colors hover:text-brand/80">
                  <Github size={16} /> github
                </a>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="shrink-0 order-1 sm:order-2"
            >
              <Image
                src="/face.png"
                alt="lakshit sachdeva"
                width={128}
                height={128}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-white/10 ring-2 ring-brand/20"
              />
            </motion.div>
          </header>

          {/* Core Focus Section */}
          <section className="mb-24 max-w-4xl sm:mb-64">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                <p className="text-xl font-light leading-snug text-zinc-300 lowercase sm:text-4xl lg:text-5xl">
                  i'm a computer engineering student at nmims with a 4.0/4.0 cgpa, currently interning in ai at <span className="text-brand font-medium italic px-2 py-1">ernst & young</span> and building local-first systems that retrieve, reason, and stress-test real-world decisions.
                </p>
                <p className="max-w-3xl text-sm font-medium leading-relaxed lowercase text-zinc-400 sm:text-lg">
                  right now i'm spending most of my time on private memory systems, retrieval pipelines, numeric reasoning, and agent workflows that need to be reliable enough for actual use instead of just nice demos.
                  <br />
                  also shipping experiments at{" "}
                  <a
                    href="https://athair.lakshitsachdeva.tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand underline decoration-brand/70 underline-offset-4 transition-colors hover:text-white"
                  >
                    athair
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://recurdo.lakshitsachdeva.tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand underline decoration-brand/70 underline-offset-4 transition-colors hover:text-white"
                  >
                    recurdo
                  </a>
                  .
                </p>
              </div>
            </motion.div>
          </section>

          <section className="mb-24 sm:mb-52">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.7 }}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                    {item.label}
                  </p>
                  <p className="text-base font-medium lowercase leading-relaxed text-zinc-200 sm:text-lg">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* High-Impact Projects */}
          <section className="mb-24 sm:mb-64">
            <div className="mb-10 flex items-end justify-between sm:mb-16">
              <div>
                <h3 className="text-3xl font-bold lowercase sm:text-4xl">selected work</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group"
                >
                  <PixelCard variant={project.variant} speed={300} className="w-full !h-[420px] sm:!h-[520px] lg:!h-[560px] transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/60 to-transparent p-5 sm:inset-x-0 sm:bottom-0 sm:top-auto sm:min-h-[480px] sm:justify-start sm:p-8">
                      <div className="flex flex-col gap-3 items-start w-full min-w-0">
                        <div className="w-12 h-12 flex items-center justify-center shrink-0 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                          {(() => {
                            const IconComponent = project.icon;
                            return <IconComponent size={24} className="text-blue-400 shrink-0" />;
                          })()}
                        </div>
                        <h3 className="w-full break-words text-left text-2xl font-bold leading-tight lowercase transition-colors group-hover:text-brand sm:text-3xl">
                          {project.title}
                        </h3>
                        <p className="w-full break-words text-left text-sm font-medium leading-relaxed lowercase text-zinc-400 line-clamp-4 sm:line-clamp-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 sm:gap-3 w-full">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 bg-zinc-900/80 text-zinc-300 rounded-full border border-white/5 backdrop-blur-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-3 sm:gap-4">
                          {"live" in project && project.live && (
                            <a 
                              href={project.live} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="pointer-events-auto inline-flex items-center gap-2 text-sm font-medium lowercase text-white transition-colors hover:text-brand"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={16} className="shrink-0" /> live
                            </a>
                          )}
                          {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="pointer-events-auto inline-flex items-center gap-2 text-sm font-medium lowercase text-white transition-colors hover:text-brand"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github size={16} className="shrink-0" /> repo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </PixelCard>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-24 sm:mb-56">
            <div className="mb-10 flex items-end justify-between sm:mb-16">
              <div>
                <h3 className="text-3xl font-bold lowercase sm:text-4xl">toolkit</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {skillGroups.map((group, index) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.7 }}
                  className="rounded-3xl border border-brand/20 bg-brand/5 p-6 backdrop-blur-sm"
                >
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-brand">
                    {group.title}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wide text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="border-t border-white/5 py-20 sm:py-32">
            <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:gap-12">
              <h2 className="text-center text-3xl font-bold tracking-tighter lowercase sm:text-5xl md:text-left md:text-6xl">
                wanna build something? <br />
                <span className="text-zinc-500">let's connect</span>
              </h2>
              <Link href="mailto:Lakshits.official@gmail.com" className="rounded-full bg-white px-8 py-4 text-sm font-medium lowercase text-black transition-all hover:scale-105 hover:bg-brand active:scale-95 sm:px-12 sm:py-6 sm:text-base">
                say hi
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col items-center justify-between gap-6 pt-14 text-[10px] font-medium lowercase text-zinc-500 sm:flex-row sm:gap-8 sm:pt-24">
            <p>© 2026 lakshit sachdeva</p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
              <Link href="/blog" className="hover:text-white transition-colors">journal</Link>
              <Link href="/experience" className="hover:text-white transition-colors">history</Link>
              <Link href="/about" className="hover:text-white transition-colors">about</Link>
            </div>
          </footer>
        </main>
      </ClickSpark>

      {/* Custom Styles for Components */}
      <style jsx global>{`
        .pixel-blast-container {
          filter: grayscale(1) contrast(1.2);
          width: 100% !important;
          height: 100% !important;
          min-height: 100vh !important;
        }
        @media (max-width: 768px) {
          .pixel-blast-container {
            min-height: 100vh !important;
            height: 100vh !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
          }
        }
        .pixel-card {
          border-color: #18181b !important;
          background: #000 !important;
        }
        .pixel-card:hover {
          border-color: #B19EEF !important;
        }
        .text-brand {
          color: #B19EEF;
        }
        .bg-brand {
          background-color: #B19EEF;
        }
        .decoration-brand {
          text-decoration-color: #B19EEF;
        }
      `}</style>
    </div>
  );
}
