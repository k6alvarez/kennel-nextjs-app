import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { PET_INITIAL_STATE } from "./petFormReducer";

const Key = styled.span`
  font-size: ${(props) => props.theme.fontSizes[0]};
  text-transform: capitalize;
  font-weight: bold;
`;

const Value = styled.span`
  font-size: ${(props) => props.theme.fontSizes[0]};
  text-transform: capitalize;
`;

const Pair = styled.div`
  white-space: nowrap;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${(props) => props.theme.space[5]};
`;

export const PetInfo = ({ pet }) => {
  return (
    <Wrapper>
      {Object.keys(pet).map((key, i) => (
        <Pair key={key + "-" + i}>
          <Key>{PET_INITIAL_STATE[key].label}</Key>: <br />
          {key === "vaccinations" ? (
            <a href={pet[key]} target="_blank">
              View Vaccinations
            </a>
          ) : (
            <Value>{pet[key]}</Value>
          )}
        </Pair>
      ))}
    </Wrapper>
  );
};
