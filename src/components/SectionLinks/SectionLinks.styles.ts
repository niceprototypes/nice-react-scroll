import styled from "styled-components"

export const LinksWrapper = styled.div`
  display: flex;
`

export const LinkAnchor = styled.a<{ $isActive: boolean }>`
  display: block;
  text-decoration: none;
`

export const LinkTypography = styled.span<{ $isActive: boolean }>`
  display: inline-block;
`