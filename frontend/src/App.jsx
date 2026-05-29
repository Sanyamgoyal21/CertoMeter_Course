import { useEffect, Suspense, lazy } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import CursorEffect from './components/ui/CursorEffect';
import StickyCTA from './components/ui/StickyCTA';
import { trackVisitor } from './utils/api';

function getOrCreateSessionId() {
  let id = sessionStorage.getItem('session_id');
  if (!id) {
    id = uuidv4();
    sessionStorage.setItem('session_id', id);
  }
  return id;
}

const About = lazy(() => import('./components/About/About'));
const AITools = lazy(() => import('./components/AITools/AITools'));
const Productivity = lazy(() => import('./components/Productivity/Productivity'));
const WhyDifferent = lazy(() => import('./components/WhyDifferent/WhyDifferent'));
const Community = lazy(() => import('./components/Community/Community'));
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials'));
const Pricing = lazy(() => import('./components/Pricing/Pricing'));
const FAQ = lazy(() => import('./components/FAQ/FAQ'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Footer = lazy(() => import('./components/Footer/Footer'));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-2 border-accent-orange/30 border-t-accent-orange rounded-full animate-spin" />
    </div>
  );
}

function AppContent() {
  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    trackVisitor(sessionId).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-x-hidden font-body">
      <div className="noise-overlay" />
      <CursorEffect />
      <Navbar />

      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <AITools />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Productivity />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <WhyDifferent />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Community />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <StickyCTA />
    </div>
  );
}

export default function App() {
  return (
    <SocketProvider>
      <AppContent />
    </SocketProvider>
  );
}
