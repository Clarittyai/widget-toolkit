/**
 * Widget size options matching Apple iOS widget families
 */
export type WidgetSize = 'small' | 'large';

/**
 * Padding variants based on Apple HIG guidelines
 * - default: 16px (Apple's standard widget margin)
 * - compact: 12px (For graphic-heavy layouts, Apple's 11pt rounded up)
 * - spacious: 20px (For minimal content with breathing room)
 */
export type WidgetPadding = 'default' | 'compact' | 'spacious';

/**
 * Button style variants
 */
export type WidgetButtonVariant = 'primary' | 'secondary' | 'ghost';

/**
 * Button size variants (all enforce 44px minimum touch target)
 */
export type WidgetButtonSize = 'default' | 'large';

/**
 * Button shape variants
 * - rounded: Standard rounded rectangle button (default)
 * - circular: Round icon-only button (perfect circle)
 */
export type WidgetButtonShape = 'rounded' | 'circular';

/**
 * Widget dimensions enforced by the toolkit
 */
export interface WidgetDimensions {
  width: string;
  height: string;
}

/**
 * Apple HIG validation rules
 */
export interface AppleHIGRules {
  dimensions: {
    small: { width: number; height: number };
    large: { width: number; height: number };
  };
  minPadding: number;
  minFontSize: number;
  minTouchTarget: number;
  borderRadius: number;
  maxRefreshRate: number;
}

/**
 * Validation result
 */
export interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}
