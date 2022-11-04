import styled from "styled-components";

export const Content = styled.article`
  padding: ${({ theme }) => theme.space[4]};
  max-width: 100%;
  margin: 0 auto;
  position: relative;
  background-color: ${({ theme, cardWrapper }) =>
    cardWrapper ? theme.colors.secondaryDark : "inherit"};

  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    padding: ${({ theme, cardWrapper }) =>
      cardWrapper
        ? `${theme.space[4]}`
        : `${theme.space[6]} ${theme.space[4]}`};
    width: ${({ maxWidth }) => (maxWidth ? maxWidth : "80vw")};
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "1200px")};
  }

  h1 {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }

  h2 {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }

  h3 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin: 2.5rem 0 0.8rem;
  }

  .ant-card {
    margin-bottom: ${({ theme }) => theme.space[4]};
    font-size: ${({ theme, fs }) =>
      fs ? theme.fontSizes[fs] : theme.fontSizes[1]};
  }

  .ant-card-head-title {
    text-transform: capitalize;
  }

  .ant-card-head {
    padding: 0 ${({ theme }) => theme.space[4]};
  }

  .ant-tabs-tab .ant-tabs-tab-btn {
    font-size: ${({ theme }) => `calc(${theme.fontSizes[0]}/1.4)`};

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme }) => theme.fontSizes[0]};
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
`;

export const GridItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
  margin: ${({ theme }) => theme.space[4]} 0;
  justify-content: center;
  overflow: hidden;

  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    flex-direction: ${({ breakMobile }) => (breakMobile ? "column" : "row")};
    padding: ${({ breakMobile, theme }) =>
      breakMobile ? theme.space[4] : "0"};
  }

  @media (min-width: ${(props) => props.theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

export const GridItem = styled.div`
  position: relative;
  min-width: 100px;
  width: 100%;
  height: 30vh;
  background-image: url(${({ img }) => (img ? img : "")});
  background-color: ${({ theme, bg }) => theme.colors[bg] || theme.colors.nav};
  background-size: cover;
  background-position: top center;
  box-shadow: ${({ theme }) => theme.shadows.default};
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.text};

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: ${({ size }) => (size ? size : "28vw")};
    height: ${({ size }) => (size ? size : "20vw")};
  }
`;

export const GridItemTextOnly = styled(GridItem)`
  height: auto;
`;

export const GridItemTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[2]};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  text-transform: capitalize;
  position: absolute;
  top: 0;
  width: 100%;
  margin: 0;
`;

export const Button = styled.button`
  margin-top: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  background-color: ${({ theme, primary }) =>
    primary ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme, primary }) =>
    primary ? theme.colors.textPrimary : theme.colors.textSecondary};
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 100px;

  &:disabled {
    cursor: not-allowed;
  }
`;
