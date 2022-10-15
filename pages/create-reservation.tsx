import React from "react";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { Content } from "../components/ui-kit/Base";
import { GuestClientForm } from "../components/Reservations/GuestClients/GuestClientForm";
import { ClientForm } from "../components/Reservations/Clients/ClientForm";

const Reservation: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Layout>Loading ...</Layout>;
  }

  return (
    <Layout>
      <Content>
        <h1>Client Reservations</h1>
        {!session ? <GuestClientForm /> : <ClientForm session={session} />}
      </Content>
    </Layout>
  );
};

export default Reservation;
