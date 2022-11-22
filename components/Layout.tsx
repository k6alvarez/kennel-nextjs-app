import React, { ReactNode } from "react";
import Header from "./Header";
import styled from "styled-components";
import { Footer } from "./Footer";

const PageWrapper = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 400;
  position: relative;
  min-height: 100vh;

  h1 {
    font-size: ${({ theme }) => theme.fontSizes[4]};
    margin: ${({ theme }) => theme.space[3]} 0;

    button {
      margin: 0;
    }
  }

  a {
    text-decoration: none;
  }
`;

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
  <PageWrapper>
    <Header />
    <>{children}</>
    <Footer />
  </PageWrapper>
);

export default Layout;
