#!/usr/bin/env node

/**
 * Widget Validation CLI
 *
 * Usage:
 *   npx @claritty/widget-toolkit validate widget/Widget.tsx
 *   widget-toolkit validate widget/Widget.tsx
 */

import { validateWidget } from './validate-widget';

function main() {
  const args = process.argv.slice(2);

  // Show help if no arguments
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
🍎 Apple HIG Widget Validator
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Validates your widget against Apple's Human Interface Guidelines.

Usage:
  npx @claritty/widget-toolkit validate <file>
  widget-toolkit validate widget/Widget.tsx

Options:
  --help, -h     Show this help message
  --version, -v  Show package version

Examples:
  widget-toolkit validate widget/Widget.tsx
  widget-toolkit validate src/MyWidget.tsx

What's Validated:
  ✅ Dimensions (190×190px or 400×190px)
  ✅ Padding (minimum 12px)
  ✅ Font sizes (minimum 12px)
  ✅ Touch targets (minimum 44×44px)
  ✅ Border radius (22px)
  ✅ Visual standards (shadows, overflow)

For more info:
  https://github.com/claritty/widget-toolkit#validation
`);
    process.exit(0);
  }

  // Show version
  if (args.includes('--version') || args.includes('-v')) {
    // In production, this would read from package.json
    console.log('@claritty/widget-toolkit v1.0.0');
    process.exit(0);
  }

  // Get file path
  const command = args[0];
  const filePath = command === 'validate' ? args[1] : args[0];

  if (!filePath) {
    console.error('❌ Error: No file specified');
    console.error('Usage: widget-toolkit validate <file>');
    process.exit(1);
  }

  // Run validation
  console.log('');
  const result = validateWidget(filePath);
  console.log('');

  // Show results
  if (result.errors.length > 0) {
    console.log('❌ Validation Failed\n');
    console.log('Errors:');
    result.errors.forEach((err, i) => {
      console.log(`  ${i + 1}. ${err}`);
    });
    console.log('');
  }

  if (result.warnings.length > 0) {
    console.log('⚠️  Warnings:\n');
    result.warnings.forEach((warn, i) => {
      console.log(`  ${i + 1}. ${warn}`);
    });
    console.log('');
  }

  if (result.passed && result.errors.length === 0) {
    console.log('✅ Widget appears Apple HIG compliant!');
    console.log('   Ready for production use.\n');
  }

  // Exit with appropriate code
  process.exit(result.passed ? 0 : 1);
}

// Run CLI
main();
