import React from 'react';
import type { WidgetSize } from '../types';

/**
 * Widget layout primitives — composable, aligned-by-construction building blocks
 * for the widget's CONTENT (WidgetContainer handles the frame).
 *
 * The generated Widget.tsx composes from these instead of hand-rolling divs, so
 * the type scale, spacing rhythm, contrast, truncation and alignment are correct
 * by construction — eliminating the misaligned / inconsistent / low-contrast
 * widgets the generator used to produce. Theme-token only (text-foreground /
 * text-muted-foreground), so they inherit each app's identity.
 *
 * Composition recipes (pair with the design brief's widget spec + the
 * widget-design skill):
 *   - single-metric → <WidgetMetric size hero> (small); + a stat/row (medium/large)
 *   - status        → <WidgetHeader trailing={<WidgetBadge/>}/> + <WidgetMetric/>
 *   - list          → <WidgetHeader/> + <WidgetList>{<WidgetRow/>…}</WidgetList>
 *   - stats         → a row of <WidgetStat/>
 */

export interface WidgetHeaderProps {
  /** The widget's title / what it's about (truncates). */
  title: string;
  /** Small uppercase label above the title (e.g. app or section name). */
  eyebrow?: string;
  /** Right-aligned slot — a <WidgetBadge> status or a single icon action. */
  trailing?: React.ReactNode;
  className?: string;
}

/** Top row: title (+ optional eyebrow) on the left, one trailing slot on the right. */
export function WidgetHeader({
  title,
  eyebrow,
  trailing,
  className = '',
}: WidgetHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-2 ${className}`}>
      <div className="min-w-0">
        {eyebrow ? (
          <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground truncate">
            {eyebrow}
          </div>
        ) : null}
        <div className="text-sm font-semibold text-foreground truncate">
          {title}
        </div>
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  );
}

export interface WidgetMetricProps {
  /** The hero — one big number / short status. Always high-contrast foreground. */
  value: React.ReactNode;
  /** What it measures (the supporting label). */
  label?: string;
  /** Optional change indicator with a semantic tone. */
  delta?: { value: string; direction?: 'up' | 'down' | 'neutral' };
  /** Scales the hero type to the size (small/medium share, large is bigger). */
  size?: WidgetSize;
  className?: string;
}

/** The glanceable hero: one big foreground value + a label + an optional delta. */
export function WidgetMetric({
  value,
  label,
  delta,
  size = 'medium',
  className = '',
}: WidgetMetricProps) {
  const valueSize = size === 'large' ? 'text-5xl' : 'text-4xl';
  const deltaTone =
    delta?.direction === 'up'
      ? 'text-emerald-600 dark:text-emerald-400'
      : delta?.direction === 'down'
        ? 'text-red-600 dark:text-red-400'
        : 'text-muted-foreground';
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div
        className={`${valueSize} font-bold leading-none tracking-tight text-foreground`}
      >
        {value}
      </div>
      {label || delta ? (
        <div className="flex items-baseline gap-1.5 min-w-0">
          {label ? (
            <span className="text-xs text-muted-foreground truncate">
              {label}
            </span>
          ) : null}
          {delta ? (
            <span className={`text-xs font-medium shrink-0 ${deltaTone}`}>
              {delta.value}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export interface WidgetStatProps {
  /** Supporting label (under the value). */
  label: string;
  /** The value (foreground, medium emphasis — not the hero). */
  value: React.ReactNode;
  className?: string;
}

/** A compact label/value unit for secondary stats (e.g. a medium/large row). */
export function WidgetStat({ label, value, className = '' }: WidgetStatProps) {
  return (
    <div className={`flex flex-col gap-0.5 min-w-0 ${className}`}>
      <span className="text-lg font-semibold leading-none text-foreground truncate">
        {value}
      </span>
      <span className="text-[11px] text-muted-foreground truncate">{label}</span>
    </div>
  );
}

export interface WidgetListProps {
  children: React.ReactNode;
  className?: string;
}

/** A vertical list with consistent spacing — wrap <WidgetRow> children. */
export function WidgetList({ children, className = '' }: WidgetListProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>{children}</div>
  );
}

export interface WidgetRowProps {
  /** Primary text (truncates). */
  title: string;
  /** Optional secondary line. */
  subtitle?: string;
  /** Leading slot — an icon or <WidgetAvatar>. */
  leading?: React.ReactNode;
  /** Trailing slot — a value or <WidgetBadge>. */
  trailing?: React.ReactNode;
  className?: string;
}

/** One aligned list row: leading icon · title/subtitle (flex) · trailing value. */
export function WidgetRow({
  title,
  subtitle,
  leading,
  trailing,
  className = '',
}: WidgetRowProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {leading ? (
        <div className="shrink-0 text-muted-foreground">{leading}</div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="text-sm text-foreground truncate">{title}</div>
        {subtitle ? (
          <div className="text-xs text-muted-foreground truncate">
            {subtitle}
          </div>
        ) : null}
      </div>
      {trailing ? (
        <div className="shrink-0 text-sm font-medium text-foreground">
          {trailing}
        </div>
      ) : null}
    </div>
  );
}
