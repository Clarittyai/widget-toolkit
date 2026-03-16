/**
 * Apple SF Pro Typography Scale
 *
 * Typography utilities matching Apple's Human Interface Guidelines
 * Enforces minimum readable font sizes (12px minimum for captions)
 */

export const widgetText = {
  /**
   * Display text - Large metrics and numbers
   * Size: 48px (text-5xl), Weight: 900 (font-black)
   * Use for: Primary metrics, countdown timers, large numbers
   */
  display: 'text-5xl font-black leading-none tracking-tight',

  /**
   * Headline - Widget titles and section headers
   * Size: 20px (text-xl), Weight: 700 (font-bold)
   * Use for: Widget titles, section headers
   */
  headline: 'text-xl font-bold leading-tight',

  /**
   * Subheadline - Secondary titles
   * Size: 16px (text-base), Weight: 600 (font-semibold)
   * Use for: Subtitles, secondary headers
   */
  subheadline: 'text-base font-semibold',

  /**
   * Body - Main content text
   * Size: 14px (text-sm), Weight: 500 (font-medium)
   * Use for: Primary content, descriptions
   */
  body: 'text-sm font-medium',

  /**
   * Caption - Labels and metadata
   * Size: 12px (text-xs), Weight: 500 (font-medium)
   * Use for: Labels, timestamps, metadata (MINIMUM readable size)
   */
  caption: 'text-xs font-medium',

  /**
   * Footnote - Fine print (use sparingly)
   * Size: 10px (text-[10px]), Weight: 400 (font-normal)
   * Use for: Legal text, very small labels (use sparingly!)
   */
  footnote: 'text-[10px] font-normal',
} as const;

/**
 * Type guard for widget text variants
 */
export type WidgetTextVariant = keyof typeof widgetText;
