import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";
import { Content } from "../components/ui-kit/Base";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { reservations: [], guestReservations: [] } };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const guestReservations = await prisma.guestReservation.findMany({
    where: { submitted: false },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  const reservations = await prisma.reservation.findMany({
    where: {
      submitted: false,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
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

export type ReservationProps = {
  id: string;
  author: {
    name: string;
    email: string;
  } | null;
  submitted: boolean;
  createdAt: string;
  name?: string;
};

type Reservations = {
  reservations: ReservationProps[];
  guestReservations: ReservationProps[];
  user: User;
};

const DraftReservations: React.FC<Reservations> = ({
  user,
  reservations,
  guestReservations,
}) => {
  const { data: session } = useSession();

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
      <Content>
        <h1>Pending Reservations</h1>
        {user?.permissions?.includes("ADMIN") ? (
          <main>
            <h1>Client Reservations</h1>
            {reservations.map((reservation) => (
              <div key={reservation.id}>
                <p>
                  Reservation made by {reservation.author.email} on{" "}
                  {reservation.createdAt}
                </p>
              </div>
            ))}
            <h1>Guest Reservations</h1>
            {guestReservations.map((reservation) => (
              <div key={reservation.id}>
                <p>
                  Reservation made by{" "}
                  {reservation?.name || reservation?.author?.email} on{" "}
                  {reservation.createdAt}
                </p>
              </div>
            ))}
          </main>
        ) : (
          <div>You need to be authenticated to view this page.</div>
        )}
      </Content>
    </Layout>
  );
};

export default DraftReservations;
