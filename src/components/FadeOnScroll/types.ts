import * as React from "react"

/**
 * Position value as percentage (0-100)
 */
export type FadePositionType = number

/**
 * Opacity value (0-1)
 */
export type FadeOpacityType = number

/**
 * Props for FadeOnScroll component
 */
export interface FadeOnScrollProps {
  children: React.ReactNode
  startPosition?: FadePositionType
  peakPosition?: FadePositionType
  endPosition?: FadePositionType
  startOpacity?: FadeOpacityType
  peakOpacity?: FadeOpacityType
  endOpacity?: FadeOpacityType
}

const FadeOnScrollTypes = {} as const

namespace FadeOnScrollTypes {
  export type Position = FadePositionType
  export type Opacity = FadeOpacityType
  export type Props = FadeOnScrollProps
}

export default FadeOnScrollTypes
