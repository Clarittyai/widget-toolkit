# Test Before Publishing

Before publishing to GitHub Packages, let's test the toolkit locally in agentic-seed-app.

## Local Testing Setup

### 1. Build the widget toolkit

```bash
cd /Users/shaharcohen/Desktop/claritty/claritty-core/packages/widget-toolkit
npm run build
```

### 2. Link it locally for testing

```bash
# In widget-toolkit directory
npm link

# In agentic-seed-app frontend directory
cd /Users/shaharcohen/Desktop/claritty/agentic-app-seed/frontend
npm link @clarittyai/widget-toolkit
```

### 3. Test installation works

```bash
cd /Users/shaharcohen/Desktop/claritty/agentic-app-seed/frontend

# Check it's linked
npm list @clarittyai/widget-toolkit
# Should show: @clarittyai/widget-toolkit@1.0.0 -> /path/to/widget-toolkit
```

### 4. Test imports in code

Create a test widget: `frontend/src/components/TestWidget.tsx`

```tsx
import {
  WidgetContainer,
  WidgetButton,
  widgetText,
  widgetGradients
} from '@clarittyai/widget-toolkit';

export default function TestWidget({ size = 'large' }: { size: 'small' | 'large' }) {
  return (
    <WidgetContainer
      size={size}
      padding="default"
      className={widgetGradients.sunset}
    >
      <div className="flex flex-col gap-3">
        <div className={widgetText.display}>42</div>
        <div className={widgetText.caption}>Test Widget</div>

        {size === 'large' && (
          <WidgetButton variant="primary">Click Me</WidgetButton>
        )}
      </div>
    </WidgetContainer>
  );
}
```

### 5. Run dev server and verify

```bash
cd /Users/shaharcohen/Desktop/claritty/agentic-app-seed/frontend
npm run dev
```

Check:
- ✅ No TypeScript errors
- ✅ Widget renders correctly
- ✅ Dimensions are correct (190×190 or 400×190)
- ✅ Styles apply properly
- ✅ Button meets 44px minimum

### 6. Cleanup after testing

```bash
# Unlink when done testing
cd /Users/shaharcohen/Desktop/claritty/agentic-app-seed/frontend
npm unlink @clarittyai/widget-toolkit

cd /Users/shaharcohen/Desktop/claritty/claritty-core/packages/widget-toolkit
npm unlink
```

---

## After Local Testing Passes

Once you verify everything works:

1. **Publish to GitHub Packages** (see `PUBLISH_NOW.md`)
2. **Update agentic-seed-app** to use published version
3. **Test with real GitHub Packages install**

---

## Alternative: Bundle for Now

If you want to ship agentic-seed-app **without** requiring GitHub Packages:

```bash
# Copy built toolkit directly into seed app
cp -r /Users/shaharcohen/Desktop/claritty/claritty-core/packages/widget-toolkit \
      /Users/shaharcohen/Desktop/claritty/agentic-app-seed/frontend/

# Update package.json to use local file
# "@clarittyai/widget-toolkit": "file:./widget-toolkit"
```

This way users don't need GitHub tokens - the toolkit is bundled with the seed app.

**Which approach do you prefer?**
1. Publish to GitHub Packages (requires user token setup)
2. Bundle toolkit directly in seed app (zero config for users)
