import * as fs from 'fs';
import type { ValidationResult } from '../types';
import { appleHIGRules, validationMessages } from './rules';

// ---------------------------------------------------------------------------
// Real static analysis for widget compliance.
//
// The canonical rule: every widget must render through `<WidgetContainer>`
// from `@clarittyai/widget-toolkit`. That single component owns the enforced
// dimensions (170×170, 360×170, 360×360), padding (16px), border radius
// (24px / rounded-3xl), overflow:hidden, and liquid-glass surface. If a
// widget bypasses it (rolls its own outer div, overrides the radius), the
// dashboard frame and the embedded widget no longer match — exactly the
// crypto-sense regression that prompted this enforcement.
//
// What we check:
//   1. The file imports `WidgetContainer` from `@clarittyai/widget-toolkit`.
//   2. The file uses `<WidgetContainer` in JSX.
//   3. `<WidgetContainer>` is NOT given a className that overrides the
//      canonical `rounded-*` radius (the className may still customize the
//      surface — `!bg-...`, `flex`, `border`, etc. — just not the radius).
//
// Static analysis only. No render. No AST. Fast and dependency-free so this
// runs in the platform's submission-validation CI without any extra setup.
// ---------------------------------------------------------------------------

interface WidgetContainerOpenTag {
  /** The tag body between `<WidgetContainer` and the closing `>` (or `/>`). */
  body: string;
  /** Line number in the source (1-indexed) where the tag starts. */
  line: number;
}

/**
 * Find every `<WidgetContainer ... >` opening tag in the file and return
 * its body (everything between the component name and the closing `>`).
 *
 * Handles:
 *   - Tags split across multiple lines (className on its own line)
 *   - Strings inside attributes (won't treat a `>` in a string as the close)
 *   - Expression braces `{...}` (won't be confused by a `>` inside `{a > b}`)
 */
function findWidgetContainerTags(source: string): WidgetContainerOpenTag[] {
  const tags: WidgetContainerOpenTag[] = [];
  const openRe = /<WidgetContainer\b/g;
  let match: RegExpExecArray | null;

  while ((match = openRe.exec(source)) !== null) {
    const start = match.index + match[0].length;
    let i = start;
    let inString: '"' | "'" | '`' | null = null;
    let braceDepth = 0;

    while (i < source.length) {
      const ch = source[i];
      const prev = source[i - 1];

      if (inString) {
        if (ch === inString && prev !== '\\') inString = null;
      } else if (ch === '"' || ch === "'" || ch === '`') {
        inString = ch;
      } else if (ch === '{') {
        braceDepth++;
      } else if (ch === '}') {
        if (braceDepth > 0) braceDepth--;
      } else if (ch === '>' && braceDepth === 0) {
        break;
      }
      i++;
    }

    const body = source.substring(start, i);
    const line = source.substring(0, start).split('\n').length;
    tags.push({ body, line });
  }

  return tags;
}

/**
 * Extract the className value from a JSX tag body (the chunk between the
 * component name and the closing `>`). Handles double-quoted, single-quoted,
 * and `{`-wrapped expressions (e.g. `className={cn('a', 'b')}`). Returns
 * the raw string for further inspection. Returns `null` when no className
 * is set.
 */
function extractClassName(tagBody: string): string | null {
  // Quoted form: className="..." or className='...'
  const quoted = tagBody.match(/className\s*=\s*(['"`])([\s\S]*?)\1/);
  if (quoted) return quoted[2];

  // Expression form: className={...} — pull the whole expression body.
  const expr = tagBody.match(/className\s*=\s*\{([\s\S]*?)\}/);
  if (expr) return expr[1];

  return null;
}

/**
 * Look for `rounded-*` Tailwind classes that AREN'T `rounded-3xl` (or
 * `rounded-none`, which clears the radius entirely — also a violation).
 * Returns the offending token, or null if all radii present are canonical.
 *
 * Important: `rounded-3xl` is OK. `!rounded-3xl` (Tailwind `important`) is
 * OK. Any other variant — `rounded-2xl`, `rounded-xl`, `rounded-md`,
 * `rounded-[24px]` (even though that's the right pixel value, we require
 * the canonical class name so other tools recognize it) — is not OK.
 */
function findNonCanonicalRadius(className: string): string | null {
  // Match any Tailwind rounded utility (with optional ! important prefix
  // and variant prefixes like `dark:`, `hover:`, `md:`).
  const radiusRe = /(?:^|\s|:)!?rounded-[\w[\]()/.%-]+/g;
  let match: RegExpExecArray | null;
  while ((match = radiusRe.exec(className)) !== null) {
    const raw = match[0].trim();
    // Strip leading `!`, variant prefixes (`md:`), and the leading `rounded-`.
    const justClass = raw.replace(/^.*?(?=rounded-)/, '');
    if (justClass === 'rounded-3xl') continue;
    return raw;
  }
  return null;
}

/**
 * Validate a widget source file.
 *
 * @param filePath - Path to a .tsx/.jsx widget file
 * @returns ValidationResult with passed flag, errors, warnings
 */
export function validateWidget(filePath?: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!filePath) {
    errors.push(
      'No widget file specified. Usage: widget-toolkit validate <file>',
    );
    return { passed: false, errors, warnings };
  }

  let source: string;
  try {
    source = fs.readFileSync(filePath, 'utf8');
  } catch (err: any) {
    errors.push(`Cannot read ${filePath}: ${err.message ?? err}`);
    return { passed: false, errors, warnings };
  }

  console.log(`\n🔍 Validating widget: ${filePath}\n`);

  // Strip line + block comments so a commented-out example doesn't count as
  // valid usage. Imperfect (won't handle a `//` inside a string), but good
  // enough to stop trivial bypasses like "I commented out the WidgetContainer
  // and replaced it with my own div."
  const stripped = source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');

  // ----- Rule 1: WidgetContainer must be imported from the toolkit. ----
  const importsWidgetContainer =
    /from\s+['"]@clarittyai\/widget-toolkit['"]/.test(stripped) &&
    /\bWidgetContainer\b/.test(stripped);

  if (!importsWidgetContainer) {
    errors.push(
      `Widget does not import \`WidgetContainer\` from \`@clarittyai/widget-toolkit\`. ` +
        `Add: \`import { WidgetContainer } from '@clarittyai/widget-toolkit';\` ` +
        `and wrap the widget JSX in it. Without WidgetContainer the canonical ` +
        `dimensions, padding, border radius (${appleHIGRules.borderRadius}px / rounded-3xl), ` +
        `and liquid-glass surface aren't enforced.`,
    );
  }

  // ----- Rule 2: WidgetContainer must actually appear in JSX. ----------
  const tags = findWidgetContainerTags(stripped);
  if (tags.length === 0) {
    errors.push(
      `Widget does not render \`<WidgetContainer>\` in its JSX. ` +
        `Wrap the widget output in \`<WidgetContainer size="small" | "medium" | "large">\` ` +
        `so the canonical chrome (size, padding, radius, surface) is applied.`,
    );
  }

  // ----- Rule 3: Don't override the canonical radius via className. ---
  for (const tag of tags) {
    const className = extractClassName(tag.body);
    if (!className) continue;
    const offending = findNonCanonicalRadius(className);
    if (offending) {
      errors.push(
        `<WidgetContainer> at line ${tag.line} has \`${offending}\` in its className, ` +
          `which overrides the canonical ${appleHIGRules.borderRadius}px radius. ` +
          `Remove the rounded-* override — the radius must stay at rounded-3xl ` +
          `so the widget matches the dashboard's outer frame.`,
      );
    }
  }

  // ---------------------------------------------------------------------
  // Report
  // ---------------------------------------------------------------------
  if (errors.length === 0) {
    console.log('✅ Widget compliance:');
    console.log(`   • Imports WidgetContainer from @clarittyai/widget-toolkit`);
    console.log(`   • Renders <WidgetContainer> in JSX (${tags.length} instance${tags.length === 1 ? '' : 's'})`);
    console.log(
      `   • No className overrides for the canonical ${appleHIGRules.borderRadius}px / rounded-3xl radius`,
    );
  } else {
    console.log('❌ Widget compliance failures:');
    errors.forEach((err, i) => console.log(`   ${i + 1}. ${err}\n`));
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate widget dimensions (programmatic — used by host-side runtime
 * checks; unchanged from the prior version).
 */
export function validateDimensions(
  width: number,
  height: number,
  size: 'small' | 'medium' | 'large',
): string[] {
  const errors: string[] = [];
  const expected = appleHIGRules.dimensions[size];

  if (width !== expected.width || height !== expected.height) {
    errors.push(
      validationMessages.invalidDimensions(size, { width, height }),
    );
  }

  return errors;
}

/** Validate touch target size. */
export function validateTouchTarget(width: number, height: number): string[] {
  const errors: string[] = [];
  const minSize = appleHIGRules.minTouchTarget;

  if (width < minSize || height < minSize) {
    errors.push(
      validationMessages.smallTouchTarget(Math.min(width, height), minSize),
    );
  }

  return errors;
}

/** Validate font size. */
export function validateFontSize(fontSize: number): string[] {
  const errors: string[] = [];
  const minSize = appleHIGRules.minFontSize;

  if (fontSize < minSize) {
    errors.push(validationMessages.smallFontSize(fontSize, minSize));
  }

  return errors;
}
