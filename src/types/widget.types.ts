/**
 * Widget size options matching Apple iOS widget families (3-size standard).
 *   small  → 170×170 (2×2 icons)
 *   medium → 360×170 (4×2 icons)
 *   large  → 360×360 (4×4 icons)
 */
export type WidgetSize = 'small' | 'medium' | 'large';

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
    medium: { width: number; height: number };
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

/**
 * Widget-to-parent postMessage protocol
 * Messages sent from widget iframe to parent AppGlanceCard
 */
export type WidgetMessageType =
  | 'INTERNAL_INTERACTION'  // Button clicked, prevent app opening
  | 'OPEN_APP'              // Open app in full view
  | 'DEEP_LINK'             // Navigate to specific page within app
  | 'WIDGET_ACTION'         // Trigger workflow/action
  | 'REFRESH_WIDGET'        // Request data refresh
  | 'WIDGET_EVENT'          // Analytics event
  | 'UPDATE_WIDGET_STATE';  // Update widget state

/**
 * Base message structure
 */
export interface BaseWidgetMessage {
  type: WidgetMessageType;
  timestamp: number;
}

/**
 * Deep link message - navigate to specific page within app
 * Path is relative to app (e.g., "/settings", "/meetings/123")
 */
export interface DeepLinkMessage extends BaseWidgetMessage {
  type: 'DEEP_LINK';
  path: string;
}

/**
 * Open app message - open app in full view
 */
export interface OpenAppMessage extends BaseWidgetMessage {
  type: 'OPEN_APP';
  appId: string;
}

/**
 * Internal interaction message - prevent app opening
 */
export interface InternalInteractionMessage extends BaseWidgetMessage {
  type: 'INTERNAL_INTERACTION';
  component?: string;
}
