import React from "react";
import { useSpring, config, animated } from "react-spring";
import { GridItems, GridItem } from "../Base";
import { PromoPics } from "./styles-promo";

export const Promos = ({ delay = 0, promos = [] }) => {
  return (
    <PromoPics>
      <GridItems>
        {promos.map((promo, i) => {
          const props = useSpring({
            to: { opacity: 1, transform: "translate3d(0,0,0)" },
            from: { opacity: 0, transform: "translate3d(0,100px,0)" },
            delay: delay + i * 200,
            config: config.slow,
          });
          const urlArray = promo.image.split("/");
          const key = urlArray[urlArray.length - 1].split(".")[0] + "-" + i;
          return (
            <animated.div key={key} style={props}>
              <GridItem size={promo.size} img={promo.image}></GridItem>
            </animated.div>
          );
        })}
      </GridItems>
    </PromoPics>
  );
};
