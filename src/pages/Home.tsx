import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Shield, Users } from 'lucide-react';
import { CLASSES, TRAINERS } from '../constants';
import Card from '../components/Card';

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000"
            alt="Yoga Hero"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium backdrop-blur-md mb-6">
              <Sparkles className="w-4 h-4" />
              Find Your Inner Peace
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Elevate Your Mind, <br />
              <span className="text-emerald-400">Strengthen Your Body</span>
            </h1>
            <p className="text-xl text-stone-200 mb-10 leading-relaxed">
              Join our community of mindful practitioners. Whether you're a beginner or an advanced yogi, we have the perfect path for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/classes"
                className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-900/20"
              >
                Join Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/poses"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/20 transition-all text-center"
              >
                Explore Poses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-stone-800 mb-6">Why Choose ZenFlow?</h2>
            <p className="text-stone-500 text-lg">We provide a holistic approach to yoga, combining physical strength with mental clarity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Holistic Health', desc: 'Improve your physical, mental, and emotional well-being.' },
              { icon: Shield, title: 'Expert Guidance', desc: 'Learn from certified instructors with years of experience.' },
              { icon: Users, title: 'Community Support', desc: 'Join a supportive network of like-minded individuals.' }
            ].map((benefit, i) => (
              <Card key={i} className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-4">{benefit.title}</h3>
                <p className="text-stone-500 leading-relaxed">{benefit.desc}</p>
              </Card>
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
            <Link to="/classes" className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CLASSES.map((yogaClass) => (
              <Card key={yogaClass.id}>
                <div className="relative h-64 overflow-hidden">
                  <img src={yogaClass.image} alt={yogaClass.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-600">
                    {yogaClass.difficulty}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{yogaClass.title}</h3>
                  <p className="text-stone-500 text-sm mb-4">{yogaClass.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                    <span className="text-sm text-stone-400">{yogaClass.duration} • {yogaClass.instructor}</span>
                    <Link to={`/workout/${yogaClass.id}`} className="text-emerald-600 font-bold text-sm">Start Now</Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-emerald-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800 rounded-full blur-3xl -mr-48 -mt-48 opacity-50" />
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
                  <div className="w-12 h-12 bg-emerald-500 rounded-full" />
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <span className="text-emerald-400 text-sm">Member for 1 year</span>
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
                  <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-2xl font-bold text-stone-800 mb-2">{trainer.name}</h3>
                <p className="text-emerald-600 font-medium mb-4">{trainer.role}</p>
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
