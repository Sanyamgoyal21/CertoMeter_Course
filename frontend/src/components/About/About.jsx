import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const phases = [
  {
    num: '01', title: 'Foundation',
    desc: 'Understand how AI actually works — models, tokens, context, and why most people use it wrong.',
    tools: ['ChatGPT', 'Claude', 'Gemini'],
    color: '#ff6b35',
  },
  {
    num: '02', title: 'Prompt\nMastery',
    desc: 'Write prompts that get 10× better outputs. Chain prompts, use personas, master advanced techniques.',
    tools: ['Prompt Chaining', 'Few-Shot', 'Personas'],
    color: '#8b5cf6',
  },
  {
    num: '03', title: 'AI Tool\nArsenal',
    desc: 'Build your personal stack of 100+ AI tools for writing, design, video, code, research, and automation.',
    tools: ['Midjourney', 'Notion AI', 'Runway'],
    color: '#00d9ff',
  },
  {
    num: '04', title: 'Automation',
    desc: 'Build real workflows using Zapier, Make, and AI APIs that run without you — saving 10+ hours every week.',
    tools: ['Zapier', 'Make', 'n8n'],
    color: '#ec4899',
  },
  {
    num: '05', title: 'Career &\nBusiness',
    desc: 'Apply AI to freelancing, job search, business growth, content creation, and income generation.',
    tools: ['Resume AI', 'LinkedIn', 'Fiverr'],
    color: '#f59e0b',
  },
];

function Phase({ phase, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const isRight = index % 2 !== 0;

  return (
    <div ref={ref} className={`relative flex ${isRight ? 'justify-end' : 'justify-start'} py-16 lg:py-20`}>
      {/* Separator */}
      {index > 0 && (
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />
      )}

      {/* Giant number — background anchor */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.3 } : {}}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="absolute select-none pointer-events-none font-display font-black leading-none"
        style={{
          fontSize: 'clamp(140px, 22vw, 320px)',
          color: phase.color,
          opacity: 0.06,
          letterSpacing: '-0.01em',
          top: '50%',
          transform: 'translateY(-50%)',
          [isRight ? 'right' : 'left']: '-2%',
        }}
      >
        {phase.num}
      </motion.span>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className={`relative z-10 max-w-lg ${isRight ? 'text-right' : 'text-left'}`}
      >
        {/* Phase label */}
        <p className="font-mono text-xs uppercase tracking-[0.25em] mb-4" style={{ color: phase.color }}>
          Phase {phase.num}
        </p>

        {/* Title */}
        <h3
          className="font-display font-bold text-white mb-5 whitespace-pre-line"
          style={{ fontSize: 'clamp(34px, 5.5vw, 68px)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
        >
          {phase.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-7">
          {phase.desc}
        </p>

        {/* Tool tags */}
        <div className={`flex flex-wrap gap-2 ${isRight ? 'justify-end' : 'justify-start'}`}>
          {phase.tools.map((t) => (
            <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                background: `${phase.color}12`,
                color: phase.color,
                border: `1px solid ${phase.color}25`,
              }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-10% 0px' });

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="pt-24 lg:pt-36 pb-8"
        >
          <p className="font-mono text-xs text-gray-600 uppercase tracking-[0.25em] mb-5">
            Your 5-Phase Journey
          </p>
          <h2
            className="font-display font-bold text-white leading-none"
            style={{ fontSize: 'clamp(38px, 7vw, 90px)', letterSpacing: '-0.04em' }}
          >
            From Curious<br />
            to <span className="text-gradient-cyan">Unstoppable.</span>
          </h2>
        </motion.div>

        {/* Phases */}
        {phases.map((phase, i) => (
          <Phase key={phase.num} phase={phase} index={i} />
        ))}

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 border-t border-white/[0.05] flex items-center justify-between gap-8 flex-wrap"
        >
          <p className="text-gray-500 text-base">
            All 5 phases. 15 hours. One price.
          </p>
          <button
            onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-sm px-6 py-3"
          >
            See Pricing →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
