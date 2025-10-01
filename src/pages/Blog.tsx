import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Product Updates', 'Research', 'Security', 'Tutorials'];

  const posts = [
    {
      id: 1,
      title: 'Introducing VoiceGuard Pro 2.0: Next-Gen Deepfake Detection',
      excerpt: 'We\'re excited to announce major improvements to our AI detection capabilities, achieving 98.7% accuracy.',
      category: 'Product Updates',
      author: 'Sarah Chen',
      date: '2025-02-01',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1589254065909-b7086229d08c?w=800&h=500&fit=crop',
      featured: true,
    },
    {
      id: 2,
      title: 'How AI Detects Synthetic Voice: A Technical Deep Dive',
      excerpt: 'Understanding the neural networks and algorithms that power modern deepfake detection systems.',
      category: 'Research',
      author: 'Dr. Michael Park',
      date: '2025-01-28',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
      featured: false,
    },
    {
      id: 3,
      title: 'Best Practices for Voice Authentication in 2025',
      excerpt: 'Essential security practices to protect your organization from voice-based fraud and impersonation.',
      category: 'Security',
      author: 'Alex Rivera',
      date: '2025-01-25',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
      featured: false,
    },
    {
      id: 4,
      title: 'Getting Started with the VoiceGuard API',
      excerpt: 'A comprehensive guide to integrating voice verification into your applications.',
      category: 'Tutorials',
      author: 'Emma Watson',
      date: '2025-01-20',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
      featured: false,
    },
    {
      id: 5,
      title: 'The Rise of Deepfake Technology: Threats and Solutions',
      excerpt: 'Exploring the evolution of deepfake technology and how we\'re staying ahead of malicious actors.',
      category: 'Research',
      author: 'Dr. James Liu',
      date: '2025-01-15',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop',
      featured: false,
    },
    {
      id: 6,
      title: 'Case Study: How Enterprise Corp Prevented $2M in Fraud',
      excerpt: 'Real-world success story of voice verification preventing sophisticated fraud attempts.',
      category: 'Security',
      author: 'Sarah Chen',
      date: '2025-01-10',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
      featured: false,
    },
  ];

  const filteredPosts = selectedFilter === 'All'
    ? posts
    : posts.filter(post => post.category === selectedFilter);

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 gradient-text">
          Blog & News
        </h1>
        <p className="text-xl text-gray-400">
          Latest updates, research, and insights from the VoiceGuard team
        </p>
      </motion.div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter, index) => (
            <motion.button
              key={filter}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-electric-purple)] text-white'
                  : 'glassmorphism text-gray-400 hover:text-white hover:glassmorphism-heavy'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Featured Post */}
        {featuredPost && selectedFilter === 'All' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glassmorphism rounded-2xl overflow-hidden mb-12 hover-lift group cursor-pointer"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-full overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-[var(--color-sunset-orange)] to-[var(--color-golden-yellow)] rounded-full text-xs font-bold text-white">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-4 h-4 text-[var(--color-neon-blue)]" />
                  <span className="text-sm text-[var(--color-neon-blue)]">{featuredPost.category}</span>
                </div>
                <h2 className="font-display text-3xl font-bold text-white mb-4 group-hover:text-[var(--color-neon-blue)] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-400 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism rounded-2xl overflow-hidden hover-lift group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 glassmorphism-heavy rounded-full text-xs font-medium text-white">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[var(--color-neon-blue)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
