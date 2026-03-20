import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, MessageSquare, Share2, Plus, Zap, UserPlus, Play } from 'lucide-react';
import Card from './Card';
import LazyImage from './LazyImage';

const FEED_POSTS = [
  { id: 1, user: 'Sarah L.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100', content: 'Just finished a 30-minute Morning Flow! Feeling so energized. 🧘✨', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400', likes: 24, comments: 5 },
  { id: 2, user: 'Michael R.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', content: 'Finally mastered the Crow Pose! It took 2 weeks of practice but it was worth it. 💪', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400', likes: 42, comments: 12 },
];

const SocialFeatures = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'partner'>('feed');

  return (
    <Card className="p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-800">Community</h2>
        </div>
        <div className="flex bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'feed' ? 'bg-white text-primary-600 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Feed
          </button>
          <button
            onClick={() => setActiveTab('partner')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'partner' ? 'bg-white text-primary-600 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
          >
            Partner Yoga
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
        <AnimatePresence mode="wait">
          {activeTab === 'feed' ? (
            <motion.div
              key="feed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary-50 border border-primary-100 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary-600 shadow-sm group-hover:scale-110 transition-all">
                  <Plus className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-primary-700">Share your Zen Moment...</p>
              </div>

              {FEED_POSTS.map(post => (
                <div key={post.id} className="space-y-4 pb-6 border-b border-stone-100 last:border-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={post.avatar} alt={post.user} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                      <span className="text-sm font-bold text-stone-800">{post.user}</span>
                    </div>
                    <button className="text-stone-400 hover:text-stone-600">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">{post.content}</p>
                  <LazyImage 
                    src={post.image} 
                    alt="Post" 
                    containerClassName="w-full aspect-video rounded-2xl overflow-hidden"
                    className="w-full h-full object-cover" 
                  />
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-stone-400 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs font-bold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-stone-400 hover:text-primary-500 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs font-bold">{post.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="partner"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8 py-4"
            >
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto">
                  <UserPlus className="w-10 h-10 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-800">Practice Together</h3>
                  <p className="text-sm text-stone-500 max-w-[240px] mx-auto">Invite a friend to a synchronized yoga session and stay motivated together.</p>
                </div>
                <button className="bg-primary-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
                  Invite Friend
                </button>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Active Friends</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Emma Watson', status: 'Practicing...', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
                    { name: 'John Doe', status: 'Online', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
                  ].map((friend, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-100">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-stone-800">{friend.name}</p>
                          <p className="text-[10px] text-primary-600 font-medium">{friend.status}</p>
                        </div>
                      </div>
                      {friend.status === 'Practicing...' && (
                        <button className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-all">
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

export default SocialFeatures;
