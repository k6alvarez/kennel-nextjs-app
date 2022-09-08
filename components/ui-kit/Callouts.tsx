import React from "react";
import styled from "styled-components";
import { GridItems, GridItem, GridItemTitle } from "./Base";

const StyledGridItems = styled(GridItems)`
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  padding: ${({ theme }) => theme.space[4]};
`;

export const Callouts = () => {
  return (
    <StyledGridItems as="div">
      <GridItem
        as="div"
        img="https://res.cloudinary.com/dhcv2fdfq/image/upload/c_scale,h_450/v1585006544/gk-app/gktwopups.jpg"
      >
        {/* <GridItemTitle>Vaccinatons</GridItemTitle> */}
      </GridItem>
      <GridItem
        as="div"
        img="https://res.cloudinary.com/dhcv2fdfq/image/upload/c_scale,h_450/v1585006782/gk-app/catsgk.jpg"
      >
        {/* <GridItemTitle>We board cats!</GridItemTitle> */}
      </GridItem>
      <GridItem
        as="div"
        img="https://res.cloudinary.com/dhcv2fdfq/image/upload/c_scale,h_450/v1585007798/gk-app/sierragk.jpg"
      >
        {/* <GridItemTitle>Before you board</GridItemTitle> */}
      </GridItem>
    </StyledGridItems>
  );
};
