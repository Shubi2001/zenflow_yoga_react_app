import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const BlogPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-stone-800 mb-4">Post Not Found</h2>
        <p className="text-stone-500 mb-8">The blog post you are looking for doesn't exist.</p>
        <Link to="/blog" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </button>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-8 text-stone-400 text-sm font-medium border-y border-stone-100 py-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              By {post.author}
            </div>
            <div className="ml-auto flex items-center gap-4">
              <button className="p-2 hover:bg-stone-50 rounded-lg transition-colors text-stone-400 hover:text-emerald-600">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-stone-50 rounded-lg transition-colors text-stone-400 hover:text-emerald-600">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl shadow-stone-200">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Content */}
        <article className="prose prose-stone prose-lg max-w-none">
          <div className="text-stone-600 leading-relaxed space-y-8">
            <p className="text-xl font-medium text-stone-800 italic border-l-4 border-emerald-500 pl-6 py-2">
              {post.excerpt}
            </p>
            <div className="whitespace-pre-wrap">
              {post.content}
              {"\n\n"}
              Yoga is more than just a physical exercise; it is a holistic approach to living that integrates the body, mind, and spirit. By practicing regularly, you can achieve a state of balance and harmony that radiates through every aspect of your life.
              {"\n\n"}
              In today's fast-paced world, finding time for yourself is essential. Whether it's a 10-minute morning stretch or a full 90-minute class, the benefits of yoga are cumulative. It helps in reducing stress, improving flexibility, and building strength.
              {"\n\n"}
              Remember, the goal of yoga is not to touch your toes, but what you learn on the way down. Every practice is an opportunity to learn something new about yourself.
            </div>
          </div>
        </article>

        {/* Author Bio */}
        <div className="mt-24 p-12 bg-stone-50 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-emerald-200 rounded-full flex-shrink-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=400" 
              alt={post.author}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-stone-800 mb-2">About {post.author}</h4>
            <p className="text-stone-500 leading-relaxed">
              {post.author} is a certified yoga instructor with a passion for helping others find their flow. With years of experience in mindfulness and physical therapy, they bring a unique perspective to every practice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
