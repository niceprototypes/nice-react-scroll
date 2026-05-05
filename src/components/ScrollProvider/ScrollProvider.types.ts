import * as React from "react"

/**
 * Callback for scroll position updates
 */
export type ScrollSubscribeCallbackType = (scrollY: number) => void

/**
 * Unsubscribe function returned by subscribe
 */
export type ScrollUnsubscribeType = () => void

/**
 * Context value for ScrollProvider
 */
export interface ScrollContextValue {
  scrollY: number
  subscribe: (callback: ScrollSubscribeCallbackType) => ScrollUnsubscribeType
}

/**
 * Props for ScrollProvider
 */
export interface ScrollProviderProps {
  children: React.ReactNode
}

const ScrollProviderTypes = {} as const

namespace ScrollProviderTypes {
  export type SubscribeCallback = ScrollSubscribeCallbackType
  export type Unsubscribe = ScrollUnsubscribeType
  export type Context = ScrollContextValue
  export type Props = ScrollProviderProps
}

export default ScrollProviderTypes
