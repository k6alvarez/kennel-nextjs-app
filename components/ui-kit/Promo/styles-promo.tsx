import styled, { css } from "styled-components";

export const headerHt = "75px";
export const addressBarHt = "34px";
export const promoMessageHt = "236px";

export const PromoFooter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: ${(props) => props.theme.fontSizes[2]};
  padding: 0 ${(props) => props.theme.space[4]};

  ul {
    display: flex;
    list-style: none;
    gap: ${({ theme }) => theme.space[3]};
    margin: 0;
  }

  a {
    color: ${(props) => props.theme.colors.textSecondary};

    &:hover {
      color: ${(props) => props.theme.colors.inputFocus};
    }
  }

  p {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSizes[0]};
    margin: 0;
  }
`;

export const PromoWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDark};

  color: ${({ theme, currentTheme }) =>
    currentTheme === "livelySoothing"
      ? theme.colors.textSecondary
      : theme.colors.textPrimary};
  display: grid;
  grid-template-columns: 1fr;
  align-items: stretch;
  justify-content: space-between;
  gap: ${({ theme, bannerMode }) => (bannerMode ? "0" : theme.space[2])};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: 1.2;

  p {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    grid-template-columns: ${({ bannerMode }) =>
      bannerMode ? "1fr" : "1fr 1fr"};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    font-size: ${({ theme }) => theme.fontSizes[6]};
  }
`;

export const ImageZoomWrapper = styled.div`
  overflow: hidden;
`;

export const PromoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: 1px;
  flex: 1;

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
    height: 100%;

    div > div {
      transform: scale(1);
      transition: all 0.4s ease-in-out;
      transform-origin: center;
      background-position: center;
      background-size: cover;
      width: ${({ hasLink }) => (hasLink ? "100%" : "unset")};
      height: 80vw;

      @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
        height: 15vw;
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
`;

export const PromoTitleWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  padding: ${({ theme }) => theme.space[4]};
  flex: 1;
  max-width: 80%;

  p:last-child {
    margin-bottom: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    padding: ${({ theme }) => theme.space[4]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    padding: ${({ theme }) => theme.space[6]};
  }
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

  @media (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    font-size: ${({ theme }) => theme.fontSizes[7]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[5]}) {
    font-size: ${({ theme }) => theme.fontSizes[8]};
  }
`;

export const PromoTitle = styled.span`
  ${promoStyles}
`;
