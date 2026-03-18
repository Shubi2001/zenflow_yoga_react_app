import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flower2, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Classes', path: '/classes' },
    { name: 'Pose Library', path: '/poses' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Membership', path: '/membership' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
              <Flower2 className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-xl font-bold text-stone-800 tracking-tight">ZenFlow</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-emerald-600",
                  location.pathname === link.path ? "text-emerald-600" : "text-stone-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="flex items-center gap-6 border-l border-stone-200 pl-8">
                <Link to="/dashboard" className="flex items-center gap-3 text-sm font-medium text-stone-700 hover:text-emerald-600 transition-colors">
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt={user.name} className="w-8 h-8 rounded-full border border-stone-200" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
                      <User className="w-4 h-4 text-stone-500" />
                    </div>
                  )}
                  <span className="hidden lg:inline">{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-stone-500 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-700 transition-all hover:shadow-lg hover:shadow-emerald-200"
              >
                Join Now
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-600 hover:text-emerald-600 transition-colors"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-stone-200 px-4 py-6 space-y-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-stone-700"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-stone-100">
            {isAuthenticated ? (
              <div className="space-y-4">
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-stone-700">Dashboard</Link>
                <button onClick={() => { logout(); setIsOpen(false); }} className="block text-lg font-medium text-red-500">Logout</button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-emerald-600 text-white py-3 rounded-xl font-medium"
              >
                Join Now
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
