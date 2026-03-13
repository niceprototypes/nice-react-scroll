/**
 * Complete Example
 *
 * This example combines all features: sticky elements, section navigation,
 * fade effects, and the useScroll hook.
 */

import React, { useState } from 'react'
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
  background: #1a1a2e;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ScrollIndicator = styled.div`
  font-size: 0.875rem;
  color: #16213e;
  background: #eee;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
`

const Nav = styled.nav`
  background: #0f3460;
  padding: 1rem 2rem;

  a {
    margin-right: 1.5rem;
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.active {
      background: #e94560;
    }
  }
`

const Hero = styled.div`
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;

  &:nth-child(even) {
    background: #f8f9fa;
  }
`

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

function ScrollDisplay() {
  const scrollY = useScroll()
  return <ScrollIndicator>Scroll: {scrollY}px</ScrollIndicator>
}

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Features' },
  { href: '#documentation', label: 'Documentation' },
  { href: '#contact', label: 'Contact' }
]

export default function CompleteExample() {
  const [stickyState, setStickyState] = useState<{ [key: string]: boolean }>({})

  return (
    <ScrollProvider>
      <StickyProvider>
        {/* Main header with scroll indicator */}
        <Sticky
          order={0}
          onStickyChange={(isSticky) => setStickyState(prev => ({ ...prev, header: isSticky }))}
        >
          <Header>
            <h1>Nice React Scroll</h1>
            <ScrollDisplay />
          </Header>
        </Sticky>

        {/* Navigation with active section detection */}
        <Sticky
          order={1}
          onStickyChange={(isSticky) => setStickyState(prev => ({ ...prev, nav: isSticky }))}
        >
          <Nav>
            <StickySectionLinks
              links={links}
              renderLink={(link, isActive, onClick) => (
                <a
                  href={link.href}
                  onClick={onClick}
                  className={isActive ? 'active' : ''}
                >
                  {link.label}
                </a>
              )}
            />
          </Nav>
        </Sticky>

        {/* Hero section with fade effect */}
        <FadeOnScroll
          startPosition={0}
          peakPosition={30}
          startOpacity={0.5}
          peakOpacity={1}
        >
          <StickySection id="hero">
            <Hero>
              <div>
                <h1>Welcome to Nice React Scroll</h1>
                <p>Performance-optimized scroll components for React</p>
              </div>
            </Hero>
          </StickySection>
        </FadeOnScroll>

        {/* About section */}
        <StickySection id="about">
          <Section>
            <Content>
              <FadeOnScroll
                startPosition={20}
                peakPosition={50}
                startOpacity={0}
                peakOpacity={1}
              >
                <h2>About</h2>
                <p>
                  Nice React Scroll provides a centralized scroll manager with
                  RAF-batched updates for optimal performance. Build beautiful
                  scroll-based interactions without worrying about performance.
                </p>
                <p>
                  Header sticky: {stickyState.header ? 'Yes' : 'No'} |
                  Nav sticky: {stickyState.nav ? 'Yes' : 'No'}
                </p>
              </FadeOnScroll>
            </Content>
          </Section>
        </StickySection>

        {/* Features section */}
        <StickySection id="features">
          <Section>
            <Content>
              <FadeOnScroll
                startPosition={20}
                peakPosition={50}
                startOpacity={0}
                peakOpacity={1}
              >
                <h2>Features</h2>
                <ul>
                  <li>🚀 Single RAF-batched scroll listener</li>
                  <li>📌 Sticky positioning with automatic stacking</li>
                  <li>🎯 Smart section navigation</li>
                  <li>🌊 Customizable fade effects</li>
                  <li>⚡ TypeScript support</li>
                </ul>
              </FadeOnScroll>
            </Content>
          </Section>
        </StickySection>

        {/* Documentation section */}
        <StickySection id="documentation">
          <Section>
            <Content>
              <FadeOnScroll
                startPosition={10}
                peakPosition={50}
                endPosition={90}
                startOpacity={0.2}
                peakOpacity={1}
                endOpacity={0.2}
              >
                <h2>Documentation</h2>
                <p>
                  Check out the API documentation for detailed information about
                  all components, hooks, and their props.
                </p>
                <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>
                  {`import {
  ScrollProvider,
  StickyProvider,
  Sticky,
  FadeOnScroll,
  useScroll
} from 'nice-react-scroll'`}
                </pre>
              </FadeOnScroll>
            </Content>
          </Section>
        </StickySection>

        {/* Contact section */}
        <StickySection id="contact">
          <Section>
            <Content>
              <FadeOnScroll
                startPosition={20}
                peakPosition={50}
                startOpacity={0}
                peakOpacity={1}
              >
                <h2>Contact</h2>
                <p>
                  Questions or feedback? Visit our GitHub repository to open an
                  issue or contribute to the project.
                </p>
              </FadeOnScroll>
            </Content>
          </Section>
        </StickySection>
      </StickyProvider>
    </ScrollProvider>
  )
}