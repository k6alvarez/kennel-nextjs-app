import { getSession } from "next-auth/react";
import Layout from "../../components/Layout";
import { Content } from "../../components/ui-kit/Base";

const Error = ({}) => {
  return (
    <Layout>
      <Content>
        <h1>Check your email.</h1>
        <p>A sign in link has been sent to your email address.</p>
      </Content>
    </Layout>
  );
};

export default Error;

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res) {
    res.writeHead(302, { Location: "/profile" });
    res.end();
    return;
  }

  return {
    props: {
      session: null,
    },
  };
}
