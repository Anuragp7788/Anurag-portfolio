import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[80vh] pt-20 pb-12 px-0 flex flex-col items-center justify-center lg:h-screen lg:min-h-0 lg:pt-0 lg:pb-0 lg:px-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 w-full max-w-2xl min-w-0 px-1 lg:max-w-none lg:w-auto lg:px-0"
      >
        <motion.p
          variants={itemVariants}
          className="text-[#aaa] text-sm sm:text-base lg:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em] lg:tracking-[0.2em] mb-3 sm:mb-4 lg:mb-4 font-inter font-medium"
        >
          Hello, this is
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-8xl lg:text-8xl xl:text-9xl mb-4 sm:mb-6 lg:mb-6 font-bold tracking-tight text-white leading-tight lg:leading-none break-words lg:break-normal"
        >
          Anurag Parkhe
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-white text-base sm:text-xl md:text-2xl font-inter mb-8 sm:mb-12 lg:mb-12 max-w-2xl mx-auto leading-relaxed flex flex-col lg:block items-center lg:items-stretch gap-3 lg:gap-0 px-1 lg:px-0"
        >
          <span className="opacity-80">Data & Business Analyst Turning Insight into Action with</span>{' '}
          <span
            className="text-moonstone font-mono font-semibold bg-moonstone-dim px-3 py-1 rounded border border-moonstone-border/20 max-lg:mt-1 lg:ml-[0.5em]"
            style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}
          >
            <span style={{ display: 'block', overflow: 'hidden', height: '1.2em' }}>
              <span style={{ display: 'flex', flexDirection: 'column', animation: 'tickUp 7s ease-in-out infinite' }}>
                <span style={{ display: 'block', height: '1.2em', lineHeight: '1.2em', whiteSpace: 'nowrap' }}>Python</span>
                <span style={{ display: 'block', height: '1.2em', lineHeight: '1.2em', whiteSpace: 'nowrap' }}>SQL</span>
                <span style={{ display: 'block', height: '1.2em', lineHeight: '1.2em', whiteSpace: 'nowrap' }}>Power BI</span>
                <span style={{ display: 'block', height: '1.2em', lineHeight: '1.2em', whiteSpace: 'nowrap' }}>Python</span>
              </span>
            </span>
          </span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row lg:flex-row flex-wrap items-stretch sm:items-center lg:items-center justify-center gap-3 sm:gap-6 lg:gap-6 w-full max-w-md sm:max-w-none lg:max-w-none mx-auto lg:mx-auto"
        >
          <a
            href="#works"
            onClick={(e) => { e.preventDefault(); document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="group btn-shine inline-flex items-center justify-center min-h-11 lg:min-h-0 px-6 sm:px-8 lg:px-8 py-3 sm:py-4 lg:py-4 rounded-full border border-moonstone-border text-moonstone font-bold text-base sm:text-lg lg:text-lg bg-transparent hover:bg-white transition-all duration-300"
          >
            View Work
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group btn-shine inline-flex items-center justify-center min-h-11 lg:min-h-0 px-6 sm:px-8 lg:px-8 py-3 sm:py-4 lg:py-4 rounded-full border border-moonstone-border text-moonstone font-bold text-base sm:text-lg lg:text-lg bg-transparent hover:bg-white transition-all duration-300"
          >
            Download CV
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 sm:bottom-10 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[#aaa] text-xs uppercase tracking-[0.3em] font-medium group-hover:text-moonstone transition-colors">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-moonstone w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
