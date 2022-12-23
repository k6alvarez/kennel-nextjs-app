import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";
import prisma from "../lib/prisma";
import { GetServerSideProps } from "next";

import Layout from "../components/Layout";
import { Promo } from "../components/ui-kit/Promo";
import { PromoTitle } from "../components/ui-kit/Promo/styles-promo";
import { TabsListWrapper } from "./boarding";
import { TrainingHome } from "../components/Training/TrainingHome";
import { GroupLessons } from "../components/Training/GroupLessons";
import { PrivateLessons } from "../components/Training/PrivateLessons";
import { AgilityLessons } from "../components/Training/AgilityLessons";
import { Consultations } from "../components/Training/Consultations";
import { BoardingSchool } from "../components/Training/BoardingSchool";
import { useLocalStorage } from "../components/ui-kit/hooks/useLocalStorage";
import { isTimeStampExpired } from "../components/Admin/services";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const page = "TRAINING";
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

const Training = ({ contentItems, promoItems }) => {
  const router = useRouter();
  const { tab } = router.query;
  const [activeKey, setActiveKey] = useState("training");
  const [expiry, setExpiry] = useLocalStorage<number>(
    "trainingPageAnimate",
    null
  );
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const parsedContentItems = JSON.parse(contentItems);
  const parsedPromoItems = JSON.parse(promoItems);
  const trainingPromos = parsedPromoItems.filter(
    (item) => item.promoGroup === "gallery"
  );

  const trainingPromoTitle = parsedContentItems.find(
    (item) => item.name === "trainingPromoTitle"
  );

  const trainingContent = parsedContentItems.find(
    (item) => item.name === "trainingContent"
  );

  useEffect(() => {
    if (isTimeStampExpired(expiry)) {
      // set expiry to 24 hours from now
      setExpiry(new Date().getTime() + 24 * 60 * 60 * 1000);
      setShouldAnimate(true);
    }
  }, []);
  useEffect(() => {
    if (tab) {
      window.scrollTo({ top: 779, behavior: "smooth" });
      setActiveKey(tab as string);
    }
  }, [tab]);
  const items = [
    {
      label: "Training",
      key: "training",
      children: <TrainingHome trainingContent={trainingContent} />,
    },
    {
      label: "Group Lessons",
      key: "group-lessons",
      children: <GroupLessons />,
    },
    {
      label: "Boarding School",
      key: "boarding-school",
      children: <BoardingSchool />,
    },
    {
      label: "Private Lessons",
      key: "private-lessons",
      children: <PrivateLessons />,
    },
    { label: "Agility", key: "agility", children: <AgilityLessons /> },
    {
      label: "Consultations",
      key: "consultations",
      children: <Consultations />,
    },
  ];
  return (
    <Layout>
      <Promo
        animate={shouldAnimate}
        showFooter
        promos={trainingPromos}
        contentItem={trainingPromoTitle || { content: "" }}
      />
      <TabsListWrapper>
        <Tabs
          defaultActiveKey="training"
          activeKey={activeKey}
          tabPosition="top"
          size="large"
          style={{
            fontSize: "inherit",
          }}
          items={items}
          onTabClick={(key) => {
            router.replace(`/training?tab=${key}`, undefined, {
              shallow: true,
            });
            window.scrollTo({ top: 779, behavior: "smooth" });
          }}
        />
      </TabsListWrapper>
    </Layout>
  );
};

export default Training;
