import React from "react";
export interface StickySectionLink {
    href: string;
    label: string;
}
export interface StickySectionLinksProps {
    links: StickySectionLink[];
    renderLink?: (link: StickySectionLink, isActive: boolean, onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void) => React.ReactNode;
    className?: string;
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
declare const StickySectionLinks: React.FC<StickySectionLinksProps>;
export default StickySectionLinks;
//# sourceMappingURL=SectionLinks.d.ts.map