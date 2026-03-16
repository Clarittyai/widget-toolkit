import React from 'react';
import type { WidgetButtonVariant, WidgetButtonSize } from '../types';

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
   * Button content
   */
  children: React.ReactNode;

  /**
   * Click handler (deep link, action trigger, etc.)
   */
  onClick?: () => void;

  /**
   * Optional icon element (rendered before text)
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
}

/**
 * WidgetButton - Touch-target enforcing button component
 *
 * Automatically enforces:
 * ✅ Minimum 44×44px touch target (Apple accessibility standard)
 * ✅ Apple-style glassmorphism design
 * ✅ Proper padding and spacing
 * ✅ Smooth transitions
 *
 * @example
 * ```tsx
 * <WidgetButton variant="primary" icon={<PlayIcon />} onClick={handleAction}>
 *   View Details
 * </WidgetButton>
 * ```
 */
export function WidgetButton({
  variant = 'primary',
  size = 'default',
  children,
  onClick,
  icon,
  className = '',
  disabled = false,
}: WidgetButtonProps) {
  // Base classes enforce 44px minimum touch target (Apple HIG requirement)
  const baseClasses = 'min-h-[44px] min-w-[44px] rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-1.5';

  // Variant styling - Apple-style glassmorphism
  const variantClasses: Record<WidgetButtonVariant, string> = {
    primary: 'bg-white/25 hover:bg-white/35 backdrop-blur-sm border border-white/40 text-white shadow-sm',
    secondary: 'bg-black/10 hover:bg-black/20 text-foreground border border-black/20',
    ghost: 'hover:bg-white/10 text-white',
  };

  // Size variants (both respect 44px minimum)
  const sizeClasses: Record<WidgetButtonSize, string> = {
    default: 'px-4 py-2 text-xs',  // Compact but still 44px height
    large: 'px-6 py-3 text-sm',    // More prominent
  };

  // Disabled state
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : 'active:scale-95 cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
