"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
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
const StickySection = ({ id, children, as = "section", render, className, style }) => {
    // If render function is provided, use it
    if (render) {
        return react_1.default.createElement(react_1.default.Fragment, null, render({ id, children }));
    }
    // Otherwise use the specified element type
    const Element = as;
    return (react_1.default.createElement(Element, { id: id, className: className, style: style }, children));
};
exports.default = StickySection;
