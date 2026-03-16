import React from 'react';

export interface WidgetAvatarProps {
  /**
   * Avatar content (initials, emoji, icon)
   */
  children: React.ReactNode;

  /**
   * Avatar size
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Background color class
   */
  className?: string;
}

export interface WidgetAvatarGroupProps {
  /**
   * Avatar elements
   */
  children: React.ReactNode;

  /**
   * Maximum avatars to show before "+N"
   */
  max?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * WidgetAvatar - Compact avatar component
 *
 * @example
 * ```tsx
 * <WidgetAvatar size="md" className="bg-blue-500 text-white">
 *   JD
 * </WidgetAvatar>
 * ```
 */
export function WidgetAvatar({
  children,
  size = 'md',
  className = '',
}: WidgetAvatarProps) {
  const sizeClasses: Record<string, string> = {
    sm: 'w-6 h-6 text-[9px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  };

  return (
    <div
      className={`
        rounded-full flex items-center justify-center font-bold
        ${sizeClasses[size]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
}

/**
 * WidgetAvatarGroup - Stacked avatar group with overlap
 *
 * @example
 * ```tsx
 * <WidgetAvatarGroup max={3}>
 *   <WidgetAvatar>JD</WidgetAvatar>
 *   <WidgetAvatar>SM</WidgetAvatar>
 *   <WidgetAvatar>AK</WidgetAvatar>
 * </WidgetAvatarGroup>
 * ```
 */
export function WidgetAvatarGroup({
  children,
  max,
  className = '',
}: WidgetAvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const displayedChildren = max ? childArray.slice(0, max) : childArray;
  const remainingCount = max && childArray.length > max ? childArray.length - max : 0;

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {displayedChildren}
      {remainingCount > 0 && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gray-500 border-2 border-white dark:border-gray-800">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
