import React from "react";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { Content } from "../components/ui-kit/Base";
import { NewClientForm } from "../components/Reservations/NewClients/NewClientForm";
import { ClientForm } from "../components/Reservations/Clients/ClientForm";

const Reservation: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Layout>Loading ...</Layout>;
  }

  return (
    <Layout>
      <Content>
        <h1>Client Reservation</h1>
        {!session?.user ? <NewClientForm /> : <ClientForm session={session} />}
      </Content>
    </Layout>
  );
};

export default Reservation;
