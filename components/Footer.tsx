import { CopyrightCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ThemePreferenceContext } from "../pages/_app";
import { BusinessHoursList } from "./Admin/BusinessHoursList";
import { getBusinessHours } from "./Admin/services";
import { RouteLink } from "./Navigation/RouteLink";
import { LogoOne } from "./ui-kit/Logo";
import Link from "next/link";

const FooterWrapper = styled.footer`
  position: absolute;
  top: 100%;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  display: grid;
  grid-template-areas: "map" "info" "bottom";

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-areas: "map info" "bottom bottom";
  }

  a {
    color: ${({ theme, currentTheme }) =>
      currentTheme === "naturalEarth"
        ? theme.colors.textPrimary
        : theme.colors.textSecondary};
  }

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`;

const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme, currentTheme }) => {
    if (currentTheme === "naturalEarth") {
      return theme.colors.primary;
    } else {
      return theme.colors.secondary;
    }
  }};

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    flex-direction: row;
    align-items: flex-start;
  }
  padding: ${({ theme }) => theme.space[4]};
  justify-content: space-evenly;
  grid-area: info;
`;

const Flex = styled.div`
  display: flex;
  background-color: ${({ theme, currentTheme }) => {
    if (currentTheme === "naturalEarth") {
      return theme.colors.primary;
    } else {
      return theme.colors.secondary;
    }
  }};
  padding: ${({ theme }) => theme.space[4]};
  justify-content: space-evenly;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  a {
    text-align: center;
  }
`;

export const LetterSpacedText = styled.p`
  margin: 0;
  font-weight: ${({ bold }) => (bold ? 400 : 300)};
  font-size: ${({ theme, fs }) =>
    `calc(${fs ? theme.fontSizes[fs] : theme.fontSizes[1]})`};
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
  background-color: ${({ theme }) => theme.colors.secondary};
  grid-area: map;
  iframe {
    border: 0;
    max-width: 100%;
    min-height: 250px;
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
          height="100%"
          frameBorder="0"
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJpRxZd7uaF4gR7V1wVGncMpE&key=AIzaSyCZDOY0IiSO7q2u1PYLNN8rekYbU3-ZMm4&zoom=11"
          allowFullScreen
        />
      </Frame>
      <FooterInfo>
        <BusinessHoursList businessHours={businessHours} />

        <FlexColumn>
          <FlexColumn>
            <h1>Additional Info</h1>
            <Link href="/terms-and-conditions">
              <a>Terms and Conditions</a>
            </Link>
            <Link href="/privacy-policy">
              <a>Privacy Policy</a>
            </Link>
          </FlexColumn>
          <Flex
            style={{
              alignItems: "center",
            }}
          >
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
          </Flex>
          <RouteLink activeClassName="active" href="/">
            <a>
              <LogoOne size={3} crestSize={50} />
            </a>
          </RouteLink>
          <div>
            <span>
              <CopyrightCircleOutlined rev={undefined} /> {date.getFullYear()}
              &nbsp;
            </span>
            <span>
              <Copy>Gillette Kennels. All rights reserved.</Copy>
            </span>
          </div>
        </FlexColumn>
      </FooterInfo>
    </FooterWrapper>
  );
};
