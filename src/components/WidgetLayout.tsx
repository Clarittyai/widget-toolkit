import React from 'react';
import type { WidgetSize } from '../types';

/**
 * Widget layout primitives — composable, aligned-by-construction building blocks
 * for the widget's CONTENT (WidgetContainer handles the frame).
 *
 * The generated Widget.tsx composes from these instead of hand-rolling divs, so
 * the type scale, spacing rhythm, contrast, truncation and alignment are correct
 * by construction — eliminating the misaligned / inconsistent / low-contrast
 * widgets the generator used to produce.
 *
 * Look & feel: theme-token only (text-foreground / text-muted-foreground for
 * type, and the app's brand `accent` for garnish — icon chips, hero emphasis,
 * delta pills), so every widget inherits its app's identity AND reads as
 * deliberately designed rather than gray-on-glass. The accent shows up as
 * tasteful garnish (chips, pills, an optional colored hero) — never as a wall of
 * color — so contrast and glanceability stay intact.
 *
 * Composition recipes (pair with the design brief's widget spec + the
 * widget-design skill):
 *   - single-metric → <WidgetMetric size hero icon={<Icon/>}> (small);
 *                      + a stat row / delta (medium/large)
 *   - status        → <WidgetHeader icon trailing={<WidgetBadge/>}/> + <WidgetMetric/>
 *   - list          → <WidgetHeader icon/> + <WidgetList divided>{<WidgetRow/>…}</WidgetList>
 *   - stats         → a row of <WidgetStat/> (color the lead stat with tone="accent")
 */

/** A small tinted square that holds a leading icon (the "designed" signal that
 *  lifts a widget out of plain text). `accent` adopts the app's brand color — use
 *  it for the ONE focal icon (header/hero). `neutral` is a quiet gray chip for
 *  supporting rows, so the accent stays reserved for a single moment per widget
 *  (Apple-style restraint), not sprinkled on every icon. */
function IconChip({
  children,
  tone = 'accent',
  className = '',
}: {
  children: React.ReactNode;
  tone?: 'accent' | 'neutral';
  className?: string;
}) {
  const toneClass =
    tone === 'accent'
      ? 'bg-accent/12 text-accent'
      : 'bg-muted/60 text-muted-foreground';
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-xl ${toneClass} [&>svg]:h-1/2 [&>svg]:w-1/2 ${className}`}
    >
      {children}
    </div>
  );
}

export interface WidgetHeaderProps {
  /** The widget's title / what it's about (truncates). */
  title: string;
  /** Small uppercase label above the title (e.g. app or section name). */
  eyebrow?: string;
  /** Leading icon — rendered in a brand-accent chip to the left of the title. */
  icon?: React.ReactNode;
  /** Right-aligned slot — a <WidgetBadge> status or a single icon action. */
  trailing?: React.ReactNode;
  className?: string;
}

/** Top row: optional accent icon · title (+ optional eyebrow) · one trailing slot. */
export function WidgetHeader({
  title,
  eyebrow,
  icon,
  trailing,
  className = '',
}: WidgetHeaderProps) {
  return (
    <div className={`flex items-center justify-between gap-2.5 ${className}`}>
      <div className="flex min-w-0 items-center gap-2.5">
        {icon ? <IconChip className="h-8 w-8">{icon}</IconChip> : null}
        <div className="min-w-0">
          {eyebrow ? (
            <div className="truncate text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {eyebrow}
            </div>
          ) : null}
          <div className="truncate text-sm font-semibold text-foreground">
            {title}
          </div>
        </div>
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  );
}

export interface WidgetMetricProps {
  /** The hero — one big number / short status. */
  value: React.ReactNode;
  /** What it measures (the supporting label). */
  label?: string;
  /** Optional change indicator — renders as a tinted, semantic pill. */
  delta?: { value: string; direction?: 'up' | 'down' | 'neutral' };
  /** Leading icon — rendered in a brand-accent chip beside the hero. */
  icon?: React.ReactNode;
  /**
   * Hero tone. `accent` paints the number in the app's brand color (great for a
   * single hero stat); `default` keeps it high-contrast foreground (best when
   * the value sits next to other content). Defaults to foreground.
   */
  tone?: 'default' | 'accent';
  /** Scales the hero type to the size (small/medium share, large is bigger). */
  size?: WidgetSize;
  className?: string;
}

/** The glanceable hero: one big value (+ optional accent icon) + label + delta pill. */
export function WidgetMetric({
  value,
  label,
  delta,
  icon,
  tone = 'default',
  size = 'medium',
  className = '',
}: WidgetMetricProps) {
  const valueSize = size === 'large' ? 'text-5xl' : 'text-4xl';
  const valueTone = tone === 'accent' ? 'text-accent' : 'text-foreground';
  const dir = delta?.direction ?? 'neutral';
  const deltaPill =
    dir === 'up'
      ? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400'
      : dir === 'down'
        ? 'bg-red-500/12 text-red-600 dark:text-red-400'
        : 'bg-muted/60 text-muted-foreground';
  const deltaGlyph = dir === 'up' ? '↑' : dir === 'down' ? '↓' : '';
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {icon ? <IconChip className="h-11 w-11">{icon}</IconChip> : null}
      <div className="flex min-w-0 flex-col gap-1">
        <div
          className={`${valueSize} font-bold leading-none tracking-tight tabular-nums ${valueTone}`}
        >
          {value}
        </div>
        {label || delta ? (
          <div className="flex min-w-0 items-center gap-2">
            {label ? (
              <span className="truncate text-xs text-muted-foreground">
                {label}
              </span>
            ) : null}
            {delta ? (
              <span
                className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${deltaPill}`}
              >
                {deltaGlyph ? <span aria-hidden>{deltaGlyph}</span> : null}
                {delta.value}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export interface WidgetStatProps {
  /** Supporting label (under the value). */
  label: string;
  /** The value (foreground, medium emphasis — not the hero). */
  value: React.ReactNode;
  /** `accent` colors the value in the brand color (use for the lead stat). */
  tone?: 'default' | 'accent';
  className?: string;
}

/** A compact label/value unit for secondary stats (e.g. a medium/large row). */
export function WidgetStat({
  label,
  value,
  tone = 'default',
  className = '',
}: WidgetStatProps) {
  const valueTone = tone === 'accent' ? 'text-accent' : 'text-foreground';
  return (
    <div className={`flex min-w-0 flex-col gap-0.5 ${className}`}>
      <span
        className={`truncate text-lg font-semibold leading-none tabular-nums ${valueTone}`}
      >
        {value}
      </span>
      <span className="truncate text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

export interface WidgetListProps {
  children: React.ReactNode;
  /** Add hairline dividers between rows (polished look for medium/large lists). */
  divided?: boolean;
  className?: string;
}

/** A vertical list with consistent spacing — wrap <WidgetRow> children. */
export function WidgetList({
  children,
  divided = false,
  className = '',
}: WidgetListProps) {
  const layout = divided
    ? 'gap-0 divide-y divide-border/60 [&>*]:py-2 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0'
    : 'gap-2';
  return (
    <div className={`flex flex-col ${layout} ${className}`}>{children}</div>
  );
}

export interface WidgetRowProps {
  /** Primary text (truncates). */
  title: string;
  /** Optional secondary line. */
  subtitle?: string;
  /** Leading slot — an icon (boxed in a quiet neutral chip) or a <WidgetAvatar>. */
  leading?: React.ReactNode;
  /** Trailing slot — a value or <WidgetBadge>. */
  trailing?: React.ReactNode;
  className?: string;
}

/** One aligned list row: leading chip · title/subtitle (flex) · trailing value. */
export function WidgetRow({
  title,
  subtitle,
  leading,
  trailing,
  className = '',
}: WidgetRowProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {leading ? (
        <IconChip tone="neutral" className="h-8 w-8 text-[13px]">
          {leading}
        </IconChip>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">
          {title}
        </div>
        {subtitle ? (
          <div className="truncate text-xs text-muted-foreground">
            {subtitle}
          </div>
        ) : null}
      </div>
      {trailing ? (
        <div className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
          {trailing}
        </div>
      ) : null}
    </div>
  );
}
