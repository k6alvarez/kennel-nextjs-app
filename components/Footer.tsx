import { CopyrightCircleOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { ThemePreferenceContext } from "../pages/_app";
import { Crest } from "./Navigation/LogoLinks";
import { RouteLink } from "./Navigation/RouteLink";
import { BusinessHours } from "./ui-kit/BusinessHours";
import { LogoOne } from "./ui-kit/Logo";

const FooterWrapper = styled.footer`
  background-color: ${({ theme, currentTheme }) =>
    currentTheme === "livelySoothing"
      ? theme.colors.primaryDark
      : theme.colors.secondary};
  padding: ${({ theme }) => `${theme.space[5]}`}
    ${({ theme }) => `${theme.space[5]}`} ${({ theme }) => `${theme.space[2]}`};
  position: absolute;
  top: 100%;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[0]};

  a {
    color: ${({ theme, currentTheme }) =>
      currentTheme === "naturalEarth"
        ? theme.colors.textPrimary
        : theme.colors.textSecondary};
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.space[4]};
  gap: ${({ theme }) => theme.space[4]};
  align-items: center;
  justify-content: space-around;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${({ theme }) => `calc(${theme.fontSizes[0]}/ 1.2)`};
  line-height: 1;
`;

export const LetterSpacedText = styled.p`
  margin: 0;
  font-weight: ${({ bold }) => (bold ? 400 : 300)};
  font-size: ${({ theme, fs }) =>
    `calc(${fs ? theme.fontSizes[fs] : theme.fontSizes[0]} / 1.1)`};
  text-transform: ${({ textTransform }) =>
    textTransform ? textTransform : "capitalize"};
  letter-spacing: 1px;
`;

export const BusinessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  justify-content: space-between;

  align-items: center;
  .ant-card {
    width: 400px;
  }
`;
export const Hoursblock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  width: 100%;

  > p {
    color: ${({ theme, currentTheme }) =>
      currentTheme === "naturalEarth"
        ? theme.colors.textSecondary
        : theme.colors.textSecondary};
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const TimeSpanElement = styled.span`
  display: flex;
  flex: 1;
  justify-content: space-between;
`;

export const Copy = styled.span`
  font-family: "Dancing_Script", cursive;
  font-size: ${({ theme }) => `calc(${theme.fontSizes[1]}/ 1.3)`};

  font-weight: bold;
`;

export const Footer = () => {
  const date = new Date();
  const { currentTheme } = React.useContext(ThemePreferenceContext);
  return (
    <FooterWrapper currentTheme={currentTheme}>
      <Flex>
        <RouteLink activeClassName="active" href="/">
          <a>
            <LogoOne size={7} />
            <Crest />
          </a>
        </RouteLink>
        <BusinessHours />
      </Flex>
      <iframe
        width="100%"
        height="520"
        frameBorder="0"
        src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJpRxZd7uaF4gR7V1wVGncMpE&key=AIzaSyCZDOY0IiSO7q2u1PYLNN8rekYbU3-ZMm4&zoom=11"
        allowFullScreen
      />
      <FooterBottom>
        <span>
          <CopyrightCircleOutlined /> {date.getFullYear()}&nbsp;
        </span>
        <span>
          <Copy>Gillette Kennels. All rights reserved.</Copy>
        </span>
      </FooterBottom>
    </FooterWrapper>
  );
};
