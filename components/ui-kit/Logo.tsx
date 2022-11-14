import React from "react";
import styled from "styled-components";

const Wrapper = styled.span`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-family: "Dancing_Script", cursive;
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }
`;

const Slogan = styled.span`
  font-size: ${({ theme }) => `calc(${theme.fontSizes[0]}/1.5)`};
  font-family: "Lato", sans-serif;
  letter-spacing: 1px;
`;

export const LogoOne = () => {
  return (
    <Wrapper>
      <span>Gillette Kennels</span>
      <span></span>
      <Slogan>An obedient dog, is a happy dog.</Slogan>
    </Wrapper>
  );
};
