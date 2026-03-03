'use client';

import BlurText from "@/components/react-bits/BlurText";
import ClickSpark from "@/components/react-bits/ClickSpark";
import PixelBlast from "@/components/react-bits/PixelBlast";
import PixelCard from "@/components/react-bits/PixelCard";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Cpu, Network, ExternalLink, Smartphone, Shield, Sparkles, FileText, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function Home() {
  const projects = useMemo(() => [
    {
      title: "Athair - AI Trade Stress Testing",
      description: "AI-powered trade stress-testing engine that validates stock trade ideas before capital deployment with institutional-style risk frameworks, regime-aware simulation, and confidence scoring.",
      tags: ["LLM Agents", "Quant Risk", "Monte Carlo", "Trading"],
      variant: "blue" as const,
      live: "https://www.athair.app",
      icon: TrendingUp
    },
    {
      title: "drift-ml: LLM AutoML Agent",
      description: "LLM-guided AutoML agent that uploads CSV files, chats with AI, and gets trained models. Features beautiful charts, model comparison, smart predictions, and Gemini-powered pipeline generation.",
      tags: ["Python", "TypeScript", "AutoML"],
      variant: "blue" as const,
      github: "https://github.com/lakshitsachdeva/intent2model",
      live: "https://drift-ml.vercel.app",
      icon: Sparkles
    },
    {
      title: "Vision-AI Waste Management",
      description: "Deployed a custom ResNet-50 backbone with 95.45% inference accuracy. Engineered real-time edge processing on Arduino for automated industrial waste classification.",
      tags: ["TensorFlow", "OpenCV", "Edge AI", "IoT"],
      variant: "blue" as const,
      github: "https://github.com/lakshitsachdeva",
      icon: Cpu
    },
    {
      title: "Predictive Alpha: Quant Platform",
      description: "Developing a full-stack financial engine with real-time volatility tracking, secure multi-tenant architecture, and automated portfolio optimization algorithms.",
      tags: ["Next.js", "Supabase", "SQL", "Quantitative ML"],
      variant: "blue" as const,
      github: "https://github.com/lakshitsachdeva",
      icon: Network
    },
    {
      title: "QuizGen - AI-Powered Quiz App",
      description: "Android quiz application with AI-powered question generation from notes, PDFs, and images. Features preloaded quizzes, Gemini API integration, Firebase authentication, and ML Kit OCR.",
      tags: ["Android", "Java", "Firebase", "Gemini API", "ML Kit"],
      variant: "blue" as const,
      github: "https://github.com/lakshitsachdeva/ai-quiz",
      icon: Smartphone
    },
    {
      title: "CAPTCHA-X Recognition System",
      description: "Deep learning system using convolutional neural networks for CAPTCHA recognition. 24-layer CNN architecture achieving 98.97% accuracy on 5-character CAPTCHAs with grayscale preprocessing.",
      tags: ["Python", "TensorFlow", "CNN", "Computer Vision"],
      variant: "blue" as const,
      github: "https://github.com/lakshitsachdeva/captcha-x-final",
      icon: Shield
    },
    {
      title: "Claims Processor",
      description: "Intelligent insurance claims processing system leveraging Cloud LLM APIs, RAG, and Gmail integration. Automated claim evaluation with structured query parsing, confidence scoring, and FAISS-powered semantic search.",
      tags: ["Python", "FastAPI", "RAG", "FAISS", "Streamlit", "Gmail API"],
      variant: "blue" as const,
      github: "https://github.com/Aayush-K15/Bajaj-Finserv-Hackathon",
      icon: FileText
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
              <p className="text-xl font-light leading-snug text-zinc-300 lowercase sm:text-4xl lg:text-5xl">
                building stuff at the intersection of <span className="text-brand font-medium italic px-2 py-1">machine learning</span> and scalable systems. currently working on things that learn, reason, and optimize themselves.
                <p>
                  <br />
                nerding at {" "}
                <a
                  href="https://www.athair.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand underline decoration-brand/70 underline-offset-4 transition-colors hover:text-white"
                >
                  athair.app
                </a>
                .
                </p>
              </p>
            </motion.div>
          </section>

          {/* High-Impact Projects */}
          <section className="mb-24 sm:mb-64">
            <div className="mb-10 flex items-end justify-between sm:mb-16">
              <div>
                <h3 className="text-3xl font-bold lowercase sm:text-4xl">some things i've built</h3>
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
                        <p className="w-full break-words text-left text-sm font-medium leading-relaxed lowercase text-zinc-400 line-clamp-3 sm:line-clamp-3">
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
