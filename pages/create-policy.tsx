import React, { useState } from "react";
import Layout from "../components/Layout";
import { Content } from "../components/ui-kit/Base";
import { getSession, useSession } from "next-auth/react";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";
import { EditForm, StyledInput, StyledLabel } from "../components/Forms/styles";
import { Tiptap } from "../components/ui-kit/Tiptap";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";
import { message } from "antd";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: {} };
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

const CreatePolicy = ({ user }) => {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const resetForm = () => {
    setName("");
    setContent("");
  };

  if (status === "loading") {
    return (
      <Layout>
        <Content>
          <div>
            <LoadingOutlined rev={undefined} /> Loading...
          </div>
        </Content>
      </Layout>
    );
  }

  if (!session || !user.permissions.includes("ADMIN")) {
    return (
      <Layout>
        <Content>
          <h1>
            <LockOutlined rev={undefined} /> Restricted Area
          </h1>
          <div>You need to be authenticated to view this page.</div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content>
        <h1>Create New Policy</h1>
        <StyledLabel htmlFor="name">Name of Policy</StyledLabel>
        <StyledInput
          autoFocus
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
          id="name"
        />
        <StyledLabel htmlFor="content">Policy Description</StyledLabel>
        <EditForm onSubmit={(e) => e.preventDefault()}>
          <Tiptap
            content={content}
            onSave={(html, editor) => {
              const body = { name, content: html };
              fetch("/api/policy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              })
                .then(() => {
                  resetForm();
                  editor.commands.setContent("");
                  message.success("Policy Created Successfully");
                  document.getElementById("name").focus();
                })
                .catch((err) => console.log(err));
            }}
            buttonText="Add New Policy"
          />
        </EditForm>
      </Content>
    </Layout>
  );
};

export default CreatePolicy;
