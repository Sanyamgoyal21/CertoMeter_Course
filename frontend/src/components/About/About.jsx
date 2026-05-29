import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollAnimation';
import GlowOrb from '../ui/GlowOrb';

const timeline = [
  {
    phase: '01',
    title: 'Foundation',
    desc: 'Understand how AI actually works — models, tokens, context, and why most people use it wrong.',
    tools: ['ChatGPT', 'Claude', 'Gemini'],
    color: '#ff6b35',
    icon: '🧠',
  },
  {
    phase: '02',
    title: 'Prompt Mastery',
    desc: 'Write prompts that get 10x better outputs. Chain prompts, use personas, and master advanced techniques.',
    tools: ['Prompt Chaining', 'Few-Shot', 'Role Prompts'],
    color: '#8b5cf6',
    icon: '⚡',
  },
  {
    phase: '03',
    title: 'AI Tool Arsenal',
    desc: 'Build your personal stack of 100+ AI tools for writing, design, video, code, research, and automation.',
    tools: ['Midjourney', 'Notion AI', 'Runway'],
    color: '#00d9ff',
    icon: '🛠',
  },
  {
    phase: '04',
    title: 'Automation',
    desc: 'Build real workflows using Zapier, Make, and AI APIs that run without you — saving 10+ hours/week.',
    tools: ['Zapier', 'Make', 'n8n'],
    color: '#ec4899',
    icon: '🤖',
  },
  {
    phase: '05',
    title: 'Career & Business',
    desc: 'Apply AI to freelancing, job search, business growth, content creation, and income generation.',
    tools: ['Resume AI', 'LinkedIn', 'Fiverr'],
    color: '#f59e0b',
    icon: '🚀',
  },
];

function TimelineItem({ item, index }) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`flex gap-6 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse lg:flex-row'}`}
    >
      {/* Content */}
      <div className={`flex-1 ${index % 2 !== 0 ? 'lg:text-right' : ''}`}>
        <div
          className="inline-block glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-default"
          style={{ '--glow': item.color }}
        >
          <div className={`flex items-center gap-3 mb-3 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <span className="text-2xl">{item.icon}</span>
            <div>
              <span className="text-xs font-mono text-gray-500">PHASE {item.phase}</span>
              <h3 className="font-display font-bold text-lg text-white">{item.title}</h3>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.desc}</p>
          <div className={`flex flex-wrap gap-2 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
            {item.tools.map((tool) => (
              <span
                key={tool}
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}30` }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline spine */}
      <div className="flex flex-col items-center gap-2 shrink-0">
        <motion.div
          animate={isInView ? { scale: [0, 1.2, 1] } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm border-2 shrink-0"
          style={{ background: `${item.color}15`, borderColor: item.color, color: item.color }}
        >
          {item.phase}
        </motion.div>
        {index < timeline.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-px flex-1 min-h-12"
            style={{ background: `linear-gradient(180deg, ${item.color}40, transparent)`, transformOrigin: 'top' }}
          />
        )}
      </div>

      {/* Spacer for alternating */}
      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
}

export default function About() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      <GlowOrb color="#8b5cf6" size={500} x="90%" y="10%" opacity={0.08} />
      <GlowOrb color="#ff6b35" size={400} x="5%" y="70%" opacity={0.07} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-mono text-accent-orange uppercase tracking-widest mb-4 glass px-4 py-2 rounded-full border border-accent-orange/20">
            Your Transformation
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
            From AI-Curious to{' '}
            <span className="text-gradient-cyan">AI-Powered</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A structured 5-phase journey that takes you from complete beginner to confident AI professional —
            without the overwhelm, without the jargon.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <TimelineItem key={item.phase} item={item} index={index} />
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 glass rounded-3xl p-8 border border-white/10 text-center"
        >
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { emoji: '🎯', label: 'Real-world projects in every phase' },
              { emoji: '⏱', label: 'Self-paced — go at your own speed' },
              { emoji: '🏆', label: 'Certificate after every milestone' },
              { emoji: '💬', label: 'Community support throughout' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-gray-300 text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
