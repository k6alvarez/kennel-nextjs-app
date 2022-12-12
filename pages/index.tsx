import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { defaultDelay } from "../components/ui-kit/Promo";
import { Content } from "../components/ui-kit/Base";
import { Promos } from "../components/ui-kit/Promo/Promos";
import { useLocalStorage } from "../components/ui-kit/hooks/useLocalStorage";
import { EditForm } from "../components/Forms/styles";
import { Tiptap } from "../components/ui-kit/Tiptap";
import { ThemePreferenceContext } from "./_app";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";

export function isTimeStampExpired(expiryValue) {
  if (expiryValue === null) return true;
  const currentTimeStamp = new Date().getTime();
  const local = JSON.parse(expiryValue) || {};
  return currentTimeStamp > local;
}

const saveContent = async ({ html, setLoading = undefined, contentId }) => {
  setLoading && setLoading(true);
  try {
    await fetch(`/api/content-item/${contentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: html }),
    });
    setLoading && setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading && setLoading(false);
  }
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const contentItems = await prisma.contentItem.findMany({
    where: {
      page: "HOME",
    },
  });

  return {
    props: { contentItems: JSON.stringify(contentItems) },
  };
};

const MyApp = ({ contentItems }) => {
  const [expiry, setExpiry] = useLocalStorage<number>("homePageAnimate", null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { editMode } = useContext(ThemePreferenceContext);
  const [isLoading, setIsLoading] = useState(false);

  const homeContent = JSON.parse(contentItems).find(
    (item) => item.name === "homeContent"
  );
  const missionStatement = JSON.parse(contentItems).find(
    (item) => item.name === "missionStatement"
  );

  useEffect(() => {
    // setContent(JSON.parse(contentItems));
    if (isTimeStampExpired(expiry)) {
      // set expiry to 24 hours from now
      setExpiry(new Date().getTime() + 24 * 60 * 60 * 1000);
      setShouldAnimate(true);
    }
  }, []);

  return (
    <Layout>
      {/* <Promo
        animate={shouldAnimate}
        showFooter
        promos={[
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585006907/gk-app/gkplays.jpg",
            size: "20vw",
          },
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585006544/gk-app/gktwopups.jpg",
            size: "20vw",
          },
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585005125/gk-app/gk_home_01.jpg",
            size: "20vw",
          },
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419325/gk-app/Aggie2_playtime.jpg",
            size: "20vw",
          },
        ]}
      /> */}

      <Content>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={homeContent.content || ""}
              onSave={(html) => {
                saveContent({
                  html,
                  contentId: homeContent.id,
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: homeContent.content }} />
        )}

        <iframe
          src="https://www.youtube-nocookie.com/embed/586iqAqMYl4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Content>
      <Promos
        delay={defaultDelay * 6}
        promos={[
          {
            title: "We board cats!",
            description: "We have a cattery for your cat's stay.",
            link: "/boarding?tab=boarding-cats",
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419343/gk-app/Kitty_window.jpg",
          },
          {
            title: "Vaccinations",
            description: "See our list of required vaccinations.",
            link: "/boarding?tab=vaccinations",
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419325/gk-app/Addie3.jpg",
          },
          {
            title: "Before you board",
            link: "/boarding?tab=before-boarding",
            description: "Learn more about our boarding services.",
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585005807/gk-app/gkrun.jpg",
          },
        ]}
      />
      <Content>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={missionStatement.content || ""}
              onSave={(html) => {
                saveContent({
                  html,
                  contentId: missionStatement.id,
                  setLoading: setIsLoading,
                });
              }}
              isLoading={isLoading}
            />
          </EditForm>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: missionStatement.content }} />
        )}
      </Content>
    </Layout>
  );
};

export default MyApp;
