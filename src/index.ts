/**
 * nice-react-scroll - Performance-optimized scroll components for React
 *
 * @description
 * A comprehensive scroll management library with centralized scroll management,
 * sticky positioning, fade effects, and intersection observer utilities.
 * Designed to work seamlessly with the nice-react ecosystem.
 *
 * @author Nice Prototypes
 * @version 2.1.0
 * @license MIT
 */

// Main provider export
export { default as ScrollProvider, ScrollContext } from "./components/ScrollProvider"
export type {
  ScrollContextValue,
  ScrollProviderProps,
  ScrollSubscribeCallbackType,
  ScrollUnsubscribeType,
} from "./components/ScrollProvider/types"
export { default as ScrollProviderTypes } from "./components/ScrollProvider/types"

// Hooks
export { useScroll } from "./hooks/useScroll"

// Components
export {
  Sticky,
  StickyProvider,
  StickyContext,
  useStickyContext,
  StickyTypes,
} from "./components/Sticky"
export type {
  StickyProps,
  StickyContextValue,
  StickyProviderProps,
  StickyOrderType,
  StickyOnChangeType,
  StickyInstance,
} from "./components/Sticky"

export { FadeOnScroll, FadeOnScrollTypes } from "./components/FadeOnScroll"
export type {
  FadeOnScrollProps,
  FadePositionType,
  FadeOpacityType,
} from "./components/FadeOnScroll"

export {
  StickySectionLinks,
  SectionLinksTypes,
} from "./components/SectionLinks"
export type {
  StickySectionLinksProps,
  StickySectionLink,
  StickySectionLinksRenderLinkType,
  StickySectionLinksRenderWrapperType,
} from "./components/SectionLinks"

export { StickySection, StickySectionTypes } from "./components/StickySection"
export type {
  StickySectionProps,
  StickySectionElementType,
  StickySectionRenderProps,
  StickySectionRenderType,
} from "./components/StickySection"