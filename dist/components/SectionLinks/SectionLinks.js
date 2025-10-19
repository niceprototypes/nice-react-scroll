"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const StickyProvider_1 = require("../Sticky/StickyProvider");
const LinksWrapper = styled_components_1.default.div `
  display: flex;
`;
const LinkAnchor = styled_components_1.default.a `
  display: block;
  text-decoration: none;
`;
const Typography = styled_components_1.default.span `
  display: inline-block;
`;
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
 * @param renderLink - Optional custom renderer for link items (replaces LinkAnchor if provided)
 * @param renderWrapper - Optional custom renderer for the wrapper container (replaces LinksWrapper if provided)
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
const StickySectionLinks = ({ links, renderLink, renderWrapper, className, }) => {
    const stickyContext = (0, react_1.useContext)(StickyProvider_1.StickyContext);
    const [activeSection, setActiveSection] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        // Get all section elements
        const sections = links
            .map(link => {
            const hash = link.href.startsWith("#")
                ? link.href
                : link.href.substring(link.href.indexOf("#"));
            return document.querySelector(hash);
        })
            .filter(Boolean);
        if (sections.length === 0)
            return;
        // Calculate rootMargin to account for sticky header
        const stickyOffset = (stickyContext === null || stickyContext === void 0 ? void 0 : stickyContext.getTotalStickyHeight()) || 0;
        // Get the height of the SectionLinks bar
        const sectionLinksElement = document.querySelector("[data-sectionlinks]");
        const sectionLinksHeight = (sectionLinksElement === null || sectionLinksElement === void 0 ? void 0 : sectionLinksElement.offsetHeight) || 0;
        const rootMargin = `-${stickyOffset + sectionLinksHeight}px 0px -50% 0px`;
        // Create intersection observer
        const observer = new IntersectionObserver(entries => {
            // Find the first intersecting section
            const intersecting = entries.find(entry => entry.isIntersecting);
            if (intersecting) {
                const hash = `#${intersecting.target.id}`;
                setActiveSection(hash);
            }
        }, {
            rootMargin,
            threshold: 0,
        });
        // Observe all sections
        sections.forEach(section => observer.observe(section));
        // Cleanup
        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, [links, stickyContext]);
    const handleClick = (e, href) => {
        e.preventDefault();
        // Extract the hash from the href (e.g., "#roles")
        const hash = href.startsWith("#") ? href : href.substring(href.indexOf("#"));
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const stickyOffset = (stickyContext === null || stickyContext === void 0 ? void 0 : stickyContext.getTotalStickyHeight()) || 0;
            const offsetPosition = elementPosition - stickyOffset + 1;
            // Custom smooth scroll with faster duration (300ms)
            const startPosition = window.scrollY;
            const distance = offsetPosition - startPosition;
            const duration = 300;
            let startTime = null;
            const animation = (currentTime) => {
                if (startTime === null)
                    startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                // Easing function (ease-in-out)
                const ease = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                window.scrollTo(0, startPosition + distance * ease);
                if (progress < 1) {
                    requestAnimationFrame(animation);
                }
            };
            requestAnimationFrame(animation);
        }
    };
    const linksContent = links.map((link, index) => {
        const hash = link.href.startsWith("#")
            ? link.href
            : link.href.substring(link.href.indexOf("#"));
        const isActive = activeSection === hash;
        return (react_1.default.createElement(LinkAnchor, { key: index, href: link.href, onClick: e => handleClick(e, link.href), "$isActive": isActive }, renderLink ? (renderLink(link, isActive)) : (react_1.default.createElement(Typography, { "$isActive": isActive }, link.label))));
    });
    if (renderWrapper) {
        return react_1.default.createElement("div", { "data-sectionlinks": true }, renderWrapper(linksContent));
    }
    return (react_1.default.createElement(LinksWrapper, { className: className, "data-sectionlinks": true }, linksContent));
};
exports.default = StickySectionLinks;
