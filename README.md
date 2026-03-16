# @clarittyai/widget-toolkit

**Apple-compliant widget toolkit for Clarity Platform** - Enforces iOS Human Interface Guidelines automatically.

## 🎯 Overview

This package provides React components and utilities that enforce Apple's design standards for widgets, ensuring your widgets pass App Store review and feel native to iOS users.

## 📦 Installation

### 1. Configure GitHub Packages (One-Time Setup)

Create a GitHub Personal Access Token with `read:packages` permission:
1. Go to https://github.com/settings/tokens
2. Generate new token (classic)
3. Select `read:packages` scope
4. Copy the token

Add to `~/.npmrc`:
```bash
@clarittyai:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### 2. Install Package

```bash
npm install @clarittyai/widget-toolkit
```

**Peer Dependencies:**
```bash
npm install react framer-motion tailwindcss
```

## 🚀 Quick Start

```tsx
import {
  WidgetContainer,
  WidgetButton,
  widgetText,
  widgetGradients
} from '@clarittyai/widget-toolkit';

export default function MyWidget({ size = 'large' }: { size: 'small' | 'large' }) {
  return (
    <WidgetContainer
      size={size}
      padding="default"
      className={widgetGradients.sunset}
    >
      <div className="flex flex-col gap-3">
        <div className={widgetText.display}>42</div>
        <div className={widgetText.caption}>Active Users</div>

        {size === 'large' && (
          <WidgetButton variant="primary">
            View Details
          </WidgetButton>
        )}
      </div>
    </WidgetContainer>
  );
}
```

## 📐 Enforced Standards

### Dimensions (Apple iOS Widget Sizes)
- **Small**: `190×190px` (1:1 ratio - iOS systemSmall)
- **Large**: `400×190px` (2.1:1 ratio - iOS systemLarge)

### Spacing (Apple 8pt Grid)
- **Padding**: 16px default (Apple's standard widget margin)
- **Internal gaps**: 8px, 12px, 16px (multiples of 8)

### Typography (Apple SF Pro Scale)
- **Display**: 48px, weight 900 (large metrics)
- **Headline**: 20px, weight 700 (titles)
- **Body**: 14px, weight 500 (content)
- **Caption**: 12px, weight 500 (minimum readable size)

### Touch Targets (Apple Accessibility)
- **Buttons**: Minimum 44×44px
- **Toggles**: Minimum 48px wide

## 📚 Components

### WidgetContainer
Enforces strict dimensions, padding, border radius, and overflow.

```tsx
<WidgetContainer
  size="small" | "large"
  padding="default" | "compact" | "spacious"
  className="your-gradient-classes"
>
  {children}
</WidgetContainer>
```

### WidgetButton
Enforces touch target sizes and Apple-style styling.

```tsx
<WidgetButton
  variant="primary" | "secondary" | "ghost"
  size="default" | "large"
  onClick={handleClick}
>
  Button Text
</WidgetButton>
```

## 🎨 Utilities

### widgetText
Typography scale matching Apple SF Pro:
```tsx
import { widgetText } from '@clarittyai/widget-toolkit';

<div className={widgetText.display}>42</div>      // 48px, weight 900
<div className={widgetText.headline}>Title</div>  // 20px, weight 700
<div className={widgetText.caption}>Label</div>   // 12px, weight 500
```

### widgetSpacing
Spacing utilities following 8pt grid:
```tsx
import { widgetSpacing } from '@clarittyai/widget-toolkit';

<div className={widgetSpacing.padding.default}>   // p-4 (16px)
<div className={widgetSpacing.gap.normal}>        // gap-3 (12px)
```

### widgetGradients
Apple-style gradient presets:
```tsx
import { widgetGradients } from '@clarittyai/widget-toolkit';

<div className={widgetGradients.sunset}>    // Amber/Orange gradient
<div className={widgetGradients.ocean}>     // Blue/Cyan gradient
<div className={widgetGradients.lavender}>  // Indigo/Purple gradient
```

## ✅ Validation

Validate your widgets against Apple HIG:

```bash
npx @clarittyai/widget-toolkit validate widget/Widget.tsx
```

**Checks:**
- ✅ Dimensions are exact (190×190 or 400×190)
- ✅ Padding ≥ 12px
- ✅ Font sizes ≥ 12px
- ✅ Touch targets ≥ 44px
- ✅ No advertising content
- ⚠️ Warns about contrast ratios

## 📖 Full Documentation

- [API Reference](./docs/API.md)
- [Apple Compliance Guide](./docs/APPLE_COMPLIANCE.md)
- [Quick Start Examples](./examples/README.md)

## 🍎 Apple App Store Compliance

This toolkit enforces Apple's Human Interface Guidelines to ensure:
- Widgets pass App Store review
- Consistent user experience
- Accessibility standards
- Native iOS feel

## 📄 License

MIT © Clarity Platform
