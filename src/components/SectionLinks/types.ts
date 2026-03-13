import * as React from "react"

/**
 * Link item for StickySectionLinks
 */
export interface StickySectionLink {
  href: string
  label: string
}

/**
 * Render function for individual links
 */
export type StickySectionLinksRenderLinkType = (
  link: StickySectionLink,
  isActive: boolean
) => React.ReactNode

/**
 * Render function for wrapper
 */
export type StickySectionLinksRenderWrapperType = (
  children: React.ReactNode
) => React.ReactNode

/**
 * Props for StickySectionLinks component
 */
export interface StickySectionLinksProps {
  links: StickySectionLink[]
  renderLink?: StickySectionLinksRenderLinkType
  renderWrapper?: StickySectionLinksRenderWrapperType
  className?: string
}

const SectionLinksTypes = {} as const

namespace SectionLinksTypes {
  export type Link = StickySectionLink
  export type RenderLink = StickySectionLinksRenderLinkType
  export type RenderWrapper = StickySectionLinksRenderWrapperType
  export type Props = StickySectionLinksProps
}

export default SectionLinksTypes
