import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => `${theme.space[4]}`};
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const Footer = () => {
  return <FooterWrapper>Gillette Kennels</FooterWrapper>;
};
