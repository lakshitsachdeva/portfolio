'use client';

import { motion } from "framer-motion";
import PixelBlast from "@/components/react-bits/PixelBlast";
import BlurText from "@/components/react-bits/BlurText";
import FlowingMenu from "@/components/react-bits/FlowingMenu";
import { Briefcase, GraduationCap } from "lucide-react";

export default function ExperiencePage() {
  const experiences = [
    {
      company: "ELGI EQUIPMENTS BANGALORE",
      role: "upcoming intern",
      date: "coming soon",
      description: "building something crazy at elgi equipments, bangalore. working on innovative solutions and cutting-edge projects in the industrial equipment space.",
      tags: []
    },
    {
      company: "QUILL AND INK",
      role: "founder",
      date: "2024 - present",
      description: "founded quill and ink, building innovative solutions and products. leading development of creative tools and platforms that empower creators.",
      tags: ["founder", "product development", "startup"]
    },
    {
      company: "Amazon",
      role: "trainee – ml summer school",
      date: "august 2025",
      description: "intensive deep-dive into advanced machine learning paradigms. core modules included supervised learning, deep neural networks, dimensionality reduction, and generative ai. applied theoretical concepts to real-world datasets and architectural patterns.",
      tags: ["generative ai", "deep learning", "supervised learning"]
    },
    {
      company: "NMIMS MPSTME",
      role: "research intern",
      date: "2023 - 2024",
      description: "conducted computational optimization of lead-free perovskite solar cells using SCAPS-1D. engineered device architectures that achieved 22.3% efficiency. authored research paper currently under review at Elsevier's Materials Today: Proceedings.",
      tags: ["computational physics", "device optimization", "SCAPS-1D"]
    }
  ];

  const flowingMenuItems = experiences.map(exp => ({
    text: exp.company,
    link: '#',
    image: undefined,
    description: exp.description,
    role: exp.role,
    date: exp.date,
    tags: exp.tags
  }));

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
          <div className="h-[600px] rounded-3xl overflow-visible border border-brand/20 relative">
            <FlowingMenu
              items={flowingMenuItems}
              speed={20}
              textColor="#B19EEF"
              bgColor="#000000"
              marqueeBgColor="#B19EEF"
              marqueeTextColor="#000000"
              borderColor="#B19EEF"
            />
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
