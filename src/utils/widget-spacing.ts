/**
 * Apple 8pt Grid Spacing System
 *
 * Spacing utilities following Apple's 8-point grid system
 * All spacing values are multiples of 8px (or 4px for tight spaces)
 */

export const widgetSpacing = {
  /**
   * Padding variants (container edge spacing)
   * Based on Apple HIG widget margins
   */
  padding: {
    /** 16px - Apple's standard widget margin */
    default: 'p-4',
    /** 12px - For graphic-heavy widgets (Apple's 11pt rounded up) */
    compact: 'p-3',
    /** 20px - For minimal content with breathing room */
    spacious: 'p-5',
  },

  /**
   * Gap variants (spacing between elements)
   * Follows 8pt grid system
   */
  gap: {
    /** 8px - Tight spacing for compact layouts */
    tight: 'gap-2',
    /** 12px - Normal spacing (most common) */
    normal: 'gap-3',
    /** 16px - Loose spacing for breathing room */
    loose: 'gap-4',
  },

  /**
   * Margin variants (external spacing)
   */
  margin: {
    /** 8px - Tight margins */
    tight: 'm-2',
    /** 12px - Normal margins */
    normal: 'm-3',
    /** 16px - Loose margins */
    loose: 'm-4',
  },

  /**
   * Vertical spacing (space-y)
   */
  spaceY: {
    /** 8px vertical spacing */
    tight: 'space-y-2',
    /** 12px vertical spacing */
    normal: 'space-y-3',
    /** 16px vertical spacing */
    loose: 'space-y-4',
  },

  /**
   * Horizontal spacing (space-x)
   */
  spaceX: {
    /** 8px horizontal spacing */
    tight: 'space-x-2',
    /** 12px horizontal spacing */
    normal: 'space-x-3',
    /** 16px horizontal spacing */
    loose: 'space-x-4',
  },
} as const;

/**
 * Type guards for spacing variants
 */
export type WidgetPaddingVariant = keyof typeof widgetSpacing.padding;
export type WidgetGapVariant = keyof typeof widgetSpacing.gap;
