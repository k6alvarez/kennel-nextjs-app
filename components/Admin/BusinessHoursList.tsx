import { Tag } from "antd";
import { DateTime } from "luxon";
import React from "react";
import { LetterSpacedText } from "../Footer";
import { Wrapper } from "../Pets/styles";

export const BusinessHoursList = ({ businessHours }) => {
  if (!businessHours || businessHours.length === 0) {
    return null;
  }
  return (
    <Wrapper>
      {businessHours?.map((hourObj) => (
        <div key={hourObj.id}>
          <h4>{hourObj.name}</h4>
          {hourObj.isClosed && (
            <LetterSpacedText bold fs={2}>
              Closed
            </LetterSpacedText>
          )}
          {hourObj.timeOpen && (
            <LetterSpacedText bold fs={2}>
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
            <LetterSpacedText bold fs={2}>
              <span>
                Closed:{" "}
                {DateTime.fromISO(hourObj.breakClose as string).toLocaleString(
                  DateTime.TIME_SIMPLE
                )}{" "}
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
    </Wrapper>
  );
};
