# Publishing @claritty/widget-toolkit to GitHub Packages

## Prerequisites

1. **Create GitHub repo**: `claritty/widget-toolkit`
2. **GitHub Personal Access Token** with `write:packages` and `read:packages` permissions

## Setup (One-time)

### 1. Create GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "NPM Publish - widget-toolkit"
4. Select scopes:
   - ✅ `write:packages` (to publish)
   - ✅ `read:packages` (to download)
   - ✅ `repo` (if private repo)
5. Generate token and **copy it**

### 2. Authenticate with GitHub Packages

```bash
npm login --registry=https://npm.pkg.github.com
Username: YOUR_GITHUB_USERNAME
Password: YOUR_GITHUB_TOKEN (paste the token from step 1)
Email: your-email@example.com
```

## Publishing to GitHub Packages

### First Time Setup

```bash
cd packages/widget-toolkit

# Initialize git repo (if not already done)
git init
git remote add origin https://github.com/claritty/widget-toolkit.git

# Build the package
npm run build

# Commit everything
git add .
git commit -m "Initial commit: Apple HIG widget toolkit v1.0.0"
git push -u origin main
```

### Publishing

```bash
# Make sure you're authenticated (see step 2 above)
npm login --registry=https://npm.pkg.github.com

# Build and publish
npm run build
npm publish

# Tag the release
git tag v1.0.0
git push origin v1.0.0
```

## Using in Projects

### 1. Add `.npmrc` to your project root:

```
@claritty:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### 2. Set `GITHUB_TOKEN` environment variable:

```bash
# Add to your shell profile (~/.zshrc or ~/.bashrc)
export GITHUB_TOKEN=your_github_token_here
```

### 3. Install the package:

```bash
npm install @claritty/widget-toolkit
```

## For agentic-seed-app

Since agentic-seed-app is distributed to users, we'll include the toolkit directly:

### Option 1: Bundle the toolkit (Recommended for seed app)
Copy the built `widget-toolkit` folder into the seed app.

### Option 2: Use GitHub Packages
Users will need to:
1. Get a GitHub token with `read:packages`
2. Add `.npmrc` with authentication
3. Run `npm install`

## Updating the Package

```bash
# 1. Make your changes

# 2. Update version in package.json
npm version patch  # 1.0.0 → 1.0.1
# or
npm version minor  # 1.0.0 → 1.1.0
# or
npm version major  # 1.0.0 → 2.0.0

# 3. Build
npm run build

# 4. Publish
npm publish

# 5. Push tags
git push && git push --tags
```

## Troubleshooting

**Error: 404 Not Found - GET https://npm.pkg.github.com/@claritty%2fwidget-toolkit**
- Make sure the GitHub repo `claritty/widget-toolkit` exists
- Check you're authenticated: `npm whoami --registry=https://npm.pkg.github.com`

**Error: 403 Forbidden**
- Your token needs `write:packages` permission
- Make sure you're logged in to the correct registry

**Error: need auth**
- Run `npm login --registry=https://npm.pkg.github.com` again
- Check your token hasn't expired
