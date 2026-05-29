import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'About Us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

export default function PolicyLayout({ title, subtitle, lastUpdated, children, metaDescription }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (title) document.title = `${title} — AI Career Accelerator`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && metaDescription) meta.setAttribute('content', metaDescription);
  }, [title, metaDescription]);

  return (
    <div className="min-h-screen bg-dark-900 text-white font-body">
      <div className="noise-overlay" />

      {/* Top nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-dark-900/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-orange to-accent-pink flex items-center justify-center">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              AI<span className="text-accent-orange">Career</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 overflow-x-auto">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`px-3 py-1.5 text-xs rounded-full transition-all whitespace-nowrap ${
                  location.pathname === l.href
                    ? 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative py-16 lg:py-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-orange/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-accent-orange/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">{title}</h1>
            {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
            {lastUpdated && (
              <p className="text-xs text-gray-600 mt-4 font-mono">Last updated: {lastUpdated}</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16"
      >
        <div className="prose-policy">{children}</div>
      </motion.div>

      {/* Footer strip */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-700">© 2025 AI Career Accelerator. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {navLinks.map((l) => (
              <Link key={l.href} to={l.href} className="text-xs text-gray-700 hover:text-gray-400 transition-colors">
                {l.label}
              </Link>
            ))}
            <Link to="/" className="text-xs text-accent-orange hover:text-accent-orange-light transition-colors">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable section components
export function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="font-display font-bold text-xl text-white mb-4 pb-2 border-b border-white/10">{title}</h2>
      <div className="space-y-3 text-gray-400 leading-relaxed text-sm">{children}</div>
    </section>
  );
}

export function SubSection({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="font-semibold text-white mb-2 text-base">{title}</h3>
      <div className="space-y-2 text-gray-400 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function BulletList({ items }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-orange mt-2 shrink-0" />
          <span className="text-gray-400 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function InfoBox({ type = 'info', children }) {
  const styles = {
    info: 'bg-accent-cyan/5 border-accent-cyan/20 text-accent-cyan',
    warning: 'bg-accent-orange/5 border-accent-orange/20 text-accent-orange',
    success: 'bg-green-500/5 border-green-500/20 text-green-400',
  };
  return (
    <div className={`rounded-xl p-4 border ${styles[type]} text-sm my-4`}>
      {children}
    </div>
  );
}
