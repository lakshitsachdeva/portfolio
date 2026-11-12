'use client';

import { EASE, PageHeader, PageShell, SectionLabel } from "@/components/site";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { useState } from "react";

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

const experiences: ExperienceItem[] = [
  {
    company: "Parsewave.ai",
    role: "ai engineer",
    date: "aug 2026 - present",
    location: "san francisco, remote",
    website: "https://parsewave.ai/",
    bullets: [
      "Designing offline scientific-ml benchmarks for pde solver discovery and stable-structure search, with protected budgets, hidden transfer splits, and reproducible run evidence.",
      "Instrumenting long-horizon agent runs across trajectories, tool calls, checkpoints, verifier outcomes, cost, and failure stages to tell real benchmark progress from lucky runs.",
      "Building evaluation infrastructure that separates invalid submissions from genuine zero scores and pairs diagnostic probes with hidden authoritative transfer evaluation."
    ],
    tags: ["agent evaluation", "scientific ml", "benchmarks", "llm systems"]
  },
  {
    company: "UIUC",
    role: "summer researcher",
    date: "jul 2026 - present",
    location: "remote",
    website: "https://illinois.edu/",
    bullets: [
      "Investigating whether naturalistic strategies for eliciting and resisting llm sycophancy map to distinct internal mechanisms across llama- and mistral-family models.",
      "Building a controlled 1,500+ prompt benchmark and reproducible pipeline for activation probing, cross-strategy transfer, and representation-level analysis.",
      "Testing causal steering interventions with preservation checks for factual accuracy, instruction following, and unintended capability degradation."
    ],
    tags: ["activation probing", "causal steering", "interpretability", "evaluation"]
  },
  {
    company: "Ernst & Young",
    role: "ai intern",
    date: "may 2026 - jul 2026",
    location: "mumbai, india",
    website: "https://www.ey.com/",
    bullets: [
      "Owned implementation of a client-facing tender-to-opportunity pipeline that extracted government bids, interpreted requirements, matched catalogue items, and generated qualified leads.",
      "Built enterprise information-retrieval and workflow agents using copilot studio, power automate, dataverse, and power apps.",
      "Implemented authentication, row- and field-level crm controls, and validation guardrails so outputs respected each employee's identity and permissions."
    ],
    tags: ["enterprise ai", "retrieval agents", "automation", "client delivery"]
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
    details: "mumbai, cgpa 4.00/4.00"
  },
  {
    school: "IIT Madras",
    degree: "foundations in data science",
    date: "2023 - 2024",
    details: "remote, gpa 9.5/10"
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
    meta: "submitted via arr for eacl 2027",
    details: "Introduced construction-before-ranking retrieval for numeric predicates, lifting decomposed document-level mrr@10 from 0.19 to 0.69 on a controlled e-commerce benchmark."
  }
];

const achievements = [
  "paper presentation winner at apogee, bits pilani.",
  "athair was a top-30 national finalist in hykr studio's venture-fundraising programme.",
  "drift picked up early open-source traction through pipx and npm."
];

function ExperienceRow({ exp, index, open, onToggle }: {
  exp: ExperienceItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `experience-${index}`;
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="work-row group relative border-t border-white/10"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="grid w-full grid-cols-[2.25rem_1fr_auto] items-start gap-x-3 py-6 text-left sm:grid-cols-[4rem_1fr_auto] sm:py-9 lg:grid-cols-[5rem_1.4fr_1fr_auto] lg:gap-x-10"
      >
        <span className={`pt-2 font-mono text-[11px] tracking-[0.18em] transition-colors duration-300 group-hover:text-brand sm:pt-4 ${open ? "text-brand" : "text-zinc-600"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 transition-transform duration-500 ease-out lg:group-hover:translate-x-3">
          <span className={`block text-[clamp(1.75rem,4.6vw,4.25rem)] font-bold lowercase leading-[0.92] tracking-[-0.055em] transition-colors duration-300 group-hover:text-brand ${open ? "text-brand" : ""}`}>
            {exp.company}
          </span>
          <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">{exp.role}</span>
          <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-600 lg:hidden">{exp.date}</span>
        </span>
        <span className="hidden pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 lg:block">
          {exp.date}
          {exp.location && <span className="mt-1 block text-zinc-600">{exp.location}</span>}
        </span>
        <span className={`mt-1 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 sm:mt-3 sm:h-11 sm:w-11 ${open ? "rotate-45 border-brand bg-brand text-black" : "border-white/15 text-white group-hover:border-brand"}`}>
          <Plus size={16} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-[2.25rem_1fr] gap-x-3 pb-8 sm:grid-cols-[4rem_1fr] sm:pb-12 lg:grid-cols-[5rem_1.4fr_1fr_2.75rem] lg:gap-x-10">
              <div className="col-start-2 max-w-3xl">
                {exp.bullets?.length ? (
                  <ul className="space-y-4">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-4 text-sm lowercase leading-relaxed text-zinc-300 sm:text-base">
                        <span className="mt-[0.6em] h-px w-4 shrink-0 bg-brand" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  exp.description && <p className="text-sm lowercase leading-relaxed text-zinc-300 sm:text-base">{exp.description}</p>
                )}
              </div>
              <div className="col-start-2 mt-6 space-y-4 lg:col-start-3 lg:mt-0">
                {exp.location && (
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 lg:hidden">{exp.location}</p>
                )}
                <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-zinc-500">
                  {exp.tags.join("  ·  ")}
                </p>
                {exp.website && (
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-black"
                  >
                    {new URL(exp.website).hostname.replace(/^www\./, "")} <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function ExperiencePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PageShell>
      <PageHeader label="where i've been" title="history" sub="where i've been and what i've been building" descender />

      <section className="pb-20 sm:pb-36">
        <SectionLabel index="01" title="experience" meta={`${String(experiences.length).padStart(2, "0")} roles`} />
        <ul className="border-b border-white/10">
          {experiences.map((exp, i) => (
            <ExperienceRow
              key={exp.company}
              exp={exp}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </ul>
      </section>

      <section className="pb-20 sm:pb-36">
        <SectionLabel index="02" title="education" />
        <div className="grid grid-cols-1 gap-x-10 border-b border-white/10 md:grid-cols-2">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: EASE }}
              className="border-t border-white/10 py-7 sm:py-10"
            >
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">{edu.date}</p>
              <h3 className="text-[clamp(1.75rem,3.6vw,3.25rem)] font-bold lowercase leading-[0.95] tracking-[-0.05em]">{edu.school}</h3>
              <p className="mt-4 text-base lowercase text-brand sm:text-lg">{edu.degree}</p>
              <p className="mt-1 text-sm lowercase text-zinc-400 sm:text-base">{edu.details}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="pb-20 sm:pb-36">
        <SectionLabel index="03" title="selected research" />
        <ul className="border-b border-white/10">
          {publications.map((publication, i) => (
            <motion.li
              key={publication.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="work-row group relative grid grid-cols-[2.25rem_1fr] gap-x-3 gap-y-4 border-t border-white/10 py-7 sm:grid-cols-[4rem_1fr] sm:py-10 lg:grid-cols-[5rem_1.1fr_1.2fr] lg:gap-x-10"
            >
              <span className="pt-2 font-mono text-[11px] tracking-[0.18em] text-zinc-600 transition-colors duration-300 group-hover:text-brand sm:pt-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-[clamp(1.75rem,3.6vw,3.25rem)] font-bold lowercase leading-[0.95] tracking-[-0.05em] transition-colors duration-300 group-hover:text-brand">
                  {publication.title}
                </h3>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-brand">{publication.meta}</p>
              </div>
              <p className="col-start-2 max-w-xl text-sm lowercase leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200 sm:text-[15px] lg:col-start-3 lg:pt-2">
                {publication.details}
              </p>
            </motion.li>
          ))}
        </ul>
      </section>

      <section>
        <SectionLabel index="04" title="other things" />
        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-3">
          {achievements.map((achievement, i) => (
            <motion.p
              key={achievement}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ delay: i * 0.07, duration: 0.7, ease: EASE }}
              className="border-t border-white/10 py-5 text-base lowercase leading-snug text-zinc-200 sm:text-lg"
            >
              {achievement}
            </motion.p>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
