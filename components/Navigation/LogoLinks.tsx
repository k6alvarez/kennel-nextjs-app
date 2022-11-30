import React from "react";
import { createGlobalStyle } from "styled-components";
import { RouteLink } from "./RouteLink";
import styled from "styled-components";
import { SubText, CrestLogo, LogoName, BadgeStyles } from "./NavStyles";
import { MenuOutlined } from "@ant-design/icons";
import { LogoOne } from "../ui-kit/Logo";
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
            <LogoOne />
          </a>
        </RouteLink>
      </LogoName>
    </div>
  );
};

const CrestVector = styled.div`
  position: relative;
`;

export const Crest = (props) => {
  return (
    <CrestVector>
      <svg viewBox="0 0 152 184" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          id="Vector"
          d="M74.9485 180.982L74.9482 180.982C29.8507 160.95 2.85503 117.686 2.85503 65.0143V19.8243L75.5684 2.56942L148.28 19.82L148.998 64.9695C148.991 117.493 121.758 160.756 76.2252 180.982L76.2249 180.982L75.5867 181.266L74.9485 180.982Z"
          fill="white"
          stroke="#8C0B3E"
          strokeWidth="5"
        />
      </svg>
      <CrestLogo src="/images/gk_new_crest_only.png" />
    </CrestVector>
  );
};
