import React, { useEffect, useRef, useState } from "react"
import { useScroll } from "../../hooks/useScroll"
import { getFadeOpacity, getScrollProgress } from "./FadeOnScroll.helpers"
import { FadeWrapper } from "./FadeOnScroll.styles"
import type { FadeOnScrollProps } from "./FadeOnScroll.types"

/**
 * FadeOnScroll component with opacity animation based on scroll position
 *
 * Animates element opacity as it scrolls through the viewport.
 * Uses the centralized scroll manager and ResizeObserver for optimal performance.
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
  endOpacity = 0,
}) => {
  const scrollY = useScroll()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(startOpacity)

  // Cache element offset to reduce getBoundingClientRect calls
  const elementTopRef = useRef<number>(0)

  // Use ResizeObserver to update cached dimensions only when needed
  useEffect(() => {
    if (!wrapperRef.current) return

    const updateDimensions = () => {
      if (!wrapperRef.current) return
      elementTopRef.current =
        wrapperRef.current.getBoundingClientRect().top + window.scrollY
    }

    // Initial measurement
    updateDimensions()

    // Update on resize
    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(wrapperRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    if (!wrapperRef.current) return

    const rect = wrapperRef.current.getBoundingClientRect()
    const scrollProgress = getScrollProgress(rect.top, window.innerHeight)
    const currentOpacity = getFadeOpacity({
      scrollProgress,
      startPosition,
      peakPosition,
      endPosition,
      startOpacity,
      peakOpacity,
      endOpacity,
    })

    setOpacity(prev => {
      const delta = Math.abs(currentOpacity - prev)
      // Skip sub-perceptual updates to avoid unnecessary renders
      return delta > 0.01 ? currentOpacity : prev
    })
  }, [
    scrollY,
    startPosition,
    peakPosition,
    endPosition,
    startOpacity,
    peakOpacity,
    endOpacity,
  ])

  return (
    <FadeWrapper ref={wrapperRef} $opacity={opacity}>
      {children}
    </FadeWrapper>
  )
}

export default FadeOnScroll