import { DateTime } from "luxon";
import React from "react";

import { calculateDeposit } from "./services";
import styled from "styled-components";
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.space[2]};
  font-size: ${(props) => props.theme.fontSizes[0]};

  p {
    display: flex;
    flex-direction: column;

    span:last-child {
      font-weight: 600;
    }
  }
`;
export const BoardingDetails = ({ pets, formState }) => {
  return (
    <>
      <Flex>
        <p>
          <span>Boarding Dates:</span>
          <span>
            {DateTime.fromISO(formState.arrivalDate.value).toFormat("DD")} to{" "}
            {DateTime.fromISO(formState.departureDate.value).toFormat("DD")}
          </span>
        </p>
        <p>
          <span>Deposit amount due:</span>
          <span>{calculateDeposit(formState.pets)}</span>
        </p>
      </Flex>
      <Flex>
        {!pets.length ? (
          <p>
            Pets being boarded will be shown here. Add a pet using the form
            below.
          </p>
        ) : (
          <p>
            Select the pets you would like to board. You can add more pets using
            the form below.
          </p>
        )}
      </Flex>
    </>
  );
};
