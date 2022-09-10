import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { GridItems, GridItem, GridItemTitle } from "./Base";

const StyledGridItems = styled(GridItems)`
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  padding: ${({ theme }) => `${theme.space[5]} ${theme.space[4]}`};
  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    padding: ${({ theme }) => `${theme.space[6]} ${theme.space[2]}`};
  }
`;

export const Callouts = ({ callouts = [] }) => {
  return (
    <StyledGridItems as="div">
      {callouts.map((callout) => (
        <Link href={callout.link} key={callout.title}>
          <a>
            <GridItem img={callout.image}>
              <GridItemTitle>{callout.title}</GridItemTitle>
            </GridItem>
          </a>
        </Link>
      ))}
    </StyledGridItems>
  );
};
