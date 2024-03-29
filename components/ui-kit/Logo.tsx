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

const LogoImages = styled.div`
  display: flex;
  position: relative;
  span:nth-child(2) {
    position: absolute !important;
    top: 6px !important;
    filter: grayscale(100%);
    left: 10px !important;
  }
`;

export const LogoOne = ({
  size,
  crestSize = 55,
}: {
  size?: number;
  crestSize?: number;
}) => {
  return (
    <Flex>
      <LogoImages>
        <Image
          width={crestSize}
          height={crestSize + 4}
          src="/images/crest.svg"
        />
        <Image
          width={crestSize - 20}
          height={crestSize - 16}
          src="/images/gk_new_crest_only.png"
          className="abs-logo-image"
        />
      </LogoImages>
      <Wrapper size={size}>
        <span>Gillette Kennels</span>
        <Slogan size={size}>
          &nbsp;&nbsp;An obedient dog, is a happy dog.
        </Slogan>
      </Wrapper>
    </Flex>
  );
};

export const LogoTwo = ({
  size,
  crestSize = 55,
}: {
  size?: number;
  crestSize?: number;
}) => {
  return (
    <Flex>
      <Image
        width={crestSize}
        height={crestSize + 4}
        src="/images/GilletteCrest.png"
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
