import React from "react";
import { Empty } from "antd";
import { PetCard } from "./PetCard";
import { Wrapper, StyledGridItems } from "./styles";

export const ClientPets = ({ pets }) => {
  return (
    <Wrapper>
      {pets.length === 0 && (
        <Empty description="You don't have any pets yet. Add one below." />
      )}

      <StyledGridItems>
        {pets?.map((pet, i) => (
          <PetCard
            key={`pet-${pet.id}-${i}`}
            pet={pet}
            petSelected={undefined}
          />
        ))}
      </StyledGridItems>
    </Wrapper>
  );
};
