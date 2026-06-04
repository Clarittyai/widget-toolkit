import React from 'react';

export interface WidgetBadgeProps {
  /**
   * Badge color variant
   */
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';

  /**
   * Badge content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Optional dot indicator
   */
  showDot?: boolean;
}

/**
 * WidgetBadge - Status indicator component
 *
 * Provides consistent badge styling for widget status indicators
 *
 * @example
 * ```tsx
 * <WidgetBadge variant="success" showDot>Active</WidgetBadge>
 * <WidgetBadge variant="warning">Pending</WidgetBadge>
 * ```
 */
export function WidgetBadge({
  variant = 'neutral',
  children,
  className = '',
  showDot = false,
}: WidgetBadgeProps) {
  // Frosted tint chips — translucent + subtle blur so they sit on glass.
  const variantClasses: Record<string, string> = {
    success: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 backdrop-blur-sm',
    warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 backdrop-blur-sm',
    error: 'bg-red-500/15 text-red-700 dark:text-red-300 backdrop-blur-sm',
    info: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 backdrop-blur-sm',
    neutral: 'bg-gray-500/15 text-gray-700 dark:text-gray-300 backdrop-blur-sm',
  };

  const dotColors: Record<string, string> = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    neutral: 'bg-gray-500',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium
        ${variantClasses[variant]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {children}
    </span>
  );
}
