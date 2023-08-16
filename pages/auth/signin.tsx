import { Provider } from "next-auth/providers";
import {
  signIn,
  getCsrfToken,
  getProviders,
  getSession,
} from "next-auth/react";
import { useRouter } from "next/router";
import { Field, StyledInput, StyledLabel } from "../../components/Forms/styles";
import Layout from "../../components/Layout";
import { BlockQuote } from "../../components/Reservations/GuestClients/FormIntro";
import { Button, Content } from "../../components/ui-kit/Base";
import { cookiesAgreement } from "../../utils/renderHelpers";

const Signin = ({ csrfToken, providers }) => {
  const router = useRouter();
  const { status } = router.query;
  return (
    <Layout>
      <Content>
        <h1>Create Profile</h1>
        {status === "existingClient" ? (
          <>
            <p>
              Welcome to Gillette Kennels. As an exiting client, please enter
              your email address to create a profile. You will recieve an email
              with a link to verify your account details. Once verified, you
              will be able to book a reservation and manage your account.
            </p>
            <BlockQuote>
              <p>{cookiesAgreement}</p>
            </BlockQuote>
          </>
        ) : (
          <p>
            Welcome back! Login to take advantage of our online boarding
            features.
          </p>
        )}

        <form method="post" action="/api/auth/signin/email">
          <fieldset>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <input name="status" type="hidden" defaultValue={status} />
            <Field setWidth="36vw">
              <StyledLabel htmlFor="email">Email Address:</StyledLabel>
              <StyledInput name="email" type="text" id="email" />
            </Field>
          </fieldset>
          <Button type="submit" primary>
            Log In
          </Button>
        </form>
        {Object.values(providers).map((provider: Provider) => {
          if (provider.name === "Email") {
            return;
          }
          return (
            <div key={provider.name}>
              <Button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </Button>
            </div>
          );
        })}
      </Content>
    </Layout>
  );
};

export default Signin;

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
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
}
