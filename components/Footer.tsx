import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => `${theme.space[4]}`};
  position: absolute;
  margin-top: ${({ theme }) => theme.space[4]};
  top: 100%;
  width: 100%;
`;

export const Footer = () => {
  return <FooterWrapper>Gillette Kennels</FooterWrapper>;
};
