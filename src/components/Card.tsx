import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -8 } : {}}
      className={cn(
        "bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;
