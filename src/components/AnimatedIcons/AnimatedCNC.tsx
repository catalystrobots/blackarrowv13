import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedCNCProps {
  className?: string;
}

export function AnimatedCNC({ className = '' }: AnimatedCNCProps) {
  const pathVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      initial="initial"
      animate="animate"
    >
      {/* Machine base */}
      <motion.rect
        x="10"
        y="60"
        width="80"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        variants={pathVariants}
      />
      
      {/* Vertical column */}
      <motion.rect
        x="20"
        y="20"
        width="10"
        height="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        variants={pathVariants}
      />
      
      {/* Spindle head */}
      <motion.rect
        x="30"
        y="30"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        variants={pathVariants}
        animate={{
          x: [30, 60, 30],
          transition: {
            x: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }
          }
        }}
      />
      
      {/* Cutting tool */}
      <motion.line
        x1="40"
        y1="50"
        x2="40"
        y2="60"
        stroke="currentColor"
        strokeWidth="4"
        variants={pathVariants}
        animate={{
          x: [40, 70, 40],
          transition: {
            x: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }
          }
        }}
      />
    </motion.svg>
  );
}