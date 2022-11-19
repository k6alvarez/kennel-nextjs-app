import React from "react";
import { useSpring, config, animated } from "react-spring";
import { GridItems, GridItem } from "../Base";
import { PromoPics, PromoTextWrapper, ImageZoomWrapper } from "./styles-promo";
import Link from "next/link";

interface PromosProps {
  promos: {
    size?: string;
    image: string;
    title?: string;
    description?: string;
    link?: string;
  }[];
  delay?: number;
  breakMoble?: boolean;
  transparent?: boolean;
  variant?: "row" | "column";
}

export const Promos = ({
  transparent,
  breakMoble,
  delay = 0,
  promos = [],
  variant = "row",
}: PromosProps) => {
  return (
    <PromoPics transparent={transparent}>
      <GridItems variant={variant}>
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
            <animated.div
              key={key}
              style={{
                ...props,
                margin: "2rem 1rem",
                width: "100%",
              }}
            >
              {promo.link ? (
                <PromoTextWrapper hasLink={!!promo.link}>
                  <Link href={promo.link}>
                    <a>
                      <ImageZoomWrapper>
                        <GridItem img={promo.image} />
                      </ImageZoomWrapper>
                      <div>
                        {promo.title ? <h2>{promo.title}</h2> : null}
                        {promo.description ? (
                          <span>{promo.description}</span>
                        ) : null}
                      </div>
                    </a>
                  </Link>
                </PromoTextWrapper>
              ) : (
                <>
                  <GridItem size={promo.size} img={promo.image} />
                  {promo.title ? <h2>{promo.title}</h2> : null}
                  {promo.description ? <span>{promo.description}</span> : null}
                </>
              )}
            </animated.div>
          );
        })}
      </GridItems>
    </PromoPics>
  );
};
