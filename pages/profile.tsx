import React, { useContext, useEffect, useReducer, useState } from "react";
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
import { Size, useWindowSize } from "../components/ui-kit/hooks/useWindowSize";
import { ProfileForm } from "../components/Profile/ProfileForm";
import { PetsTab } from "../components/Pets/PetsTab";
import { AdminTab } from "../components/Admin/AdminTab";

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
  distemperVaccine?: string;
  bordetellaVaccine?: string;
  rabiesVaccine?: string;
  parvoVirusesVaccine?: string;
};

type Props = {
  user: User | null;
};

const Profile: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const { tab } = router.query;
  const [profileTab, setProfileTab] = useState("profile");

  const { breakpoints } = useContext(ThemePreferenceContext);
  const size: Size = useWindowSize();
  const mobileScreen = size.width < parseInt(breakpoints[0]);
  const { data: session, status } = useSession();
  const INITIAL_PROFILE_FORM_STATE = {
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
      required: true,
    },
    lastName: {
      value: user?.lastName || "",
      error: null,
      type: "text",
      label: "Last Name",
      required: true,
    },
    address: {
      value: user?.address || "",
      error: null,
      type: "textarea",
      label: "Address",
      required: true,
      rows: 3,
      grow: true,
      placeholder: `123 Main St
Apt 2
Kalamazoo, MI 49009`,
    },
    phone: {
      value: user?.phone || "",
      error: null,
      type: "text",
      inputMode: "numeric",
      minLength: 10,
      maxLength: 11,
      label: "Phone",
      required: true,
    },
    altPhone: {
      value: user?.altPhone || "",
      error: null,
      type: "text",
      inputMode: "numeric",
      minLength: 10,
      maxLength: 11,
      label: "Alt Phone",
      required: true,
    },
    emergencyContactName: {
      value: user?.emergencyContactName || "",
      error: null,
      label: "Emergency Contact Name",
      required: true,
    },
    emergencyContactPhone: {
      value: user?.emergencyContactPhone || "",
      error: null,
      type: "text",
      inputMode: "numeric",
      minLength: 10,
      maxLength: 11,
      label: "Emergency Contact Phone",
      required: true,
    },
  };
  const [profileFormState, profileFormDispatch] = useReducer(
    profileFormReducer,
    INITIAL_PROFILE_FORM_STATE
  );
  const [formError, setFormError] = useState(undefined);

  useEffect(() => {
    setProfileTab(tab as string);
  }, [tab]);

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

  let allItems = [
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
          initialState={INITIAL_PROFILE_FORM_STATE}
          router={router}
        />
      ),
    },
    {
      label: "Pets",
      key: "pets",
      children: <PetsTab />,
    },
  ];

  if (user.permissions.includes("ADMIN")) {
    allItems.push({
      label: "Settings",
      key: "settings",
      children: <AdminTab />,
    });
  }

  return (
    <Layout>
      <Content>
        <Tabs
          defaultActiveKey={typeof tab === "string" ? tab : "profile"}
          activeKey={typeof tab === "string" ? tab : profileTab}
          tabPosition={mobileScreen ? "top" : "left"}
          size={mobileScreen ? "small" : "large"}
          moreIcon={<DownOutlined />}
          style={{
            fontSize: "inherit",
          }}
          items={allItems}
          onChange={(key) => {
            router.push(`/profile?tab=${key}`, undefined, { shallow: true });
          }}
        />
      </Content>
    </Layout>
  );
};

export default Profile;
