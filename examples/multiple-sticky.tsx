/**
 * Multiple Sticky Elements Example
 *
 * This example shows how to stack multiple sticky elements
 * on top of each other using the order prop.
 */

import React from 'react'
import { ScrollProvider, StickyProvider, Sticky } from 'nice-react-scroll'
import styled from 'styled-components'

const Header = styled.header`
  background: #2c3e50;
  color: white;
  padding: 1rem 2rem;
`

const SubHeader = styled.div`
  background: #34495e;
  color: white;
  padding: 0.75rem 2rem;
`

const Navigation = styled.nav`
  background: #ecf0f1;
  padding: 0.5rem 2rem;
  display: flex;
  gap: 1rem;

  a {
    color: #2c3e50;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      color: #3498db;
    }
  }
`

const Content = styled.div`
  padding: 2rem;
  min-height: 200vh;
`

export default function MultipleStickyExample() {
  return (
    <ScrollProvider>
      <StickyProvider>
        {/* First sticky - topmost */}
        <Sticky order={0}>
          <Header>
            <h1>Main Header</h1>
          </Header>
        </Sticky>

        {/* Second sticky - below header */}
        <Sticky order={1}>
          <SubHeader>
            <p>Subheader - Current Page: Home</p>
          </SubHeader>
        </Sticky>

        {/* Third sticky - below subheader */}
        <Sticky order={2}>
          <Navigation>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </Navigation>
        </Sticky>

        <Content>
          <h2>Page Content</h2>
          <p>Scroll down to see all three elements stack on top of each other.</p>
          <p>The header (order=0) appears first, followed by the subheader (order=1),
             and then the navigation (order=2).</p>
        </Content>
      </StickyProvider>
    </ScrollProvider>
  )
}