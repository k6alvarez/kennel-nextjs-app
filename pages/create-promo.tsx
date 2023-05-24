import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { Content } from "../components/ui-kit/Base";
import { LockOutlined } from "@ant-design/icons";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

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

const CreatePromo = ({ user }) => {
  const { data: session } = useSession();
  const [page, setPage] = useState("HOME");
  const [name, setName] = useState("");
  const [promoGroup, setPromoGroup] = useState("");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const resetForm = () => {
    setPage("HOME");
    setPromoGroup("");
    setImage("");
    setSize("");
    setTitle("");
    setDescription("");
    setLink("");
    setName("");
  };

  const submitPromo = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        page,
        promoGroup,
        image,
        size,
        title,
        description,
        link,
        name,
      };
      await fetch("/api/promo-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // await Router.push("/drafts");
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

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
        <form onSubmit={submitPromo}>
          <h1>Create Promo Item</h1>
          <label htmlFor="name">Name of Promo Item</label>
          <input
            autoFocus
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            id="name"
          />
          <label htmlFor="page">
            Page - Select the page where this content will appear.
          </label>
          <select
            name="page"
            id="page"
            value={page}
            onChange={(e) => setPage(e.target.value)}
          >
            <option value="HOME">Home</option>
            <option value="BOARDING">Boarding</option>
            <option value="TRAINING">Training</option>
            <option value="POLICIES">Policies</option>
            <option value="RATES">Rates</option>
            <option value="CONTACT">Contact</option>
            <option value="RESERVATIONS">Reservations</option>
          </select>
          <label htmlFor="promoGroup">
            Group Name - Items will be grouped together by their group name.
          </label>
          <input
            onChange={(e) => setPromoGroup(e.target.value)}
            type="text"
            value={promoGroup}
            id="promoGroup"
          />
          <label htmlFor="image">Image URL</label>
          <input
            onChange={(e) => setImage(e.target.value)}
            type="text"
            value={image}
            id="image"
          />
          <label htmlFor="size">Size</label>
          <select
            name="size"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Default</option>
            <option value="33vh">Small</option>
            <option value="50vh">Medium</option>
            <option value="75vh">Large</option>
          </select>
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            id="title"
          />
          <label htmlFor="description">Description</label>
          <input
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            value={description}
            id="description"
          />
          <label htmlFor="link">Link</label>
          <input
            onChange={(e) => setLink(e.target.value)}
            type="text"
            value={link}
            id="link"
          />
          <input type="submit" value="Create" />
          <a href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </Content>
    </Layout>
  );
};

export default CreatePromo;
