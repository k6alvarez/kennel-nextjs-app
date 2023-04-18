import React, { useContext, useEffect } from "react";
import { Collapse } from "antd";
import { getSession } from "next-auth/react";
import Layout from "../components/Layout";
import { withTheme } from "styled-components";
import prisma from "../lib/prisma";
import { AppSettingsContext } from "./_app";
import { AppSettingsForm } from "../components/Admin/AppSettingsForm";

const { Panel } = Collapse;

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  const appSettings = await prisma.appSetting.findMany({});

  if (!session) {
    res.statusCode = 403;
    return {
      props: {
        user: null,
        appSettings: JSON.stringify(appSettings),
        contentItems: {},
      },
    };
  }

  const page = "HOME";
  const contentItems = await prisma.contentItem.findMany({
    where: {
      page,
    },
  });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      appSettings: JSON.stringify(appSettings),
      contentItems: JSON.stringify(contentItems),
    },
  };
};

const AppSettings = ({ theme, user, appSettings, contentItems }) => {
  if (!user?.permissions.includes("ADMIN")) {
    return <Layout>Not authorized</Layout>;
  }

  const { setAppSettings, formAppSettingsDispatch } =
    useContext(AppSettingsContext);

  useEffect(() => {
    if (appSettings) {
      const appSetting = JSON.parse(appSettings)[0];

      appSetting &&
        Object.keys(appSetting).forEach((key) => {
          formAppSettingsDispatch({
            key,
            payload: {
              newValue: appSetting[key] || "",
              error: null,
            },
          });
        });

      appSetting && setAppSettings({ ...appSetting });
    }
  }, [appSettings]);

  return (
    <Layout>
      <h1>App Settings</h1>
      <Collapse defaultActiveKey={1}>
        <Panel header="App Settings" key="1">
          <AppSettingsForm />
        </Panel>
      </Collapse>
    </Layout>
  );
};

export default withTheme(AppSettings);
