import * as React from "react"

/**
 * Order for sticky element stacking
 */
export type StickyOrderType = number

/**
 * Callback for sticky state changes
 */
export type StickyOnChangeType = (isSticky: boolean) => void

/**
 * Props for Sticky component
 */
export interface StickyProps {
  children: React.ReactNode
  order?: StickyOrderType
  onStickyChange?: StickyOnChangeType
}

/**
 * Internal instance tracking for StickyProvider
 */
export interface StickyInstance {
  order: number
  height: number
  stickyTop: number
}

/**
 * Context value for StickyProvider
 */
export interface StickyContextValue {
  registerInstance: (order: number, height: number) => number
  unregisterInstance: (order: number) => void
  getStickyTop: (order: number) => number
  getTotalStickyHeight: () => number
}

/**
 * Props for StickyProvider
 */
export interface StickyProviderProps {
  children: React.ReactNode
}

const StickyTypes = {} as const

namespace StickyTypes {
  export type Order = StickyOrderType
  export type OnChange = StickyOnChangeType
  export type Props = StickyProps
  export type Instance = StickyInstance
  export type Context = StickyContextValue
  export type ProviderProps = StickyProviderProps
}

export default StickyTypes
