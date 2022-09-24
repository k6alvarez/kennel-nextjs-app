import React from "react";
import Layout from "../components/Layout";
import { Content } from "../components/ui-kit/Base";

export const Custom404 = () => {
  return (
    <Layout>
      <Content>
        <h1>404 - Page Not Found</h1>
        <p>
          This page was not found. Check the url or navigate to another page.
        </p>
      </Content>
    </Layout>
  );
};

export default Custom404;
