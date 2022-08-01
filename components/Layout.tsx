import React, { ReactNode } from "react";
import Header from "./Header";
import styled from "styled-components";

const PageWrapper = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
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
