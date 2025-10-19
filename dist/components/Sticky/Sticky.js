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
const StickyProvider_1 = require("./StickyProvider");
const useScroll_1 = require("../../hooks/useScroll");
const StickyOuterWrapper = styled_components_1.default.div `
  position: relative;
  width: 100%;
`;
const StickyInnerWrapper = styled_components_1.default.div `
  width: 100%;
  z-index: 1;
`;
/**
 * Sticky component with automatic stacking support
 *
 * Elements stick to the top of the viewport when scrolled to their position.
 * Multiple sticky elements stack on top of each other based on their order prop.
 *
 * @param order - Stacking order (lower numbers appear above)
 * @param onStickyChange - Callback fired when sticky state changes
 *
 * @example
 * ```tsx
 * <Sticky order={0} onStickyChange={(isSticky) => console.log(isSticky)}>
 *   <Header />
 * </Sticky>
 * ```
 */
const Sticky = ({ children, order = 0, onStickyChange }) => {
    const context = (0, react_1.useContext)(StickyProvider_1.StickyContext);
    const outerRef = (0, react_1.useRef)(null);
    const innerRef = (0, react_1.useRef)(null);
    const scrollY = (0, useScroll_1.useScroll)();
    const [isSticky, setIsSticky] = (0, react_1.useState)(false);
    const originalTopRef = (0, react_1.useRef)(0);
    const stickyTopRef = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(() => {
        if (!context || !innerRef.current || !outerRef.current)
            return;
        const element = innerRef.current;
        const outerElement = outerRef.current;
        const height = element.offsetHeight;
        // Use outer element's position to determine when to stick
        const originalTop = outerElement.getBoundingClientRect().top + window.scrollY;
        originalTopRef.current = originalTop;
        context.registerInstance(order, height, element, outerElement, originalTop);
        return () => {
            context.unregisterInstance(order);
        };
    }, [context, order]);
    // Track sticky state and call callback
    (0, react_1.useEffect)(() => {
        if (!context)
            return;
        // For simplicity, we'll assume stickyTop is 0 for now
        // In a more complete implementation, we'd calculate based on instances with lower order
        const stickyTop = 0;
        stickyTopRef.current = stickyTop;
        const shouldBeSticky = originalTopRef.current === 0 ||
            scrollY >= originalTopRef.current - stickyTopRef.current;
        if (shouldBeSticky !== isSticky) {
            setIsSticky(shouldBeSticky);
            onStickyChange === null || onStickyChange === void 0 ? void 0 : onStickyChange(shouldBeSticky);
        }
    }, [scrollY, context, isSticky, onStickyChange]);
    if (!context) {
        return children;
    }
    return (react_1.default.createElement(StickyOuterWrapper, { ref: outerRef },
        react_1.default.createElement(StickyInnerWrapper, { ref: innerRef }, children)));
};
exports.default = Sticky;
