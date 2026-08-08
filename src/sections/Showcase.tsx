import React from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description: string;
  stack: string[];
  image: string | null;
  github: string | null;
  live: string | null;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const projects: Project[] = [
  {
    id: 1,
    name: "MARKET TREND ANALYTICS DASHBOARD",
    description: "An interactive dashboard visualizing near real-time market data from API-based sources. Uses line and candlestick charts to track price trends and volatility, with KPI tracking and auto-refresh to simulate live monitoring.",
    stack: ["Python", "Pandas", "APIs", "Dashboards"],
    image: null,
    github: "https://github.com/Anuragp7788",
    live: null,
  },
  {
    id: 2,
    name: "CUSTOMER SEGMENTATION FOR BUSINESS INSIGHTS",
    description: "Segmented customers based on behavioral metrics such as spending and engagement. Applied clustering techniques to uncover patterns and identify high-value and at-risk segments for targeted marketing.",
    stack: ["Python", "Clustering", "Data Analysis"],
    image: null,
    github: "https://github.com/Anuragp7788",
    live: null,
  },
  {
    id: 3,
    name: "E-COMMERCE SALES ANALYTICS — SQL",
    description: "Analyzed transactional data using SQL to derive insights on revenue trends and customer behavior. Computed repeat-customer rates, top products, and monthly revenue trends using joins and aggregations.",
    stack: ["SQL", "Joins & Aggregations", "Business Insights"],
    image: null,
    github: "https://github.com/Anuragp7788",
    live: null,
  },
];

const Showcase: React.FC = () => {
  const [activeProject, setActiveProject] = React.useState(0);
  const project = projects[activeProject];

  // Ref for the scrollable right-hand image column. We derive activeProject
  // from continuous scroll progress across this column instead of relying
  // on per-block onViewportEnter/IntersectionObserver triggers. The old
  // approach used three independent observers with amount: 0.5 thresholds,
  // which round differently at different browser zoom levels and can fall
  // out of sync with each other — that's what caused the "uneven" bug.
  const rightColRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rightColRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.min(
      projects.length - 1,
      Math.max(0, Math.floor(latest * projects.length))
    );
    setActiveProject((prev) => (prev === index ? prev : index));
  });

  return (
    <section
      id="works"
      className="max-w-6xl mx-auto px-0 lg:px-6 py-12 sm:py-16 lg:py-0 min-w-0"
      style={{ overflowX: 'clip', overflowY: 'visible' }}
    >
      {/*DESKTOP*/}
      <div className="hidden lg:flex" style={{ alignItems: 'flex-start' }}>

        {/* LEFT — Sticky Info Panel */}
        <div
          className="w-[45%] relative flex flex-col"
          style={{ position: 'sticky', top: 0, height: '100svh' }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: EASE,
                },
              },
            }}
            className="absolute top-0 left-0 right-0 pt-16 pb-4 border-b border-white/10 z-10"
          >
            <div className="flex items-center justify-between pr-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-[0.3em] text-[#aaa] uppercase font-poppins">
                PROJECTS
              </h2>
              <span className="text-xs text-white/30 tracking-widest uppercase font-mono">
                / PORTFOLIO
              </span>
            </div>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center pr-12">
            <div className="flex flex-col">

              {/* Ticker Counter */}
              <div className="flex items-center text-sm tracking-[0.3em] text-white/40 font-mono mb-3">
                <span>[</span>
                <div className="overflow-hidden flex items-center justify-center px-3" style={{ height: '1.4em' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeProject}
                      initial={{ y: 24 }}
                      animate={{
                        y: 0,
                        transition: {
                          duration: 0.3,
                          ease: EASE,
                        },
                      }}
                      exit={{ y: -24, transition: { duration: 0.15, ease: 'easeIn' } }}
                      className="whitespace-nowrap"
                    >
                      0{activeProject + 1}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <span>/</span>
                <span className="px-3">03</span>
                <span>]</span>
              </div>

              {/* Title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`title-${activeProject}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }}
                  exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
                >
                  <h3 className="mb-4 text-2xl xl:text-3xl font-bold text-white tracking-tight uppercase leading-tight max-w-[90%] break-words">
                    {project.name}
                  </h3>
                </motion.div>
              </AnimatePresence>

              {/* Description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`desc-${activeProject}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }}
                  exit={{ opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }}
                >
                  <p className="mb-6 text-sm text-white/60 leading-relaxed max-w-[90%]">
                    {project.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Stack Tags */}
              <div className="pt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`tags-${activeProject}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.4,
                        ease: EASE,
                      },
                    }}
                    exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                    className="flex flex-wrap gap-2"
                  >
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] tracking-widest text-white/50 border border-white/20 px-3 py-1 uppercase rounded-full font-medium hover:-translate-y-0.5 hover:shadow-md hover:shadow-white/5 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT — Image Column */}
        <div className="w-[55%]" ref={rightColRef}>
          {projects.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-end px-8"
              style={{ minHeight: '100svh' }}
            >
              <div className="relative w-full max-w-full">
                <div className="absolute -inset-3 border border-moonstone/20 rounded-2xl" />
                <div className="relative z-10 w-full rounded-xl overflow-hidden shadow-2xl bg-zinc-900/20 backdrop-blur-3xl border border-white/5 flex items-center justify-center">

                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-auto block" />
                  ) : (
                    <div className="w-full h-64 bg-neutral-900/50 flex items-center justify-center">
                      <span className="text-white/5 text-[10px] tracking-widest uppercase">No Preview Available</span>
                    </div>
                  )}

                  {/* Desktop Hover Overlay */}
                  <div className="absolute inset-0 z-30 flex items-center justify-center gap-3 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    {item.github !== null && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md transform translate-y-2 hover:translate-y-0 transition-transform duration-300"
                      >
                        <Github size={18} className="text-white" />
                        <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">GitHub</span>
                      </a>
                    )}
                    {item.live !== null && (
                      <a
                        href={item.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md transform translate-y-2 hover:translate-y-0 transition-transform duration-300"
                      >
                        <ExternalLink size={18} className="text-white" />
                        <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">Live</span>
                      </a>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex lg:hidden flex-col items-center w-full min-w-0 text-center">

        {/* Heading */}
        <div className="w-full pb-4 border-b border-white/10">
          <div className="flex items-center justify-between gap-3 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold tracking-[0.2em] sm:tracking-[0.3em] text-[#aaa] uppercase font-poppins truncate">
              PROJECTS
            </h2>
            <span className="text-[10px] sm:text-xs text-white/30 tracking-widest uppercase font-mono flex-shrink-0">
              / PORTFOLIO
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col items-center gap-12 sm:gap-16 pt-10 sm:pt-12 w-full">
          {projects.map((item, index) => (
            <article key={item.id} className="flex flex-col items-center gap-5 sm:gap-6 min-w-0 w-full max-w-lg mx-auto">

              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="text-xs tracking-[0.2em] sm:tracking-[0.3em] text-white/40 font-mono">
                  [ 0{index + 1} / {String(projects.length).padStart(2, '0')} ]
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase leading-snug break-words">
                  {item.name}
                </h3>
              </div>

              {item.image !== null && (
                <div className="relative w-full min-w-0 max-w-full mx-auto">
                  <div className="absolute -inset-1.5 sm:-inset-2 border border-moonstone/10 rounded-xl pointer-events-none" />
                  <div className="relative z-10 w-full rounded-lg overflow-hidden shadow-xl bg-zinc-900/20 backdrop-blur-3xl border border-white/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-auto max-w-full block object-contain"
                    />
                  </div>
                </div>
              )}

              <p className="text-sm sm:text-base text-white/60 leading-relaxed break-words">
                {item.description}
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] tracking-widest text-white/50 border border-white/20 px-3 py-1.5 uppercase rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {(item.github !== null || item.live !== null) && (
                <div className="flex flex-wrap justify-center gap-3 pt-1">
                  {item.github !== null && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/15 transition-colors duration-300"
                    >
                      <Github size={18} aria-hidden="true" />
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase">GitHub</span>
                    </a>
                  )}
                  {item.live !== null && (
                    <a
                      href={item.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-11 px-5 rounded-full bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/15 transition-colors duration-300"
                    >
                      <ExternalLink size={18} aria-hidden="true" />
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Live</span>
                    </a>
                  )}
                </div>
              )}

            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;