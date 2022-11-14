import React from "react";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import prisma from "../../lib/prisma";
import { Content } from "../../components/ui-kit/Base";
import { Image, Card, Tag } from "antd";
import Layout from "../../components/Layout";
import {
  INITIAL_RESERVATION_STATE,
  INITIAL_USER_STATE,
} from "../../components/Reservations/formInitialState";
import { PET_INITIAL_STATE } from "../../components/Pets/petFormReducer";
import { DateTime } from "luxon";
import { getFieldGroupValues } from "../reservation/[id]";

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
  const reservation = await prisma.guestReservation.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
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

const ResGuest = ({ reservation }) => {
  if (!reservation) {
    return (
      <Layout>
        <Content>
          <h1>Reservation not found</h1>
          <p>
            It looks like this reservation does not exist. Check the link sent
            to the email address provided when the reservation was submitted.
            You must be logged in to view your reservation details.
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
              <h2>Reservation Details</h2>
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
            <Card title={<h2>{pet.name}</h2>} key={pet.id}>
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

        <Card title={<h2>Owner Details</h2>}>
          <Grid>
            {Object.entries(reservation).map(([key, value]: any) =>
              getFieldGroupValues(INITIAL_USER_STATE, key, value)
            )}
          </Grid>
        </Card>
      </Content>
    </Layout>
  );
};

export default ResGuest;
