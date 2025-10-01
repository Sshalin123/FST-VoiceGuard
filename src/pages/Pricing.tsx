import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Star, Shield, TrendingUp } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annually: 0 },
      badge: null,
      description: 'Perfect for getting started',
      features: [
        '10 detections/month',
        'Basic analytics',
        'Email support',
        'Standard processing speed',
        'Web access only'
      ],
      cta: 'Get Started',
      popular: false,
      gradient: 'from-gray-600 to-gray-800',
      icon: Shield,
    },
    {
      name: 'Pro',
      price: { monthly: 29, annually: 24 },
      badge: 'Most Popular',
      description: 'For professionals & businesses',
      features: [
        'Unlimited detections',
        'Advanced analytics',
        'Priority support',
        'API access',
        'White-label reports',
        'Real-time processing',
        'Blockchain verification',
        'Custom integrations'
      ],
      cta: 'Start Free Trial',
      popular: true,
      gradient: 'from-blue-500 to-purple-600',
      icon: Zap,
    },
    {
      name: 'Enterprise',
      price: { monthly: 'Custom', annually: 'Custom' },
      badge: 'Best Value',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Custom AI models',
        'Dedicated support team',
        'SLA guarantee (99.9%)',
        'On-premise deployment',
        'Advanced security features',
        'Custom training',
        'Volume discounts'
      ],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-purple-600 to-pink-600',
      icon: TrendingUp,
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-16"
        {...fadeInUp}
      >
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 gradient-text">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Transparent pricing for every need. No hidden fees.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center glassmorphism rounded-full p-1 space-x-2">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-electric-purple)] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annually')}
            className={`px-6 py-2.5 rounded-full font-medium transition-all relative ${
              billingCycle === 'annually'
                ? 'bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-electric-purple)] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Annually
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[var(--color-sunset-orange)] to-[var(--color-golden-yellow)] text-xs px-2 py-0.5 rounded-full text-white font-bold">
              Save 20%
            </span>
          </button>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.annually;

          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className={`relative glassmorphism rounded-2xl p-8 hover-lift ${
                plan.popular ? 'border-2 border-[var(--color-neon-blue)] box-glow-blue' : ''
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="glassmorphism-heavy px-4 py-1.5 rounded-full border border-[var(--color-neon-blue)]">
                    <span className="text-xs font-bold gradient-text flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} p-4 mb-6 animate-float`}>
                <Icon className="w-full h-full text-white" />
              </div>

              {/* Plan Name */}
              <h3 className="font-display text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                {typeof price === 'number' ? (
                  <>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold gradient-text">${price}</span>
                      <span className="text-gray-400 ml-2">/{billingCycle === 'monthly' ? 'mo' : 'mo'}</span>
                    </div>
                    {billingCycle === 'annually' && price > 0 && (
                      <p className="text-sm text-gray-500 mt-1">Billed ${price * 12} annually</p>
                    )}
                  </>
                ) : (
                  <div className="text-5xl font-bold gradient-text">{price}</div>
                )}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3.5 rounded-xl font-semibold transition-all mb-8 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-electric-purple)] text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105'
                    : 'glassmorphism-heavy text-white hover:glassmorphism border border-white/10'
                }`}
              >
                {plan.cta}
              </button>

              {/* Features */}
              <ul className="space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-matrix-green)] to-[var(--color-neon-blue)] flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-3xl mx-auto mt-24"
      >
        <h2 className="font-display text-4xl font-bold text-center mb-12 gradient-text">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'Can I upgrade or downgrade my plan anytime?',
              a: 'Yes! You can change your plan at any time. Changes take effect immediately, and we will prorate any charges.'
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.'
            },
            {
              q: 'Is there a free trial available?',
              a: 'Yes! Pro plan comes with a 14-day free trial. No credit card required.'
            },
            {
              q: 'What happens after my free detections run out?',
              a: 'You can upgrade to Pro for unlimited detections, or wait until next month when your quota resets.'
            }
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="glassmorphism rounded-xl p-6 hover:glassmorphism-heavy transition-all cursor-pointer group"
            >
              <h3 className="font-semibold text-white mb-2 group-hover:text-[var(--color-neon-blue)] transition-colors">
                {faq.q}
              </h3>
              <p className="text-gray-400 text-sm">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="max-w-4xl mx-auto mt-24 glassmorphism rounded-2xl p-12 text-center border border-[var(--color-neon-blue)]/30 box-glow-blue"
      >
        <h2 className="font-display text-4xl font-bold mb-4 gradient-text">
          Ready to Secure Your Voice?
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Join 10,000+ users protecting their vocal identity
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-electric-purple)] rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all">
          Start Free Analysis
        </button>
        <p className="text-gray-500 text-sm mt-4">No credit card required • Free forever plan</p>
      </motion.div>
    </div>
  );
};

export default Pricing;
