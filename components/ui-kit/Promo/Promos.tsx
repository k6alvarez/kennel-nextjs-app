import React, { useContext } from "react";
import { useSpring, config, animated } from "react-spring";
import { GridItems, GridItem } from "../Base";
import { PromoPics, PromoTextWrapper, ImageZoomWrapper } from "./styles-promo";
import Link from "next/link";
import { ThemePreferenceContext } from "../../../pages/_app";

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
  noMargin?: boolean;
}

export const Promos = ({
  transparent,
  delay = 0,
  promos = [],
  variant = "row",
  noMargin = false,
}: PromosProps) => {
  const { currentTheme } = useContext(ThemePreferenceContext);
  return (
    <PromoPics transparent={transparent} currentTheme={currentTheme}>
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
                margin: noMargin ? "2rem 0" : "2rem 1rem",
                display: noMargin ? "flex" : "initial",
                justifyContent: noMargin ? "center" : "initial",
                width: noMargin ? "100%" : "calc(100% - 2rem)",
              }}
            >
              {promo.link ? (
                <PromoTextWrapper
                  currentTheme={currentTheme}
                  hasLink={!!promo.link}
                >
                  <Link href={promo.link}>
                    <a>
                      <ImageZoomWrapper>
                        <GridItem img={promo.image} />
                      </ImageZoomWrapper>
                      <div>
                        {promo.title ? (
                          <h2 style={{ width: "100%", textAlign: "center" }}>
                            {promo.title}
                          </h2>
                        ) : null}
                        {promo.description ? (
                          <span style={{ width: "100%", textAlign: "center" }}>
                            {promo.description}
                          </span>
                        ) : null}
                      </div>
                    </a>
                  </Link>
                </PromoTextWrapper>
              ) : (
                <>
                  <GridItem size={promo.size} img={promo.image} />
                  {promo.title ? (
                    <h2 style={{ width: "100%", textAlign: "center" }}>
                      {promo.title}
                    </h2>
                  ) : null}
                  {promo.description ? (
                    <span style={{ width: "100%", textAlign: "center" }}>
                      {promo.description}
                    </span>
                  ) : null}
                </>
              )}
            </animated.div>
          );
        })}
      </GridItems>
    </PromoPics>
  );
};
