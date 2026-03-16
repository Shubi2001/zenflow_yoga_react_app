import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';
import { POSES } from '../constants';
import { useYoga } from '../context/YogaContext';

const WorkoutSession = () => {
  const [currentPoseIndex, setCurrentPoseIndex] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(60);
  const [isActive, setIsActive] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);
  const { addSession } = useYoga();

  const currentPose = POSES[currentPoseIndex % POSES.length];

  React.useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (currentPoseIndex < 4) { // Let's do 5 poses for a session
        handleNext();
      } else {
        handleFinish();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleNext = () => {
    setCurrentPoseIndex(prev => prev + 1);
    setTimeLeft(60);
    setIsActive(true);
  };

  const handleFinish = () => {
    setIsActive(false);
    setIsFinished(true);
    addSession(5); // 5 minutes session
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-stone-800 mb-4">Session Complete!</h2>
          <p className="text-stone-500 mb-8">Great job on completing your yoga practice. You've earned 5 minutes of mindfulness.</p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-900 pt-20 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Pose Visual */}
        <motion.div
          key={currentPose.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10"
        >
          <img src={currentPose.image} alt={currentPose.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-4xl font-bold mb-2">{currentPose.name}</h2>
            <p className="text-stone-300 italic">{currentPose.sanskritName}</p>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="mb-12">
            <span className="text-emerald-400 font-bold uppercase tracking-widest mb-4 block">Current Pose {currentPoseIndex + 1}/5</span>
            <h1 className="text-6xl font-bold text-white mb-8 font-mono">
              {formatTime(timeLeft)}
            </h1>
            
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsActive(!isActive)}
                className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/40"
              >
                {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              <button
                onClick={() => setTimeLeft(60)}
                className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="w-full bg-white/5 rounded-3xl p-8 border border-white/10">
            <h4 className="text-white font-bold mb-4">Next Up</h4>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <img src={POSES[(currentPoseIndex + 1) % POSES.length].image} alt="Next" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">{POSES[(currentPoseIndex + 1) % POSES.length].name}</p>
                <p className="text-stone-500 text-sm italic">{POSES[(currentPoseIndex + 1) % POSES.length].sanskritName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-white/10 w-full">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentPoseIndex + 1) / 5) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default WorkoutSession;
