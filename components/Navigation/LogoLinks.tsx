import React from "react";
import { createGlobalStyle } from "styled-components";
import { RouteLink } from "./RouteLink";
import { LogoName, BadgeStyles } from "./NavStyles";
import { MenuOutlined } from "@ant-design/icons";
import { LogoOne, LogoTwo } from "../ui-kit/Logo";
const GlobalStyle = createGlobalStyle`
  ${BadgeStyles}
`;
export const LeftNav = ({ toggleDrawer }) => {
  return (
    <div className="leftNav">
      <GlobalStyle />

      <MenuOutlined className="mobileNav" onClick={toggleDrawer} />

      <LogoName>
        <RouteLink activeClassName="active" href="/">
          <a>
            <LogoTwo />
          </a>
        </RouteLink>
      </LogoName>
    </div>
  );
};
