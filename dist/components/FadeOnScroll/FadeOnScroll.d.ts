import React from "react";
export interface FadeOnScrollProps {
    children: React.ReactNode;
    startPosition?: number;
    peakPosition?: number;
    endPosition?: number;
    startOpacity?: number;
    peakOpacity?: number;
    endOpacity?: number;
}
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
declare const FadeOnScroll: React.FC<FadeOnScrollProps>;
export default FadeOnScroll;
//# sourceMappingURL=FadeOnScroll.d.ts.map