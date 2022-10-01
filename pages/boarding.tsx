import React, { useContext } from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import { Tabs } from "antd";
import { DownOutlined } from "@ant-design/icons";

import Layout from "../components/Layout";
import { PostProps } from "../components/Post";
import { Promo } from "../components/ui-kit/Promo";
import { Content } from "../components/ui-kit/Base";
import { PromoTitle } from "../components/ui-kit/Promo/styles-promo";
import { BoardingHome } from "../components/Boarding/BoardingHome";
import BoardingCats from "../components/Boarding/BoardingCats";
import { BeforeBoarding } from "../components/Boarding/BeforeBoarding";
import { BoardingCheckin } from "../components/Boarding/BoardingCheckin";
import { BoardingVaccinations } from "../components/Boarding/BoardingVaccinations";
import { MedicalIssues } from "../components/Boarding/MedicalIssues";
import { Size, useWindowSize } from "../components/ui-kit/hooks/useWindowSize";
import { ThemePreferenceContext } from "./_app";

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

export const headerHt = "47px";

const Boarding: React.FC<Props> = () => {
  const { breakpoints } = useContext(ThemePreferenceContext);
  const size: Size = useWindowSize();
  const mobileScreen = size.width < parseInt(breakpoints[0]);
  const items = [
    { label: "Boarding", key: "item-1", children: <BoardingHome /> },
    { label: "We Board Cats", key: "item-2", children: <BoardingCats /> },
    { label: "Before Boarding", key: "item-3", children: <BeforeBoarding /> },
    { label: "Checking In", key: "item-4", children: <BoardingCheckin /> },
    {
      label: "Vaccinations",
      key: "item-5",
      children: <BoardingVaccinations />,
    },
    {
      label: "Medical Issues",
      key: "item-6",
      children: <MedicalIssues />,
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
        title="to keep your dog warm in the winter."
        description="Our facility also has two spacious exercise and play areas."
      >
        <span>
          Inside runs include <PromoTitle>Radient Heat</PromoTitle>,
        </span>{" "}
      </Promo>
      <Content>
        <Tabs
          defaultActiveKey="1"
          tabPosition={mobileScreen ? "top" : "left"}
          size={mobileScreen ? "small" : "large"}
          moreIcon={<DownOutlined />}
          style={{
            fontSize: "inherit",
          }}
          items={items}
        />
      </Content>
    </Layout>
  );
};

export default Boarding;
