import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Mail, Instagram, Twitter } from 'lucide-react';
import { TRAINERS } from '../constants';
import Card from '../components/Card';

const Trainers = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-stone-800 mb-6">Our Expert Trainers</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Learn from world-class instructors dedicated to your growth and well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {TRAINERS.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 h-80 md:h-auto overflow-hidden">
                  <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-2 block">
                      {trainer.role}
                    </span>
                    <h2 className="text-3xl font-bold text-stone-800 mb-4">{trainer.name}</h2>
                    <p className="text-stone-500 mb-8 leading-relaxed">{trainer.bio}</p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 text-stone-700">
                        <Award className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-medium">{trainer.certifications.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-3 text-stone-700">
                        <Briefcase className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-medium">{trainer.experience} Experience</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-stone-100">
                    <button className="p-2.5 bg-stone-50 rounded-xl text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                      <Instagram className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 bg-stone-50 rounded-xl text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 bg-stone-50 rounded-xl text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                      <Mail className="w-5 h-5" />
                    </button>
                    <button className="ml-auto bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all">
                      Book Session
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainers;
