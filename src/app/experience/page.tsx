'use client';

import { motion } from "framer-motion";
import PixelBlast from "@/components/react-bits/PixelBlast";
import BlurText from "@/components/react-bits/BlurText";
import { Briefcase, GraduationCap, ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import { gsap } from "gsap";

interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  description?: string;
  bullets?: string[];
  tags: string[];
  location?: string;
  website?: string;
}

interface ExperienceCardProps {
  exp: ExperienceItem;
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
          const expandedHeight = `${descEl.scrollHeight + 24}px`;
          if (newIndex === index) {
            gsap.fromTo(descEl,
              { opacity: 0, maxHeight: 0, paddingTop: 0, paddingBottom: 0 },
              { opacity: 1, maxHeight: expandedHeight, paddingTop: '1.5rem', paddingBottom: '1.5rem', duration: 0.4, ease: 'power2.out' }
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
          <h3 className={`break-words text-xl font-bold transition-colors sm:text-2xl md:text-3xl ${isExpanded ? 'text-black' : 'group-hover:text-brand'}`}>
            {exp.company}
          </h3>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className={`text-[11px] font-medium sm:text-sm ${isExpanded ? 'text-black/60' : 'text-zinc-500'}`}>
              {exp.date}
            </span>
            <ChevronDown 
              size={18} 
              className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-black' : 'text-brand'}`}
            />
          </div>
        </div>
        <p className={`mb-4 text-base font-medium sm:mb-5 sm:text-lg ${isExpanded ? 'text-black/80' : 'text-brand/90'}`}>
          {exp.role}
        </p>
        {(exp.location || exp.website) && (
          <div className="mb-5 flex flex-wrap items-center gap-2.5 sm:mb-6">
            {exp.location && (
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-medium sm:text-[11px] ${
                  isExpanded
                    ? 'border-black/25 bg-black/10 text-black/80'
                    : 'border-white/10 bg-black/30 text-zinc-300'
                }`}
              >
                {exp.location}
              </span>
            )}
            {exp.website && (
              <a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`pointer-events-auto inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-medium transition-colors sm:text-[11px] ${
                  isExpanded
                    ? 'border-black/25 bg-black/10 text-black/80 hover:bg-black/20'
                    : 'border-brand/40 bg-brand/15 text-brand hover:bg-brand/25'
                }`}
              >
                {new URL(exp.website).hostname.replace(/^www\./, "")} <ExternalLink size={12} />
              </a>
            )}
          </div>
        )}
        <div
          id={`desc-${index}`}
          className="overflow-hidden"
          style={{ maxHeight: 0, opacity: 0 }}
        >
          {exp.bullets && exp.bullets.length > 0 ? (
            <ul className={`mb-6 space-y-3 sm:mb-8 ${isExpanded ? 'text-black/75' : 'text-zinc-300'}`}>
              {exp.bullets.map((bullet, bulletIndex) => (
                <li key={`${exp.company}-bullet-${bulletIndex}`} className="flex items-start gap-3 text-sm font-medium leading-relaxed sm:text-base">
                  <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${isExpanded ? 'bg-black/60' : 'bg-brand'}`} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : (
            exp.description && (
              <p className={`mb-6 text-base font-medium leading-relaxed sm:mb-8 sm:text-lg ${isExpanded ? 'text-black/70' : 'text-zinc-300'}`}>
                {exp.description}
              </p>
            )
          )}
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

  const experiences: ExperienceItem[] = [
    {
      company: "Ernst & Young",
      role: "ai intern",
      date: "may 2026 - present",
      location: "mumbai, india",
      website: "https://www.ey.com/",
      bullets: [
        "Supporting ai-driven client engagements across automation, data extraction, and intelligence workflows for enterprise use cases.",
        "Assisting in the development of ai-enabled solutions for client-facing problem statements, including research, workflow design, technical feasibility analysis, and prototype refinement.",
        "Collaborating with internal teams to translate business requirements into practical ai and ml implementation plans with a focus on reliability, scalability, and delivery readiness."
      ],
      tags: ["enterprise ai", "automation", "workflow design", "client delivery"]
    },
    {
      company: "Amazon ML Summer School",
      role: "ml trainee",
      date: "august 2025",
      bullets: [
        "Completed an intensive research-grade curriculum covering supervised learning, deep neural networks, probabilistic graphical models, generative ai, and reinforcement learning.",
        "Gained hands-on exposure to production-scale ml systems and model training and evaluation practices shared by senior amazon scientists and principal engineers."
      ],
      tags: ["deep learning", "generative ai", "reinforcement learning"]
    },
    {
      company: "NMIMS",
      role: "research intern",
      date: "may 2023 - august 2024",
      location: "mumbai, india",
      bullets: [
        "Conducted first-principles device simulation of lead-free perovskite solar cells using scaps-1d, varying absorber thickness, layer combinations, and back-contact work function to optimize efficiency.",
        "Co-authored and presented the paper 'enhancing efficiency of lead-free perovskite solar cell by varying thickness, layer combination and back contact work function' at ieee icecct 2024."
      ],
      tags: ["scaps-1d", "device simulation", "research", "ieee"]
    },
    {
      company: "Google Developer Student Club",
      role: "head of department",
      date: "2024 - 2025",
      location: "nmims, mumbai",
      description: "led 11 department heads and more than 100 executives across technical programming, workshops, and digital outreach for the student community.",
      tags: ["leadership", "community", "operations"]
    }
  ];

  const education = [
    {
      school: "NMIMS MPSTME",
      degree: "b.tech in computer engineering",
      date: "may 2027",
      details: "mumbai"
    },
    {
      school: "IBM Machine Learning Professional Certificate",
      degree: "coursera certification",
      date: "completed",
      details: "covered supervised and unsupervised learning, model selection, feature engineering, evaluation, and practical ml pipelines"
    }
  ];

  const publications = [
    {
      title: "Benchmark Collapse in Text CAPTCHAs",
      meta: "preprint under peer review",
      details: "Built CAPTCHA-X, a 160,000-image benchmark showing severe cross-generator performance collapse and the need for reliability-aware evaluation in text captcha recognition."
    },
    {
      title: "WideQuant",
      meta: "under development",
      details: "Designing arithmetic-aware retrieval for numeric reasoning, enabling search systems to combine multiple quantities before evaluating a predicate."
    }
  ];

  const achievements = [
    "paper presentation winner at apogee, bits pilani.",
    "recurdo made it to the final stage of the hykr challenge.",
    "drift picked up early open-source traction through pipx and npm."
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

        <section className="mb-20 sm:mb-48">
          <h2 className="mb-8 text-xs font-medium lowercase text-zinc-500 sm:mb-16">
            selected research
          </h2>
          <div className="space-y-5 sm:space-y-8">
            {publications.map((publication, i) => (
              <motion.div
                key={publication.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-brand/20 bg-brand/5 p-6 backdrop-blur-sm sm:rounded-3xl sm:p-8"
              >
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-bold lowercase sm:text-2xl">{publication.title}</h3>
                  <span className="text-[10px] font-medium lowercase text-brand">{publication.meta}</span>
                </div>
                <p className="text-sm font-medium lowercase leading-relaxed text-zinc-300 sm:text-base">
                  {publication.details}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-20 sm:mb-40">
          <h2 className="mb-8 text-xs font-medium lowercase text-zinc-500 sm:mb-16">
            other things
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {achievements.map((achievement, i) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm font-medium lowercase leading-relaxed text-zinc-300 backdrop-blur-sm sm:rounded-3xl sm:p-6"
              >
                {achievement}
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
