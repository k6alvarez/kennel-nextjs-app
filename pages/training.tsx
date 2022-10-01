import React from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";

import Layout from "../components/Layout";
import { PostProps } from "../components/Post";
import { Promo } from "../components/ui-kit/Promo";
import { Content } from "../components/ui-kit/Base";
import { PromoTitle } from "../components/ui-kit/Promo/styles-promo";
import { Tabs } from "antd";
import { headerHt } from "./boarding";
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
  const items = [
    { label: "Training", key: "item-1", children: <TrainingHome /> },
    { label: "Group Lessons", key: "item-2", children: <GroupLessons /> },
    { label: "Private Lessons", key: "item-3", children: <PrivateLessons /> },
    { label: "Agility", key: "item-4", children: <AgilityLessons /> },
    { label: "Consultations", key: "item-5", children: <Consultations /> },
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
      <Content>
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          size="large"
          style={{
            fontSize: "inherit",
          }}
          items={items}
        />
      </Content>
    </Layout>
  );
};

export default Training;
