import React from "react";
import styled from "styled-components";
import Image from "next/image";

const Wrapper = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  span:first-child {
    font-family: "Dancing_Script", cursive;
    font-size: ${({ theme }) => theme.fontSizes[2]};
    line-height: 1;

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
      display: block;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme, size }) =>
        size
          ? `calc(${theme.fontSizes[size]})`
          : `calc(${theme.fontSizes[6]}/1.12 )`};
    }
  }
`;

export const Slogan = styled.span`
  font-size: calc(${({ theme }) => theme.fontSizes[2]} / 2.5);
  font-family: "Lato", sans-serif;
  letter-spacing: 1px;
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    font-size: ${({ theme, size }) =>
      size
        ? `calc(${theme.fontSizes[size]}/2.5)`
        : `calc(${theme.fontSizes[0]}/1.325 )`};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    display: block;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoOne = ({
  size,
  crestSize = 50,
}: {
  size?: number;
  crestSize?: number;
}) => {
  return (
    <Flex>
      <Image
        width={crestSize}
        height={crestSize + 4}
        src="/images/ShieldOutline.png"
      />
      <Wrapper size={size}>
        <span>Gillette Kennels</span>
        <Slogan size={size}>
          &nbsp;&nbsp;An obedient dog, is a happy dog.
        </Slogan>
      </Wrapper>
    </Flex>
  );
};
