import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Sun, Moon } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Tools', href: '#tools' },
  { label: 'Why Us', href: '#why' },
  { label: 'Community', href: '#community' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-xl bg-dark-900/80 border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2.5 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                <img src="/Logo.png" alt="AI Career Accelerator" className="w-full h-full object-cover" style={{ transform: 'scale(1.45)', transformOrigin: 'center' }} />
              </div>
              <span className="font-display font-bold text-base text-white hidden sm:block">
                AI Career Accelerator
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-full hover:bg-white/5 transition-all duration-200 font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + Theme toggle */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme toggle */}
              <motion.button
                onClick={toggle}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="relative w-14 h-7 rounded-full border transition-all duration-300 flex items-center px-1"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                }}
                aria-label="Toggle theme"
              >
                <motion.div
                  layout
                  animate={{ x: theme === 'light' ? 28 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #ff6b35, #8b5cf6)' }}
                >
                  {theme === 'dark'
                    ? <Moon size={11} className="text-white" />
                    : <Sun size={11} className="text-white" />}
                </motion.div>
              </motion.button>

              <MagneticButton strength={0.2}>
                <button
                  onClick={() => scrollTo('#pricing')}
                  className="btn-primary text-sm px-6 py-2.5"
                >
                  Enroll Now — ₹5,999
                </button>
              </MagneticButton>
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-2">
              <motion.button
                onClick={toggle}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-6 rounded-full border flex items-center px-1 transition-all duration-300"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                }}
                aria-label="Toggle theme"
              >
                <motion.div
                  layout
                  animate={{ x: theme === 'light' ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #ff6b35, #8b5cf6)' }}
                >
                  {theme === 'dark'
                    ? <Moon size={9} className="text-white" />
                    : <Sun size={9} className="text-white" />}
                </motion.div>
              </motion.button>
              <button
                className="p-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 backdrop-blur-xl bg-dark-900/95 border-b border-white/10 lg:hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-3 text-left text-gray-200 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#pricing')}
                className="btn-primary mt-2 text-sm w-full"
              >
                Enroll Now — ₹5,999
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
