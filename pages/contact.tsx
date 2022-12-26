import React from "react";
import { GeneralContactForm } from "../components/GeneralContactForm";
import Layout from "../components/Layout";
import { Content } from "../components/ui-kit/Base";

const Contact: React.FC = () => {
  return (
    <Layout>
      <Content>
        <h1>Contact Us</h1>
        <GeneralContactForm subject="Contact Us" />
      </Content>
    </Layout>
  );
};

export default Contact;
