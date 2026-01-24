'use client';

import BlurText from "@/components/react-bits/BlurText";
import ClickSpark from "@/components/react-bits/ClickSpark";
import PixelBlast from "@/components/react-bits/PixelBlast";
import PixelCard from "@/components/react-bits/PixelCard";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, BrainCircuit, Cpu, Network } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function Home() {
  const projects = useMemo(() => [
    {
      title: "Neural Vulnerability Engine",
      description: "Architecting a hybrid CNN-LSTM architecture integrated with CLIP-based RAG for autonomous vulnerability discovery and security reasoning in large-scale systems.",
      tags: ["PyTorch", "CLIP", "FAISS", "RAG"],
      variant: "pink" as const
    },
    {
      title: "Vision-AI Waste Management",
      description: "Deployed a custom ResNet-50 backbone with 95.45% inference accuracy. Engineered real-time edge processing on Arduino for automated industrial waste classification.",
      tags: ["TensorFlow", "OpenCV", "Edge AI", "IoT"],
      variant: "blue" as const
    },
    {
      title: "Predictive Alpha: Quant Platform",
      description: "Developing a full-stack financial engine with real-time volatility tracking, secure multi-tenant architecture, and automated portfolio optimization algorithms.",
      tags: ["Next.js", "Supabase", "SQL", "Quantitative ML"],
      variant: "yellow" as const
    }
  ], []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white selection:bg-brand selection:text-black">
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 opacity-70">
        <PixelBlast 
          variant="square" 
          pixelSize={4} 
          color="#B19EEF" 
          patternScale={2} 
          patternDensity={1} 
          enableRipples 
          transparent
          speed={8}
        />
      </div>

      <ClickSpark
        sparkColor='#B19EEF'
        sparkSize={12}
        sparkRadius={20}
        sparkCount={10}
        duration={500}
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
              <a href="mailto:Lakshits.official@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail size={16} /> lakshits.official@gmail.com
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                <Linkedin size={16} /> linkedin
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
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
                building stuff at the intersection of <span className="text-white font-medium italic underline decoration-brand underline-offset-8">machine learning</span> and scalable systems. currently working on things that learn, reason, and optimize themselves.
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
                        {i === 0 ? <BrainCircuit size={24} className="text-pink-400" /> : i === 1 ? <Cpu size={24} className="text-blue-400" /> : <Network size={24} className="text-yellow-400" />}
                      </div>
                      <h3 className="text-3xl font-bold mb-4 leading-tight group-hover:text-brand transition-colors lowercase">{project.title}</h3>
                      <p className="text-zinc-400 text-sm mb-8 leading-relaxed font-medium lowercase">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 bg-zinc-900/80 text-zinc-300 rounded-full border border-white/5 backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
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
              <Link href="mailto:Lakshits.official@gmail.com" className="px-12 py-6 bg-white text-black font-medium lowercase text-sm rounded-full hover:bg-brand transition-all hover:scale-105 active:scale-95">
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
