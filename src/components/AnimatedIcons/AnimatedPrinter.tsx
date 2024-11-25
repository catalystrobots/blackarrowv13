import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedPrinterProps {
  className?: string;
}

export function AnimatedPrinter({ className = '' }: AnimatedPrinterProps) {
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
      {/* Base */}
      <motion.rect
        x="20"
        y="60"
        width="60"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        variants={pathVariants}
      />
      
      {/* Print head */}
      <motion.rect
        x="40"
        y="20"
        width="20"
        height="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        variants={pathVariants}
        animate={{
          y: [20, 40, 20],
          transition: {
            y: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }
          }
        }}
      />
      
      {/* Vertical rails */}
      <motion.line
        x1="30"
        y1="20"
        x2="30"
        y2="60"
        stroke="currentColor"
        strokeWidth="4"
        variants={pathVariants}
      />
      <motion.line
        x1="70"
        y1="20"
        x2="70"
        y2="60"
        stroke="currentColor"
        strokeWidth="4"
        variants={pathVariants}
      />
    </motion.svg>
  );
}