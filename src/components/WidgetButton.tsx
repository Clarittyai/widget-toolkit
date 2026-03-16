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
   */
  preventAppOpen?: boolean;
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
}: WidgetButtonProps) {
  const isCircular = shape === 'circular';

  // Shape classes - rounded rectangle vs perfect circle
  const shapeClasses = isCircular ? 'rounded-full' : 'rounded-lg';

  // Base classes enforce 44px minimum touch target (Apple HIG requirement)
  const baseClasses = `min-h-[44px] min-w-[44px] ${shapeClasses} font-medium transition-all duration-200 flex items-center justify-center gap-1.5`;

  // Variant styling - Apple-style glassmorphism
  const variantClasses: Record<WidgetButtonVariant, string> = {
    primary: 'bg-white/25 hover:bg-white/35 backdrop-blur-sm border border-white/40 text-white shadow-sm',
    secondary: 'bg-black/10 hover:bg-black/20 text-foreground border border-black/20',
    ghost: 'hover:bg-white/10 text-white',
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

    // Send INTERNAL_INTERACTION message to parent iframe host
    if (preventAppOpen && typeof window !== 'undefined') {
      try {
        window.parent.postMessage({
          type: 'INTERNAL_INTERACTION',
          timestamp: Date.now(),
          component: 'WidgetButton',
        }, '*');
      } catch (error) {
        // Silently fail if not in iframe or postMessage fails
        console.debug('WidgetButton: Could not send INTERNAL_INTERACTION message', error);
      }
    }

    // Call user's onClick handler
    if (onClick) {
      onClick();
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
