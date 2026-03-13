/**
 * Performance Test: Scroll-based vs IntersectionObserver for Sticky Detection
 *
 * This test compares two approaches:
 * 1. Current: Calculating sticky state on every scroll event
 * 2. Proposed: Using IntersectionObserver API
 *
 * Run this test to measure CPU usage, render count, and frame rates.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'

// ============================================================================
// PERFORMANCE MONITORING UTILITIES
// ============================================================================

interface PerformanceMetrics {
  renderCount: number
  scrollEventCount: number
  averageFrameTime: number
  totalCPUTime: number
  stateChanges: number
}

const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderCount: 0,
    scrollEventCount: 0,
    averageFrameTime: 0,
    totalCPUTime: 0,
    stateChanges: 0
  })

  const frameTimesRef = useRef<number[]>([])
  const startTimeRef = useRef(performance.now())

  const incrementRenderCount = useCallback(() => {
    setMetrics(prev => ({ ...prev, renderCount: prev.renderCount + 1 }))
  }, [])

  const incrementScrollEvent = useCallback(() => {
    setMetrics(prev => ({ ...prev, scrollEventCount: prev.scrollEventCount + 1 }))
  }, [])

  const incrementStateChange = useCallback(() => {
    setMetrics(prev => ({ ...prev, stateChanges: prev.stateChanges + 1 }))
  }, [])

  const recordFrameTime = useCallback((frameTime: number) => {
    frameTimesRef.current.push(frameTime)
    if (frameTimesRef.current.length > 60) {
      frameTimesRef.current.shift()
    }

    const avg = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length
    const totalTime = performance.now() - startTimeRef.current

    setMetrics(prev => ({
      ...prev,
      averageFrameTime: avg,
      totalCPUTime: totalTime
    }))
  }, [])

  const resetMetrics = useCallback(() => {
    setMetrics({
      renderCount: 0,
      scrollEventCount: 0,
      averageFrameTime: 0,
      totalCPUTime: 0,
      stateChanges: 0
    })
    frameTimesRef.current = []
    startTimeRef.current = performance.now()
  }, [])

  return {
    metrics,
    incrementRenderCount,
    incrementScrollEvent,
    incrementStateChange,
    recordFrameTime,
    resetMetrics
  }
}

// ============================================================================
// CURRENT IMPLEMENTATION: Scroll-based Detection
// ============================================================================

interface ScrollBasedStickyProps {
  children: React.ReactNode
  onMetricsUpdate: (type: string) => void
  onStickyChange: (isSticky: boolean) => void
}

const ScrollBasedSticky: React.FC<ScrollBasedStickyProps> = ({
  children,
  onMetricsUpdate,
  onStickyChange
}) => {
  const [scrollY, setScrollY] = useState(0)
  const [isSticky, setIsSticky] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const originalTopRef = useRef(0)

  // Measure original position
  useEffect(() => {
    if (elementRef.current) {
      originalTopRef.current = elementRef.current.getBoundingClientRect().top + window.scrollY
    }
  }, [])

  // Track render count
  useEffect(() => {
    onMetricsUpdate('render')
  })

  // Scroll listener
  useEffect(() => {
    let rafId: number | null = null

    const handleScroll = () => {
      onMetricsUpdate('scroll')

      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        const startTime = performance.now()

        setScrollY(window.scrollY)

        const frameTime = performance.now() - startTime
        onMetricsUpdate('frame')

        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [onMetricsUpdate])

  // Calculate sticky state on every scroll
  useEffect(() => {
    const shouldBeSticky = scrollY > originalTopRef.current

    if (shouldBeSticky !== isSticky) {
      setIsSticky(shouldBeSticky)
      onStickyChange(shouldBeSticky)
      onMetricsUpdate('stateChange')
    }
  }, [scrollY, isSticky, onStickyChange, onMetricsUpdate])

  return (
    <div ref={elementRef} style={{ position: isSticky ? 'sticky' : 'relative', top: 0 }}>
      {children}
    </div>
  )
}

// ============================================================================
// PROPOSED IMPLEMENTATION: IntersectionObserver
// ============================================================================

interface IntersectionBasedStickyProps {
  children: React.ReactNode
  onMetricsUpdate: (type: string) => void
  onStickyChange: (isSticky: boolean) => void
}

const IntersectionBasedSticky: React.FC<IntersectionBasedStickyProps> = ({
  children,
  onMetricsUpdate,
  onStickyChange
}) => {
  const [isSticky, setIsSticky] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Track render count
  useEffect(() => {
    onMetricsUpdate('render')
  })

  // IntersectionObserver for sticky detection
  useEffect(() => {
    if (!sentinelRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const startTime = performance.now()

        const shouldBeSticky = !entry.isIntersecting

        if (shouldBeSticky !== isSticky) {
          setIsSticky(shouldBeSticky)
          onStickyChange(shouldBeSticky)
          onMetricsUpdate('stateChange')
        }

        const frameTime = performance.now() - startTime
        onMetricsUpdate('frame')
      },
      {
        threshold: [0],
        rootMargin: '0px 0px 0px 0px'
      }
    )

    observer.observe(sentinelRef.current)

    return () => {
      observer.disconnect()
    }
  }, [isSticky, onStickyChange, onMetricsUpdate])

  return (
    <>
      {/* Sentinel element to detect when sticky should activate */}
      <div ref={sentinelRef} style={{ height: '1px', marginTop: '-1px' }} />
      <div ref={elementRef} style={{ position: isSticky ? 'sticky' : 'relative', top: 0 }}>
        {children}
      </div>
    </>
  )
}

// ============================================================================
// TEST COMPONENT
// ============================================================================

const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`

const TestColumn = styled.div`
  flex: 1;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`

const Header = styled.div<{ $isSticky: boolean }>`
  background: ${p => p.$isSticky ? '#e74c3c' : '#3498db'};
  color: white;
  padding: 1rem;
  font-weight: bold;
`

const MetricsPanel = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  font-family: monospace;
  font-size: 0.875rem;
`

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.25rem 0;
`

const Content = styled.div`
  padding: 2rem;
  min-height: 300vh;
`

const Controls = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`

const Button = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 0.25rem 0;
  width: 100%;

  &:hover {
    background: #2980b9;
  }
`

export default function StickyPerformanceTest() {
  const scrollMetrics = usePerformanceMetrics()
  const intersectionMetrics = usePerformanceMetrics()

  const [scrollSticky, setScrollSticky] = useState(false)
  const [intersectionSticky, setIntersectionSticky] = useState(false)

  const handleScrollMetric = useCallback((type: string) => {
    if (type === 'render') scrollMetrics.incrementRenderCount()
    else if (type === 'scroll') scrollMetrics.incrementScrollEvent()
    else if (type === 'stateChange') scrollMetrics.incrementStateChange()
    else if (type === 'frame') scrollMetrics.recordFrameTime(performance.now())
  }, [scrollMetrics])

  const handleIntersectionMetric = useCallback((type: string) => {
    if (type === 'render') intersectionMetrics.incrementRenderCount()
    else if (type === 'scroll') intersectionMetrics.incrementScrollEvent()
    else if (type === 'stateChange') intersectionMetrics.incrementStateChange()
    else if (type === 'frame') intersectionMetrics.recordFrameTime(performance.now())
  }, [intersectionMetrics])

  const handleReset = () => {
    scrollMetrics.resetMetrics()
    intersectionMetrics.resetMetrics()
    window.scrollTo(0, 0)
  }

  const handleAutoScroll = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  return (
    <>
      <Container>
        {/* Scroll-based approach */}
        <TestColumn>
          <MetricsPanel>
            <h3 style={{ margin: '0 0 1rem 0' }}>Current: Scroll-based Detection</h3>
            <MetricRow>
              <span>Renders:</span>
              <strong>{scrollMetrics.metrics.renderCount}</strong>
            </MetricRow>
            <MetricRow>
              <span>Scroll Events:</span>
              <strong>{scrollMetrics.metrics.scrollEventCount}</strong>
            </MetricRow>
            <MetricRow>
              <span>State Changes:</span>
              <strong>{scrollMetrics.metrics.stateChanges}</strong>
            </MetricRow>
            <MetricRow>
              <span>Avg Frame Time:</span>
              <strong>{scrollMetrics.metrics.averageFrameTime.toFixed(2)}ms</strong>
            </MetricRow>
            <MetricRow>
              <span>Total CPU Time:</span>
              <strong>{scrollMetrics.metrics.totalCPUTime.toFixed(0)}ms</strong>
            </MetricRow>
          </MetricsPanel>

          <ScrollBasedSticky
            onMetricsUpdate={handleScrollMetric}
            onStickyChange={setScrollSticky}
          >
            <Header $isSticky={scrollSticky}>
              Scroll-based Sticky Header
              <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Status: {scrollSticky ? 'STICKY' : 'NORMAL'}
              </div>
            </Header>
          </ScrollBasedSticky>

          <Content>
            <h2>Test Content</h2>
            <p>Scroll down to see the sticky behavior and performance metrics.</p>
            <p>This version uses scroll events + RAF batching.</p>
          </Content>
        </TestColumn>

        {/* IntersectionObserver approach */}
        <TestColumn>
          <MetricsPanel>
            <h3 style={{ margin: '0 0 1rem 0' }}>Proposed: IntersectionObserver</h3>
            <MetricRow>
              <span>Renders:</span>
              <strong>{intersectionMetrics.metrics.renderCount}</strong>
            </MetricRow>
            <MetricRow>
              <span>Scroll Events:</span>
              <strong>{intersectionMetrics.metrics.scrollEventCount}</strong>
            </MetricRow>
            <MetricRow>
              <span>State Changes:</span>
              <strong>{intersectionMetrics.metrics.stateChanges}</strong>
            </MetricRow>
            <MetricRow>
              <span>Avg Frame Time:</span>
              <strong>{intersectionMetrics.metrics.averageFrameTime.toFixed(2)}ms</strong>
            </MetricRow>
            <MetricRow>
              <span>Total CPU Time:</span>
              <strong>{intersectionMetrics.metrics.totalCPUTime.toFixed(0)}ms</strong>
            </MetricRow>
          </MetricsPanel>

          <IntersectionBasedSticky
            onMetricsUpdate={handleIntersectionMetric}
            onStickyChange={setIntersectionSticky}
          >
            <Header $isSticky={intersectionSticky}>
              IntersectionObserver Sticky Header
              <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Status: {intersectionSticky ? 'STICKY' : 'NORMAL'}
              </div>
            </Header>
          </IntersectionBasedSticky>

          <Content>
            <h2>Test Content</h2>
            <p>Scroll down to see the sticky behavior and performance metrics.</p>
            <p>This version uses IntersectionObserver API.</p>
          </Content>
        </TestColumn>
      </Container>

      <Controls>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Test Controls</h4>
        <Button onClick={handleReset}>Reset Metrics</Button>
        <Button onClick={handleAutoScroll}>Auto Scroll</Button>
        <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#666' }}>
          Open DevTools Performance tab to record detailed metrics
        </div>
      </Controls>
    </>
  )
}