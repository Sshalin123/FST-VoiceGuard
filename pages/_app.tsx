import type { AppProps } from 'next/app';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import ChatBot from '../components/ChatBot';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { DetectionProvider } from '../contexts/DetectionContext';
import '../styles/globals.css';

const FloatingButtons = ({ setChatOpen }: { setChatOpen: (open: boolean) => void }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="fixed z-50 bottom-8 right-8 flex flex-col items-end gap-4">
      {!isAuthenticated && (
        <Link
          href="/deepfake-audio"
          className="w-16 h-16 rounded-full glassmorphism hover-lift box-glow-purple flex items-center justify-center text-white group"
          title="Deepfake Audio Generator"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </Link>
      )}

      <button
        onClick={() => setChatOpen(true)}
        className="w-16 h-16 rounded-full glassmorphism hover-lift box-glow-blue flex items-center justify-center text-white group"
        title="Chat Support"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
    </div>
  );
};

function AppContent({ Component, pageProps }: AppProps) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="grid-pattern fixed inset-0 opacity-30"></div>
      <div className="particles-container fixed inset-0"></div>

      <Navigation />
      <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <FloatingButtons setChatOpen={setChatOpen} />

      <AnimatePresence mode="wait">
        <Component {...pageProps} />
      </AnimatePresence>
    </div>
  );
}

function MyApp(props: AppProps) {
  return (
    <AuthProvider>
      <DetectionProvider>
        <AppContent {...props} />
      </DetectionProvider>
    </AuthProvider>
  );
}

export default MyApp;