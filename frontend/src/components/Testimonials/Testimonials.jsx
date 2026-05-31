import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollAnimation';
import GlowOrb from '../ui/GlowOrb';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Content Manager → AI Strategist',
    avatar: '👩‍💼',
    photo: '/Priya Sharma.png',
    color: '#ff6b35',
    rating: 5,
    text: 'I went from spending 8 hours a week on content to 1 hour. The AI automation workflows they taught me are genuinely life-changing. Got promoted within 2 months of completing the course.',
    highlight: '7 hours saved weekly',
    company: 'TechCorp India',
  },
  {
    name: 'Rahul Mehta',
    role: 'Freelancer',
    avatar: '👨‍💻',
    photo: '/Rahul Mehta.jpg',
    color: '#8b5cf6',
    rating: 5,
    text: "I was skeptical at first but this course is the real deal. I now earn ₹80,000/month from AI-powered freelancing on Fiverr. The Midjourney + copywriting combo is pure gold.",
    highlight: '₹80k/month freelancing',
    company: 'Self-Employed',
  },
  {
    name: 'Ananya Krishnan',
    role: 'MBA Student',
    avatar: '👩‍🎓',
    photo: '/Ananya Krishnan.png',
    color: '#00d9ff',
    rating: 5,
    text: "As a student with zero AI background, I was worried it'd be too technical. But the course starts from absolute basics and builds up perfectly. Got an internship at an AI startup right after!",
    highlight: 'Got AI internship',
    company: 'IIM Bangalore',
  },
  {
    name: 'Vikram Patel',
    role: 'Marketing Director',
    avatar: '👨‍💼',
    photo: '/Vikram Patel.jpg',
    color: '#ec4899',
    rating: 5,
    text: 'Our entire marketing team went through this course. Our content output tripled while costs dropped 40%. The ROI was immediate. Best investment we made this year.',
    highlight: '3x content output',
    company: 'StartupXYZ',
  },
  {
    name: 'Neha Gupta',
    role: 'HR Professional',
    avatar: '👩‍🔬',
    photo: '/Neha Gupta.jpg',
    color: '#f59e0b',
    rating: 5,
    text: 'Completely changed how I handle recruitment. AI-powered JD writing, candidate screening, and email templates save me 15+ hours weekly. The community is incredibly supportive too.',
    highlight: '15+ hrs saved weekly',
    company: 'Fortune 500 Company',
  },
  {
    name: 'Arjun Reddy',
    role: 'Software Engineer',
    avatar: '👨‍🔧',
    photo: '/Arjun Reddy.jpg',
    color: '#10b981',
    rating: 5,
    text: "Even as a developer, I learned things I didn't know. The non-coding AI tools opened up a whole new world. I now use AI to document, test, and deploy faster than ever before.",
    highlight: '2x development speed',
    company: 'Big Tech Company',
  },
];

function TestimonialCard({ testimonial, isCenter }) {
  return (
    <motion.div
      layout
      className={`glass rounded-3xl p-6 border transition-all duration-500 ${
        isCenter ? 'border-white/20 scale-100' : 'border-white/5 scale-95 opacity-60'
      }`}
      style={{
        background: isCenter
          ? 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)'
          : undefined,
      }}
    >
      {/* Quote icon */}
      <div className="mb-4">
        <Quote size={24} style={{ color: testimonial.color, opacity: 0.5 }} />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={14} className="text-amber-400" fill="#f59e0b" />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-300 text-sm leading-relaxed mb-6">"{testimonial.text}"</p>

      {/* Highlight */}
      <div
        className="inline-block text-xs font-mono font-semibold px-3 py-1 rounded-full mb-4"
        style={{ background: `${testimonial.color}15`, color: testimonial.color, border: `1px solid ${testimonial.color}30` }}
      >
        ✓ {testimonial.highlight}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-xl shrink-0"
          style={{ background: `${testimonial.color}20`, border: `1px solid ${testimonial.color}30` }}
        >
          {testimonial.photo
            ? <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover" />
            : testimonial.avatar
          }
        </div>
        <div>
          <p className="font-semibold text-white text-sm">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.role} · {testimonial.company}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { ref, isInView } = useScrollReveal();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const visibleIndices = [
    (current - 1 + testimonials.length) % testimonials.length,
    current,
    (current + 1) % testimonials.length,
  ];

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden">
      <GlowOrb color="#8b5cf6" size={500} x="20%" y="50%" opacity={0.07} />
      <GlowOrb color="#00d9ff" size={400} x="80%" y="30%" opacity={0.07} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-accent-purple uppercase tracking-widest mb-4 glass px-4 py-2 rounded-full border border-accent-purple/20">
            Real Results
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
            5,000+ Lives{' '}
            <span className="text-gradient-cyan">Transformed</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real results from real people. Not actors, not paid reviews — genuine transformations.
          </p>

          {/* Aggregate rating */}
          <div className="inline-flex items-center gap-3 mt-6 glass px-6 py-3 rounded-2xl border border-white/10">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-amber-400" fill="#f59e0b" />
              ))}
            </div>
            <span className="font-bold text-white text-lg">4.9</span>
            <span className="text-gray-500 text-sm">from 2,400+ verified reviews</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {visibleIndices.map((idx, position) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <TestimonialCard
                  testimonial={testimonials[idx]}
                  isCenter={position === 1}
                />
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:border-white/30 transition-all"
            >
              <ChevronLeft size={18} className="text-gray-300" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-accent-orange' : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:border-white/30 transition-all"
            >
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Logos row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-6">Our learners work at</p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Swiggy', 'HDFC', 'TCS', 'Infosys', 'Deloitte', 'McKinsey'].map((company) => (
              <span key={company} className="text-gray-600 font-display font-semibold text-sm hover:text-gray-400 transition-colors cursor-default">
                {company}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
