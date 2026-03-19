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
      whileHover={hover ? { y: -12, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "premium-card overflow-hidden",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;
