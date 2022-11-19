import {
  CopyrightCircleOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import styled from "styled-components";
import { RouteLink } from "./Navigation/RouteLink";
import { LogoOne } from "./ui-kit/Logo";

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => `${theme.space[5]}`}
    ${({ theme }) => `${theme.space[5]}`} ${({ theme }) => `${theme.space[2]}`};
  position: absolute;
  top: 100%;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[0]};

  a {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: ${({ theme }) => `calc(${theme.fontSizes[0]}/ 1.2)`};
  line-height: 1;
`;

const FooterTop = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => `${theme.space[6]}`};

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 2fr 2fr;
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 2fr;
  }
`;

const BusinessInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const LetterSpacedText = styled.p`
  margin: 0;
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  font-size: ${({ theme, fs }) =>
    `calc(${fs ? fs : theme.fontSizes[0]} / 1.1)`};
  text-transform: ${({ textTransform }) =>
    textTransform ? textTransform : "capitalize"};
  letter-spacing: 1px;
`;

export const BusinessWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  justify-content: space-between;
  margin-top: ${({ theme }) => `${theme.space[4]}`};
  gap: ${({ theme }) => `${theme.space[4]}`};
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
  font-size: ${({ theme }) => `calc(${theme.fontSizes[1]}/ 1.2)`};
`;

export const Footer = () => {
  const date = new Date();
  return (
    <FooterWrapper>
      <FooterTop>
        <BusinessInfo>
          <RouteLink activeClassName="active" href="/">
            <a>
              <LogoOne size={7} />
            </a>
          </RouteLink>
          <BusinessWrapper>
            <Hoursblock>
              <LetterSpacedText>Our Hours:</LetterSpacedText>
              <Card>
                <TimeSpanElement>
                  <LetterSpacedText>Monday - Friday</LetterSpacedText>
                  <LetterSpacedText>9AM to 7PM </LetterSpacedText>
                </TimeSpanElement>
                <TimeSpanElement>
                  <LetterSpacedText>Closed</LetterSpacedText>
                  <LetterSpacedText>2PM to 4PM</LetterSpacedText>
                </TimeSpanElement>
              </Card>
              <Card>
                <TimeSpanElement>
                  <LetterSpacedText>Sunday</LetterSpacedText>
                  <LetterSpacedText>9AM to 7PM</LetterSpacedText>
                </TimeSpanElement>
                <TimeSpanElement>
                  <LetterSpacedText>Saturday</LetterSpacedText>
                  <LetterSpacedText>Closed</LetterSpacedText>
                </TimeSpanElement>
              </Card>
            </Hoursblock>
          </BusinessWrapper>
          <BusinessWrapper>
            <Hoursblock>
              <LetterSpacedText>Find Us:</LetterSpacedText>
              <Card>
                <TimeSpanElement>
                  <LetterSpacedText>Address:</LetterSpacedText>
                  <LetterSpacedText style={{ textAlign: "right" }}>
                    <HomeOutlined />{" "}
                    <a
                      href="https://www.google.com/maps/dir//42.2892336,-85.4501633/@42.289234,-85.450163,11z?hl=en-US"
                      target="_blank"
                    >
                      9172 East K Ave
                      <br />
                      Galesburg MI, 49053
                    </a>
                  </LetterSpacedText>
                </TimeSpanElement>
              </Card>
              <Card>
                <TimeSpanElement>
                  <LetterSpacedText>Phone:</LetterSpacedText>
                  <LetterSpacedText>
                    <PhoneOutlined />{" "}
                    <a href="tel:269-665-4878">269-665-4878</a>
                  </LetterSpacedText>
                </TimeSpanElement>
                <TimeSpanElement>
                  <LetterSpacedText>Fax:</LetterSpacedText>
                  <LetterSpacedText>269-665-6970</LetterSpacedText>
                </TimeSpanElement>
              </Card>
            </Hoursblock>
          </BusinessWrapper>
        </BusinessInfo>
        <iframe
          width="100%"
          height="520"
          frameBorder="0"
          src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJpRxZd7uaF4gR7V1wVGncMpE&key=AIzaSyCZDOY0IiSO7q2u1PYLNN8rekYbU3-ZMm4&zoom=11"
          allowFullScreen
        />
      </FooterTop>
      <FooterBottom>
        <span>
          <CopyrightCircleOutlined /> {date.getFullYear()}&nbsp;
        </span>
        <span>
          <Copy>Gillette Kennels</Copy>. All rights reserved.
        </span>
      </FooterBottom>
    </FooterWrapper>
  );
};
