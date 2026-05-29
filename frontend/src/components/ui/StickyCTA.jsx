import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed && window.scrollY > 600) setVisible(true);
      else if (window.scrollY <= 600) setVisible(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  const scrollToPricing = () => {
    document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <div className="glass-strong rounded-2xl px-5 py-4 border border-white/15 flex items-center gap-4 shadow-2xl shadow-black/50">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm">AI Career Accelerator</p>
              <div className="flex items-center gap-2">
                <span className="font-bold text-accent-orange">₹5,999</span>
                <span className="text-xs text-gray-500 line-through">₹14,999</span>
                <span className="text-xs text-accent-orange">60% OFF</span>
              </div>
            </div>
            <button
              onClick={scrollToPricing}
              className="btn-primary text-sm px-5 py-2.5 shrink-0"
            >
              Enroll <ArrowRight size={14} className="inline" />
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-gray-600 hover:text-gray-400 transition-colors shrink-0"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
