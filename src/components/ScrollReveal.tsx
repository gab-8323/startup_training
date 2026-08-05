import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
  staggerChildren?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 70, scale: 0.93 };
      case 'down':
        return { opacity: 0, y: -70, scale: 0.93 };
      case 'left':
        return { opacity: 0, x: 70, scale: 0.93 };
      case 'right':
        return { opacity: 0, x: -70, scale: 0.93 };
      case 'none':
        return { opacity: 0, scale: 0.93 };
      default:
        return { opacity: 0, y: 70, scale: 0.93 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ 
        duration, 
        delay, 
        type: 'spring',
        stiffness: 110,
        damping: 18,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollStaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.12 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollStaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}> = ({ children, className = '', direction = 'up' }) => {
  const yVal = direction === 'up' ? 65 : direction === 'down' ? -65 : 0;
  const xVal = direction === 'left' ? 65 : direction === 'right' ? -65 : 0;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yVal, x: xVal, scale: 0.92 },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: { 
            type: 'spring',
            stiffness: 120,
            damping: 18,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
