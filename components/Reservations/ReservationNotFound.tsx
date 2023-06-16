import React from "react";
import Layout from "../../components/Layout";
import { Content } from "../ui-kit/Base";

export const ReservationNotFound = () => {
  return (
    <Layout>
      <Content>
        <h1>Reservation not found</h1>
        <p>
          It looks like this reservation does not exist. Check the link sent to
          the email address provided when the reservation was submitted.
        </p>
      </Content>
    </Layout>
  );
};
