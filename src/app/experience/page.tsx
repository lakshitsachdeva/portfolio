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
      className={`group relative p-8 rounded-3xl border backdrop-blur-sm transition-all cursor-pointer overflow-hidden ${
        isExpanded 
          ? 'bg-brand border-brand text-black' 
          : 'border-brand/20 bg-brand/5 hover:bg-brand/10 hover:border-brand/40 text-white'
      }`}
      onClick={() => {
        const newIndex = expandedIndex === index ? null : index;
        setExpandedIndex(newIndex);
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
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
          <h3 className={`text-3xl font-bold transition-colors lowercase ${isExpanded ? 'text-black' : 'group-hover:text-brand'}`}>
            {exp.company}
          </h3>
          <div className="flex items-center gap-4">
            <span className={`text-sm font-medium lowercase ${isExpanded ? 'text-black/60' : 'text-zinc-500'}`}>
              {exp.date}
            </span>
            <ChevronDown 
              size={20} 
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-black' : 'text-brand'}`}
            />
          </div>
        </div>
        <p className={`text-lg font-medium mb-6 lowercase ${isExpanded ? 'text-black/80' : 'text-brand/90'}`}>
          {exp.role}
        </p>
        <div
          id={`desc-${index}`}
          className="overflow-hidden"
          style={{ maxHeight: 0, opacity: 0 }}
        >
          <p className={`leading-relaxed text-lg mb-8 font-medium lowercase ${isExpanded ? 'text-black/70' : 'text-zinc-300'}`}>
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
      company: "ELGI EQUIPMENTS BANGALORE",
      role: "upcoming intern",
      date: "coming soon",
      description: "building something crazy at elgi equipments, bangalore. working on innovative solutions and cutting-edge projects in the industrial equipment space.",
      tags: []
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

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <BlurText 
            text="history" 
            className="text-6xl sm:text-8xl font-bold tracking-tighter mb-8 lowercase" 
            delay={100}
          />
          <p className="text-zinc-400 text-xl font-medium tracking-tight max-w-xl lowercase">
            where i've been and what i've been building
          </p>
        </motion.div>

        <section className="mb-48">
          <h2 className="text-zinc-500 lowercase text-xs font-medium mb-16 flex items-center gap-3">
            <Briefcase size={14} className="text-brand" /> experience
          </h2>
          <div className="space-y-8">
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

        <section className="mb-48">
          <h2 className="text-zinc-500 lowercase text-xs font-medium mb-16 flex items-center gap-3">
            <GraduationCap size={14} className="text-brand" /> education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {education.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 border border-brand/20 bg-brand/5 backdrop-blur-sm rounded-3xl hover:bg-brand/10 hover:border-brand/40 transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold lowercase">{edu.school}</h3>
                  <span className="text-zinc-500 text-[10px] font-medium lowercase">{edu.date}</span>
                </div>
                <p className="text-brand text-sm font-medium mb-4 lowercase">{edu.degree}</p>
                <p className="text-zinc-300 font-medium lowercase">{edu.details}</p>
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
