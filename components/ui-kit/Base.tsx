import styled from "styled-components";

export const Content = styled.article`
  padding: ${({ theme }) => theme.space[4]};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "95vw")};
  margin: 0 auto;
  background-color: ${({ theme, cardWrapper }) =>
    cardWrapper ? theme.colors.secondaryDark : "inherit"};

  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    width: ${({ maxWidth }) => (maxWidth ? maxWidth : "80vw")};
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "1200px")};
  }

  h1 {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }

  .ant-card {
    margin-bottom: ${({ theme }) => theme.space[4]};
  }

  .ant-card-head-title {
    text-transform: capitalize;
  }

  .ant-card-head {
    padding: 0 ${({ theme }) => theme.space[4]};
  }
`;

export const GridItems = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  list-style: none;
  margin: ${({ theme }) => theme.space[3]} 0;
`;

export const GridItem = styled.li`
  min-width: 27vw;
  height: 27vw;
  background-image: url(${({ img }) => (img ? img : "")});
  background-color: ${({ theme }) => theme.colors.nav};
  background-size: cover;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    min-width: ${({ size }) => (size ? size : "20vw")};
    height: ${({ size }) => (size ? size : "20vw")};
  }
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
`;
