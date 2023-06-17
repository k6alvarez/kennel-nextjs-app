import React, { useState } from "react";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";

import Layout from "../components/Layout";

import { getSession, useSession } from "next-auth/react";
import { Content } from "../components/ui-kit/Base";

import { Button, Divider, Tabs, Tag, message } from "antd";
import { VirtualTable } from "../components/ui-kit/Table/VirtualTable";
import { headerHt } from "../components/ui-kit/Promo/styles-promo";
import styled from "styled-components";
import { DateTime } from "luxon";
import Link from "next/link";

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
    render: (confirmed) => (
      <Flex>
        <Tag color={confirmed === "confirmed" ? "green" : "red"}>
          {confirmed}
        </Tag>
      </Flex>
    ),
  },
  {
    title: "Arrival Date",
    dataIndex: "arrivalDate",
    key: "arrivalDate",
    render: (arrivalDate) =>
      DateTime.fromISO(arrivalDate).toLocaleString(DateTime.DATE_FULL),
  },
  {
    title: "Departure Date",
    dataIndex: "departureDate",
    key: "departureDate",
    render: (departureDate) =>
      DateTime.fromISO(departureDate).toLocaleString(DateTime.DATE_FULL),
  },

  {
    title: "Owner Name",
    dataIndex: "name",
    key: "name",
    render: (name, item) => (
      <span>
        {name} {item.lastName}
      </span>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email) => <a href={`mailto:${email}`}>{email}</a>,
  },

  {
    title: "Pets",
    dataIndex: "pets",
    key: "pets",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    render: (actions, item) => (
      <>
        <Button
          type="primary"
          size="small"
          disabled={item.confirmed === "confirmed"}
          onClick={() => {
            const updateReservation = async () => {
              const reservationApiName =
                item.reservationType === "user"
                  ? "reservation"
                  : "guest-reservation";
              const response = await fetch(
                `/api/${reservationApiName}/${item.id}`,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    id: item.id,
                    confirmed: true,
                    userId: item.userId,
                    reservationEmail: item.email,
                  }),
                }
              );

              if (response.ok) {
                message.success("Reservation confirmed");
              } else {
                message.error("Something went wrong. Please try again.");
              }
            };
            updateReservation();
          }}
        >
          Confirm
        </Button>
        <Divider type="vertical" />
        <Link href={`/reservation/${item.id}`}>
          <Button size="small">View</Button>
        </Link>
      </>
    ),
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

  const dataUsers = reservations.map((reservation, index) => {
    return {
      key: reservation.id,
      id: reservation.id,
      reservationType: "user",
      confirmed: reservation.confirmed ? "confirmed" : "not confirmed",
      arrivalDate: reservation.arrivalDate,
      departureDate: reservation.departureDate,
      createdAt: reservation.createdAt,
      name: reservation.author.name,
      lastName: reservation.author.lastName,
      email: reservation.author.email,
      pets: reservation.pets.map((pet, i) => {
        return pet.name + (i < reservation.pets.length - 1 ? ", " : "");
      }),
    };
  });

  const [dataUsersKeyOnly, setDataUsersKeyOnly] = useState(dataUsers);

  const dataGuestsKeyOnly = guestReservations.map((reservation, index) => {
    return {
      key: reservation.id,
      id: reservation.id,
      reservationType: "guest",
      arrivalDate: reservation.arrivalDate,
      departureDate: reservation.departureDate,
      createdAt: reservation.createdAt,
      confirmed: reservation.confirmed ? "confirmed" : "not confirmed",
      name: reservation.name,
      lastName: reservation.lastName,
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
