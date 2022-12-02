import { Tag } from "antd";
import { DateTime } from "luxon";
import React from "react";
import { Wrapper } from "../Pets/styles";
import { LetterSpacedText } from "../ui-kit/BusinessHours";

export const HolidayPremiumDatesList = ({ holidayPremiumDates }) => {
  if (!holidayPremiumDates || holidayPremiumDates.length === 0) {
    return null;
  }

  return (
    <Wrapper>
      {holidayPremiumDates?.map((date) => (
        <div key={date.id}>
          <h4>
            {date.name}
            <Tag color={date.type === "Premium" ? "blue" : "green"}>
              {date.type} {date.type === "Premium" ? "Dates" : "Date"}
            </Tag>
          </h4>
          <LetterSpacedText bold fs={2}>
            {date.dateTo ? (
              <>
                {DateTime.fromISO(date.dateFrom).toLocaleString(
                  DateTime.DATE_MED
                )}
                {" - "}
                {DateTime.fromISO(date.dateTo).toLocaleString(
                  DateTime.DATE_MED
                )}
              </>
            ) : (
              <>
                {DateTime.fromISO(date.dateFrom).toLocaleString(
                  DateTime.DATE_FULL
                )}
              </>
            )}
          </LetterSpacedText>
          {date.isClosed && (
            <LetterSpacedText bold fs={2}>
              Closed
            </LetterSpacedText>
          )}
          {date.timeOpen && (
            <LetterSpacedText bold fs={2}>
              <span>
                Limited Hours:{" "}
                {DateTime.fromISO(date.timeOpen as string).toLocaleString(
                  DateTime.TIME_SIMPLE
                )}{" "}
                -{" "}
                {DateTime.fromISO(date.timeClose as string).toLocaleString(
                  DateTime.TIME_SIMPLE
                )}
              </span>
            </LetterSpacedText>
          )}
          {date.breakOpen && (
            <LetterSpacedText bold fs={2}>
              <span>
                {DateTime.fromISO(date.breakClose as string).toLocaleString(
                  DateTime.TIME_SIMPLE
                )}
              </span>
              <span>
                {DateTime.fromISO(date.breakOpen as string).toLocaleString(
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
