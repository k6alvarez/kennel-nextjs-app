import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { Content } from "../../components/ui-kit/Base";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const reservation = await prisma.guestReservation.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: {
      reservation: JSON.parse(JSON.stringify(reservation)),
    },
  };
};

// async function publishPost(id: string): Promise<void> {
//   await fetch(`/api/publish/${id}`, {
//     method: "PUT",
//   });
//   await Router.push("/");
// }

// async function deletePost(id: string): Promise<void> {
//   await fetch(`/api/post/${id}`, {
//     method: "DELETE",
//   });
//   Router.push("/");
// }

interface GuestReservation {
  id: string;
}

export type GuestReservationProps = {
  id: string;
  reservation: GuestReservation;
};

const GuestReservation: React.FC<GuestReservationProps> = ({ reservation }) => {
  //   const { data: session, status } = useSession();
  //   if (status === "loading") {
  //     return <div>Loading ...</div>;
  //   }
  //   const userHasValidSession = Boolean(session);
  //   const postBelongsToUser = session?.user?.email === props.author?.email;
  //   let title = props.title;
  //   if (!props.published) {
  //     title = `${title} (Draft)`;
  //   }

  return (
    <Layout>
      <Content>
        <h1>Your Reservation</h1>
        <p>
          You can view your reservation details here. We have also emailed you a
          link to this page.
        </p>
        <p>By {reservation?.id}</p>
        {/* <h1>{title}</h1> */}
        {/* <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => deletePost(props.id)}>Delete</button>
        )} */}
      </Content>
    </Layout>
  );
};

export default GuestReservation;
