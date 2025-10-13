import React from "react";
export interface StickySectionProps {
    id: string;
    children: React.ReactNode;
    as?: keyof JSX.IntrinsicElements;
    render?: (props: {
        id: string;
        children: React.ReactNode;
    }) => React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * StickySection component that wraps content with a semantic section element
 *
 * Provides a type-safe way to create sections with IDs for use with StickySectionLinks.
 * Ensures proper connection between navigation links and target sections.
 *
 * @param id - Required unique identifier for the section (used by StickySectionLinks)
 * @param children - Content to render inside the section
 * @param as - HTML element type to use (defaults to "section")
 * @param render - Custom render function (overrides the `as` prop)
 * @param className - Optional className for styling
 * @param style - Optional inline styles
 *
 * @example
 * ```tsx
 * // Basic usage with default section element
 * <StickySection id="about">
 *   <h2>About Us</h2>
 *   <p>Content here...</p>
 * </StickySection>
 *
 * // Using a different element type
 * <StickySection id="hero" as="div">
 *   <Hero />
 * </StickySection>
 *
 * // Using custom render function
 * <StickySection
 *   id="custom"
 *   render={({ id, children }) => (
 *     <article id={id} className="custom-wrapper">
 *       {children}
 *     </article>
 *   )}
 * >
 *   <Content />
 * </StickySection>
 * ```
 */
declare const StickySection: React.FC<StickySectionProps>;
export default StickySection;
//# sourceMappingURL=StickySection.d.ts.map