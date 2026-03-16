import React from 'react';
import type { WidgetSize, WidgetPadding, WidgetDimensions } from '../types';

export interface WidgetContainerProps {
  /**
   * Widget size - enforces Apple iOS widget dimensions
   * - small: 190×190px (1:1 ratio - iOS systemSmall)
   * - large: 400×190px (2.1:1 ratio - iOS systemLarge)
   */
  size: WidgetSize;

  /**
   * Padding variant based on Apple HIG
   * - default: 16px (Apple's standard)
   * - compact: 12px (Graphic-heavy layouts)
   * - spacious: 20px (Minimal content)
   */
  padding?: WidgetPadding;

  /**
   * Children elements (your widget content)
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes (e.g., gradients, custom backgrounds)
   */
  className?: string;

  /**
   * Optional click handler for the entire widget (deep link support)
   */
  onClick?: () => void;
}

/**
 * WidgetContainer - Core enforcing component for Apple-compliant widgets
 *
 * Automatically enforces:
 * ✅ Strict dimensions (190×190px or 400×190px)
 * ✅ Border radius (22px - iOS standard)
 * ✅ Overflow hidden (prevents content escape)
 * ✅ Proper padding (16px default - Apple HIG)
 * ✅ Consistent shadow (Apple-style depth)
 *
 * @example
 * ```tsx
 * <WidgetContainer size="small" padding="default" className="bg-gradient-to-br from-blue-500 to-purple-600">
 *   <div>Your widget content</div>
 * </WidgetContainer>
 * ```
 */
export function WidgetContainer({
  size,
  padding = 'default',
  children,
  className = '',
  onClick,
}: WidgetContainerProps) {
  // Enforced dimensions matching Apple iOS widget sizes
  const dimensions: WidgetDimensions = size === 'small'
    ? { width: '190px', height: '190px' }
    : { width: '400px', height: '190px' };

  // Enforced padding based on Apple HIG (16pt = 16px standard)
  const paddingClass: string = {
    default: 'p-4',   // 16px - Apple standard widget margin
    compact: 'p-3',   // 12px - For graphic-heavy widgets (Apple's 11pt rounded up)
    spacious: 'p-5',  // 20px - For minimal content layouts
  }[padding];

  return (
    <div
      onClick={onClick}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        overflow: 'hidden', // Prevents content from escaping widget bounds
      }}
      className={`
        rounded-[22px]
        shadow-xl
        ${paddingClass}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
}
