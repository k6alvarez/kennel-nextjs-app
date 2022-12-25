import React, { useContext } from "react";
import { useSpring, config, animated } from "react-spring";
import { GridItems, GridItem } from "../Base";
import { PromoPics, PromoTextWrapper, ImageZoomWrapper } from "./styles-promo";
import Link from "next/link";
import { ThemePreferenceContext } from "../../../pages/_app";
import { EditablePromo } from "./EditablePromo";

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
}

export const Promos = ({
  transparent,
  delay = 0,
  promos = [],
  editMode = false,
  setPromos = undefined,
  variant = "row",
  noMargin = false,
  noFlexGrow = false,
}: PromosProps) => {
  const { currentTheme } = useContext(ThemePreferenceContext);
  return (
    <PromoPics
      transparent={transparent}
      currentTheme={currentTheme}
      flex={noFlexGrow ? "unset" : "1"}
    >
      <GridItems variant={variant}>
        {promos.map((promo, i) => (
          <EditablePromo
            noMargin={noMargin}
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
          />
        ))}
      </GridItems>
    </PromoPics>
  );
};
