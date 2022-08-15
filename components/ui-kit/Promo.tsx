import React from "react";
import styled from "styled-components";
import { GridItem, GridItems } from "./Base";

const PromoWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes[4]};
  line-height: 1.2;

  p {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }
`;

const PromoPics = styled.div`
  flex-grow: 1;
`;

const PromoText = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    width: 100%;
    text-align: center;
    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      width: ${({ size }) => (size ? size : "100%")};
    }
  }
`;

const PromoTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes[6]};
  letter-spacing: 1px;
  line-height: 1;
`;

export const Promo = () => {
  return (
    <PromoWrapper>
      <PromoText size="70vw">
        <p>
          At <PromoTitle>Gillette Kennels</PromoTitle>, we offer a comfortable
          and safe place for your pets to stay while your are away!
        </p>
        <p>
          Each of our runs provide your dog with spacious, private, indoor and
          outdoor areas.
        </p>
      </PromoText>
      <PromoPics>
        <GridItems>
          <GridItem
            size="25vw"
            img="https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585006907/gk-app/gkplays.jpg"
          ></GridItem>
          <GridItem
            size="25vw"
            img="https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585005633/gk-app/gk_home.jpg"
          ></GridItem>
          <GridItem
            size="25vw"
            img="https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585005125/gk-app/gk_home_01.jpg"
          ></GridItem>
        </GridItems>
      </PromoPics>
    </PromoWrapper>
  );
};
