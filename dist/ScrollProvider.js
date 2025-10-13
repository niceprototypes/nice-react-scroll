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
exports.ScrollProvider = exports.ScrollContext = void 0;
const react_1 = __importStar(require("react"));
exports.ScrollContext = (0, react_1.createContext)(null);
/**
 * Centralized scroll management provider for nice-react-scroll
 *
 * Provides a single scroll listener with RAF batching for optimal performance.
 * All scroll-dependent components should subscribe via useScroll hook.
 *
 * @example
 * ```tsx
 * <ScrollProvider>
 *   <Sticky>Header</Sticky>
 *   <FadeOnScroll>Content</FadeOnScroll>
 * </ScrollProvider>
 * ```
 */
const ScrollProvider = ({ children }) => {
    const scrollYRef = (0, react_1.useRef)(0);
    const subscribersRef = (0, react_1.useRef)(new Set());
    const rafIdRef = (0, react_1.useRef)(null);
    const subscribe = (0, react_1.useCallback)((callback) => {
        subscribersRef.current.add(callback);
        // Immediately call with current scroll position
        callback(scrollYRef.current);
        // Return unsubscribe function
        return () => {
            subscribersRef.current.delete(callback);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        const handleScroll = () => {
            // Cancel previous RAF if it exists (throttle to one update per frame)
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
            // Schedule update for next animation frame
            rafIdRef.current = requestAnimationFrame(() => {
                scrollYRef.current = window.scrollY;
                // Notify all subscribers with updated scroll position
                subscribersRef.current.forEach(callback => {
                    callback(scrollYRef.current);
                });
                rafIdRef.current = null;
            });
        };
        // Set initial scroll position
        scrollYRef.current = window.scrollY;
        // Single scroll listener for entire app
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);
    const value = {
        scrollY: scrollYRef.current,
        subscribe
    };
    return react_1.default.createElement(exports.ScrollContext.Provider, { value: value }, children);
};
exports.ScrollProvider = ScrollProvider;
