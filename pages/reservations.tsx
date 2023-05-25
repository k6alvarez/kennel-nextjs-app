import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../components/Layout";
import { Table } from "antd";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const reservations = await prisma.reservation.findMany({
    include: {
      author: true,
      pets: true,
    },
  });

  return {
    props: {
      reservations: JSON.stringify(reservations),
    },
  };
};

export const reservations = ({ reservations }) => {
  const parsedReservations = JSON.parse(reservations);
  const columns = [
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

  const data = parsedReservations.map((reservation, index) => {
    reservation.key = reservation.id;
    return reservation;
  });

  return (
    <Layout>
      {console.log(data)}
      <Table columns={columns} dataSource={data} />
    </Layout>
  );
};

export default reservations;
