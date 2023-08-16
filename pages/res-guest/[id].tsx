import React from "react";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import prisma from "../../lib/prisma";
import { Content } from "../../components/ui-kit/Base";
import { Tag, List, Divider, Alert } from "antd";
import Layout from "../../components/Layout";
import {
  INITIAL_RESERVATION_STATE,
  INITIAL_USER_STATE,
} from "../../components/Reservations/formInitialState";
import { PET_INITIAL_STATE } from "../../components/Pets/petFormReducer";
import { getDataSource } from "../../components/Reservations/helpers";
import { ReservationNotFound } from "../../components/Reservations/ReservationNotFound";
import { ReservationStatusSection } from "../../components/Reservations/ReservationStatusSection";
import { useRouter } from "next/router";
import { BlockQuote } from "../../components/Reservations/GuestClients/FormIntro";

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
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
  const router = useRouter();
  const { useWelcome } = router.query;

  if (!reservation) {
    return <ReservationNotFound />;
  }

  return (
    <Layout>
      <Content maxWidth="900px">
        <ReservationStatusSection reservation={reservation} />
        {useWelcome && (
          <BlockQuote>
            <>
              <p>
                Thanks for signing up! Next time you make a reservation,
                <a href="/api/auth/signin"> log in</a> using the email address
                you provided to set up your profile.
              </p>
            </>
          </BlockQuote>
        )}
        <Divider>
          <h2>Reservation Summary</h2>
        </Divider>
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
          dataSource={getDataSource(
            { ...INITIAL_RESERVATION_STATE, ...INITIAL_USER_STATE },
            reservation
          )}
          renderItem={(item) => (
            <List.Item className="ant-list-50">{item}</List.Item>
          )}
        />
        {reservation.pets.map((pet) => {
          return (
            <List
              key={pet.id}
              size="large"
              header={
                <Flex>
                  <h2>{pet.name}</h2>
                </Flex>
              }
              bordered
              dataSource={getDataSource(PET_INITIAL_STATE, pet)}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          );
        })}
      </Content>
    </Layout>
  );
};

export default ResGuest;
