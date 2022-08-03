import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { reservations: [] } };
  }

  const reservations = await prisma.reservation.findMany({
    where: {
      author: { email: session.user.email },
      submitted: false,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: { reservations: JSON.parse(JSON.stringify(reservations)) },
  };
};

export type ReservationProps = {
  id: string;
  author: {
    name: string;
    email: string;
  } | null;
  submitted: boolean;
  createdAt: string;
};

type Reservations = {
  reservations: ReservationProps[];
};

const DraftReservations: React.FC<Reservations> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>Pending Reservations</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <h1>Pending Reservations</h1>
        <main>
          {props.reservations.map((reservation) => (
            <div key={reservation.id}>
              <p>
                Reservation made by {reservation.author.email} on{" "}
                {reservation.createdAt}
              </p>
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default DraftReservations;
