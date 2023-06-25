import React, { useContext, useState } from "react";
import { GridItems } from "../Base";
import { PromoPics } from "./styles-promo";
import { ThemePreferenceContext } from "../../../pages/_app";
import { EditablePromo } from "./EditablePromo";
import { Carousel } from "antd";
import styled from "styled-components";

interface PromosProps {
  editMode: boolean;
  promos: {
    size?: string;
    image: string;
    title?: string;
    description?: string;
    link?: string;
  }[];
  setPromos?: (promos: any) => void;
  delay?: number;
  breakMoble?: boolean;
  transparent?: boolean;
  variant?: "row" | "column";
  noMargin?: boolean;
  animate?: boolean;
  noFlexGrow?: boolean;
  sliderMode?: boolean;
  bannerMode?: boolean;
}

const Container = styled.div`
  width: ${({ maxWidth }) => (maxWidth ? "100%" : "96%")};
  max-width: ${({ maxWidth }) => (maxWidth ? "100%" : "1200px")};
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;
`;

export const Promos = ({
  transparent,
  delay = 0,
  promos = [],
  editMode = false,
  setPromos = undefined,
  variant = "row",
  noFlexGrow = false,
  sliderMode = false,
  bannerMode = false,
  animate = true,
}: PromosProps) => {
  const { currentTheme } = useContext(ThemePreferenceContext);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {sliderMode ? (
        <Container maxWidth>
          <Carousel autoplay dots={false} autoplaySpeed={5000} fade>
            {promos.map((promo, i) => (
              <EditablePromo
                delay={delay}
                promo={promo}
                updatePromo={(newPromo) => {
                  const newPromos = [...promos];
                  newPromos[i] = newPromo;
                  setPromos(newPromos);
                }}
                editMode={editMode}
                currentTheme={currentTheme}
                i={i}
                key={i}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                animate={animate}
              />
            ))}
          </Carousel>
        </Container>
      ) : (
        <Container maxWidth={bannerMode}>
          <PromoPics
            transparent={transparent}
            currentTheme={currentTheme}
            flex={noFlexGrow ? "unset" : "1"}
          >
            <GridItems variant={variant} bannerMode={bannerMode}>
              {promos.map((promo, i) => (
                <EditablePromo
                  delay={delay}
                  promo={promo}
                  updatePromo={(newPromo) => {
                    const newPromos = [...promos];
                    newPromos[i] = newPromo;
                    setPromos(newPromos);
                  }}
                  editMode={editMode}
                  currentTheme={currentTheme}
                  i={i}
                  key={i}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  bannerMode={bannerMode}
                  animate={animate}
                />
              ))}
            </GridItems>
          </PromoPics>
        </Container>
      )}
    </>
  );
};
