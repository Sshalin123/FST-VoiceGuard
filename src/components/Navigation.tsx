import React from 'react';
import { Shield, Home, BarChart2, MessageSquare, Menu, X, LogIn, Mic, DollarSign, Info, BookOpen, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/detect', label: 'Detection', icon: Shield },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart2 },
    { path: '/pricing', label: 'Pricing', icon: DollarSign },
    { path: '/about', label: 'About', icon: Info },
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glassmorphism-heavy shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Shield className="w-10 h-10 text-[var(--color-neon-blue)] transition-transform group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-[var(--color-neon-blue)] opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
              </div>
              <div>
                <span className="font-display font-bold text-2xl gradient-text">VoiceGuard</span>
                <div className="text-xs text-gray-400">Pro</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group px-4 py-2"
                >
                  <div className={`flex items-center space-x-2 transition-all duration-300 ${
                    isActive
                      ? 'text-[var(--color-neon-blue)]'
                      : 'text-gray-300 group-hover:text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-electric-purple)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="absolute inset-0 glassmorphism opacity-0 group-hover:opacity-100 transition-opacity rounded-lg -z-10"></div>
                </Link>
              );
            })}

            <Link
              to="/auth"
              className="ml-4 px-6 py-2.5 glassmorphism hover-lift rounded-full text-white font-medium text-sm border border-[var(--color-neon-blue)]/30 box-glow-blue group"
            >
              <span className="flex items-center space-x-2">
                <LogIn className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Login</span>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg glassmorphism text-gray-300 hover:text-white transition-colors"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden glassmorphism-heavy border-t border-white/10"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'glassmorphism-heavy text-[var(--color-neon-blue)] box-glow-blue'
                          : 'text-gray-300 hover:glassmorphism hover:text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-4"
              >
                <Link
                  to="/auth"
                  className="flex items-center justify-center space-x-2 px-4 py-3 glassmorphism hover-lift rounded-lg text-white font-medium border border-[var(--color-neon-blue)]/30 box-glow-blue"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;