/**
 * @claritty/widget-toolkit
 *
 * Apple-compliant widget toolkit for Clarity Platform
 * Enforces iOS Human Interface Guidelines automatically
 */

// Components
export * from './components';

// Utilities
export * from './utils';

// Validation (for advanced users)
export * from './validation';

// Types
export * from './types';

// Package version + name — sourced from package.json at runtime so they ALWAYS
// match the published version (no hand-bumping a second copy that silently
// drifts, as the old hardcoded const did). dist/index.js is CommonJS, so
// `../package.json` resolves to this package's manifest at runtime.
declare const require: (id: string) => { version: string; name: string };
const pkg = require('../package.json');
export const version: string = pkg.version;
export const name: string = pkg.name;
