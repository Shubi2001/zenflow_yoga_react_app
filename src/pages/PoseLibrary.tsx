import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Info, ChevronRight } from 'lucide-react';
import { POSES } from '../constants';
import { useYoga } from '../context/YogaContext';
import Card from '../components/Card';

const PoseLibrary = () => {
  const { favorites, toggleFavorite } = useYoga();
  const [selectedPose, setSelectedPose] = React.useState(POSES[0]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Pose List */}
          <div className="lg:col-span-4 space-y-4">
            <h1 className="text-3xl font-bold text-stone-800 mb-8">Pose Library</h1>
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {POSES.map((pose) => (
                <button
                  key={pose.id}
                  onClick={() => setSelectedPose(pose)}
                  className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between group ${
                    selectedPose.id === pose.id 
                    ? 'bg-emerald-600 text-white shadow-lg' 
                    : 'bg-white text-stone-700 hover:bg-emerald-50'
                  }`}
                >
                  <div>
                    <h3 className="font-bold">{pose.name}</h3>
                    <p className={`text-xs ${selectedPose.id === pose.id ? 'text-emerald-100' : 'text-stone-400'}`}>
                      {pose.sanskritName}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${selectedPose.id === pose.id ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Pose Detail */}
          <div className="lg:col-span-8">
            <motion.div
              key={selectedPose.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-stone-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                    <img src={selectedPose.image} alt={selectedPose.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <button
                    onClick={() => toggleFavorite(selectedPose.id)}
                    className={`absolute top-4 right-4 p-4 rounded-2xl backdrop-blur-md transition-all ${
                      favorites.includes(selectedPose.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white/80 text-stone-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${favorites.includes(selectedPose.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-xs font-bold uppercase">
                      {selectedPose.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-bold uppercase">
                      {selectedPose.category}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-stone-800 mb-2">{selectedPose.name}</h2>
                  <p className="text-xl text-stone-400 italic mb-6">{selectedPose.sanskritName}</p>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-stone-800 mb-3">
                        <Info className="w-5 h-5 text-emerald-600" />
                        Description
                      </h4>
                      <p className="text-stone-500 leading-relaxed">{selectedPose.description}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-stone-800 mb-4">Benefits</h4>
                      <ul className="grid grid-cols-1 gap-3">
                        {selectedPose.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-3 text-stone-500">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoseLibrary;
