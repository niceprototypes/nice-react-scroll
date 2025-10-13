"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScroll = void 0;
const react_1 = require("react");
const ScrollProvider_1 = require("../ScrollProvider");
/**
 * Hook to subscribe to scroll updates from ScrollProvider
 *
 * Returns the current scroll Y position and automatically updates
 * when the user scrolls. All updates are RAF-batched for performance.
 *
 * @throws Error if used outside of ScrollProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const scrollY = useScroll()
 *
 *   return <div>Scrolled {scrollY}px</div>
 * }
 * ```
 */
const useScroll = () => {
    const context = (0, react_1.useContext)(ScrollProvider_1.ScrollContext);
    if (!context) {
        throw new Error("useScroll must be used within a ScrollProvider");
    }
    const [scrollY, setScrollY] = (0, react_1.useState)(context.scrollY);
    (0, react_1.useEffect)(() => {
        // Subscribe to scroll updates
        const unsubscribe = context.subscribe(setScrollY);
        // Cleanup subscription on unmount
        return unsubscribe;
    }, [context]);
    return scrollY;
};
exports.useScroll = useScroll;
