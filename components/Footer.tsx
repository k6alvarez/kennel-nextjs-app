import { CopyrightCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ThemePreferenceContext } from "../pages/_app";
import { BusinessHoursList } from "./Admin/BusinessHoursList";
import { getBusinessHours } from "./Admin/services";
import { RouteLink } from "./Navigation/RouteLink";
import { LogoOne } from "./ui-kit/Logo";

const FooterWrapper = styled.footer`
  position: absolute;
  top: 100%;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: ${({ theme }) => theme.space[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 2fr;
  }

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
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: end;
  /* margin-bottom: ${({ theme }) => theme.space[4]};
  gap: ${({ theme }) => theme.space[4]};
  align-items: center;
  justify-content: center; */
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
  text-align: center;
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

const Frame = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  background-color: ${({ theme }) => theme.colors.secondary};
  iframe {
    border: 0;
    max-width: 100%;
  }
`;

export const Footer = () => {
  const [businessHours, setBusinessHours] = useState([]);
  const fetchBusinessHours = async () => {
    const dates = await getBusinessHours();
    setBusinessHours(dates);
  };

  useEffect(() => {
    fetchBusinessHours();
  }, []);
  const date = new Date();
  const { currentTheme } = React.useContext(ThemePreferenceContext);
  return (
    <FooterWrapper currentTheme={currentTheme}>
      <Frame>
        <iframe
          width="100%"
          height="334"
          frameBorder="0"
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJpRxZd7uaF4gR7V1wVGncMpE&key=AIzaSyCZDOY0IiSO7q2u1PYLNN8rekYbU3-ZMm4&zoom=11"
          allowFullScreen
        />
      </Frame>
      {/* <RouteLink activeClassName="active" href="/">
          <a>
            <LogoOne size={7} crestSize={80} />
          </a>
        </RouteLink> */}
      <BusinessHoursList businessHours={businessHours} />
      {/* <Flex align="center">
          <a href="http://canineprofessionals.com/" target="_blank">
            <img
              src="https://res.cloudinary.com/dhcv2fdfq/image/upload/v1670006065/gk-app/memberiacp.gif"
              width="140"
              height="126"
            />
          </a>
          <a
            href="https://www.bbb.org/western-michigan/business-reviews/pet-training/gillette-kennels-in-galesburg-mi-8000795#sealclick"
            target="_blank"
          >
            <img
              alt="Click for the BBB Business Review of this Pet Training in Galesburg MI"
              src="https://seal-westernmichigan.bbb.org/seals/blue-seal-250-52-gillettekennels-8000795.png"
            />
          </a>
        </Flex> */}

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
