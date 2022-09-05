import React from "react";
import styled from "styled-components";
import { GridItems, GridItem } from "./Base";

const StyledGrids = styled(GridItems)`
  justify-content: space-between;
`;

const Callout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Callouts = () => {
  return (
    <StyledGrids as="div">
      <Callout>
        <p>Vaccinatons</p>
        <GridItem
          as="div"
          size="23vw"
          img="https://res.cloudinary.com/dhcv2fdfq/image/upload/c_scale,h_450/v1585006544/gk-app/gktwopups.jpg"
        ></GridItem>
      </Callout>
      <Callout>
        <p>We board cats!</p>
        <GridItem
          as="div"
          size="23vw"
          img="https://res.cloudinary.com/dhcv2fdfq/image/upload/c_scale,h_450/v1585006782/gk-app/catsgk.jpg"
        ></GridItem>
      </Callout>
      <Callout>
        <p>Before you board</p>
        <GridItem
          as="div"
          size="23vw"
          img="https://res.cloudinary.com/dhcv2fdfq/image/upload/c_scale,h_450/v1585007798/gk-app/sierragk.jpg"
        ></GridItem>
      </Callout>
    </StyledGrids>
  );
};
