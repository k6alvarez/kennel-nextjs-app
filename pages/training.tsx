import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tabs } from "antd";

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
import { isTimeStampExpired } from ".";

const Training: React.FC = () => {
  const router = useRouter();
  const { tab } = router.query;
  const [activeKey, setActiveKey] = useState("training");
  const [expiry, setExpiry] = useLocalStorage<number>(
    "trainingPageAnimate",
    null
  );
  const [shouldAnimate, setShouldAnimate] = useState(false);

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
    { label: "Training", key: "training", children: <TrainingHome /> },
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
        promos={[
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419353/gk-app/sage_training.png",
            title: "",
            description: "",
          },
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419352/gk-app/SadieMae_101920.jpg",
            title: "",
            description: "",
          },
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1666419354/gk-app/Winsten_BS.jpg",
            title: "",
            description: "",
          },
        ]}
        title="the way in conscientious dog training and client education."
        description="Our classes range from puppy head start classes to basic, intermediate, and advanced levels!"
      >
        <span>
          <PromoTitle>Kirk L. Gillette</PromoTitle> continues to lead,
        </span>{" "}
      </Promo>
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
