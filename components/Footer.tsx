import { CopyrightCircleOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import { RouteLink } from "./Navigation/RouteLink";
import { LogoOne } from "./ui-kit/Logo";

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => `${theme.space[4]}`};
  position: absolute;
  top: 100%;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes[0]};

  a {
    display: inline-flex;
    width: max-content;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: ${({ theme }) => `calc(${theme.fontSizes[0]}/ 1.2)`};
  line-height: 1;
`;

export const Copy = styled.span`
  font-family: "Dancing_Script", cursive;
  font-size: ${({ theme }) => `calc(${theme.fontSizes[1]}/ 1.2)`};
`;

export const Footer = () => {
  const date = new Date();
  return (
    <FooterWrapper>
      <div>
        <RouteLink activeClassName="active" href="/">
          <a>
            <LogoOne />
          </a>
        </RouteLink>
      </div>
      <FooterBottom>
        <span>
          <CopyrightCircleOutlined /> {date.getFullYear()}&nbsp;
        </span>
        <span>
          <Copy>Gillette Kennels</Copy>. All rights reserved.
        </span>
      </FooterBottom>
    </FooterWrapper>
  );
};
