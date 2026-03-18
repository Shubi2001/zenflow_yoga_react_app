import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Heart, Calendar, ArrowRight, ShieldCheck, Edit2, Save, X as CloseIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useYoga } from '../context/YogaContext';
import { POSES } from '../constants';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const Dashboard = () => {
  const { user } = useAuth();
  const { progress, favorites } = useYoga();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    gender: user?.gender || '',
    hobby: user?.hobby || '',
    photoURL: user?.photoURL || ''
  });

  const favoritePoses = POSES.filter(p => favorites.includes(p.id));

  const stats = [
    { icon: Trophy, label: 'Sessions', value: progress.completedSessions, color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: Clock, label: 'Minutes', value: progress.totalMinutes, color: 'text-emerald-500', bg: 'bg-emerald-50' },
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
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'} 
                  alt={user?.name} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 p-2 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
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
                className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 text-center"
              >
                Upgrade to Premium
              </Link>
            )}
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-white text-stone-700 border border-stone-200 px-6 py-3 rounded-2xl font-bold hover:bg-stone-50 transition-all flex items-center gap-2"
            >
              <Edit2 className="w-5 h-5" /> Edit Profile
            </button>
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
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Profile Picture URL</label>
                  <input 
                    type="text" 
                    value={editData.photoURL}
                    onChange={(e) => setEditData({...editData, photoURL: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Gender</label>
                    <select 
                      value={editData.gender}
                      onChange={(e) => setEditData({...editData, gender: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
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
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
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
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
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
                  className="flex-1 py-4 rounded-2xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" /> Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="p-8 flex items-center gap-6">
              <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-stone-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-bold text-stone-800">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Recent Activity / Next Session */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-stone-800">Recommended for You</h2>
                <Link to="/classes" className="text-emerald-600 text-sm font-bold">View Classes</Link>
              </div>
              <Card className="p-8 bg-emerald-900 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-4">NEXT SESSION</span>
                  <h3 className="text-3xl font-bold mb-4">Morning Vinyasa Flow</h3>
                  <p className="text-emerald-100 mb-8 max-w-md">A 30-minute session to energize your body and focus your mind for the day ahead.</p>
                  <Link
                    to="/workout/1"
                    className="inline-flex items-center gap-2 bg-white text-emerald-900 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all"
                  >
                    Start Practice <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Favorite Poses</h2>
              {favoritePoses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {favoritePoses.map(pose => (
                    <Card key={pose.id} className="flex items-center gap-4 p-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={pose.image} alt={pose.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-800">{pose.name}</h4>
                        <p className="text-stone-400 text-xs italic">{pose.sanskritName}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-200">
                  <p className="text-stone-400">You haven't added any favorite poses yet.</p>
                  <Link to="/poses" className="text-emerald-600 font-bold mt-2 inline-block">Explore Library</Link>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Daily Goal</h2>
              <Card className="p-8">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-stone-400 text-sm font-medium">Progress</span>
                  <span className="text-emerald-600 font-bold">75%</span>
                </div>
                <div className="h-3 bg-stone-100 rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-emerald-500 w-3/4" />
                </div>
                <p className="text-stone-500 text-sm">You're almost there! Complete one more session to hit your daily goal.</p>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Upcoming Events</h2>
              <div className="space-y-4">
                {[
                  { title: 'Full Moon Meditation', date: 'Mar 20', time: '7:00 PM' },
                  { title: 'Advanced Arm Balance', date: 'Mar 22', time: '10:00 AM' }
                ].map((event, i) => (
                  <Card key={i} className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-stone-50 rounded-xl flex flex-col items-center justify-center text-stone-800">
                      <span className="text-[10px] font-bold uppercase">{event.date.split(' ')[0]}</span>
                      <span className="text-lg font-bold leading-none">{event.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 text-sm">{event.title}</h4>
                      <p className="text-stone-400 text-xs">{event.time}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
