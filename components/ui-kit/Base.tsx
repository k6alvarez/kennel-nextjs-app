import styled from "styled-components";
import { EditForm } from "../Forms/styles";
import { addressBarHt, headerHt, promoMessageHt } from "./Promo/styles-promo";

export const maxContentWidth = "1200px";

export const Content = styled.article`
  padding: ${({ theme }) => theme.space[6]};
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  background-color: ${({ theme, cardWrapper }) =>
    cardWrapper ? theme.colors.secondaryDark : "inherit"};

  @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
    padding: ${({ theme, cardWrapper }) =>
      cardWrapper
        ? `${theme.space[4]}`
        : `${theme.space[5]} ${theme.space[4]}`};
    width: ${({ maxWidth }) => (maxWidth ? maxWidth : "80vw")};
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : maxContentWidth)};
  }

  ${EditForm} {
    border: 1px solid
      ${({ theme, error }) =>
        error ? theme.colors.primary : theme.colors.textSecondary};
  }

  .tiptapmenuWrapper {
    position: sticky;
    top: ${({ editorStickyTop }) =>
      editorStickyTop ? editorStickyTop : headerHt};
    z-index: 1;
    background-color: ${({ theme }) => theme.colors.white};
    padding-top: ${({ theme }) => theme.space[4]};
  }

  iframe {
    display: block; /* iframes are inline by default */
    background: #000;
    border: none; /* Reset default border */
    height: 38vh; /* Viewport-relative units */
    width: 100%;

    @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
      height: 45vh; /* Viewport-relative units */
    }

    @media (min-width: ${(props) => props.theme.breakpoints[2]}) {
      height: 50vh; /* Viewport-relative units */
    }

    @media (min-width: ${(props) => props.theme.breakpoints[3]}) {
      height: 65vh; /* Viewport-relative units */
    }
  }

  h1 {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[6]};
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  h2 {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin: 2.5rem 0 0.8rem;
  }

  h4 {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[6]};
    justify-content: center;
    text-align: center;
    font-family: ${({ theme }) => theme.fonts.heading};
    letter-spacing: 1px;
    line-height: 2;
    margin: 0;
  }

  h5 {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[1]};
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space[3]};
  }

  .ant-card {
    margin-bottom: ${({ theme }) => theme.space[4]};
    font-size: ${({ theme, fs }) =>
      fs ? theme.fontSizes[fs] : theme.fontSizes[1]};
    box-shadow: ${({ theme }) => theme.shadows.light};
  }

  .ant-card-head-title {
    text-transform: capitalize;
  }

  .ant-card-head {
    padding: 0 ${({ theme }) => theme.space[4]};

    h2 {
      font-weight: normal;
    }
  }

  .ant-tabs-tab .ant-tabs-tab-btn {
    font-size: ${({ theme }) => `calc(${theme.fontSizes[0]}/1.4)`};

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
      font-size: ${({ theme }) => theme.fontSizes[0]};
    }
  }

  &&&& .ant-tabs-tab {
    @media (max-width: ${({ theme }) => theme.breakpoints[1]}) {
      padding: 0;
    }
  }

  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 0 0 22px;
  }

  .ant-tabs > .ant-tabs-nav .ant-tabs-nav-more,
  .ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-more {
    font-size: ${({ theme }) => `calc(${theme.fontSizes[0]})`};
    padding: 8px 16px;
  }

  .ant-card-body > .ant-image {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }
`;

export const GridItemText = styled.div``;

export const GridItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  gap: ${({ theme }) => theme.space[5]};

  fieldset {
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

export const GridItem = styled.div`
  position: relative;
  width: 100%;
  height: ${({ bannerMode }) =>
    bannerMode
      ? `calc(70vh - ${headerHt} - ${addressBarHt} - ${promoMessageHt})`
      : `calc(30vh)`};
  min-height: 100px;
  background-image: url(${({ img }) => (img ? img : "")});
  background-color: ${({ theme, bg }) => theme.colors[bg] || theme.colors.nav};
  background-size: cover;
  background-position: center;
  box-shadow: ${({ theme }) => theme.shadows.default};
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.text};

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    min-height: 225px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    width: 100%;
    height: ${({ bannerMode }) =>
      bannerMode ? `calc(50vh - ${headerHt} - ${addressBarHt})` : `calc(50vh)`};
    min-height: 300px;
  }
`;

export const GridItemTextOnly = styled(GridItem)`
  height: auto;
`;

export const GridItemTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[2]};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-shadow: ${({ theme }) => theme.shadows.light};
  text-align: center;
  text-transform: capitalize;
  position: absolute;
  top: 0;
  width: 100%;
  margin: 0;
`;

export const Button = styled.button`
  position: relative;
  margin-top: ${({ theme, small }) =>
    small ? theme.space[0] : theme.space[4]};
  padding: ${({ theme, small }) =>
    small
      ? `${theme.space[2]} ${theme.space[3]}`
      : `${theme.space[4]} ${theme.space[4]}`};
  font-size: ${({ theme, small }) =>
    small ? theme.fontSizes[0] : theme.fontSizes[1]};
  background-color: ${({ theme, primary }) =>
    primary ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme, primary }) =>
    primary ? theme.colors.textPrimary : theme.colors.textSecondary};
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  white-space: nowrap;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    /* background-color: ${({ theme, primary }) =>
      primary ? theme.colors.secondary : theme.colors.primary}; */
    /* color: ${({ theme, primary }) =>
      primary ? theme.colors.textSecondary : theme.colors.textPrimary}; */
    font-weight: 600;
  }

  .ant-image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export const SplitHeader = styled.h1`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[2]};
`;
