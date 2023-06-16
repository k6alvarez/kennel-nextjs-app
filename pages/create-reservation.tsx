import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import { getSession, useSession } from "next-auth/react";
import { Content } from "../components/ui-kit/Base";
import { GuestClientForm } from "../components/Reservations/GuestClients/GuestClientForm";
import { ClientForm } from "../components/Reservations/Clients/ClientForm";
import { ClientStatusSelection } from "../components/Reservations/ClientStatusSelection";
import { ArrowLeftOutlined } from "@ant-design/icons";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";
import { ThemePreferenceContext } from "./_app";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  const page = "RESERVATIONS";
  const contentItems = await prisma.contentItem.findMany({
    where: {
      page,
    },
  });

  if (!session) {
    return {
      props: {
        contentItems: JSON.stringify(contentItems),
        promoItems: JSON.stringify([]),
        user: null,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // replace user null values with empty strings
  const userWithEmptyStrings = Object.keys(user).reduce((object, key) => {
    object[key] = user[key] === null ? "" : user[key];
    return object;
  }, {});

  const promoItems = await prisma.promoItem.findMany({
    where: {
      page,
    },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(userWithEmptyStrings)),
      contentItems: JSON.stringify(contentItems),
      promoItems: JSON.stringify(promoItems),
    },
  };
};

const Reservation = ({ contentItems, promoItems, user }) => {
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
          <ClientForm user={user} />
        )}
      </Content>
    </Layout>
  );
};

export default Reservation;
