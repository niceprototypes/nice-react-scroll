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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickyProvider = exports.useStickyContext = exports.StickyContext = void 0;
const react_1 = __importStar(require("react"));
const useScroll_1 = require("../../hooks/useScroll");
exports.StickyContext = (0, react_1.createContext)(null);
const useStickyContext = () => {
    const context = (0, react_1.useContext)(exports.StickyContext);
    if (!context) {
        throw new Error("Sticky components must be used within StickyProvider");
    }
    return context;
};
exports.useStickyContext = useStickyContext;
/**
 * Provider for managing multiple sticky elements with stacking support
 *
 * Uses the centralized scroll manager from ScrollProvider for performance.
 * Handles positioning, stacking order, and visual effects for sticky elements.
 *
 * @example
 * ```tsx
 * <ScrollProvider>
 *   <StickyProvider>
 *     <Sticky order={0}>Header</Sticky>
 *     <Sticky order={1}>Subheader</Sticky>
 *   </StickyProvider>
 * </ScrollProvider>
 * ```
 */
const StickyProvider = ({ children }) => {
    const scrollY = (0, useScroll_1.useScroll)();
    const instancesRef = (0, react_1.useRef)([]);
    const updatePositions = (0, react_1.useCallback)(() => {
        let cumulativeOffset = 0;
        instancesRef.current.forEach(instance => {
            instance.stickyTop = cumulativeOffset;
            cumulativeOffset += instance.height;
        });
    }, []);
    const handleScroll = (0, react_1.useCallback)((scrollY) => {
        instancesRef.current.forEach(instance => {
            // If originalTop is 0, always keep it fixed
            const shouldBeFixed = instance.originalTop === 0 ||
                scrollY >= instance.originalTop - instance.stickyTop;
            if (shouldBeFixed) {
                instance.element.style.position = "fixed";
                instance.element.style.top = `${instance.stickyTop}px`;
                instance.element.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }
            else {
                instance.element.style.position = "absolute";
                instance.element.style.top = "0";
                instance.element.style.boxShadow = "none";
            }
        });
    }, []);
    const registerInstance = (0, react_1.useCallback)((order, height, element, outerElement, originalTop) => {
        const filtered = instancesRef.current.filter(i => i.order !== order);
        instancesRef.current = [
            ...filtered,
            {
                order,
                height,
                element,
                outerElement,
                originalTop,
                stickyTop: 0
            }
        ].sort((a, b) => a.order - b.order);
        // Set the hardcoded height on the outer wrapper
        outerElement.style.height = `${height}px`;
        updatePositions();
        handleScroll(window.scrollY);
    }, [updatePositions, handleScroll]);
    const unregisterInstance = (0, react_1.useCallback)((order) => {
        instancesRef.current = instancesRef.current.filter(i => i.order !== order);
        updatePositions();
    }, [updatePositions]);
    const getTotalStickyHeight = (0, react_1.useCallback)(() => {
        const currentScrollY = window.scrollY;
        let totalHeight = 0;
        instancesRef.current.forEach(instance => {
            const shouldBeFixed = instance.originalTop === 0 ||
                currentScrollY >= instance.originalTop - instance.stickyTop;
            if (shouldBeFixed) {
                totalHeight += instance.height;
            }
        });
        return totalHeight;
    }, []);
    // Subscribe to scroll updates
    (0, react_1.useEffect)(() => {
        handleScroll(scrollY);
    }, [scrollY, handleScroll]);
    return (react_1.default.createElement(exports.StickyContext.Provider, { value: { registerInstance, unregisterInstance, getTotalStickyHeight } }, children));
};
exports.StickyProvider = StickyProvider;
