import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorEffect() {
  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="cursor-glow hidden md:block"
        style={{ left: cursorXSpring, top: cursorYSpring }}
      />
    </>
  );
}
