import React, { useContext, useReducer, useState } from "react";
import { GetServerSideProps } from "next";
import { message, Collapse, Tabs } from "antd";
import prisma from "../lib/prisma";

import Layout from "../components/Layout";
import { Content } from "../components/ui-kit/Base";
import { PostProps } from "../components/Post";
import { getSession, useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { getProfileHeader, getUserName } from "../components/Profile/helpers";
import { profileFormReducer } from "../components/Profile/profileFormReducer";
import { profileFormSubmit } from "../components/Profile/services";
import { Error, Fields, Fieldset } from "../components/Forms/styles";
import { renderFormFields } from "../components/Forms/renderFormFields";
import { statesArray } from "../components/Reservations/formInitialState";
import { DownOutlined } from "@ant-design/icons";
import { headerHt } from "./boarding";
import { Size, useWindowSize } from "../components/ui-kit/hooks/useWindowSize";
import { ThemePreferenceContext } from "./_app";
import { ProfileForm } from "../components/Profile/ProfileForm";
import { PetsForm } from "../components/Pets/PetsForm";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { reservations: [], guestReservations: [] } };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: {
      feed,
      user: JSON.parse(JSON.stringify(user)),
      revalidate: 10,
    },
  };
};

type Props = {
  feed: PostProps[];
  user: User | null;
};

const Profile: React.FC<Props> = ({ user }) => {
  const { breakpoints } = useContext(ThemePreferenceContext);
  const size: Size = useWindowSize();
  const mobileScreen = size.width < parseInt(breakpoints[0]);
  const { data: session } = useSession();
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
    addressUnit: {
      value: user?.addressUnit || "",
      error: null,
      type: "text",
      label: "Apt/Unit/Ste",
    },
    city: {
      value: user?.city || "",
      error: null,
      type: "text",
      label: "City",
    },
    state: {
      value: user?.state || "MI",
      error: null,
      type: "select",
      options: statesArray,
      label: "State",
    },
    zip: {
      value: user?.zip || "",
      error: null,
      type: "text",
      inputMode: "numeric",
      minLength: 5,
      maxLength: 5,
      label: "Zip",
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
      key: "item-1",
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
      key: "item-2",
      children: <PetsForm />,
    },
  ];

  return (
    <Layout>
      <Content>
        <Tabs
          defaultActiveKey="1"
          tabPosition={mobileScreen ? "top" : "left"}
          size={mobileScreen ? "small" : "large"}
          moreIcon={<DownOutlined />}
          style={{
            fontSize: "inherit",
          }}
          items={items}
        />
      </Content>
    </Layout>
  );
};

export default Profile;
