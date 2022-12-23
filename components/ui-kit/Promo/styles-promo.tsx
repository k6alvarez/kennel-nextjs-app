import styled, { css } from "styled-components";
import { headerHt } from "../../../pages/boarding";

export const PromoFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: ${(props) => props.theme.fontSizes[2]};
  padding: 0 ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[4]};

  ul {
    display: flex;
    list-style: none;
    gap: ${({ theme }) => theme.space[3]};
    margin: 0;
  }

  a {
    color: ${(props) => props.theme.colors.textPrimary};

    &:hover {
      color: ${(props) => props.theme.colors.inputFocus};
    }
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes[0]};
  }
`;

export const PromoWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDark};

  color: ${({ theme, currentTheme }) =>
    currentTheme === "livelySoothing"
      ? theme.colors.textSecondary
      : theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[2]};
  padding-top: ${({ theme }) => theme.space[4]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  line-height: 1.2;
  min-height: calc(100vh - ${headerHt});

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
    transition: all 0.4s ease-in-out;
    color: ${({ theme, currentTheme }) =>
      currentTheme === "livelySoothing"
        ? theme.colors.textSecondary
        : currentTheme === "naturalEarth"
        ? theme.colors.textPrimary
        : theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    padding-top: ${({ theme }) => theme.space[4]};
  }
  span {
    font-size: ${({ theme }) => `calc(${theme.fontSizes[0]})`};
    padding-bottom: ${({ theme }) => theme.space[4]};
  }

  a {
    background-color: ${({ theme, currentTheme }) =>
      currentTheme === "livelySoothing"
        ? theme.colors.secondaryDark
        : currentTheme === "naturalEarth"
        ? theme.colors.primary
        : theme.colors.primaryDark};

    transform: scale(1);
    transition: all 0.4s ease-in-out;
    color: ${({ theme, currentTheme }) =>
      currentTheme === "livelySoothing"
        ? theme.colors.textSecondary
        : theme.colors.textPrimary};
    box-shadow: ${({ theme }) => theme.shadows.default};

    div > div {
      transform: scale(1);
      transition: all 0.4s ease-in-out;
      transform-origin: center;
      background-position: center;
      background-size: cover;
      width: ${({ hasLink }) => (hasLink ? "100%" : "unset")};
      height: 80vw;

      @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
        height: 25vw;
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
      color: ${({ theme, currentTheme }) =>
        currentTheme === "livelySoothing"
          ? theme.colors.white
          : theme.colors.textPrimary};

      h2 {
        color: ${({ theme, currentTheme }) =>
          currentTheme === "livelySoothing"
            ? theme.colors.white
            : theme.colors.textPrimary};
      }

      div > div {
        transform: scale(1.1);
      }
    }
  }
`;

export const PromoPics = styled.div`
  flex: ${({ flex }) => (flex ? flex : 1)};
  width: 100%;
  background-color: ${({ theme, transparent, currentTheme }) =>
    !transparent
      ? currentTheme === "livelySoothing"
        ? theme.colors.primaryDark
        : currentTheme === "naturalEarth"
        ? theme.colors.primaryDark
        : theme.colors.secondary
      : "transparent"};
  padding: 0 ${({ theme }) => theme.space[4]};
`;

export const PromoTitleWrapper = styled.div`
  width: 100%;
  float: right;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.space[4]};
  flex: 1;
`;

export const PromoText = styled.div`
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

export const promoStyles = css`
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

export const PromoTitle = styled.span`
  ${promoStyles}
`;
