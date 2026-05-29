import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollAnimation';
import AnimatedCounter from '../ui/AnimatedCounter';
import GlowOrb from '../ui/GlowOrb';
import { useSocket } from '../../context/SocketContext';

const avatarColors = ['#ff6b35', '#8b5cf6', '#00d9ff', '#ec4899', '#f59e0b', '#10b981', '#6366f1', '#f43f5e'];
const names = ['Priya S.', 'Rahul M.', 'Ananya K.', 'Vikram P.', 'Neha T.', 'Arjun R.', 'Shreya L.', 'Karan B.', 'Deepa V.', 'Mohit G.'];
const activities = [
  'just completed Prompt Engineering module',
  'earned their AI Certificate',
  'built their first automation',
  'joined the community',
  'submitted a project',
  'attended live session',
  'shared a win 🎉',
  'completed Day 1',
];

function LiveActivityFeed() {
  const [feed, setFeed] = useState(() =>
    [...Array(5)].map((_, i) => ({
      id: i,
      name: names[i % names.length],
      activity: activities[i % activities.length],
      color: avatarColors[i % avatarColors.length],
      time: `${i + 1}m ago`,
    }))
  );

  return (
    <div className="space-y-2">
      {feed.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 glass px-4 py-3 rounded-xl border border-white/5"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: item.color }}
          >
            {item.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-300 truncate">
              <span className="font-semibold text-white">{item.name}</span>{' '}
              <span className="text-gray-500">{item.activity}</span>
            </p>
          </div>
          <span className="text-xs text-gray-600 shrink-0">{item.time}</span>
        </motion.div>
      ))}
    </div>
  );
}

function PulsingOrb({ count }) {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto">
      {/* Outer rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-accent-orange/20"
          style={{ width: 200 + i * 50, height: 200 + i * 50 }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* Center orb */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-40 h-40 rounded-full flex flex-col items-center justify-center text-center relative z-10"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,53,0.2) 0%, rgba(139,92,246,0.1) 50%, transparent 100%)',
          border: '2px solid rgba(255,107,53,0.3)',
        }}
      >
        <div className="flex items-center gap-1 mb-1">
          <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
          <span className="text-xs text-accent-orange font-mono uppercase tracking-wider">Live</span>
        </div>
        <p className="font-display font-bold text-3xl text-white">{count.toLocaleString()}</p>
        <p className="text-xs text-gray-400 leading-tight">learners<br />online now</p>
      </motion.div>
    </div>
  );
}

export default function Community() {
  const { ref, isInView } = useScrollReveal();
  const { activeUsers } = useSocket();

  return (
    <section id="community" className="relative py-24 lg:py-32 overflow-hidden">
      <GlowOrb color="#ff6b35" size={500} x="50%" y="50%" opacity={0.06} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-accent-orange uppercase tracking-widest mb-4 glass px-4 py-2 rounded-full border border-accent-orange/20">
            You're Not Alone
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
            Join a{' '}
            <span className="text-gradient-orange">Thriving Community</span>
            <br />
            of AI Learners
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            5,000+ learners sharing wins, asking questions, and building together.
            Get unstuck in minutes, not days.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — live visual */}
          <div className="space-y-8">
            <PulsingOrb count={activeUsers} />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: 5000, suffix: '+', label: 'Total Members', icon: '👥', color: 'text-accent-orange' },
                { val: activeUsers, suffix: '', label: 'Online Now', icon: '🟢', color: 'text-green-400' },
                { val: 200, suffix: '+', label: 'Daily Messages', icon: '💬', color: 'text-accent-cyan' },
                { val: 98, suffix: '%', label: 'Questions Answered', icon: '✅', color: 'text-accent-purple' },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-4 border border-white/10 text-center">
                  <p className="text-2xl mb-1">{stat.icon}</p>
                  <p className={`font-display font-bold text-2xl ${stat.color}`}>
                    <AnimatedCounter target={stat.val} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — activity feed */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">Live Activity Feed</span>
              </div>
              <span className="text-xs text-gray-600">Updates every minute</span>
            </div>

            <LiveActivityFeed />

            {/* Community perks */}
            <div className="glass rounded-2xl p-6 border border-white/10 space-y-4">
              <h3 className="font-display font-semibold text-white">What's inside the community</h3>
              {[
                { emoji: '🎯', text: 'Weekly AI challenges with prizes' },
                { emoji: '🎙', text: 'Monthly live Q&A with the instructor' },
                { emoji: '📚', text: 'Exclusive resource library' },
                { emoji: '💼', text: 'Job board & freelance opportunities' },
                { emoji: '🤝', text: 'Accountability partners & study groups' },
                { emoji: '🔔', text: 'First access to new AI tools & updates' },
              ].map((perk) => (
                <div key={perk.text} className="flex items-center gap-3">
                  <span className="text-lg">{perk.emoji}</span>
                  <span className="text-sm text-gray-300">{perk.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
