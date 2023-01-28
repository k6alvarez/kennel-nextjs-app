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
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  width: fit-content;

  input {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
`;

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

const CreateService = ({ user }) => {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");
  const [available, setAvailable] = useState(true);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setDuration("");
    setDailyLimit("");
    setAvailable(true);
  };

  if (status === "loading") {
    return (
      <Layout>
        <Content>
          <div>
            <LoadingOutlined /> Loading...
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
            <LockOutlined /> Restricted Area
          </h1>
          <div>You need to be authenticated to view this page.</div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout>
      <Content>
        <h1>Create New Service</h1>
        <StyledLabel htmlFor="name">Name of Service</StyledLabel>
        <StyledInput
          autoFocus
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
          id="name"
        />
        <br />
        <br />

        <StyledLabel htmlFor="price">Price</StyledLabel>
        <StyledInput
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          value={price}
          id="price"
        />
        <br />
        <br />

        <StyledLabel htmlFor="duration">Duration (e.g 15 min)</StyledLabel>
        <StyledInput
          onChange={(e) => setDuration(e.target.value)}
          type="text"
          value={duration}
          id="duration"
        />
        <br />
        <br />

        <StyledLabel htmlFor="dailyLimit">Daily Limit</StyledLabel>
        <StyledInput
          onChange={(e) => setDailyLimit(e.target.value)}
          type="text"
          value={dailyLimit}
          id="dailyLimit"
        />
        <br />
        <br />

        <Flex>
          <StyledLabel htmlFor="available">
            <StyledInput
              onChange={(e) => setAvailable(e.target.checked)}
              type="checkbox"
              checked={available}
              id="available"
            />
            Service Available: <br />
          </StyledLabel>
        </Flex>
        <p>
          When checked, this service will be available for users to book. When
          unchecked, this service will not be available for users to book. This
          is useful if you want to temporarily disable a service.
        </p>
        <br />
        <StyledLabel htmlFor="description">Service Description</StyledLabel>
        <EditForm onSubmit={(e) => e.preventDefault()}>
          <Tiptap
            content={description}
            onSave={(html, editor) => {
              const body = {
                name,
                description: html,
                price,
                duration,
                dailyLimit,
                available,
              };
              fetch("/api/service", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              })
                .then(() => {
                  resetForm();
                  editor.commands.setContent("");
                  message.success("Service Created Successfully");
                })
                .catch((err) => console.log(err));
            }}
            buttonText="Add New Service"
          />
        </EditForm>
      </Content>
    </Layout>
  );
};

export default CreateService;
