'use client';

import BlurText from "@/components/react-bits/BlurText";
import ClickSpark from "@/components/react-bits/ClickSpark";
import PixelBlast from "@/components/react-bits/PixelBlast";
import PixelCard from "@/components/react-bits/PixelCard";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, BrainCircuit, Cpu, Network, ExternalLink, Smartphone, Shield, Sparkles, FileText } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function Home() {
  const projects = useMemo(() => [
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
      title: "Intent2Model - LLM AutoML Agent",
      description: "LLM-guided AutoML agent that uploads CSV files, chats with AI, and gets trained models. Features beautiful charts, model comparison, smart predictions, and Gemini-powered pipeline generation.",
      tags: ["Python", "TypeScript", "FastAPI", "Gemini", "AutoML"],
      variant: "blue" as const,
      github: "https://github.com/lakshitsachdeva/intent2model",
      icon: Sparkles
    },
    {
      title: "Bajaj Finserv Claims Processor",
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
        <main className="relative z-10 mx-auto max-w-6xl px-6 py-32 sm:px-12 lg:px-16">
          {/* Hero Section */}
          <header className="flex flex-col gap-8 mb-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <BlurText 
                text="hi, i'm lakshit sachdeva" 
                className="text-6xl sm:text-9xl font-bold tracking-tighter lowercase" 
                delay={100}
                animateBy="words"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-wrap gap-8 text-sm font-medium lowercase text-zinc-500"
            >
              <a href="mailto:Lakshits.official@gmail.com" className="flex items-center gap-2 text-brand hover:text-brand/80 transition-colors">
                <Mail size={16} /> lakshits.official@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/lakshitsachdeva" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand hover:text-brand/80 transition-colors">
                <Linkedin size={16} /> linkedin
              </a>
              <a href="https://github.com/lakshitsachdeva" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand hover:text-brand/80 transition-colors">
                <Github size={16} /> github
              </a>
            </motion.div>
          </header>

          {/* Core Focus Section */}
          <section className="mb-64 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-3xl sm:text-5xl font-light leading-tight text-zinc-300 lowercase">
                building stuff at the intersection of <span className="text-white font-medium italic px-2 py-1">machine learning</span> and scalable systems. currently working on things that learn, reason, and optimize themselves.
              </p>
            </motion.div>
          </section>

          {/* High-Impact Projects */}
          <section className="mb-64">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h3 className="text-4xl font-bold lowercase">some things i've built</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group"
                >
                  <PixelCard variant={project.variant} speed={300} className="w-full !h-[500px] transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none">
                      <div className="mb-6 p-3 bg-white/5 rounded-2xl w-fit backdrop-blur-sm border border-white/10">
                        {(() => {
                          const IconComponent = project.icon;
                          return <IconComponent size={24} className="text-blue-400" />;
                        })()}
                      </div>
                      <h3 className="text-3xl font-bold mb-4 leading-tight group-hover:text-brand transition-colors lowercase">{project.title}</h3>
                      <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-medium lowercase">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 bg-zinc-900/80 text-zinc-300 rounded-full border border-white/5 backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-white hover:text-brand transition-colors text-sm font-medium lowercase pointer-events-auto"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} /> repo
                        </a>
                      )}
                    </div>
                  </PixelCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-32 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-center md:text-left lowercase">
                wanna build something? <br />
                <span className="text-zinc-500">let's connect</span>
              </h2>
              <Link href="mailto:Lakshits.official@gmail.com" className="px-12 py-6 bg-white text-black font-medium lowercase text-base rounded-full hover:bg-brand transition-all hover:scale-105 active:scale-95">
                say hi
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-24 flex flex-col sm:flex-row justify-between items-center gap-8 text-zinc-500 text-[10px] font-medium lowercase">
            <p>© 2026 lakshit sachdeva</p>
            <div className="flex gap-12">
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
