import React, { useContext, useState, useEffect } from "react"
import styled from "styled-components"
import { StickyContext } from "../Sticky/StickyProvider"

const LinksFlex = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
`

const LinkAnchor = styled.a<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  text-decoration: none;
  height: 3rem;
  color: ${props => (props.$isActive ? "#000" : "#999")};
  cursor: ${props => (props.$isActive ? "default" : "pointer")};
  transition: color 0.2s;

  &:hover {
    color: #000;
  }
`

export interface StickySectionLink {
  href: string
  label: string
}

export interface StickySectionLinksProps {
  links: StickySectionLink[]
  renderLink?: (
    link: StickySectionLink,
    isActive: boolean,
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
  ) => React.ReactNode
  className?: string
}

/**
 * StickySectionLinks component with smooth scroll and active section detection
 *
 * Provides navigation links to sections with automatic highlighting of the active section.
 * Uses IntersectionObserver for efficient active section detection.
 * Implements custom smooth scroll with sticky header offset calculation.
 *
 * Works best with StickySection components for automatic ID management.
 *
 * @param links - Array of section links with href and label
 * @param renderLink - Optional custom renderer for link items
 * @param className - Optional className for the wrapper
 *
 * @example
 * ```tsx
 * <StickySectionLinks
 *   links={[
 *     { href: "#roles", label: "Our roles" },
 *     { href: "#problem", label: "The problem" }
 *   ]}
 * />
 * ```
 */
const StickySectionLinks: React.FC<StickySectionLinksProps> = ({
  links,
  renderLink,
  className
}) => {
  const stickyContext = useContext(StickyContext)
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    // Get all section elements
    const sections = links
      .map(link => {
        const hash = link.href.startsWith("#")
          ? link.href
          : link.href.substring(link.href.indexOf("#"))
        return document.querySelector(hash)
      })
      .filter(Boolean) as Element[]

    if (sections.length === 0) return

    // Calculate rootMargin to account for sticky header
    const stickyOffset = stickyContext?.getTotalStickyHeight() || 0
    const rootMargin = `-${stickyOffset}px 0px -50% 0px`

    // Create intersection observer
    const observer = new IntersectionObserver(
      entries => {
        // Find the first intersecting section
        const intersecting = entries.find(entry => entry.isIntersecting)

        if (intersecting) {
          const hash = `#${intersecting.target.id}`
          setActiveSection(hash)
        }
      },
      {
        rootMargin,
        threshold: 0
      }
    )

    // Observe all sections
    sections.forEach(section => observer.observe(section))

    // Cleanup
    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [links, stickyContext])

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()

    // Extract the hash from the href (e.g., "#roles")
    const hash = href.startsWith("#") ? href : href.substring(href.indexOf("#"))

    const targetElement = document.querySelector(hash)

    if (targetElement) {
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY
      const stickyOffset = stickyContext?.getTotalStickyHeight() || 0

      // Get the height of the SectionLinks bar itself
      const sectionLinksHeight =
        (e.currentTarget.closest("[data-sectionlinks]") as HTMLElement)
          ?.offsetHeight || 0

      const offsetPosition =
        elementPosition - stickyOffset + sectionLinksHeight + 1

      // Custom smooth scroll with faster duration (300ms)
      const startPosition = window.scrollY
      const distance = offsetPosition - startPosition
      const duration = 300
      let startTime: number | null = null

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)

        // Easing function (ease-in-out)
        const ease =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2

        window.scrollTo(0, startPosition + distance * ease)

        if (progress < 1) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }
  }

  return (
    <LinksFlex className={className} data-sectionlinks>
      {links.map((link, index) => {
        const hash = link.href.startsWith("#")
          ? link.href
          : link.href.substring(link.href.indexOf("#"))
        const isActive = activeSection === hash

        if (renderLink) {
          return (
            <React.Fragment key={index}>
              {renderLink(link, isActive, e => handleClick(e, link.href))}
            </React.Fragment>
          )
        }

        return (
          <LinkAnchor
            key={index}
            href={link.href}
            onClick={e => handleClick(e, link.href)}
            $isActive={isActive}
          >
            {link.label}
          </LinkAnchor>
        )
      })}
    </LinksFlex>
  )
}

export default StickySectionLinks
