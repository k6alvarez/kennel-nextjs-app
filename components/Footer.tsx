import {
  CopyrightCircleOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ThemePreferenceContext } from "../pages/_app";
import { BusinessHoursList } from "./Admin/BusinessHoursList";
import { getBusinessHours } from "./Admin/services";
import { RouteLink } from "./Navigation/RouteLink";
import { LogoOne } from "./ui-kit/Logo";
import Link from "next/link";
import { PromoFooter } from "./ui-kit/Promo/styles-promo";

const FooterWrapper = styled.footer`
  position: absolute;
  top: 100%;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  display: grid;
  grid-template-areas: "addressBar" "info"  "map" "bottom";

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-areas: "addressBar" "info map" "bottom bottom";
  }

  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }
`;

const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.space[4]} 0 ${({ theme }) => theme.space[6]};

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
    align-items: flex-start;
    padding: ${({ theme }) => theme.space[5]} 0;
  }
  justify-content: space-evenly;
  grid-area: info;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  font-size: ${({ theme, fs }) => `calc(${fs ? fs : theme.fontSizes[1]})`};
  text-transform: ${({ textTransform }) =>
    textTransform ? textTransform : "capitalize"};
  letter-spacing: 1px;
  text-align: center;
  line-height: 1.2;
  margin-bottom: ${({ theme }) => theme.space[3]};
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

export const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.space[4]};
  width: 100%;
  grid-area: bottom;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    justify-content: space-between;
    padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  }

  a {
    color: ${({ theme }) => theme.colors.textSecondary};
    width: max-content;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    margin: 0 ${({ theme }) => theme.space[2]};
    align-items: center;
  }
`;

export const Hoursblock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  width: 100%;

  > p {
    color: ${({ theme }) => theme.colors.textSecondary};
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
  font-size: ${({ theme }) => `calc(${theme.fontSizes[0]}/ 1.3)`};
  width: max-content;
  white-space: nowrap;
  font-weight: bold;
  margin-top: 5px;
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
    <>
      <FooterWrapper currentTheme={currentTheme}>
        <PromoFooter>
          <p>9172 East K Ave, Galesburg MI, 49053</p>
          <ul>
            <li>
              <a
                target="_blank"
                href="https://www.facebook.com/gillettekennels1/"
              >
                <FacebookOutlined />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.instagram.com/gillettekennels/"
              >
                <InstagramOutlined />
              </a>
            </li>
          </ul>
        </PromoFooter>
        <Frame>
          <iframe
            width="100%"
            height="100%"
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
          </FlexColumn>
        </FooterInfo>
        <FooterBottom>
          <RouteLink activeClassName="active" href="/">
            <a>
              <LogoOne size={3} crestSize={50} />
              <Copy>
                <span>
                  <CopyrightCircleOutlined /> {date.getFullYear()}&nbsp;
                </span>
                <span>
                  <Copy>Gillette Kennels. All rights reserved.</Copy>
                </span>
              </Copy>
            </a>
          </RouteLink>

          <Flex
            style={{
              alignItems: "center",
            }}
          >
            <a href="http://canineprofessionals.com/" target="_blank">
              <img
                src="https://res.cloudinary.com/dhcv2fdfq/image/upload/v1670006065/gk-app/memberiacp.gif"
                width={80}
              />
            </a>
            <a
              href="https://www.bbb.org/western-michigan/business-reviews/pet-training/gillette-kennels-in-galesburg-mi-8000795#sealclick"
              target="_blank"
            >
              <img
                alt="Click for the BBB Business Review of this Pet Training in Galesburg MI"
                src="https://seal-westernmichigan.bbb.org/seals/blue-seal-250-52-gillettekennels-8000795.png"
                width={200}
              />
            </a>
          </Flex>
        </FooterBottom>
      </FooterWrapper>
    </>
  );
};
