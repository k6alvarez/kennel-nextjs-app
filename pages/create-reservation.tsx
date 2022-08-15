import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { Content } from "../components/ui-kit/Base";
import { ReservationGuest } from "../components/Reservations/ReservationGuest";
import { ReservationClient } from "../components/Reservations/ReservationClient";

const Reservation: React.FC = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <Content>
        <h1>{!session?.user ? "New Client" : "Client"} Reservation</h1>
        {!session?.user ? (
          <ReservationGuest />
        ) : (
          <ReservationClient session={session} />
        )}
      </Content>
    </Layout>
  );
};

export default Reservation;
