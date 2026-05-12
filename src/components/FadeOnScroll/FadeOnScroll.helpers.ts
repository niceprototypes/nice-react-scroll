import type { FadeOpacityType, FadePositionType } from "./FadeOnScroll.types"

/**
 * Element position relative to the viewport, as a percentage where 0 means
 * the element's top edge sits at the bottom of the viewport and 100 means
 * its top edge sits at the top of the viewport.
 */
export function getScrollProgress(
  elementTop: number,
  viewportHeight: number
): number {
  const distanceFromBottomOfViewport = viewportHeight - elementTop
  return (distanceFromBottomOfViewport / viewportHeight) * 100
}

export interface GetFadeOpacityArgs {
  scrollProgress: number
  startPosition: FadePositionType
  peakPosition: FadePositionType
  endPosition: FadePositionType
  startOpacity: FadeOpacityType
  peakOpacity: FadeOpacityType
  endOpacity: FadeOpacityType
}

/**
 * Opacity at a given scroll progress, piecewise-linear across four phases:
 * before start (start opacity), fade-in (start → peak), fade-out (peak → end),
 * after end (end opacity).
 */
export function getFadeOpacity({
  scrollProgress,
  startPosition,
  peakPosition,
  endPosition,
  startOpacity,
  peakOpacity,
  endOpacity,
}: GetFadeOpacityArgs): FadeOpacityType {
  const isBeforeFadeIn = scrollProgress < startPosition
  if (isBeforeFadeIn) return startOpacity

  const isFadingIn = scrollProgress < peakPosition
  if (isFadingIn) {
    const fadeInWindow = peakPosition - startPosition
    const distanceIntoFadeIn = scrollProgress - startPosition
    const fadeInProgress = distanceIntoFadeIn / fadeInWindow
    const fadeInOpacityRange = peakOpacity - startOpacity
    return startOpacity + fadeInOpacityRange * fadeInProgress
  }

  const isFadingOut = scrollProgress < endPosition
  if (isFadingOut) {
    const fadeOutWindow = endPosition - peakPosition
    const distanceIntoFadeOut = scrollProgress - peakPosition
    const fadeOutProgress = distanceIntoFadeOut / fadeOutWindow
    const fadeOutOpacityRange = peakOpacity - endOpacity
    return peakOpacity - fadeOutOpacityRange * fadeOutProgress
  }

  return endOpacity
}
