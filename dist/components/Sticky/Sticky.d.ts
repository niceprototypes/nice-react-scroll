import React from "react";
export interface StickyProps {
    children: React.ReactNode;
    order?: number;
    onStickyChange?: (isSticky: boolean) => void;
}
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
declare const Sticky: React.FC<StickyProps>;
export default Sticky;
//# sourceMappingURL=Sticky.d.ts.map