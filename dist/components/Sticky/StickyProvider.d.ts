import React from "react";
export interface StickyContextValue {
    registerInstance: (order: number, height: number, element: HTMLDivElement, outerElement: HTMLDivElement, originalTop: number) => void;
    unregisterInstance: (order: number) => void;
    getTotalStickyHeight: () => number;
}
export declare const StickyContext: React.Context<StickyContextValue | null>;
export declare const useStickyContext: () => StickyContextValue;
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
export declare const StickyProvider: React.FC<{
    children: React.ReactNode;
}>;
//# sourceMappingURL=StickyProvider.d.ts.map