import React, { ReactNode } from "react";
import Header from "./Header";
import styled from "styled-components";

const PageWrapper = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};

  h1 {
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin: ${({ theme }) => theme.space[3]} 0;
  }
`;

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
  <PageWrapper>
    <Header />
    <div>{children}</div>
  </PageWrapper>
);

export default Layout;
