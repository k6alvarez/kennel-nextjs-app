import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import { Content } from "../../components/ui-kit/Base";
import Card from "antd/lib/card/Card";
import styled from "styled-components";
import {
  INITIAL_RESERVATION_STATE,
  INITIAL_USER_STATE,
} from "../../components/Reservations/formInitialState";
import { PET_INITIAL_STATE } from "../../components/Pets/petFormReducer";
import { isImageURL, isValidHttpUrl } from "../../components/Pets/services";
import { FileOutlined } from "@ant-design/icons";
import { Image, List, Tag } from "antd";

import { DateTime } from "luxon";
import { LetterSpacedText } from "../../components/Footer";
import { BlockQuote } from "../../components/Reservations/GuestClients/FormIntro";
import { getFormattedValue } from "../../components/Reservations/ReservationSummary";
import { base } from "../../components/ui-kit/Theme";

export const DetailItem = styled.div`
  margin: ${({ theme }) => theme.space[0]} 0;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (min-width: ${(props) => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: {
          name: true,
          lastName: true,
          email: true,
          address: true,
          phone: true,
          altPhone: true,
          emergencyContactName: true,
          emergencyContactPhone: true,
          image: true,
        },
      },
      pets: true,
    },
  });
  return {
    props: {
      reservation: JSON.parse(JSON.stringify(reservation)),
    },
  };
};

export const getFieldGroupValues = (
  fieldGroup: {
    [x: string]: any;
  },
  key: string,
  value: string | boolean | Date
) => {
  const fieldInGroup = fieldGroup[key];

  if (key === "image" || key === "largeImage") {
    return;
  }

  if (fieldInGroup && value) {
    const isUrl = isValidHttpUrl(value);
    const isImage = isImageURL(value);
    return (
      <DetailItem key={key}>
        <LetterSpacedText bold>{fieldInGroup.label}:</LetterSpacedText>
        {isUrl ? (
          <>
            {isImage ? (
              <Image src={value as string} width={100} height={100} />
            ) : (
              <a href={value as string} target="_blank" rel="noreferrer">
                <FileOutlined /> {fieldInGroup.label}
              </a>
            )}
          </>
        ) : (
          <LetterSpacedText>
            {fieldInGroup.type === "date" || fieldInGroup.type === "time" ? (
              <>
                {fieldInGroup.type === "date" &&
                  DateTime.fromISO(value as string).toLocaleString(
                    DateTime.DATE_MED_WITH_WEEKDAY
                  )}

                {fieldInGroup.type === "time" &&
                  DateTime.fromISO(value as string).toLocaleString(
                    DateTime.TIME_SIMPLE
                  )}
              </>
            ) : (
              <span>{value}</span>
            )}
          </LetterSpacedText>
        )}
      </DetailItem>
    );
  }
};

const Reservation = ({ reservation }) => {
  const getDataSource = (
    fieldGroup: {
      [x: string]: any;
    },
    reservation: any
  ) => {
    const dataSource = Object.entries(reservation)
      .filter((key) => {
        const field = fieldGroup[key[0]];
        if (field) {
          return field.label !== "Image" && field.label !== "Large Image";
        }
      })
      .map((key, i) => {
        const field = fieldGroup[key[0]];

        return (
          <DetailItem key={key + "-" + i}>
            <LetterSpacedText fs={base.fontSizes[1]} bold>
              {field.label}
            </LetterSpacedText>
            <LetterSpacedText as="div" fs={base.fontSizes[2]}>
              <span>{getFormattedValue(field)}</span>
            </LetterSpacedText>
          </DetailItem>
        );
      });

    return dataSource;
  };

  if (!reservation) {
    return (
      <Layout>
        <Content>
          <h1>Reservation not found</h1>
          <p>
            It looks like this reservation does not exist. Check the link sent
            to the email address provided when the reservation was submitted.
          </p>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content maxWidth="900px">
        <h1>
          <span>
            Boarding Reservation for{" "}
            {DateTime.fromISO(reservation.arrivalDate).toLocaleString({
              month: "long",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
        </h1>
        <BlockQuote>
          {reservation.confirmed ? (
            <>Your reservation has been confirmed.</>
          ) : (
            <>
              Your reservation is not confirmed until you have received a
              confirmation email from us.
            </>
          )}
        </BlockQuote>
      </Content>
      <Content maxWidth="900px" fs="0">
        <List
          size="large"
          header={
            <Flex>
              <h2>Reservation Details</h2>
              {reservation.confirmed ? (
                <Tag color="green">Confirmed</Tag>
              ) : (
                <Tag color="red">Not Confirmed</Tag>
              )}
            </Flex>
          }
          bordered
          dataSource={getDataSource(INITIAL_RESERVATION_STATE, reservation)}
          renderItem={(item) => (
            <List.Item className="ant-list-50">
              {item}
              {console.log()}
            </List.Item>
          )}
        />

        {reservation.pets.map((pet) => {
          return (
            <List key={pet.id} header={<h2>{pet.name}</h2>} bordered>
              {pet.image && (
                <Image
                  src={pet.image}
                  alt={`Picture of ${pet.name}`}
                  width={200}
                  height={200}
                />
              )}

              <DetailItem>
                {Object.entries(pet).map(([key, value]: any) =>
                  getFieldGroupValues(PET_INITIAL_STATE, key, value)
                )}
              </DetailItem>
            </List>
          );
        })}
      </Content>
    </Layout>
  );
};

export default Reservation;
