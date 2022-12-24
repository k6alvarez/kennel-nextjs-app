import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { Content } from "../components/ui-kit/Base";
import { useSession } from "next-auth/react";
import { LoadingOutlined, LockOutlined } from "@ant-design/icons";

const CreateContent: React.FC = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [page, setPage] = useState("HOME");

  const resetForm = () => {
    setName("");
    setContent("");
    setPage("HOME");
  };

  const submitPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, content, page };
      await fetch("/api/content-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      resetForm();
    } catch (error) {
      console.error(error);
    }
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

  if (!session) {
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
        <form onSubmit={submitPost}>
          <h1>Create Content Item</h1>
          <label htmlFor="name">Name of Content Item</label>
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
            onChange={(e) => {
              setPage(e.target.value);
            }}
          >
            <option value="HOME">Home</option>
            <option value="BOARDING">Boarding</option>
            <option value="TRAINING">Training</option>
            <option value="POLICIES">Policies</option>
            <option value="RATES">Rates</option>
            <option value="CONTACT">Contact</option>
          </select>
          <label htmlFor="content">Content</label>
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
            id="content"
          />
          <input disabled={!content || !name} type="submit" value="Create" />
          <a href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </Content>
    </Layout>
  );
};

export default CreateContent;
