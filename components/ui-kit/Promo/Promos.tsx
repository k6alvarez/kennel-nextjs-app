import React from "react";
import { useSpring, config, animated } from "react-spring";
import { GridItems, GridItem } from "../Base";
import { PromoPics, PromoTextWrapper, ImageZoomWrapper } from "./styles-promo";
import Link from "next/link";

interface PromosProps {
  promos: {
    size: string;
    image: string;
    title?: string;
    description?: string;
    link?: string;
  }[];
  delay?: number;
  breakMoble?: boolean;
}

export const Promos = ({ breakMoble, delay = 0, promos = [] }: PromosProps) => {
  return (
    <PromoPics>
      <GridItems breakMobile={breakMoble || !!promos[0].link}>
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
                margin: "1rem 0 1rem 0",
              }}
            >
              {promo.link ? (
                <PromoTextWrapper hasLink={!!promo.link}>
                  <Link href={promo.link}>
                    <a>
                      <ImageZoomWrapper>
                        <GridItem size={promo.size} img={promo.image} />
                      </ImageZoomWrapper>
                      {promo.title ? <h2>{promo.title}</h2> : null}
                      {promo.description ? (
                        <span>{promo.description}</span>
                      ) : null}
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
