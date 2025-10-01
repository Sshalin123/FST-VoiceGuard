import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, Award, TrendingUp, Globe, Rocket, Heart, Zap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize the security and privacy of your data above all else.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Heart,
      title: 'User-Centric',
      description: 'Every decision we make is driven by what\'s best for our users.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible with AI.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of working together to achieve more.',
      color: 'from-purple-500 to-indigo-500',
    },
  ];

  const milestones = [
    {
      year: '2024 Jan',
      title: 'Project Initiated',
      description: 'Team formed at DJ Sanghvi to tackle the growing deepfake audio threat.',
      icon: Rocket,
    },
    {
      year: '2024 Mar',
      title: 'Algorithm Development',
      description: 'Developed core ML algorithms for voice pattern analysis and detection.',
      icon: TrendingUp,
    },
    {
      year: '2024 Jun',
      title: 'Platform Launch',
      description: 'Successfully deployed the web application with full detection capabilities.',
      icon: Award,
    },
    {
      year: '2024 Oct',
      title: 'Project Showcase',
      description: 'Presented VoiceGuard at college technical symposium and competitions.',
      icon: Users,
    },
  ];

  const team = [
    {
      name: 'Shalin',
      role: 'ML Engineer',
      bio: 'Computer Engineering student at DJ Sanghvi, specializing in AI/ML, MLOPS and deep learning. He usually like to eat food and plays with math.',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      name: 'Taitil',
      role: 'Lead MLE',
      bio: 'Computer Engineering student at DJ Sanghvi, passionate about web development and UI/UX.',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      name: 'Vyom',
      role: 'QUANT Developer',
      bio: 'Computer Engineering student at DJ Sanghvi, focused on finance and QUANTITATIVE analysis and may get into jane street one day.',
      gradient: 'from-pink-500 to-orange-500',
    },
    {
      name: 'Zafir',
      role: 'Backend Developer',
      bio: 'Computer Engineering student at DJ Sanghvi, expert in system architecture and APIs.',
      gradient: 'from-orange-500 to-yellow-500',
    },
    {
      name: 'Shubham',
      role: 'ML Engineer',
      bio: 'He is the real GOAT. Computer Engineering student at DJ Sanghvi, specializing in AI/ML and deep learning.',
      gradient: 'from-green-500 to-teal-500',
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 animate-gradient-shift gradient-cyber opacity-80"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-neon-blue)] rounded-full blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-[var(--color-electric-purple)] rounded-full blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6 py-16"
        >
          <div className="inline-flex items-center px-4 py-2 glassmorphism rounded-full text-sm font-medium text-[var(--color-neon-blue)] mb-6 box-glow-blue">
            <Target className="w-4 h-4 mr-2" />
            Our Mission
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Protecting Voices,<br />Preserving Trust
          </h1>

          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            We're on a mission to make audio verification accessible to everyone,
            protecting voices from deepfake manipulation.
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glassmorphism rounded-2xl p-8 md:p-12"
        >
          <h2 className="font-display text-3xl font-bold text-center mb-6 gradient-text">Our Story</h2>
          <div className="space-y-4 text-gray-300 text-lg">
            <p>
              VoiceGuard was created in 2024 by a team of Computer Engineering students
              at DJ Sanghvi College of Engineering who recognized the growing threat of
              voice deepfakes. As a college project, we set out to build a comprehensive
              solution to combat audio manipulation.
            </p>
            <p>
              What started as an academic initiative quickly evolved into a sophisticated
              platform leveraging cutting-edge machine learning and AI technologies. Our
              solution combines neural network analysis with advanced signal processing to
              provide accurate deepfake detection.
            </p>
            <p>
              As students passionate about AI and cybersecurity, we're committed to creating
              innovative solutions that address real-world problems. VoiceGuard represents
              our dedication to using technology for protecting digital identities.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section>
        <h2 className="font-display text-4xl font-bold text-center mb-12 gradient-text">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glassmorphism rounded-2xl p-6 hover-lift group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 className="font-display text-4xl font-bold text-center mb-16 gradient-text">Our Journey</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="glassmorphism rounded-2xl p-6 hover-lift group cursor-pointer"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="inline-block px-3 py-1 mb-2 glassmorphism-heavy rounded-full text-sm font-bold gradient-text">
                      {milestone.year}
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="font-display text-4xl font-bold text-center mb-12 gradient-text">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glassmorphism rounded-2xl overflow-hidden hover-lift group cursor-pointer"
            >
              <div className={`h-48 bg-gradient-to-br ${member.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full glassmorphism-heavy flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-[var(--color-neon-blue)] mb-3">{member.role}</p>
                <p className="text-sm text-gray-400">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 animate-gradient-shift gradient-cyber opacity-80" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[var(--color-neon-blue)] rounded-full blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[var(--color-electric-purple)] rounded-full blur-3xl opacity-20 animate-blob" style={{ animationDelay: '3s' }}></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 text-center py-16 px-6"
        >
          <h2 className="font-display text-4xl font-bold text-white mb-4">A Student-Led Innovation</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Built by students at DJ Sanghvi College of Engineering, combining academic knowledge
            with real-world problem solving.
          </p>
          <div className="inline-flex items-center px-6 py-3 glassmorphism-heavy rounded-full text-white border border-white/30 cursor-pointer hover:scale-105 hover:box-glow-blue transition-all duration-300">
            Learn More About Our Project →
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
