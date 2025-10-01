import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/globals.css';
import Home from './pages/Home';
import Detection from './pages/Detection';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';
import AuthPage from './pages/authpage';
import DeepfakeAudio from './pages/DeepfakeAudio';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Navigation from './components/Navigation';
import ChatBot from './components/ChatBot';
import { useState } from 'react';
import { DetectionProvider } from './contexts/DetectionContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const FloatingButtons = ({ setChatOpen }: { setChatOpen: (open: boolean) => void }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="fixed z-50 bottom-8 right-8 flex flex-col items-end gap-4">
      {!isAuthenticated && (
        <a
          href="/deepfake-audio"
          className="w-16 h-16 rounded-full glassmorphism hover-lift box-glow-purple flex items-center justify-center text-white group"
          title="Deepfake Audio Generator"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </a>
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

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <DetectionProvider>
          <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
            <div className="grid-pattern fixed inset-0 opacity-30"></div>
            <div className="particles-container fixed inset-0"></div>

            <Navigation />
            <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
            <FloatingButtons setChatOpen={setChatOpen} />

            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detect" element={<Detection />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/deepfake-audio" element={<DeepfakeAudio />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </div>
        </DetectionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;