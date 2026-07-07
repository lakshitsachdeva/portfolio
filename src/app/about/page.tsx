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

      <main className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 sm:mb-32"
        >
          <BlurText 
            text="about" 
            className="mb-8 text-5xl font-bold tracking-tighter lowercase sm:mb-12 sm:text-8xl" 
            delay={100}
          />
        </motion.div>

        <section className="mb-16 space-y-8 sm:mb-32 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-5 text-base font-medium leading-relaxed lowercase text-zinc-300 sm:space-y-6 sm:text-xl"
          >
            <p>
              i'm lakshit sachdeva, a computer engineering student at nmims mpstme in mumbai with a 4.0 out of 4.0 cgpa, currently working as an ai intern at ernst and young
            </p>
            <p>
              most of my work sits at the intersection of machine learning, retrieval, and product engineering, where the hard part is turning promising model behavior into systems that stay useful under messy, real constraints
            </p>
            <p>
              i've explored that through independent products like recurdo, athair, and drift, along with research-heavy builds in numeric reasoning, benchmark reliability, computer vision, and local-first knowledge systems
            </p>
            <p>
              i'm especially interested in workflows where retrieval, structured reasoning, and evaluation need to work together, whether that's searching private memory, challenging a trade thesis, or making a model refuse when confidence is weak
            </p>
            <p>
              outside product work, i've spent time in research as a solar-cell simulation intern at nmims, co-authored an ieee conference paper, and built the captcha-x benchmark study around cross-generator reliability in text captcha recognition
            </p>
            <p>
              i also care a lot about building communities around technical work, which is why i led a department at the google developer student club and kept contributing to open-source releases like drift
            </p>
            <p className="text-zinc-400">
              if something is ambitious, technical, and slightly unreasonable, that's usually a pretty good sign i'll want to work on it
            </p>
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
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
      </main>

      <style jsx global>{`
        .text-brand { color: #B19EEF; }
      `}</style>
    </div>
  );
}
