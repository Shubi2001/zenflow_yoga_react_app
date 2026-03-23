import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, CheckCircle2, Maximize2, Minimize2, Volume2, VolumeX, Music, Mic } from 'lucide-react';
import { POSES } from '../constants';
import { useYoga } from '../context/YogaContext';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import LazyImage from '../components/LazyImage';

const SOUNDSCAPES = [
  { id: 'none', name: 'None', icon: VolumeX },
  { id: 'rain', name: 'Rain', icon: Volume2, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }, // Placeholder
  { id: 'forest', name: 'Forest', icon: Music, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }, // Placeholder
  { id: 'bowls', name: 'Tibetan Bowls', icon: Mic, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }, // Placeholder
];

const WorkoutSession = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addSession } = useYoga();

  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [currentSound, setCurrentSound] = useState('none');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get poses from location state (AI routine) or use default POSES
  const sessionPoses = location.state?.poses || POSES.slice(0, 5);
  const currentPose = sessionPoses[currentPoseIndex % sessionPoses.length];
  const totalPoses = sessionPoses.length;

  // Timer logic
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (currentPoseIndex < totalPoses - 1) {
        handleNext();
      } else {
        handleFinish();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentPoseIndex, totalPoses]);

  // Voice guidance logic
  useEffect(() => {
    if (isVoiceEnabled && isActive) {
      if (timeLeft === 60) {
        speak(`Next pose: ${currentPose.name}. Hold for 60 seconds.`);
      } else if (timeLeft === 10) {
        speak("10 seconds remaining.");
      } else if (timeLeft === 3) {
        speak("3, 2, 1. Switch.");
      }
    }
  }, [timeLeft, isActive, isVoiceEnabled, currentPose.name]);

  // Soundscape logic
  useEffect(() => {
    if (currentSound !== 'none') {
      const sound = SOUNDSCAPES.find(s => s.id === currentSound);
      if (sound?.url) {
        if (!audioRef.current) {
          audioRef.current = new Audio(sound.url);
          audioRef.current.loop = true;
        } else {
          audioRef.current.src = sound.url;
        }
        if (isActive) {
          audioRef.current.play().catch(e => console.error("Audio play failed", e));
        }
      }
    } else {
      audioRef.current?.pause();
    }

    return () => {
      audioRef.current?.pause();
    };
  }, [currentSound, isActive]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    setCurrentPoseIndex(prev => prev + 1);
    setTimeLeft(60);
    setIsActive(true);
  };

  const handleFinish = () => {
    setIsActive(false);
    setIsFinished(true);
    addSession(5);
    audioRef.current?.pause();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleZenMode = () => {
    if (!isZenMode) {
      document.documentElement.requestFullscreen().catch(e => console.error(e));
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(e => console.error(e));
      }
    }
    setIsZenMode(!isZenMode);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-xl text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-stone-800 mb-4">Session Complete!</h2>
          <p className="text-stone-500 mb-8">Great job on completing your yoga practice. You've earned 5 minutes of mindfulness.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-700 flex flex-col ${isZenMode ? 'bg-black' : 'bg-stone-900 pt-20'}`}>
      <div className={`flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isZenMode ? 'max-w-none' : ''}`}>
        
        {/* Pose Visual */}
        <motion.div
          key={currentPose.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 transition-all duration-700 ${isZenMode ? 'aspect-video lg:col-span-2 max-h-[70vh] mx-auto' : 'aspect-video md:aspect-square'}`}
        >
          <LazyImage 
            src={currentPose.image} 
            alt={currentPose.name} 
            containerClassName="w-full h-full"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-4xl font-bold mb-2">{currentPose.name}</h2>
            <p className="text-stone-300 italic">{currentPose.sanskritName}</p>
          </div>
          
          {/* Zen Mode Controls Overlay */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button 
              onClick={toggleZenMode}
              className="p-3 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-black/60 transition-all"
              title={isZenMode ? "Exit Zen Mode" : "Enter Zen Mode"}
            >
              {isZenMode ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Controls */}
        <div className={`flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-700 ${isZenMode ? 'lg:col-span-2 lg:flex-row lg:justify-between lg:items-center w-full mt-8' : ''}`}>
          <div className={`${isZenMode ? 'flex items-center gap-12' : 'mb-12'}`}>
            <div className={isZenMode ? 'text-left' : ''}>
              <span className="text-primary-400 font-bold uppercase tracking-widest mb-4 block">Current Pose {currentPoseIndex + 1}/{totalPoses}</span>
              <h1 className={`font-bold text-white font-mono ${isZenMode ? 'text-7xl' : 'text-6xl mb-8'}`}>
                {formatTime(timeLeft)}
              </h1>
            </div>
            
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsActive(!isActive)}
                className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-all shadow-lg shadow-primary-900/40"
              >
                {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              {!isZenMode && (
                <>
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
                </>
              )}
            </div>
          </div>

          {!isZenMode ? (
            <div className="w-full bg-white/5 rounded-3xl p-8 border border-white/10">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-white font-bold">Soundscape</h4>
                <div className="flex gap-2">
                  {SOUNDSCAPES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSound(s.id)}
                      className={`p-2 rounded-lg transition-all ${currentSound === s.id ? 'bg-primary-600 text-white' : 'bg-white/10 text-stone-400 hover:bg-white/20'}`}
                      title={s.name}
                    >
                      <s.icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-white font-bold">Voice Guidance</h4>
                <button
                  onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${isVoiceEnabled ? 'bg-primary-600 text-white' : 'bg-white/10 text-stone-400'}`}
                >
                  {isVoiceEnabled ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              <h4 className="text-white font-bold mb-4">Next Up</h4>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  <LazyImage 
                    src={sessionPoses[(currentPoseIndex + 1) % totalPoses].image} 
                    alt="Next" 
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">{sessionPoses[(currentPoseIndex + 1) % totalPoses].name}</p>
                  <p className="text-stone-500 text-sm italic">{sessionPoses[(currentPoseIndex + 1) % totalPoses].sanskritName}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                {SOUNDSCAPES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSound(s.id)}
                    className={`p-3 rounded-full transition-all ${currentSound === s.id ? 'bg-primary-600 text-white' : 'bg-white/10 text-stone-400 hover:bg-white/20'}`}
                  >
                    <s.icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`h-2 bg-white/10 w-full ${isZenMode ? 'fixed bottom-0' : ''}`}>
        <motion.div
          className="h-full bg-primary-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentPoseIndex + 1) / totalPoses) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default WorkoutSession;
