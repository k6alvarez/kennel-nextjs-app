import React from "react";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { getSession, useSession } from "next-auth/react";
import { Content } from "../components/ui-kit/Base";
import { NewClientForm } from "../components/Reservations/NewClients/NewClientForm";
import { ClientForm } from "../components/Reservations/Clients/ClientForm";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { reservations: [], guestReservations: [] } };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

const Reservation: React.FC = ({ user }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Layout>Loading ...</Layout>;
  }

  return (
    <Layout>
      <Content>
        <h1>{!session?.user ? "New Client" : "Client"} Reservation</h1>
        {!session?.user ? (
          <NewClientForm />
        ) : (
          <ClientForm session={session} user={user} />
        )}
      </Content>
    </Layout>
  );
};

export default Reservation;
