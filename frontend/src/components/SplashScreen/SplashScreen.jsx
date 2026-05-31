import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GANESH_SHLOK = {
  invocation: '॥ श्री गणेशाय नमः ॥',
  sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
  meaning: 'O Lord Ganesha, of curved trunk, large body, radiant as a million suns —\nbless all my endeavours, always.',
};

const SARASWATI_SHLOK = {
  invocation: '॥ श्री सरस्वत्यै नमः ॥',
  sanskrit: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता।\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना॥',
  meaning: 'She who is pure as the Kunda flower, Moon and snow, robed in white —\ngrant us wisdom, knowledge and speech.',
};

const DURATION = 6000; // ms before auto-dismiss

export default function SplashScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
    }, 50);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setVisible(false);
      setTimeout(onComplete, 700);
    }, DURATION);

    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [onComplete]);

  const handleSkip = () => {
    setVisible(false);
    setTimeout(onComplete, 700);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, #1e0a35 0%, #0d0518 55%, #050208 100%)',
          }}
        >
          {/* Decorative rings */}
          {[220, 340, 460].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full border pointer-events-none"
              style={{
                width: size, height: size,
                borderColor: `rgba(212,175,55,${0.12 - i * 0.03})`,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
            />
          ))}

          {/* Top OM symbol */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl mb-6 select-none"
            style={{ color: '#d4af37', fontFamily: 'serif', textShadow: '0 0 30px rgba(212,175,55,0.6)' }}
          >
            ॐ
          </motion.p>

          {/* Deity images */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-end gap-8 sm:gap-16 mb-8"
          >
            {/* Ganesh Ji */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="relative rounded-full overflow-hidden border-4 shadow-2xl"
                style={{
                  width: 140, height: 140,
                  borderColor: '#d4af37',
                  boxShadow: '0 0 40px rgba(212,175,55,0.4), 0 0 80px rgba(212,175,55,0.15)',
                }}
              >
                <img
                  src="/ganesh.jpg"
                  alt="Shri Ganesh Ji"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="absolute inset-0 items-center justify-center text-6xl hidden"
                  style={{ background: 'linear-gradient(135deg,#1e0a35,#3d1a6e)' }}
                >
                  🐘
                </div>
              </div>
              <p style={{ color: '#d4af37', fontSize: 13, fontFamily: 'serif', letterSpacing: '0.05em' }}>
                श्री गणेश जी
              </p>
            </div>

            {/* Divider */}
            <div className="flex flex-col items-center gap-2 pb-8">
              <div style={{ width: 1, height: 80, background: 'linear-gradient(to bottom, transparent, #d4af37, transparent)' }} />
              <span style={{ color: '#d4af37', fontSize: 20, fontFamily: 'serif' }}>॥</span>
              <div style={{ width: 1, height: 80, background: 'linear-gradient(to bottom, transparent, #d4af37, transparent)' }} />
            </div>

            {/* Saraswati Mata */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="relative rounded-full overflow-hidden border-4 shadow-2xl"
                style={{
                  width: 140, height: 140,
                  borderColor: '#d4af37',
                  boxShadow: '0 0 40px rgba(212,175,55,0.4), 0 0 80px rgba(212,175,55,0.15)',
                }}
              >
                <img
                  src="/saraswati.jpg"
                  alt="Maa Saraswati"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="absolute inset-0 items-center justify-center text-6xl hidden"
                  style={{ background: 'linear-gradient(135deg,#1e0a35,#3d1a6e)' }}
                >
                  🪷
                </div>
              </div>
              <p style={{ color: '#d4af37', fontSize: 13, fontFamily: 'serif', letterSpacing: '0.05em' }}>
                माँ सरस्वती जी
              </p>
            </div>
          </motion.div>

          {/* Shloka block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-center px-6 max-w-lg space-y-5"
          >
            {/* Ganesh shloka */}
            <div className="space-y-1">
              <p style={{ color: '#f0c040', fontSize: 11, letterSpacing: '0.15em', fontFamily: 'serif' }}>
                {GANESH_SHLOK.invocation}
              </p>
              <p
                style={{
                  color: '#ffe87a', fontSize: 15, fontFamily: 'serif', lineHeight: 1.9,
                  textShadow: '0 0 20px rgba(255,232,122,0.3)', whiteSpace: 'pre-line',
                }}
              >
                {GANESH_SHLOK.sanskrit}
              </p>
            </div>

            {/* Horizontal rule */}
            <div className="flex items-center gap-3">
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.5))' }} />
              <span style={{ color: '#d4af37', fontSize: 16 }}>॥</span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.5))' }} />
            </div>

            {/* Saraswati shloka */}
            <div className="space-y-1">
              <p style={{ color: '#f0c040', fontSize: 11, letterSpacing: '0.15em', fontFamily: 'serif' }}>
                {SARASWATI_SHLOK.invocation}
              </p>
              <p
                style={{
                  color: '#ffe87a', fontSize: 15, fontFamily: 'serif', lineHeight: 1.9,
                  textShadow: '0 0 20px rgba(255,232,122,0.3)', whiteSpace: 'pre-line',
                }}
              >
                {SARASWATI_SHLOK.sanskrit}
              </p>
            </div>
          </motion.div>

          {/* Progress bar + skip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 flex flex-col items-center gap-4"
          >
            {/* Progress bar */}
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 200, height: 2, background: 'rgba(212,175,55,0.2)' }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #d4af37, #ffe87a)',
                  width: `${progress}%`,
                }}
              />
            </div>

            <button
              onClick={handleSkip}
              className="text-xs transition-all"
              style={{ color: 'rgba(212,175,55,0.6)', letterSpacing: '0.1em' }}
              onMouseEnter={(e) => e.target.style.color = '#d4af37'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(212,175,55,0.6)'}
            >
              JAI SHRI GANESHA · TAP TO ENTER ✦
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
