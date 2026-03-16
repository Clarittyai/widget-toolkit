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
  const variantClasses: Record<string, string> = {
    success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
    info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    neutral: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
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
