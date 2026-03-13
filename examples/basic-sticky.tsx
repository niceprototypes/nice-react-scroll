/**
 * Basic Sticky Example
 *
 * This example demonstrates the basic usage of the Sticky component
 * with a simple header that sticks to the top of the page.
 */

import React from 'react'
import { ScrollProvider, StickyProvider, Sticky } from 'nice-react-scroll'
import styled from 'styled-components'

const Header = styled.header`
  background: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Content = styled.div`
  padding: 2rem;
  min-height: 200vh;
`

export default function BasicStickyExample() {
  return (
    <ScrollProvider>
      <StickyProvider>
        {/* Simple sticky header */}
        <Sticky order={0}>
          <Header>
            <h1>My Sticky Header</h1>
          </Header>
        </Sticky>

        <Content>
          <h2>Page Content</h2>
          <p>Scroll down to see the header stick to the top of the page.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        </Content>
      </StickyProvider>
    </ScrollProvider>
  )
}