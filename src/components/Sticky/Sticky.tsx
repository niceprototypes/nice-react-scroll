import React, { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { StickyContext } from "./StickyProvider"
import { useScroll } from "../../hooks/useScroll"

const StickyOuterWrapper = styled.div`
  position: relative;
  width: 100%;
`

const StickyInnerWrapper = styled.div`
  width: 100%;
  z-index: 1;
`

export interface StickyProps {
  children: React.ReactNode
  order?: number
  onStickyChange?: (isSticky: boolean) => void
}

/**
 * Sticky component with automatic stacking support
 *
 * Elements stick to the top of the viewport when scrolled to their position.
 * Multiple sticky elements stack on top of each other based on their order prop.
 *
 * @param order - Stacking order (lower numbers appear above)
 * @param onStickyChange - Callback fired when sticky state changes
 *
 * @example
 * ```tsx
 * <Sticky order={0} onStickyChange={(isSticky) => console.log(isSticky)}>
 *   <Header />
 * </Sticky>
 * ```
 */
const Sticky: React.FC<StickyProps> = ({ children, order = 0, onStickyChange }) => {
  const context = useContext(StickyContext)
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const scrollY = useScroll()
  const [isSticky, setIsSticky] = useState(false)
  const originalTopRef = useRef<number>(0)
  const stickyTopRef = useRef<number>(0)

  useEffect(() => {
    if (!context || !innerRef.current || !outerRef.current) return

    const element = innerRef.current
    const outerElement = outerRef.current
    const height = element.offsetHeight
    // Use outer element's position to determine when to stick
    const originalTop =
      outerElement.getBoundingClientRect().top + window.scrollY

    originalTopRef.current = originalTop
    context.registerInstance(order, height, element, outerElement, originalTop)

    return () => {
      context.unregisterInstance(order)
    }
  }, [context, order])

  // Track sticky state and call callback
  useEffect(() => {
    if (!context) return

    // For simplicity, we'll assume stickyTop is 0 for now
    // In a more complete implementation, we'd calculate based on instances with lower order
    const stickyTop = 0
    stickyTopRef.current = stickyTop

    const shouldBeSticky =
      originalTopRef.current === 0 ||
      scrollY >= originalTopRef.current - stickyTopRef.current

    if (shouldBeSticky !== isSticky) {
      setIsSticky(shouldBeSticky)
      onStickyChange?.(shouldBeSticky)
    }
  }, [scrollY, context, isSticky, onStickyChange])

  if (!context) {
    return children
  }

  return (
    <StickyOuterWrapper ref={outerRef}>
      <StickyInnerWrapper ref={innerRef}>{children}</StickyInnerWrapper>
    </StickyOuterWrapper>
  )
}

export default Sticky
