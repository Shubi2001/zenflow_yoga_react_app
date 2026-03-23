import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Shield, Users } from 'lucide-react';
import { CLASSES, TRAINERS } from '../constants';
import Card from '../components/Card';

import LazyImage from '../components/LazyImage';

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000"
            alt="Yoga Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 text-primary-300 text-sm font-medium backdrop-blur-md mb-8 border border-white/10"
            >
              <Sparkles className="w-4 h-4" />
              Find Your Inner Peace
            </motion.span>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-8 leading-[0.9] tracking-tight font-serif italic">
              Elevate Your <br />
              <span className="text-primary-400 not-italic font-sans">Mind & Body</span>
            </h1>
            <p className="text-xl text-stone-200 mb-12 leading-relaxed font-light max-w-lg">
              Join our community of mindful practitioners. Whether you're a beginner or an advanced yogi, we have the perfect path for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                to="/classes"
                className="bg-primary-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary-900/40"
              >
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/poses"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/20 transition-all text-center"
              >
                Explore Library
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="atmosphere absolute top-0 left-0 w-full h-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-stone-800 mb-8 font-serif italic"
            >
              Why Choose ZenFlow?
            </motion.h2>
            <p className="text-stone-500 text-xl font-light">We provide a holistic approach to yoga, combining physical strength with mental clarity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Heart, title: 'Holistic Health', desc: 'Improve your physical, mental, and emotional well-being through mindful practice.' },
              { icon: Shield, title: 'Expert Guidance', desc: 'Learn from certified instructors with years of experience in various yoga styles.' },
              { icon: Users, title: 'Community Support', desc: 'Join a supportive network of like-minded individuals on the same path.' }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-10 text-center premium-card h-full flex flex-col items-center">
                  <div className="w-20 h-20 bg-primary-50 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-10 h-10 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-6">{benefit.title}</h3>
                  <p className="text-stone-500 leading-relaxed font-light">{benefit.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-stone-800 mb-4">Featured Classes</h2>
              <p className="text-stone-500">Discover our most popular yoga sessions.</p>
            </div>
            <Link to="/classes" className="text-primary-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CLASSES.map((yogaClass) => (
              <Card key={yogaClass.id}>
                <div className="relative h-64 overflow-hidden">
                  <LazyImage 
                    src={yogaClass.image} 
                    alt={yogaClass.title} 
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-600">
                    {yogaClass.difficulty}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{yogaClass.title}</h3>
                  <p className="text-stone-500 text-sm mb-4">{yogaClass.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                    <span className="text-sm text-stone-400">{yogaClass.duration} • {yogaClass.instructor}</span>
                    <Link to={`/workout/${yogaClass.id}`} className="text-primary-600 font-bold text-sm">Start Now</Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-800 rounded-full blur-3xl -mr-48 -mt-48 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What Our Members Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Emily Watson', text: 'ZenFlow has completely changed my approach to fitness. The instructors are amazing and the community is so welcoming.' },
              { name: 'Michael Ross', text: 'The pose library is a game-changer. I can practice at my own pace and track my progress easily.' }
            ].map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/10">
                <p className="text-xl italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full" />
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <span className="text-primary-400 text-sm">Member for 1 year</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Introduction */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-stone-800 mb-16">Meet Our Expert Trainers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {TRAINERS.map(trainer => (
              <div key={trainer.id} className="group">
                <div className="relative mb-6 overflow-hidden rounded-3xl aspect-square">
                  <LazyImage 
                    src={trainer.image} 
                    alt={trainer.name} 
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-2">{trainer.name}</h3>
                <p className="text-primary-600 font-medium mb-4">{trainer.role}</p>
                <p className="text-stone-500">{trainer.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
