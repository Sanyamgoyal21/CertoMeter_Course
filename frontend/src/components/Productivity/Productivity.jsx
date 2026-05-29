import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollAnimation';
import GlowOrb from '../ui/GlowOrb';
import AnimatedCounter from '../ui/AnimatedCounter';

const workflowSteps = [
  { id: 1, label: 'Manual Research', time: '3 hrs', icon: '📚', color: '#ef4444', arrow: true },
  { id: 2, label: 'AI Research', time: '12 min', icon: '⚡', color: '#10b981', arrow: true },
  { id: 3, label: 'Draft Content', time: '2 hrs', icon: '✍️', color: '#ef4444', isOld: true, arrow: true },
  { id: 4, label: 'AI Draft', time: '4 min', icon: '🤖', color: '#10b981', arrow: true },
  { id: 5, label: 'Send Emails', time: '1 hr', icon: '📧', color: '#ef4444', isOld: true, arrow: false },
  { id: 6, label: 'Auto-Send', time: 'Auto', icon: '⚙️', color: '#10b981', arrow: false },
];

const automations = [
  { emoji: '📧', title: 'Email Automation', desc: 'Auto-sort, reply drafts, follow-up sequences', saving: '5 hrs/week' },
  { emoji: '📝', title: 'Content Pipeline', desc: 'Research → outline → draft → edit in minutes', saving: '8 hrs/week' },
  { emoji: '📊', title: 'Report Generation', desc: 'Pull data, analyze, format — fully automated', saving: '4 hrs/week' },
  { emoji: '🤝', title: 'Client Proposals', desc: 'Custom proposals generated in under 10 minutes', saving: '3 hrs/week' },
  { emoji: '🔍', title: 'Market Research', desc: 'Competitive analysis with AI in 30 minutes', saving: '6 hrs/week' },
  { emoji: '📱', title: 'Social Media', desc: 'Month of content planned and scheduled via AI', saving: '4 hrs/week' },
];

export default function Productivity() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="productivity" className="relative py-24 lg:py-32 overflow-hidden">
      <GlowOrb color="#10b981" size={400} x="85%" y="20%" opacity={0.07} />
      <GlowOrb color="#ff6b35" size={350} x="10%" y="70%" opacity={0.07} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-mono text-green-400 uppercase tracking-widest mb-4 glass px-4 py-2 rounded-full border border-green-400/20">
            Automation & Workflows
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
            Save{' '}
            <span className="text-gradient-orange">
              <AnimatedCounter target={30} suffix="+" />+ Hours
            </span>
            <br />
            Every Single Week
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Replace repetitive tasks with AI automations that run while you sleep.
            Work smarter, not harder — with workflows that actually work.
          </p>
        </motion.div>

        {/* Before vs After workflow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="glass rounded-3xl p-8 border border-white/10">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <span className="inline-block text-xs font-mono text-red-400 uppercase tracking-widest glass px-3 py-1 rounded-full border border-red-400/20">
                  ❌ Without AI
                </span>
              </div>
              <div className="text-center">
                <span className="inline-block text-xs font-mono text-green-400 uppercase tracking-widest glass px-3 py-1 rounded-full border border-green-400/20">
                  ✅ With AI (After This Course)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Without AI */}
              <div className="space-y-3">
                {[
                  { task: 'Research topic', time: '3 hours', icon: '📚' },
                  { task: 'Write first draft', time: '2 hours', icon: '✍️' },
                  { task: 'Edit & refine', time: '1 hour', icon: '📝' },
                  { task: 'Create visuals', time: '2 hours', icon: '🎨' },
                  { task: 'Reply to emails', time: '1 hour', icon: '📧' },
                  { task: 'Generate report', time: '2 hours', icon: '📊' },
                ].map((item, i) => (
                  <motion.div
                    key={item.task}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between glass px-4 py-3 rounded-xl border border-red-400/10"
                  >
                    <div className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      <span className="text-sm text-gray-400">{item.task}</span>
                    </div>
                    <span className="text-sm text-red-400 font-mono font-semibold">{item.time}</span>
                  </motion.div>
                ))}
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <span className="text-sm font-semibold text-red-400">Total time wasted</span>
                  <span className="text-lg font-bold text-red-400">11 hours</span>
                </div>
              </div>

              {/* With AI */}
              <div className="space-y-3">
                {[
                  { task: 'AI Research', time: '12 min', icon: '⚡' },
                  { task: 'AI Draft', time: '4 min', icon: '🤖' },
                  { task: 'AI Polish', time: '8 min', icon: '✨' },
                  { task: 'AI Visuals', time: '5 min', icon: '🎯' },
                  { task: 'Auto-Replies', time: 'Auto', icon: '⚙️' },
                  { task: 'Auto-Report', time: 'Auto', icon: '📈' },
                ].map((item, i) => (
                  <motion.div
                    key={item.task}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between glass px-4 py-3 rounded-xl border border-green-400/10"
                  >
                    <div className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      <span className="text-sm text-gray-300">{item.task}</span>
                    </div>
                    <span className="text-sm text-green-400 font-mono font-semibold">{item.time}</span>
                  </motion.div>
                ))}
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <span className="text-sm font-semibold text-green-400">Total time saved</span>
                  <span className="text-lg font-bold text-green-400">~30 min</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-2xl border border-accent-orange/20">
                <span className="text-2xl">🎯</span>
                <p className="text-accent-orange font-semibold">That's <span className="text-white">10+ hours saved every week</span> — just on this one workflow</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Automation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {automations.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass rounded-2xl p-5 border border-white/10 hover:border-green-400/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{item.emoji}</div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-400/10 text-green-400 border border-green-400/20 font-mono">
                  {item.saving}
                </span>
              </div>
              <h3 className="font-display font-semibold text-white mb-2 group-hover:text-accent-cyan transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
