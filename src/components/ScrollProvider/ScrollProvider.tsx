import React, { createContext, useEffect, useRef, useCallback } from "react"
import type {
  ScrollContextValue,
  ScrollProviderProps,
  ScrollSubscribeCallbackType,
} from "./types"

export const ScrollContext = createContext<ScrollContextValue | null>(null)

/**
 * Centralized scroll management provider for nice-react-scroll
 *
 * Provides a single scroll listener with RAF batching for optimal performance.
 * All scroll-dependent components should subscribe via useScroll hook.
 *
 * @example
 * ```tsx
 * <ScrollProvider>
 *   <Sticky>Header</Sticky>
 *   <FadeOnScroll>Content</FadeOnScroll>
 * </ScrollProvider>
 * ```
 */
const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const scrollYRef = useRef(0)
  const subscribersRef = useRef<Set<ScrollSubscribeCallbackType>>(new Set())
  const rafIdRef = useRef<number | null>(null)

  const subscribe = useCallback((callback: ScrollSubscribeCallbackType) => {
    subscribersRef.current.add(callback)

    // Immediately call with current scroll position
    callback(scrollYRef.current)

    // Return unsubscribe function
    return () => {
      subscribersRef.current.delete(callback)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Cancel previous RAF if it exists (throttle to one update per frame)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }

      // Schedule update for next animation frame
      rafIdRef.current = requestAnimationFrame(() => {
        scrollYRef.current = window.scrollY

        // Notify all subscribers with updated scroll position
        subscribersRef.current.forEach(callback => {
          callback(scrollYRef.current)
        })

        rafIdRef.current = null
      })
    }

    // Set initial scroll position
    scrollYRef.current = window.scrollY

    // Single scroll listener for entire app
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  const value: ScrollContextValue = {
    scrollY: scrollYRef.current,
    subscribe,
  }

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  )
}

export default ScrollProvider
