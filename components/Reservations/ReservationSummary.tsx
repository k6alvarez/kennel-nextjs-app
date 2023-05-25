import React from "react";
import { DetailItem } from "../../pages/reservation/[id]";
import { LetterSpacedText } from "../Footer";
import { base } from "../ui-kit/Theme";
import styled from "styled-components";
import { DateTime } from "luxon";
import { PET_INITIAL_STATE } from "../Pets/petFormReducer";
import Link from "next/link";
import { LinkOutlined } from "@ant-design/icons";
import { Image } from "antd";
const Flex = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    align-self: center;
  }
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
        <Image width="40%" src={field.value as string} />
      ) : (
        <span>{field.value}</span>
      )}
    </>
  );
};

export const ReservationSummary = ({ state, pets }) => {
  const getState = typeof state === "object" ? Object.keys(state) : state;
  return (
    <Wrapper>
      <h2>Reservation Summary</h2>
      <Flex>
        {state &&
          getState.map((key, i) => {
            const field = state[key];

            if (!field.value && key === "pets") return null;

            return (
              <DetailItem key={key + "-" + i}>
                <LetterSpacedText fs={base.fontSizes[1]}>
                  {field.label}
                </LetterSpacedText>
                {key !== "pets" && (
                  <LetterSpacedText as="div" fs={base.fontSizes[2]} bold>
                    {getFormattedValue(field)}
                  </LetterSpacedText>
                )}
              </DetailItem>
            );
          })}
      </Flex>
      {pets && (
        <>
          <h2>
            {pets.length} {pets.length > 1 ? "Pets" : "Pet"} Boarded
          </h2>
          {pets.map((pet, i) => {
            return (
              <div key={`${pet.id}-${i}`}>
                <h2>{pet.name}</h2>
                <Flex>
                  {Object.entries(PET_INITIAL_STATE).map(([key, value]) => {
                    return (
                      pet[key] && (
                        <DetailItem key={pet.id + "-" + key}>
                          <LetterSpacedText fs={base.fontSizes[1]} bold>
                            {PET_INITIAL_STATE[key].label}
                          </LetterSpacedText>
                          <LetterSpacedText as="div" fs={base.fontSizes[2]}>
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
              </div>
            );
          })}
        </>
      )}
    </Wrapper>
  );
};
