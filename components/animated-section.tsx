'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 0.9, 0.3, 1] as const;

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Single element — fade up on scroll into view. */
export function AnimatedSection({ children, className, delay = 0 }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Container that triggers 60 ms-staggered children when scrolled into view. */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
};

interface GroupProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerGroup({ children, className }: GroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: GroupProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
