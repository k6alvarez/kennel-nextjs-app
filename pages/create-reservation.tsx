import React, { useState } from "react";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { Content } from "../components/ui-kit/Base";
import { GuestClientForm } from "../components/Reservations/GuestClients/GuestClientForm";
import { ClientForm } from "../components/Reservations/Clients/ClientForm";
import { ClientStatusSelection } from "../components/Reservations/ClientStatusSelection";

const Reservation: React.FC = () => {
  const { data: session, status } = useSession();
  const [clientType, setClientType] = useState({
    clientType: "",
  });

  if (status === "loading") {
    return (
      <Layout>
        <Content>
          <h1>Client Reservations</h1>
          <p>Loading...</p>
        </Content>
      </Layout>
    );
  }

  if (clientType.clientType === "") {
    return (
      <Layout>
        <Content>
          <ClientStatusSelection
            onToggle={(type) => {
              setClientType({ clientType: type });
            }}
            clientType={clientType}
          />
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content>
        <ClientStatusSelection
          onToggle={(type) => {
            setClientType({ clientType: type });
          }}
          clientType={clientType}
        />
        <h1>Client Reservations</h1>
        {!session || clientType.clientType === "new" ? (
          <GuestClientForm />
        ) : (
          <ClientForm session={session} />
        )}
      </Content>
    </Layout>
  );
};

export default Reservation;
