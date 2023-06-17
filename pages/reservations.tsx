import React from "react";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";

import Layout from "../components/Layout";

import { getSession, useSession } from "next-auth/react";
import { Button, Content } from "../components/ui-kit/Base";

import { Tabs, Tag } from "antd";
import { VirtualTable } from "../components/ui-kit/Table/VirtualTable";
import { headerHt } from "../components/ui-kit/Promo/styles-promo";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0 20px;
  margin-top: ${headerHt}px;
  margin-bottom: 20px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin: 0;
  }
`;

const columnsUsers = [
  {
    title: "Status",
    dataIndex: "confirmed",
    key: "confirmed",
    render: (confirmed, item) => (
      <Flex>
        <Tag color={confirmed === "confirmed" ? "green" : "red"}>
          {confirmed}
        </Tag>
        <Button
          small
          primary
          onClick={() => {
            const updateReservation = async () => {
              const response = await fetch(`/api/reservation/${item.id}`, {
                method: "PUT",
                body: JSON.stringify({
                  id: item.id,
                  confirmed: true,
                }),
              });
              if (response.ok) {
                location.reload();
              }
            };
            updateReservation();
          }}
        >
          Confirm
        </Button>
      </Flex>
    ),
  },
  {
    title: "Arrival Date",
    dataIndex: "arrivalDate",
    key: "arrivalDate",
  },
  {
    title: "Departure Date",
    dataIndex: "departureDate",
    key: "departureDate",
  },
  {
    title: "Date Created",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Owner Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },

  {
    title: "Pets",
    dataIndex: "pets",
    key: "pets",
  },
];

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { reservations: [], guestReservations: [], user: null } };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const reservations = await prisma.reservation.findMany({
    include: {
      author: true,
      pets: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const guestReservations = await prisma.guestReservation.findMany({
    include: {
      pets: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      reservations: JSON.parse(JSON.stringify(reservations)),
      guestReservations: JSON.parse(JSON.stringify(guestReservations)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export const reservations = ({ reservations, guestReservations, user }) => {
  // const parsedReservations = JSON.parse(reservations);
  // const parsedGuestReservations = JSON.parse(guestReservations);
  // const parsedUser = JSON.parse(user);
  const { data: session } = useSession();

  const dataUsersKeyOnly = reservations.map((reservation, index) => {
    return {
      key: reservation.id,
      id: reservation.id,
      confirmed: reservation.confirmed ? "confirmed" : "not confirmed",
      arrivalDate: reservation.arrivalDate,
      departureDate: reservation.departureDate,
      createdAt: reservation.createdAt,
      name: reservation.author.name,
      email: reservation.author.email,
      pets: reservation.pets.map((pet, i) => {
        return pet.name + (i < reservation.pets.length - 1 ? ", " : "");
      }),
    };
  });

  const dataGuestsKeyOnly = guestReservations.map((reservation, index) => {
    return {
      key: reservation.id,
      id: reservation.id,
      arrivalDate: reservation.arrivalDate,
      departureDate: reservation.departureDate,
      createdAt: reservation.createdAt,
      confirmed: reservation.confirmed ? "confirmed" : "not confirmed",
      name: reservation.name,
      email: reservation.email,
      pets: reservation.pets.map((pet, i) => {
        return pet.name + (i < reservation.pets.length - 1 ? ", " : "");
      }),
    };
  });

  if (!session) {
    return (
      <Layout>
        <Content>
          <h1>Pending Reservations</h1>
          <div>You need to be authenticated to view this page.</div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Wrapper>
        {user?.permissions?.includes("ADMIN") ? (
          <main>
            <Tabs
              items={[
                {
                  key: "1",
                  label: "User Reservations",
                  children: (
                    <>
                      <VirtualTable
                        columns={columnsUsers}
                        dataSource={dataUsersKeyOnly}
                        scroll={{
                          y: window.innerHeight - parseInt(headerHt) - 100,
                        }}
                      />
                    </>
                  ),
                },
                {
                  key: "2",
                  label: "Guest Reservations",
                  children: (
                    <>
                      <VirtualTable
                        columns={columnsUsers}
                        dataSource={dataGuestsKeyOnly}
                        scroll={{
                          y: window.innerHeight - parseInt(headerHt) - 200,
                        }}
                      />
                    </>
                  ),
                },
              ]}
            />
          </main>
        ) : (
          <div>You need to be authenticated to view this page.</div>
        )}
      </Wrapper>
    </Layout>
  );
};

export default reservations;
