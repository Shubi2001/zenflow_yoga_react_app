import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-stone-50 border-t border-stone-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Logo className="w-6 h-6 text-primary-600" />
              <span className="text-xl font-bold text-stone-800 tracking-tight">ZenFlow</span>
            </Link>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              Empowering your journey to holistic wellness through mindful yoga practice and community support.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white rounded-lg border border-stone-200 text-stone-400 hover:text-primary-600 hover:border-primary-200 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white rounded-lg border border-stone-200 text-stone-400 hover:text-primary-600 hover:border-primary-200 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white rounded-lg border border-stone-200 text-stone-400 hover:text-primary-600 hover:border-primary-200 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/classes" className="text-stone-500 hover:text-primary-600 transition-colors text-sm">Classes</Link></li>
              <li><Link to="/poses" className="text-stone-500 hover:text-primary-600 transition-colors text-sm">Pose Library</Link></li>
              <li><Link to="/trainers" className="text-stone-500 hover:text-primary-600 transition-colors text-sm">Our Trainers</Link></li>
              <li><Link to="/blog" className="text-stone-500 hover:text-primary-600 transition-colors text-sm">Blog & Tips</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-stone-500 hover:text-primary-600 transition-colors text-sm">Contact Us</Link></li>
              <li><a href="#" className="text-stone-500 hover:text-primary-600 transition-colors text-sm">FAQs</a></li>
              <li><a href="#" className="text-stone-500 hover:text-primary-600 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-stone-500 hover:text-primary-600 transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 mb-6">Newsletter</h4>
            <p className="text-stone-500 text-sm mb-4">Get weekly yoga tips and updates.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white border border-stone-200 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
              <button className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-stone-200 text-center">
          <p className="text-stone-400 text-xs">
            © {new Date().getFullYear()} ZenFlow Yoga. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
