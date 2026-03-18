import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../constants';
import Card from '../components/Card';

const Blog = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-stone-800 mb-6">Yoga & Wellness Blog</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Insights, tips, and articles to help you on your journey to wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-emerald-600">
                    {post.category}
                  </div>
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-6 text-stone-400 text-xs font-medium mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-stone-800 mb-4 group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-stone-500 text-lg leading-relaxed mb-8">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
