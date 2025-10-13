import React, { ReactNode } from "react";
export interface ScrollContextValue {
    scrollY: number;
    subscribe: (callback: (scrollY: number) => void) => () => void;
}
export declare const ScrollContext: React.Context<ScrollContextValue | null>;
interface ScrollProviderProps {
    children: ReactNode;
}
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
export declare const ScrollProvider: React.FC<ScrollProviderProps>;
export {};
//# sourceMappingURL=ScrollProvider.d.ts.map