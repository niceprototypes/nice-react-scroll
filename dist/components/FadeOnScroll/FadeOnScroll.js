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
const useScroll_1 = require("../../hooks/useScroll");
const FadeWrapper = styled_components_1.default.div `
  opacity: ${p => p.$opacity};
  transition: opacity 0.1s linear;
`;
/**
 * FadeOnScroll component with opacity animation based on scroll position
 *
 * Animates element opacity as it scrolls through the viewport.
 * Uses the centralized scroll manager for optimal performance.
 *
 * @param startPosition - Scroll progress % where fade in begins (default: 0)
 * @param peakPosition - Scroll progress % where peak opacity is reached (default: 50)
 * @param endPosition - Scroll progress % where fade out completes (default: 100)
 * @param startOpacity - Initial opacity value (default: 0)
 * @param peakOpacity - Peak opacity value (default: 1)
 * @param endOpacity - Final opacity value (default: 0)
 *
 * @example
 * ```tsx
 * <FadeOnScroll
 *   startPosition={30}
 *   peakPosition={50}
 *   startOpacity={0.1}
 *   endOpacity={0.1}
 * >
 *   <img src="background.png" />
 * </FadeOnScroll>
 * ```
 */
const FadeOnScroll = ({ children, startPosition = 0, peakPosition = 50, endPosition = 100, startOpacity = 0, peakOpacity = 1, endOpacity = 0 }) => {
    const scrollY = (0, useScroll_1.useScroll)();
    const wrapperRef = (0, react_1.useRef)(null);
    const [opacity, setOpacity] = (0, react_1.useState)(startOpacity);
    (0, react_1.useEffect)(() => {
        if (!wrapperRef.current)
            return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Calculate position as percentage: 0% when top is at bottom of screen, 100% when top is at top of screen
        const scrollProgress = ((windowHeight - rect.top) / windowHeight) * 100;
        let currentOpacity;
        if (scrollProgress < startPosition) {
            // Before start: stay at start opacity
            currentOpacity = startOpacity;
        }
        else if (scrollProgress < peakPosition) {
            // Fade in phase
            const progress = (scrollProgress - startPosition) / (peakPosition - startPosition);
            currentOpacity = startOpacity + (peakOpacity - startOpacity) * progress;
        }
        else if (scrollProgress < endPosition) {
            // Fade out phase
            const progress = (scrollProgress - peakPosition) / (endPosition - peakPosition);
            currentOpacity = peakOpacity - (peakOpacity - endOpacity) * progress;
        }
        else {
            // After end: stay at end opacity
            currentOpacity = endOpacity;
        }
        setOpacity(currentOpacity);
    }, [
        scrollY,
        startPosition,
        peakPosition,
        endPosition,
        startOpacity,
        peakOpacity,
        endOpacity
    ]);
    return (react_1.default.createElement(FadeWrapper, { ref: wrapperRef, "$opacity": opacity }, children));
};
exports.default = FadeOnScroll;
