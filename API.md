# API Reference

Complete API reference for nice-react-scroll.

## Table of Contents

- [Providers](#providers)
  - [ScrollProvider](#scrollprovider)
  - [StickyProvider](#stickyprovider)
- [Components](#components)
  - [Sticky](#sticky)
  - [FadeOnScroll](#fadeonscroll)
  - [StickySectionLinks](#stickysectionlinks)
  - [StickySection](#stickysection)
- [Hooks](#hooks)
  - [useScroll](#usescroll)
  - [useStickyContext](#usestickycontext)
- [Types](#types)
- [Context](#context)

---

## Providers

### ScrollProvider

Centralized scroll manager that provides a single RAF-batched scroll listener for optimal performance.

#### Props

```typescript
interface ScrollProviderProps {
  children: ReactNode
}
```

#### Usage

```tsx
import { ScrollProvider } from 'nice-react-scroll'

function App() {
  return (
    <ScrollProvider>
      {/* Your app components */}
    </ScrollProvider>
  )
}
```

#### Implementation Details

- Creates a single scroll event listener for the entire application
- Uses `requestAnimationFrame` to batch scroll updates
- Provides scroll position to all child components via context
- Uses passive event listeners for better scroll performance
- Automatically cleans up listeners on unmount

---

### StickyProvider

Provider for managing multiple sticky elements with automatic stacking and positioning.

#### Props

```typescript
interface StickyProviderProps {
  children: ReactNode
}
```

#### Usage

```tsx
import { ScrollProvider, StickyProvider } from 'nice-react-scroll'

function App() {
  return (
    <ScrollProvider>
      <StickyProvider>
        {/* Sticky components */}
      </StickyProvider>
    </ScrollProvider>
  )
}
```

#### Implementation Details

- Must be used within `ScrollProvider`
- Manages registration and positioning of all sticky elements
- Calculates cumulative offsets for proper stacking
- Updates positions on scroll events
- Provides context for sticky elements to register themselves

---

## Components

### Sticky

Creates a sticky element that remains fixed at the top of the viewport when scrolled.

#### Props

```typescript
interface StickyProps {
  children: ReactNode
  order?: number
  onStickyChange?: (isSticky: boolean) => void
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Content to render inside the sticky element |
| `order` | `number` | `0` | Stacking order (lower numbers appear above) |
| `onStickyChange` | `(isSticky: boolean) => void` | `undefined` | Callback fired when sticky state changes |

#### Usage

```tsx
import { Sticky } from 'nice-react-scroll'

function Header() {
  const handleStickyChange = (isSticky) => {
    console.log('Sticky state:', isSticky)
  }

  return (
    <Sticky order={0} onStickyChange={handleStickyChange}>
      <nav>Navigation</nav>
    </Sticky>
  )
}
```

#### Stacking Order

Elements with lower `order` values appear above elements with higher values:

```tsx
<Sticky order={0}>Top element</Sticky>
<Sticky order={1}>Second element (below first)</Sticky>
<Sticky order={2}>Third element (below second)</Sticky>
```

#### Implementation Details

- Automatically registers with `StickyProvider`
- Calculates original position on mount
- Updates position based on scroll
- Wraps content in two divs for proper positioning
- The outer wrapper maintains space in the document flow
- The inner wrapper becomes sticky

---

### FadeOnScroll

Applies opacity transitions to elements based on scroll position within the viewport.

#### Props

```typescript
interface FadeOnScrollProps {
  children: ReactNode
  startPosition?: number
  peakPosition?: number
  endPosition?: number
  startOpacity?: number
  peakOpacity?: number
  endOpacity?: number
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Content to fade |
| `startPosition` | `number` | `0` | Scroll progress % where fade begins (0-100) |
| `peakPosition` | `number` | `50` | Scroll progress % where peak opacity is reached |
| `endPosition` | `number` | `100` | Scroll progress % where fade ends |
| `startOpacity` | `number` | `0` | Starting opacity value (0-1) |
| `peakOpacity` | `number` | `1` | Peak opacity value (0-1) |
| `endOpacity` | `number` | `0` | Ending opacity value (0-1) |

#### Scroll Position Calculation

The scroll position is calculated as a percentage based on the element's position in the viewport:

- `0%` - Element bottom is at viewport bottom (just entering)
- `50%` - Element center is at viewport center
- `100%` - Element top is at viewport top (just exiting)

#### Usage Examples

**Fade in only:**
```tsx
<FadeOnScroll
  startPosition={20}
  peakPosition={50}
  startOpacity={0}
  peakOpacity={1}
>
  <Content />
</FadeOnScroll>
```

**Fade in and out:**
```tsx
<FadeOnScroll
  startPosition={10}
  peakPosition={50}
  endPosition={90}
  startOpacity={0.2}
  peakOpacity={1}
  endOpacity={0.2}
>
  <Content />
</FadeOnScroll>
```

**Parallax-style subtle fade:**
```tsx
<FadeOnScroll
  startPosition={0}
  peakPosition={30}
  endPosition={60}
  startOpacity={0.5}
  peakOpacity={1}
  endOpacity={0.5}
>
  <BackgroundImage />
</FadeOnScroll>
```

#### Implementation Details

- Uses `getBoundingClientRect()` to track element position
- Calculates opacity based on current scroll position
- Updates on every scroll event (RAF batched)
- Applies CSS transition for smooth opacity changes

---

### StickySectionLinks

Navigation component with smooth scrolling and automatic active section detection.

#### Props

```typescript
interface StickySectionLinksProps {
  links: StickySectionLink[]
  renderLink?: (link: StickySectionLink, isActive: boolean, onClick: (e: React.MouseEvent) => void) => ReactNode
  renderWrapper?: (children: ReactNode) => ReactNode
  className?: string
}

interface StickySectionLink {
  href: string
  label: string
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `StickySectionLink[]` | Required | Array of navigation links |
| `renderLink` | `function` | `undefined` | Custom renderer for individual links |
| `renderWrapper` | `function` | `undefined` | Custom renderer for the wrapper container |
| `className` | `string` | `undefined` | CSS class for the wrapper |

#### Usage

**Basic usage:**
```tsx
<StickySectionLinks
  links={[
    { href: '#intro', label: 'Introduction' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ]}
/>
```

**Custom link rendering:**
```tsx
<StickySectionLinks
  links={links}
  renderLink={(link, isActive, onClick) => (
    <CustomLink
      href={link.href}
      onClick={onClick}
      active={isActive}
    >
      {link.label}
    </CustomLink>
  )}
/>
```

**Custom wrapper rendering:**
```tsx
<StickySectionLinks
  links={links}
  renderWrapper={(children) => (
    <nav className="custom-nav">
      <ul className="nav-list">{children}</ul>
    </nav>
  )}
/>
```

#### Features

- **Smooth Scrolling**: Custom smooth scroll animation (300ms ease-in-out)
- **Active Detection**: Uses IntersectionObserver for efficient active section tracking
- **Sticky Offset**: Automatically accounts for sticky header heights
- **Customizable**: Full control over link and wrapper rendering

#### Implementation Details

- Uses IntersectionObserver to detect which section is in view
- Calculates proper scroll offset considering sticky elements
- Implements custom smooth scroll with RAF
- Updates active state based on intersection events
- Requires target elements to have matching IDs (use with `StickySection`)

---

### StickySection

Wrapper component that provides a type-safe way to create sections with IDs for navigation.

#### Props

```typescript
interface StickySectionProps {
  id: string
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  render?: (props: { id: string; children: ReactNode }) => ReactNode
  className?: string
  style?: CSSProperties
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | Required | Unique identifier for the section |
| `children` | `ReactNode` | Required | Content to render |
| `as` | `keyof JSX.IntrinsicElements` | `"section"` | HTML element type to use |
| `render` | `function` | `undefined` | Custom render function |
| `className` | `string` | `undefined` | CSS class name |
| `style` | `CSSProperties` | `undefined` | Inline styles |

#### Usage

**Basic usage:**
```tsx
<StickySection id="about">
  <h2>About Us</h2>
  <p>Content here...</p>
</StickySection>
```

**Using different element:**
```tsx
<StickySection id="hero" as="div">
  <Hero />
</StickySection>
```

**Custom render function:**
```tsx
<StickySection
  id="custom"
  render={({ id, children }) => (
    <article id={id} className="custom-wrapper">
      <div className="inner">{children}</div>
    </article>
  )}
>
  <Content />
</StickySection>
```

#### Implementation Details

- Simple wrapper that ensures sections have proper IDs
- Supports custom rendering for flexibility
- Works seamlessly with `StickySectionLinks`
- Type-safe component for better DX

---

## Hooks

### useScroll

Hook to access the current scroll position from anywhere within `ScrollProvider`.

#### Signature

```typescript
function useScroll(): number
```

#### Returns

- `number` - Current vertical scroll position in pixels

#### Usage

```tsx
import { useScroll } from 'nice-react-scroll'

function MyComponent() {
  const scrollY = useScroll()

  return <div>Scrolled {scrollY}px</div>
}
```

#### Throws

Throws an error if used outside of `ScrollProvider`:
```
Error: useScroll must be used within a ScrollProvider
```

#### Implementation Details

- Subscribes to scroll updates from `ScrollProvider`
- Updates are RAF-batched for performance
- Automatically unsubscribes on unmount
- Initial value is set immediately on mount

---

### useStickyContext

Hook to access the sticky context for advanced use cases.

#### Signature

```typescript
function useStickyContext(): StickyContextValue
```

#### Returns

```typescript
interface StickyContextValue {
  registerInstance: (
    order: number,
    height: number,
    element: HTMLDivElement,
    outerElement: HTMLDivElement,
    originalTop: number
  ) => void
  unregisterInstance: (order: number) => void
  getTotalStickyHeight: () => number
}
```

#### Usage

```tsx
import { useStickyContext } from 'nice-react-scroll'

function MyComponent() {
  const { getTotalStickyHeight } = useStickyContext()

  const offset = getTotalStickyHeight()
  return <div>Total sticky height: {offset}px</div>
}
```

#### Throws

Throws an error if used outside of `StickyProvider`:
```
Error: Sticky components must be used within StickyProvider
```

---

## Types

### Exported Types

```typescript
// Scroll
export interface ScrollContextValue {
  scrollY: number
  subscribe: (callback: (scrollY: number) => void) => () => void
}

// Sticky
export interface StickyProps {
  children: ReactNode
  order?: number
  onStickyChange?: (isSticky: boolean) => void
}

export interface StickyContextValue {
  registerInstance: (
    order: number,
    height: number,
    element: HTMLDivElement,
    outerElement: HTMLDivElement,
    originalTop: number
  ) => void
  unregisterInstance: (order: number) => void
  getTotalStickyHeight: () => number
}

// Fade
export interface FadeOnScrollProps {
  children: ReactNode
  startPosition?: number
  peakPosition?: number
  endPosition?: number
  startOpacity?: number
  peakOpacity?: number
  endOpacity?: number
}

// Section Links
export interface StickySectionLink {
  href: string
  label: string
}

export interface StickySectionLinksProps {
  links: StickySectionLink[]
  renderLink?: (
    link: StickySectionLink,
    isActive: boolean,
    onClick: (e: React.MouseEvent) => void
  ) => ReactNode
  renderWrapper?: (children: ReactNode) => ReactNode
  className?: string
}

// Section
export interface StickySectionProps {
  id: string
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  render?: (props: { id: string; children: ReactNode }) => ReactNode
  className?: string
  style?: CSSProperties
}
```

### Importing Types

```typescript
import type {
  ScrollContextValue,
  StickyProps,
  StickyContextValue,
  FadeOnScrollProps,
  StickySectionLink,
  StickySectionLinksProps,
  StickySectionProps
} from 'nice-react-scroll'
```

---

## Context

### ScrollContext

React context for scroll management.

```typescript
export const ScrollContext = React.createContext<ScrollContextValue | null>(null)
```

Direct usage is not recommended. Use `useScroll` hook instead.

---

### StickyContext

React context for sticky element management.

```typescript
export const StickyContext = React.createContext<StickyContextValue | null>(null)
```

Direct usage is not recommended for most cases. Use `useStickyContext` hook if needed.

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires `IntersectionObserver` support (for `StickySectionLinks`)
- Requires `requestAnimationFrame` support
- Consider polyfills for older browsers

---

## Performance Considerations

1. **Single Scroll Listener**: Only one scroll event listener for the entire app
2. **RAF Batching**: All scroll updates are batched with `requestAnimationFrame`
3. **Passive Listeners**: Scroll listener uses `{ passive: true }` for better performance
4. **Efficient Updates**: Components only update when necessary
5. **IntersectionObserver**: Used for active section detection instead of scroll calculations

---

## Migration Guide

### From Multiple Scroll Listeners

**Before:**
```tsx
useEffect(() => {
  const handleScroll = () => {
    setScrollY(window.scrollY)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

**After:**
```tsx
const scrollY = useScroll()
```

### From CSS-only Sticky

**Before:**
```tsx
<div style={{ position: 'sticky', top: 0 }}>
  Header
</div>
```

**After:**
```tsx
<Sticky order={0}>
  <Header />
</Sticky>
```

Benefits: Automatic stacking, callbacks, and better control.

---

## Advanced Patterns

### Conditional Sticky Behavior

```tsx
function ConditionalSticky({ children, shouldBeSticky }) {
  const [isSticky, setIsSticky] = useState(false)

  return shouldBeSticky ? (
    <Sticky onStickyChange={setIsSticky}>
      {children}
    </Sticky>
  ) : (
    children
  )
}
```

### Scroll-based Animations

```tsx
function ScrollAnimation() {
  const scrollY = useScroll()
  const opacity = Math.min(scrollY / 300, 1)

  return <div style={{ opacity }}>{/* content */}</div>
}
```

### Multiple Sticky Sections

```tsx
<StickyProvider>
  <Sticky order={0}>
    <GlobalHeader />
  </Sticky>

  <Sticky order={1}>
    <SubHeader />
  </Sticky>

  <Sticky order={2}>
    <StickySectionLinks links={links} />
  </Sticky>

  <StickySection id="content">
    <Content />
  </StickySection>
</StickyProvider>
```