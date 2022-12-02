import { Card } from "antd";
import styled from "styled-components";
import { DateTime } from "luxon";
import React from "react";
import { LetterSpacedText } from "../Footer";
import { Wrapper } from "../Pets/styles";

const StyledWrapper = styled(Wrapper)`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  .ant-card {
    width: 100%;
    min-width: 33vw;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: max-content;
    margin: ${({ center }) => (center ? "0 auto" : "unset")};
  }
`;

export const BusinessHoursList = ({ businessHours, center }) => {
  if (!businessHours || businessHours.length === 0) {
    return null;
  }
  return (
    <StyledWrapper center={center}>
      <Card>
        {businessHours?.map((hourObj) => (
          <div key={hourObj.id}>
            <LetterSpacedText bold textTransform="uppercase">
              {hourObj.name}
            </LetterSpacedText>
            {hourObj.isClosed && <LetterSpacedText>Closed</LetterSpacedText>}
            {hourObj.timeOpen && (
              <LetterSpacedText>
                <span>
                  Hours:{" "}
                  {DateTime.fromISO(hourObj.timeOpen as string).toLocaleString(
                    DateTime.TIME_SIMPLE
                  )}{" "}
                  -{" "}
                  {DateTime.fromISO(hourObj.timeClose as string).toLocaleString(
                    DateTime.TIME_SIMPLE
                  )}
                </span>
              </LetterSpacedText>
            )}
            {hourObj.breakOpen && (
              <LetterSpacedText>
                <span>
                  Closed:{" "}
                  {DateTime.fromISO(
                    hourObj.breakClose as string
                  ).toLocaleString(DateTime.TIME_SIMPLE)}{" "}
                  -{" "}
                  {DateTime.fromISO(hourObj.breakOpen as string).toLocaleString(
                    DateTime.TIME_SIMPLE
                  )}
                </span>
              </LetterSpacedText>
            )}
            <br />
          </div>
        ))}
      </Card>
    </StyledWrapper>
  );
};
