import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, User } from 'lucide-react';
import { CLASSES } from '../constants';
import Card from '../components/Card';

const Classes = () => {
  const [filter, setFilter] = React.useState('All');
  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredClasses = filter === 'All' 
    ? CLASSES 
    : CLASSES.filter(c => c.difficulty === filter);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-stone-800 mb-6">Yoga Classes</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Choose from a variety of classes tailored to your skill level and goals.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                : 'bg-white text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((yogaClass, index) => (
            <motion.div
              key={yogaClass.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="relative h-56">
                  <img src={yogaClass.image} alt={yogaClass.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {yogaClass.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-2">
                    <span>{yogaClass.difficulty}</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-3">{yogaClass.title}</h3>
                  <p className="text-stone-500 text-sm mb-6 line-clamp-2">{yogaClass.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-stone-400 text-sm">
                        <Clock className="w-4 h-4" />
                        {yogaClass.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-400 text-sm">
                        <User className="w-4 h-4" />
                        {yogaClass.instructor}
                      </div>
                    </div>
                    <button className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors">
                      Join
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

export default Classes;
