import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Twitter, Linkedin, Github, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    { icon: Mail, label: 'Email', value: 'sigaiontop@gmail.com', href: 'mailto:sigaiontop@gmail.com' },
    { icon: Phone, label: 'Phone', value: '6969696969', href: 'tel:6969696969' },
    { icon: MapPin, label: 'Address', value: 'SVKM state of the art college of engineering', href: 'https://maps.google.com' },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 gradient-text">
          Get In Touch
        </h1>
        <p className="text-xl text-gray-400">
          Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism rounded-2xl p-8"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glassmorphism-heavy rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-blue)] transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glassmorphism-heavy rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-blue)] transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 glassmorphism-heavy rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-blue)] transition-all"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glassmorphism-heavy rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-blue)] transition-all"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="sales">Sales</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 glassmorphism-heavy rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-blue)] transition-all resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-electric-purple)] rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <span>{submitted ? 'Message Sent!' : 'Send Message'}</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          {/* Contact Methods */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-white mb-6">Contact Information</h2>
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={index}
                  href={method.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="glassmorphism rounded-xl p-6 flex items-start space-x-4 hover:glassmorphism-heavy hover-lift group cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-neon-blue)] to-[var(--color-electric-purple)] p-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">{method.label}</div>
                    <div className="text-white font-medium group-hover:text-[var(--color-neon-blue)] transition-colors">{method.value}</div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glassmorphism rounded-xl p-6"
          >
            <h3 className="font-display text-xl font-bold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glassmorphism-heavy rounded-xl flex items-center justify-center hover:box-glow-blue hover:scale-110 transition-all group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-neon-blue)] transition-colors" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Office Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="glassmorphism rounded-xl p-6"
          >
            <h3 className="font-display text-xl font-bold text-white mb-4">Support Hours</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-white">9:00 AM - 6:00 PM PST</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white">10:00 AM - 4:00 PM PST</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-gray-500">Closed</span>
              </div>
            </div>
          </motion.div>

          {/* Chat Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="glassmorphism rounded-xl p-6 border border-[var(--color-neon-blue)]/30 box-glow-blue"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-matrix-green)] to-[var(--color-neon-blue)] p-3">
                <MessageSquare className="w-full h-full text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">Need Immediate Help?</h3>
                <p className="text-sm text-gray-400">Chat with our support team</p>
              </div>
            </div>
            <button className="w-full py-3 glassmorphism-heavy rounded-xl text-white font-medium hover:glassmorphism hover:scale-105 transition-all">
              Start Live Chat
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
