import { providerMap, signIn } from "@/auth";
import ContentItem from "@/components/content/ContentItem";
import { Content } from "@/components/ui/Content";
import { Button, Input } from "antd";
import React from "react";

const SignInPage = ({
  searchParams,
}: {
  searchParams: {
    status: string;
  };
}) => {
  return (
    <Content>
      {searchParams.status === "existingClient" ? (
        <ContentItem page="SIGNIN" section="MAIN" name="signinExistingClient" />
      ) : (
        <ContentItem page="SIGNIN" section="MAIN" name="signinContent" />
      )}
      <div className="p-6 rounded-2xl border max-w-lg mx-auto">
        <h1 className="mt-0">Sign In</h1>
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async (formData) => {
              "use server";
              let options = {
                email: provider.id === "nodemailer" && formData.get("email"),
                redirectTo: "/profile",
              };
              await signIn(provider.id, options);
            }}
            className="flex flex-col gap-4 mt-4 justify-center items-start"
          >
            {provider.id === "nodemailer" ? (
              <>
                <Input type="email" name="email" placeholder="Email" />
                <Button htmlType="submit" type="primary">
                  <span>Sign in with Email</span>
                </Button>
              </>
            ) : (
              <Button htmlType="submit" type="primary">
                <span>Sign in with {provider.name}</span>
              </Button>
            )}
          </form>
        ))}
      </div>
    </Content>
  );
};

export default SignInPage;
