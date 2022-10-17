import React from "react";
import { animated, config, useSpring } from "react-spring";
import { Crest } from "../Navigation/LogoLinks";
import { Promos } from "./Promo/Promos";
import {
  PromoWrapper,
  PromoText,
  PromoTitle,
  PromoTitleWrapper,
} from "./Promo/styles-promo";

const defaultDelay = 400;

export const Promo = ({
  promos = [],
  title = null,
  description = null,
  children = undefined,
}) => {
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
    <PromoWrapper>
      <PromoText size="70vw">
        <animated.div style={{ ...props }}>
          <Crest />
        </animated.div>
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
      <Promos delay={defaultDelay * 6} promos={promos} />
    </PromoWrapper>
  );
};
