# Setup Instructions for @claritty/widget-toolkit

## 🚀 Quick Setup Guide

### Step 1: Create GitHub Repository

1. Go to https://github.com/orgs/claritty/repositories
2. Click **"New repository"**
3. Repository name: `widget-toolkit`
4. Description: `Apple HIG-compliant widget toolkit for Clarity Platform`
5. Visibility: **Public** (required for GitHub Packages)
6. ✅ Initialize with README: **No** (we already have one)
7. Click **"Create repository"**

### Step 2: Initialize and Push Code

```bash
cd /Users/shaharcohen/Desktop/claritty/claritty-core/packages/widget-toolkit

# Initialize git (if not already done)
git init
git branch -M main

# Add remote
git remote add origin git@github.com:claritty/widget-toolkit.git

# Add all files
git add .
git commit -m "Initial commit: Apple HIG widget toolkit v1.0.0

- WidgetContainer with strict 190×190 / 400×190 dimensions
- WidgetButton with 44px minimum touch targets
- Typography utilities (widgetText) with 12px minimum
- 20+ gradient presets (widgetGradients)
- Spacing utilities and animations
- Validation system and CLI tool
- Full Apple HIG compliance"

# Push to GitHub
git push -u origin main

# Create version tag
git tag v1.0.0
git push origin v1.0.0
```

### Step 3: Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Token name: `NPM Publish - widget-toolkit`
4. Expiration: **No expiration** (or 1 year)
5. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `write:packages` (Upload packages to GitHub Package Registry)
   - ✅ `read:packages` (Download packages from GitHub Package Registry)
6. Click **"Generate token"**
7. **Copy the token** (you won't see it again!)

### Step 4: Authenticate with GitHub Packages

```bash
npm login --registry=https://npm.pkg.github.com

# Enter these when prompted:
# Username: YOUR_GITHUB_USERNAME
# Password: PASTE_YOUR_TOKEN_FROM_STEP_3
# Email: your-email@example.com
```

Verify authentication:
```bash
npm whoami --registry=https://npm.pkg.github.com
# Should show your GitHub username
```

### Step 5: Build and Publish

```bash
cd /Users/shaharcohen/Desktop/claritty/claritty-core/packages/widget-toolkit

# Build the package
npm run build

# Publish to GitHub Packages
npm publish

# Expected output:
# npm notice 📦  @claritty/widget-toolkit@1.0.0
# npm notice Tarball Details
# npm notice name:          @claritty/widget-toolkit
# npm notice version:       1.0.0
# npm notice filename:      claritty-widget-toolkit-1.0.0.tgz
# + @claritty/widget-toolkit@1.0.0
```

### Step 6: Verify Publication

Visit: https://github.com/claritty/widget-toolkit/packages

You should see `@claritty/widget-toolkit` listed!

## ✅ Setup Complete!

The package is now available at:
- **GitHub Packages**: `@claritty/widget-toolkit@1.0.0`
- **Repository**: https://github.com/claritty/widget-toolkit
- **Documentation**: See README.md

## 🔧 Using in Projects

### For clarity-platform (local development)

Already configured! Just install:
```bash
cd clarity-platform
npm install @claritty/widget-toolkit
```

### For agentic-seed-app

1. Make sure `.npmrc` exists in `frontend/` folder (already added)
2. Users will need to set `GITHUB_TOKEN` environment variable
3. Then run `npm install`

See `agentic-app-seed/WIDGET_SETUP.md` for user instructions.

## 🔄 Updating the Package

When you make changes:

```bash
# 1. Make your changes to src/

# 2. Update version
npm version patch  # 1.0.0 → 1.0.1

# 3. Build
npm run build

# 4. Commit and push
git add .
git commit -m "chore: release v1.0.1"
git push

# 5. Publish
npm publish

# 6. Push tags
git push --tags
```

## 📚 Next Steps

1. ✅ Widget toolkit is published
2. ✅ agentic-seed-app is configured to use it
3. Update WIDGET_DEVELOPMENT_GUIDELINES.md in claritty-core
4. Update demo widgets to import from package (already done in clarity-platform)
5. Test installation in a fresh project

## 🆘 Troubleshooting

**Error: Repository not found**
- Make sure you created the repo at https://github.com/claritty/widget-toolkit
- Check the repo is public

**Error: 403 Forbidden**
- Token needs `write:packages` scope
- Re-run `npm login --registry=https://npm.pkg.github.com`

**Error: Package already exists**
- You've already published this version
- Bump version with `npm version patch`

**Can't install in other projects**
- Users need `.npmrc` file: `@claritty:registry=https://npm.pkg.github.com`
- Users need `GITHUB_TOKEN` with `read:packages` scope
