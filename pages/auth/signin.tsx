import { Provider } from "next-auth/providers";
import {
  signIn,
  getCsrfToken,
  getProviders,
  getSession,
} from "next-auth/react";
import { Field, StyledInput, StyledLabel } from "../../components/Forms/styles";
import Layout from "../../components/Layout";
import { Button, Content } from "../../components/ui-kit/Base";

const Signin = ({ csrfToken, providers }) => {
  return (
    <Layout>
      <Content>
        <h1>Log In</h1>
        <p>Login to take advantage of our online boarding features.</p>
        <form method="post" action="/api/auth/signin/email">
          <fieldset>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Field setWidth="36vw">
              <StyledLabel htmlFor="email">Email Address:</StyledLabel>
              <StyledInput name="email" type="text" id="email" />
            </Field>
          </fieldset>
          <Button type="submit">Login</Button>
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
