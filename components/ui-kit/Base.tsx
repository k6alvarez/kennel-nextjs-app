import styled from "styled-components";

export const Content = styled.article`
  padding: ${({ theme }) => theme.space[4]};

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 2rem;
    letter-spacing: 1px;
    margin: ${({ theme }) => theme.space[3]} 0;
  }
`;

export const GridItems = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  list-style: none;
  gap: ${({ theme }) => theme.space[5]};
  margin: ${({ theme }) => theme.space[3]} 0;
`;

export const GridItem = styled.li`
  min-width: 20vw;
  height: 20vw;
  background-image: url(${({ img }) => (img ? img : "")});
  background-color: ${({ theme }) => theme.colors.nav};
  background-size: cover;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    min-width: ${({ size }) => (size ? size : "20vw")};
    height: ${({ size }) => (size ? size : "20vw")};
  }
`;
