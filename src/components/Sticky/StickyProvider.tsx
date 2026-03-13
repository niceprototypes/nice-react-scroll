import React, { createContext, useContext, useRef, useCallback } from "react"
import type {
  StickyContextValue,
  StickyProviderProps,
  StickyInstance,
} from "./types"

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
 * Calculates and provides the sticky top offset for each element based on stacking order.
 * Uses native CSS position: sticky for better performance.
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
const StickyProvider: React.FC<StickyProviderProps> = ({ children }) => {
  const instancesRef = useRef<StickyInstance[]>([])

  const updatePositions = useCallback(() => {
    let cumulativeOffset = 0
    instancesRef.current.forEach(instance => {
      instance.stickyTop = cumulativeOffset
      cumulativeOffset += instance.height
    })
  }, [])

  const registerInstance = useCallback(
    (order: number, height: number): number => {
      // Remove any existing instance with this order
      const filtered = instancesRef.current.filter(i => i.order !== order)

      // Add new instance and sort by order
      instancesRef.current = [
        ...filtered,
        {
          order,
          height,
          stickyTop: 0,
        },
      ].sort((a, b) => a.order - b.order)

      // Recalculate all positions
      updatePositions()

      // Return the sticky top offset for this element
      const instance = instancesRef.current.find(i => i.order === order)
      return instance?.stickyTop ?? 0
    },
    [updatePositions]
  )

  const unregisterInstance = useCallback(
    (order: number) => {
      instancesRef.current = instancesRef.current.filter(i => i.order !== order)
      updatePositions()
    },
    [updatePositions]
  )

  const getStickyTop = useCallback((order: number): number => {
    const instance = instancesRef.current.find(i => i.order === order)
    return instance?.stickyTop ?? 0
  }, [])

  const getTotalStickyHeight = useCallback((): number => {
    return instancesRef.current.reduce(
      (total, instance) => total + instance.height,
      0
    )
  }, [])

  return (
    <StickyContext.Provider
      value={{
        registerInstance,
        unregisterInstance,
        getStickyTop,
        getTotalStickyHeight,
      }}
    >
      {children}
    </StickyContext.Provider>
  )
}

export default StickyProvider