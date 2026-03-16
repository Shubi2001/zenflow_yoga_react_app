import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Heart, Calendar, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useYoga } from '../context/YogaContext';
import { POSES } from '../constants';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const { progress, favorites } = useYoga();

  const favoritePoses = POSES.filter(p => favorites.includes(p.id));

  const stats = [
    { icon: Trophy, label: 'Sessions', value: progress.completedSessions, color: 'text-amber-500', bg: 'bg-amber-50' },
    { icon: Clock, label: 'Minutes', value: progress.totalMinutes, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { icon: Heart, label: 'Favorites', value: favorites.length, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-stone-800 mb-2">Namaste, {user?.name}</h1>
          <p className="text-stone-500">Welcome back to your practice. Here's your progress so far.</p>
        </div>

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
                        <img src={pose.image} alt={pose.name} className="w-full h-full object-cover" />
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
