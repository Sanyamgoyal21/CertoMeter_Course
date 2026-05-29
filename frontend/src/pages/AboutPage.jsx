import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Target, Zap, Award, TrendingUp, Heart } from 'lucide-react';
import PolicyLayout from '../components/PolicyLayout';

const stats = [
  { val: '5,000+', label: 'Learners Enrolled', icon: Users, color: '#ff6b35' },
  { val: '100+', label: 'AI Tools Covered', icon: Zap, color: '#00d9ff' },
  { val: '4.9/5', label: 'Average Rating', icon: Award, color: '#f59e0b' },
  { val: '2x', label: 'Avg Productivity Gain', icon: TrendingUp, color: '#8b5cf6' },
];

const team = [
  {
    name: 'Sanyam Goyal',
    role: 'Founder & Lead Instructor',
    bio: 'AI practitioner and educator passionate about democratizing AI skills for India. Has helped 5,000+ professionals leverage AI in their daily work.',
    emoji: '👨‍💻',
    color: '#ff6b35',
  },
];

const values = [
  { icon: '🎯', title: 'Practical Over Theoretical', desc: 'Every lesson is grounded in real-world application. No fluff, no filler — only skills you can use tomorrow.' },
  { icon: '🌱', title: 'Accessible for Everyone', desc: 'We believe AI should not be exclusive to engineers. Our courses are designed for anyone, regardless of technical background.' },
  { icon: '🔄', title: 'Always Evolving', desc: 'AI changes every week. Our content updates with it. Your lifetime access means you always have the latest knowledge.' },
  { icon: '🤝', title: 'Community-First', desc: 'Learning alone is hard. Our 5,000+ member community means you\'re never stuck, never bored, never behind.' },
  { icon: '💡', title: 'Outcomes Over Content', desc: 'We measure success by what you can do, not what you\'ve watched. Real transformations, real results.' },
  { icon: '❤️', title: 'Made in India, for the World', desc: 'We understand the Indian professional\'s needs, challenges, and aspirations — and we build specifically for that context.' },
];

export default function AboutPage() {
  return (
    <PolicyLayout
      title="About Us"
      subtitle="We're on a mission to help every professional thrive in the age of AI."
      metaDescription="About AI Career Accelerator — our mission, story, team, and commitment to AI education in India."
    >
      {/* Mission statement */}
      <div className="glass rounded-3xl p-8 border border-accent-orange/20 mb-12 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.05), rgba(139,92,246,0.05))' }}>
        <div className="text-4xl mb-4">⚡</div>
        <h2 className="font-display font-bold text-2xl text-white mb-3">Our Mission</h2>
        <p className="text-gray-300 text-base leading-relaxed max-w-2xl mx-auto">
          To ensure that every professional, student, and entrepreneur in India can confidently use AI to
          <span className="text-accent-orange font-semibold"> work smarter</span>,
          <span className="text-accent-cyan font-semibold"> earn more</span>, and
          <span className="text-accent-purple font-semibold"> build a future-proof career</span> —
          before AI replaces the people who aren't ready.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 border border-white/10 text-center"
          >
            <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
              style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
              <stat.icon size={18} style={{ color: stat.color }} />
            </div>
            <p className="font-display font-bold text-2xl text-white">{stat.val}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Our story */}
      <div className="mb-12">
        <h2 className="font-display font-bold text-2xl text-white mb-6">Our Story</h2>
        <div className="space-y-4 text-gray-400 leading-relaxed text-sm">
          <p>
            It started with a simple observation: <strong className="text-white">most professionals were terrified of AI</strong>.
            Not because they weren't smart — but because no one was teaching AI in a way that made sense for real work.
            Every resource was either too technical, too vague, or too expensive.
          </p>
          <p>
            AI Career Accelerator was built to change that. We started by identifying the exact AI tools, prompts,
            and workflows that were actually saving professionals 10+ hours per week — and built a structured,
            beginner-friendly course around them.
          </p>
          <p>
            Within months, thousands of learners — from marketing managers to chartered accountants to college students —
            were reporting <strong className="text-white">real, measurable changes</strong> in their productivity.
            Content managers cut their work from 8 hours to 1. Freelancers doubled their income.
            Students landed AI-adjacent internships at top companies.
          </p>
          <p>
            Today, AI Career Accelerator is one of India's most comprehensive AI productivity courses.
            With <strong className="text-white">100+ tools, 15+ hours of content, and a community of 5,000+ learners</strong>,
            we're just getting started on our mission to AI-empower every professional in India.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="mb-12">
        <h2 className="font-display font-bold text-2xl text-white mb-6">What We Stand For</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="text-2xl mb-3">{value.icon}</div>
              <h3 className="font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-12">
        <h2 className="font-display font-bold text-2xl text-white mb-6">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {team.map((member) => (
            <div key={member.name} className="glass rounded-2xl p-6 border border-white/10 flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                style={{ background: `${member.color}15`, border: `1px solid ${member.color}30` }}>
                {member.emoji}
              </div>
              <div>
                <h3 className="font-display font-bold text-white">{member.name}</h3>
                <p className="text-xs text-accent-orange mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What we teach */}
      <div className="mb-12">
        <h2 className="font-display font-bold text-2xl text-white mb-6">What We Teach</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            ['🤖', 'AI Foundations', 'How AI models work, tokens, context windows, and limitations'],
            ['⚡', 'Prompt Engineering', 'Advanced techniques for 10x better AI outputs'],
            ['🛠', '100+ AI Tools', 'Writing, design, video, code, research, and automation'],
            ['⚙️', 'Workflow Automation', 'Zapier, Make, n8n — automate your repetitive tasks'],
            ['💼', 'Career & Business', 'Freelancing, job search, and business applications'],
            ['📊', 'Real Projects', 'Build actual workflows you can use on day one'],
          ].map(([emoji, title, desc]) => (
            <div key={title} className="glass rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">{emoji}</div>
              <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
              <p className="text-gray-600 text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center glass rounded-3xl p-8 border border-accent-orange/20"
        style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.08), rgba(139,92,246,0.08))' }}>
        <h2 className="font-display font-bold text-2xl text-white mb-3">Ready to Join 5,000+ Learners?</h2>
        <p className="text-gray-400 mb-6">Start your AI journey today. Lifetime access. 30-day money-back guarantee.</p>
        <Link to="/#pricing" className="btn-primary inline-flex items-center gap-2 px-8 py-4">
          Get Started — ₹5,999 →
        </Link>
      </div>
    </PolicyLayout>
  );
}
