import React from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import prisma from "../lib/prisma";
import { Tabs } from "antd";

import Layout from "../components/Layout";
import { PostProps } from "../components/Post";
import { Promo } from "../components/ui-kit/Promo";
import { PromoTitle } from "../components/ui-kit/Promo/styles-promo";
import { TabsListWrapper } from "./boarding";
import { TrainingHome } from "../components/Training/TrainingHome";
import { GroupLessons } from "../components/Training/GroupLessons";
import { PrivateLessons } from "../components/Training/PrivateLessons";
import { AgilityLessons } from "../components/Training/AgilityLessons";
import { Consultations } from "../components/Training/Consultations";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Training: React.FC<Props> = (props) => {
  const router = useRouter();
  const { tab } = router.query;
  const items = [
    { label: "Training", key: "training", children: <TrainingHome /> },
    {
      label: "Group Lessons",
      key: "group-lessons",
      children: <GroupLessons />,
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
        promos={[
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585006907/gk-app/gkplays.jpg",
            title: "",
            description: "",
          },
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585005807/gk-app/gkrun.jpg",
            title: "",
            description: "",
          },
          {
            image:
              "https://res.cloudinary.com/dhcv2fdfq/image/upload/v1585005125/gk-app/gk_home_01.jpg",
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
          activeKey={typeof tab === "string" ? tab : "training"}
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
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </TabsListWrapper>
    </Layout>
  );
};

export default Training;
