import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hightide');

  const experienceData = [
    {
      id: 'hightide',
      company: 'Hightide',
      role: 'Business Analyst Intern',
      period: 'May 2025 – July 2025',
      isCurrent: false,
      points: [
        'Analyzed marketing and user datasets using Python to identify patterns impacting user acquisition and engagement.',
        'Built KPI dashboards (CTR, CAC) to monitor campaign performance and support data-driven growth decisions.',
        'Collaborated with product teams to convert insights into actionable feature improvements.',
        'Synthesized user behavior data to contribute to strategic decision-making.',
      ],
    },
    {
      id: 'mentorq',
      company: 'MentorQ Pro',
      role: 'Co-Founder',
      period: 'Ongoing',
      isCurrent: true,
      points: [
        'Built and launched a mentoring platform, focusing on user acquisition and engagement strategy.',
        'Designed a lead generation system to validate demand and improve conversion rates.',
        'Analyzed user interaction data to identify drop-offs and improve retention.',
      ],
    },
    {
      id: 'induction',
      company: 'Student Counselling Services, IIT BHU',
      role: 'Senior Induction Mentor',
      period: 'Aug 2024 – Mar 2025',
      isCurrent: false,
      points: [
        'Led onboarding initiatives for 60+ students, improving engagement and participation.',
        'Designed mentoring processes to enhance student experience.',
      ],
    },
    {
      id: 'spardha',
      company: 'Spardha, IIT BHU',
      role: 'Marketing Executive',
      period: 'Jul 2023 – Oct 2023',
      isCurrent: false,
      points: [
        'Contributed to securing 5L+ sponsorship through outreach and partnership development.',
        'Analyzed outreach performance and optimized communication strategies to improve sponsor conversion.',
        'Collaborated with team members to execute marketing campaigns and increase event visibility.',
      ],
    },
  ];

  const activeExperience = experienceData.find((exp) => exp.id === activeTab)!;

  const revealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const renderExperienceContent = (exp: (typeof experienceData)[number]) => (
    <motion.div
      key={exp.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-4 sm:space-y-6"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug break-words">{exp.role}</h3>
      <p className="font-mono text-moonstone text-sm">{exp.period}</p>
      <ul className="space-y-3 sm:space-y-4">
        {exp.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 sm:gap-4 text-white text-base sm:text-lg leading-relaxed">
            <span className="text-moonstone mt-1.5 flex-shrink-0">•</span>
            <span className="break-words">{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <section id="journey" className="py-12 sm:py-16 lg:py-24 max-w-6xl mx-auto px-0 lg:px-6 min-w-0">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="mb-10 sm:mb-12 lg:mb-20 border-b border-white/10 pb-4"
      >
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-[0.2em] sm:tracking-[0.3em] text-[#aaa] uppercase">PROFESSIONAL EXPERIENCE</h2>
      </motion.div>

      {/* ─── Mobile — stacked cards, no timeline decoration (hidden on lg+) ─── */}
      <div className="lg:hidden flex flex-col gap-4">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: index * 0.15 }}
          >
            {/* Card */}
            <div className="rounded-2xl border border-white/10 bg-moonstone-dim backdrop-blur-sm p-4 transition-all duration-300 hover:border-moonstone/30 hover:-translate-y-0.5">

              {/* Top row: company name + date pill */}
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-base font-bold text-white leading-snug break-words min-w-0">
                  {exp.company}
                </span>
                <span className="text-[11px] font-normal text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1 whitespace-nowrap flex-shrink-0 mt-0.5">
                  {exp.period}
                </span>
              </div>

              {/* Role + Current badge */}
              <div className="flex items-center gap-2 mb-3">
                <p className="text-[13px] font-semibold text-moonstone tracking-[0.04em]">
                  {exp.role}
                </p>
                {exp.isCurrent && (
                  <span className="hidden md:inline-flex items-center text-[10px] font-semibold tracking-[0.04em] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 whitespace-nowrap flex-shrink-0">
                    Current
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10 mb-3" />

              {/* Bullet points */}
              <ul className="flex flex-col gap-2">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-white leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-moonstone flex-shrink-0 mt-[6px]" />
                    <span className="break-words">{point}</span>
                  </li>
                ))}
              </ul>

            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Desktop — sidebar tabs (unchanged) ─── */}
      <div className="hidden lg:flex lg:gap-12 xl:gap-24">
        <div className="flex flex-col w-1/3 gap-3">
          {experienceData.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setActiveTab(exp.id)}
              className={`btn-shine text-left px-6 py-4 rounded-xl border transition-all duration-300 truncate ${activeTab === exp.id
                ? 'bg-moonstone text-zinc-950 font-bold border-moonstone'
                : 'bg-transparent border-moonstone-border/20 text-white hover:bg-white'
                }`}
              title={exp.company}
            >
              {exp.company}
            </button>
          ))}
        </div>

        <div className="w-2/3 min-h-[300px]">
          <AnimatePresence mode="wait">
            {renderExperienceContent(activeExperience)}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
