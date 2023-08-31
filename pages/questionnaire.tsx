import React from "react";
import Layout from "../components/Layout";
import { Content } from "../components/ui-kit/Base";
import { QuestionnaireForm } from "../components/Forms/questionnaireForm";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return {
      props: {
        reservations: [],
        guestReservations: [],
      },
    };
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

const Questionnaire = ({ user }) => {
  return (
    <Layout>
      <Content>
        <h1>Gillette Kennels Pet Questionnaire</h1>
        <p>
          Please make sure you complete all required fields, as indicated by
          (*).
        </p>
        <QuestionnaireForm user={user} />
      </Content>
    </Layout>
  );
};

export default Questionnaire;
