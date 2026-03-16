import type { ValidationResult } from '../types';
import { appleHIGRules, validationMessages } from './rules';

/**
 * Validate widget compliance with Apple HIG
 *
 * @param filePath - Path to widget file (for future AST parsing)
 * @returns Validation result with errors and warnings
 */
export function validateWidget(filePath?: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Note: This is a simplified validation
  // In production, this would parse the widget file and check actual implementation
  // For now, we provide manual validation guidelines

  console.log(`\n🔍 Validating widget${filePath ? `: ${filePath}` : ''}...\n`);

  // Manual checks developers should perform:
  const checksToPerform = [
    {
      category: '📐 Dimensions',
      checks: [
        `Widget uses WidgetContainer with size="small" (190×190px) or size="large" (400×190px)`,
        `No responsive width/height classes (w-full, h-full, etc.)`,
        `Widget has overflow: hidden`,
      ],
    },
    {
      category: '📏 Spacing',
      checks: [
        `Padding is at least ${appleHIGRules.minPadding}px`,
        `Uses widgetSpacing utilities or explicit padding`,
      ],
    },
    {
      category: '🔤 Typography',
      checks: [
        `Font sizes are at least ${appleHIGRules.minFontSize}px`,
        `Uses widgetText utilities for consistent sizing`,
      ],
    },
    {
      category: '👆 Touch Targets',
      checks: [
        `All buttons have minimum ${appleHIGRules.minTouchTarget}×${appleHIGRules.minTouchTarget}px touch area`,
        `Uses WidgetButton component for consistent sizing`,
      ],
    },
    {
      category: '🎨 Visual',
      checks: [
        `Border radius is ${appleHIGRules.borderRadius}px`,
        `Text has sufficient contrast (4.5:1 minimum)`,
        `Uses shadow-xl or shadow-2xl for depth`,
      ],
    },
    {
      category: '⚙️ Functionality',
      checks: [
        `Widget provides glanceable information`,
        `No advertising content`,
        `Handles offline states gracefully`,
      ],
    },
  ];

  console.log('📋 Apple HIG Compliance Checklist:\n');
  checksToPerform.forEach(({ category, checks }) => {
    console.log(`${category}`);
    checks.forEach((check) => console.log(`   ☐ ${check}`));
    console.log('');
  });

  console.log('💡 Automated validation coming soon!');
  console.log('   For now, please manually verify the checklist above.\n');

  // Return successful validation for now
  // In production, this would actually parse and validate
  return {
    passed: true,
    errors,
    warnings,
  };
}

/**
 * Validate widget dimensions
 */
export function validateDimensions(
  width: number,
  height: number,
  size: 'small' | 'large'
): string[] {
  const errors: string[] = [];
  const expected = appleHIGRules.dimensions[size];

  if (width !== expected.width || height !== expected.height) {
    errors.push(
      validationMessages.invalidDimensions(size, { width, height })
    );
  }

  return errors;
}

/**
 * Validate touch target size
 */
export function validateTouchTarget(width: number, height: number): string[] {
  const errors: string[] = [];
  const minSize = appleHIGRules.minTouchTarget;

  if (width < minSize || height < minSize) {
    errors.push(
      validationMessages.smallTouchTarget(Math.min(width, height), minSize)
    );
  }

  return errors;
}

/**
 * Validate font size
 */
export function validateFontSize(fontSize: number): string[] {
  const errors: string[] = [];
  const minSize = appleHIGRules.minFontSize;

  if (fontSize < minSize) {
    errors.push(validationMessages.smallFontSize(fontSize, minSize));
  }

  return errors;
}
