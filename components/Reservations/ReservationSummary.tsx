import React from "react";
import { DetailItem } from "../../pages/reservation/[id]";
import { LetterSpacedText } from "../Footer";
import { base } from "../ui-kit/Theme";
import styled from "styled-components";
import { DateTime } from "luxon";
import { PET_INITIAL_STATE } from "../Pets/petFormReducer";
import Link from "next/link";
import { LinkOutlined } from "@ant-design/icons";
const Flex = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;

export const getFormattedValue = (field) => {
  return field.type === "date" || field.type === "time" ? (
    <>
      {field.type === "date" &&
        DateTime.fromISO(field.value as string).toLocaleString({
          month: "long",
          day: "2-digit",
          year: "numeric",
          weekday: "long",
        })}

      {field.type === "time" &&
        DateTime.fromISO(field.value as string).toLocaleString(
          DateTime.TIME_SIMPLE
        )}
    </>
  ) : (
    <>
      {field.type === "file" ? (
        <Link href={field.value}>
          <a>
            <LinkOutlined /> View uploaded file
          </a>
        </Link>
      ) : (
        <span>{field.value}</span>
      )}
    </>
  );
};

export const ReservationSummary = ({ state, pets }) => {
  return (
    <div>
      <h1>Reservation Summary</h1>
      <Flex>
        {Object.keys(state).map((key, i) => {
          const field = state[key];

          if (!field.value && key === "pets") return null;

          return (
            <>
              <DetailItem key={key + "-" + i}>
                <LetterSpacedText fs={base.fontSizes[1]} bold>
                  {field.label}
                </LetterSpacedText>
                {key !== "pets" && (
                  <LetterSpacedText fs={base.fontSizes[2]}>
                    {getFormattedValue(field)}
                  </LetterSpacedText>
                )}
              </DetailItem>
            </>
          );
        })}
      </Flex>
      <h1>{pets.length} Pets Boarded</h1>
      {pets.map((pet, i) => {
        return (
          <>
            <h2>{pet.name}</h2>
            <Flex>
              {Object.entries(PET_INITIAL_STATE).map(([key, value]) => {
                return (
                  pet[key] && (
                    <DetailItem key={pet.id + "-" + key}>
                      <LetterSpacedText fs={base.fontSizes[1]} bold>
                        {PET_INITIAL_STATE[key].label}
                      </LetterSpacedText>
                      <LetterSpacedText fs={base.fontSizes[2]}>
                        {getFormattedValue({
                          value: pet[key],
                          type: PET_INITIAL_STATE[key].type,
                        })}
                      </LetterSpacedText>
                    </DetailItem>
                  )
                );
                return i;
              })}
            </Flex>
          </>
        );
      })}
    </div>
  );
};
