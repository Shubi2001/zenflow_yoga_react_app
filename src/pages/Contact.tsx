import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook } from 'lucide-react';
import Card from '../components/Card';

const Contact = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-stone-800 mb-6">Get in Touch</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="p-8">
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 mb-1">Email Us</h4>
                    <p className="text-stone-500 text-sm">hello@zenflow.com</p>
                    <p className="text-stone-500 text-sm">support@zenflow.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 mb-1">Call Us</h4>
                    <p className="text-stone-500 text-sm">+1 (555) 123-4567</p>
                    <p className="text-stone-500 text-sm">Mon-Fri, 9am-6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 mb-1">Visit Studio</h4>
                    <p className="text-stone-500 text-sm">123 Wellness Way</p>
                    <p className="text-stone-500 text-sm">San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-stone-100">
                <h4 className="font-bold text-stone-800 mb-6">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-stone-50 rounded-xl text-stone-400 hover:text-primary-600 hover:bg-primary-50 transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 bg-stone-50 rounded-xl text-stone-400 hover:text-primary-600 hover:bg-primary-50 transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 bg-stone-50 rounded-xl text-stone-400 hover:text-primary-600 hover:bg-primary-50 transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8">
            <Card className="p-10 md:p-12">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-3 ml-1">First Name</label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-3 ml-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-stone-700 mb-3 ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-stone-700 mb-3 ml-1">Subject</label>
                  <select className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none">
                    <option>General Inquiry</option>
                    <option>Class Booking</option>
                    <option>Membership Questions</option>
                    <option>Technical Support</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-stone-700 mb-3 ml-1">Message</label>
                  <textarea
                    rows={6}
                    placeholder="How can we help you?"
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all resize-none"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-200"
                  >
                    Send Message <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
