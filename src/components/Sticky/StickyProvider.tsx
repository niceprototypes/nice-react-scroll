import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback
} from "react"
import { useScroll } from "../../hooks/useScroll"

interface StickyInstance {
  order: number
  height: number
  element: HTMLDivElement
  outerElement: HTMLDivElement
  originalTop: number
  stickyTop: number
}

export interface StickyContextValue {
  registerInstance: (
    order: number,
    height: number,
    element: HTMLDivElement,
    outerElement: HTMLDivElement,
    originalTop: number
  ) => void
  unregisterInstance: (order: number) => void
  getTotalStickyHeight: () => number
}

export const StickyContext = createContext<StickyContextValue | null>(null)

export const useStickyContext = () => {
  const context = useContext(StickyContext)
  if (!context) {
    throw new Error("Sticky components must be used within StickyProvider")
  }
  return context
}

/**
 * Provider for managing multiple sticky elements with stacking support
 *
 * Uses the centralized scroll manager from ScrollProvider for performance.
 * Handles positioning, stacking order, and visual effects for sticky elements.
 *
 * @example
 * ```tsx
 * <ScrollProvider>
 *   <StickyProvider>
 *     <Sticky order={0}>Header</Sticky>
 *     <Sticky order={1}>Subheader</Sticky>
 *   </StickyProvider>
 * </ScrollProvider>
 * ```
 */
export const StickyProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const scrollY = useScroll()
  const instancesRef = useRef<StickyInstance[]>([])

  const updatePositions = useCallback(() => {
    let cumulativeOffset = 0
    instancesRef.current.forEach(instance => {
      instance.stickyTop = cumulativeOffset
      cumulativeOffset += instance.height
    })
  }, [])

  const handleScroll = useCallback((scrollY: number) => {
    instancesRef.current.forEach(instance => {
      // If originalTop is 0, always keep it fixed
      const shouldBeFixed =
        instance.originalTop === 0 ||
        scrollY >= instance.originalTop - instance.stickyTop

      if (shouldBeFixed) {
        instance.element.style.position = "fixed"
        instance.element.style.top = `${instance.stickyTop}px`
      } else {
        instance.element.style.position = "absolute"
        instance.element.style.top = "0"
      }
    })
  }, [])

  const registerInstance = useCallback(
    (
      order: number,
      height: number,
      element: HTMLDivElement,
      outerElement: HTMLDivElement,
      originalTop: number
    ) => {
      const filtered = instancesRef.current.filter(i => i.order !== order)
      instancesRef.current = [
        ...filtered,
        {
          order,
          height,
          element,
          outerElement,
          originalTop,
          stickyTop: 0
        }
      ].sort((a, b) => a.order - b.order)

      // Set the hardcoded height on the outer wrapper
      outerElement.style.height = `${height}px`

      updatePositions()
      handleScroll(window.scrollY)
    },
    [updatePositions, handleScroll]
  )

  const unregisterInstance = useCallback(
    (order: number) => {
      instancesRef.current = instancesRef.current.filter(i => i.order !== order)
      updatePositions()
    },
    [updatePositions]
  )

  const getTotalStickyHeight = useCallback(() => {
    const currentScrollY = window.scrollY
    let totalHeight = 0

    instancesRef.current.forEach(instance => {
      const shouldBeFixed =
        instance.originalTop === 0 ||
        currentScrollY >= instance.originalTop - instance.stickyTop

      if (shouldBeFixed) {
        totalHeight += instance.height
      }
    })

    return totalHeight
  }, [])

  // Subscribe to scroll updates
  useEffect(() => {
    handleScroll(scrollY)
  }, [scrollY, handleScroll])

  return (
    <StickyContext.Provider
      value={{ registerInstance, unregisterInstance, getTotalStickyHeight }}
    >
      {children}
    </StickyContext.Provider>
  )
}
