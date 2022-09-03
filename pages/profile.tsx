import React, { useReducer, useState } from "react";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

import Layout from "../components/Layout";
import { Content } from "../components/ui-kit/Base";
import { PostProps } from "../components/Post";
import { getSession } from "next-auth/react";
import { User } from "@prisma/client";
import { getProfileHeader, getUserName } from "../components/Profile/helpers";
import { profileFormReducer } from "../components/Profile/profileFormReducer";
import { profileFormSubmit } from "../components/Profile/services";
import { Error, Fields, Fieldset } from "../components/Forms/styles";
import { renderFormFields } from "../components/Forms/renderFormFields";

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
  const INITIAL_PROFILE_STATE = {
    email: {
      value: user?.email || "",
      error: null,
      type: "text",
      inputMode: "email",
      label: "Email",
      disabled: true,
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
      options: ["AL"],
      label: "State",
    },
    zip: {
      value: user?.zip || "",
      error: null,

      type: "text",
      label: "Zip",
    },
    phone: {
      value: user?.phone || "",
      error: null,
      type: "text",
      label: "Phone",
    },
  };
  const [profileFormState, profileFormDispatch] = useReducer(
    profileFormReducer,
    INITIAL_PROFILE_STATE
  );
  const [formError, setFormError] = useState(undefined);
  return (
    <Layout>
      <Content>
        <h1>{getProfileHeader(user.permissions)}</h1>
        <p>{getUserName(user)}</p>
        <form
          onSubmit={(e) => {
            profileFormSubmit(e, {
              state: profileFormState,
              setFormError,
              dispatch: profileFormDispatch,
              userId: user.id,
            });
          }}
        >
          {formError && <Error>{formError}</Error>}
          <Fieldset>
            <Fields gridColumns="1fr">
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
          </Fieldset>
        </form>
      </Content>
    </Layout>
  );
};

export default Profile;
