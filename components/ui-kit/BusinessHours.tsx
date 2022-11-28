import { HomeOutlined, PhoneOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import styled from "styled-components";

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

export const BusinessHours = () => {
  return (
    <div>
      {" "}
      <BusinessWrapper>
        <Hoursblock>
          <LetterSpacedText fs={2} bold>
            Our Hours:
          </LetterSpacedText>
          <Card>
            <TimeSpanElement>
              <LetterSpacedText bold>Monday - Friday</LetterSpacedText>
              <LetterSpacedText bold>9AM to 7PM </LetterSpacedText>
            </TimeSpanElement>
            <TimeSpanElement>
              <LetterSpacedText bold>Closed</LetterSpacedText>
              <LetterSpacedText bold>2PM to 4PM</LetterSpacedText>
            </TimeSpanElement>
          </Card>
          <Card>
            <TimeSpanElement>
              <LetterSpacedText bold>Sunday</LetterSpacedText>
              <LetterSpacedText bold>9AM to 7PM</LetterSpacedText>
            </TimeSpanElement>
            <TimeSpanElement>
              <LetterSpacedText bold>Saturday</LetterSpacedText>
              <LetterSpacedText bold>Closed</LetterSpacedText>
            </TimeSpanElement>
          </Card>
        </Hoursblock>
      </BusinessWrapper>
      <BusinessWrapper>
        <Hoursblock>
          <LetterSpacedText fs={2} bold>
            Find Us:
          </LetterSpacedText>
          <Card>
            <TimeSpanElement>
              <LetterSpacedText bold>Address:</LetterSpacedText>
              <LetterSpacedText bold style={{ textAlign: "right" }}>
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
              <LetterSpacedText bold>Phone:</LetterSpacedText>
              <LetterSpacedText bold>
                <PhoneOutlined /> <a href="tel:269-665-4878">269-665-4878</a>
              </LetterSpacedText>
            </TimeSpanElement>
            <TimeSpanElement>
              <LetterSpacedText bold>Fax:</LetterSpacedText>
              <LetterSpacedText bold>269-665-6970</LetterSpacedText>
            </TimeSpanElement>
          </Card>
        </Hoursblock>
      </BusinessWrapper>
    </div>
  );
};
