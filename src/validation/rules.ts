import type { AppleHIGRules } from '../types';

/**
 * Apple Human Interface Guidelines - Enforcement Rules
 *
 * These rules enforce Apple's design standards for widgets
 * Reference: https://developer.apple.com/design/human-interface-guidelines/
 */
export const appleHIGRules: AppleHIGRules = {
  /**
   * Widget dimensions (strict enforcement)
   * Small: 190×190px (iOS systemSmall proportion)
   * Large: 400×190px (iOS systemLarge proportion)
   */
  dimensions: {
    small: { width: 190, height: 190 },
    large: { width: 400, height: 190 },
  },

  /**
   * Minimum padding (safe area)
   * Apple recommends 16pt margin, we allow 12px minimum for compact layouts
   */
  minPadding: 12,

  /**
   * Minimum font size (readability)
   * 12px is the minimum for readable text per Apple accessibility guidelines
   */
  minFontSize: 12,

  /**
   * Minimum touch target (accessibility)
   * Apple requires 44pt (44px) minimum touch targets
   */
  minTouchTarget: 44,

  /**
   * Border radius (iOS widget standard)
   * All widgets use 22px corner radius to match iOS
   */
  borderRadius: 22,

  /**
   * Maximum refresh rate (battery/performance)
   * Widgets should not refresh more than once per minute
   */
  maxRefreshRate: 60, // seconds
};

/**
 * Validation error messages
 */
export const validationMessages = {
  invalidDimensions: (size: string, actual: { width: number; height: number }) =>
    `Widget size "${size}" must be exactly ${
      size === 'small' ? '190×190px' : '400×190px'
    }, found ${actual.width}×${actual.height}px`,

  insufficientPadding: (actual: number, min: number) =>
    `Padding must be at least ${min}px for safe area compliance, found ${actual}px`,

  smallFontSize: (actual: number, min: number) =>
    `Font size must be at least ${min}px for readability, found ${actual}px`,

  smallTouchTarget: (actual: number, min: number) =>
    `Touch targets must be at least ${min}×${min}px for accessibility, found ${actual}px`,

  missingOverflow: () =>
    `Widget container must have "overflow: hidden" to prevent content escape`,

  incorrectBorderRadius: (actual: number, expected: number) =>
    `Border radius should be ${expected}px to match iOS widgets, found ${actual}px`,

  tooFrequentRefresh: (actual: number, max: number) =>
    `Widget refresh interval must be at least ${max} seconds, found ${actual}s`,
};

/**
 * Warning messages (non-breaking issues)
 */
export const warningMessages = {
  lowContrast: (ratio: number) =>
    `Text contrast ratio is ${ratio.toFixed(1)}:1, Apple recommends 4.5:1 minimum (WCAG AA)`,

  noDeepLink: () =>
    `Consider adding onClick handler to widget for deep linking to app`,

  heavyBundle: (sizeKB: number) =>
    `Widget bundle is ${sizeKB}KB, consider optimizing (recommended: <50KB)`,

  missingAltText: () =>
    `Images should have alt text for accessibility`,
};
