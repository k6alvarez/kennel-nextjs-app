import React, { useContext, useEffect, useState } from "react";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";

import Layout from "../components/Layout";
import { defaultDelay, Promo } from "../components/ui-kit/Promo";
import { Content } from "../components/ui-kit/Base";
import { Promos } from "../components/ui-kit/Promo/Promos";
import { useLocalStorage } from "../components/ui-kit/hooks/useLocalStorage";
import { EditForm } from "../components/Forms/styles";
import { Tiptap } from "../components/ui-kit/Tiptap";
import { ThemePreferenceContext } from "./_app";
import { isTimeStampExpired, saveContent } from "../components/Admin/services";

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
  const [expiry, setExpiry] = useLocalStorage<number>("homePageAnimate", null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { editMode } = useContext(ThemePreferenceContext);
  const [isLoading, setIsLoading] = useState(false);
  const parsedContentItems = JSON.parse(contentItems);
  const parsedPromoItems = JSON.parse(promoItems);
  const homeContent = parsedContentItems.find(
    (item) => item.name === "homeContent"
  );
  const missionStatement = parsedContentItems.find(
    (item) => item.name === "missionStatement"
  );

  const homePromos = parsedPromoItems.filter(
    (item) => item.promoGroup === "gallery"
  );

  const homeCallouts = parsedPromoItems.filter(
    (item) => item.promoGroup === "callouts"
  );

  const homePromoTitle = parsedContentItems.find(
    (item) => item.name === "homePromoTitle"
  );

  useEffect(() => {
    if (isTimeStampExpired(expiry)) {
      // set expiry to 24 hours from now
      setExpiry(new Date().getTime() + 24 * 60 * 60 * 1000);
      setShouldAnimate(true);
    }
  }, []);

  return (
    <Layout>
      <Promo
        animate={shouldAnimate}
        showFooter
        promos={homePromos}
        homePromoTitle={homePromoTitle || { content: "" }}
      />
      <Content>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={homeContent?.content || { content: "" }}
              onSave={(html) => {
                saveContent({
                  apiPath: `/api/content-item/${homeContent.id}`,
                  html,
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: homeContent?.content }} />
        )}

        <iframe
          src="https://www.youtube-nocookie.com/embed/586iqAqMYl4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Content>
      <Promos delay={defaultDelay * 6} promos={homeCallouts} />
      <Content>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={missionStatement?.content || { content: "" }}
              onSave={(html) => {
                saveContent({
                  html,
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
