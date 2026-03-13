import * as React from "react"

/**
 * HTML element type for StickySection
 */
export type StickySectionElementType = keyof React.JSX.IntrinsicElements

/**
 * Render function props for StickySection
 */
export interface StickySectionRenderProps {
  id: string
  children: React.ReactNode
}

/**
 * Render function type for StickySection
 */
export type StickySectionRenderType = (
  props: StickySectionRenderProps
) => React.ReactNode

/**
 * Props for StickySection component
 */
export interface StickySectionProps {
  id: string
  children: React.ReactNode
  as?: StickySectionElementType
  render?: StickySectionRenderType
  className?: string
  style?: React.CSSProperties
}

const StickySectionTypes = {} as const

namespace StickySectionTypes {
  export type Element = StickySectionElementType
  export type RenderProps = StickySectionRenderProps
  export type Render = StickySectionRenderType
  export type Props = StickySectionProps
}

export default StickySectionTypes
