'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation
export function StaggerContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Glow card with hover
export function GlowCard({ children, className = '', color = 'cyan' }: { children: ReactNode; className?: string; color?: string }) {
  const colorMap: Record<string, string> = {
    cyan: 'rgba(0, 240, 255, 0.15)',
    purple: 'rgba(168, 85, 247, 0.15)',
    green: 'rgba(16, 185, 129, 0.15)',
    blue: 'rgba(59, 130, 246, 0.15)',
    pink: 'rgba(236, 72, 153, 0.15)',
    orange: 'rgba(249, 115, 22, 0.15)',
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        boxShadow: `0 0 30px ${colorMap[color] || colorMap.cyan}`,
      }}
      transition={{ duration: 0.3 }}
      className={`glass-card p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Animated counter
export function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {value}{suffix}
      </motion.span>
    </motion.span>
  );
}

// Progress Ring SVG
export function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 6,
  color = '#00f0ff',
  children,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="progress-ring">
        <circle
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ strokeDasharray: circumference }}
          className="progress-ring-circle"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
