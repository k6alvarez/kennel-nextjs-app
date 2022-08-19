import styled from "styled-components";

export const Fields = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 1rem);
`;
