import { getSession } from "next-auth/react";
import Layout from "../../components/Layout";
import { Content } from "../../components/ui-kit/Base";

const getError = (error) => {
  switch (error) {
    case "AccessDenied":
      return (
        <>
          <h1>Access Restricted</h1>
          <p>You don't have permission to access this page.</p>
        </>
      );
    case "Configuration":
      return (
        <>
          <h1>Server Error</h1>
          <p>
            We're sorry. There is a problem with our login. We are working to
            fix the issue, please try again later.
          </p>
        </>
      );
    case "Verification":
      return (
        <>
          <h1>Verification Error</h1>
          <p>We're sorry. Please verify your email address and try again.</p>
        </>
      );

    default:
      return (
        <>
          <h1>Error</h1>
          <p>An error has occured. Please try logging in again.</p>
        </>
      );
  }
};

const Error = ({ error }) => {
  return (
    <Layout>
      <Content>{getError(error)}</Content>
    </Layout>
  );
};

export default Error;

export async function getServerSideProps(context) {
  const { req, res, query } = context;
  const session = await getSession({ req });

  if (session && res) {
    res.writeHead(302, { Location: "/profile" });
    res.end();
    return;
  }

  return {
    props: {
      session: null,
      error: query.error,
    },
  };
}
