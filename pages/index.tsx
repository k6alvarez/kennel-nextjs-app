import React, { useContext, useState } from "react";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";

import Layout from "../components/Layout";
import { defaultDelay, Promo } from "../components/ui-kit/Promo";
import { Content } from "../components/ui-kit/Base";
import { Promos } from "../components/ui-kit/Promo/Promos";
import { EditForm } from "../components/Forms/styles";
import { Tiptap } from "../components/ui-kit/Tiptap";
import { ThemePreferenceContext } from "./_app";
import { saveContent } from "../components/Admin/services";

export const defaultContent = {
  content: "",
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const page = "HOME";
  const contentItems = await prisma.contentItem.findMany({
    where: {
      page,
    },
  });

  const promoItems = await prisma.promoItem.findMany({
    where: {
      page,
    },
  });

  return {
    props: {
      contentItems: JSON.stringify(contentItems),
      promoItems: JSON.stringify(promoItems),
    },
  };
};

const MyApp = ({ contentItems, promoItems }) => {
  const { editMode } = useContext(ThemePreferenceContext);
  const [isLoading, setIsLoading] = useState(false);
  const parsedContentItems = JSON.parse(contentItems);
  const parsedPromoItems = JSON.parse(promoItems);

  const [homeContent, setHomeContent] = useState(
    parsedContentItems.find((item) => item.name === "homeContent")
  );
  const [missionStatement, setMissionStatement] = useState(
    parsedContentItems.find((item) => item.name === "missionStatement")
  );

  const [homeCallouts, setHomeCallouts] = useState(
    parsedPromoItems.filter((item) => item.promoGroup === "callouts") || []
  );

  const [homePromoTitle, setHomePromoTitle] = useState(
    parsedContentItems.find((item) => item.name === "homePromoTitle") || []
  );

  const [homeBanner, setHomeBanner] = useState([
    parsedPromoItems.find((item) => item.name === "homeBanner"),
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Promo
        animate={false}
        promos={homeBanner}
        setPromos={setHomeBanner}
        bannerMode
      />
      <Promo
        animate={false}
        contentItem={homePromoTitle}
        setContentItem={setHomePromoTitle}
        bannerMode
      />
      <Content>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={homeContent?.content || { content: "" }}
              onSave={(html) => {
                setHomeContent({
                  content: html,
                });
                saveContent({
                  apiPath: `/api/content-item/${homeContent.id}`,
                  payload: { content: html },
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: homeContent?.content }} />
        )}
        <Promos
          delay={defaultDelay * 6}
          promos={homeCallouts}
          setPromos={setHomeCallouts}
          editMode={editMode}
          transparent
        />
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={missionStatement?.content || { content: "" }}
              onSave={(html) => {
                setMissionStatement({
                  content: html,
                });
                saveContent({
                  payload: { content: html },
                  apiPath: `/api/content-item/${missionStatement.id}`,
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: missionStatement?.content }}
          />
        )}
      </Content>
    </Layout>
  );
};

export default MyApp;
