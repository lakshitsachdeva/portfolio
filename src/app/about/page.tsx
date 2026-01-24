'use client';

import BlurText from "@/components/react-bits/BlurText";
import { motion } from "framer-motion";
import PixelBlast from "@/components/react-bits/PixelBlast";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-brand selection:text-black">
      <div className="fixed inset-0 z-0 opacity-40">
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

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <BlurText 
            text="about" 
            className="text-6xl sm:text-8xl font-bold tracking-tighter mb-12 lowercase" 
            delay={100}
          />
        </motion.div>

        <section className="space-y-12 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-lg sm:text-xl text-zinc-300 leading-relaxed font-medium lowercase"
          >
            <p>
              i'm lakshit sachdeva, a developer interested in building ambitious systems at the intersection of machine learning and software
            </p>
            <p>
              most of my work involves taking ideas that feel a bit too big at first and slowly turning them into real, working products, from data pipelines and models to full applications around them
            </p>
            <p>
              i've explored this through independent projects, hackathons, and research style experiments, usually by pushing myself toward problems that don't have obvious solutions
            </p>
            <p>
              right now, i'm focused on building larger, more complex systems and learning how intelligent models fit into real world software at scale
            </p>
            <p>
              i like working on problems that are technical, open ended, and require long term thinking rather than quick wins
            </p>
            <p>
              if something feels ambitious, technical, and a little unreasonable, i'm probably interested
            </p>
            <p className="text-zinc-400">
              you can explore what i'm building through my projects and thoughts, or find me on github and linkedin
            </p>
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap gap-8 text-sm font-medium lowercase text-zinc-500"
        >
          <a href="mailto:Lakshits.official@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={16} /> lakshits.official@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/lakshitsachdeva" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
            <Linkedin size={16} /> linkedin
          </a>
          <a href="https://github.com/lakshitsachdeva" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
            <Github size={16} /> github
          </a>
        </motion.div>
      </main>

      <style jsx global>{`
        .text-brand { color: #B19EEF; }
      `}</style>
    </div>
  );
}
