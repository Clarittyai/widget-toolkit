import React from 'react';
import type { WidgetButtonVariant, WidgetButtonSize, WidgetButtonShape } from '../types';

export interface WidgetButtonProps {
  /**
   * Button style variant
   * - primary: Prominent glassmorphism style
   * - secondary: Subtle dark background
   * - ghost: Transparent with hover state
   */
  variant?: WidgetButtonVariant;

  /**
   * Button size (all enforce 44px minimum touch target)
   * - default: Compact for widgets
   * - large: More prominent CTA
   */
  size?: WidgetButtonSize;

  /**
   * Button shape
   * - rounded: Standard rounded rectangle (default)
   * - circular: Round icon-only button (perfect circle)
   */
  shape?: WidgetButtonShape;

  /**
   * Button content (optional for circular icon-only buttons)
   */
  children?: React.ReactNode;

  /**
   * Click handler (deep link, action trigger, etc.)
   */
  onClick?: () => void;

  /**
   * Optional icon element (rendered before text, required for circular buttons)
   */
  icon?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Whether to prevent opening the app when clicked
   * Default: true (prevents app opening for internal interaction)
   * Note: Ignored if deepLink is provided
   */
  preventAppOpen?: boolean;

  /**
   * Deep link path to open within the app (e.g., "/settings", "/meetings/123")
   * When provided, clicking opens the app at this specific page
   * When NOT provided, clicking prevents app opening (internal interaction)
   * Path is relative to app - do NOT include /apps/${appId} prefix
   */
  deepLink?: string;
}

/**
 * WidgetButton - Touch-target enforcing button component
 *
 * Automatically enforces:
 * ✅ Minimum 44×44px touch target (Apple accessibility standard)
 * ✅ Apple-style glassmorphism design
 * ✅ Proper padding and spacing
 * ✅ Smooth transitions
 * ✅ Support for circular icon-only buttons
 *
 * @example
 * ```tsx
 * // Standard button with text
 * <WidgetButton variant="primary" icon={<PlayIcon />} onClick={handleAction}>
 *   View Details
 * </WidgetButton>
 *
 * // Circular icon-only button
 * <WidgetButton variant="primary" shape="circular" icon={<RefreshIcon />} onClick={handleRefresh} />
 * ```
 */
export function WidgetButton({
  variant = 'primary',
  size = 'default',
  shape = 'rounded',
  children,
  onClick,
  icon,
  className = '',
  disabled = false,
  preventAppOpen = true,
  deepLink,
}: WidgetButtonProps) {
  const isCircular = shape === 'circular';

  // Shape classes - rounded rectangle vs perfect circle
  const shapeClasses = isCircular ? 'rounded-full' : 'rounded-lg';

  // Base classes enforce 44px minimum touch target (Apple HIG requirement)
  const baseClasses = `min-h-[44px] min-w-[44px] ${shapeClasses} font-medium transition-all duration-200 flex items-center justify-center gap-1.5`;

  // Variant styling — sits on the liquid-glass WidgetContainer, so buttons must
  // stay legible on a light translucent surface (the old white/25 glass button
  // was invisible there). Primary = the Claritty accent; secondary = a frosted
  // chip; ghost = subtle. These use the app's theme tokens (accent/foreground/
  // muted) — Claritty apps define them and scan the kit's dist in Tailwind.
  const variantClasses: Record<WidgetButtonVariant, string> = {
    primary: 'bg-accent text-white hover:bg-accent/90 shadow-sm',
    secondary:
      'bg-white/60 dark:bg-white/[0.08] text-foreground ring-1 ring-inset ring-slate-900/[0.08] dark:ring-white/[0.12] backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/[0.12]',
    ghost: 'text-foreground hover:bg-slate-900/5 dark:hover:bg-white/10',
  };

  // Circular buttons: fixed square dimensions for perfect circle
  const circularSizeClasses: Record<WidgetButtonSize, string> = {
    default: 'w-[44px] h-[44px]',  // Perfect 44×44px square (circle)
    large: 'w-[56px] h-[56px]',    // Larger 56×56px square (circle)
  };

  // Standard buttons: flexible width with padding
  const standardSizeClasses: Record<WidgetButtonSize, string> = {
    default: 'px-4 py-2 text-xs',  // Compact but still 44px height
    large: 'px-6 py-3 text-sm',    // More prominent
  };

  const sizeClasses = isCircular
    ? circularSizeClasses[size]
    : standardSizeClasses[size];

  // Disabled state
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'active:scale-95 cursor-pointer';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent parent click handlers
    e.preventDefault(); // Prevent default browser behavior

    if (typeof window !== 'undefined') {
      try {
        // If deep link provided, send DEEP_LINK message (opens app at specific page)
        if (deepLink) {
          window.parent.postMessage({
            type: 'DEEP_LINK',
            path: deepLink,
            timestamp: Date.now(),
          }, '*');
        }
        // Otherwise send INTERNAL_INTERACTION message (prevents app opening)
        else if (preventAppOpen) {
          window.parent.postMessage({
            type: 'INTERNAL_INTERACTION',
            timestamp: Date.now(),
            component: 'WidgetButton',
          }, '*');
        }
      } catch (error) {
        // Silently fail if not in iframe or postMessage fails
        console.debug('WidgetButton: Could not send postMessage', error);
      }
    }

    // Call user's onClick handler after a brief delay to ensure message is processed
    if (onClick) {
      setTimeout(() => {
        onClick();
      }, 50); // 50ms delay to ensure postMessage completes
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses}
        ${disabledClasses}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {!isCircular && children}
    </button>
  );
}
