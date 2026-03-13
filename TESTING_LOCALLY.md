# Testing nice-react-scroll Locally

This guide explains how to test the package locally in your application without publishing to npm.

## The Problem

Using `npm link` directly can cause the "Invalid hook call" error because React gets loaded twice:
- Once from your app's `node_modules`
- Once from the library's `node_modules`

## Solution 1: npm pack (Recommended)

This is the safest way to test locally:

```bash
# In nice-react-scroll directory
npm run build
npm pack

# This creates: nice-react-scroll-1.2.5.tgz
```

Then in your test app:

```bash
# In your-app directory
npm install /path/to/nice-react-scroll/nice-react-scroll-1.2.5.tgz

# Or if in parent directory:
npm install ../nice-react-scroll/nice-react-scroll-1.2.5.tgz
```

This installs it like a real npm package and avoids the duplicate React issue.

**Update after changes:**
```bash
# In nice-react-scroll
npm run build
npm pack

# In your-app
npm uninstall nice-react-scroll
npm install ../nice-react-scroll/nice-react-scroll-1.2.5.tgz
```

## Solution 2: npm link with React linking (Advanced)

If you prefer `npm link` for faster iteration:

### Step 1: Link React from your app to the library

```bash
# In your-app directory
cd node_modules/react
npm link

cd ../react-dom
npm link

cd ../styled-components
npm link
```

### Step 2: Link the library

```bash
# In nice-react-scroll directory
npm link react react-dom styled-components
npm run build
npm link

# In your-app directory
npm link nice-react-scroll
```

This ensures both the library and your app use the same React instance.

### Unlinking when done:

```bash
# In your-app
npm unlink nice-react-scroll

# In nice-react-scroll
npm unlink react react-dom styled-components
npm unlink
```

## Solution 3: Using yalc (Best for Development)

Yalc is a better alternative to npm link:

```bash
# Install yalc globally
npm install -g yalc

# In nice-react-scroll directory
npm run build
yalc publish

# In your-app directory
yalc add nice-react-scroll
npm install
```

**Update after changes:**
```bash
# In nice-react-scroll
npm run build
yalc push

# Your app will automatically update
```

**Remove when done:**
```bash
# In your-app
yalc remove nice-react-scroll
npm install
```

## Solution 4: Direct File Reference (Quick & Dirty)

For quick testing, you can import directly from the built files:

In your app's `package.json`:
```json
{
  "dependencies": {
    "nice-react-scroll": "file:../nice-react-scroll"
  }
}
```

Then:
```bash
npm install
```

## Troubleshooting

### Still getting "Invalid hook call" error?

1. **Check for multiple React copies:**
   ```bash
   # In your-app
   npm ls react
   ```

   You should only see one version. If you see multiple, that's the problem.

2. **Clear everything and reinstall:**
   ```bash
   # In nice-react-scroll
   rm -rf node_modules
   npm install
   npm run build

   # In your-app
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Use npm pack method** - It's the most reliable.

### Build not updating?

Make sure to run `npm run build` in nice-react-scroll after every change.

### Type errors?

If you get TypeScript errors, make sure your app's `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "skipLibCheck": true
  }
}
```

## Recommended Workflow

For active development:

1. **Use yalc** for best experience
2. Make changes in nice-react-scroll
3. Run `npm run build && yalc push`
4. App automatically updates
5. Test changes
6. Repeat

For final testing before publish:

1. **Use npm pack**
2. Install the tarball in your app
3. Test thoroughly
4. If all works, publish to npm

## Quick Reference

```bash
# Method 1: npm pack (safest)
cd nice-react-scroll && npm run build && npm pack
cd your-app && npm install ../nice-react-scroll/*.tgz

# Method 2: yalc (best for development)
cd nice-react-scroll && npm run build && yalc push
cd your-app && yalc add nice-react-scroll

# Method 3: npm link (requires extra steps)
# See detailed steps above
```

## After Publishing to npm

Once published, you can install normally:

```bash
npm install nice-react-scroll
```

No more special steps needed!