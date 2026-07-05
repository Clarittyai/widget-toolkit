import React from 'react';
import type { WidgetSize, WidgetPadding, WidgetDimensions } from '../types';

export interface WidgetContainerProps {
  /**
   * Widget size - enforces Apple iOS widget dimensions (3-size standard).
   * - small:  170×170px (1:1 ratio - iOS systemSmall, 2×2 icons)
   * - medium: 360×170px (2.1:1 ratio - iOS systemMedium, 4×2 icons)
   * - large:  360×360px (4×4 icons - iOS systemLarge; matches the Claritty grid)
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
 * ✅ Strict dimensions (170×170, 360×170, or 360×360 px — Apple HIG)
 * ✅ Border radius (24px / rounded-3xl — matches Claritty cards)
 * ✅ Overflow hidden (prevents content escape)
 * ✅ Proper padding (16px default - Apple HIG)
 * ✅ Claritty "liquid glass" surface (translucent + blur + inset ring + hairline)
 *
 * The default surface is frosted glass that works on light & dark. Pass a
 * `className` (e.g. a gradient) to override the background for a tinted widget.
 * Note: backdrop-blur frosts content within the widget's own document — when
 * embedded in the platform iframe it won't blur the dashboard behind it (the
 * platform's card wrapper supplies that framing glass); the translucent + ring +
 * hairline still give the liquid-glass look.
 *
 * @example
 * ```tsx
 * <WidgetContainer size="small" padding="default">
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
  // Enforced dimensions matching Apple iOS widget sizes (3-size standard).
  // Large is 360×360 to match the Claritty dashboard grid (was 360×376).
  const dimensions: WidgetDimensions =
    size === 'small'  ? { width: '170px', height: '170px' } :
    size === 'medium' ? { width: '360px', height: '170px' } :
                        { width: '360px', height: '360px' };

  // Enforced padding based on Apple HIG (16pt = 16px standard)
  const paddingClass: string = {
    default: 'p-4',   // 16px - Apple standard widget margin
    compact: 'p-3',   // 12px - For graphic-heavy widgets (Apple's 11pt rounded up)
    spacious: 'p-5',  // 20px - For minimal content layouts
  }[padding];

  // Claritty "liquid glass": translucent tints + inset ring + soft layered
  // shadow (mirrors the platform's .glass-card-marketplace). Deliberately NO
  // backdrop-filter: inside the widget iframe it can only sample the widget's
  // own (transparent) document — it frosts nothing, and Chromium's blur
  // tiling over an undefined backdrop paints a vertical seam through the
  // tile while widgets load. The translucent tints alone let the host card
  // show through, which is the entire glass effect an iframe can have.
  const glass =
    'bg-white/60 dark:bg-white/[0.05] ' +
    'border border-slate-900/[0.08] dark:border-white/10 ' +
    'ring-1 ring-inset ring-slate-900/[0.06] dark:ring-white/[0.08] ' +
    'shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)]';

  return (
    <div
      onClick={onClick}
      // The host reads this to know which size the widget rendered at.
      data-widget-size={size}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        overflow: 'hidden', // Prevents content from escaping widget bounds
      }}
      className={`
        relative
        rounded-3xl
        ${glass}
        ${paddingClass}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {/* Top hairline — the subtle light edge that sells the glass look. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-slate-900/20 to-transparent dark:via-white/25"
      />
      {children}
    </div>
  );
}
