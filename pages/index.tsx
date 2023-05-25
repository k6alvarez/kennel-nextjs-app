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
import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import { PromoFooter } from "../components/ui-kit/Promo/styles-promo";

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
  const [expiry, setExpiry] = useLocalStorage<number>("homePageAnimate", null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
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
  const [homePromos, setHomePromos] = useState(
    parsedPromoItems.filter((item) => item.promoGroup === "gallery")
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

  useEffect(() => {
    if (isTimeStampExpired(expiry)) {
      // set expiry to 24 hours from now
      setExpiry(new Date().getTime() + 24 * 60 * 60 * 1000);
      setShouldAnimate(true);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Promo
        animate={shouldAnimate}
        promos={homeBanner}
        setPromos={setHomeBanner}
        bannerMode
        // showFooter={
        //   <PromoFooter>
        //     <p>9172 East K Ave, Galesburg MI, 49053</p>
        //     <ul>
        //       <li>
        //         <a
        //           target="_blank"
        //           href="https://www.facebook.com/gillettekennels1/"
        //         >
        //           <FacebookOutlined />
        //         </a>
        //       </li>
        //       <li>
        //         <a
        //           target="_blank"
        //           href="https://www.instagram.com/gillettekennels/"
        //         >
        //           <InstagramOutlined />
        //         </a>
        //       </li>
        //     </ul>
        //   </PromoFooter>
        // }
      />
      <Promo
        animate={shouldAnimate}
        showFooter={
          <PromoFooter>
            <p>9172 East K Ave, Galesburg MI, 49053</p>
            <ul>
              <li>
                <a
                  target="_blank"
                  href="https://www.facebook.com/gillettekennels1/"
                >
                  <FacebookOutlined />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.instagram.com/gillettekennels/"
                >
                  <InstagramOutlined />
                </a>
              </li>
            </ul>
          </PromoFooter>
        }
        promos={homePromos}
        setPromos={setHomePromos}
        contentItem={homePromoTitle}
        setContentItem={setHomePromoTitle}
        sliderMode
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
      </Content>
      <Promos
        delay={defaultDelay * 6}
        promos={homeCallouts}
        setPromos={setHomeCallouts}
        editMode={editMode}
        transparent
      />
      <Content>
        {editMode ? (
          <EditForm onSubmit={(e) => e.preventDefault()}>
            <Tiptap
              content={missionStatement?.content || { content: "" }}
              onSave={(html) => {
                setMissionStatement({
                  content: html,
                });
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
