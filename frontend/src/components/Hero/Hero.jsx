import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Star, Users, TrendingUp, Award, X } from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';
import MagneticButton from '../ui/MagneticButton';
import GlowOrb from '../ui/GlowOrb';
import { useSocket } from '../../context/SocketContext';

const floatingStats = [
  { icon: Users, value: 5000, suffix: '+', label: 'Active Learners', color: 'text-accent-cyan' },
  { icon: Award, value: 100, suffix: '+', label: 'AI Tools', color: 'text-accent-orange' },
  { icon: TrendingUp, value: 15, suffix: ' hrs', label: 'Self-Paced', color: 'text-accent-purple' },
];

export default function Hero() {
  const { activeUsers } = useSocket();
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [showVideo, setShowVideo] = useState(false);

  const scrollToPricing = () => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });

  const openVideo = () => setShowVideo(true);
  const closeVideo = () => {
    setShowVideo(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeVideo(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-mesh-gradient" />
      <div className="absolute inset-0 bg-hero-gradient" />
      <GlowOrb color="#8b5cf6" size={600} x="10%" y="20%" opacity={0.08} blur={100} />
      <GlowOrb color="#ff6b35" size={400} x="85%" y="60%" opacity={0.1} blur={80} />
      <GlowOrb color="#00d9ff" size={300} x="60%" y="10%" opacity={0.07} blur={80} />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* SVG decorative shapes */}
      <svg className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" viewBox="0 0 600 800" fill="none">
        <circle cx="500" cy="150" r="250" stroke="url(#g1)" strokeWidth="1" strokeDasharray="8 4" />
        <circle cx="500" cy="150" r="180" stroke="url(#g1)" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx="500" cy="150" r="110" stroke="url(#g2)" strokeWidth="1" strokeDasharray="2 6" />
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#00d9ff" />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ff6b35" />
            <stop offset="1" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Content */}
          <div className="space-y-8">
            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-orange opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-orange" />
              </span>
              <span className="text-gray-300">
                <span className="text-accent-orange font-semibold">
                  <AnimatedCounter target={activeUsers} duration={1500} />
                </span>{' '}
                learners active right now
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="section-heading text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance">
                Don't Wait for{' '}
                <span className="text-gradient-full">AI to Replace</span>{' '}
                You.
                <br />
                <span className="text-white">Master It First.</span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed"
            >
              Go from AI-curious to AI-powered in{' '}
              <span className="text-white font-semibold">15 hours</span>. Learn{' '}
              <span className="text-accent-cyan font-semibold">100+ real AI tools</span>, build
              automations that save 10+ hours a week, and future-proof your career.
            </motion.p>

            {/* Price + social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <span className="text-4xl font-display font-bold text-white">₹5,999</span>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through">₹14,999</span>
                  <span className="text-xs text-accent-orange font-semibold">60% OFF — Limited</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400" fill="#f59e0b" />
                ))}
                <span className="text-sm text-gray-400 ml-1">4.9 (2,400+ reviews)</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <MagneticButton strength={0.25}>
                <button onClick={scrollToPricing} className="btn-primary text-base group">
                  Get Started Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticButton>
              <button
                onClick={openVideo}
                className="btn-secondary text-base group flex items-center justify-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play size={14} className="text-white ml-0.5" fill="white" />
                </div>
                Watch Preview
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 text-sm text-gray-500"
            >
              {['✓ Lifetime Access', '✓ Certificate Included', '✓ Refund Guarantee', '✓ Beginner Friendly'].map((t) => (
                <span key={t} className="text-gray-400">{t}</span>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            {/* Floating dashboard mockup */}
            <div className="relative">
              {/* Main card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-strong rounded-3xl p-6 border border-white/10 backdrop-blur-xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-orange to-accent-pink flex items-center justify-center">
                      <Zap size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">AI Career Dashboard</p>
                      <p className="text-xs text-gray-500">Your learning journey</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c) => (
                      <div key={c} className={`w-3 h-3 rounded-full ${c} opacity-60`} />
                    ))}
                  </div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Prompt Engineering', pct: 92, color: '#ff6b35' },
                    { label: 'AI Automation', pct: 78, color: '#8b5cf6' },
                    { label: 'ChatGPT Mastery', pct: 85, color: '#00d9ff' },
                    { label: 'Business Applications', pct: 65, color: '#ec4899' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{item.label}</span>
                        <span style={{ color: item.color }}>{item.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.pct}%` }}
                          transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ background: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: '15', label: 'Hours', color: 'text-accent-orange' },
                    { val: '100+', label: 'Tools', color: 'text-accent-cyan' },
                    { val: '∞', label: 'Access', color: 'text-accent-purple' },
                  ].map((s) => (
                    <div key={s.label} className="glass rounded-xl p-3 text-center">
                      <p className={`font-bold text-lg ${s.color}`}>{s.val}</p>
                      <p className="text-xs text-gray-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating mini cards */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -left-16 top-1/4 glass rounded-2xl p-3 flex items-center gap-3 w-44 border border-white/10"
              >
                <div className="w-8 h-8 rounded-xl bg-accent-cyan/20 flex items-center justify-center text-lg">🤖</div>
                <div>
                  <p className="text-xs font-semibold text-white">ChatGPT</p>
                  <p className="text-xs text-gray-500">Advanced Prompts</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -right-8 bottom-1/4 glass rounded-2xl p-3 flex items-center gap-3 w-44 border border-white/10"
              >
                <div className="w-8 h-8 rounded-xl bg-accent-purple/20 flex items-center justify-center text-lg">🎯</div>
                <div>
                  <p className="text-xs font-semibold text-white">Certificate</p>
                  <p className="text-xs text-green-400">Earned! ✓</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-8 right-1/4 glass rounded-2xl p-3 flex items-center gap-3 border border-white/10"
              >
                <span className="text-xl">🚀</span>
                <div>
                  <p className="text-xs font-semibold text-white">2x Productivity</p>
                  <p className="text-xs text-accent-orange">This week</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: 5000, suffix: '+', label: 'Students Enrolled', color: 'from-accent-orange to-accent-pink' },
            { value: 100, suffix: '+', label: 'AI Tools Covered', color: 'from-accent-cyan to-accent-purple' },
            { value: 15, suffix: ' hrs', label: 'Course Content', color: 'from-accent-purple to-accent-pink' },
            { value: 4.9, suffix: '/5', label: 'Average Rating', color: 'from-amber-400 to-orange-400' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`font-display font-bold text-3xl sm:text-4xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2000} />
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeVideo}
                className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm"
              >
                <X size={18} /> Close
              </button>

              {/* Video player */}
              <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
                <video
                  ref={videoRef}
                  src="/Create_a_cinematic_advertiseme.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  style={{ display: 'block' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1"
        >
          <div className="w-1 h-2 bg-accent-orange rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Zap({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
