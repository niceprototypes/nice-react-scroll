import styled from "styled-components"

export const StickyWrapper = styled.div<{ $top: number; $isHidden: boolean }>`
  position: fixed;
  top: ${p => p.$top}px;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  transform: translateY(${p => (p.$isHidden ? "-100%" : "0")});
  transition: transform 0.3s ease-in-out;
  will-change: transform;
`

export const StickySpacer = styled.div<{ $height: number }>`
  height: ${p => p.$height}px;
  width: 100%;
`