import { Content } from "@/components/ui/Content";

const AuthenticationError: React.FC = () => {
  return (
    <Content>
      <h1>Authentication Error</h1>
      <>
        There was an error with your authentication. Refresh the page and try
        again. If the problem persists, please contact us.
      </>
    </Content>
  );
};

export default AuthenticationError;
