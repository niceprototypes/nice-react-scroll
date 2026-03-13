# Examples

This directory contains working examples demonstrating various features of nice-react-scroll.

## Available Examples

### 1. Basic Sticky (`basic-sticky.tsx`)
The simplest example showing how to make a header stick to the top of the page.

**Features demonstrated:**
- ScrollProvider setup
- StickyProvider setup
- Basic Sticky component usage

### 2. Multiple Sticky (`multiple-sticky.tsx`)
Shows how to stack multiple sticky elements on top of each other.

**Features demonstrated:**
- Multiple Sticky components
- Using the `order` prop for stacking
- Automatic offset calculation

### 3. Section Navigation (`section-navigation.tsx`)
A complete navigation system with automatic active section detection.

**Features demonstrated:**
- StickySectionLinks component
- StickySection component
- Automatic active state detection
- Custom link rendering
- Smooth scroll animation

### 4. Fade on Scroll (`fade-on-scroll.tsx`)
Various fade effects based on scroll position.

**Features demonstrated:**
- FadeOnScroll component
- Different fade configurations
- Fade in, fade out, and fade through
- Parallax-style effects

### 5. Complete Example (`complete-example.tsx`)
A comprehensive example combining all features.

**Features demonstrated:**
- All components together
- useScroll hook
- onStickyChange callback
- Real-world application structure

## Running the Examples

These examples are written in TypeScript and use styled-components. To run them:

1. Install dependencies:
```bash
npm install nice-react-scroll react react-dom styled-components
npm install -D @types/react @types/react-dom typescript
```

2. Import and use in your React application:
```tsx
import CompleteExample from './examples/complete-example'

function App() {
  return <CompleteExample />
}
```

## Code Structure

Each example follows this pattern:

```tsx
import { ScrollProvider, /* other components */ } from 'nice-react-scroll'

export default function Example() {
  return (
    <ScrollProvider>
      {/* Your components */}
    </ScrollProvider>
  )
}
```

## Learning Path

We recommend exploring the examples in this order:

1. Start with `basic-sticky.tsx` to understand the foundation
2. Move to `multiple-sticky.tsx` to learn about stacking
3. Explore `section-navigation.tsx` for navigation features
4. Try `fade-on-scroll.tsx` for animation effects
5. Study `complete-example.tsx` to see everything together

## Common Patterns

### Provider Setup
Always wrap your app with both providers:
```tsx
<ScrollProvider>
  <StickyProvider>
    {/* Your app */}
  </StickyProvider>
</ScrollProvider>
```

### Sticky Stacking
Use the `order` prop to control stacking (lower = higher):
```tsx
<Sticky order={0}>Header</Sticky>
<Sticky order={1}>Nav</Sticky>
```

### Section Navigation
Combine StickySectionLinks with StickySection:
```tsx
<StickySectionLinks links={[{ href: '#intro', label: 'Intro' }]} />
<StickySection id="intro">Content</StickySection>
```

## Need Help?

- Check the main [README.md](../README.md)
- Read the [API documentation](../API.md)
- Open an issue on GitHub