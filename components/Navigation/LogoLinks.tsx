import React from "react";
import { createGlobalStyle } from "styled-components";
import { RouteLink } from "./RouteLink";
import { SubText, CrestLogo, LogoName, BadgeStyles } from "./NavStyles";
const GlobalStyle = createGlobalStyle`
  ${BadgeStyles}
`;
export const ShieldLogo = () => {
  return (
    <>
      <GlobalStyle />
      <LogoName>
        <RouteLink activeClassName="active" href="/">
          <a>Gillette Kennels</a>
        </RouteLink>
      </LogoName>
    </>
  );
};

export const Crest = () => {
  return (
    <figure className="shield">
      <div className="shield-off">
        <div className="circles"></div>
        <div className="circles"></div>
      </div>

      <div className="shield-light">
        <div className="circles"></div>
        <div className="circles"></div>

        <RouteLink activeClassName="active" href="/">
          <a>
            <div className="rect-box">
              <CrestLogo src="/images/gk_new_crest_only.png" />
            </div>
          </a>
        </RouteLink>
      </div>

      <figcaption className="shield-caption">
        <SubText>An obedient dog, is a happy dog.</SubText>
      </figcaption>
    </figure>
  );
};
