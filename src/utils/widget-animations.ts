/**
 * Framer Motion Animation Presets
 *
 * Subtle, native-feeling animations matching Apple's design language
 * All animations use iOS-style easing curves
 */

import type { Variants, Transition } from 'framer-motion';

/**
 * Apple easing curves
 */
export const appleEasing = {
  /** Standard iOS easing - smooth and natural */
  standard: [0.25, 0.46, 0.45, 0.94],
  /** Deceleration - starts fast, ends slow (like iOS springs) */
  decelerate: [0.0, 0.0, 0.2, 1.0],
  /** Acceleration - starts slow, ends fast */
  accelerate: [0.4, 0.0, 1.0, 1.0],
  /** Sharp - quick and punchy */
  sharp: [0.4, 0.0, 0.6, 1.0],
} as const;

/**
 * Fade in animation (entrance)
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Scale in animation (entrance with scale)
 */
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/**
 * Slide in from bottom (sheet-like entrance) - updated to fade only
 */
export const slideInFromBottom: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Slide in from top - updated to fade only
 */
export const slideInFromTop: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Slide in from right - updated to fade only
 */
export const slideInFromRight: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Slide in from left - updated to fade only
 */
export const slideInFromLeft: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Bounce in (playful entrance)
 */
export const bounceIn: Variants = {
  initial: { opacity: 0, scale: 0.3 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  exit: { opacity: 0, scale: 0.3 },
};

/**
 * Default transition settings (Apple-style)
 */
export const appleTransition: Transition = {
  duration: 0.25,
  ease: appleEasing.standard,
};

/**
 * Spring transition (iOS-style bounce)
 */
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

/**
 * Quick transition (for hover states)
 */
export const quickTransition: Transition = {
  duration: 0.15,
  ease: appleEasing.sharp,
};

/**
 * Stagger children animation (sequential reveals)
 */
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

/**
 * Stagger child item - updated to fade only
 */
export const staggerItem: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

/**
 * Pulse animation (for loading states)
 */
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Shimmer animation (skeleton loading)
 */
export const shimmer: Variants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};
