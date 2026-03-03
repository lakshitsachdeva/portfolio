'use client';

import { motion } from "framer-motion";
import PixelBlast from "@/components/react-bits/PixelBlast";
import BlurText from "@/components/react-bits/BlurText";
import { Briefcase, GraduationCap, ChevronDown } from "lucide-react";
import { useState } from "react";
import { gsap } from "gsap";

interface ExperienceCardProps {
  exp: {
    company: string;
    role: string;
    date: string;
    description: string;
    tags: string[];
  };
  index: number;
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
}

function ExperienceCard({ exp, index, expandedIndex, setExpandedIndex }: ExperienceCardProps) {
  const isExpanded = expandedIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-5 backdrop-blur-sm transition-all sm:rounded-3xl sm:p-8 ${
        isExpanded 
          ? 'bg-brand border-brand text-black' 
          : 'border-brand/20 bg-brand/5 hover:bg-brand/10 hover:border-brand/40 text-white'
      }`}
      onClick={() => {
        const newIndex = expandedIndex === index ? null : index;
        setExpandedIndex(newIndex);
        
        // Close any previously expanded card
        if (expandedIndex !== null && expandedIndex !== index) {
          const prevDescEl = document.getElementById(`desc-${expandedIndex}`);
          if (prevDescEl) {
            gsap.to(prevDescEl, {
              opacity: 0,
              maxHeight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              duration: 0.3,
              ease: 'power2.in'
            });
          }
        }
        
        const descEl = document.getElementById(`desc-${index}`);
        if (descEl) {
          if (newIndex === index) {
            gsap.fromTo(descEl,
              { opacity: 0, maxHeight: 0, paddingTop: 0, paddingBottom: 0 },
              { opacity: 1, maxHeight: '500px', paddingTop: '1.5rem', paddingBottom: '1.5rem', duration: 0.4, ease: 'power2.out' }
            );
          } else {
            gsap.to(descEl, {
              opacity: 0,
              maxHeight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              duration: 0.3,
              ease: 'power2.in'
            });
          }
        }
      }}
    >
      <div className={`relative ${isExpanded ? 'text-black' : ''}`}>
        <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
          <h3 className={`break-words text-xl font-bold lowercase transition-colors sm:text-2xl md:text-3xl ${isExpanded ? 'text-black' : 'group-hover:text-brand'}`}>
            {exp.company}
          </h3>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className={`text-[11px] font-medium lowercase sm:text-sm ${isExpanded ? 'text-black/60' : 'text-zinc-500'}`}>
              {exp.date}
            </span>
            <ChevronDown 
              size={18} 
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-black' : 'text-brand'}`}
            />
          </div>
        </div>
        <p className={`mb-5 text-base font-medium lowercase sm:mb-6 sm:text-lg ${isExpanded ? 'text-black/80' : 'text-brand/90'}`}>
          {exp.role}
        </p>
        <div
          id={`desc-${index}`}
          className="overflow-hidden"
          style={{ maxHeight: 0, opacity: 0 }}
        >
          <p className={`mb-6 text-base font-medium leading-relaxed lowercase sm:mb-8 sm:text-lg ${isExpanded ? 'text-black/70' : 'text-zinc-300'}`}>
            {exp.description}
          </p>
          {exp.tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {exp.tags.map(tag => (
                <span 
                  key={tag} 
                  className={`text-[9px] font-medium lowercase px-3 py-1.5 rounded-full border ${
                    isExpanded 
                      ? 'bg-black/20 text-black border-black/30' 
                      : 'bg-brand/20 text-brand border-brand/30'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperiencePage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const experiences = [
    {
      company: "open to opportunities",
      role: "looking for roles in sde, ml & ai",
      date: "2025",
      description: "actively seeking full-time and internship opportunities in software development, machine learning, and artificial intelligence. interested in building scalable systems, ml pipelines, and intelligent applications.",
      tags: ["sde", "ml", "ai", "full-stack"]
    },
    {
      company: "AMAZON, INDIA",
      role: "trainee – ml summer school",
      date: "august 2025",
      description: "selected for amazon ml summer school 2025 (5% acceptance rate), an intensive program covering advanced ml topics including supervised learning, deep neural networks, generative ai, and reinforcement learning, with interactive sessions led by senior amazon scientists.",
      tags: ["generative ai", "deep learning", "supervised learning"]
    },
    {
      company: "NMIMS, MUMBAI, MAHARASHTRA",
      role: "research intern - solar cell optimization",
      date: "march 2023 - august 2024",
      description: "conducted pioneering research in lead-free perovskite-based solar cells, achieving a remarkable efficiency using advanced device configuration and employing SCAPS 1D tool. wrote a paper titled – 'enhancing efficiency of lead-free perovskite solar cell by varying thickness, layer combination and back contact work function'.",
      tags: ["computational physics", "device optimization", "SCAPS-1D"]
    },
    {
      company: "THE QUILL AND INK, GURUGRAM, HARYANA",
      role: "founder, ceo",
      date: "january 2021 – october 2023",
      description: "pioneered a non-profit organization aimed at elevating awareness of social stigmas in india, spearheading strategic initiatives, directing a team of contributors, and supervising content dissemination. collaborated with 10+ team members to drive substantial engagement, amassing over 50,000 interactions on various social media platforms.",
      tags: ["founder", "non-profit", "social impact"]
    }
  ];

  const education = [
    {
      school: "NMIMS MPSTME",
      degree: "b.tech in computer science",
      date: "expected 2027",
      details: "specializing in ai and distributed systems"
    },
    {
      school: "IIT Madras",
      degree: "foundations in data science",
      date: "2023 - 2024",
      details: "advanced coursework in linear algebra, statistics, and python for data science"
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0 opacity-20">
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
            text="history" 
            className="mb-6 text-5xl font-bold tracking-tighter lowercase sm:mb-8 sm:text-8xl" 
            delay={100}
          />
          <p className="max-w-xl text-base font-medium tracking-tight lowercase text-zinc-400 sm:text-xl">
            where i've been and what i've been building
          </p>
        </motion.div>

        <section className="mb-20 sm:mb-48">
          <h2 className="mb-8 flex items-center gap-3 text-xs font-medium lowercase text-zinc-500 sm:mb-16">
            <Briefcase size={14} className="text-brand" /> experience
          </h2>
          <div className="space-y-5 sm:space-y-8">
            {experiences.map((exp, i) => (
              <ExperienceCard
                key={exp.company}
                exp={exp}
                index={i}
                expandedIndex={expandedIndex}
                setExpandedIndex={setExpandedIndex}
              />
            ))}
          </div>
        </section>

        <section className="mb-20 sm:mb-48">
          <h2 className="mb-8 flex items-center gap-3 text-xs font-medium lowercase text-zinc-500 sm:mb-16">
            <GraduationCap size={14} className="text-brand" /> education
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
            {education.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-brand/20 bg-brand/5 p-6 backdrop-blur-sm transition-all hover:border-brand/40 hover:bg-brand/10 sm:rounded-3xl sm:p-10"
              >
                <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6">
                  <h3 className="break-words text-xl font-bold lowercase sm:text-2xl">{edu.school}</h3>
                  <span className="text-[10px] font-medium lowercase text-zinc-500">{edu.date}</span>
                </div>
                <p className="mb-3 text-sm font-medium lowercase text-brand sm:mb-4">{edu.degree}</p>
                <p className="text-sm font-medium lowercase text-zinc-300 sm:text-base">{edu.details}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <style jsx global>{`
        .text-brand { color: #B19EEF; }
        .bg-brand { background-color: #B19EEF; }
      `}</style>
    </div>
  );
}
