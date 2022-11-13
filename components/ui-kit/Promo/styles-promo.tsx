import styled from "styled-components";
import { GridItem } from "../Base";

export const PromoWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: 1.2;

  p {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }
`;

export const ImageZoomWrapper = styled.div`
  overflow: hidden;
`;

export const PromoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: 1px;

  h2,
  span {
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => `0 ${theme.space[4]}`};
  }

  h2 {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    padding-top: ${({ theme }) => theme.space[4]};
  }
  span {
    font-size: ${({ theme }) => theme.fontSizes[0]};
    padding-bottom: ${({ theme }) => theme.space[4]};
  }

  a {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: scale(1);
    transition: all 0.5s ease-in-out;
    color: ${({ theme }) => theme.colors.textPrimary};
    box-shadow: ${({ theme }) => theme.shadows.default};

    div > div {
      transform: scale(1);
      transition: all 0.5s ease-in-out;
      transform-origin: center;
      width: ${({ hasLink }) => (hasLink ? "100%" : "unset")};

      @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
        height: 25vh;
        background-position: center;
      }
    }

    > div {
      box-shadow: none;
    }

    &:hover {
      background-color: ${({ theme, hasLink }) =>
        hasLink ? theme.colors.primary : theme.colors.primaryDark};
      transform: scale(1.05);

      div > div {
        transform: scale(1.1);
      }
    }
  }
`;

export const PromoPics = styled.div`
  flex: 1;
  width: 100%;
  background-color: ${({ theme, transparent }) =>
    !transparent ? theme.colors.secondary : "transparent"};
`;

export const PromoTitleWrapper = styled.div`
  width: 100%;
  float: right;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space[4]};
  flex: 1;
`;

export const PromoText = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80vw;
  margin-top: ${({ theme }) => theme.space[2]};

  .shield {
    transform: scale(0.65);
    margin-bottom: -15px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

export const PromoTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes[3]};
  letter-spacing: 1px;
  line-height: 1;
  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: ${({ theme }) => theme.fontSizes[6]};
  }
`;
