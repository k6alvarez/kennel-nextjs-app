import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../components/Layout";
import { Table } from "antd";
import { getSession, useSession } from "next-auth/react";
import { Content } from "../components/ui-kit/Base";

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
      reservations: JSON.stringify(reservations),
      guestReservations: JSON.stringify(guestReservations),
      user: JSON.stringify(user),
    },
  };
};

export const reservations = ({ reservations, guestReservations, user }) => {
  const parsedReservations = JSON.parse(reservations);
  const parsedGuestReservations = JSON.parse(guestReservations);
  const parsedUser = JSON.parse(user);
  const { data: session } = useSession();

  const columnsUsers = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author) => {
        return author.name;
      },
    },
    {
      title: "Pets",
      dataIndex: "pets",
      key: "pets",
      render: (pets) => {
        return pets
          .map((pet) => {
            return pet.name;
          })
          .join(", ");
      },
    },
  ];

  const columnsGuests = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Pets",
      dataIndex: "pets",
      key: "pets",
      render: (pets) => {
        return pets
          .map((pet) => {
            return pet.name;
          })
          .join(", ");
      },
    },
  ];

  const dataUsers = parsedReservations.map((reservation, index) => {
    reservation.key = reservation.id;
    return reservation;
  });

  const dataGuests = parsedGuestReservations.map((reservation, index) => {
    reservation.key = reservation.id;
    return reservation;
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
      {parsedUser?.permissions?.includes("ADMIN") ? (
        <main>
          <h1>User Reservations</h1>
          <Table columns={columnsUsers} dataSource={dataUsers} />

          <h1>Guest Reservations</h1>
          <Table columns={columnsGuests} dataSource={dataGuests} />
        </main>
      ) : (
        <div>You need to be authenticated to view this page.</div>
      )}
    </Layout>
  );
};

export default reservations;
