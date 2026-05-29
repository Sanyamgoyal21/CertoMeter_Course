import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollAnimation';
import GlowOrb from '../ui/GlowOrb';

const toolCategories = [
  {
    label: 'Writing & Content',
    color: '#ff6b35',
    tools: ['ChatGPT', 'Claude', 'Jasper', 'Copy.ai', 'Writesonic', 'Rytr', 'Notion AI', 'Grammarly AI', 'QuillBot'],
  },
  {
    label: 'Image & Design',
    color: '#8b5cf6',
    tools: ['Midjourney', 'DALL-E 3', 'Stable Diffusion', 'Adobe Firefly', 'Canva AI', 'Ideogram', 'Leonardo AI', 'Bing Image'],
  },
  {
    label: 'Video & Audio',
    color: '#00d9ff',
    tools: ['Runway', 'Synthesia', 'HeyGen', 'ElevenLabs', 'Murf', 'Descript', 'Invideo AI', 'Pika Labs', 'Sora'],
  },
  {
    label: 'Productivity',
    color: '#ec4899',
    tools: ['Notion AI', 'Otter.ai', 'Reclaim.ai', 'Taskade', 'Motion', 'Mem.ai', 'Obsidian + AI', 'Superhuman'],
  },
  {
    label: 'Research & Data',
    color: '#f59e0b',
    tools: ['Perplexity', 'Consensus', 'Elicit', 'Scite', 'Research Rabbit', 'Connected Papers', 'Semantic Scholar'],
  },
  {
    label: 'Code & Dev',
    color: '#10b981',
    tools: ['GitHub Copilot', 'Cursor', 'Replit AI', 'Tabnine', 'Codeium', 'v0.dev', 'Bolt.new', 'Lovable'],
  },
  {
    label: 'Automation',
    color: '#6366f1',
    tools: ['Zapier AI', 'Make.com', 'n8n', 'Bardeen', 'Relay.app', 'Activepieces', 'Pipedream'],
  },
  {
    label: 'Business & Marketing',
    color: '#f43f5e',
    tools: ['Surfer SEO', 'MarketMuse', 'Clearscope', 'Fathom AI', 'Gong.io', 'Lavender', 'Apollo AI'],
  },
];

const row1Tools = toolCategories.slice(0, 4).flatMap(c => c.tools.map(t => ({ name: t, cat: c.label, color: c.color })));
const row2Tools = toolCategories.slice(4).flatMap(c => c.tools.map(t => ({ name: t, cat: c.label, color: c.color })));

function ToolChip({ name, cat, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className="flex items-center gap-3 glass px-4 py-3 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-200 cursor-default shrink-0 group"
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
        style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
        {name[0]}
      </div>
      <div>
        <p className="text-sm font-semibold text-white group-hover:text-accent-cyan transition-colors">{name}</p>
        <p className="text-xs text-gray-600">{cat}</p>
      </div>
    </motion.div>
  );
}

function MarqueeRow({ tools, reverse = false }) {
  const doubled = [...tools, ...tools];
  return (
    <div className="flex overflow-hidden">
      <div className={`flex gap-4 ${reverse ? 'marquee-track-reverse' : 'marquee-track'}`}>
        {doubled.map((tool, i) => (
          <ToolChip key={`${tool.name}-${i}`} {...tool} />
        ))}
      </div>
    </div>
  );
}

const featuredTools = [
  { name: 'ChatGPT', emoji: '🤖', desc: 'World\'s most powerful AI assistant', color: '#10b981', tag: 'Essential' },
  { name: 'Midjourney', emoji: '🎨', desc: 'Create stunning AI artwork & visuals', color: '#8b5cf6', tag: 'Creative' },
  { name: 'Claude', emoji: '⚡', desc: 'Advanced reasoning & long documents', color: '#ff6b35', tag: 'Analysis' },
  { name: 'Runway', emoji: '🎬', desc: 'AI video generation & editing', color: '#00d9ff', tag: 'Video' },
  { name: 'Perplexity', emoji: '🔍', desc: 'AI-powered search & research', color: '#f59e0b', tag: 'Research' },
  { name: 'Zapier', emoji: '⚙️', desc: 'Automate your entire workflow', color: '#ec4899', tag: 'Automation' },
];

export default function AITools() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="tools" className="relative py-24 lg:py-32 overflow-hidden">
      <GlowOrb color="#00d9ff" size={500} x="80%" y="30%" opacity={0.07} />
      <GlowOrb color="#8b5cf6" size={400} x="10%" y="60%" opacity={0.07} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-accent-cyan uppercase tracking-widest mb-4 glass px-4 py-2 rounded-full border border-accent-cyan/20">
            The Ultimate Toolkit
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
            Master{' '}
            <span className="text-gradient-orange">100+ AI Tools</span>
            <br />
            Across Every Domain
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Writing. Design. Video. Code. Research. Automation. Business.
            One course — the complete AI toolkit for the modern professional.
          </p>
        </motion.div>

        {/* Featured tools hexagonal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {featuredTools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 group cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${tool.color}20`, border: `1px solid ${tool.color}30` }}>
                  {tool.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-white group-hover:text-accent-cyan transition-colors">{tool.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${tool.color}20`, color: tool.color }}>
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{tool.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infinite marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <MarqueeRow tools={row1Tools} />
          <MarqueeRow tools={row2Tools} reverse />
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-3xl p-6 border border-white/10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-x divide-white/5">
            {[
              { val: '100+', label: 'Tools Covered', color: 'text-accent-orange' },
              { val: '8', label: 'Tool Categories', color: 'text-accent-cyan' },
              { val: '50+', label: 'Use Cases Shown', color: 'text-accent-purple' },
              { val: '20+', label: 'Hands-on Projects', color: 'text-accent-pink' },
            ].map((s) => (
              <div key={s.label} className="py-2">
                <p className={`font-display font-bold text-3xl ${s.color}`}>{s.val}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
