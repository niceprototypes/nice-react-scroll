import styled from "styled-components"

export const FadeWrapper = styled.div<{ $opacity: number }>`
  opacity: ${p => p.$opacity};
  transition: opacity 0.1s linear;
  will-change: opacity;
`