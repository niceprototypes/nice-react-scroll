import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useScroll } from "../../hooks/useScroll"

const FadeWrapper = styled.div<{ $opacity: number }>`
  opacity: ${p => p.$opacity};
  transition: opacity 0.1s linear;
`

export interface FadeOnScrollProps {
  children: React.ReactNode
  startPosition?: number
  peakPosition?: number
  endPosition?: number
  startOpacity?: number
  peakOpacity?: number
  endOpacity?: number
}

/**
 * FadeOnScroll component with opacity animation based on scroll position
 *
 * Animates element opacity as it scrolls through the viewport.
 * Uses the centralized scroll manager for optimal performance.
 *
 * @param startPosition - Scroll progress % where fade in begins (default: 0)
 * @param peakPosition - Scroll progress % where peak opacity is reached (default: 50)
 * @param endPosition - Scroll progress % where fade out completes (default: 100)
 * @param startOpacity - Initial opacity value (default: 0)
 * @param peakOpacity - Peak opacity value (default: 1)
 * @param endOpacity - Final opacity value (default: 0)
 *
 * @example
 * ```tsx
 * <FadeOnScroll
 *   startPosition={30}
 *   peakPosition={50}
 *   startOpacity={0.1}
 *   endOpacity={0.1}
 * >
 *   <img src="background.png" />
 * </FadeOnScroll>
 * ```
 */
const FadeOnScroll: React.FC<FadeOnScrollProps> = ({
  children,
  startPosition = 0,
  peakPosition = 50,
  endPosition = 100,
  startOpacity = 0,
  peakOpacity = 1,
  endOpacity = 0
}) => {
  const scrollY = useScroll()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(startOpacity)

  useEffect(() => {
    if (!wrapperRef.current) return

    const rect = wrapperRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // Calculate position as percentage: 0% when top is at bottom of screen, 100% when top is at top of screen
    const scrollProgress = ((windowHeight - rect.top) / windowHeight) * 100

    let currentOpacity: number

    if (scrollProgress < startPosition) {
      // Before start: stay at start opacity
      currentOpacity = startOpacity
    } else if (scrollProgress < peakPosition) {
      // Fade in phase
      const progress =
        (scrollProgress - startPosition) / (peakPosition - startPosition)
      currentOpacity = startOpacity + (peakOpacity - startOpacity) * progress
    } else if (scrollProgress < endPosition) {
      // Fade out phase
      const progress =
        (scrollProgress - peakPosition) / (endPosition - peakPosition)
      currentOpacity = peakOpacity - (peakOpacity - endOpacity) * progress
    } else {
      // After end: stay at end opacity
      currentOpacity = endOpacity
    }

    setOpacity(currentOpacity)
  }, [
    scrollY,
    startPosition,
    peakPosition,
    endPosition,
    startOpacity,
    peakOpacity,
    endOpacity
  ])

  return (
    <FadeWrapper ref={wrapperRef} $opacity={opacity}>
      {children}
    </FadeWrapper>
  )
}

export default FadeOnScroll
