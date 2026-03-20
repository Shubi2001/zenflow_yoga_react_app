import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Play, Clock, Target, Smile, Zap, Moon, Heart } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { POSES } from '../constants';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const MOODS = [
  { id: 'stressed', label: 'Stressed', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'tired', label: 'Tired', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'happy', label: 'Happy', icon: Smile, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { id: 'stiff', label: 'Stiff', icon: Target, color: 'text-rose-500', bg: 'bg-rose-50' },
  { id: 'focused', label: 'Focused', icon: Sparkles, color: 'text-primary-500', bg: 'bg-primary-50' },
];

const AIRoutineGenerator = () => {
  const [mood, setMood] = useState('');
  const [duration, setDuration] = useState(15);
  const [loading, setLoading] = useState(false);
  const [routine, setRoutine] = useState<any>(null);
  const navigate = useNavigate();

  const generateRoutine = async () => {
    if (!mood) return;
    setLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Generate a ${duration}-minute yoga routine for someone feeling ${mood}. 
      Choose 5 poses from this list: ${POSES.map(p => p.name).join(', ')}.
      Return the response in JSON format: { "title": "Routine Name", "description": "Why this routine is good for your mood", "poses": ["Pose Name 1", "Pose Name 2", ...] }`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(response.text || '{}');
      
      // Map pose names back to our pose objects
      const mappedPoses = data.poses.map((name: string) => 
        POSES.find(p => p.name.toLowerCase().includes(name.toLowerCase())) || POSES[0]
      );

      setRoutine({ ...data, poses: mappedPoses });
    } catch (error) {
      console.error('Error generating routine:', error);
      // Fallback routine
      setRoutine({
        title: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Relief Flow`,
        description: `A custom routine designed to help you feel better while feeling ${mood}.`,
        poses: POSES.slice(0, 5)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 overflow-hidden relative">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-800">AI Routine Generator</h2>
        </div>

        {!routine ? (
          <div className="space-y-8">
            <div>
              <p className="text-stone-500 text-sm mb-4 font-medium uppercase tracking-wider">How are you feeling today?</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {MOODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMood(m.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border-2 ${mood === m.id ? 'border-primary-500 bg-primary-50' : 'border-stone-100 bg-stone-50 hover:border-stone-200'}`}
                  >
                    <m.icon className={`w-6 h-6 ${m.color}`} />
                    <span className="text-xs font-bold text-stone-700">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-stone-500 text-sm mb-4 font-medium uppercase tracking-wider">Duration: {duration} Minutes</p>
              <input 
                type="range" 
                min="5" 
                max="60" 
                step="5" 
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
            </div>

            <button
              onClick={generateRoutine}
              disabled={!mood || loading}
              className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-200"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              Generate My Routine
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">{routine.title}</h3>
              <p className="text-stone-500 text-sm">{routine.description}</p>
            </div>

            <div className="space-y-3">
              {routine.poses.map((pose: any, i: number) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={pose.image} alt={pose.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-stone-800">{pose.name}</p>
                    <p className="text-[10px] text-stone-400 italic">{pose.sanskritName}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setRoutine(null)}
                className="flex-1 py-4 rounded-2xl font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-all"
              >
                Try Another
              </button>
              <button
                onClick={() => navigate('/workout/ai', { state: { poses: routine.poses } })}
                className="flex-1 bg-primary-600 text-white py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-200"
              >
                <Play className="w-5 h-5" /> Start Routine
              </button>
            </div>
          </motion.div>
        )}
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-[80px] -mr-32 -mt-32 opacity-50" />
    </Card>
  );
};

export default AIRoutineGenerator;
