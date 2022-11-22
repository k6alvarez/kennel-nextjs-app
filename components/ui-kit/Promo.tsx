import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { animated, config, useSpring } from "react-spring";
import { ThemePreferenceContext } from "../../pages/_app";
import { Crest } from "../Navigation/LogoLinks";
import { Promos } from "./Promo/Promos";
import {
  PromoWrapper,
  PromoText,
  PromoTitle,
  PromoTitleWrapper,
  PromoFooter,
} from "./Promo/styles-promo";

export const defaultDelay = 400;

export const Promo = ({
  promos = [],
  title = null,
  description = null,
  children = undefined,
  showFooter = false,
}) => {
  const { currentTheme } = useContext(ThemePreferenceContext);
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: defaultDelay,
    config: config.slow,
  });
  const fadeInPt1 = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: config.slow,
    delay: defaultDelay * 3,
    reset: true,
  });

  return (
    <PromoWrapper currentTheme={currentTheme}>
      <PromoText>
        {/* <animated.div style={{ ...props }}>
          <Crest />
        </animated.div> */}
        <animated.div style={props}>
          <PromoTitleWrapper>
            {children ? (
              children
            ) : (
              <span>
                At <PromoTitle>Gillette Kennels</PromoTitle>,{" "}
              </span>
            )}

            <animated.span style={fadeInPt1}>
              {title
                ? title
                : "we are committed to providing the best care for your pet."}
            </animated.span>
          </PromoTitleWrapper>

          <animated.div style={fadeInPt1}>
            <PromoTitleWrapper>
              {description
                ? description
                : "Each of our runs provide your dog with spacious, private, indoor and outdoor areas."}
            </PromoTitleWrapper>
          </animated.div>
        </animated.div>
      </PromoText>
      {promos.length > 0 && (
        <Promos transparent delay={defaultDelay * 4} promos={promos} noMargin />
      )}
      {showFooter && (
        <PromoFooter>
          <p>9172 East K Ave, Galesburg MI, 49053</p>
          <ul>
            <li>
              <FacebookOutlined />
            </li>
            <li>
              <InstagramOutlined />
            </li>
          </ul>
        </PromoFooter>
      )}
    </PromoWrapper>
  );
};
