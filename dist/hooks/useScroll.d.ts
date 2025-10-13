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
export declare const useScroll: () => number;
//# sourceMappingURL=useScroll.d.ts.map