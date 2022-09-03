import React from "react";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

import Layout from "../components/Layout";
import { Content } from "../components/ui-kit/Base";
import { PostProps } from "../components/Post";
import { getSession } from "next-auth/react";
import { User } from "@prisma/client";
import { getUserName } from "../components/Profile/helpers";

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

async function updateProfile(
  e: React.SyntheticEvent,
  { xstate, xsetFormError, xdispatch }
): Promise<void> {
  e?.preventDefault();
  const data = Object.entries(xstate).map(([key, _value]) => {
    return {
      [key]: xstate[key].value !== undefined ? xstate[key].value : xstate[key],
    };
  });
  xsetFormError(undefined);
  try {
    await fetch(`/api/profile/${xstate.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then(async (res) => {
        if (res.errors) {
          const validationError =
            "Form submission failed. Please verify all required fields are filled out.";
          Object.entries(res.errors).forEach(([key, value]) => {
            xdispatch({
              key: key,
              payload: {
                newValue: xstate[key].value,
                error: value,
              },
            });
          });
          xsetFormError(validationError);
          throw new Error(validationError);
        }
        xdispatch({
          type: "resetForm",
        });
      });
  } catch (error) {
    console.error(error);
  }
}

type Props = {
  feed: PostProps[];
  user: User | null;
};

const Profile: React.FC<Props> = ({ user }) => {
  return (
    <Layout>
      <Content>
        <h1>
          {user.permissions.includes("ADMIN")
            ? "Admin"
            : user.permissions.includes("EMPLOYEE")
            ? "Employee"
            : "Admin"}{" "}
          Profile
        </h1>
        <p>Signed in as {getUserName(user)}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // updateProfile(e, { xstate, xsetFormError, xdispatch });
          }}
        >
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" defaultValue={user.name} />
        </form>
        {Object.entries(user).map(([key, value]) => {
          return (
            <p>
              {key}: {value}
            </p>
          );
        })}
      </Content>
    </Layout>
  );
};

export default Profile;
