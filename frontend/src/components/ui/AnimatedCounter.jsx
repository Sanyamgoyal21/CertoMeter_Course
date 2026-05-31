import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ target, duration = 2000, prefix = '', suffix = '', className = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isInView) return;

    // After the first animation, live updates set the value directly (no re-animation)
    if (hasAnimated.current) {
      setCount(target);
      return;
    }

    hasAnimated.current = true;
    const startTime = performance.now();
    const endVal = Number(target) || 0;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(endVal * easeOut(progress)));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView, target, duration]);

  const formatted =
    count >= 1000
      ? (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + 'k'
      : count.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
