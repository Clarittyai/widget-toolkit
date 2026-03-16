/**
 * Apple-Style Gradient Presets
 *
 * Beautiful gradient combinations inspired by Apple's design language
 * All gradients use bg-gradient-to-br (bottom-right) for consistent lighting
 */

export const widgetGradients = {
  // Warm Tones
  /** Amber → Orange → Amber - Warm sunset vibes */
  sunset: 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600',

  /** Orange → Red → Rose - Energetic and bold */
  fire: 'bg-gradient-to-br from-orange-500 via-red-500 to-rose-600',

  /** Rose → Pink → Rose - Soft and friendly */
  rose: 'bg-gradient-to-br from-rose-400 via-pink-500 to-rose-600',

  /** Yellow → Amber → Orange - Bright and optimistic */
  solar: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600',

  // Cool Tones
  /** Blue → Cyan → Sky - Fresh ocean vibes */
  ocean: 'bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-600',

  /** Cyan → Teal → Blue - Calm and professional */
  teal: 'bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600',

  /** Sky → Blue → Indigo - Classic iOS blue */
  sky: 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600',

  /** Indigo → Purple → Indigo - Deep and rich */
  lavender: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600',

  // Green Tones
  /** Emerald → Green → Teal - Fresh and natural */
  forest: 'bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600',

  /** Lime → Green → Emerald - Vibrant nature */
  lime: 'bg-gradient-to-br from-lime-400 via-green-500 to-emerald-600',

  /** Green → Emerald → Cyan - Aqua vibes */
  mint: 'bg-gradient-to-br from-green-400 via-emerald-500 to-cyan-600',

  // Purple Tones
  /** Purple → Fuchsia → Pink - Playful and creative */
  grape: 'bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-600',

  /** Violet → Purple → Indigo - Sophisticated */
  violet: 'bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600',

  /** Fuchsia → Purple → Rose - Bold and modern */
  fuchsia: 'bg-gradient-to-br from-fuchsia-500 via-purple-500 to-rose-600',

  // Red Tones
  /** Red → Rose → Pink - Strong and vibrant */
  ruby: 'bg-gradient-to-br from-red-500 via-rose-500 to-pink-600',

  /** Red → Orange → Amber - Warm energy */
  crimson: 'bg-gradient-to-br from-red-600 via-red-500 to-orange-600',

  // Neutral Tones
  /** Slate → Gray → Zinc - Professional monochrome */
  slate: 'bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-700',

  /** Gray → Slate → Stone - Subtle elegance */
  stone: 'bg-gradient-to-br from-gray-500 via-slate-500 to-stone-600',

  // Special Effects
  /** Multi-color rainbow gradient */
  rainbow: 'bg-gradient-to-br from-red-500 via-yellow-500 to-green-500',

  /** Dark gradient for dark mode */
  dark: 'bg-gradient-to-br from-gray-800 via-gray-900 to-black',
} as const;

/**
 * Type guard for gradient variants
 */
export type WidgetGradientVariant = keyof typeof widgetGradients;

/**
 * Get a random gradient from the collection
 */
export function getRandomGradient(): string {
  const gradients = Object.values(widgetGradients);
  return gradients[Math.floor(Math.random() * gradients.length)];
}
