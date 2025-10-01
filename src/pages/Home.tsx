import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Lock, BarChart2, Globe, Users, TrendingUp, CheckCircle, ArrowRight, Star, Play, Activity } from 'lucide-react';
import { useRef } from 'react';

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const stats = [
    { icon: TrendingUp, value: '98.7%', label: 'Accuracy', color: 'from-blue-500 to-cyan-500' },
    { icon: Globe, value: '150+', label: 'Countries', color: 'from-purple-500 to-pink-500' },
    { icon: Users, value: '10K+', label: 'Active Users', color: 'from-green-500 to-emerald-500' },
    { icon: Zap, value: '<100ms', label: 'Processing', color: 'from-orange-500 to-red-500' },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Real-time Analysis',
      description: 'Instant detection with neural networks',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Activity,
      title: 'Blockchain Verification',
      description: 'Immutable verification records',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Military-grade encryption',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: BarChart2,
      title: 'Detailed Analytics',
      description: 'Comprehensive reports & insights',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const steps = [
    {
      number: 1,
      title: 'Upload or Record',
      description: 'Upload your audio file or record directly in the browser',
      icon: '📤',
    },
    {
      number: 2,
      title: 'AI Processing',
      description: 'Our neural networks analyze 150+ vocal characteristics',
      icon: '🧠',
    },
    {
      number: 3,
      title: 'Instant Results',
      description: 'Get detailed analysis with confidence scores in seconds',
      icon: '✅',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Security Expert',
      company: 'TechCorp',
      content: 'VoiceGuard Pro has been instrumental in protecting our organization from voice-based fraud attempts.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      name: 'Michael Park',
      role: 'CTO',
      company: 'FinanceHub',
      content: 'The accuracy and speed of detection is unmatched. A must-have for any security-conscious business.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      name: 'Emma Watson',
      role: 'Product Manager',
      company: 'MediaCo',
      content: 'Easy integration and fantastic support. Our content verification workflow is now completely automated.',
      rating: 5,
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 animate-gradient-shift gradient-cyber opacity-30"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-neon-blue)] rounded-full blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-[var(--color-electric-purple)] rounded-full blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-[var(--color-cyber-pink)] rounded-full blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* Floating Cards */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {['96.2% Accurate', 'Real-Time', 'Blockchain Verified', 'Enterprise Secure', '24/7 Monitoring'].map((text, i) => (
              <motion.div
                key={i}
                className="absolute glassmorphism rounded-xl px-4 py-2 text-sm font-semibold text-white box-glow-blue"
                style={{
                  top: `${20 + i * 15}%`,
                  left: i % 2 === 0 ? '5%' : '85%',
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                {text}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-4 py-2 glassmorphism rounded-full text-sm font-medium text-[var(--color-neon-blue)] mb-8 box-glow-blue">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 10,000+ users worldwide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">Detect & Secure</span>
            <br />
            <span className="text-white">Your Voice with AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Advanced neural networks analyze voice patterns to identify synthetic audio with{' '}
            <span className="gradient-text font-bold">98.7% accuracy</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/detect"
              className="group px-8 py-4 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-electric-purple)] rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all flex items-center space-x-2"
            >
              <span>Analyze Voice Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://youtu.be/UOoiyXeduo4"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 glassmorphism rounded-full text-white font-semibold text-lg hover-lift flex items-center space-x-2 border border-white/10"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </a>
          </motion.div>

          {/* Live Counter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 inline-flex glassmorphism rounded-2xl p-6 border border-[var(--color-neon-blue)]/30 box-glow-blue"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-matrix-green)] to-[var(--color-neon-blue)] flex items-center justify-center animate-pulse">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-400">Global Detections Today</div>
                <div className="text-2xl font-bold gradient-text">24,847</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glassmorphism rounded-2xl p-6 hover-lift group cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Advanced Detection Technology
            </h2>
            <p className="text-xl text-gray-400">
              Cutting-edge features powered by AI and blockchain
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glassmorphism rounded-2xl p-8 hover:glassmorphism-heavy hover-lift group cursor-pointer"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[var(--color-neon-blue)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">
              Three simple steps to verify your audio
            </p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start space-x-6 glassmorphism rounded-2xl p-8 hover:glassmorphism-heavy transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-neon-blue)] to-[var(--color-electric-purple)] flex items-center justify-center text-4xl">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="text-[var(--color-neon-blue)] font-bold text-sm mb-2">STEP {step.number}</div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-lg">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-400">
              See what our customers have to say
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glassmorphism rounded-2xl p-8 hover:glassmorphism-heavy hover-lift"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[var(--color-golden-yellow)] fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glassmorphism rounded-2xl p-12 text-center border border-[var(--color-neon-blue)]/30 box-glow-blue"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Ready to Secure Your Voice?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join 10,000+ users protecting their vocal identity
            </p>
            <Link
              to="/detect"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-electric-purple)] rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all space-x-2"
            >
              <span>Start Free Analysis</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-gray-500 text-sm mt-4">No credit card required • Free forever plan</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
