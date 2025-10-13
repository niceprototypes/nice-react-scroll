# nice-react-scroll

Performance-optimized scroll components for React with centralized scroll management, sticky positioning, fade effects, and section navigation.

## Features

- 🚀 **Single RAF-batched scroll listener** - One centralized scroll manager for optimal performance
- 📌 **Sticky positioning** - Multiple sticky elements with automatic stacking
- 🎯 **Section navigation** - Smart navigation with IntersectionObserver and smooth scrolling
- 🌊 **Fade on scroll** - Customizable opacity transitions based on scroll position
- 📱 **Mobile responsive** - Built-in support for mobile-specific behavior
- 🎨 **Styled Components** - Full integration with styled-components
- ⚡ **TypeScript** - Full type safety and IntelliSense support

## Installation

```bash
npm install nice-react-scroll
```

### Peer Dependencies

```bash
npm install react react-dom styled-components
```

## Quick Start

```tsx
import {
  ScrollProvider,
  StickyProvider,
  Sticky,
  StickySectionLinks,
  StickySection,
  FadeOnScroll
} from 'nice-react-scroll'

function App() {
  return (
    <ScrollProvider>
      <StickyProvider>
        {/* Sticky header */}
        <Sticky order={0}>
          <Header />
        </Sticky>

        {/* Sticky navigation */}
        <Sticky order={1}>
          <StickySectionLinks
            links={[
              { href: '#intro', label: 'Introduction' },
              { href: '#features', label: 'Features' }
            ]}
          />
        </Sticky>

        {/* Content with fade effect */}
        <FadeOnScroll startPosition={20} peakPosition={50}>
          <StickySection id="intro">
            <h1>Welcome</h1>
          </StickySection>
        </FadeOnScroll>

        <StickySection id="features">
          <h2>Features</h2>
        </StickySection>
      </StickyProvider>
    </ScrollProvider>
  )
}
```

## Components

### ScrollProvider

Centralized scroll manager that provides a single `requestAnimationFrame`-batched scroll listener.

```tsx
import { ScrollProvider } from 'nice-react-scroll'

function App() {
  return (
    <ScrollProvider>
      {/* Your app */}
    </ScrollProvider>
  )
}
```

**Why use ScrollProvider?**
- Prevents multiple scroll listeners from degrading performance
- Batches scroll updates using RAF for smoother animations
- Provides `useScroll()` hook for components that need scroll position

### useScroll Hook

Access the current scroll position from any component within ScrollProvider.

```tsx
import { useScroll } from 'nice-react-scroll'

function MyComponent() {
  const scrollY = useScroll()

  return <div>Scroll position: {scrollY}px</div>
}
```

### StickyProvider & Sticky

Create sticky elements that stack on top of each other with automatic offset calculation.

```tsx
import { StickyProvider, Sticky } from 'nice-react-scroll'

function App() {
  return (
    <StickyProvider>
      {/* First sticky (top) */}
      <Sticky order={0}>
        <Header />
      </Sticky>

      {/* Second sticky (below first) */}
      <Sticky order={1}>
        <Subheader />
      </Sticky>

      {/* Content */}
      <main>...</main>
    </StickyProvider>
  )
}
```

**Props:**
- `order` (number): Stacking order (lower numbers appear above). Default: `0`

**How it works:**
- Elements with `order={0}` appear first (topmost)
- Elements with `order={1}` stack below order={0}
- Automatically calculates offsets for proper stacking
- Adds box shadow when element becomes sticky

### StickySectionLinks

Navigation component with smooth scrolling and automatic active state detection.

```tsx
import { StickySectionLinks } from 'nice-react-scroll'

function Navigation() {
  return (
    <StickySectionLinks
      links={[
        { href: '#intro', label: 'Introduction' },
        { href: '#about', label: 'About Us' },
        { href: '#contact', label: 'Contact' }
      ]}
    />
  )
}
```

**Props:**
- `links` (StickySectionLink[]): Array of navigation links
  - `href` (string): Section ID with # prefix (e.g., `'#intro'`)
  - `label` (string): Link text
- `className?` (string): Additional CSS class
- `renderLink?` (function): Custom renderer for link items

**Features:**
- Smooth scroll animation (300ms ease-in-out)
- Active state detection using IntersectionObserver
- Automatic offset for sticky headers
- Works seamlessly with StickySection components

**Example:**
```tsx
<StickySectionLinks
  links={[
    { href: '#roles', label: 'Our Roles' },
    { href: '#problem', label: 'The Problem' },
    { href: '#research', label: 'Research' }
  ]}
/>
```

### StickySection

Wrapper component that provides a type-safe way to create sections with IDs for use with StickySectionLinks.

```tsx
import { StickySection } from 'nice-react-scroll'

function Content() {
  return (
    <>
      <StickySection id="intro">
        <h2>Introduction</h2>
        <p>Welcome to our site</p>
      </StickySection>

      <StickySection id="about">
        <h2>About Us</h2>
        <p>Learn more about what we do</p>
      </StickySection>
    </>
  )
}
```

**Props:**
- `id` (string, required): Unique identifier for the section
- `children` (ReactNode): Content to render inside the section
- `as?` (string): HTML element type to use. Default: `"section"`
- `render?` (function): Custom render function (overrides `as` prop)
- `className?` (string): Optional className for styling
- `style?` (CSSProperties): Optional inline styles

**Using different elements:**
```tsx
<StickySection id="hero" as="div">
  <Hero />
</StickySection>

<StickySection id="article" as="article">
  <Article />
</StickySection>
```

**Using custom render function:**
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

### FadeOnScroll

Apply opacity transitions to elements based on scroll position.

```tsx
import { FadeOnScroll } from 'nice-react-scroll'

function Hero() {
  return (
    <FadeOnScroll
      startPosition={0}
      peakPosition={30}
      endPosition={60}
      startOpacity={0}
      peakOpacity={1}
      endOpacity={0.3}
    >
      <img src="hero.jpg" alt="Hero" />
    </FadeOnScroll>
  )
}
```

**Props:**
- `startPosition` (number): Scroll % where fade begins. Default: `0`
- `peakPosition` (number): Scroll % where opacity reaches peak. Default: `50`
- `endPosition?` (number): Scroll % where fade ends. Optional
- `startOpacity` (number): Starting opacity (0-1). Default: `0`
- `peakOpacity` (number): Peak opacity (0-1). Default: `1`
- `endOpacity?` (number): Ending opacity (0-1). Optional

**Scroll position calculation:**
- `0%` = element just enters viewport (bottom of element at bottom of viewport)
- `50%` = element center is at viewport center
- `100%` = element exits viewport (top of element at top of viewport)

**Common patterns:**

Fade in on scroll:
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

Fade in and out:
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

Parallax-style fade:
```tsx
<FadeOnScroll
  startPosition={0}
  peakPosition={30}
  endPosition={60}
  startOpacity={0.1}
  peakOpacity={1}
  endOpacity={0.1}
>
  <BackgroundImage />
</FadeOnScroll>
```

## Complete Example

```tsx
import React from 'react'
import {
  ScrollProvider,
  StickyProvider,
  Sticky,
  StickySectionLinks,
  StickySection,
  FadeOnScroll,
  useScroll
} from 'nice-react-scroll'
import styled from 'styled-components'

const Header = styled.header`
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

function ScrollIndicator() {
  const scrollY = useScroll()
  return <div>Scroll: {scrollY}px</div>
}

function App() {
  return (
    <ScrollProvider>
      <StickyProvider>
        {/* Sticky Header */}
        <Sticky order={0}>
          <Header>
            <h1>My Website</h1>
            <ScrollIndicator />
          </Header>
        </Sticky>

        {/* Sticky Navigation */}
        <Sticky order={1}>
          <StickySectionLinks
            links={[
              { href: '#intro', label: 'Introduction' },
              { href: '#about', label: 'About' },
              { href: '#services', label: 'Services' },
              { href: '#contact', label: 'Contact' }
            ]}
          />
        </Sticky>

        {/* Hero with Fade */}
        <FadeOnScroll
          startPosition={0}
          peakPosition={40}
          startOpacity={0.3}
          peakOpacity={1}
        >
          <StickySection id="intro">
            <h2>Welcome</h2>
            <p>Scroll to explore</p>
          </StickySection>
        </FadeOnScroll>

        {/* Regular Sections */}
        <StickySection id="about">
          <h2>About Us</h2>
          <p>Learn more about what we do</p>
        </StickySection>

        <StickySection id="services">
          <h2>Our Services</h2>
          <p>Discover our offerings</p>
        </StickySection>

        <StickySection id="contact">
          <h2>Get in Touch</h2>
          <p>Contact us today</p>
        </StickySection>
      </StickyProvider>
    </ScrollProvider>
  )
}

export default App
```

## Advanced Usage

### Custom Link Rendering

```tsx
<StickySectionLinks
  links={links}
  renderLink={(link, isActive, onClick) => (
    <CustomLink
      href={link.href}
      onClick={onClick}
      className={isActive ? 'active' : ''}
    >
      <span>{link.label}</span>
    </CustomLink>
  )}
/>
```

### Multiple Sticky Elements

```tsx
<StickyProvider>
  <Sticky order={0}>
    <TopNav />
  </Sticky>

  <Sticky order={1}>
    <Breadcrumbs />
  </Sticky>

  <Sticky order={2}>
    <StickySectionLinks links={links} />
  </Sticky>

  <StickySection id="content">
    <Content />
  </StickySection>
</StickyProvider>
```

### Dynamic Fade Effects

```tsx
function DynamicFade() {
  const [config, setConfig] = useState({
    startPosition: 20,
    peakPosition: 50,
    startOpacity: 0,
    peakOpacity: 1
  })

  return (
    <FadeOnScroll {...config}>
      <Content />
    </FadeOnScroll>
  )
}
```

## Performance Tips

1. **Use ScrollProvider** - Always wrap your app in `<ScrollProvider>` for optimal performance
2. **Limit Sticky Elements** - Keep the number of sticky elements reasonable (< 5)
3. **Optimize Fade Elements** - Avoid fading large or complex components
4. **Use Passive Listeners** - The package uses passive listeners by default for best scroll performance

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires IntersectionObserver support
- Polyfill recommended for older browsers

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  StickySectionLink,
  StickySectionLinksProps,
  StickySectionProps,
  StickyProps,
  FadeOnScrollProps,
  ScrollContextValue,
  StickyContextValue
} from 'nice-react-scroll'
```

## License

MIT © Mohammed Ibrahim

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
