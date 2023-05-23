import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import { useSession } from "next-auth/react";
import { Content } from "../components/ui-kit/Base";
import { GuestClientForm } from "../components/Reservations/GuestClients/GuestClientForm";
import { ClientForm } from "../components/Reservations/Clients/ClientForm";
import { ClientStatusSelection } from "../components/Reservations/ClientStatusSelection";
import { ArrowLeftOutlined } from "@ant-design/icons";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";
import { ThemePreferenceContext } from "./_app";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const page = "RESERVATIONS";
  const contentItems = await prisma.contentItem.findMany({
    where: {
      page,
    },
  });

  const promoItems = await prisma.promoItem.findMany({
    where: {
      page,
    },
  });

  return {
    props: {
      contentItems: JSON.stringify(contentItems),
      promoItems: JSON.stringify(promoItems),
    },
  };
};

const Reservation = ({ contentItems, promoItems }) => {
  const parsedContentItems = JSON.parse(contentItems);
  const parsedPromoItems = JSON.parse(promoItems);
  const { data: session, status } = useSession();
  const [clientType, setClientType] = useState({
    clientType: "",
  });

  const { editMode } = useContext(ThemePreferenceContext);

  const [reservationWelcome, setReservationWelcome] = useState(
    parsedContentItems.find((item) => item.name === "reservationWelcome")
  );

  const [bannerImage, setBannerImage] = useState(
    parsedPromoItems.find((item) => item.name === "bannerImage")
  );

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

  if ((!session && clientType.clientType === "") || editMode) {
    return (
      <Layout>
        <ClientStatusSelection
          onToggle={(type) => {
            setClientType({ clientType: type });
          }}
          clientType={clientType}
          reservationWelcome={reservationWelcome}
          setReservationWelcome={setReservationWelcome}
          bannerImage={bannerImage}
          setBannerImage={setBannerImage}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <Content>
        {clientType.clientType !== "" && (
          <button
            onClick={() => {
              setClientType({ clientType: "" });
            }}
          >
            <ArrowLeftOutlined /> Back
          </button>
        )}
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
