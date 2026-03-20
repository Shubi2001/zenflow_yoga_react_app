import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, User, Calendar, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useYoga } from '../context/YogaContext';
import { useAuth } from '../context/AuthContext';
import { CLASSES } from '../constants';
import Card from '../components/Card';
import LazyImage from '../components/LazyImage';

const Classes = () => {
  const navigate = useNavigate();
  const { bookings, classStats, bookClass, cancelBooking } = useYoga();
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = React.useState('All');
  const [bookingLoading, setBookingLoading] = React.useState<string | null>(null);
  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const handleJoin = (id: string) => {
    navigate(`/workout/${id}`);
  };

  const handleBook = async (classId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setBookingLoading(classId);
    try {
      await bookClass(classId);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to book class');
    } finally {
      setBookingLoading(null);
    }
  };

  const handleCancel = async (classId: string) => {
    const booking = bookings.find(b => b.classId === classId);
    if (!booking) return;
    
    setBookingLoading(classId);
    try {
      await cancelBooking(booking.id);
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    } finally {
      setBookingLoading(null);
    }
  };

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
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
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
                  <LazyImage 
                    src={yogaClass.image} 
                    alt={yogaClass.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {yogaClass.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-primary-600 text-xs font-bold uppercase tracking-wider mb-2">
                    <span>{yogaClass.difficulty}</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-800 mb-3">{yogaClass.title}</h3>
                  <p className="text-stone-500 text-sm mb-4 line-clamp-2">{yogaClass.description}</p>
                  
                  {/* Capacity Status */}
                  {(() => {
                    const stats = classStats[yogaClass.id] || { capacity: 20, bookedCount: 0 };
                    const isBooked = bookings.some(b => b.classId === yogaClass.id);
                    const isFull = stats.bookedCount >= stats.capacity;
                    
                    return (
                      <div className="mb-6">
                        <div className="flex justify-between text-xs font-medium mb-1.5">
                          <span className={isFull ? 'text-red-500' : 'text-stone-400'}>
                            {isFull ? 'Class Full' : `${stats.capacity - stats.bookedCount} spots left`}
                          </span>
                          <span className="text-stone-400">{stats.bookedCount}/{stats.capacity} booked</span>
                        </div>
                        <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(stats.bookedCount / stats.capacity) * 100}%` }}
                            className={`h-full ${isFull ? 'bg-red-400' : 'bg-primary-500'}`}
                          />
                        </div>
                        
                        <div className="mt-4">
                          {isBooked ? (
                            <div className="flex items-center justify-between bg-primary-50 p-3 rounded-xl border border-primary-100">
                              <div className="flex items-center gap-2 text-primary-700 text-sm font-bold">
                                <CheckCircle2 className="w-4 h-4" />
                                Booked
                              </div>
                              <button 
                                onClick={() => handleCancel(yogaClass.id)}
                                disabled={bookingLoading === yogaClass.id}
                                className="text-stone-400 hover:text-red-500 text-xs font-medium transition-colors disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleBook(yogaClass.id)}
                              disabled={isFull || bookingLoading === yogaClass.id}
                              className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                                isFull 
                                ? 'bg-stone-100 text-stone-400 cursor-not-allowed' 
                                : 'bg-stone-900 text-white hover:bg-stone-800 shadow-lg shadow-stone-200'
                              }`}
                            >
                              {bookingLoading === yogaClass.id ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              ) : (
                                <>
                                  <Calendar className="w-4 h-4" />
                                  Book Class
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                  
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
                    <button 
                      onClick={() => handleJoin(yogaClass.id)}
                      className="text-primary-600 font-bold hover:text-primary-700 transition-colors"
                    >
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
