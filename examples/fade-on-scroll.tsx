/**
 * Fade on Scroll Example
 *
 * This example demonstrates various fade effects using the FadeOnScroll component.
 */

import React from 'react'
import { ScrollProvider, FadeOnScroll } from 'nice-react-scroll'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Hero = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
`

const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Card = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  background: #ddd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #666;
`

export default function FadeOnScrollExample() {
  return (
    <ScrollProvider>
      {/* Hero section with fade in */}
      <FadeOnScroll
        startPosition={0}
        peakPosition={30}
        startOpacity={0.3}
        peakOpacity={1}
      >
        <Hero>
          <div>
            <h1>Fade Effects Demo</h1>
            <p>Scroll down to see various fade animations</p>
          </div>
        </Hero>
      </FadeOnScroll>

      <Container>
        {/* Fade in example */}
        <Section>
          <FadeOnScroll
            startPosition={20}
            peakPosition={50}
            startOpacity={0}
            peakOpacity={1}
          >
            <Card>
              <h2>Fade In</h2>
              <p>This card fades in as you scroll.</p>
              <p>
                <strong>Configuration:</strong> startPosition=20, peakPosition=50
              </p>
            </Card>
          </FadeOnScroll>
        </Section>

        {/* Fade in and out example */}
        <Section>
          <FadeOnScroll
            startPosition={10}
            peakPosition={50}
            endPosition={90}
            startOpacity={0.2}
            peakOpacity={1}
            endOpacity={0.2}
          >
            <Card>
              <h2>Fade In and Out</h2>
              <p>This card fades in as it enters, then fades out as it exits.</p>
              <p>
                <strong>Configuration:</strong> Fades from 0.2 to 1 to 0.2
              </p>
            </Card>
          </FadeOnScroll>
        </Section>

        {/* Parallax-style fade for background */}
        <Section>
          <FadeOnScroll
            startPosition={0}
            peakPosition={30}
            endPosition={70}
            startOpacity={0.3}
            peakOpacity={1}
            endOpacity={0.3}
          >
            <div>
              <ImageWrapper>Background Image</ImageWrapper>
              <Card style={{ marginTop: '2rem' }}>
                <h2>Parallax-Style Fade</h2>
                <p>The image above uses a subtle fade effect for a parallax feel.</p>
              </Card>
            </div>
          </FadeOnScroll>
        </Section>

        {/* Quick fade */}
        <Section>
          <FadeOnScroll
            startPosition={30}
            peakPosition={40}
            startOpacity={0}
            peakOpacity={1}
          >
            <Card>
              <h2>Quick Fade</h2>
              <p>This card fades in quickly over a short scroll distance.</p>
              <p>
                <strong>Configuration:</strong> Only 10% scroll distance (30-40)
              </p>
            </Card>
          </FadeOnScroll>
        </Section>

        {/* Slow fade */}
        <Section>
          <FadeOnScroll
            startPosition={0}
            peakPosition={80}
            startOpacity={0}
            peakOpacity={1}
          >
            <Card>
              <h2>Slow Fade</h2>
              <p>This card fades in slowly over a long scroll distance.</p>
              <p>
                <strong>Configuration:</strong> 80% scroll distance (0-80)
              </p>
            </Card>
          </FadeOnScroll>
        </Section>
      </Container>
    </ScrollProvider>
  )
}