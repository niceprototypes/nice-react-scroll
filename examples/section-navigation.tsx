/**
 * Section Navigation Example
 *
 * This example demonstrates using StickySectionLinks and StickySection
 * to create a navigation system with automatic active section detection.
 */

import React from 'react'
import {
  ScrollProvider,
  StickyProvider,
  Sticky,
  StickySectionLinks,
  StickySection
} from 'nice-react-scroll'
import styled from 'styled-components'

const Header = styled.header`
  background: #2c3e50;
  color: white;
  padding: 1rem 2rem;
`

const Nav = styled.nav`
  background: #ecf0f1;
  padding: 1rem 2rem;

  a {
    margin-right: 1.5rem;
    color: #2c3e50;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
      background: #d5dbdb;
    }

    &.active {
      background: #3498db;
      color: white;
    }
  }
`

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  border-bottom: 1px solid #ecf0f1;

  &:nth-child(odd) {
    background: #f8f9fa;
  }
`

const links = [
  { href: '#introduction', label: 'Introduction' },
  { href: '#features', label: 'Features' },
  { href: '#installation', label: 'Installation' },
  { href: '#usage', label: 'Usage' },
  { href: '#contact', label: 'Contact' }
]

export default function SectionNavigationExample() {
  return (
    <ScrollProvider>
      <StickyProvider>
        {/* Sticky header */}
        <Sticky order={0}>
          <Header>
            <h1>Documentation</h1>
          </Header>
        </Sticky>

        {/* Sticky navigation with auto-active sections */}
        <Sticky order={1}>
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

        {/* Content sections */}
        <StickySection id="introduction">
          <Section>
            <h2>Introduction</h2>
            <p>Welcome to our documentation. This example shows automatic section detection.</p>
            <p>Scroll down and watch the navigation highlight the active section.</p>
          </Section>
        </StickySection>

        <StickySection id="features">
          <Section>
            <h2>Features</h2>
            <ul>
              <li>Automatic active section detection with IntersectionObserver</li>
              <li>Smooth scroll animation</li>
              <li>Sticky offset calculation</li>
              <li>Customizable link rendering</li>
            </ul>
          </Section>
        </StickySection>

        <StickySection id="installation">
          <Section>
            <h2>Installation</h2>
            <pre>npm install nice-react-scroll</pre>
          </Section>
        </StickySection>

        <StickySection id="usage">
          <Section>
            <h2>Usage</h2>
            <p>Import the components you need and wrap your app with ScrollProvider.</p>
          </Section>
        </StickySection>

        <StickySection id="contact">
          <Section>
            <h2>Contact</h2>
            <p>Get in touch with us for support or questions.</p>
          </Section>
        </StickySection>
      </StickyProvider>
    </ScrollProvider>
  )
}