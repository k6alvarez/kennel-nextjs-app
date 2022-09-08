import React, { useState } from "react";
import { animated, config, useSpring } from "react-spring";
import { Promos } from "./Promo/Promos";
import { PromoWrapper, PromoText, PromoTitle } from "./Promo/styles-promo";

const defaultDelay = 400;

export const Promo = ({ promos = [] }) => {
  // const [flip, set] = useState(false);
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    // reset: true,
    // reverse: flip,
    delay: defaultDelay,
    config: config.molasses,
    // onRest: () => set(!flip),
  });
  const fadeInPt1 = useSpring({
    to: {
      opacity: 1,
      // transform: "translate3d(0,0,0)",
    },
    from: {
      opacity: 0,
      // transform: "translate3d(0,100px,0)",
    },
    config: config.molasses,
    delay: defaultDelay * 3,
    reset: true,
    // reverse: flip,
    // onRest: () => set(!flip),
  });

  // const fadeInPt2 = useSpring({
  //   to: {
  //     opacity: 1,
  //     // transform: "translate3d(0,0,0)",
  //   },
  //   from: {
  //     opacity: 0,
  //     // transform: "translate3d(0,100px,0)",
  //   },
  //   config: config.molasses,
  //   delay: defaultDelay * 4,
  //   reset: true,
  //   // reverse: flip,
  //   // onRest: () => set(!flip),
  // });

  return (
    <PromoWrapper>
      <PromoText size="70vw">
        <animated.div style={props}>
          <p>
            <span>
              At <PromoTitle>Gillette Kennels</PromoTitle>,
            </span>{" "}
            <animated.span style={fadeInPt1}>
              we offer a comfortable and safe place for your pets to stay while
              your are away!
            </animated.span>
          </p>
          <animated.p style={fadeInPt1}>
            Each of our runs provide your dog with spacious, private, indoor and
            outdoor areas.
          </animated.p>
        </animated.div>
      </PromoText>
      <Promos delay={defaultDelay * 6} promos={promos} />
    </PromoWrapper>
  );
};
