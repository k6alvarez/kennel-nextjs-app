import React from "react";
import { DetailItem } from "../../pages/reservation/[id]";
import { LetterSpacedText } from "../Footer";
import { base } from "../ui-kit/Theme";
import styled from "styled-components";
import { DateTime } from "luxon";
import { PET_INITIAL_STATE } from "../Pets/petFormReducer";
import { Divider, Image, List, Tag } from "antd";
import { getDataSource } from "./helpers";
import { ClockCircleOutlined } from "@ant-design/icons";

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTag = styled(Tag)`
  font-size: ${(props) => props.theme.fontSizes[0]};
  text-transform: capitalize;
  text-align: center;
  padding: 0.5rem;
  margin: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    align-self: center;
  }

  h4 {
    text-transform: capitalize;
    font-size: ${(props) => props.theme.fontSizes[3]};
  }
`;

export const getFormattedValue = (field) => {
  if (field.value === "") return "n/a";

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
      <Divider>
        <h2>Reservation Summary</h2>
      </Divider>
      <Flex>
        {" "}
        <StyledTag icon={<ClockCircleOutlined />} color="blue">
          Checkin:{" "}
          {DateTime.fromISO(state.arrivalDate.value).toLocaleString(
            DateTime.DATE_MED_WITH_WEEKDAY
          )}{" "}
          @{" "}
          {DateTime.fromISO(state.arrivalTime.value).toLocaleString(
            DateTime.TIME_SIMPLE
          )}
        </StyledTag>
        <StyledTag icon={<ClockCircleOutlined />} color="blue">
          Checkout:{" "}
          {DateTime.fromISO(state.departureDate.value).toLocaleString(
            DateTime.DATE_MED_WITH_WEEKDAY
          )}{" "}
          @{" "}
          {DateTime.fromISO(state.departureTime.value).toLocaleString(
            DateTime.TIME_SIMPLE
          )}
        </StyledTag>
      </Flex>
      <List
        size="small"
        header={<h4>Owner Details</h4>}
        bordered
        dataSource={getState
          .filter((key) => {
            const field = state[key];
            if (!field.value && key === "pets") return false;
            return true;
          })
          .map((key) => {
            const field = state[key];
            if (!field.value && key === "pets") return null;
            return (
              <DetailItem key={key}>
                <LetterSpacedText fs={base.fontSizes[1]} bold>
                  {field.label}
                </LetterSpacedText>
                {key !== "pets" && (
                  <LetterSpacedText as="div" fs={base.fontSizes[1]}>
                    {getFormattedValue(field)}
                  </LetterSpacedText>
                )}
              </DetailItem>
            );
          })}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />

      <Divider>
        <h2>Pets Boarded</h2>
      </Divider>

      {pets &&
        pets.length > 0 &&
        pets.map((pet, i) => (
          <List
            key={i}
            size="small"
            header={<h4>{pet.name}</h4>}
            bordered
            dataSource={getDataSource(PET_INITIAL_STATE, pet)}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        ))}
    </Wrapper>
  );
};
