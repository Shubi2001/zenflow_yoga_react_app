import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Heart, ArrowRight, ShieldCheck, Edit2, Save, X as CloseIcon, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useYoga } from '../context/YogaContext';
import { POSES, CLASSES } from '../constants';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import LazyImage from '../components/LazyImage';

import AIRoutineGenerator from '../components/AIRoutineGenerator';
import SocialFeatures from '../components/SocialFeatures';

const Dashboard = () => {
  const { user } = useAuth();
  const { progress, favorites, bookings, cancelBooking } = useYoga();
  const [isEditing, setIsEditing] = useState(false);
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    gender: user?.gender || '',
    hobby: user?.hobby || '',
    photoURL: user?.photoURL || ''
  });

  const favoritePoses = POSES.filter(p => favorites.includes(p.id));
  const bookedClasses = CLASSES.filter(c => bookings.some(b => b.classId === c.id));

  const handleCancelBooking = async (classId: string) => {
    const booking = bookings.find(b => b.classId === classId);
    if (!booking) return;

    setBookingLoading(classId);
    try {
      await cancelBooking(booking.id);
    } catch (error) {
      console.error('Error cancelling booking:', error);
    } finally {
      setBookingLoading(null);
    }
  };

  const stats = [
    { icon: Trophy, label: 'Sessions', value: progress.completedSessions, color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: Clock, label: 'Minutes', value: progress.totalMinutes, color: 'text-primary-500', bg: 'bg-primary-50' },
    { icon: Heart, label: 'Favorites', value: favorites.length, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, editData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img 
                  src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'} 
                  alt={user?.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl font-bold text-stone-800">Namaste, {user?.name}</h1>
                {user?.isPremium && (
                  <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">
                    <ShieldCheck className="w-3 h-3" />
                    PREMIUM
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-4 text-stone-500 text-sm">
                {user?.gender && <span>Gender: {user.gender}</span>}
                {user?.hobby && <span>Hobby: {user.hobby}</span>}
              </div>
              {user?.bio && <p className="text-stone-600 mt-2 max-w-md italic">"{user.bio}"</p>}
            </div>
          </div>
          
          <div className="flex gap-4">
            {!user?.isPremium && (
              <Link 
                to="/membership" 
                className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 text-center"
              >
                Upgrade to Premium
              </Link>
            )}
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-white/50 backdrop-blur-md text-stone-700 border border-stone-200 px-6 py-3 rounded-2xl font-bold hover:bg-white transition-all flex items-center gap-2"
            >
              <Edit2 className="w-5 h-5" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Stats Bento Items */}
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="md:col-span-1"
            >
              <Card className="p-6 h-full flex flex-col justify-between group hover:scale-[1.02] transition-transform">
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-stone-400 text-xs font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-stone-800">{stat.value}</p>
                </div>
              </Card>
            </motion.div>
          ))}

          {/* Daily Goal Bento Item */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1"
          >
            <Card className="p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-stone-800 mb-4">Daily Goal</h3>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-stone-400 text-xs font-medium">Progress</span>
                  <span className="text-primary-600 font-bold text-sm">75%</span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-primary-500 w-3/4" />
                </div>
              </div>
              <p className="text-stone-500 text-xs">Almost there! One more session to go.</p>
            </Card>
          </motion.div>

          {/* Recommended Session - Large Bento Item */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 md:row-span-2"
          >
            <Card className="p-8 h-full bg-primary-900 text-white relative overflow-hidden group">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold mb-6 tracking-widest uppercase">Recommended for You</span>
                  <h3 className="text-4xl font-bold mb-4 leading-tight">Morning Vinyasa Flow</h3>
                  <p className="text-primary-100 mb-8 max-w-xs text-sm">A 30-minute session to energize your body and focus your mind.</p>
                </div>
                <Link
                  to="/workout/1"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-900 px-8 py-4 rounded-2xl font-bold hover:bg-primary-50 transition-all w-fit group-hover:px-10"
                >
                  Start Practice <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary-800 rounded-full blur-[100px] -mr-40 -mt-40 opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-700 rounded-full blur-[80px] -ml-32 -mb-32 opacity-30" />
            </Card>
          </motion.div>

          {/* Streaks & Milestones - New Bento Item */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2"
          >
            <Card className="p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-stone-800">Streaks & Milestones</h3>
                <div className="flex items-center gap-1 text-orange-500 font-bold">
                  <span className="text-xl">🔥</span>
                  <span>5 Days</span>
                </div>
              </div>
              <div className="flex gap-4">
                {[7, 30, 100].map((days) => (
                  <div key={days} className="flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl bg-stone-50 border border-stone-100 opacity-50 grayscale">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-[10px] font-bold text-stone-500">{days} Days</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Favorite Poses Bento Item */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-2"
          >
            <Card className="p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-stone-800">Favorite Poses</h3>
                <Link to="/poses" className="text-primary-600 text-xs font-bold">Explore All</Link>
              </div>
              {favoritePoses.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                  {favoritePoses.map(pose => (
                    <div key={pose.id} className="flex-shrink-0 w-32">
                      <LazyImage 
                        src={pose.image} 
                        alt={pose.name} 
                        containerClassName="w-full aspect-square rounded-2xl mb-2"
                        className="w-full h-full object-cover" 
                      />
                      <p className="text-xs font-bold text-stone-800 truncate">{pose.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-32 flex flex-col items-center justify-center text-center border border-dashed border-stone-200 rounded-2xl">
                  <p className="text-stone-400 text-xs">No favorites yet.</p>
                </div>
              )}
            </Card>
          </motion.div>

          {/* My Bookings Bento Item */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="md:col-span-2"
          >
            <Card className="p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-stone-800">My Bookings</h3>
                <Link to="/classes" className="text-primary-600 text-xs font-bold">Browse Classes</Link>
              </div>
              <div className="space-y-3">
                {bookedClasses.length > 0 ? (
                  bookedClasses.slice(0, 2).map((yogaClass) => (
                    <div key={yogaClass.id} className="flex items-center gap-4 p-3 rounded-2xl bg-stone-50 group">
                      <LazyImage 
                        src={yogaClass.image} 
                        alt={yogaClass.title} 
                        containerClassName="w-12 h-12 rounded-xl flex-shrink-0"
                        className="w-full h-full object-cover" 
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-stone-800 text-xs truncate">{yogaClass.title}</h4>
                        <p className="text-stone-400 text-[10px]">{yogaClass.duration} • {yogaClass.instructor}</p>
                      </div>
                      <Link 
                        to={`/workout/${yogaClass.id}`}
                        className="p-2 bg-white text-primary-600 rounded-lg shadow-sm hover:bg-primary-600 hover:text-white transition-all"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="h-24 flex flex-col items-center justify-center text-center border border-dashed border-stone-200 rounded-2xl">
                    <p className="text-stone-400 text-xs">No bookings yet.</p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* AI Routine Generator Bento Item */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="md:col-span-2"
          >
            <AIRoutineGenerator />
          </motion.div>

          {/* Social Features Bento Item */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="md:col-span-2 md:row-span-2"
          >
            <SocialFeatures />
          </motion.div>

        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-stone-900">Edit Profile</h2>
              <button onClick={() => setIsEditing(false)} className="text-stone-400 hover:text-stone-600">
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Profile Picture URL</label>
                <input 
                  type="text" 
                  value={editData.photoURL}
                  onChange={(e) => setEditData({...editData, photoURL: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Gender</label>
                  <select 
                    value={editData.gender}
                    onChange={(e) => setEditData({...editData, gender: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Hobby</label>
                  <input 
                    type="text" 
                    value={editData.hobby}
                    onChange={(e) => setEditData({...editData, hobby: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="e.g. Hiking, Reading"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Bio</label>
                <textarea 
                  value={editData.bio}
                  onChange={(e) => setEditData({...editData, bio: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                  placeholder="Tell us about your yoga journey..."
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setIsEditing(false)}
                className="flex-1 py-4 rounded-2xl font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveProfile}
                className="flex-1 py-4 rounded-2xl font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" /> Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
