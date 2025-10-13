import React, { useContext, useEffect, useRef } from "react"
import styled from "styled-components"
import { StickyContext } from "./StickyProvider"

const StickyOuterWrapper = styled.div`
  position: relative;
  width: 100%;
`

const StickyInnerWrapper = styled.div`
  width: 100%;
  z-index: 1;
  transition: box-shadow 0.3s;
`

export interface StickyProps {
  children: React.ReactNode
  order?: number
}

/**
 * Sticky component with automatic stacking support
 *
 * Elements stick to the top of the viewport when scrolled to their position.
 * Multiple sticky elements stack on top of each other based on their order prop.
 *
 * @param order - Stacking order (lower numbers appear above)
 *
 * @example
 * ```tsx
 * <Sticky order={0}>
 *   <Header />
 * </Sticky>
 * ```
 */
const Sticky: React.FC<StickyProps> = ({ children, order = 0 }) => {
  const context = useContext(StickyContext)
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!context || !innerRef.current || !outerRef.current) return

    const element = innerRef.current
    const outerElement = outerRef.current
    const height = element.offsetHeight
    // Use outer element's position to determine when to stick
    const originalTop =
      outerElement.getBoundingClientRect().top + window.scrollY

    context.registerInstance(order, height, element, outerElement, originalTop)

    return () => {
      context.unregisterInstance(order)
    }
  }, [context, order])

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
