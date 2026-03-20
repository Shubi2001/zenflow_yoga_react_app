import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const Membership = () => {
  const { user } = useAuth();

  const handleSubscribe = async (plan: string) => {
    if (!user) {
      alert('Please login to subscribe');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, {
        isPremium: true,
        membershipType: plan,
        membershipExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });
      alert(`Successfully subscribed to ${plan} plan!`);
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Please try again.');
    }
  };

  const plans = [
    {
      name: 'Monthly',
      price: '$19',
      features: ['Unlimited Classes', 'Personalized Plans', 'Trainer Support', 'Ad-free Experience'],
      icon: <Zap className="w-6 h-6 text-primary-500" />,
      color: 'bg-primary-50'
    },
    {
      name: 'Yearly',
      price: '$149',
      features: ['All Monthly Features', '2 Months Free', 'Exclusive Workshops', 'Priority Support'],
      icon: <Star className="w-6 h-6 text-amber-500" />,
      color: 'bg-amber-50',
      popular: true
    },
    {
      name: 'Lifetime',
      price: '$499',
      features: ['All Yearly Features', 'One-time Payment', 'VIP Retreats', 'Lifetime Access'],
      icon: <Shield className="w-6 h-6 text-indigo-500" />,
      color: 'bg-indigo-50'
    }
  ];

  return (
    <div className="pt-24 pb-20 px-4 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-stone-900 mb-6"
          >
            Choose Your Zen Journey
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-stone-600 max-w-2xl mx-auto"
          >
            Unlock premium content, personalized coaching, and exclusive workshops with our membership plans.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-stone-100 flex flex-col ${plan.popular ? 'ring-2 ring-primary-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <div className={`w-14 h-14 ${plan.color} rounded-2xl flex items-center justify-center mb-6`}>
                {plan.icon}
              </div>

              <h3 className="text-2xl font-bold text-stone-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-stone-900">{plan.price}</span>
                <span className="text-stone-500">/{plan.name === 'Lifetime' ? 'once' : 'month'}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-stone-600">
                    <Check className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.name)}
                className={`w-full py-4 rounded-2xl font-bold transition-all ${
                  plan.popular 
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200' 
                    : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                }`}
              >
                {user?.isPremium && user.membershipType === plan.name ? 'Current Plan' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>

        {user?.isPremium && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 p-8 bg-primary-50 rounded-[2.5rem] border border-primary-100 text-center"
          >
            <h2 className="text-2xl font-bold text-primary-900 mb-2">You are a Premium Member!</h2>
            <p className="text-primary-700">
              Your {user.membershipType} membership is active. Enjoy your exclusive benefits.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Membership;
