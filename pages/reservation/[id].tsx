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
import { Image, Tag } from "antd";

import { DateTime } from "luxon";

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

const Reservation = ({ reservation }) => {
  const getFieldGroupValues = (
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
        <div key={key}>
          {fieldInGroup.label}: <br />
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
            <span>
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
            </span>
          )}
        </div>
      );
    }
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
        <p>
          {reservation.confirmed ? (
            <>Your reservation has been confirmed.</>
          ) : (
            <>
              Your reservation is not confirmed until you have received a
              confirmation email from us.
            </>
          )}
        </p>
      </Content>
      <Content maxWidth="900px" cardWrapper fs="0">
        <Card
          title={
            <Flex>
              <span>Boarding Details</span>
              {reservation.confirmed ? (
                <Tag color="green">Confirmed</Tag>
              ) : (
                <Tag color="red">Not Confirmed</Tag>
              )}
            </Flex>
          }
        >
          <Grid>
            {Object.entries(reservation).map(([key, value]: any) =>
              getFieldGroupValues(INITIAL_RESERVATION_STATE, key, value)
            )}
          </Grid>
        </Card>

        {reservation.pets.map((pet) => {
          return (
            <Card title={pet.name} key={pet.id}>
              {pet.image && (
                <Image
                  src={pet.image}
                  alt={`Picture of ${pet.name}`}
                  width={200}
                  height={200}
                />
              )}
              <Grid>
                {Object.entries(pet).map(([key, value]: any) =>
                  getFieldGroupValues(PET_INITIAL_STATE, key, value)
                )}
              </Grid>
            </Card>
          );
        })}

        <Card title={"Owner Details"}>
          <Grid>
            {Object.entries(reservation.author).map(([key, value]: any) =>
              getFieldGroupValues(INITIAL_USER_STATE, key, value)
            )}
          </Grid>
        </Card>
      </Content>
    </Layout>
  );
};

export default Reservation;
