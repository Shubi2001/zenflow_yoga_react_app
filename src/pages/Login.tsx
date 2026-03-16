import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      login(email, name);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-stone-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] p-10 md:p-12 shadow-sm border border-stone-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-stone-800 mb-3">Welcome Back</h1>
          <p className="text-stone-500">Continue your journey to wellness.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 pl-12 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 pl-12 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 mb-2 ml-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-4 pl-12 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
              <Lock className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
          >
            Sign In <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="text-center mt-8 text-stone-500 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-emerald-600 font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
