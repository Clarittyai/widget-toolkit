import React, { useState } from 'react';

export interface WidgetToggleProps {
  /**
   * Toggle label text
   */
  label?: string;

  /**
   * Initial/controlled value
   */
  value?: boolean;

  /**
   * Change handler callback
   */
  onChange?: (value: boolean) => void;

  /**
   * Whether to prevent opening the app when toggled
   * Default: true (prevents app opening for internal interaction)
   */
  preventAppOpen?: boolean;

  /**
   * Additional CSS classes for the container
   */
  className?: string;

  /**
   * Disabled state
   */
  disabled?: boolean;
}

/**
 * WidgetToggle - iOS-style toggle switch component
 *
 * Automatically enforces:
 * ✅ iOS-standard dimensions (51×31px switch, 27×27px thumb)
 * ✅ Minimum 44×44px touch target (Apple accessibility standard)
 * ✅ iOS system colors (#34C759 green, theme-aware grays)
 * ✅ Smooth spring animations matching iOS behavior
 * ✅ Proper ARIA attributes for accessibility
 * ✅ Prevents app opening on toggle (sends INTERNAL_INTERACTION message)
 *
 * @example
 * ```tsx
 * <WidgetToggle
 *   label="Enable notifications"
 *   value={isEnabled}
 *   onChange={(value) => setIsEnabled(value)}
 * />
 * ```
 */
export function WidgetToggle({
  label,
  value = false,
  onChange,
  preventAppOpen = true,
  className = '',
  disabled = false,
}: WidgetToggleProps) {
  const [internalValue, setInternalValue] = useState(value);
  const isOn = value !== undefined ? value : internalValue;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent parent click handlers

    if (disabled) return;

    const newValue = !isOn;
    setInternalValue(newValue);

    // Send INTERNAL_INTERACTION message to parent iframe host
    if (preventAppOpen && typeof window !== 'undefined') {
      try {
        window.parent.postMessage({
          type: 'INTERNAL_INTERACTION',
          timestamp: Date.now(),
          component: 'WidgetToggle',
        }, '*');
      } catch (error) {
        // Silently fail if not in iframe or postMessage fails
        console.debug('WidgetToggle: Could not send INTERNAL_INTERACTION message', error);
      }
    }

    // Call user's onChange handler
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      {label && (
        <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
          {label}
        </span>
      )}

      <button
        role="switch"
        aria-checked={isOn}
        aria-label={label || 'Toggle switch'}
        onClick={handleToggle}
        disabled={disabled}
        className={`
          relative flex-shrink-0
          w-[51px] h-[31px]
          rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500/30
          ${isOn
            ? 'bg-[#34C759]' // iOS system green
            : 'bg-[#E5E5EA] dark:bg-[#39393D]' // iOS light/dark gray
          }
          ${disabled
            ? 'opacity-40 cursor-not-allowed'
            : 'cursor-pointer active:scale-95'
          }
          min-w-[44px] min-h-[44px] p-[6.5px]
        `}
        style={{
          WebkitTapHighlightColor: 'transparent', // Remove iOS tap highlight
        }}
      >
        {/* Toggle Thumb */}
        <div
          className={`
            w-[27px] h-[27px]
            bg-white rounded-full
            shadow-md
            transform transition-transform duration-200 ease-in-out
            ${isOn ? 'translate-x-[20px]' : 'translate-x-0'}
          `}
          style={{
            // iOS-style shadow for depth
            boxShadow: '0 3px 8px 0 rgba(0, 0, 0, 0.15), 0 3px 1px 0 rgba(0, 0, 0, 0.06)',
          }}
        />
      </button>
    </div>
  );
}
