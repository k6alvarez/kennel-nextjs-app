import React, { useReducer, useState } from "react";
import { GetServerSideProps } from "next";
import { message, Collapse } from "antd";
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

  return (
    <Layout>
      <Content>
        <h1>{getProfileHeader(user?.permissions || [])}</h1>
        <p>{getUserName(user)}</p>
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel header="Profile Details" key="1">
            <form
              onSubmit={async (e) => {
                await profileFormSubmit(e, {
                  state: profileFormState,
                  setFormError,
                  dispatch: profileFormDispatch,
                  userId: user.id,
                }).then(() => {
                  message.success("Profile updated successfully");
                });
              }}
            >
              {formError && <Error>{formError}</Error>}
              <Fieldset>
                <Fields>
                  {renderFormFields({
                    initialState: INITIAL_PROFILE_STATE,
                    state: profileFormState,
                    handleChange: (name: string, newValue: any) => {
                      const error = null;
                      profileFormDispatch({
                        key: name,
                        payload: { newValue, error },
                      });
                    },
                  })}
                </Fields>
                <input type="submit" value="Update Profile" />
              </Fieldset>
            </form>
          </Collapse.Panel>
        </Collapse>
      </Content>
    </Layout>
  );
};

export default Profile;
