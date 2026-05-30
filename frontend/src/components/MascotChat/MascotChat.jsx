import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { X, Send } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const SIZE = 110;
const PAD = 60;
const WELCOME = "Hey there! 👋 I'm your AI study buddy. Ask me anything about the course!";

export default function MascotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const animXRef = useRef(null);
  const animYRef = useRef(null);

  const posX = useMotionValue(window.innerWidth - SIZE - 32);
  const posY = useMotionValue(window.innerHeight - SIZE - 32);

  const wander = useCallback(() => {
    const targetX = PAD + Math.random() * (window.innerWidth - SIZE - PAD * 2);
    const targetY = PAD + Math.random() * (window.innerHeight - SIZE - PAD * 2);
    const dur = 2.5 + Math.random() * 2;
    animXRef.current = animate(posX, targetX, { duration: dur, ease: [0.4, 0, 0.2, 1] });
    animYRef.current = animate(posY, targetY, { duration: dur, ease: [0.4, 0, 0.2, 1] });
    timerRef.current = setTimeout(wander, (dur + 1.5 + Math.random() * 2) * 1000);
  }, [posX, posY]);

  // Auto-wander — pauses when chat open, hovered, or dragging
  useEffect(() => {
    if (isOpen || isHovered || isDragging) {
      clearTimeout(timerRef.current);
      return;
    }
    timerRef.current = setTimeout(wander, 1200);
    return () => clearTimeout(timerRef.current);
  }, [isOpen, isHovered, isDragging, wander]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [messages, isOpen]);

  const handleDragStart = () => {
    setIsDragging(true);
    clearTimeout(timerRef.current);
    animXRef.current?.stop();
    animYRef.current?.stop();
  };

  const handleDragEnd = () => {
    // Wait a tick so click doesn't fire after drag
    setTimeout(() => setIsDragging(false), 80);
    // Resume wandering after 2s pause
    if (!isOpen) {
      timerRef.current = setTimeout(wander, 2000);
    }
  };

  const handleMascotClick = () => {
    if (!isDragging) setIsOpen((o) => !o);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const updated = [...messages, { role: 'user', content: text }];
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE}/api/chat`, { messages: updated });
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      const msg = err?.response?.data?.error || "Oops! Try WhatsApp: +91 83603 41355 😊";
      setMessages((prev) => [...prev, { role: 'assistant', content: msg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.06}
      dragConstraints={{
        left: PAD,
        top: PAD,
        right: window.innerWidth - SIZE - PAD,
        bottom: window.innerHeight - SIZE - PAD,
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: posX,
        y: posY,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
        width: SIZE,
      }}
    >
      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 12 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              bottom: SIZE + 10,
              right: 0,
              width: 320,
              maxHeight: '58vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 22,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
              background: '#0f0f13',
              cursor: 'auto',
            }}
          >
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg,#ff6b35,#e040fb)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <img src="/mascot.png" alt="mascot" style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: '50%' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, color: '#fff', fontSize: 13, margin: 0 }}>AI Study Buddy</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, margin: 0 }}>Always here to help</p>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ color: 'rgba(255,255,255,0.8)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                <X size={17} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '82%',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    padding: '9px 13px',
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: msg.role === 'user' ? '#fff' : '#ddd',
                    background: msg.role === 'user' ? 'linear-gradient(135deg,#ff6b35,#e040fb)' : '#1a1a26',
                    border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.07)',
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex' }}>
                  <div style={{ background: '#1a1a26', borderRadius: '16px 16px 16px 4px', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i}
                          style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff6b35' }}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8, padding: '10px', borderTop: '1px solid rgba(255,255,255,0.07)', background: '#0f0f13', flexShrink: 0 }}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your doubt..."
                disabled={loading}
                style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none' }}
              />
              <button type="submit" disabled={loading || !input.trim()} style={{ width: 36, height: 36, borderRadius: 11, background: 'linear-gradient(135deg,#ff6b35,#e040fb)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', opacity: loading || !input.trim() ? 0.4 : 1, flexShrink: 0 }}>
                <Send size={14} color="#fff" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot */}
      <div style={{ position: 'relative' }} onClick={handleMascotClick}>
        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && isHovered && !isDragging && (
            <motion.div
              initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
              style={{ position: 'absolute', right: SIZE + 8, top: '50%', transform: 'translateY(-50%)', background: 'linear-gradient(135deg,#ff6b35,#e040fb)', color: '#fff', fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 10, whiteSpace: 'nowrap', pointerEvents: 'none', boxShadow: '0 4px 16px rgba(255,107,53,0.35)' }}
            >
              Ask me anything! 💬
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <img
            src="/mascot.png"
            alt="AI Study Buddy"
            draggable={false}
            style={{ width: SIZE, height: SIZE, objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 8px 20px rgba(255,107,53,0.35))' }}
          />
          <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', width: 50, height: 10, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(255,107,53,0.5),transparent)', filter: 'blur(5px)' }} />
          {!isOpen && (
            <span style={{ position: 'absolute', top: 6, right: 6, width: 11, height: 11, background: '#ff6b35', borderRadius: '50%', border: '2px solid #0a0a0f', boxShadow: '0 0 6px #ff6b35' }} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
