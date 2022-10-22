import React, { useContext, useReducer, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getSession, useSession } from "next-auth/react";
import { User } from "@prisma/client";
import prisma from "../lib/prisma";
import { ThemePreferenceContext } from "./_app";
import Layout from "../components/Layout";
import { Content } from "../components/ui-kit/Base";
import { profileFormReducer } from "../components/Profile/profileFormReducer";
import { statesArray } from "../components/Reservations/formInitialState";
import { Size, useWindowSize } from "../components/ui-kit/hooks/useWindowSize";
import { ProfileForm } from "../components/Profile/ProfileForm";
import { PetsTab } from "../components/Pets/PetsTab";

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
      revalidate: 10,
    },
  };
};

export type PetProps = {
  id: string;
  name: string;
  type: string;
  breed: string;
  weight: number;
  ownerId: string;
  owner: User;
  createdAt: string;
  updatedAt: string;
  gender: string;
  fixed: string;
  color: string;
  image?: string;
  largeImage?: string;
  vaccinations: string;
  vaccinationsLargeImage?: string;
  age: string;
  vet: string;
  preferredRunSize: string;
  feeding: string;
  feedingCount: string;
};

type Props = {
  user: User | null;
};

const Profile: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const { tab } = router.query;

  const { breakpoints } = useContext(ThemePreferenceContext);
  const size: Size = useWindowSize();
  const mobileScreen = size.width < parseInt(breakpoints[0]);
  const { data: session, status } = useSession();
  const INITIAL_PROFILE_STATE = {
    email: {
      value: user?.email || "",
      error: null,
      type: "text",
      inputMode: "email",
      label: "Email",
      disabled: true,
      grow: true,
    },
    name: {
      value: user?.name || "",
      error: null,
      type: "text",
      label: "First Name",
    },
    lastName: {
      value: user?.lastName || "",
      error: null,
      type: "text",
      label: "Last Name",
    },
    address: {
      value: user?.address || "",
      error: null,
      type: "text",
      label: "Address",
      grow: true,
    },
    phone: {
      value: user?.phone || "",
      error: null,
      type: "text",
      inputMode: "numeric",
      minLength: 10,
      maxLength: 11,
      label: "Phone",
    },
    altPhone: {
      value: user?.altPhone || "",
      error: null,
      type: "text",
      inputMode: "numeric",
      minLength: 10,
      maxLength: 11,
      label: "Alt Phone",
    },
    emergencyContactName: {
      value: user?.emergencyContactName || "",
      error: null,
      label: "Emergency Contact Name",
    },
    emergencyContactPhone: {
      value: user?.emergencyContactPhone || "",
      error: null,
      type: "text",
      inputMode: "numeric",
      minLength: 10,
      maxLength: 11,
      label: "Emergency Contact Phone",
    },
  };
  const [profileFormState, profileFormDispatch] = useReducer(
    profileFormReducer,
    INITIAL_PROFILE_STATE
  );
  const [formError, setFormError] = useState(undefined);

  if (status === "loading") {
    return <Layout>Loading ...</Layout>;
  }

  if (!session) {
    return (
      <Layout>
        <Content>
          <h1>Profile</h1>
          <div>You need to be authenticated to view this page.</div>
        </Content>
      </Layout>
    );
  }

  const items = [
    {
      label: "Profile",
      key: "profile",
      children: (
        <ProfileForm
          user={user}
          profileFormState={profileFormState}
          setFormError={setFormError}
          profileFormDispatch={profileFormDispatch}
          formError={formError}
          initialState={INITIAL_PROFILE_STATE}
        />
      ),
    },
    {
      label: "Pets",
      key: "pets",
      children: <PetsTab />,
    },
  ];

  return (
    <Layout>
      <Content>
        <Tabs
          defaultActiveKey={typeof tab === "string" ? tab : "profile"}
          tabPosition={mobileScreen ? "top" : "left"}
          size={mobileScreen ? "small" : "large"}
          moreIcon={<DownOutlined />}
          style={{
            fontSize: "inherit",
          }}
          items={items}
          onChange={(key) => {
            router.push(`/profile?tab=${key}`, undefined, { shallow: true });
          }}
        />
      </Content>
    </Layout>
  );
};

export default Profile;
